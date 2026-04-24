import { Request, Response } from "express";
import { executeAction } from "../lib/action-executor.js";
import { getSupabase } from "../lib/supabase.js";
import { cacheInvalidateAll } from "../lib/cache.js";

export async function actionExecuteRoute(req: Request, res: Response): Promise<void> {
  const userId = (req.headers["x-user-id"] as string | undefined) || "";
  if (!userId) {
    res.status(401).json({ error: "X-USER-ID required" });
    return;
  }

  const { action_id } = req.body as { action_id?: string };
  if (!action_id) {
    res.status(400).json({ error: "action_id required" });
    return;
  }

  try {
    const sb = getSupabase();
    const { data: row, error: readErr } = await sb
      .from("jarvis_pending_actions")
      .select("id, conversation_id, jarvis_conversations!inner(user_id)")
      .eq("id", action_id)
      .single();
    if (readErr || !row) {
      res.status(404).json({ error: "Action not found" });
      return;
    }
    const ownerUserId = (row as unknown as { jarvis_conversations: { user_id: string } })
      .jarvis_conversations.user_id;
    if (ownerUserId !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const updated = await executeAction(action_id);
    cacheInvalidateAll();

    // Check if this action came from an Ouroboros proposal and mark it executed
    try {
      const { data: convRow } = await sb
        .from("jarvis_pending_actions")
        .select("conversation_id")
        .eq("id", action_id)
        .single();

      if (convRow) {
        const { data: recentMsgs } = await sb
          .from("jarvis_messages")
          .select("content")
          .eq("conversation_id", (convRow as { conversation_id: string }).conversation_id)
          .eq("role", "user")
          .order("created_at", { ascending: false })
          .limit(5);

        if (recentMsgs) {
          for (const msg of recentMsgs as Array<{ content: string }>) {
            const sourceMatch = msg.content.match(/\[OUROBOROS_SOURCE:([^\]]+)\]/);
            if (sourceMatch) {
              const { markProposalExecuted } = await import("../lib/action-executor.js");
              await markProposalExecuted(
                sourceMatch[1],
                (updated as { preview?: string }).preview || (updated as { action_type?: string }).action_type || "action"
              );
              break;
            }
          }
        }
      }
    } catch {
      // Non-bloquant
    }

    res.json({ ok: true, action: updated });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
}
