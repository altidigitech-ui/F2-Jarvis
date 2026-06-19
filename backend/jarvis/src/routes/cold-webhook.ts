// Webhook Resend (POST /cold/resend-webhook) — réalimente le garde-fou
// délivrabilité (bounce/plainte) qui n'est plus nourri par l'IMAP depuis le
// passage à Resend. Vit sur le serveur web, HORS middleware auth : la sécurité
// vient de la signature Svix (Resend signe ses webhooks via Svix), pas du header.
//
// Rappel garde-fou (guardrails.ts evaluateGuardrails) :
//   - bounce% = count(cold_targets.status='bounced') / count(touch_count>=1)
//     → un bounce se traduit par status='bounced' (PAS un compteur Redis).
//   - plainte% = Redis cold:complaints:total / sent → recordComplaint() = INCR.

import type { Request, Response } from "express";
import { Webhook } from "svix";
import { getSupabase } from "../lib/supabase.js";
import { getRedis } from "../lib/redis.js";
import { recordComplaint, evaluateGuardrails } from "../lib/cold/guardrails.js";

const DEDUP_TTL_SEC = 60 * 60 * 24 * 7; // 7 jours

interface ResendEvent {
  type?: string;
  data?: {
    email_id?: string;        // = notre cold_targets.resend_message_id
    to?: string[] | string;
    bounce?: { type?: string };
  };
}

interface TargetRow {
  id: string;
  decision_maker_email: string | null;
}

async function findTarget(emailId: string | undefined, to: string | undefined): Promise<TargetRow | null> {
  const sb = getSupabase();
  if (emailId) {
    const { data } = await sb
      .from("cold_targets")
      .select("id, decision_maker_email")
      .eq("resend_message_id", emailId)
      .maybeSingle();
    if (data) return data as TargetRow;
  }
  if (to) {
    const { data } = await sb
      .from("cold_targets")
      .select("id, decision_maker_email")
      .eq("decision_maker_email", to.toLowerCase())
      .in("status", ["in_sequence", "replied"])
      .maybeSingle();
    if (data) return data as TargetRow;
  }
  return null;
}

async function handleEvent(event: ResendEvent): Promise<void> {
  const type = event.type;
  // Seuls bounce + plainte nous intéressent ; le reste est ignoré (200, pas de retry).
  if (type !== "email.bounced" && type !== "email.complained") {
    console.log(`[/cold/resend-webhook] event non mappé ignoré: ${type}`);
    return;
  }

  const data = event.data || {};
  const emailId = data.email_id;
  const to = Array.isArray(data.to) ? data.to[0] : data.to;
  const target = await findTarget(emailId, to);
  const email = (to || target?.decision_maker_email || "").toLowerCase();
  const sb = getSupabase();

  if (type === "email.bounced") {
    // email.bounced = échec permanent (hard) chez Resend → suppression + status bounced.
    if (email) await sb.from("cold_suppression").upsert({ email, reason: "hard bounce" });
    if (target) {
      await sb.from("cold_targets")
        .update({ status: "bounced", next_touch_at: null, error: "resend hard bounce" })
        .eq("id", target.id);
    } else {
      console.log(`[/cold/resend-webhook] bounce sans target (email_id=${emailId}, to=${to})`);
    }
  } else {
    // email.complained : plainte FBL → suppression + compteur Redis + stop séquence.
    if (email) await sb.from("cold_suppression").upsert({ email, reason: "complaint" });
    await recordComplaint();
    if (target) {
      await sb.from("cold_targets")
        .update({ status: "unsubscribed", reply_category: "unsubscribe", next_touch_at: null })
        .eq("id", target.id);
    } else {
      console.log(`[/cold/resend-webhook] complaint sans target (email_id=${emailId}, to=${to})`);
    }
  }

  // Recalcule bounce%/plainte% et déclenche la pause auto si un seuil est franchi.
  await evaluateGuardrails();
}

export async function coldResendWebhookRoute(req: Request, res: Response): Promise<void> {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[/cold/resend-webhook] RESEND_WEBHOOK_SECRET manquant");
    res.status(500).json({ error: "webhook secret not configured" });
    return;
  }

  // req.body est un Buffer (express.raw). Svix vérifie sur le body BRUT.
  const payload = Buffer.isBuffer(req.body)
    ? req.body.toString("utf8")
    : typeof req.body === "string"
      ? req.body
      : "";
  const headers = {
    "svix-id": req.header("svix-id") || "",
    "svix-timestamp": req.header("svix-timestamp") || "",
    "svix-signature": req.header("svix-signature") || "",
  };

  let event: ResendEvent;
  try {
    event = new Webhook(secret).verify(payload, headers) as ResendEvent;
  } catch (err) {
    console.warn("[/cold/resend-webhook] signature invalide:", err instanceof Error ? err.message : err);
    res.status(401).json({ error: "invalid signature" });
    return;
  }

  // Idempotence : dédup par svix-id (Redis SETNX + TTL 7j). On marque AVANT de
  // traiter, et on libère la clé si le traitement échoue (pour autoriser le retry).
  const svixId = headers["svix-id"];
  const dedupKey = svixId ? `cold:webhook:seen:${svixId}` : null;
  let dedupHeld = false;
  if (dedupKey) {
    try {
      const fresh = await getRedis().set(dedupKey, "1", "EX", DEDUP_TTL_SEC, "NX");
      if (fresh === null) {
        res.status(200).json({ ok: true, dedup: true });
        return;
      }
      dedupHeld = true;
    } catch (err) {
      // Dédup best-effort : si Redis tombe, on traite quand même (actions idempotentes
      // hors recordComplaint ; un double-comptage rare vaut mieux qu'un event perdu).
      console.warn("[/cold/resend-webhook] dédup redis indisponible:", err instanceof Error ? err.message : err);
    }
  }

  try {
    await handleEvent(event);
  } catch (err) {
    // Erreur interne : on persiste le log, on libère la dédup pour que Resend retente.
    console.error("[/cold/resend-webhook] traitement échec:", err instanceof Error ? err.message : err);
    if (dedupHeld && dedupKey) {
      await getRedis().del(dedupKey).catch(() => undefined);
    }
    res.status(500).json({ error: "processing failed" });
    return;
  }

  res.status(200).json({ ok: true });
}
