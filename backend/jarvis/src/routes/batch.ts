import { Request, Response } from "express";
import { ghRead, ghList, ghCreateFromBase64 } from "../lib/github.js";

const WEEK_EPOCH = new Date("2026-04-06T00:00:00+02:00").getTime();
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function currentWeekNumber(): number {
  return Math.max(1, Math.floor((Date.now() - WEEK_EPOCH) / WEEK_MS) + 1);
}

async function fileExists(path: string): Promise<boolean> {
  try {
    const f = await ghRead(path);
    return f !== null && f.content.length > 10;
  } catch {
    return false;
  }
}

async function listAnalyticsFiles(weekN1: number): Promise<string[]> {
  try {
    const entries = await ghList(`raw/analytics/S${weekN1}`);
    return entries.filter((e) => e.type === "file").map((e) => e.name.toLowerCase());
  } catch {
    return [];
  }
}

interface Criterion {
  id: string;
  label: string;
  done: boolean;
}

export async function batchStatusRoute(req: Request, res: Response): Promise<void> {
  const weekN = currentWeekNumber();
  const weekN1 = weekN + 1;

  try {
    const [
      hasBatchRef,
      hasPlanR,
      hasPlanF,
      hasPlanF2,
      hasProgressR,
      hasProgressF,
      analyticsFiles,
    ] = await Promise.all([
      fileExists(`BATCH-SEMAINE-${weekN}.md`),
      fileExists("romain/plan-hebdo.md"),
      fileExists("fabrice/plan-hebdo.md"),
      fileExists("f2/plan-hebdo.md"),
      fileExists("romain/progress-semaine.md"),
      fileExists("fabrice/progress-semaine.md"),
      listAnalyticsFiles(weekN1),
    ]);

    const hasTwitter = analyticsFiles.some((f) => f.includes("twitter") || f.includes("tw_"));
    const hasLinkedin = analyticsFiles.some((f) => f.includes("linkedin") || f.includes("li_"));

    const criteria: Criterion[] = [
      { id: "batch_ref", label: `Batch S${weekN} de référence`, done: hasBatchRef },
      { id: "plan_r", label: "Plan hebdo Romain", done: hasPlanR },
      { id: "plan_f", label: "Plan hebdo Fabrice", done: hasPlanF },
      { id: "plan_f2", label: "Plan hebdo F2", done: hasPlanF2 },
      { id: "progress_r", label: "Progress Romain", done: hasProgressR },
      { id: "progress_f", label: "Progress Fabrice", done: hasProgressF },
      { id: "analytics_tw", label: "Analytics Twitter", done: hasTwitter },
      { id: "analytics_li", label: "Analytics LinkedIn", done: hasLinkedin },
    ];

    const done = criteria.filter((c) => c.done).length;
    const completionPct = Math.round((done / criteria.length) * 100);

    res.json({ weekN, weekN1, criteria, completionPct, analyticsFiles });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/batch/status]", err);
    res.status(500).json({ error: msg });
  }
}

export async function batchUploadRoute(req: Request, res: Response): Promise<void> {
  const { filename, contentBase64 } = req.body as {
    filename?: string;
    contentBase64?: string;
  };

  if (!filename || !contentBase64) {
    res.status(400).json({ error: "filename and contentBase64 required" });
    return;
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const weekN1 = currentWeekNumber() + 1;
  const path = `raw/analytics/S${weekN1}/${safeName}`;

  try {
    const b64 = contentBase64.includes(",") ? contentBase64.split(",")[1] : contentBase64;
    await ghCreateFromBase64(path, b64, `[BATCH] upload analytics ${safeName} S${weekN1}`);
    res.json({ ok: true, path });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/batch/upload]", err);
    res.status(500).json({ error: msg });
  }
}
