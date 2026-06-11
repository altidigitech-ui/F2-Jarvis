import { Request, Response } from "express";
import { resolveCurrentBatchNumber } from "../lib/batch-number.js";

// ─────────────────────────────────────────────────────────────────────────
// Cibles officielles cold outreach (canon 41/82) — FIXES, validées.
// Source canon : ligne compteurs du system prompt Jarvis (chat.ts).
// TikTok 10 + Instagram 10 (comptes StoreMD, par opérateur) + Facebook 5 +
// Twitter 5 + LinkedIn 5 (persos) + PH 6 = 41 / persona · Général R+F = 82.
// Reddit : logué, pas de cible dure.
// Pas de parsing batch : les cibles ne varient pas par semaine.
// ─────────────────────────────────────────────────────────────────────────

export interface PersonaTargets {
  coldTiktok: number;
  coldInstagram: number;
  coldFacebook: number;
  coldTwitter: number;
  coldLinkedin: number;
  ph: number;
  totalPersona: number;
  general: number;
}

export interface TargetsResponse {
  weekNumber: number;
  fabrice: PersonaTargets;
  romain: PersonaTargets;
}

const CANON: PersonaTargets = {
  coldTiktok: 10,
  coldInstagram: 10,
  coldFacebook: 5,
  coldTwitter: 5,
  coldLinkedin: 5,
  ph: 6,
  totalPersona: 41,
  general: 82,
};

export async function targetsRoute(_req: Request, res: Response): Promise<void> {
  let weekNumber = 1;
  try {
    weekNumber = await resolveCurrentBatchNumber();
  } catch (err) {
    console.warn("[/targets] resolveCurrentBatchNumber:", err);
  }
  const response: TargetsResponse = {
    weekNumber,
    fabrice: { ...CANON },
    romain: { ...CANON },
  };
  res.json(response);
}
