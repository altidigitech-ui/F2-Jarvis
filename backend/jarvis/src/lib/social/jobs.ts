// Phase 6 — jobs du moteur réseaux.
//  social-generate (cron quotidien) : 1 brouillon/jour/canal activé → status pending.
//  social-publish  (cron) : publie les posts APPROUVÉS et dus.
// L'humain valide entre les deux via les routes /social/* (VALIDATE).

import { getSupabase } from "../supabase.js";
import { generateCaption, defaultKind, angleForDay } from "./generate.js";
import { enabledPlatforms, publish } from "./publishers/index.js";
import type { SocialPost } from "./types.js";

const TABLE = "social_posts";
const DAY_MS = 24 * 60 * 60 * 1000;

function dayStartIso(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

// Existe-t-il déjà un post du jour pour cette plateforme (idempotence du cron) ?
async function hasTodayPost(platform: string): Promise<boolean> {
  const { data } = await getSupabase()
    .from(TABLE)
    .select("id")
    .eq("platform", platform)
    .gte("created_at", dayStartIso())
    .not("status", "in", "(rejected,failed)")
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

// GENERATE : 1 brouillon par canal activé, en attente de validation.
export async function jobSocialGenerate(): Promise<{ created: number }> {
  const sb = getSupabase();
  const platforms = enabledPlatforms();
  const dayIndex = Math.floor(Date.now() / DAY_MS);
  const brief = angleForDay(dayIndex);
  let created = 0;

  for (const platform of platforms) {
    if (await hasTodayPost(platform)) continue; // déjà généré aujourd'hui
    try {
      const caption = await generateCaption(platform, brief);
      const { error } = await sb.from(TABLE).insert({
        platform,
        kind: defaultKind(platform),
        caption,
        ai_labeled: true,
        status: "pending",
        brief,
      });
      if (error) {
        console.error(`[social/jobs] insert ${platform}:`, error.message);
      } else {
        created++;
      }
    } catch (err) {
      console.error(`[social/jobs] generate ${platform}:`, err instanceof Error ? err.message : err);
    }
  }
  return { created };
}

// PUBLISH : publie les posts approuvés et dus (scheduled_at <= now ou non planifié).
export async function jobSocialPublish(): Promise<{ published: number; failed: number }> {
  const sb = getSupabase();
  const nowIso = new Date().toISOString();
  const { data, error } = await sb
    .from(TABLE)
    .select("*")
    .eq("status", "approved")
    .or(`scheduled_at.is.null,scheduled_at.lte.${nowIso}`)
    .limit(25);
  if (error) throw new Error(`[social/jobs] publish query: ${error.message}`);

  const posts = (data || []) as SocialPost[];
  let published = 0;
  let failed = 0;

  for (const post of posts) {
    // Un post média sans média ne part pas (le visuel vient de Higgsfield/Canva).
    if (post.kind !== "text" && !post.media_url) {
      await sb.from(TABLE).update({ status: "failed", error: "média manquant (à attacher avant publication)" }).eq("id", post.id);
      failed++;
      continue;
    }
    try {
      const r = await publish(post);
      await sb.from(TABLE).update({
        status: "published",
        external_id: r.externalId,
        external_url: r.externalUrl,
        error: null,
      }).eq("id", post.id);
      published++;
    } catch (err) {
      await sb.from(TABLE).update({
        status: "failed",
        error: (err instanceof Error ? err.message : String(err)).slice(0, 300),
      }).eq("id", post.id);
      failed++;
    }
  }
  return { published, failed };
}
