// Types du moteur réseaux (Phase 6). Miroir de social_posts
// (supabase-migrations/004_social_posts.sql).

export type SocialPlatform = "x" | "instagram" | "facebook" | "tiktok" | "linkedin";

export type SocialKind = "text" | "image" | "video";

export type SocialStatus =
  | "draft"
  | "pending"      // généré, en attente de validation humaine
  | "approved"     // validé, en attente de publication (créneau)
  | "rejected"
  | "published"
  | "failed";

export interface SocialPost {
  id: string;
  created_at: string;
  updated_at: string;
  platform: SocialPlatform;
  kind: SocialKind;
  caption: string;
  media_url: string | null;
  ai_labeled: boolean;
  scheduled_at: string | null;
  status: SocialStatus;
  external_id: string | null;
  external_url: string | null;
  approved_by: string | null;
  approved_at: string | null;
  error: string | null;
  brief: string | null;
}

export const ALL_PLATFORMS: SocialPlatform[] = ["x", "instagram", "facebook", "tiktok", "linkedin"];

export type SocialJobName = "social-generate" | "social-publish";

export interface SocialJobData {
  postId?: string;
}
