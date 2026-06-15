// Publisher X / Twitter — le canal le plus simple, à brancher en premier
// (cf. 04-RESEAUX-API.md). API v2 POST /2/tweets, contexte utilisateur OAuth2
// (scope tweet.write). Texte uniquement pour l'instant (l'upload média X =
// flux v1.1 séparé, à ajouter quand on poste des visuels).
//
// Token : X_ACCESS_TOKEN (OAuth2 user-context, tweet.write). Le refresh OAuth2
// (token 2h) est un TODO Phase 6 — ici on consomme un token déjà rafraîchi.

import type { SocialPost } from "../types.js";
import type { PublishResult } from "./index.js";

export function isXConfigured(): boolean {
  return Boolean(process.env.X_ACCESS_TOKEN);
}

export async function publishToX(post: SocialPost): Promise<PublishResult> {
  const token = process.env.X_ACCESS_TOKEN;
  if (!token) throw new Error("[social/x] X_ACCESS_TOKEN non configuré");

  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: post.caption }),
  });

  if (!res.ok) {
    throw new Error(`[social/x] POST /2/tweets HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { data?: { id?: string } };
  const id = data.data?.id || null;
  return {
    externalId: id,
    externalUrl: id ? `https://x.com/i/web/status/${id}` : null,
  };
}
