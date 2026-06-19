// Transport bas niveau de l'envoi cold : API HTTP Resend (POST /emails).
// Remplace l'envoi SMTP nodemailer. Aucun silent failure : tout échec lève une
// ResendSendError structurée (code HTTP + catégorie + body tronqué).
// Le rate limit Resend (5 req/s par défaut) est respecté par un gate global au
// process (sérialise les envois et garantit l'espacement minimal entre appels).

import { makeUnsubToken } from "./unsub-token.js";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Espacement minimal entre deux POST, dérivé du plafond req/s Resend.
const MAX_RPS = Number(process.env.RESEND_MAX_RPS || 5);
const MIN_INTERVAL_MS = Math.ceil(1000 / Math.max(1, MAX_RPS));

// Headers List-Unsubscribe (RFC 8058) pour un destinataire, ou null si l'unsub
// n'est pas configuré (COLD_UNSUB_BASE_URL + COLD_UNSUB_SECRET requis).
function unsubscribeHeaders(to: string): Record<string, string> | null {
  const base = process.env.COLD_UNSUB_BASE_URL;
  const secret = process.env.COLD_UNSUB_SECRET;
  if (!base || !secret) return null;
  const token = makeUnsubToken(to, secret);
  const url = `https://${base}/cold/unsubscribe?t=${encodeURIComponent(token)}`;
  return {
    "List-Unsubscribe": `<${url}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

// Catégories d'échec explicites (cf. statuts Resend documentés).
export type ResendErrorCategory =
  | "validation" // 422 : domaine non vérifié, payload invalide
  | "rate_limit" // 429 : trop de requêtes
  | "aup" // 403 : refus Acceptable Use Policy
  | "client" // autres 4xx
  | "server" // 5xx + erreurs réseau
  | "network"; // fetch a throw (pas de réponse HTTP)

export class ResendSendError extends Error {
  constructor(
    public readonly httpStatus: number, // 0 si échec réseau (pas de réponse)
    public readonly category: ResendErrorCategory,
    public readonly resendCode: string | null,
    public readonly bodySnippet: string
  ) {
    super(
      `[cold/resend] HTTP ${httpStatus} (${category})` +
        `${resendCode ? ` ${resendCode}` : ""}: ${bodySnippet}`
    );
    this.name = "ResendSendError";
  }
}

// Gate de rate limit : chaîne de promesses sérialisée + espacement minimal.
let _gate: Promise<void> = Promise.resolve();
function rateLimit(): Promise<void> {
  _gate = _gate.then(async () => {
    const now = Date.now();
    const wait = _lastSentAt + MIN_INTERVAL_MS - now;
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    _lastSentAt = Date.now();
  });
  return _gate;
}
let _lastSentAt = 0;

export interface ResendSendResult {
  id: string; // id du message Resend
  from: string; // adresse expéditrice effective (COLD_FROM)
}

// Envoie un email cold via Resend. Corps en TEXTE BRUT (anti-détection + délivrabilité).
// Lit RESEND_API_KEY, COLD_FROM et COLD_REPLY_TO depuis l'env (rien de hardcodé).
export async function sendColdEmailResend(args: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<ResendSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("[cold/resend] RESEND_API_KEY manquante");
  const from = process.env.COLD_FROM;
  if (!from) throw new Error("[cold/resend] COLD_FROM manquante");
  const replyTo = args.replyTo ?? process.env.COLD_REPLY_TO;

  // List-Unsubscribe one-click (RFC 8058) : lien HTTPS signé, pas de mailto.
  // Conformité Gmail/Yahoo + point mail-tester. Posé seulement si l'unsub est configuré.
  const mailHeaders = unsubscribeHeaders(args.to);

  await rateLimit();

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: args.to,
        subject: args.subject,
        text: args.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(mailHeaders ? { headers: mailHeaders } : {}),
      }),
    });
  } catch (err) {
    // Pas de réponse HTTP (DNS, timeout, reset) : échec réseau explicite.
    throw new ResendSendError(0, "network", null, err instanceof Error ? err.message : String(err));
  }

  const rawBody = await res.text();

  if (res.status === 200 || res.status === 201) {
    let id: string | undefined;
    try {
      id = (JSON.parse(rawBody) as { id?: string }).id;
    } catch {
      /* body non JSON : traité comme erreur serveur ci-dessous */
    }
    if (!id) {
      throw new ResendSendError(res.status, "server", null, `réponse sans id: ${rawBody.slice(0, 200)}`);
    }
    return { id, from };
  }

  // Échec : on capture le code Resend + un extrait du body, puis on lève.
  let resendCode: string | null = null;
  try {
    resendCode = (JSON.parse(rawBody) as { name?: string }).name ?? null;
  } catch {
    /* body non JSON : resendCode reste null */
  }
  const snippet = rawBody.slice(0, 300);

  let category: ResendErrorCategory;
  if (res.status === 422) category = "validation";
  else if (res.status === 429) category = "rate_limit";
  else if (res.status === 403) category = "aup";
  else if (res.status >= 500) category = "server";
  else category = "client";

  throw new ResendSendError(res.status, category, resendCode, snippet);
}
