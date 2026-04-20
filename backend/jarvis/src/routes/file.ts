import { Request, Response } from "express";
import { readFile } from "fs/promises";
import path from "path";

const REPO_ROOT = process.env.REPO_ROOT || path.resolve(process.cwd(), "../..");

export async function fileRoute(req: Request, res: Response): Promise<void> {
  const relPath = (req.query.path as string) || "";

  if (!relPath) {
    res.status(400).json({ error: "Missing path param" });
    return;
  }

  // Sanitize: normalize and reject any path traversal outside REPO_ROOT
  const normalized = path.normalize(relPath).replace(/^(\.\.[/\\])+/, "");
  const fullPath = path.join(REPO_ROOT, normalized);

  if (!fullPath.startsWith(path.resolve(REPO_ROOT) + path.sep) &&
      fullPath !== path.resolve(REPO_ROOT)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  if (!normalized.endsWith(".md")) {
    res.status(400).json({ error: "Only .md files allowed" });
    return;
  }

  try {
    const content = await readFile(fullPath, "utf-8");
    res.json({ path: normalized, content });
  } catch {
    res.status(404).json({ error: "File not found" });
  }
}
