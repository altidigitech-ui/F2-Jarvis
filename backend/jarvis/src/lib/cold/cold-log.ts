// Phase 8 — LOGGING. Branchement sur les fichiers EXISTANTS du repo via l'API
// GitHub (lib/github.ts). On n'invente AUCUN dossier de logs : on remplit
// cold-log-email.md (réponses/conversions) et decisions-log.md (décisions).
//
// Règle plan §8 : agrégé dans Git, nominatif dans Supabase. On ne logge JAMAIS
// les 50 envois bruts ni les emails de prospects (PII) — uniquement Store URL +
// score + statut + note courte. Commits par cadence/événement, pas par mail.

import { ghUpdate } from "../github.js";

const COLD_LOG_EMAIL = "marketing/saas-app-shopify/storemd/cold/cold-log-email.md";
const DECISIONS_LOG = "tracking/decisions-log.md";

// Date CEST "DD/MM/YYYY".
export function cestDate(): string {
  return new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
}

// Insère des lignes juste après la dernière ligne de tableau (`|...`).
function appendTableRows(md: string, rows: string[]): string {
  const lines = md.split("\n");
  let lastTableIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*\|/.test(lines[i])) lastTableIdx = i;
  }
  if (lastTableIdx === -1) return md.trimEnd() + "\n" + rows.join("\n") + "\n";
  lines.splice(lastTableIdx + 1, 0, ...rows);
  return lines.join("\n");
}

export type ColdEmailStatus = "répondu" | "intéressé" | "objection" | "converti" | "désinscrit";

export interface ColdEmailLogRow {
  storeUrl: string;
  score: number | null;
  status: ColdEmailStatus;
  notes?: string;
}

// Append des réponses/conversions à cold-log-email.md (1 commit pour le lot).
// Format : | Date | Store URL | Score | Statut | Notes |
export async function appendEmailLog(rows: ColdEmailLogRow[]): Promise<void> {
  if (rows.length === 0) return;
  const date = cestDate();
  const tableRows = rows.map(
    (r) => `| ${date} | ${r.storeUrl} | ${r.score ?? ""} | ${r.status} | ${(r.notes || "").replace(/\|/g, "/")} |`
  );
  try {
    await ghUpdate(
      COLD_LOG_EMAIL,
      (md) => appendTableRows(md, tableRows),
      `[COLD] ${rows.length} événement(s) email`
    );
  } catch (err) {
    // Échec d'écriture log = non bloquant pour le pipeline.
    console.error("[cold/log] appendEmailLog échec:", err instanceof Error ? err.message : err);
  }
}

// Append une décision à decisions-log.md.
// Format : | Date | Décision | Rationale | Résultat |
export async function appendDecisionLog(decision: string, rationale: string, result: string): Promise<void> {
  const row = `| ${cestDate()} | ${decision.replace(/\|/g, "/")} | ${rationale.replace(/\|/g, "/")} | ${result.replace(/\|/g, "/")} |`;
  try {
    await ghUpdate(DECISIONS_LOG, (md) => appendTableRows(md, [row]), `[COLD] décision: ${decision}`);
  } catch (err) {
    console.error("[cold/log] appendDecisionLog échec:", err instanceof Error ? err.message : err);
  }
}
