-- Phase 4b — Bascule de l'envoi cold sur l'API Resend (HTTP direct depuis le worker).
-- Ajoute la traçabilité de l'id de message Resend retourné à chaque envoi.
-- Run in Supabase SQL Editor (or via supabase CLI). Base = Supabase de JARVIS.

alter table public.cold_targets
  add column if not exists resend_message_id text;  -- id retourné par POST api.resend.com/emails

-- Lookup par id Resend (utilisé par le futur webhook bounce/complaint, lot 2).
create index if not exists idx_ct_resend_message_id
  on public.cold_targets (resend_message_id)
  where resend_message_id is not null;

-- Recharger le schéma PostgREST après migration.
NOTIFY pgrst, 'reload schema';
