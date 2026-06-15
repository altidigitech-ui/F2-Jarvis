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
const PIPELINE_CONVERSION = "marketing/saas-app-shopify/storemd/pipeline-conversion.md";

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

// Insère une ligne sous une section `## <heading>` précise, après la dernière
// ligne de tableau de CETTE section (s'arrête au prochain `## `). Nécessaire car
// pipeline-conversion.md contient plusieurs tableaux.
function insertRowUnderSection(md: string, heading: string, row: string): string {
  const lines = md.split("\n");
  const hIdx = lines.findIndex((l) => l.trim() === heading);
  if (hIdx === -1) return md.trimEnd() + "\n" + row + "\n";
  let lastRow = -1;
  for (let i = hIdx + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) break;
    if (/^\s*\|/.test(lines[i])) lastRow = i;
  }
  if (lastRow === -1) return md;
  lines.splice(lastRow + 1, 0, row);
  return lines.join("\n");
}

export interface ConversionRow {
  storeDomain: string;
  storeUrl: string;
  score: number | null;
  findingsSummary: string;
}

// Route un prospect "interested" vers le tableau PIPELINE ACTIF de
// pipeline-conversion.md. Pas d'email (PII) : on identifie par le domaine.
export async function appendConversionPipeline(c: ConversionRow): Promise<void> {
  const cols = [
    "", // # (compteur laissé vide, rempli à la main si besoin)
    cestDate(),
    "cold email",
    "Email",
    c.storeDomain,
    c.storeUrl,
    "", // Vertical
    `${c.score ?? "?"}/100 — ${c.findingsSummary}`.replace(/\|/g, "/"),
    "💬 EN CONVERSATION",
    "Réponse positive (cold email)",
    "Qualifier + proposer beta",
  ];
  const row = `| ${cols.join(" | ")} |`;
  try {
    await ghUpdate(
      PIPELINE_CONVERSION,
      (md) => insertRowUnderSection(md, "## PIPELINE ACTIF", row),
      `[COLD] interested → pipeline (${c.storeDomain})`
    );
  } catch (err) {
    console.error("[cold/log] appendConversionPipeline échec:", err instanceof Error ? err.message : err);
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
