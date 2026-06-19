// Client de l'actor Apify "clearpath/shopify-store-leads" (couche SOURCE/ENRICH).
// Remplace l'ancien Gateway OpenClaw : l'actor renvoie en un seul passage le
// domaine Shopify, l'email de contact, le nom et le pays. Jarvis reste
// l'orchestrateur déterministe (rotation des mots-clés, détection, qualif,
// dédup, vérif SMTP) — cf. lib/cold/scraper.ts.
//
// Contrat actor (clearpath/shopify-store-leads, id R9SL2PPdhdhLQwdck) :
//   POST {APIFY_BASE}/acts/{actorId}/run-sync-get-dataset-items?token=...
//        input  { query, maxItems }
//        output ApifyLeadItem[]  (items du dataset, renvoyés directement)
// Auth : token Apify en query string (APIFY_API_TOKEN).
// On lit l'email dans contacts[].email, le pays dans address.country, le
// domaine dans myshopifyDomain.

import type { Country } from "./types.js";

const APIFY_BASE = "https://api.apify.com/v2";
const TIMEOUT_MS = 120000; // l'actor scrape réellement, la run peut être longue.

// Pays autorisés (filtre dur sur la sortie de l'actor, conformité légale cold).
const ALLOWED: Country[] = ["US", "UK", "AU"];

// Lead normalisé renvoyé au scraper (même granularité que les colonnes
// cold_targets ingérées : domaine + email + nom + pays).
export interface ApifyLead {
  domain: string;
  email: string | null;
  name: string | null;
  country: Country;
}

interface ApifyConfig {
  token: string;
  actorId: string;
}

// Garde d'erreur : token ET actor doivent être configurés (cf. APIFY_* en env).
function config(): ApifyConfig {
  const token = process.env.APIFY_API_TOKEN;
  const actorId = process.env.APIFY_SHOPIFY_ACTOR_ID;
  if (!token || !actorId) {
    throw new Error(
      "[cold/apify] APIFY_API_TOKEN / APIFY_SHOPIFY_ACTOR_ID non configurés " +
        "(actor clearpath/shopify-store-leads = R9SL2PPdhdhLQwdck)"
    );
  }
  return { token, actorId };
}

export function isApifyConfigured(): boolean {
  return Boolean(process.env.APIFY_API_TOKEN && process.env.APIFY_SHOPIFY_ACTOR_ID);
}

// Forme brute d'un item du dataset (champs réellement lus uniquement).
interface ApifyLeadItem {
  myshopifyDomain?: string | null;
  domain?: string | null;
  url?: string | null;
  name?: string | null;
  // L'actor renvoie chaque contact sous forme { method, target } (ex.
  // { method: "email", target: "owner@store.com" }), pas { email }.
  contacts?: Array<{ method?: string | null; target?: string | null } | null> | null;
  address?: { country?: string | null } | null;
}

// Normalise un domaine (retire protocole / www / chemin), renvoie null si vide.
function cleanDomain(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;
  const d = raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
  return d || null;
}

// myshopifyDomain en priorité (contrat actor), repli sur domain/url.
function extractDomain(item: ApifyLeadItem): string | null {
  return cleanDomain(item.myshopifyDomain) || cleanDomain(item.domain) || cleanDomain(item.url);
}

// Premier contact dont method === "email", target normalisé en minuscules.
function extractEmail(item: ApifyLeadItem): string | null {
  if (!Array.isArray(item.contacts)) return null;
  for (const c of item.contacts) {
    if (c?.method !== "email") continue;
    const t = c.target;
    if (t && typeof t === "string" && t.includes("@")) return t.trim().toLowerCase();
  }
  return null;
}

// Mappe address.country (libellé libre de l'actor) vers US/UK/AU, sinon null.
function normalizeCountry(raw: string | null | undefined): Country | null {
  if (!raw || typeof raw !== "string") return null;
  const c = raw.trim().toLowerCase();
  if (["us", "usa", "u.s.", "u.s.a.", "united states", "united states of america"].includes(c)) return "US";
  if (
    ["uk", "u.k.", "gb", "united kingdom", "great britain", "england", "scotland", "wales", "northern ireland"].includes(
      c
    )
  )
    return "UK";
  if (["au", "australia"].includes(c)) return "AU";
  return null;
}

// SOURCE+ENRICH — interroge l'actor pour un mot-clé et renvoie les leads
// Shopify filtrés US/UK/AU (domaine + email + nom + pays). Parsing JSON strict.
export async function fetchShopifyLeads(query: string, maxItems: number): Promise<ApifyLead[]> {
  const { token, actorId } = config();
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  let raw: unknown;
  try {
    const res = await fetch(
      `${APIFY_BASE}/acts/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?token=${encodeURIComponent(
        token
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, maxItems }),
        signal: ctrl.signal,
      }
    );
    if (!res.ok) {
      throw new Error(`[cold/apify] run-sync HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }
    raw = await res.json();
  } finally {
    clearTimeout(t);
  }

  if (!Array.isArray(raw)) {
    throw new Error("[cold/apify] réponse inattendue de l'actor : dataset non-tableau");
  }

  const leads: ApifyLead[] = [];
  for (const item of raw as ApifyLeadItem[]) {
    const domain = extractDomain(item);
    if (!domain) continue;
    const country = normalizeCountry(item.address?.country);
    if (!country || !ALLOWED.includes(country)) continue; // filtre dur US/UK/AU
    leads.push({
      domain,
      email: extractEmail(item),
      name: item.name ? String(item.name).trim() || null : null,
      country,
    });
  }
  return leads;
}
