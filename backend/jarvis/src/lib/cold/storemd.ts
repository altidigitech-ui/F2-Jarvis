// Client de l'endpoint interne preview-scan de StoreMD.
// Contrat (confirmé par test curl sur prod) :
//   POST {STOREMD_PREVIEW_SCAN_URL}  (= .../internal/preview-scan)
//   Auth : X-Internal-Key: {STOREMD_PREVIEW_SCAN_KEY}
//   Body : { shop_domain }  (domaine nu, ex. "gymshark.com", protocole strippé)
//   200  : { preview_score: number,
//            summary: { critical, major, minor, info },
//            issues: Array<{ severity, title, description, category }> }
//          severity ∈ {critical, major, minor, info} → mappé high/medium/low.
//
// Le parsing reste tolérant aux variantes de noms de champs côté StoreMD, pour
// ne pas casser sur un détail de nommage. Sync (le job attend la réponse).

import type { ScanFinding } from "./types.js";

const TIMEOUT_MS = 60000; // un scan peut prendre quelques dizaines de secondes

// Sérialisation + ESPACEMENT des appels preview-scan. L'API StoreMD sature à
// ~7 vrais scans/min : au-delà elle sert un stub 68 quasi instantané (~80ms).
// Le mutex in-process (un seul worker, pas de lock Redis) garantit UN SEUL appel
// à la fois ET applique un délai entre deux appels. Défaut 10s = ~6 scans/min,
// sous le seuil de saturation (couvre la cible 20→200 scans/jour). Réglable via
// STOREMD_SCAN_GAP_MS. La concurrence worker reste à 5 (source/compose/push).
const SCAN_GAP_MS = Number(process.env.STOREMD_SCAN_GAP_MS || 10000);
let _scanChain: Promise<unknown> = Promise.resolve();

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// Enfile `task` derrière les scans en cours : exécution strictement sérialisée,
// puis délai d'espacement avant de libérer le suivant. La file ne conserve
// jamais l'erreur de `task` dans son état (sinon elle resterait "rejected" et
// bloquerait les scans suivants) : on la neutralise pour la file tout en la
// propageant à l'appelant via `run`.
function serializeScan<T>(task: () => Promise<T>): Promise<T> {
  const run = _scanChain.then(task, task);
  _scanChain = run.then(
    () => delay(SCAN_GAP_MS),
    () => delay(SCAN_GAP_MS)
  );
  return run;
}

function endpoint(): { url: string; key: string } {
  const url = process.env.STOREMD_PREVIEW_SCAN_URL;
  const key = process.env.STOREMD_PREVIEW_SCAN_KEY;
  if (!url || !key) {
    throw new Error(
      "[cold/storemd] STOREMD_PREVIEW_SCAN_URL / STOREMD_PREVIEW_SCAN_KEY non configurés"
    );
  }
  return { url, key };
}

// Réduit une store_url à son domaine nu : protocole, "www." et path strippés.
// Ex. "https://www.gymshark.com/collections" → "gymshark.com".
function bareDomain(storeUrl: string): string {
  let s = String(storeUrl || "").trim();
  s = s.replace(/^[a-z]+:\/\//i, ""); // protocole
  s = s.replace(/^www\./i, "");
  s = s.split(/[/?#]/)[0]; // path / query / fragment
  return s.trim().toLowerCase();
}

// Normalise la sévérité. Contrat réel StoreMD : critical/major/minor/info.
//   critical → high · major → medium · minor → low · info → low
// Les autres conventions restent tolérées en fallback.
function normSeverity(v: unknown): ScanFinding["severity"] | undefined {
  const s = String(v || "").toLowerCase();
  if (["critical", "high", "severe", "error"].includes(s)) return "high";
  if (["major", "medium", "warning", "warn", "moderate"].includes(s)) return "medium";
  if (["minor", "info", "low", "notice"].includes(s)) return "low";
  return undefined;
}

function pick(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

function normFinding(raw: unknown): ScanFinding | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  // Contrat réel : { severity, title, description, category }. Pas de metric.
  const title = pick(o, ["title", "name", "issue", "label", "headline"]);
  const detail = pick(o, ["description", "detail", "message", "summary", "explanation"]);
  if (!title && !detail) return null;
  return {
    title: title || detail!.slice(0, 60),
    detail: detail || title!,
    severity: normSeverity(o.severity ?? o.level ?? o.priority),
  };
}

export interface PreviewScanResult {
  score: number;
  findings: ScanFinding[];
}

// Détection du stub de saturation : StoreMD saturé renvoie un 68 quasi instantané
// avec des findings figés au lieu de scanner. Signature STRICTE (les 3 conditions)
// pour ne jamais confondre avec un vrai store qui scorerait réellement 68.
// Durée : on se fie d'abord au scan_duration_ms du BODY (mesure serveur, ~80ms
// pour le stub, 500ms+ pour un vrai scan), sans bruit réseau. Repli sur la durée
// client (seuil plus large) seulement si le champ est absent de la réponse.
const STUB_MAX_MS = Number(process.env.STOREMD_STUB_MAX_MS || 150);
const STUB_FALLBACK_MAX_MS = Number(process.env.STOREMD_STUB_FALLBACK_MAX_MS || 250);
const STUB_SCORE = 68;
const STUB_TITLES = ["Missing meta description", "Missing canonical URL"];

// Levée quand doPreviewScan détecte le stub (≠ vrai résultat). jobScan la traite
// à part : re-scan différé, sans stocker le faux score.
export class StoreMdSaturatedError extends Error {
  constructor(public readonly durationMs: number, public readonly durationSource: "server" | "client") {
    super(`[cold/storemd] preview-scan saturé : stub ${STUB_SCORE} servi en ${durationMs}ms (${durationSource})`);
    this.name = "StoreMdSaturatedError";
  }
}

// Point d'entrée : SÉRIALISE + espace l'appel HTTP à StoreMD. Le reste de
// jobScan (Supabase, compose) n'est PAS dans le mutex.
export async function runPreviewScan(storeUrl: string): Promise<PreviewScanResult> {
  return serializeScan(() => doPreviewScan(storeUrl));
}

// Appel HTTP réel — un seul à la fois, garanti par serializeScan.
async function doPreviewScan(storeUrl: string): Promise<PreviewScanResult> {
  const { url, key } = endpoint();
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const startedAt = Date.now();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Key": key,
      },
      body: JSON.stringify({ shop_domain: bareDomain(storeUrl) }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      throw new Error(`[cold/storemd] preview-scan HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }
    const data = (await res.json()) as Record<string, unknown>;
    const clientMs = Date.now() - startedAt; // durée client (repli si pas de mesure serveur)

    const rawScore = data.preview_score ?? data.score ?? data.scan_score ?? data.health_score;
    const score = Number(rawScore);
    if (!Number.isFinite(score)) {
      throw new Error(`[cold/storemd] preview-scan: score absent/invalide (${String(rawScore)})`);
    }

    const rawFindings = (data.findings ?? data.scan_findings ?? data.issues ?? []) as unknown;
    const findings = Array.isArray(rawFindings)
      ? rawFindings.map(normFinding).filter((f): f is ScanFinding => f !== null)
      : [];

    // Filet : si StoreMD a servi le stub de saturation, on NE le stocke PAS.
    // Durée principale = scan_duration_ms du body (serveur) ; repli sur la durée
    // client (seuil élargi) uniquement si le champ est absent.
    const serverMs = Number(data.scan_duration_ms);
    const hasServerMs = Number.isFinite(serverMs);
    const durationLooksStub = hasServerMs ? serverMs < STUB_MAX_MS : clientMs < STUB_FALLBACK_MAX_MS;
    if (
      durationLooksStub &&
      score === STUB_SCORE &&
      findings.length >= 2 &&
      findings[0]?.title === STUB_TITLES[0] &&
      findings[1]?.title === STUB_TITLES[1]
    ) {
      throw new StoreMdSaturatedError(
        hasServerMs ? serverMs : clientMs,
        hasServerMs ? "server" : "client"
      );
    }

    return { score, findings };
  } finally {
    clearTimeout(t);
  }
}

// Garde les 3 findings les plus parlants : sévérité d'abord (critical/major
// dominent), ordre d'origine à poids égal. Le contrat réel ne renvoie pas de
// chiffre d'impact, donc le classement repose entièrement sur la sévérité.
const SEVERITY_WEIGHT: Record<NonNullable<ScanFinding["severity"]>, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function topFindings(findings: ScanFinding[], n = 3): ScanFinding[] {
  return [...findings]
    .map((f, i) => ({ f, i }))
    .sort((a, b) => {
      const sa = a.f.severity ? SEVERITY_WEIGHT[a.f.severity] : 0;
      const sb = b.f.severity ? SEVERITY_WEIGHT[b.f.severity] : 0;
      if (sb !== sa) return sb - sa;
      return a.i - b.i; // stable : conserve l'ordre d'origine à poids égal
    })
    .slice(0, n)
    .map((x) => x.f);
}
