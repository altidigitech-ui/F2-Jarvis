-- Phase 3 — La Machine F2 / Cold Email — cold_source_seeds (rotation mots-clés)
-- Source : remplacement de la SOURCE OpenClaw par l'actor Apify
--   clearpath/shopify-store-leads (id R9SL2PPdhdhLQwdck).
-- L'actor ne propose que ~14 catégories (trop grossier) : on source par MOT-CLÉ
-- avec rotation. Cette table porte le pool de mots-clés + leur usage.
-- Run in Supabase SQL Editor (or via supabase CLI). Base = Supabase de JARVIS.

-- ============================================================================
-- cold_source_seeds — pool de mots-clés de sourcing, avec rotation LRU.
-- sourceStores() prend le moins récemment utilisé (last_used_at NULLS FIRST,
-- times_used ASC) et marque son usage.
-- ============================================================================
create table if not exists public.cold_source_seeds (
  id serial primary key,
  keyword text not null unique,
  last_used_at timestamptz,
  times_used int not null default 0
);

-- Seed initial : ~45 niches e-commerce (Shopify) réparties par vertical.
insert into public.cold_source_seeds (keyword) values
  ('yoga leggings'), ('streetwear hoodies'), ('swimwear'), ('activewear'), ('vintage tees'),
  ('organic skincare'), ('beard oil'), ('vegan makeup'), ('hair extensions'), ('nail polish'),
  ('scented candles'), ('wall art prints'), ('ceramic mugs'), ('bedding sets'), ('indoor plants'),
  ('resistance bands'), ('protein powder'), ('yoga mats'), ('vitamins supplements'), ('home gym'),
  ('dog supplements'), ('cat trees'), ('dog beds'), ('pet grooming'), ('pet toys'),
  ('specialty coffee'), ('hot sauce'), ('loose leaf tea'), ('artisan chocolate'), ('protein snacks'),
  ('phone cases'), ('laptop sleeves'), ('smartwatch bands'), ('wireless earbuds'),
  ('minimalist jewelry'), ('leather wallets'), ('sunglasses'), ('watches'),
  ('baby clothes'), ('wooden toys'), ('nursery decor'),
  ('art supplies'), ('knitting yarn'), ('candle making kits')
on conflict (keyword) do nothing;

-- Index de sélection LRU (le tri principal du picker).
create index if not exists idx_css_rotation
  on public.cold_source_seeds (last_used_at nulls first, times_used);

-- ============================================================================
-- RLS — données machine, accédées uniquement via le backend (service-role).
-- ============================================================================
alter table public.cold_source_seeds enable row level security;
-- NB: le backend utilise SUPABASE_SERVICE_ROLE_KEY qui bypass entièrement la RLS.

-- Après migration, recharger le schéma PostgREST :
NOTIFY pgrst, 'reload schema';
