// Rotation round-robin sur les boîtes du fournisseur cold, avec cap d'envoi/jour
// par boîte tracké en Redis. L'envoi SMTP est délégué à un relais HTTPS (Railway
// bloque le SMTP direct) ; Jarvis garde toute la logique de sélection de boîte.
// Jarvis EST le séquenceur : pas de SaaS d'envoi tiers.

import { getRedis } from "../redis.js";
import { loadMailboxes, dailyCapPerInbox } from "./mailboxes.js";
import { pauseReason, ColdPausedError } from "./guardrails.js";
import type { Mailbox } from "./types.js";

// Clé Redis du compteur quotidien par boîte (UTC, reset naturel à minuit).
function capKey(inboxId: string): string {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `cold:cap:${inboxId}:${day}`;
}

async function sentToday(inboxId: string): Promise<number> {
  const v = await getRedis().get(capKey(inboxId));
  return v ? Number(v) : 0;
}

async function incrSent(inboxId: string): Promise<void> {
  const r = getRedis();
  const key = capKey(inboxId);
  const n = await r.incr(key);
  if (n === 1) await r.expire(key, 60 * 60 * 48); // TTL 2j, garde-fou
}

let _rrIndex = 0;

// Choisit la prochaine boîte sous son cap, en round-robin. null si tout est plein.
export async function pickMailbox(): Promise<Mailbox | null> {
  const boxes = loadMailboxes();
  if (boxes.length === 0) {
    throw new Error("[cold/mailer] aucune boîte d'envoi configurée (MAILBOX_*)");
  }
  const cap = dailyCapPerInbox();
  for (let n = 0; n < boxes.length; n++) {
    const box = boxes[(_rrIndex + n) % boxes.length];
    if ((await sentToday(box.id)) < cap) {
      _rrIndex = (_rrIndex + n + 1) % boxes.length;
      return box;
    }
  }
  return null; // toutes les boîtes ont atteint leur cap aujourd'hui
}

export interface SendResult {
  inbox: string;     // box.id → à stocker dans cold_targets.sending_inbox
  messageId: string;
}

// Envoie un email cold. Texte brut uniquement (anti-détection + délivrabilité).
export async function sendColdEmail(args: {
  to: string;
  subject: string;
  body: string;
}): Promise<SendResult> {
  const reason = await pauseReason();
  if (reason) throw new ColdPausedError(reason);

  const box = await pickMailbox();
  if (!box) throw new Error("[cold/mailer] cap quotidien atteint sur toutes les boîtes");

  const relayUrl = process.env.COLD_RELAY_URL;
  const relaySecret = process.env.COLD_RELAY_SECRET;
  if (!relayUrl || !relaySecret) {
    throw new Error("[cold/mailer] COLD_RELAY_URL / COLD_RELAY_SECRET non configurés");
  }

  const res = await fetch(relayUrl, {
    method: "POST",
    headers: { "content-type": "application/json", "x-relay-secret": relaySecret },
    body: JSON.stringify({
      to: args.to,
      subject: args.subject,
      body: args.body,
      smtp: { host: box.smtpHost, port: box.smtpPort, user: box.smtpUser, pass: box.smtpPass, from: box.from },
    }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`[cold/mailer] relais ${res.status}: ${txt.slice(0, 200)}`);
  }
  const data = (await res.json()) as { messageId?: string };

  await incrSent(box.id);
  return { inbox: box.id, messageId: data.messageId || "" };
}
