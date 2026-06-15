// Phase 7 — GARDE-FOUS. Seuils délivrabilité : bounce > 2% ou plaintes > 0,3%
// → pause auto (stop envois + stop sourcing) + log décision + alerte.
// Cap/boîte + dédup + suppression sont gérés ailleurs (mailer / scraper / jobs).

import { getRedis } from "../redis.js";
import { getSupabase } from "../supabase.js";
import { appendDecisionLog } from "./cold-log.js";

const PAUSE_KEY = "cold:paused";              // valeur = raison de la pause
const COMPLAINTS_KEY = "cold:complaints:total"; // compteur de plaintes (FBL/heuristique)

// Seuils (plan §7). MIN_SAMPLE évite les fausses pauses en début de campagne.
const BOUNCE_MAX = Number(process.env.COLD_BOUNCE_MAX || 0.02);
const COMPLAINT_MAX = Number(process.env.COLD_COMPLAINT_MAX || 0.003);
const MIN_SAMPLE = Number(process.env.COLD_GUARD_MIN_SAMPLE || 20);

export class ColdPausedError extends Error {
  constructor(reason: string) {
    super(`[cold] campagne en pause: ${reason}`);
    this.name = "ColdPausedError";
  }
}

export async function isColdPaused(): Promise<boolean> {
  return Boolean(await getRedis().get(PAUSE_KEY));
}

export async function pauseReason(): Promise<string | null> {
  return getRedis().get(PAUSE_KEY);
}

// Pause idempotente : si déjà en pause, ne re-logge pas.
export async function pauseCold(reason: string): Promise<void> {
  const r = getRedis();
  if (await r.get(PAUSE_KEY)) return;
  await r.set(PAUSE_KEY, reason);
  console.error(`[cold/guardrails] PAUSE AUTO — ${reason}`);
  await appendDecisionLog(
    "Pause auto campagne cold StoreMD",
    reason,
    "Envois + sourcing stoppés. Intervention requise (corriger la délivrabilité), puis lever la pause."
  );
}

// Levée manuelle (ex. après correction). Non appelée automatiquement.
export async function resumeCold(): Promise<void> {
  await getRedis().del(PAUSE_KEY);
}

export async function recordComplaint(): Promise<void> {
  await getRedis().incr(COMPLAINTS_KEY);
}

export interface GuardrailStats {
  sent: number;
  bounced: number;
  complaints: number;
  bounceRate: number;
  complaintRate: number;
  paused: boolean;
}

// Calcule les taux depuis cold_targets + le compteur plaintes, et déclenche la
// pause si un seuil est franchi (au-delà de l'échantillon minimum).
export async function evaluateGuardrails(): Promise<GuardrailStats> {
  const sb = getSupabase();

  // sent = au moins une touche partie (touch_count >= 1).
  const { count: sent } = await sb
    .from("cold_targets")
    .select("id", { count: "exact", head: true })
    .gte("touch_count", 1);
  const { count: bounced } = await sb
    .from("cold_targets")
    .select("id", { count: "exact", head: true })
    .eq("status", "bounced");

  const complaintsRaw = await getRedis().get(COMPLAINTS_KEY);
  const complaints = complaintsRaw ? Number(complaintsRaw) : 0;
  const sentN = sent || 0;
  const bounceRate = sentN > 0 ? (bounced || 0) / sentN : 0;
  const complaintRate = sentN > 0 ? complaints / sentN : 0;

  if (sentN >= MIN_SAMPLE) {
    if (bounceRate > BOUNCE_MAX) {
      await pauseCold(`bounce ${(bounceRate * 100).toFixed(1)}% > ${(BOUNCE_MAX * 100).toFixed(1)}% (${bounced}/${sentN})`);
    } else if (complaintRate > COMPLAINT_MAX) {
      await pauseCold(`plaintes ${(complaintRate * 100).toFixed(2)}% > ${(COMPLAINT_MAX * 100).toFixed(2)}% (${complaints}/${sentN})`);
    }
  }

  return {
    sent: sentN,
    bounced: bounced || 0,
    complaints,
    bounceRate,
    complaintRate,
    paused: await isColdPaused(),
  };
}
