import { Request, Response } from "express";
import { getSupabase } from "../lib/supabase.js";

// Phase 6 — VALIDATE. L'humain liste les posts en attente et approuve/rejette.
// La publication réelle est faite par le cron social-publish une fois approuvé.

const TABLE = "social_posts";

// GET /social/pending — posts en attente de validation.
export async function socialPendingRoute(_req: Request, res: Response): Promise<void> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    res.json({ posts: data || [] });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}

// POST /social/approve { id, scheduledAt?, approvedBy?, caption? }
// caption optionnel = l'humain peut corriger le texte avant d'approuver.
export async function socialApproveRoute(req: Request, res: Response): Promise<void> {
  const { id, scheduledAt, approvedBy, caption } = req.body as {
    id?: string;
    scheduledAt?: string;
    approvedBy?: string;
    caption?: string;
  };
  if (!id) {
    res.status(400).json({ error: "id requis" });
    return;
  }
  try {
    const update: Record<string, unknown> = {
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: approvedBy || "operator",
      scheduled_at: scheduledAt || null,
    };
    if (typeof caption === "string" && caption.trim()) update.caption = caption.trim();

    const { data, error } = await getSupabase()
      .from(TABLE)
      .update(update)
      .eq("id", id)
      .eq("status", "pending") // n'approuve qu'un post en attente
      .select("id")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) {
      res.status(404).json({ error: "post introuvable ou déjà traité" });
      return;
    }
    res.json({ ok: true, id });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}

// POST /social/reject { id, reason? }
export async function socialRejectRoute(req: Request, res: Response): Promise<void> {
  const { id, reason } = req.body as { id?: string; reason?: string };
  if (!id) {
    res.status(400).json({ error: "id requis" });
    return;
  }
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .update({ status: "rejected", error: reason || "rejeté par l'opérateur" })
      .eq("id", id)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) {
      res.status(404).json({ error: "post introuvable ou déjà traité" });
      return;
    }
    res.json({ ok: true, id });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}
