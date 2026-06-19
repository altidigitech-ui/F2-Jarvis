// Désinscription one-click (RFC 8058) + clic humain. POST = One-Click déclenché
// par Gmail/Yahoo (header List-Unsubscribe-Post), GET = clic depuis un client mail.
// Vit sur le serveur web, HORS middleware auth : la sécurité vient du token HMAC
// signé (cf. unsub-token.ts), pas du header. Le token porte l'email → pas de lookup.

import type { Request, Response } from "express";
import { getSupabase } from "../lib/supabase.js";
import { verifyUnsubToken } from "../lib/cold/unsub-token.js";

function page(message: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Unsubscribe</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 32rem; margin: 4rem auto; padding: 0 1rem; color: #1a1a1a;">
<p style="font-size: 1rem; line-height: 1.5;">${message}</p>
</body></html>`;
}

export async function coldUnsubscribeRoute(req: Request, res: Response): Promise<void> {
  const isGet = req.method === "GET";
  const secret = process.env.COLD_UNSUB_SECRET;
  if (!secret) {
    console.error("[/cold/unsubscribe] COLD_UNSUB_SECRET manquant");
    if (isGet) res.status(500).type("html").send(page("Unsubscribe is temporarily unavailable."));
    else res.status(500).json({ error: "unsubscribe not configured" });
    return;
  }

  const token = (req.query.t as string) || "";
  const email = token ? verifyUnsubToken(token, secret) : null;
  if (!email) {
    if (isGet) res.status(400).type("html").send(page("This unsubscribe link is invalid or has expired."));
    else res.status(400).json({ error: "invalid token" });
    return;
  }

  try {
    const sb = getSupabase();
    await sb.from("cold_suppression").upsert({ email, reason: "list-unsubscribe" });
    // Stoppe toute séquence encore active pour cette adresse.
    await sb.from("cold_targets")
      .update({ status: "unsubscribed", reply_category: "unsubscribe", next_touch_at: null })
      .eq("decision_maker_email", email)
      .in("status", ["in_sequence", "replied"]);
  } catch (err) {
    console.error("[/cold/unsubscribe]", err instanceof Error ? err.message : err);
    if (isGet) res.status(500).type("html").send(page("Something went wrong. Please try again later."));
    else res.status(500).json({ error: "failed" });
    return;
  }

  if (isGet) {
    res.status(200).type("html").send(page("You're unsubscribed. You won't receive any more emails from us."));
  } else {
    // One-Click : 200 suffit, pas de corps attendu.
    res.status(200).json({ ok: true });
  }
}
