import { Request, Response } from "express";
import { executeAction } from "../lib/action-executor.js";
import { getSupabase } from "../lib/supabase.js";
import { cacheInvalidateAll } from "../lib/cache.js";

export async function actionExecuteBatchRoute(req: Request, res: Response): Promise<void> {
  const userId = (req.headers["x-user-id"] as string | undefined) || "";
  if (!userId) {
    res.status(401).json({ error: "X-USER-ID required" });
    return;
  }

  const { action_ids, rejected_ids } = req.body as {
    action_ids?: string[];
    rejected_ids?: string[];
  };

  if (!action_ids || action_ids.length === 0) {
    res.status(400).json({ error: "action_ids required" });
    return;
  }

  try {
    const sb = getSupabase();

    // Verify ownership of all actions
    const { data: rows, error: readErr } = await sb
      .from("jarvis_pending_actions")
      .select("id, conversation_id, jarvis_conversations!inner(user_id)")
      .in("id", action_ids);

    if (readErr || !rows || rows.length === 0) {
      res.status(404).json({ error: "Actions not found" });
      return;
    }

    for (const row of rows) {
      const owner = (row as unknown as { jarvis_conversations: { user_id: string } })
        .jarvis_conversations.user_id;
      if (owner !== userId) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
    }

    // Execute all selected actions sequentially
    const results: Array<{ id: string; ok: boolean; error?: string }> = [];
    for (const actionId of action_ids) {
      try {
        await executeAction(actionId);
        results.push({ id: actionId, ok: true });
      } catch (err) {
        results.push({
          id: actionId,
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    // Mark rejected actions
    if (rejected_ids && rejected_ids.length > 0) {
      await sb
        .from("jarvis_pending_actions")
        .update({ status: "rejected" })
        .in("id", rejected_ids)
        .eq("status", "pending");
    }

    cacheInvalidateAll();

    const successCount = results.filter((r) => r.ok).length;
    console.log(`[/action/execute-batch] ${successCount}/${action_ids.length} actions executed`);
    res.json({ ok: true, results });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/action/execute-batch]", err);
    res.status(500).json({ error: msg });
  }
}
