// Phase 3 — SCRAPING. SOURCE (trouver des boutiques) + ENRICH (trouver l'email).
// OpenClaw fait le browser ; Jarvis fait le déterministe (détection Shopify,
// qualif, dédup, vérif SMTP, drop role) et écrit dans cold_targets.

import { getSupabase } from "../supabase.js";
import { discoverStores, findDecisionMakerEmail } from "./openclaw.js";
import { detectShopify, guessCountry, normalizeDomain } from "./shopify-detect.js";
import { verifyEmail, isRoleAddress } from "./smtp-verify.js";
import type { ColdTarget, Country, PlatformData } from "./types.js";

const ALLOWED_COUNTRIES: Country[] = ["US", "UK", "AU"];

// --- SOURCE -----------------------------------------------------------------

// Qualif minimale avant d'écrire : Shopify confirmé + pays ciblé. Le scoring
// fin (apps, thème) est fait par le job `qualify`.
function passesSourceFilter(pd: PlatformData, country: Country | null): boolean {
  if (!pd.is_shopify) return false;
  if (!country || !ALLOWED_COUNTRIES.includes(country)) return false;
  return true;
}

async function alreadyKnown(domain: string): Promise<boolean> {
  const { data } = await getSupabase()
    .from("cold_targets")
    .select("id")
    .eq("store_domain", domain)
    .maybeSingle();
  return Boolean(data);
}

export interface SourceResult {
  discovered: number;
  inserted: number;
  skipped: number;
}

// Découvre des boutiques pour une niche, détecte/qualifie/dédup, insère en
// statut `sourced`. Renvoie un résumé (pour le batch-log).
export async function sourceStores(niche: string, count: number): Promise<SourceResult> {
  const urls = await discoverStores(niche, count);
  const sb = getSupabase();
  let inserted = 0;
  let skipped = 0;

  for (const url of urls) {
    const domain = normalizeDomain(url);
    if (!domain) { skipped++; continue; }
    if (await alreadyKnown(domain)) { skipped++; continue; } // dédup

    const platform = await detectShopify(domain);
    const country = guessCountry(domain);
    if (!passesSourceFilter(platform, country)) { skipped++; continue; }
    platform.source = "openclaw:discover";

    const { error } = await sb.from("cold_targets").insert({
      store_url: `https://${domain}`,
      store_domain: domain,
      country,
      platform_data: platform,
      status: "sourced",
    });
    if (error) {
      // Course possible sur l'unique store_domain → on ignore le doublon.
      if (!error.message.includes("uq_cold_targets_domain")) {
        console.error(`[cold/scraper] insert ${domain}:`, error.message);
      }
      skipped++;
    } else {
      inserted++;
    }
  }

  return { discovered: urls.length, inserted, skipped };
}

// --- ENRICH -----------------------------------------------------------------

export interface EnrichOutcome {
  status: "enriched" | "unreachable";
  email: string | null;
  name: string | null;
  verified: boolean;
}

// Trouve l'email décideur d'une cible (déjà qualifiée), le vérifie en SMTP,
// drop les adresses role. Met à jour le row et renvoie l'issue.
export async function enrichTarget(target: ColdTarget): Promise<EnrichOutcome> {
  const sb = getSupabase();
  const found = await findDecisionMakerEmail(target.store_domain);

  let email = found.email;
  let verified = false;

  if (email) {
    if (isRoleAddress(email)) {
      // On préfère un décideur ; on drop la role (sauf si rien d'autre, géré en aval).
      email = null;
    } else {
      const verdict = await verifyEmail(email);
      if (verdict === "invalid") {
        email = null;
      } else {
        verified = verdict === "valid"; // "unknown" → gardé mais non vérifié
      }
    }
  }

  const outcome: EnrichOutcome = email
    ? { status: "enriched", email, name: found.name, verified }
    : { status: "unreachable", email: null, name: found.name, verified: false };

  const { error } = await sb
    .from("cold_targets")
    .update({
      decision_maker_email: outcome.email,
      decision_maker_name: outcome.name,
      email_verified: outcome.verified,
      status: outcome.status,
      error: outcome.status === "unreachable" ? "no valid decision-maker email" : null,
    })
    .eq("id", target.id);
  if (error) console.error(`[cold/scraper] enrich update ${target.store_domain}:`, error.message);

  return outcome;
}
