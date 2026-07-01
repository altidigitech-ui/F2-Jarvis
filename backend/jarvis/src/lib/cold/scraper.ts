// Phase 3 — SCRAPING. SOURCE (trouver des boutiques) + ENRICH (valider l'email).
// L'actor Apify (clearpath/shopify-store-leads) fournit la SOURCE par mot-clé
// (domaine + email + nom + pays) ; Jarvis fait le déterministe (rotation des
// mots-clés, détection Shopify, dédup, vérif SMTP, drop role) et écrit dans
// cold_targets. Cf. lib/cold/apify.ts.

import { getSupabase } from "../supabase.js";
import { isColdPaused } from "./guardrails.js";
import { fetchShopifyLeads } from "./apify.js";
import { detectShopify, normalizeDomain } from "./shopify-detect.js";
import { verifyEmail, isRoleAddress } from "./smtp-verify.js";
import type { ColdTarget, PlatformData } from "./types.js";

const SEEDS_TABLE = "cold_source_seeds";

// --- SOURCE -----------------------------------------------------------------

async function alreadyKnown(domain: string): Promise<boolean> {
  const { data } = await getSupabase()
    .from("cold_targets")
    .select("id")
    .eq("store_domain", domain)
    .maybeSingle();
  return Boolean(data);
}

// Rotation LRU : sélectionne le mot-clé le moins récemment utilisé puis marque
// son usage (last_used_at = now, times_used += 1). Renvoie null si pool vide.
async function pickKeyword(): Promise<string | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from(SEEDS_TABLE)
    .select("id, keyword, times_used")
    .order("last_used_at", { ascending: true, nullsFirst: true })
    .order("times_used", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[cold/scraper] pickKeyword:", error.message);
    return null;
  }
  if (!data) return null;

  const row = data as { id: number; keyword: string; times_used: number };
  const { error: upErr } = await sb
    .from(SEEDS_TABLE)
    .update({ last_used_at: new Date().toISOString(), times_used: row.times_used + 1 })
    .eq("id", row.id);
  if (upErr) console.error("[cold/scraper] seed update:", upErr.message);

  return row.keyword;
}

export interface SourceResult {
  keyword: string | null;
  discovered: number;
  inserted: number;
  skipped: number;
}

// Source des boutiques via Apify pour le prochain mot-clé en rotation. Détecte,
// dédup, insère en statut `sourced` (avec email + nom du décideur fournis par
// l'actor). Renvoie un résumé (pour le batch-log).
export async function sourceStores(count: number): Promise<SourceResult> {
  // Garde-fou : stop sourcing quand la campagne est en pause (plan §7).
  if (await isColdPaused()) {
    console.warn("[cold/scraper] sourcing ignoré — campagne en pause");
    return { keyword: null, discovered: 0, inserted: 0, skipped: 0 };
  }

  const keyword = await pickKeyword();
  if (!keyword) {
    console.warn("[cold/scraper] aucun mot-clé disponible (cold_source_seeds vide)");
    return { keyword: null, discovered: 0, inserted: 0, skipped: 0 };
  }

  // count*2 : on sur-demande, l'actor renvoie aussi des leads hors US/UK/AU et
  // des doublons qu'on jette ensuite.
  const leads = await fetchShopifyLeads(keyword, count * 2);
  const sb = getSupabase();
  let inserted = 0;
  let skipped = 0;

  for (const lead of leads) {
    const domain = normalizeDomain(lead.domain);
    if (!domain) { skipped++; continue; }
    if (await alreadyKnown(domain)) { skipped++; continue; } // dédup

    // Détection déterministe pour enrichir platform_data (apps/thème/catalogue),
    // qui alimente le scoring du job `qualify`. L'actor garantit déjà Shopify.
    const platform: PlatformData = await detectShopify(domain);
    platform.is_shopify = true;
    platform.source = `apify:${keyword}`;

    const { error } = await sb.from("cold_targets").insert({
      store_url: `https://${domain}`,
      store_domain: domain,
      country: lead.country,
      platform_data: platform,
      decision_maker_name: lead.name,
      decision_maker_email: lead.email,
      social_handles: lead.socials,
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

  return { keyword, discovered: leads.length, inserted, skipped };
}

// --- ENRICH -----------------------------------------------------------------

export interface EnrichOutcome {
  status: "enriched" | "unreachable";
  email: string | null;
  name: string | null;
  verified: boolean;
}

// L'email décideur est désormais fourni par l'actor dès la SOURCE. L'ENRICH se
// limite à valider cet email (vérif SMTP) et à écarter les adresses role. Met à
// jour le row et renvoie l'issue.
export async function enrichTarget(target: ColdTarget): Promise<EnrichOutcome> {
  const sb = getSupabase();
  const name = target.decision_maker_name;

  let email = target.decision_maker_email ? target.decision_maker_email.trim().toLowerCase() : null;
  let verified = false;

  if (email) {
    if (isRoleAddress(email)) {
      // On préfère un décideur ; on drop la role.
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
    ? { status: "enriched", email, name, verified }
    : { status: "unreachable", email: null, name, verified: false };

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
