// Routes du pipeline de génération de batch async.
// - POST /batch/generate : enfile un job de génération (surtout pour test manuel ;
//   en prod c'est le tool generate_batch (phase 5) qui enqueue).
// - GET  /batch/job/:id  : statut du job, lu depuis Redis (clé écrite par jobGenerateBatch).
// Les deux routes sont derrière le middleware d'auth global (X-JARVIS-AUTH).

import { Request, Response } from "express";
import { enqueueBatch } from "../lib/queues.js";
import { getRedis } from "../lib/redis.js";
import type { BatchJobData } from "../lib/batch/types.js";

const PERSONAS = ["romain", "fabrice"] as const;
const MODES = ["normal", "f2"] as const;

export async function batchGenerateRoute(req: Request, res: Response): Promise<void> {
  const body = (req.body || {}) as Partial<BatchJobData>;
  const { conversationId, persona, mode, weekNumber, framing, product } = body;

  if (!conversationId) {
    res.status(400).json({ error: "conversationId requis" });
    return;
  }
  if (!persona || !PERSONAS.includes(persona)) {
    res.status(400).json({ error: `persona invalide (attendu: ${PERSONAS.join(", ")})` });
    return;
  }
  if (!mode || !MODES.includes(mode)) {
    res.status(400).json({ error: `mode invalide (attendu: ${MODES.join(", ")})` });
    return;
  }
  if (typeof weekNumber !== "number" || !Number.isInteger(weekNumber)) {
    res.status(400).json({ error: "weekNumber entier requis" });
    return;
  }
  if (!framing) {
    res.status(400).json({ error: "framing requis" });
    return;
  }

  try {
    const job = await enqueueBatch({ conversationId, persona, mode, weekNumber, framing, product });
    res.json({ ok: true, jobId: job.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/batch/generate]", err);
    res.status(500).json({ error: msg });
  }
}

export async function batchJobStatusRoute(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "id required" });
    return;
  }
  try {
    const raw = await getRedis().get(`batch:job:${id}`);
    if (!raw) {
      res.status(404).json({ error: "job not found or expired" });
      return;
    }
    res.json(JSON.parse(raw));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/batch/job/:id]", err);
    res.status(500).json({ error: msg });
  }
}
