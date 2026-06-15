// Parse les boîtes d'envoi du fournisseur cold depuis l'env.
// Convention (cf. plan.md §ENV) :
//   MAILBOX_1_SMTP_HOST, MAILBOX_1_SMTP_PORT (def 587), MAILBOX_1_SMTP_USER,
//   MAILBOX_1_SMTP_PASS, MAILBOX_1_IMAP_HOST, MAILBOX_1_IMAP_PORT (def 993),
//   MAILBOX_1_FROM (def = SMTP_USER). Idem _2, _3, ... jusqu'à ~10.
// Aucune boîte mail grand public : ces creds viennent de Maildoso/Mailforge.

import type { Mailbox } from "./types.js";

let _cache: Mailbox[] | null = null;

export function loadMailboxes(): Mailbox[] {
  if (_cache) return _cache;
  const boxes: Mailbox[] = [];
  for (let i = 1; i <= 50; i++) {
    const smtpHost = process.env[`MAILBOX_${i}_SMTP_HOST`];
    const smtpUser = process.env[`MAILBOX_${i}_SMTP_USER`];
    const smtpPass = process.env[`MAILBOX_${i}_SMTP_PASS`];
    // Première boîte absente => on s'arrête (les boîtes sont numérotées sans trou).
    if (!smtpHost) break;
    if (!smtpUser || !smtpPass) {
      throw new Error(
        `[cold/mailboxes] MAILBOX_${i}_SMTP_HOST défini mais USER/PASS manquant`
      );
    }
    const imapHost = process.env[`MAILBOX_${i}_IMAP_HOST`] || smtpHost.replace(/^smtp\./, "imap.");
    const from = process.env[`MAILBOX_${i}_FROM`] || smtpUser;
    boxes.push({
      id: smtpUser,
      from,
      smtpHost,
      smtpPort: Number(process.env[`MAILBOX_${i}_SMTP_PORT`] || 587),
      smtpUser,
      smtpPass,
      imapHost,
      imapPort: Number(process.env[`MAILBOX_${i}_IMAP_PORT`] || 993),
      imapUser: process.env[`MAILBOX_${i}_IMAP_USER`] || smtpUser,
      imapPass: process.env[`MAILBOX_${i}_IMAP_PASS`] || smtpPass,
    });
  }
  _cache = boxes;
  return boxes;
}

// Cap d'envoi/jour par boîte. À confirmer avec le fournisseur (cf. reco-findings
// Tâche C). Démarrage prudent à 15, montée au signal.
export function dailyCapPerInbox(): number {
  return Number(process.env.COLD_DAILY_CAP_PER_INBOX || 15);
}
