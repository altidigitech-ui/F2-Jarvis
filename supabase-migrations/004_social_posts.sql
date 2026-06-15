-- Phase 6 — La Machine F2 / Moteur réseaux — social_posts
-- File d'attente des publications réseaux (PLAN → GENERATE → VALIDATE → PUBLISH).
-- Source : marketing/saas-app-shopify/storemd/machine/plan.md (Phase 6).
-- Run in Supabase SQL Editor (or via supabase CLI).

create extension if not exists "pgcrypto";

-- ============================================================================
-- social_posts — un post par (plateforme, jour). L'humain valide avant publication.
-- ============================================================================
create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  platform text not null
    check (platform in ('x', 'instagram', 'facebook', 'tiktok', 'linkedin')),
  kind text not null default 'text'
    check (kind in ('text', 'image', 'video')),
  caption text not null,
  media_url text,                      -- rempli hors backend (Higgsfield/Canva) si kind != text
  ai_labeled boolean not null default true,  -- contenu IA : label requis (TikTok/Meta)
  scheduled_at timestamptz,            -- créneau de publication souhaité
  status text not null default 'pending'
    check (status in ('draft', 'pending', 'approved', 'rejected', 'published', 'failed')),
  external_id text,                    -- id du post chez la plateforme après publication
  external_url text,
  approved_by text,
  approved_at timestamptz,
  error text,
  brief text                           -- angle / source de génération
);

create index if not exists idx_sp_status on public.social_posts (status);
create index if not exists idx_sp_sched on public.social_posts (scheduled_at);

-- ============================================================================
-- Trigger updated_at
-- ============================================================================
create or replace function public.social_posts_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists social_posts_set_updated_at on public.social_posts;
create trigger social_posts_set_updated_at
  before update on public.social_posts
  for each row execute function public.social_posts_touch_updated_at();

-- ============================================================================
-- RLS — données machine, accès backend (service-role) uniquement.
-- ============================================================================
alter table public.social_posts enable row level security;
-- NB: le backend utilise SUPABASE_SERVICE_ROLE_KEY (bypass RLS). Pas de policy
-- publique : la validation humaine passe par les routes /social/* (auth backend).

NOTIFY pgrst, 'reload schema';
