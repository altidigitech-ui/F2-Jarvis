// Job de DISPATCH du batch hebdomadaire. Tourne dans le worker BullMQ
// (queue "batch", nom de job "dispatch"), hors du flux /chat (AUCUN plafond de durée).
//
// Le dispatch n'est PAS de la génération créative : le batch central S{N} contient
// déjà TOUS les posts, par compte, avec leurs IDs et leurs textes finaux. Le dispatch
// les EXTRAIT et les route vers 3 fichiers de publication (R / F / StoreMD), un par
// périmètre, en reproduisant le format du fichier de publication existant.
//
// Pipeline : lit le batch central -> pour chaque périmètre, lit le fichier de
// publication existant (référence de format) -> extrait verbatim via l'Agent SDK
// (query, maxTurns:1, calqué sur jobGenerateBatch) -> insère une action create_file
// PENDING -> écrit le statut Redis (actionIds[] pour les 3 actions).
// Le job N'ÉCRIT RIEN dans le repo : ce sont les actions validées par l'utilisateur
// qui committent les fichiers.

import { query } from "@anthropic-ai/claude-agent-sdk";
import { resolveClaudeBinary } from "../claude-binary.js";
import { getSupabase } from "../supabase.js";
import { writeStatus, readRepo } from "./jobs.js";
import type { DispatchJobData } from "./types.js";

const CONTENT_MAX_BYTES = 500_000;

interface DispatchScope {
  /** Clé interne (logs). */
  key: string;
  /** Chemin cible du fichier de publication (pris VERBATIM par create_file). */
  path: string;
  /** Périmètre lisible (réinjecté dans l'en-tête du fichier). */
  scopeLabel: string;
  /** Critère d'appartenance d'un post au périmètre, par son ID. */
  idCriterion: string;
  /** Label court pour le message de commit. */
  shortLabel: string;
}

// Les 3 périmètres du dispatch StoreMD. Chemins RÉELS du repo (déjà whitelistés
// par validateCreateFilePath : préfixes romain/ fabrice/ marketing/).
const SCOPES: DispatchScope[] = [
  {
    key: "romain",
    path: "romain/publication/batch-semaine.md",
    scopeLabel:
      "posts du compte R uniquement (Twitter @delgado_ro72224 + LinkedIn Romain Delgado)",
    idCriterion: 'les IDs qui contiennent "-R-" (ex. TW-R-..., LI-R-...)',
    shortLabel: "R",
  },
  {
    key: "fabrice",
    path: "fabrice/publication/batch-semaine.md",
    scopeLabel:
      "posts du compte F uniquement (Twitter @FabGangi + LinkedIn Fabrice Gangitano)",
    idCriterion: 'les IDs qui contiennent "-F-" (ex. TW-F-..., LI-F-...)',
    shortLabel: "F",
  },
  {
    key: "storemd",
    path: "marketing/saas-app-shopify/storemd/publication/batch-semaine.md",
    scopeLabel:
      "posts des comptes StoreMD uniquement (TikTok + Twitter @StoreMd_off + Instagram + Facebook + IndieHackers FoundryTwo)",
    idCriterion: 'les IDs qui commencent par "STOREMD-"',
    shortLabel: "StoreMD",
  },
];

function buildDispatchPrompt(args: {
  weekNumber: number;
  batchCentral: string;
  reference: string;
  scope: DispatchScope;
}): string {
  const { weekNumber, batchCentral, reference, scope } = args;
  return [
    `Tu es un EXTRACTEUR DÉTERMINISTE. Tu n'écris AUCUN texte nouveau.`,
    `Le BATCH CENTRAL S${weekNumber} ci-dessous contient TOUS les posts de la semaine,`,
    `chacun identifié par un ID. Ta tâche : produire le fichier de publication du périmètre :`,
    `→ ${scope.scopeLabel}.`,
    ``,
    `RÈGLES ABSOLUES :`,
    `- Tu sélectionnes UNIQUEMENT les blocs de post dont l'ID correspond à : ${scope.idCriterion}.`,
    `- Tu IGNORES tous les autres posts (les autres périmètres).`,
    `- Tu copies chaque bloc retenu MOT POUR MOT depuis le batch central : textes, traductions,`,
    `  liens, REPLY, COMMENTAIRE, vidéos, horaires, hashtags. Zéro reformulation, zéro correction,`,
    `  zéro ajout, zéro nouvelle traduction. Si un caractère diffère du batch central, c'est un bug.`,
    `- Tu n'inventes RIEN. Donnée absente du batch central = tu ne la crées pas.`,
    `- Tu conserves les caractères spéciaux À L'IDENTIQUE, y compris les tirets longs (—) présents`,
    `  dans les textes anglais : NE LES REMPLACE PAS.`,
    ``,
    `FORMAT DE SORTIE :`,
    `- Reproduis EXACTEMENT la structure du FICHIER DE RÉFÉRENCE ci-dessous : en-tête, blockquote`,
    `  de périmètre, séparateurs, titres de jour (# ═══ ... ═══), structure des blocs (#### ID — ...,`,
    `  champs **Vidéo :**, **TEXTE :**, **REPLY :**, **COMMENTAIRE :**, **TRADUCTION :**).`,
    `- En-tête : numéro de semaine = S${weekNumber} ; ligne Source = \`marketing/contenu/batch-semaine/batch-semaine-S${weekNumber}.md\` ;`,
    `  ligne Périmètre = ${scope.scopeLabel}.`,
    `- Organise les posts par jour, dans l'ordre du batch central. Conserve les jours qui contiennent`,
    `  au moins un post du périmètre ; n'invente pas de jour vide.`,
    ``,
    `=== FICHIER DE RÉFÉRENCE (structure à reproduire — semaine précédente) ===`,
    reference || "(aucune référence disponible — reproduis la structure standard décrite ci-dessus)",
    ``,
    `=== BATCH CENTRAL S${weekNumber} (source de vérité — extrais le périmètre depuis ici) ===`,
    batchCentral,
    ``,
    `=== SORTIE ATTENDUE ===`,
    `Retourne UNIQUEMENT le markdown complet du fichier de publication du périmètre ci-dessus,`,
    `prêt à écrire dans ${scope.path}.`,
    `Aucun préambule, aucune explication, aucun bloc de code englobant : juste le markdown.`,
  ].join("\n");
}

export async function jobDispatch(job: DispatchJobData, jobId: string): Promise<void> {
  await writeStatus(jobId, { status: "running", weekNumber: job.weekNumber });

  try {
    if (!job.conversationId) {
      throw new Error("jobDispatch: conversationId manquant (utilisateur non authentifié).");
    }

    const sb = getSupabase();
    const batchPath = `marketing/contenu/batch-semaine/batch-semaine-S${job.weekNumber}.md`;
    const batchCentral = await readRepo(batchPath);
    if (!batchCentral) {
      throw new Error(
        `jobDispatch: batch central introuvable (${batchPath}). Génère et committe le batch S${job.weekNumber} avant le dispatch.`
      );
    }

    const claudePath = await resolveClaudeBinary();

    // Actions create_file PENDING existantes (idempotence par path+conversation),
    // chargées une seule fois. Filtre en JS sur params.path (évite le filtre JSONB PostgREST).
    const { data: pendingRows } = await sb
      .from("jarvis_pending_actions")
      .select("id, params")
      .eq("conversation_id", job.conversationId)
      .eq("action_type", "create_file")
      .eq("status", "pending");
    const rows = (pendingRows ?? []) as Array<{ id: string; params: { path?: string } | null }>;

    const actionIds: string[] = [];

    for (const scope of SCOPES) {
      // Idempotence : action PENDING déjà présente pour ce path -> on la réutilise.
      const dup = rows.find((r) => r.params?.path === scope.path);
      if (dup) {
        actionIds.push(dup.id);
        continue;
      }

      const reference = await readRepo(scope.path);
      const prompt = buildDispatchPrompt({
        weekNumber: job.weekNumber,
        batchCentral,
        reference,
        scope,
      });

      // Extraction — mirroir exact de jobGenerateBatch (query, maxTurns:1).
      let raw = "";
      for await (const msg of query({
        prompt,
        options: {
          maxTurns: 1,
          ...(claudePath ? { pathToClaudeCodeExecutable: claudePath } : {}),
        },
      })) {
        if (msg.type === "assistant" && msg.message?.content) {
          for (const block of msg.message.content) {
            if (block.type === "text" && block.text) raw += block.text;
          }
        }
      }

      const content = raw.trim();
      if (!content) {
        throw new Error(`jobDispatch: génération vide pour ${scope.path}.`);
      }
      // PAS de garde-fou em-dash : extraction verbatim. Les textes anglais du batch
      // contiennent des tirets longs LÉGITIMES — les neutraliser corromprait le canon.
      if (content.length > CONTENT_MAX_BYTES) {
        throw new Error(
          `jobDispatch: contenu trop volumineux pour ${scope.path} (${content.length} > ${CONTENT_MAX_BYTES}).`
        );
      }

      const preview = `Dispatch S${job.weekNumber} → ${scope.shortLabel} (${scope.path})`.slice(0, 400);
      const { data: inserted, error } = await sb
        .from("jarvis_pending_actions")
        .insert({
          conversation_id: job.conversationId,
          action_type: "create_file",
          params: {
            path: scope.path,
            content,
            commit_message: `dispatch S${job.weekNumber} ${scope.shortLabel}`,
            _persona_prefix: job.persona,
          },
          preview,
        })
        .select("id")
        .single();
      if (error || !inserted) {
        throw new Error(
          `jobDispatch: insert action échoué pour ${scope.path} (${error?.message ?? "inconnu"}).`
        );
      }
      actionIds.push((inserted as { id: string }).id);
    }

    if (actionIds.length === 0) {
      throw new Error("jobDispatch: aucune action produite.");
    }

    await writeStatus(jobId, { status: "done", actionIds, weekNumber: job.weekNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await writeStatus(jobId, { status: "error", error: message, weekNumber: job.weekNumber });
    // On relance : BullMQ marque le job failed (attempts:1 => pas de retry).
    throw err;
  }
}
