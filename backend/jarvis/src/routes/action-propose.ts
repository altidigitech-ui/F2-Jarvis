import { Request, Response } from "express";
import { getSupabase } from "../lib/supabase.js";

/**
 * Manual /action/propose endpoint. Mostly used for testing.
 * In normal flow, JARVIS calls the propose_action tool which inserts directly.
 */
export async function actionProposeRoute(req: Request, res: Response): Promise<void> {
  const userId = (req.headers["x-user-id"] as string | undefined) || "";
  if (!userId) {
    res.status(401).json({ error: "X-USER-ID required" });
    return;
  }

  const { persona, mode, action_type, params, preview } = req.body as {
    persona?: "fabrice" | "romain";
    mode?: "normal" | "f2";
    action_type?: string;
    params?: Record<string, unknown>;
    preview?: string;
  };

  if (!persona || !action_type || !params || !preview) {
    res.status(400).json({ error: "Missing fields: persona, action_type, params, preview" });
    return;
  }

  try {
    const sb = getSupabase();
    const { data: conv, error: convErr } = await sb
      .from("jarvis_conversations")
      .select("id")
      .eq("user_id", userId)
      .eq("persona", persona)
      .eq("mode", mode || "normal")
      .maybeSingle();

    if (convErr || !conv) {
      res.status(404).json({ error: "No active conversation for user/persona/mode" });
      return;
    }

    const { data, error } = await sb
      .from("jarvis_pending_actions")
      .insert({
        conversation_id: (conv as { id: string }).id,
        action_type,
        params,
        preview,
      })
      .select("*")
      .single();

    if (error || !data) {
      res.status(500).json({ error: error?.message || "insert failed" });
      return;
    }
    res.json({ ok: true, action: data });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}
