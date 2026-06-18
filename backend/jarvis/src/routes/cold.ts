import { Request, Response } from "express";
import { getSupabase } from "../lib/supabase.js";
import { ghUpdate } from "../lib/github.js";

// GET /cold/cycle-log — appelé par le cron existant /api/commit-batch (Vercel),
// PAS un cron parallèle (plan §8). Calcule l'activité cold du jour (service-role)
// et ajoute UNE ligne à tracking/batch-log.md. Le détail nominatif reste dans
// Supabase cold_targets.

const BATCH_LOG = "tracking/batch-log.md";

// Diff entre l'heure murale Paris et UTC, pour "now".
function parisOffsetMs(d: Date): number {
  const utc = new Date(d.toLocaleString("en-US", { timeZone: "UTC" }));
  const paris = new Date(d.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return paris.getTime() - utc.getTime();
}

// Instant UTC (ISO) de minuit, jour courant côté Paris.
function parisDayStartIso(now: Date): string {
  const ymd = now.toLocaleDateString("en-CA", { timeZone: "Europe/Paris" }); // YYYY-MM-DD
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0) - parisOffsetMs(now)).toISOString();
}

function cestStamp(now: Date): string {
  return now
    .toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "");
}

function appendBatchLine(md: string, line: string): string {
  if (!md || md.trim() === "") {
    return `# Batch Log\n\n| Timestamp | Cycle | Note |\n|-----------|-------|------|\n${line}\n`;
  }
  const lines = md.split("\n");
  let lastTableIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*\|/.test(lines[i])) lastTableIdx = i;
  }
  if (lastTableIdx === -1) return md + "\n" + line;
  lines.splice(lastTableIdx + 1, 0, line);
  return lines.join("\n");
}

export async function coldCycleLogRoute(_req: Request, res: Response): Promise<void> {
  const sb = getSupabase();
  const now = new Date();
  const dayStart = parisDayStartIso(now);

  try {
    const [sourced, sent, replies] = await Promise.all([
      sb.from("cold_targets").select("id", { count: "exact", head: true }).gte("created_at", dayStart),
      sb
        .from("cold_targets")
        .select("id", { count: "exact", head: true })
        .not("sending_inbox", "is", null)
        .gte("updated_at", dayStart),
      sb
        .from("cold_targets")
        .select("id", { count: "exact", head: true })
        .in("status", ["replied", "unsubscribed", "bounced", "interested"])
        .gte("updated_at", dayStart),
    ]);

    const note = `${sourced.count ?? 0} sourcés, ${sent.count ?? 0} envoyés, ${replies.count ?? 0} réponses`;
    const line = `| ${cestStamp(now)} CEST | Cold | ${note} |`;

    await ghUpdate(BATCH_LOG, (md) => appendBatchLine(md, line), "[COLD] cycle log");
    res.json({ ok: true, note });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/cold/cycle-log]", msg);
    res.status(500).json({ error: msg });
  }
}

import { enqueueCold } from "../lib/queues.js";
import type { ColdJobName } from "../lib/cold/types.js";

const VALID_COLD_JOBS: ColdJobName[] = ["qualify", "enrich", "scan", "compose", "push"];

// POST /cold/enqueue { name, targetId } — enfile un job cold sur une cible.
export async function coldEnqueueRoute(req: Request, res: Response): Promise<void> {
  const { name, targetId } = (req.body || {}) as { name?: string; targetId?: string };
  if (!name || !VALID_COLD_JOBS.includes(name as ColdJobName)) {
    res.status(400).json({ error: `name invalide (attendu: ${VALID_COLD_JOBS.join(", ")})` });
    return;
  }
  if (!targetId) {
    res.status(400).json({ error: "targetId requis" });
    return;
  }
  try {
    const job = await enqueueCold(name as ColdJobName, { targetId });
    res.json({ ok: true, jobId: job.id, name, targetId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/cold/enqueue]", msg);
    res.status(500).json({ error: msg });
  }
}
