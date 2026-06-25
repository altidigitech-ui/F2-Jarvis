// Job de génération de batch hebdomadaire. Tourne dans le worker BullMQ
// (process séparé, AUCUN plafond de durée), contrairement au flux /chat.
//
// Pipeline : lit un set FIXE de sources (pas de repo_search) -> assemble une
// instruction -> génère le batch via l'Agent SDK (query, maxTurns:1, calqué sur
// cold/jobs.ts::composeBody) -> garde-fou ANTI-IA -> insère une action create_file
// PENDING (shape identique au tool propose_action) -> écrit le statut en Redis.
// Le job N'ÉCRIT RIEN dans le repo : c'est l'action validée par l'utilisateur qui
// committe le fichier.

import { query } from "@anthropic-ai/claude-agent-sdk";
import { resolveClaudeBinary } from "../claude-binary.js";
import { getSupabase } from "../supabase.js";
import { getRedis } from "../redis.js";
import { ghRead } from "../github.js";
import type { BatchJobData } from "./types.js";
import { getBatchSources } from "./sources.js";

const STATUS_TTL_SECONDS = 3600;

export interface BatchJobStatus {
  status: "running" | "done" | "error";
  weekNumber: number;
  /** Action unique (génération de batch). */
  actionId?: string;
  /** Actions multiples (dispatch : 3 fichiers de publication). */
  actionIds?: string[];
  error?: string;
}

export function statusKey(jobId: string): string {
  return `batch:job:${jobId}`;
}

export async function writeStatus(jobId: string, payload: BatchJobStatus): Promise<void> {
  const r = getRedis();
  await r.set(statusKey(jobId), JSON.stringify(payload));
  await r.expire(statusKey(jobId), STATUS_TTL_SECONDS);
}

/** Lit un fichier du repo ; renvoie "" si absent (pas d'exception bloquante). */
export async function readRepo(path: string): Promise<string> {
  const f = await ghRead(path);
  return f?.content ?? "";
}

function buildPrompt(args: {
  weekNumber: number;
  framing: string;
  template: string;
  hashtags: string;
  voices: string;
  videoMaps: string;
  utm: string;
  prevTail: string;
}): string {
  const { weekNumber, framing, template, hashtags, voices, videoMaps, utm, prevTail } = args;
  return [
    `Tu es le générateur du batch hebdomadaire de contenu social de StoreMD.`,
    `Génère le batch de la semaine S${weekNumber}.`,
    ``,
    `CADRAGE DE LA SEMAINE (à respecter strictement) : ${framing}`,
    ``,
    `Le TEMPLATE ci-dessous est le mode d'emploi complet : structure, exemples de`,
    `mise en forme à reproduire, catalogues vidéos, règles de voix, règles ANTI-IA,`,
    `règles UTM, règles de liens par plateforme. Tu le suis À LA LETTRE.`,
    `Tu ne cherches AUCUN fichier : toutes les sources nécessaires sont fournies ci-dessous.`,
    ``,
    `Contraintes dures :`,
    `- Zéro donnée inventée (aucun score, %, nombre, "many users", "great results" non sourcé). Donnée manquante = "—".`,
    `- Respecte la rotation des hashtags et reprends le compteur depuis la FIN du batch précédent fourni.`,
    `- N'utilise pas le caractère em-dash. Pas de structure "Not X, it's Y".`,
    `- Voix : R = "I", F = "I", StoreMD = "we", IndieHackers = FoundryTwo "we". Ne jamais mélanger.`,
    ``,
    `=== TEMPLATE (mode d'emploi) ===`,
    template,
    ``,
    `=== HASHTAGS (sets A/B/C) ===`,
    hashtags,
    ``,
    `=== VOIX ===`,
    voices,
    ``,
    `=== MAPPINGS VIDÉOS (source de vérité) ===`,
    videoMaps,
    ``,
    `=== UTM (liens trackés) ===`,
    utm,
    ``,
    `=== FIN DU BATCH PRÉCÉDENT (pour rotation hashtags + compteur uniquement) ===`,
    prevTail || "(aucun batch précédent disponible)",
    ``,
    `=== SORTIE ATTENDUE ===`,
    `Retourne UNIQUEMENT le contenu markdown complet du batch S${weekNumber},`,
    `prêt à écrire dans marketing/contenu/batch-semaine/batch-semaine-S${weekNumber}.md.`,
    `Aucun préambule, aucune explication, aucun bloc de code englobant : juste le markdown du batch.`,
  ].join("\n");
}

export async function jobGenerateBatch(job: BatchJobData, jobId: string): Promise<void> {
  await writeStatus(jobId, { status: "running", weekNumber: job.weekNumber });

  try {
    if (!job.conversationId) {
      throw new Error("jobGenerateBatch: conversationId manquant (utilisateur non authentifié).");
    }

    const product = job.product ?? "storemd";
    const src = getBatchSources(product, job.persona);
    const targetPath = `marketing/contenu/batch-semaine/batch-semaine-S${job.weekNumber}.md`;
    const sb = getSupabase();

    // Garde-fou idempotence : pas de doublon create_file PENDING pour ce path+conversation.
    // Filtre en JS sur params.path (évite la syntaxe de filtre JSONB côté PostgREST).
    const { data: pendingRows } = await sb
      .from("jarvis_pending_actions")
      .select("id, params")
      .eq("conversation_id", job.conversationId)
      .eq("action_type", "create_file")
      .eq("status", "pending");
    const rows = (pendingRows ?? []) as Array<{ id: string; params: { path?: string } | null }>;
    const dup = rows.find((r) => r.params?.path === targetPath);
    if (dup) {
      await writeStatus(jobId, { status: "done", actionId: dup.id, weekNumber: job.weekNumber });
      return;
    }

    // Lecture du set FIXE de sources.
    const template = await readRepo(src.templatePath);
    if (!template) {
      throw new Error(`jobGenerateBatch: template introuvable (${src.templatePath}).`);
    }
    const hashtags = await readRepo(src.hashtagsPath);
    const voices = (await Promise.all(src.voicePaths.map(readRepo))).filter(Boolean).join("\n\n");
    const videoMaps = (await Promise.all(src.videoMappingPaths.map(readRepo))).filter(Boolean).join("\n\n");
    const utm = await readRepo(src.utmPath);
    const prevFull = await readRepo(`${src.archiveDir}/batch-semaine-S${job.weekNumber - 1}.md`);
    const prevTail = prevFull ? prevFull.split("\n").slice(-150).join("\n") : "";

    const prompt = buildPrompt({
      weekNumber: job.weekNumber,
      framing: job.framing,
      template,
      hashtags,
      voices,
      videoMaps,
      utm,
      prevTail,
    });

    // Génération — mirroir exact de cold/jobs.ts::composeBody.
    const claudePath = await resolveClaudeBinary();
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

    let content = raw.trim();
    if (!content) {
      throw new Error("jobGenerateBatch: génération vide.");
    }
    // Garde-fou ANTI-IA (em-dash neutralisé si le modèle en glisse un).
    content = content.replace(/—/g, ", ");
    // Garde-fou taille (la contrainte create_file est ~500 KB).
    if (content.length > 500_000) {
      throw new Error(`jobGenerateBatch: contenu trop volumineux (${content.length} > 500000).`);
    }

    // Insert de l'action create_file PENDING (shape identique au tool propose_action).
    const preview = `Batch central S${job.weekNumber} — ${job.framing}`.slice(0, 400);
    const { data: inserted, error } = await sb
      .from("jarvis_pending_actions")
      .insert({
        conversation_id: job.conversationId,
        action_type: "create_file",
        params: {
          path: targetPath,
          content,
          commit_message: `batch S${job.weekNumber}`,
          _persona_prefix: job.persona,
        },
        preview,
      })
      .select("id")
      .single();
    if (error || !inserted) {
      throw new Error(`jobGenerateBatch: insert action échoué (${error?.message ?? "inconnu"}).`);
    }

    const actionId = (inserted as { id: string }).id;
    await writeStatus(jobId, { status: "done", actionId, weekNumber: job.weekNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await writeStatus(jobId, { status: "error", error: message, weekNumber: job.weekNumber });
    // On relance l'erreur : BullMQ marque le job failed (attempts:1 => pas de retry).
    throw err;
  }
}
