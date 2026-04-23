import { Request, Response } from "express";
import { executeAction, resolveFilePath, applyTransform } from "../lib/action-executor.js";
import { getSupabase } from "../lib/supabase.js";
import { ghUpdate } from "../lib/github.js";
import { cacheInvalidateAll } from "../lib/cache.js";

type Persona = "fabrice" | "romain";

type ActionRow = {
  id: string;
  status: string;
  action_type: string;
  params: Record<string, unknown>;
  preview: string;
  jarvis_conversations: { user_id: string; persona: Persona };
};

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

    const { data: rows, error: readErr } = await sb
      .from("jarvis_pending_actions")
      .select("id, status, action_type, params, preview, jarvis_conversations!inner(user_id, persona)")
      .in("id", action_ids);

    if (readErr) {
      res.status(500).json({ error: readErr.message });
      return;
    }
    if (!rows || rows.length === 0) {
      res.status(404).json({ error: "Actions not found" });
      return;
    }

    const allRows = rows as unknown as ActionRow[];
    // Only process pending/validated — return already-executed ones as ok:true (idempotent)
    const actions = allRows.filter((r) => r.status === "pending" || r.status === "validated");
    const alreadyDone = allRows.filter((r) => r.status === "executed");

    for (const row of allRows) {
      if (row.jarvis_conversations.user_id !== userId) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
    }

    const results: Array<{ id: string; ok: boolean; error?: string }> = alreadyDone.map((r) => ({ id: r.id, ok: true }));
    const normalExecutedIds: string[] = [];
    const failedById = new Map<string, string>();

    // create_file: each writes to its own unique file — call executeAction individually
    const createFileActions = actions.filter((a) => a.action_type === "create_file");
    for (const action of createFileActions) {
      try {
        await executeAction(action.id);
        results.push({ id: action.id, ok: true });
      } catch (err) {
        results.push({ id: action.id, ok: false, error: err instanceof Error ? err.message : String(err) });
      }
    }

    // Normal actions: group by target file path → 1 ghRead + N transforms + 1 ghWrite per group
    const normalActions = actions.filter((a) => a.action_type !== "create_file");
    const fileGroups = new Map<string, ActionRow[]>();

    for (const action of normalActions) {
      try {
        const { path } = resolveFilePath(action.action_type, action.jarvis_conversations.persona, action.params);
        if (!fileGroups.has(path)) fileGroups.set(path, []);
        fileGroups.get(path)!.push(action);
      } catch (err) {
        failedById.set(action.id, err instanceof Error ? err.message : String(err));
      }
    }

    for (const [path, group] of fileGroups) {
      try {
        const filename = path.split("/").pop() || path;
        const previews = group.map((a) => a.preview.slice(0, 30).replace(/\n/g, " ")).join(" | ");
        await ghUpdate(
          path,
          (md) => group.reduce((acc, action) => applyTransform(action.action_type, action.params, acc), md),
          `[JARVIS] batch(${group.length}) ${filename}: ${previews.slice(0, 80)}`
        );
        normalExecutedIds.push(...group.map((a) => a.id));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        for (const action of group) failedById.set(action.id, msg);
      }
    }

    // Build results for normal actions
    for (const action of normalActions) {
      if (normalExecutedIds.includes(action.id)) {
        results.push({ id: action.id, ok: true });
      } else if (failedById.has(action.id)) {
        results.push({ id: action.id, ok: false, error: failedById.get(action.id) });
      }
    }

    // Bulk update Supabase for normal actions
    const now = new Date().toISOString();
    if (normalExecutedIds.length > 0) {
      await sb
        .from("jarvis_pending_actions")
        .update({ status: "executed", resolved_at: now })
        .in("id", normalExecutedIds);
    }
    for (const [id, errMsg] of failedById) {
      await sb
        .from("jarvis_pending_actions")
        .update({ status: "failed", error: errMsg, resolved_at: now })
        .eq("id", id);
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
