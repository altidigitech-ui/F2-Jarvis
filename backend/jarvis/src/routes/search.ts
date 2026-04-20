import { Request, Response } from "express";
import { searchDrawers } from "../lib/mempalace.js";

export async function searchRoute(req: Request, res: Response): Promise<void> {
  const { query, wing, limit } = req.body as {
    query?: string;
    wing?: string;
    limit?: number;
  };

  if (!query || typeof query !== "string" || !query.trim()) {
    res.status(400).json({ error: "Missing query" });
    return;
  }

  const safeLimit = Math.min(Math.max(1, Number(limit) || 5), 20);

  try {
    const results = await searchDrawers(query.trim(), {
      wing: wing?.trim() || undefined,
      limit: safeLimit,
    });

    res.json({
      query: query.trim(),
      wing: wing?.trim() || null,
      count: results.length,
      drawers: results.map((r) => ({
        wing: r.wing,
        filename: r.filename,
        path: r.path,
        tags: r.tags,
        date: r.date,
        content: r.content,
        score: r.score,
      })),
    });
  } catch (err) {
    console.error("[/search]", err);
    res.status(500).json({ error: "Search failed" });
  }
}
