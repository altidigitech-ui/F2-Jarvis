// Envoi cold via l'API Resend (HTTP direct depuis le worker). Le transport bas
// niveau vit dans resend.ts ; ce module porte les garde-fous d'envoi :
//   - pause campagne (seuils délivrabilité, guardrails.ts),
//   - cap quotidien GLOBAL (un seul expéditeur COLD_FROM, plus de rotation boîtes).
// Jarvis EST le séquenceur : pas de SaaS d'envoi tiers.

import { getRedis } from "../redis.js";
import { pauseReason, ColdPausedError } from "./guardrails.js";
import { sendColdEmailResend } from "./resend.js";

// Cap d'envoi/jour GLOBAL (l'envoi part d'un unique expéditeur COLD_FROM via Resend).
// Démarrage prudent à 5 (warming), montée au signal via l'env.
function globalDailyCap(): number {
  return Number(process.env.COLD_DAILY_CAP || 5);
}

// Clé Redis du compteur quotidien global (UTC, reset naturel à minuit).
function capKey(): string {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `cold:cap:global:${day}`;
}

async function sentToday(): Promise<number> {
  const v = await getRedis().get(capKey());
  return v ? Number(v) : 0;
}

async function incrSent(): Promise<void> {
  const r = getRedis();
  const key = capKey();
  const n = await r.incr(key);
  if (n === 1) await r.expire(key, 60 * 60 * 48); // TTL 2j, garde-fou
}

export interface SendResult {
  inbox: string; // expéditeur effectif (COLD_FROM) → stocké dans cold_targets.sending_inbox
  messageId: string; // id Resend → stocké dans cold_targets.resend_message_id
}

// Envoie un email cold. Texte brut uniquement (anti-détection + délivrabilité).
export async function sendColdEmail(args: {
  to: string;
  subject: string;
  body: string;
}): Promise<SendResult> {
  // Garde-fou : aucun envoi si la campagne est en pause (seuils délivrabilité).
  const reason = await pauseReason();
  if (reason) throw new ColdPausedError(reason);

  // Garde-fou : cap quotidien global.
  const cap = globalDailyCap();
  if ((await sentToday()) >= cap) {
    throw new Error(`[cold/mailer] cap quotidien global atteint (${cap}/j)`);
  }

  const { id, from } = await sendColdEmailResend({
    to: args.to,
    subject: args.subject,
    text: args.body,
    replyTo: process.env.COLD_REPLY_TO,
  });
  await incrSent();
  return { inbox: from, messageId: id };
}
