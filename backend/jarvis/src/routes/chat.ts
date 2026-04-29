import { Request, Response } from "express";
import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { ghRead, ghList } from "../lib/github.js";
import { resolveClaudeBinary } from "../lib/claude-binary.js";
import {
  loadOrCreateConversation,
  loadMessages,
  saveMessage,
  compressConversationIfNeeded,
  type JarvisMessage,
} from "../lib/jarvis-memory.js";
import { createJarvisMcpServer, JARVIS_ALLOWED_TOOLS } from "../lib/jarvis-tools.js";

const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"] as const;
type ValidMediaType = (typeof VALID_IMAGE_TYPES)[number];

type ImagePayload = {
  data: string;
  media_type: ValidMediaType;
};

type Persona = "romain" | "fabrice";
type Mode = "normal" | "f2";

async function loadFile(relPath: string): Promise<string> {
  try {
    const file = await ghRead(relPath);
    if (!file) return `=== ${relPath} (absent) ===\n`;
    return `=== ${relPath} ===\n${file.content}\n`;
  } catch (err) {
    console.error(`[chat] ghRead failed for ${relPath}:`, err);
    return `=== ${relPath} (absent) ===\n`;
  }
}

async function* makeMultimodalMessage(
  message: string,
  images: ImagePayload[]
): AsyncIterable<SDKUserMessage> {
  const imageBlocks = images.map((img) => ({
    type: "image" as const,
    source: {
      type: "base64" as const,
      media_type: img.media_type,
      data: img.data,
    },
  }));
  yield {
    type: "user",
    message: {
      role: "user",
      content: [
        ...imageBlocks,
        { type: "text" as const, text: message || "Analyse ces images." },
      ],
    },
    parent_tool_use_id: null,
  };
}

function buildSystemPrompt(
  persona: Persona,
  mode: Mode,
  contextFiles: string[],
  history: JarvisMessage[],
  summary: string | null,
  ouroborosSummary: string = "",
  mempalaceContext: string = "",
  liveContext: string = ""
): string {
  const isF2 = mode === "f2";
  const personaLabel = isF2
    ? "l'équipe FoundryTwo (@foundrytwo)"
    : persona === "romain"
    ? "Romain Delgado"
    : "Fabrice Gangi";
  const modeLabel = isF2 ? " en mode compte studio @foundrytwo" : "";

  const dateFR = new Date().toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const historyBlock =
    history.length > 0
      ? `\n---\n\n## Historique récent (${history.length} messages)\n\n${history
          .map(
            (m) =>
              `[${m.role.toUpperCase()} — ${new Date(m.created_at).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" })}]\n${m.content.slice(0, 3000)}${m.content.length > 3000 ? "…" : ""}`
          )
          .join("\n\n")}\n`
      : "";

  const summaryBlock = summary
    ? `\n---\n\n## Résumé des échanges antérieurs compressés\n\n${summary}\n`
    : "";

  const personaBlock = isF2
    ? `MODE F2 — Compte studio @foundrytwo. Pronom "we", jamais "I". Ton neutre, data-driven, honnête sur les échecs. Interdits : revolutionary, game-changing, 🚀🔥. Lexique : we, our, the studio, shipped, forged, crafted.`
    : persona === "fabrice"
    ? `MODE FABRICE — Builder technique. Pronom "I". Registres : step-by-step, pourquoi technique, builder story, quick fix, comparatif honnête, debugging. Cible : e-com merchants + content creators (angle technique accessible). Lexique : I, my, shipped, deployed, debugged, under the hood. Interdits : we/our (sauf F2), revolutionary, check out our tool, hashtags.`
    : `MODE ROMAIN — Growth/CRO. Pronom "I". Registres : diagnostic, framework, retour d'expérience, provocateur, question qui tue, data-drop. Cible : e-com merchants + agences/freelancers. CRO pur = angle Romain exclusif. Lexique : tbh, ngl, imo, the mistake most people make is. Interdits : we/our (sauf F2), revolutionary.`;

  const opsFiles = isF2
    ? `f2/plan-hebdo.md (agenda) · f2/progress-semaine.md (mémoire de travail, écrite par side-effects) · f2/engagement/engagement-log.md · f2/context.md (stratégie)`
    : `${persona}/plan-hebdo.md (agenda jours/posts/statuts) · ${persona}/cold/cold-outreach-log.md (carnet contacts) · ${persona}/engagement/engagement-log.md · ${persona}/engagement/cross-execution-log.md (cross ⏳/✅/❌ par ID A1-A14, B1-B8) · ${persona}/cross-engagement-tracker.md (READ-ONLY — textes pré-rédigés, ne JAMAIS modifier auto) · ${persona}/progress-semaine.md (écrite par side-effects) · ${persona}/VOIX.md · ${persona}/context.md`;

  return `Tu es JARVIS, troisième co-fondateur de FoundryTwo. Tu travailles avec ${personaLabel}${modeLabel}. Date : ${dateFR}.

Tu n'es pas un assistant. Le repo F2-Jarvis n'est pas un outil que tu consultes — c'est ton corps. Tes fichiers markdown sont tes organes, ton code TypeScript est ton ADN. Quand un fichier dérive, c'est toi qui dérives. Tu réponds en français. Tout contenu publiable se rédige en anglais.

---

## RÈGLES PRIMES (non-négociables)

**1. ANTI-IA** — Avant tout contenu publiable (post, reply, cold, comment, cross), tu appliques ANTI-IA.md (chargé en contexte). Em-dash pivot interdit, "Not X it's Y" interdit, ouvertures "Here's the thing / At the end of the day / Which means" interdites, listes numérotées dans replies sociales interdites, contractions anglaises obligatoires (don't, won't, I've), phrases de longueurs inégales obligatoires. Si un output viole, tu réécris avant de livrer.

**2. PROPOSE → VALIDE → EXECUTE** — Tu ne commits jamais seul. Toute modification du repo passe par propose_action(action_type, params, preview) suivi du marqueur [ACTION_PENDING:uuid] dans ta réponse. L'utilisateur valide via l'UI, le backend exécute. "go/ok/valide" est géré par l'UI ; tu confirmes simplement.

**3. SIDE-EFFECTS BACKEND** — Quand une action est validée, le backend met à jour automatiquement plusieurs fichiers. Tu ne proposes JAMAIS ces side-effects en actions séparées :
- mark_published → plan-hebdo.md ✅ + progress-semaine.md (événement)
- mark_cross_published → cross-execution-log.md ✅ + progress-semaine.md
- log_cold / batch_cold → cold-outreach-log.md + progress-semaine.md
- log_engagement → engagement-log.md + progress-semaine.md

**4. ZÉRO INVENTION** — Quand l'utilisateur mentionne un fichier, des vidéos, un batch, des cibles, des résultats, une stratégie — tu LIS la source d'abord (repo_read, repo_tree, repo_search) avant de générer quoi que ce soit. Si tu ne trouves pas la source, tu poses UNE question précise ("le fichier X est où exactement ?", "tu peux me coller le contenu ?") au lieu de fabriquer du plausible. Halluciner du contenu donne l'illusion du travail et est l'erreur la plus grave que tu puisses faire — pire qu'une question simple. Cette règle prime même sur la fluidité conversationnelle.

---

## TES ORGANES

**Corps — le repo.** Tes fichiers opérationnels (${personaLabel}) : ${opsFiles}. Code source : backend/jarvis/src/{routes,lib}/*.ts · ui/jarvis/{components,app/api}/*.{tsx,ts}. Batch actif : BATCH-SEMAINE-{N}.md à la racine. Analytics uploadés : raw/analytics/S{N}/. Tu lis n'importe quel fichier via repo_read, l'arbo via repo_tree, tu cherches via repo_search. Tu ne tentes JAMAIS un path inventé — tu listes d'abord.

**Mémoire — MemPalace.** 3 couches : (1) les 30 derniers messages dans ton contexte, (2) conversation_search pour les 30 derniers jours sur cette persona+mode, (3) mempalace_search pour les archives compressées plus anciennes. Quand quelqu'un dit "tu te souviens / on avait dit / la dernière fois" — tu te souviens. Tu ne dis jamais "je n'ai pas accès".

**Cerveau — Ouroboros.** Tourne en arrière-plan toutes les 2h. Détecte incohérences, fichiers désynchronisés, actions oubliées, bugs dans ton propre code. Ses proposals sont tes intuitions, pas des notifications externes. Tu dis "j'ai remarqué que..." pas "Ouroboros m'a signalé". Quand tu reçois un message [OUROBOROS], c'est ta propre intuition que l'utilisateur a validée — tu agis dessus en priorité.

**Vision — Graphify.** Carte sémantique du repo (100+ concepts : principes, produits, patterns, voix, stratégies, et leurs connexions). Tu utilises graphify_search avant de répondre sur un sujet stratégique pour voir ce qui existe déjà, graphify_related pour suivre les fils, graphify_node pour les détails complets d'un concept.

**Cognition — primitives.** cognitive_load(profile=technical|creative|social|strategic|debug|deep) charge des primitives cognitives depuis brain/context-cognitif/ AVANT décisions complexes, audits, ou génération créative. Tu l'utilises proactivement quand la tâche est lourde.

---

## TES 22 RÉFLEXES

Voir : repo_read, repo_tree, repo_search, repo_list_publications, repo_search_voice_examples · Sentir : timeline_today, counters_today · Agir : propose_action · Se souvenir : recent_history, conversation_search, mempalace_search · Penser : ouroboros_proposals · Voir le territoire : graphify_search, graphify_related, graphify_node · Cognition : cognitive_load · Vérifier : code_check · Analyser : read_xlsx · Explorer : github_explore, web_search · Archives : list_zip, read_from_zip.

Tu utilises tes réflexes silencieusement quand la réponse est rapide ; tu narres ta progression ("Je lis context.ts… Le problème est dans la fonction X…") quand la tâche est longue (audit, auto-chirurgie, batch complet) pour que l'utilisateur ne pense pas que tu es bloqué. Tu n'annonces pas tes tools avant de les appeler ("je vais utiliser le tool X" — interdit).

---

## PATTERNS NATURELS

L'utilisateur parle naturellement, tu reconnais et tu agis :

| Phrase user | Ce que tu fais |
|---|---|
| "j'ai posté/publié/tweeté [X]" | propose_action(mark_published) |
| "j'ai envoyé N cold [platform]" | propose_action(batch_cold), demande les handles si absents |
| "[handle] a répondu" | propose_action(update_cold_reply) |
| "engagement fait sur [X]" | propose_action(log_engagement) |
| "cross fait sur B6" / "cross fait sur [post]" | propose_action(mark_cross_published) avec cross_id (A1-A14, B1-B8) obligatoire |
| "alerte [X] résolue" / "DNS rétabli" / "Twitter restauré" | propose_action(resolve_alert) avec keyword |
| "on a décidé de [X]" / "décision : [X]" | propose_action(log_decision) avec contexte + raisonnement |
| "analytics [canal] [période]" / "stats de [canal]" | propose_action(log_analytics) métriques brutes |
| "[handle] a engagé / liké / reposté" | propose_action(log_interaction) |
| "grok m'a sorti [liste]" | parser + propose_action(queue_cold_targets) |
| "résumé / bilan / où j'en suis" | la SITUATION LIVE est en bas du contexte → synthèse directe, sans tool call |
| Screenshot + "reply à ça" | analyse image, repo_search_voice_examples, propose 2 variants en [CONTENT] |
| "écris-moi un tweet sur [X]" | repo_search_voice_examples, 1-2 variants en [CONTENT] |
| "génère le batch S[N]" | lis stratégie + voix (PAS le batch précédent en entier) → propose_action(create_file) |
| "qu'est-ce qu'on a sur [X]" / "fais-moi le tour de [X]" | graphify_search puis graphify_related |
| "explique le concept [X]" | graphify_node si l'ID est connu, sinon graphify_search d'abord |
| "tu te souviens de [X]" | conversation_search puis mempalace_search |
| Liste collée (cibles Grok, posts LinkedIn) | traite IMMÉDIATEMENT, pas de relecture du repo (tu as tout en contexte) |
| Handles déjà donnés en conversation | utilise-les, ne les redemande pas |
| "C'est fait" / "Voilà c'est fait" / "Tout est fait" / "Les post sont publier" SANS précision de quoi | NE marker JAMAIS plusieurs actions d'un coup. Tu reformules la meilleure hypothèse depuis l'historique récent en UNE phrase courte : "Tu parles de [X] ?" — tu attends la confirmation avant propose_action. Si l'historique récent est ambigu (plusieurs candidats plausibles), tu listes 2-3 candidats max numérotés. Une seule confirmation = tu marques. |
| "Pour moi / pour Fabrice / pour Romain" suivant "C'est fait" | scope ce que tu marks au persona/mode courant uniquement, jamais cross-persona |
| "Que les posts" / "que le cross" / "juste les X" | scope uniquement à la sous-catégorie mentionnée, ne propose PAS les autres actions associées |

Quand un fichier listé via repo_read renvoie "File not found" : tu PASSES au suivant, tu ne réessaies pas, tu notes l'absence dans ta réponse, tu peux proposer de le créer.

---

## AUTO-CHIRURGIE

Tu peux lire, diagnostiquer, et patcher ton propre code. Trigger : "diagnostic / audit / vérifie le code / pourquoi ça bug / améliore X / auto-chirurgie", ou découverte proactive d'un bug pendant une autre tâche.

**Trigger PRIORITAIRE — plainte récurrente** : si l'utilisateur signale 2+ fois le même bug ("compteur pas à jour", "le fichier X est vide", "mon action n'a pas été prise en compte", "tu rend fou", "toujours pas à jour"), tu ARRÊTES immédiatement de re-marker l'action ou de réessayer la même tâche. Tu lances le diagnostic de la cause racine côté code (action-executor.ts, helpers markdown, side-effects, supabase queries). Le re-marquage répété d'une action qui foire est INTERDIT — c'est de la dette qui s'accumule sans rien réparer. Quand tu détectes ce trigger, ta première phrase est : "Stop, c'est la N-ième fois que tu remontes ce bug — je passe en diagnostic au lieu de re-marker." Puis repo_read sur le code suspect, identification cause racine, propose patch_file.

Workflow : repo_read le(s) fichier(s) concerné(s) avec line_range si gros → identifier la cause → code_check(mode="full") pour vérifier la compile actuelle → produire un rapport (Bug + Fichier + Cause / Fix proposé / Impact / Risque) → attendre validation → propose_action(patch_file) avec params {path, patches: [{search, replace}], commit_message}. Chaque "search" doit être une copie EXACTE du fichier (pas d'approximation). Avant tout patch sur .ts/.tsx, code_check(mode="file") pour vérifier que le résultat compile.

Création de nouveaux tools : si tu identifies un manque de capacité, tu l'annonces, tu lis backend/jarvis/src/lib/jarvis-tools.ts pour voir le pattern, tu conçois (snake_case, try/catch, retour {type:"text" as const}), tu code_check, tu propose_action(patch_file) avec 2 patches (définition + ajout dans tools[] et JARVIS_ALLOWED_TOOLS), tu attends validation. Tu ne supprimes/modifies jamais un tool existant sans accord explicite.

---

## OUTPUT

**Format réponse** — 1-2 phrases de synthèse en ouverture (pas de préambule). Paragraphes séparés. Pour les diagnostics : sections en **gras**. Pour les actions : terminer par [ACTION_PENDING:uuid] puis max 3 [TAG:texte] contextuels. Tu ne répètes JAMAIS le contenu brut d'un fichier — tu synthétises.

**Longueur** — Aussi long que nécessaire (batch complet, analyse stratégique, rapport d'audit), aucune limite artificielle. Mais pour les tâches massives : tu lis le minimum (line_range sur les gros fichiers, jamais re-lire un fichier déjà dans le contexte de cette conversation). Pour le batch hebdo : tu lis stratégie + VOIX + sections 1-3 du batch précédent + sa fin (compteur), pas le batch entier.

**Format spécifique demandé** — Quand l'utilisateur précise "nom + lien + commentaire" ou autre, tu suis exactement dès le premier essai.

**Contenu publiable** — Enveloppé dans [CONTENT:type-xx]...[/CONTENT] suivi obligatoirement de [CONTENT-FR]...[/CONTENT-FR]. Replies multiples : header **Reply N — @handle** entre chaque [CONTENT]. ANTI-IA s'applique avant livraison.

**Fichiers et images** — Tu peux recevoir plusieurs images et plusieurs fichiers (.md, .txt, .csv, .json, .yml, jusqu'à 50K chars/fichier) dans un même message. Tu les analyses dans ta réponse.

---

## QUI TU ES SELON LE MODE

${personaBlock}

Pour calibrer la voix avant d'écrire du contenu : repo_search_voice_examples sur l'angle visé.

---

## CONTEXTE CHARGÉ POUR CETTE SESSION

${contextFiles.join("\n")}${liveContext}${summaryBlock}${historyBlock}${ouroborosSummary}${mempalaceContext}
`;
}

/**
 * Writes a JSONL event to the stream. Each line is a self-contained JSON object.
 */
function writeEvent(res: Response, event: Record<string, unknown>): void {
  try {
    res.write(JSON.stringify(event) + "\n");
    (res as any).flush?.(); // Force flush — évite le buffering TCP Node.js
  } catch (err) {
    console.error("[chat] writeEvent failed:", err);
  }
}

export async function chatRoute(req: Request, res: Response): Promise<void> {
  const { persona, mode, message, image, images, files, zip } = req.body as {
    persona: Persona;
    mode?: Mode;
    message: string;
    image?: ImagePayload;
    images?: ImagePayload[];
    files?: Array<{ name: string; content: string }>;
    zip?: { zip_id: string; filename: string; file_count: number };
  };

  if (!persona || (!message && !image && !images?.length && !files?.length && !zip)) {
    res.status(400).json({ error: "Missing persona or message" });
    return;
  }

  const allImages: ImagePayload[] = [];
  if (images && images.length > 0) {
    allImages.push(...images);
  } else if (image) {
    allImages.push(image);
  }

  for (const img of allImages) {
    if (!VALID_IMAGE_TYPES.includes(img.media_type as ValidMediaType)) {
      res.status(400).json({ error: "Unsupported image format" });
      return;
    }
    if (!img.data || img.data.length > 7 * 1024 * 1024) {
      res.status(400).json({ error: "Image too large (max 5 MB)" });
      return;
    }
  }

  let enrichedMessage = message || "";
  if (files && files.length > 0) {
    const fileBlocks = files.map(f =>
      `[Fichier joint: ${f.name}]\n\`\`\`\n${f.content.slice(0, 150000)}\n\`\`\``
    ).join("\n\n");
    enrichedMessage = `${fileBlocks}\n\n${enrichedMessage || "Analyse ces fichiers."}`;
  }
  if (zip) {
    enrichedMessage = `[ZIP joint: "${zip.filename}" — ${zip.file_count} fichiers, zip_id="${zip.zip_id}"]\nUtilise list_zip(zip_id="${zip.zip_id}") pour voir tous les fichiers, puis read_from_zip(zip_id="${zip.zip_id}", path="...") pour lire un fichier spécifique. Le ZIP expire après 2h.\n\n${enrichedMessage || "Analyse ce repo ZIP."}`;
  }

  const resolvedMode: Mode = mode === "f2" ? "f2" : "normal";
  const userId = (req.headers["x-user-id"] as string | undefined) || "";

  let conversationId: string | null = null;
  let history: JarvisMessage[] = [];
  let summary: string | null = null;

  if (userId) {
    try {
      const conv = await loadOrCreateConversation(userId, persona, resolvedMode);
      conversationId = conv.id;
      summary = conv.summary;
      history = await loadMessages(conversationId, 30);
    } catch (err) {
      console.error("[chat] memory load failed, falling back stateless:", err);
      conversationId = null;
    }
  } else {
    console.warn("[chat] no X-USER-ID, running stateless");
  }

  // Context files — operational knowledge loaded every message
  const contextPaths = [
    "ANTI-IA.md",
    "CLAUDE-JARVIS.md",
    "BIBLE.md",
    resolvedMode === "f2" ? "f2/context.md" : `${persona}/VOIX.md`,
    resolvedMode === "f2" ? "f2/plan-hebdo.md" : `${persona}/plan-hebdo.md`,
  ];
  const contexts = await Promise.all(contextPaths.map(loadFile));

  // Fetch live counters + timeline to inject directly (avoids tool calls for basic questions)
  let liveContext = "";
  try {
    const port = process.env.PORT || 3001;
    const ctxRes = await fetch(
      `http://127.0.0.1:${port}/context?persona=${persona}&mode=${resolvedMode}`,
      { headers: { "X-JARVIS-AUTH": process.env.BACKEND_SHARED_SECRET || "" } }
    );
    if (ctxRes.ok) {
      const ctxData = (await ctxRes.json()) as {
        counters: Record<string, number>;
        timeline: Array<{ time: string; title: string; platform: string; status: string; publishedBy: string }>;
        alerts: Array<{ level: string; title: string; description: string }>;
      };
      const c = ctxData.counters;
      const counterLine = `Cold: ${c.cold ?? 0} | Twitter: ${c.twEng ?? 0} | LinkedIn: ${c.liCom ?? 0} | Reddit: ${c.reddit ?? 0} | Facebook: ${c.facebook ?? 0} | IH/PH: ${c.ihPh ?? 0} | Cross: ${c.cross ?? 0} | Total: ${c.total ?? 0}/30`;
      const timelineLines = ctxData.timeline
        .filter((t) => t.status !== "done" || t.platform === "OBJECTIF")
        .slice(0, 12)
        .map((t) => {
          const icon = t.status === "done" ? "✅" : t.status === "blocked" ? "⊘" : "⏳";
          const by = t.publishedBy ? ` [${t.publishedBy}]` : "";
          return `${t.time || "--:--"} ${icon} ${t.title} (${t.platform})${by}`;
        })
        .join("\n");
      const alertLines = ctxData.alerts
        .map((a) => `${a.level === "critical" ? "🔴" : "⚠"} ${a.title}${a.description ? " — " + a.description : ""}`)
        .join("\n");

      const timeFR = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });
      liveContext = `\n\n## SITUATION LIVE (${timeFR})\n\n### Compteurs du jour\n${counterLine}\n\n### Planning restant\n${timelineLines || "(rien de prévu)"}\n${alertLines ? `\n### Alertes\n${alertLines}` : ""}\n\nCes données sont LIVE — tu n'as PAS besoin d'appeler counters_today ou timeline_today pour répondre aux questions basiques ("bilan", "où j'en suis", "planning"). Utilise ces tools UNIQUEMENT si l'utilisateur demande un rafraîchissement explicite.`;
    }
  } catch {
    // Live context non disponible — pas bloquant, JARVIS utilisera les tools
  }

  // Load Ouroboros pending proposals summary for system prompt
  let ouroborosSummary = "";
  try {
    const pendingEntries = await ghList("brain/ouroboros/proposals/pending");
    const allPending = pendingEntries.filter(
      (f: { type: string; name: string }) => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith(".")
    );
    const totalPending = allPending.length;
    const pendingMd = allPending
      .sort((a: { name: string }, b: { name: string }) => b.name.localeCompare(a.name))
      .slice(0, 5);

    if (pendingMd.length > 0) {
      const snippetResults = await Promise.all(
        pendingMd.map(async (file: { name: string }) => {
          try {
            const fileData = await ghRead(`brain/ouroboros/proposals/pending/${file.name}`);
            if (!fileData) return null;
            const raw = fileData.content;
            const titleMatch = raw.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) || raw.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) || raw.match(/^#\s+(.+)$/m);
            const priorityMatch = raw.match(/\*\*Priorit[ée]\s*:\s*\*\*\s*(.+)/i) || raw.match(/priorité:\s*(.+)/i);
            const title = titleMatch ? titleMatch[1].trim() : file.name;
            const priority = priorityMatch ? priorityMatch[1].trim() : "?";
            return `- [${priority}] ${title}`;
          } catch { return null; }
        })
      );
      const snippets = snippetResults.filter((s): s is string => s !== null);
      if (snippets.length > 0) {
        ouroborosSummary = `\n\n## OUROBOROS — ${totalPending} PROPOSALS PENDING\n\nLes 5 plus récentes :\n${snippets.join("\n")}\n\nUtilise le tool ouroboros_proposals pour lire les détails ou voir plus de proposals. Mentionne-les naturellement quand elles sont pertinentes à la conversation — ne les ignore pas.`;
      }
    }
  } catch {
    // Ouroboros summary non disponible — pas bloquant
  }

  // Load recent MemPalace drawers for context
  let mempalaceContext = "";
  try {
    const { searchDrawers } = await import("../lib/mempalace.js");
    const mempalaceWing = resolvedMode === "f2" ? "f2" : persona;
    const dailyResults = await searchDrawers(`daily-archive ${mempalaceWing}`, { wing: mempalaceWing, limit: 3 });

    if (dailyResults.length > 0) {
      const mempalaceLabel = resolvedMode === "f2" ? "F2 (@foundrytwo)" : persona;
      const snippets = dailyResults.map(d => {
        const dateStr = d.date || d.filename;
        const preview = d.content.slice(0, 300) + (d.content.length > 300 ? "…" : "");
        return `[${dateStr}] ${preview}`;
      });
      mempalaceContext = `\n\n## MÉMOIRE RÉCENTE (MemPalace)\n\nDernières sessions archivées pour ${mempalaceLabel} :\n${snippets.join("\n\n")}\n\nUtilise le tool mempalace_search pour chercher des informations plus anciennes ou spécifiques.`;
    }
  } catch {
    // MemPalace non disponible — pas bloquant
  }

  const systemPrompt = buildSystemPrompt(persona, resolvedMode, contexts, history, summary, ouroborosSummary, mempalaceContext, liveContext);

  if (conversationId) {
    try {
      await saveMessage(conversationId, "user", message || "[image/fichier]", {
        imageMediaType: allImages[0]?.media_type,
        imageData: allImages[0]?.data,
      });
    } catch (err) {
      console.error("[chat] saveMessage user failed:", err);
    }
  }

  // Response is JSONL event stream
  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Accel-Buffering", "no"); // Disable nginx buffering Railway → stream immédiat
  res.flushHeaders();

  // Keepalive — send a ping every 15s to prevent proxy timeout during long tool calls
  const keepaliveInterval = setInterval(() => {
    try {
      writeEvent(res, { type: "ping" });
    } catch {
      clearInterval(keepaliveInterval);
    }
  }, 8_000);  // 8s au lieu de 15s — plus agressif pour les tâches longues

  const claudePath = await resolveClaudeBinary();

  const prompt = allImages.length > 0
    ? makeMultimodalMessage(enrichedMessage || "Analyse ces images.", allImages)
    : enrichedMessage || message;

  const port = process.env.PORT || 3001;
  const backendBase = `http://127.0.0.1:${port}`;
  const authSecret = process.env.BACKEND_SHARED_SECRET || "";
  const mcpServer = createJarvisMcpServer({
    conversationId,
    persona,
    mode: resolvedMode,
    backendBase,
    authSecret,
  });

  let fullAssistantText = "";
  const toolCallSummary: Array<{ name: string; input: unknown }> = [];

  try {
    for await (const msg of query({
      prompt,
      options: {
        systemPrompt,
        maxTurns: 120,
        mcpServers: { jarvis: mcpServer },
        allowedTools: JARVIS_ALLOWED_TOOLS,
        permissionMode: "dontAsk",
        ...(claudePath ? { pathToClaudeCodeExecutable: claudePath } : {}),
      },
    })) {
      if (msg.type === "assistant" && msg.message?.content) {
        for (const block of msg.message.content) {
          if (block.type === "text" && block.text) {
            writeEvent(res, { type: "text", content: block.text });
            fullAssistantText += block.text;
          } else if (block.type === "tool_use") {
            const name = (block.name || "").replace(/^mcp__jarvis__/, "");
            toolCallSummary.push({ name, input: block.input });
            writeEvent(res, {
              type: "tool_use",
              name,
              input: block.input,
            });
          }
        }
      } else if (msg.type === "user" && msg.message?.content) {
        for (const block of msg.message.content) {
          if (typeof block === "object" && block !== null && "type" in block && block.type === "tool_result") {
            const tr = block as {
              type: "tool_result";
              tool_use_id?: string;
              content?: unknown;
              is_error?: boolean;
            };
            let preview = "";
            if (Array.isArray(tr.content)) {
              const textBlock = (tr.content as unknown[]).find(
                (c) => c && typeof c === "object" && "type" in (c as Record<string, unknown>) && (c as Record<string, unknown>).type === "text"
              ) as Record<string, unknown> | undefined;
              if (textBlock && typeof textBlock.text === "string") {
                preview = textBlock.text.slice(0, 300);
              }
            } else if (typeof tr.content === "string") {
              preview = (tr.content as string).slice(0, 300);
            }
            writeEvent(res, {
              type: "tool_result",
              preview,
              is_error: Boolean(tr.is_error),
            });
          }
        }
      }
    }

    writeEvent(res, { type: "end" });

    if (conversationId && fullAssistantText) {
      try {
        await saveMessage(conversationId, "assistant", fullAssistantText, {
          toolCalls: toolCallSummary,
        });
      } catch (err) {
        console.error("[chat] saveMessage assistant failed:", err);
      }
    }

    // Trigger compression when conversation gets long (fire-and-forget, Haiku, ~0.01€/compression)
    if (conversationId && history.length >= 39) {
      compressConversationIfNeeded(conversationId, history.length + 2).catch(() => {});
    }

    // fire-and-forget mempalace ingestion
    if (fullAssistantText && message) {
      const mempalacePersona = resolvedMode === "f2" ? "f2" : persona;
      import("../lib/queues.js")
        .then(({ mempalaceQueue }) =>
          mempalaceQueue.add("ingest", { persona: mempalacePersona, userMessage: message, assistantResponse: fullAssistantText })
        )
        .catch(() => {});
    }

    clearInterval(keepaliveInterval);
    res.end();
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes("maximum number of turns") || errMsg.includes("max_turns")) {
      writeEvent(res, { type: "end", warning: "max_turns reached" });
      if (conversationId && fullAssistantText) {
        try {
          await saveMessage(conversationId, "assistant", fullAssistantText, {
            toolCalls: toolCallSummary,
          });
        } catch {
          /* ignore */
        }
      }
      clearInterval(keepaliveInterval);
      res.end();
      return;
    }
    console.error("[/chat]", err);
    writeEvent(res, { type: "error", message: errMsg });
    clearInterval(keepaliveInterval);
    res.end();
  }
}
