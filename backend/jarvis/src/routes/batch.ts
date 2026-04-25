import { Request, Response } from "express";
import { ghRead, ghList, ghCreateFromBase64 } from "../lib/github.js";
import { resolveCurrentBatchNumber } from "../lib/batch-number.js";
import { cacheInvalidateAll } from "../lib/cache.js";

async function fileExists(path: string): Promise<boolean> {
  try {
    const f = await ghRead(path);
    return f !== null && f.content.length > 10;
  } catch {
    return false;
  }
}

async function listAllAnalyticsFiles(weekN1: number): Promise<Record<string, string[]>> {
  const result: Record<string, string[]> = { fabrice: [], romain: [], f2: [], shared: [] };

  try {
    const rootEntries = await ghList(`raw/analytics/S${weekN1}`);
    for (const e of rootEntries) {
      if (e.type === "file") {
        result.shared.push(e.name.toLowerCase());
      }
    }
  } catch { /* dir doesn't exist */ }

  for (const p of ["fabrice", "romain", "f2"]) {
    try {
      const entries = await ghList(`raw/analytics/S${weekN1}/${p}`);
      result[p] = entries.filter((e) => e.type === "file").map((e) => e.name.toLowerCase());
    } catch { /* subdir doesn't exist */ }
  }

  return result;
}

function hasAnalyticsType(files: string[], type: "twitter" | "linkedin"): boolean {
  if (type === "twitter") {
    return files.some((f) =>
      f.includes("twitter") || f.includes("tw_") ||
      f.includes("account_overview") || f.includes("tweet_") ||
      f.includes("post_analytics") ||
      (f.endsWith(".csv") && !f.includes("contenu") && !f.includes("linkedin"))
    );
  }
  return files.some((f) =>
    f.includes("linkedin") || f.includes("li_") ||
    f.includes("contenu_") || f.includes("visitor") ||
    f.includes("follower") || f.includes("update_") ||
    f.endsWith(".xlsx")
  );
}

interface Criterion {
  id: string;
  label: string;
  done: boolean;
}

export async function batchStatusRoute(req: Request, res: Response): Promise<void> {
  const weekN = await resolveCurrentBatchNumber();
  const weekN1 = weekN + 1;

  try {
    const [
      hasBatchRef,
      hasPlanR,
      hasPlanF,
      hasPlanF2,
      hasProgressR,
      hasProgressF,
      allAnalytics,
    ] = await Promise.all([
      fileExists(`BATCH-SEMAINE-${weekN}.md`),
      fileExists("romain/plan-hebdo.md"),
      fileExists("fabrice/plan-hebdo.md"),
      fileExists("f2/plan-hebdo.md"),
      fileExists("romain/progress-semaine.md"),
      fileExists("fabrice/progress-semaine.md"),
      listAllAnalyticsFiles(weekN1),
    ]);

    const allFiles = [
      ...allAnalytics.shared,
      ...allAnalytics.fabrice,
      ...allAnalytics.romain,
      ...allAnalytics.f2,
    ];

    const hasTwitter = hasAnalyticsType(allFiles, "twitter");
    const hasLinkedin = hasAnalyticsType(allFiles, "linkedin");

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

    res.json({
      weekN,
      weekN1,
      criteria,
      completionPct,
      analyticsFiles: allFiles,
      analyticsByPersona: allAnalytics,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/batch/status]", err);
    res.status(500).json({ error: msg });
  }
}

export async function batchUploadRoute(req: Request, res: Response): Promise<void> {
  const { filename, contentBase64, persona } = req.body as {
    filename?: string;
    contentBase64?: string;
    persona?: string;
  };

  if (!filename || !contentBase64) {
    res.status(400).json({ error: "filename and contentBase64 required" });
    return;
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const weekN1 = (await resolveCurrentBatchNumber()) + 1;
  const personaDir = persona || "shared";
  const path = `raw/analytics/S${weekN1}/${personaDir}/${safeName}`;

  try {
    const b64 = contentBase64.includes(",") ? contentBase64.split(",")[1] : contentBase64;
    await ghCreateFromBase64(path, b64, `[BATCH] analytics ${personaDir} — ${safeName}`);
    cacheInvalidateAll();
    res.json({ ok: true, path });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/batch/upload]", err);
    res.status(500).json({ error: msg });
  }
}
