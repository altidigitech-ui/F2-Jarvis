// Client du Gateway OpenClaw (couche browser/exécution sur le VPS).
// FRONTIÈRE D'INTÉGRATION : Jarvis est l'orchestrateur déterministe ; OpenClaw
// fait le travail navigateur qu'aucune API ne couvre (découverte d'URLs de
// boutiques, lecture des pages contact/about pour trouver l'email décideur).
// Cf. 05-OPENCLAW.md §D — agents NARROW, scope étroit.
//
// Contrat HTTP attendu (à confirmer au branchement OpenClaw réel) :
//   POST {OPENCLAW_GATEWAY_URL}/agent/discover-stores
//        { niche, count } -> { urls: string[] }
//   POST {OPENCLAW_GATEWAY_URL}/agent/find-email
//        { domain } -> { name?: string, email?: string, source?: string }
// Auth : header Authorization: Bearer {OPENCLAW_API_KEY}.

const TIMEOUT_MS = 120000; // le browser peut être lent

function gateway(): { url: string; key: string } {
  const url = process.env.OPENCLAW_GATEWAY_URL;
  const key = process.env.OPENCLAW_API_KEY;
  if (!url || !key) {
    throw new Error(
      "[cold/openclaw] OPENCLAW_GATEWAY_URL / OPENCLAW_API_KEY non configurés (Gateway OpenClaw du VPS)"
    );
  }
  return { url: url.replace(/\/$/, ""), key };
}

async function call<T>(path: string, body: unknown): Promise<T> {
  const { url, key } = gateway();
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${url}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      throw new Error(`[cold/openclaw] ${path} HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

// SOURCE — découverte : OpenClaw renvoie des URLs candidates de boutiques.
// La détection Shopify + qualif se fait ensuite côté Jarvis (déterministe).
export async function discoverStores(niche: string, count: number): Promise<string[]> {
  const out = await call<{ urls?: string[] }>("/agent/discover-stores", { niche, count });
  return Array.isArray(out.urls) ? out.urls : [];
}

// ENRICH — recherche de l'email décideur via les pages du site + réseaux liés.
export async function findDecisionMakerEmail(
  domain: string
): Promise<{ name: string | null; email: string | null; source: string | null }> {
  const out = await call<{ name?: string; email?: string; source?: string }>("/agent/find-email", { domain });
  return {
    name: out.name || null,
    email: out.email ? out.email.trim().toLowerCase() : null,
    source: out.source || null,
  };
}

export function isOpenClawConfigured(): boolean {
  return Boolean(process.env.OPENCLAW_GATEWAY_URL && process.env.OPENCLAW_API_KEY);
}
