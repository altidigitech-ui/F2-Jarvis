import { Request, Response } from "express";
import { ghRead } from "../lib/github.js";

export async function fileRoute(req: Request, res: Response): Promise<void> {
  const relPath = (req.query.path as string) ?? "";

  if (!relPath) {
    res.status(400).json({ error: "Missing path param" });
    return;
  }

  // Reject path traversal and non-.md files
  if (relPath.includes("..") || !relPath.endsWith(".md")) {
    res.status(400).json({ error: "Invalid path" });
    return;
  }

  try {
    const file = await ghRead(relPath);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    res.json({ path: relPath, content: file.content });
  } catch (err) {
    console.error("[file] fetch failed:", err);
    res.status(502).json({ error: "GitHub fetch failed" });
  }
}
