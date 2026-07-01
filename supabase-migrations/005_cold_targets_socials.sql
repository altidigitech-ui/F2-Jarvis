-- Étape 2.2 — Capture des réseaux sociaux des boutiques (source Apify contacts[]).
-- Base = Supabase de JARVIS (cold_targets). À lancer dans le SQL Editor Supabase Jarvis.
-- Ajoute une colonne jsonb social_handles : map { "facebook": "https://...", "instagram": "https://..." }.
-- Réseaux capturés = tout method Apify hors web/contact_url/email/phone.

alter table public.cold_targets
  add column if not exists social_handles jsonb;
