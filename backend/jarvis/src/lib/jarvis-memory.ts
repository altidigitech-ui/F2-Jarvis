import { getSupabase } from "./supabase.js";

type Persona = "fabrice" | "romain";
type Mode = "normal" | "f2";
type Role = "user" | "assistant" | "system";

export interface JarvisMessage {
  id: string;
  role: Role;
  content: string;
  image_media_type?: string | null;
  image_data?: string | null;
  tool_calls?: unknown;
  pending_action_id?: string | null;
  created_at: string;
}

export interface JarvisConversation {
  id: string;
  user_id: string;
  persona: Persona;
  mode: Mode;
  summary: string | null;
  summary_tokens: number;
  created_at: string;
  updated_at: string;
}

/**
 * Loads the active conversation for (userId, persona, mode). Creates one if none exists.
 * Returns the conversation row (never null).
 */
export async function loadOrCreateConversation(
  userId: string,
  persona: Persona,
  mode: Mode
): Promise<JarvisConversation> {
  const sb = getSupabase();
  const { data: existing, error: readErr } = await sb
    .from("jarvis_conversations")
    .select("*")
    .eq("user_id", userId)
    .eq("persona", persona)
    .eq("mode", mode)
    .maybeSingle();

  if (readErr) throw new Error(`[jarvis-memory] loadConversation read: ${readErr.message}`);
  if (existing) return existing as JarvisConversation;

  const { data: created, error: insertErr } = await sb
    .from("jarvis_conversations")
    .insert({ user_id: userId, persona, mode })
    .select("*")
    .single();

  if (insertErr || !created) {
    throw new Error(`[jarvis-memory] createConversation: ${insertErr?.message || "unknown"}`);
  }
  return created as JarvisConversation;
}

/**
 * Loads the last N messages of a conversation, oldest-first.
 */
export async function loadMessages(
  conversationId: string,
  limit = 50
): Promise<JarvisMessage[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("jarvis_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`[jarvis-memory] loadMessages: ${error.message}`);
  const rows = (data || []) as JarvisMessage[];
  return rows.reverse();
}

/**
 * Persists a single turn (user or assistant). Returns the inserted id.
 */
export async function saveMessage(
  conversationId: string,
  role: Role,
  content: string,
  options: {
    imageMediaType?: string;
    imageData?: string;
    toolCalls?: unknown;
    pendingActionId?: string;
  } = {}
): Promise<string> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("jarvis_messages")
    .insert({
      conversation_id: conversationId,
      role,
      content,
      image_media_type: options.imageMediaType || null,
      image_data: options.imageData || null,
      tool_calls: options.toolCalls ?? [],
      pending_action_id: options.pendingActionId || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`[jarvis-memory] saveMessage: ${error?.message || "unknown"}`);
  }
  return (data as { id: string }).id;
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function sumMessageTokens(msgs: JarvisMessage[]): number {
  return msgs.reduce((acc, m) => acc + estimateTokens(m.content), 0);
}
