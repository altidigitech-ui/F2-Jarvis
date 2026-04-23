import { Request, Response } from "express";
import { getSupabase } from "../lib/supabase.js";

export async function actionDetailsRoute(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "id required" });
    return;
  }

  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("jarvis_pending_actions")
      .select("id, action_type, preview, status, params")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (!data) {
      res.status(404).json({ error: "Action not found" });
      return;
    }
    res.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/action/:id]", err);
    res.status(500).json({ error: msg });
  }
}
