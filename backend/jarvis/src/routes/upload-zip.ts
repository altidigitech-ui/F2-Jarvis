import { Request, Response } from "express";
import { storeZip } from "../lib/zip-store.js";

export async function uploadZipRoute(req: Request, res: Response): Promise<void> {
  try {
    const { filename, data } = req.body as { filename?: string; data?: string };
    if (!filename || typeof data !== "string") {
      res.status(400).json({ error: "Missing filename or data (base64 string)" });
      return;
    }
    const result = storeZip(filename, data);
    res.json({ zip_id: result.zip_id, count: result.count, files: result.files });
  } catch (err) {
    console.error("[upload-zip]", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Internal error" });
  }
}
