-- Drop l'index doublon sur jarvis_pending_actions
-- Pour les déploiements qui ont appliqué la version initiale de 001_jarvis_memory.sql
-- avec les 2 indexes identiques, retire celui qui est en doublon.
-- Les 2 indexes avaient la même définition exacte :
--   jarvis_pending_actions_conv_idx           : USING btree (conversation_id, status, created_at)
--   jarvis_pending_actions_conv_status_idx    : USING btree (conversation_id, status, created_at)
-- On garde le second qui est mieux nommé.

DROP INDEX IF EXISTS public.jarvis_pending_actions_conv_idx;
