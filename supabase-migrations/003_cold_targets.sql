-- Phase 1 — La Machine F2 / Cold Email — cold_targets + cold_suppression
-- Source : marketing/saas-app-shopify/storemd/machine/plan.md (Phase 1)
-- Run in Supabase SQL Editor (or via supabase CLI)
-- Base = Supabase de JARVIS (cold_targets). preview_scans reste côté StoreMD.

-- Enable UUID generation if not already
create extension if not exists "pgcrypto";

-- ============================================================================
-- cold_targets — un prospect (boutique Shopify) par ligne, source de vérité
-- nominative du pipeline cold (sourced → ... → interested|closed).
-- ============================================================================
create table if not exists public.cold_targets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  store_url text not null,
  store_domain text not null,
  country text,                       -- US/UK/AU only (filtre dur SOURCE)
  platform_data jsonb,                -- données scrapées (apps, thème, trafic)
  qualify_score int,
  decision_maker_name text,
  decision_maker_email text,
  email_verified boolean not null default false,
  scan_score int,                     -- score global StoreMD (preview_scans + réponse endpoint)
  scan_findings jsonb,                -- findings détaillés = RÉPONSE de l'endpoint interne StoreMD
  email_subject text,
  email_body text,
  sending_inbox text,                 -- quelle boîte du fournisseur cold a envoyé
  next_touch_at timestamptz,          -- prochaine relance due (J0/J3/J7/J15)
  touch_count int not null default 0,
  status text not null default 'sourced'
    check (status in (
      'sourced', 'qualified', 'rejected',
      'enriched', 'unreachable',
      'scanned', 'composed', 'in_sequence',
      'replied', 'bounced', 'unsubscribed',
      'interested', 'closed'
    )),
  reply_category text
    check (reply_category in ('interested', 'objection', 'not_now', 'unsubscribe')),
  error text,
  constraint uq_cold_targets_domain unique (store_domain)
);

create index if not exists idx_ct_status
  on public.cold_targets (status);
create index if not exists idx_ct_next_touch
  on public.cold_targets (next_touch_at);

-- ============================================================================
-- cold_suppression — désinscriptions + bounces hard, JAMAIS recontactés.
-- Vérifiée avant tout envoi (garde-fou non négociable).
-- ============================================================================
create table if not exists public.cold_suppression (
  email text primary key,
  reason text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Trigger — auto-update cold_targets.updated_at à chaque modification
-- ============================================================================
create or replace function public.cold_targets_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cold_targets_set_updated_at on public.cold_targets;
create trigger cold_targets_set_updated_at
  before update on public.cold_targets
  for each row execute function public.cold_targets_touch_updated_at();

-- ============================================================================
-- RLS — données machine, accédées uniquement via le backend (service-role).
-- Aucune policy publique : anon/authenticated ne voient rien.
-- ============================================================================
alter table public.cold_targets enable row level security;
alter table public.cold_suppression enable row level security;

-- NB: le backend utilise SUPABASE_SERVICE_ROLE_KEY qui bypass entièrement la RLS.
-- Ces tables n'ont pas de propriétaire user_id (données studio, pas par-utilisateur),
-- donc pas de policy de lecture publique : tout passe par la couche applicative.

-- Après migration, recharger le schéma PostgREST :
NOTIFY pgrst, 'reload schema';
