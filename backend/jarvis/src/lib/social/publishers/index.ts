// Dispatcher de publication. X est implémenté (canal #1). IG/FB/TikTok/LinkedIn
// dépendent d'approbations longues (app review Meta 2-4 sem, audit TikTok 2-6 sem,
// LinkedIn) ET d'endpoints qui changent souvent — 04-RESEAUX-API.md dit
// explicitement de NE PAS coder ces flux sans revérifier la doc officielle au
// build. Ils sont donc volontairement non activés ici (NotEnabledError) avec le
// flux documenté en commentaire, à implémenter quand l'accès est accordé.

import type { SocialPlatform, SocialPost } from "../types.js";
import { isXConfigured, publishToX } from "./x.js";

export interface PublishResult {
  externalId: string | null;
  externalUrl: string | null;
}

export class PublisherNotEnabledError extends Error {
  constructor(platform: SocialPlatform) {
    super(`[social] publisher "${platform}" pas encore activé (approbation/tokens + reconfirmer endpoints, cf. 04-RESEAUX-API.md)`);
    this.name = "PublisherNotEnabledError";
  }
}

// Une plateforme est "activée" si son publisher est implémenté ET ses creds sont
// présents. Pour l'instant : X uniquement.
export function isPlatformEnabled(platform: SocialPlatform): boolean {
  switch (platform) {
    case "x":
      return isXConfigured();
    default:
      return false; // IG/FB/TikTok/LinkedIn : à activer après approbation
  }
}

export function enabledPlatforms(): SocialPlatform[] {
  return (["x", "instagram", "facebook", "tiktok", "linkedin"] as SocialPlatform[]).filter(isPlatformEnabled);
}

export async function publish(post: SocialPost): Promise<PublishResult> {
  switch (post.platform) {
    case "x":
      return publishToX(post);
    // instagram : Meta Graph, flux 2 étapes (container puis publish), compte Business,
    //   permission instagram_content_publish, AI-label si média synthétique.
    // facebook : Meta Graph (page), permission pages_manage_posts.
    // tiktok : Content Posting API, init -> poll status, scope video.publish (audit),
    //   AI-label obligatoire sur contenu IA.
    // linkedin : profil perso, scope w_member_social, POST /rest/posts (header
    //   LinkedIn-Version YYYYMM), refresh token 60j.
    default:
      throw new PublisherNotEnabledError(post.platform);
  }
}
