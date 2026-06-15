// Lecture IMAP via imapflow : poll des boîtes du fournisseur cold pour détecter
// les réponses. Phase 2 = détecter + matcher au lead. La classification fine
// (interested/objection/...) est Phase 5, hors de ce module.

import { ImapFlow } from "imapflow";
import { loadMailboxes } from "./mailboxes.js";

export interface IncomingReply {
  inbox: string;        // boîte qui a reçu (box.id)
  fromEmail: string;    // expéditeur normalisé (lowercase)
  subject: string;
  text: string;         // corps texte (tronqué)
  date: string;         // ISO
}

function extractEmail(addr: string): string {
  const m = addr.match(/<([^>]+)>/);
  return (m ? m[1] : addr).trim().toLowerCase();
}

// Poll une boîte : récupère les messages non lus de l'INBOX, les marque lus.
async function pollOne(boxIndex: number): Promise<IncomingReply[]> {
  const box = loadMailboxes()[boxIndex];
  const client = new ImapFlow({
    host: box.imapHost,
    port: box.imapPort,
    secure: true,
    auth: { user: box.imapUser, pass: box.imapPass },
    logger: false,
  });

  const replies: IncomingReply[] = [];
  await client.connect();
  try {
    const lock = await client.getMailboxLock("INBOX");
    try {
      // Messages non lus seulement → chaque réponse traitée une fois.
      for await (const msg of client.fetch({ seen: false }, { envelope: true, source: true })) {
        const env = msg.envelope;
        const fromAddr = env?.from?.[0];
        const fromEmail = fromAddr
          ? extractEmail(`${fromAddr.address || ""}`)
          : "";
        if (!fromEmail) continue;

        const raw = msg.source ? msg.source.toString("utf8") : "";
        const text = extractPlainBody(raw).slice(0, 2000);

        replies.push({
          inbox: box.id,
          fromEmail,
          subject: env?.subject || "",
          text,
          date: env?.date ? env.date.toISOString() : new Date().toISOString(),
        });

        // Marquer lu pour ne pas le re-traiter au prochain poll.
        if (msg.uid) {
          await client.messageFlagsAdd({ uid: String(msg.uid) }, ["\\Seen"], { uid: true });
        }
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => undefined);
  }
  return replies;
}

// Extraction grossière du corps texte d'un message brut RFC822.
// Suffisant pour matcher/classer ; pas un parseur MIME complet.
function extractPlainBody(raw: string): string {
  const splitIdx = raw.indexOf("\r\n\r\n");
  const body = splitIdx >= 0 ? raw.slice(splitIdx + 4) : raw;
  return body.replace(/=\r\n/g, "").replace(/\r\n/g, "\n").trim();
}

// Poll toutes les boîtes configurées. Les erreurs d'une boîte n'arrêtent pas
// les autres.
export async function pollAllReplies(): Promise<IncomingReply[]> {
  const boxes = loadMailboxes();
  const all: IncomingReply[] = [];
  for (let i = 0; i < boxes.length; i++) {
    try {
      all.push(...(await pollOne(i)));
    } catch (err) {
      console.error(`[cold/imap] poll échoué boîte ${boxes[i].id}:`, err instanceof Error ? err.message : err);
    }
  }
  return all;
}
