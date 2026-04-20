import type { Request, Response } from "express";
import { getWings, getWingDrawers, getDrawerFull, getStats } from "../lib/mempalace.js";

export async function mempalaceWingsRoute(_req: Request, res: Response) {
  try {
    const wings = await getWings();
    if (wings.length === 0) {
      res.json({ wings: [], empty: true });
    } else {
      res.json(wings);
    }
  } catch (err) {
    console.error("[mempalace] wings error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}

export async function mempalaceWingRoute(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const drawers = await getWingDrawers(id);
    res.json({ wing: id, drawers });
  } catch (err) {
    console.error("[mempalace] wing error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}

export async function mempalaceDrawerRoute(req: Request, res: Response) {
  try {
    const { wing, filename } = req.params;
    const drawer = await getDrawerFull(wing, filename);
    if (!drawer) {
      res.status(404).json({ error: "Drawer not found" });
      return;
    }
    res.json(drawer);
  } catch (err) {
    console.error("[mempalace] drawer error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}

export async function mempalaceStatsRoute(_req: Request, res: Response) {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (err) {
    console.error("[mempalace] stats error:", err);
    res.status(500).json({ error: "Internal error" });
  }
}
