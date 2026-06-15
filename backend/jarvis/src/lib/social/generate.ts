// Phase 6 — GENERATE. Claude génère la caption d'un post réseau pour une
// plateforme + un angle. Contraintes ANTI-IA (§0) injectées. Le média
// (vidéo/image) est produit hors backend (Higgsfield/Canva) ; ici = le texte.

import type { SocialPlatform } from "./types.js";

// Angles de contenu StoreMD (santé boutique Shopify). Rotation par jour.
export const CONTENT_ANGLES = [
  "App bloat: the average Shopify store runs 14 apps adding 2.8-7s of load time.",
  "Each second of load time costs about 7% of conversions. Most merchants never measure it.",
  "Hidden conversion leaks: broken checkout scripts, render-blocking apps, mixed content.",
  "Store health is invisible until it costs a sale. A scan surfaces what dashboards hide.",
  "Security and trust signals that quietly suppress conversion (mixed content, expired certs).",
  "Why one slow app can drag your whole storefront, and how to find which one.",
  "SEO basics merchants miss: robots.txt blocking, missing meta, no alt text.",
];

export function angleForDay(dayIndex: number): string {
  return CONTENT_ANGLES[dayIndex % CONTENT_ANGLES.length];
}

// Guidage par plateforme (longueur, ton, format).
const PLATFORM_GUIDE: Record<SocialPlatform, string> = {
  x: "X/Twitter: under 270 characters, punchy, one idea, no hashtags spam (0-1 max).",
  linkedin: "LinkedIn: 3-6 short paragraphs, professional but plain, a concrete insight, no buzzwords.",
  facebook: "Facebook: 2-4 sentences, conversational, one clear takeaway.",
  instagram: "Instagram caption: a strong first line hook, then 2-3 short lines, up to 3 relevant hashtags at the end.",
  tiktok: "TikTok caption: a short hook line for a video, casual tone, up to 3 hashtags.",
};

export async function generateCaption(platform: SocialPlatform, brief: string): Promise<string> {
  const prompt = `Write one social post for StoreMD, an AI agent that monitors Shopify store health (speed, apps, conversion, security).

Platform: ${PLATFORM_GUIDE[platform]}
Angle for this post: ${brief}

Rules (strict):
- English. Plain text. No markdown.
- Do NOT use the em-dash character. Do NOT use the "not X, it's Y" structure.
- Vary sentence length. Sound like a builder talking to merchants, not a brand bot.
- No invented stats or fake testimonials. No "many users", "impressive growth".
- One clear point. Soft, non-pushy.

Return only the post text.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    throw new Error(`[social/generate] Haiku HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
  let caption = (data.content || []).filter((b) => b.type === "text" && b.text).map((b) => b.text!).join("\n").trim();
  caption = caption.replace(/—/g, ", "); // garde-fou ANTI-IA
  return caption;
}

// kind par défaut selon la plateforme (les visuels viennent de Higgsfield/Canva).
export function defaultKind(platform: SocialPlatform): "text" | "image" | "video" {
  if (platform === "tiktok") return "video";
  if (platform === "instagram") return "image";
  return "text";
}
