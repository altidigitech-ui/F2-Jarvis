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

/**
 * Compresses a conversation when it grows too long.
 * Summarizes the oldest messages (all except the last 20) using Haiku.
 * Stores result in the `summary` column — used in the next session's system prompt.
 * Non-blocking: safe to call fire-and-forget.
 */
export async function compressConversationIfNeeded(
  conversationId: string,
  messageCount: number
): Promise<void> {
  // Trigger at 30 messages, then every 10 after that
  if (messageCount < 30 || messageCount % 10 !== 0) return;

  const sb = getSupabase();
  try {
    const toSummarize = messageCount - 20;
    const { data: oldMsgs } = await sb
      .from("jarvis_messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .limit(toSummarize);

    if (!oldMsgs || oldMsgs.length < 5) return;

    const transcript = (oldMsgs as Array<{ role: string; content: string }>)
      .map(m => `[${m.role.toUpperCase()}]: ${m.content.slice(0, 400)}`)
      .join("\n\n");

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: `Résume cette conversation FoundryTwo en 5-8 bullets clairs (français). Capture : décisions prises, actions validées, publications, cold envoyés, contexte clé. Format : "- [sujet] : [info clé]"\n\n${transcript}`,
        }],
      }),
    });

    if (!res.ok) return;

    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const summary = (data.content || []).filter(b => b.type === "text" && b.text).map(b => b.text!).join("\n");

    if (summary) {
      await sb.from("jarvis_conversations").update({
        summary,
        summary_tokens: estimateTokens(summary),
      }).eq("id", conversationId);
      console.log(`[jarvis-memory] compressed conv ${conversationId} (${messageCount} msgs → summary)`);
    }
  } catch (err) {
    console.warn("[jarvis-memory] compressConversationIfNeeded failed:", err);
  }
}
