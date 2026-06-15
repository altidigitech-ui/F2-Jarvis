// Envoi SMTP via nodemailer, rotation round-robin sur les boîtes du fournisseur
// cold, avec cap d'envoi/jour par boîte tracké en Redis.
// Jarvis EST le séquenceur : pas de SaaS d'envoi tiers.

import nodemailer, { type Transporter } from "nodemailer";
import { getRedis } from "../redis.js";
import { loadMailboxes, dailyCapPerInbox } from "./mailboxes.js";
import type { Mailbox } from "./types.js";

const _transports = new Map<string, Transporter>();

function transportFor(box: Mailbox): Transporter {
  let t = _transports.get(box.id);
  if (t) return t;
  t = nodemailer.createTransport({
    host: box.smtpHost,
    port: box.smtpPort,
    secure: box.smtpPort === 465, // 465 = TLS implicite, sinon STARTTLS
    auth: { user: box.smtpUser, pass: box.smtpPass },
  });
  _transports.set(box.id, t);
  return t;
}

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
  const box = await pickMailbox();
  if (!box) {
    throw new Error("[cold/mailer] cap quotidien atteint sur toutes les boîtes");
  }
  const info = await transportFor(box).sendMail({
    from: box.from,
    to: args.to,
    subject: args.subject,
    text: args.body,
    // List-Unsubscribe : conformité + délivrabilité. mailto opt-out vers la boîte.
    headers: {
      "List-Unsubscribe": `<mailto:${box.smtpUser}?subject=unsubscribe>`,
    },
  });
  await incrSent(box.id);
  return { inbox: box.id, messageId: info.messageId };
}
