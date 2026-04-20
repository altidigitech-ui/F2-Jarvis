-- Phase 2 — JARVIS Memory Tables
-- Run in Supabase SQL Editor (or via supabase CLI)

-- Enable UUID generation if not already
create extension if not exists "pgcrypto";

-- ============================================================================
-- jarvis_conversations — one per (user, persona, mode)
-- ============================================================================
create table if not exists public.jarvis_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  persona text not null check (persona in ('fabrice', 'romain')),
  mode text not null check (mode in ('normal', 'f2')),
  summary text,
  summary_tokens int default 0,
  summary_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, persona, mode)
);

create index if not exists jarvis_conversations_user_idx
  on public.jarvis_conversations (user_id);

-- ============================================================================
-- jarvis_messages — every user/assistant turn
-- ============================================================================
create table if not exists public.jarvis_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.jarvis_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  image_media_type text,
  image_data text,
  tool_calls jsonb not null default '[]'::jsonb,
  pending_action_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists jarvis_messages_conv_idx
  on public.jarvis_messages (conversation_id, created_at);

-- ============================================================================
-- jarvis_pending_actions — reserved for Phase 3, created now to avoid rework
-- ============================================================================
create table if not exists public.jarvis_pending_actions (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.jarvis_conversations(id) on delete cascade,
  message_id uuid references public.jarvis_messages(id) on delete set null,
  action_type text not null,
  params jsonb not null,
  preview text not null,
  status text not null check (status in ('pending', 'validated', 'rejected', 'executed', 'failed')) default 'pending',
  commit_sha text,
  error text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists jarvis_pending_actions_conv_status_idx
  on public.jarvis_pending_actions (conversation_id, status, created_at);

-- ============================================================================
-- Triggers — auto-update conversations.updated_at on message insert
-- ============================================================================
create or replace function public.jarvis_touch_conversation()
returns trigger
language plpgsql
as $$
begin
  update public.jarvis_conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists jarvis_messages_touch on public.jarvis_messages;
create trigger jarvis_messages_touch
  after insert on public.jarvis_messages
  for each row execute function public.jarvis_touch_conversation();

-- ============================================================================
-- RLS — each user only sees their own conversations
-- ============================================================================
alter table public.jarvis_conversations enable row level security;
alter table public.jarvis_messages enable row level security;
alter table public.jarvis_pending_actions enable row level security;

-- Users read their own conversations
drop policy if exists jarvis_conv_read_own on public.jarvis_conversations;
create policy jarvis_conv_read_own
  on public.jarvis_conversations for select
  using (user_id = auth.uid());

-- Users read messages from their own conversations
drop policy if exists jarvis_msg_read_own on public.jarvis_messages;
create policy jarvis_msg_read_own
  on public.jarvis_messages for select
  using (
    conversation_id in (
      select id from public.jarvis_conversations where user_id = auth.uid()
    )
  );

drop policy if exists jarvis_pa_read_own on public.jarvis_pending_actions;
create policy jarvis_pa_read_own
  on public.jarvis_pending_actions for select
  using (
    conversation_id in (
      select id from public.jarvis_conversations where user_id = auth.uid()
    )
  );

-- NB: the backend uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS entirely,
-- so writes/inserts are authorized at the application layer (we verify the
-- user_id matches the authenticated session in the proxy).
