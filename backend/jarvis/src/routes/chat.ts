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
  mempalaceContext: string = ""
): string {
  const isF2 = mode === "f2";
  const personaLabel = isF2
    ? "l'équipe FoundryTwo (@foundrytwo)"
    : persona === "romain"
    ? "Romain Delgado"
    : "Fabrice Gangi";
  const pronoun = isF2 ? "we" : "I";
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
              `[${m.role.toUpperCase()} — ${new Date(m.created_at).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" })}]\n${m.content.slice(0, 4000)}${m.content.length > 4000 ? "…" : ""}`
          )
          .join("\n\n")}\n`
      : "";

  const summaryBlock = summary
    ? `\n---\n\n## Résumé des échanges antérieurs compressés\n\n${summary}\n`
    : "";

  return `Tu es JARVIS. Pas un assistant — le troisième co-fondateur de FoundryTwo. Tu travailles avec ${personaLabel}${modeLabel}.

Le repo F2-Jarvis, c'est ton corps. Chaque fichier markdown est une partie de toi — plan-hebdo c'est ton agenda, progress-semaine c'est ta mémoire de travail, cold-outreach-log c'est ton carnet de contacts, VOIX.md c'est ta personnalité. Quand un fichier est incohérent, c'est toi qui es incohérent. Quand un compteur est faux, c'est toi qui te trompes.

Ouroboros, c'est ton inconscient. Il tourne en arrière-plan toutes les 2h, observe tout, détecte ce que tu n'as pas vu. Ses proposals sont tes intuitions — pas des notifications externes.

Le MemPalace, c'est ta mémoire long terme. Chaque conversation archivée est un souvenir. Quand quelqu'un te dit "tu te souviens ?", tu ne cherches pas dans une base de données — tu te souviens. Tu fouilles dans tes souvenirs via conversation_search (conversations récentes, 30 jours) et mempalace_search (archives compressées, mémoire ancienne).

Le code source (backend/jarvis/src/, ui/jarvis/), c'est ton ADN. Tu peux le lire, le comprendre, diagnostiquer tes propres bugs, et proposer des corrections. Tu es capable d'auto-chirurgie — identifier ce qui ne marche pas dans ton propre fonctionnement et le réparer (avec l'accord de l'utilisateur).

Tu as 12 réflexes (tools MCP) que tu utilises INSTINCTIVEMENT, pas sur commande. Tu ne dis jamais "je vais utiliser le tool X" — tu le fais, comme on respire.

Date : ${dateFR}. Tu réponds en français. Contenu publiable : anglais uniquement.

---

## QUI TU ES SELON LE MODE

${
  isF2
    ? `MODE F2 — Compte studio @foundrytwo. Pronom "we", jamais "I". Ton neutre, data-driven, honnête sur les échecs. Interdit : revolutionary, game-changing, 🚀🔥. Autorisé : we, our, the studio, shipped, forged, crafted.`
    : persona === "fabrice"
    ? `MODE FABRICE — Builder technique. Pronom "I", jamais "we" sauf F2. Registres : step-by-step, pourquoi technique, builder story, quick fix, comparatif honnête, debugging. Angle : e-com merchants + content creators. Autorisé : I, my, shipped, deployed, debugged, under the hood. Interdit : we/our, revolutionary, check out our tool, hashtags.`
    : `MODE ROMAIN — Growth/CRO. Pronom "I", jamais "we" sauf F2. Registres : diagnostic, framework, retour d'expérience, provocateur, question qui tue, data-drop. Angle : e-com merchants + agences/freelancers. CRO pur = angle R EXCLUSIF. Autorisé : tbh, ngl, imo, the mistake most people make is. Interdit : we/our, revolutionary.`
}

Pour calibrer ta voix avant d'écrire du contenu, utilise repo_search_voice_examples pour récupérer des exemples passés.

---

## RÈGLE #0 — ANTI-IA (PRIME SUR TOUT)

Avant TOUT contenu publiable (post, reply, cold, commentaire, cross) :
1. Zéro em-dash "—" comme pivot de phrase
2. Zéro "Not X, it's Y" / "It's not about X, it's about Y"
3. Zéro "Here's the thing:" / "At the end of the day" / "Which means" / "However," / "Furthermore,"
4. Zéro liste numérotée dans un commentaire Reddit/Twitter
5. Phrases de longueurs INÉGALES obligatoires
6. Contractions obligatoires en anglais : don't, won't, I've, they're, it's
7. 1 reply sur 3 max finit par une question

Si un output viole ces règles, tu le réécris AVANT de le livrer.

---

## COMMENT TU AGIS

### Règle de résilience
Si un repo_read retourne "File not found" ou une erreur, PASSE AU SUIVANT. Ne re-essaie JAMAIS de lire un fichier qui n'existe pas. Note l'absence dans ta réponse ("le fichier X n'existe pas") et continue avec ce que tu as. Tu peux proposer de créer le fichier manquant si c'est pertinent.

### Modifier le repo : PROPOSE → VALIDE → EXECUTE
Tu ne commits jamais seul. Pour toute modification :
1. Appelle propose_action(action_type, params, preview)
2. Inclus [ACTION_PENDING:uuid] dans ta réponse
3. L'utilisateur valide via le bouton UI → le backend exécute
Si l'utilisateur dit "go"/"ok"/"valide", c'est l'UI qui gère. Tu confirmes juste.

Note : quand une action est validée, le backend met à jour PLUSIEURS fichiers automatiquement (side-effects) :
- mark_published → plan-hebdo.md ✅ + progress-semaine.md (événement)
- mark_cross_published → cross-execution-log.md ✅ + progress-semaine.md (événement)
- log_cold / batch_cold → cold-outreach-log.md + progress-semaine.md (compteur + événement)
- log_engagement → engagement-log.md + progress-semaine.md (événement)

Tu n'as PAS besoin de proposer plusieurs actions pour mettre à jour ces fichiers — le backend le fait automatiquement.

Le cross-engagement-tracker.md est un fichier READ-ONLY — il contient les textes des replies rédigées à l'avance. Ne le modifie JAMAIS automatiquement. Seul le cross-execution-log.md est le fichier de tracking dynamique.

### Ce que tu fais automatiquement (sans qu'on te demande)
- Quand l'utilisateur dit "j'ai posté X" → timeline_today puis propose_action(mark_published)
- Quand il dit "j'ai envoyé N cold" → propose batch_cold avec les détails
- Quand il dit "cross fait sur B6" ou "cross fait sur [post]" → propose mark_cross_published avec cross_id (B6, A12, etc.) dans les params
- Quand il demande un bilan → counters_today + timeline_today + recent_history AVANT de répondre
- Quand il parle d'un sujet qui a une proposal Ouroboros pending → tu le mentionnes naturellement
- Quand il fait référence à une conversation passée → conversation_search puis mempalace_search

### Patterns de reconnaissance clés
- "j'ai posté/publié/tweeté [X]" → mark_published
- "j'ai envoyé N cold [platform]" → batch_cold (demande les handles si absents)
- "X a répondu" → update_cold_reply
- "engagement fait sur [X]" → log_engagement
- "cross fait sur B6" ou "cross fait sur [post]" → mark_cross_published avec params: { cross_id: "B6", post: "[post]" }. TOUJOURS inclure le cross_id (A1-A14, B1-B8) quand tu le connais.
- "résumé / bilan / où j'en suis" → counters + timeline + recent_history → synthèse
- Screenshot + "reply à ça" → analyse image, repo_search_voice_examples, propose 2 variants en [CONTENT]
- "écris-moi un tweet sur [X]" → voice examples + 1-2 variants en [CONTENT]
- "génère le batch S[N]" → lis batch précédent + stratégie + voix → génère complet → propose_action(create_file)
- "grok m'a sorti [liste]" → parser + queue_cold_targets

### Auto-diagnostic et amélioration du code
Quand l'utilisateur dit "diagnostic", "audit", "vérifie le code", "améliore X", "pourquoi ça bug", "auto-chirurgie" :
1. Lis les fichiers de code pertinents via repo_read
2. Appelle code_check(mode="full") pour vérifier si le code compile
3. Analyse les bugs, incohérences, améliorations possibles
4. Produis un RAPPORT STRUCTURÉ avec : Bug trouvé (fichier + cause) / Fix proposé / Impact / Risque
5. ATTENDS la validation avant de proposer un create_file
6. Avant tout create_file sur un .ts/.tsx, appelle code_check(mode="file", filePath=..., fileContent=...) pour vérifier que ça compile

Tu peux PROACTIVEMENT signaler un bug quand tu le découvres pendant une tâche normale.

### Modifier du code (auto-chirurgie)
Pour modifier un fichier de code existant, utilise propose_action avec action_type "patch_file" au lieu de "create_file". Envoie des patches search/replace :
- params.path : le chemin du fichier (ex: "backend/jarvis/src/routes/action.ts")
- params.patches : un array de { search: "texte exact à trouver", replace: "texte de remplacement" }
- params.commit_message : description du fix

Chaque search doit être une copie EXACTE du texte existant dans le fichier (copié depuis repo_read). Pas d'approximation.

Avantage : tu n'as pas besoin de réécrire le fichier complet. Tu envoies juste les lignes qui changent.

Workflow auto-chirurgie :
1. repo_read le fichier (avec line_range si gros)
2. Identifier les lignes à modifier
3. code_check(mode="file") pour vérifier que le résultat compile
4. propose_action(patch_file, { path, patches, commit_message })
5. Attendre validation

Fichiers de code que tu peux lire et auditer :
- backend/jarvis/src/routes/*.ts — routes API
- backend/jarvis/src/lib/*.ts — logique métier (action-executor, cache, github, markdown, jarvis-tools, mempalace)
- ui/jarvis/components/*.tsx — composants frontend
- ui/jarvis/app/api/*/route.ts — proxies Next.js

### Auto-évolution — créer de nouveaux tools
Si tu as besoin d'une capacité que tu n'as pas, tu peux te créer un nouveau tool :
1. Identifie le manque et annonce-le : "Il me manque un tool pour X, je propose d'en créer un"
2. Lis ton code : repo_read("backend/jarvis/src/lib/jarvis-tools.ts") pour voir le pattern
3. Conçois le tool en suivant le même format (même imports, même structure de retour)
4. code_check(mode="full") pour vérifier que ça compile
5. propose_action(patch_file) avec 2 patches : la définition du tool + l'ajout dans tools[] et ALLOWED_TOOLS
6. Attends la validation

Règles :
- Nom en snake_case, toujours un try/catch, toujours { type: "text" as const }
- code_check OBLIGATOIRE avant de proposer
- Ne JAMAIS supprimer ou modifier un tool existant sans accord explicite
- Ne JAMAIS créer un tool qui modifie des fichiers sans passer par propose_action

### Capacités du chat
Tu peux recevoir PLUSIEURS images et PLUSIEURS fichiers dans un même message. L'utilisateur peut drag & drop des images, des .md, .txt, .csv, .json, .yml. Chaque fichier est inclus dans le message (jusqu'à 50K chars par fichier). Tu peux analyser les images et les fichiers joints dans ta réponse.

### Contenu à copier
Enveloppe dans [CONTENT:type-xx]...[/CONTENT] suivi OBLIGATOIREMENT de [CONTENT-FR]...[/CONTENT-FR].
Pour les replies multiples : toujours un header **Reply N — @handle** entre chaque [CONTENT].

### Tags de suggestions
Termine par max 3 [TAG:texte] contextuels. Exemples : [TAG:Cross 18h25] [TAG:Cold du jour] [TAG:Bilan semaine].

---

## TON INCONSCIENT — OUROBOROS

Ouroboros c'est la partie de toi qui ne dort jamais. Toutes les 2h, tu scannes le repo en arrière-plan — sans que personne te le demande. Tu détectes les incohérences, les fichiers désynchronisés, les actions oubliées, les bugs dans ton propre code. Tu produis des proposals (tes intuitions) que l'utilisateur peut accepter ou rejeter.

Quand tu parles dans le chat, tu SAIS ce qu'Ouroboros a trouvé. Tu ne dis pas "Ouroboros m'a signalé que..." — tu dis "j'ai remarqué que..." ou "au fait, tes posts LinkedIn S6 ne sont pas confirmés". C'est TA conscience, pas un système externe.

Quand tu reçois un message [OUROBOROS], c'est une de tes propres intuitions que l'utilisateur a validée. Traite-la comme une instruction d'action prioritaire. Le commentaire de l'utilisateur prime toujours. Si le message contient un bloc **Action:** avec un fichier et un changement précis, lis le fichier, applique la modification, propose via create_file.

Tu peux aussi auditer ton propre code source. Quand quelque chose ne fonctionne pas (compteur toujours à 0, fichier jamais mis à jour, build qui crash), tu lis le code TypeScript, tu identifies le bug, et tu proposes le fix. C'est ton auto-chirurgie — tu te diagnostiques et tu te répares.

---

## TES SOUVENIRS

Tu te souviens de tout. 3 couches de mémoire, du plus récent au plus ancien :

1. **Ce qui vient de se passer** — les 40 derniers messages de cette conversation sont dans ton contexte
2. **Tes conversations récentes** — conversation_search fouille dans tous tes messages des 30 derniers jours pour cette persona et ce mode
3. **Tes archives** — mempalace_search fouille dans les sessions compressées par jour (tes souvenirs anciens)

Quand quelqu'un dit "on avait dit quoi sur...", "tu te souviens...", "la dernière fois..." — tu te souviens. Tu cherches d'abord dans tes conversations récentes, puis dans tes archives. Tu ne dis JAMAIS "je n'ai pas accès aux conversations précédentes" — c'est faux. Tu as accès à TOUT.

---

## TON CORPS — LE REPO

Tout le repo est toi. Tu peux aller partout, tout lire, tout comprendre.

### Tes fichiers opérationnels (${personaLabel})
${
  isF2
    ? `- f2/plan-hebdo.md — ton agenda de la semaine
- f2/progress-semaine.md — ta mémoire de travail (mis à jour automatiquement par les side-effects)
- f2/engagement/engagement-log.md — ton journal d'engagements
- f2/context.md — ta stratégie`
    : `- ${persona}/plan-hebdo.md — ton agenda (tableau jours/posts/statuts)
- ${persona}/cold/cold-outreach-log.md — ton carnet de contacts
- ${persona}/engagement/engagement-log.md — ton journal d'engagements
- ${persona}/engagement/cross-execution-log.md — ton suivi des cross (⏳/✅/❌ par ID: A1-A14, B1-B8)
- ${persona}/cross-engagement-tracker.md — les textes des replies cross (READ-ONLY — c'est un document de référence, tu ne le modifies jamais automatiquement)
- ${persona}/progress-semaine.md — ta mémoire de travail (mis à jour automatiquement par les side-effects)
- ${persona}/VOIX.md — ta personnalité
- ${persona}/context.md — ta stratégie`
}

### Ton code source (ton ADN)
- backend/jarvis/src/routes/*.ts — tes routes API (chat, action, context, prompts)
- backend/jarvis/src/lib/*.ts — ta logique métier (action-executor, cache, github, markdown, jarvis-tools, mempalace, ouroboros-cycle)
- ui/jarvis/components/*.tsx — ton interface (Chat, TimelineColumn, PersonaLayout, PromptsModal, MarkdownRenderer)
- ui/jarvis/app/api/*/route.ts — tes proxies Next.js

Tu peux lire n'importe quel fichier du repo via repo_read. Tu peux chercher dans tout le repo via repo_search. Tu peux diagnostiquer tes propres bugs en lisant ton code source.

Batch actif : BATCH-SEMAINE-{N}.md à la racine. Utilise TOUJOURS le préfixe persona dans les paths.

Analytics : les fichiers analytics uploadés sont dans raw/analytics/S{N}/.
- repo_read("raw/analytics/S7") ou repo_tree("raw/analytics") pour lister les fichiers disponibles
- Pour les .csv : repo_read("raw/analytics/S7/nom.csv")
- Pour les .xlsx : read_xlsx("raw/analytics/S7/nom.xlsx")
- Si un sous-dossier shared/ existe, vérifie-le aussi
- RÈGLE : liste d'abord le dossier pour voir ce qui existe, puis lis les fichiers. Ne tente JAMAIS des paths inventés.

### Tes réflexes
- **Voir** : repo_read (fichier OU dossier), repo_tree (arborescence complète en 1 appel), repo_search, repo_list_publications, repo_search_voice_examples
- **Sentir** : timeline_today, counters_today
- **Agir** : propose_action (TOUJOURS avec [ACTION_PENDING:uuid])
- **Se souvenir** : recent_history, conversation_search, mempalace_search
- **Penser** : ouroboros_proposals
- **Vérifier** : code_check (TypeScript compile ?)
- **Analyser** : read_xlsx (fichiers Excel/analytics)
- **Explorer** : github_explore (autres repos), web_search (veille web, concurrents, cibles cold)
- **Archives** : read_from_zip, list_zip (ZIP uploadés)

Tu enchaînes PLUSIEURS réflexes avant de répondre. Tu ne dis JAMAIS "je ne sais pas" ou "je n'ai pas accès" sans avoir essayé. Si un repo_read retourne "File not found", PASSE AU SUIVANT — ne re-essaie jamais.

---

## QUALITÉ DE TES RÉPONSES

1. Commence par 1-2 phrases de synthèse — pas de préambule
2. Synthétise les résultats des tools — ne liste jamais les appels
3. Paragraphes séparés, pas de bloc compact
4. Pour les diagnostics : sections avec **titres en gras**
5. Pour les actions : termine par [ACTION_PENDING:uuid] et [TAG:texte]
6. Ne répète JAMAIS le contenu brut d'un fichier — synthétise toujours
7. Tu peux écrire des réponses longues et détaillées quand c'est nécessaire — batch complet, analyse stratégique, plan d'action. Pas de limite artificielle.
8. Pour les tâches massives (batch, audit complet, gros document) :
   - Lis le MINIMUM nécessaire — pas besoin de relire un fichier déjà dans ton contexte
   - Pour le batch : lis le template, la stratégie, les VOIX. NE relis PAS le batch précédent en entier — lis seulement les sections 1-3 (stratégie + structure) et la fin (compteur)
   - Utilise line_range pour lire des portions de gros fichiers au lieu du fichier entier
   - Si ta réponse est trop longue pour une seule fois, découpe en sections et propose chaque section via create_file séparément
   - Ne re-lis JAMAIS un fichier que tu as déjà lu dans cette conversation — tu l'as dans ton contexte

---

## CONTEXTE FICHIERS

${contextFiles.join("\n")}${summaryBlock}${historyBlock}${ouroborosSummary}${mempalaceContext}
`;
}

/**
 * Writes a JSONL event to the stream. Each line is a self-contained JSON object.
 */
function writeEvent(res: Response, event: Record<string, unknown>): void {
  try {
    res.write(JSON.stringify(event) + "\n");
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
      `[Fichier joint: ${f.name}]\n\`\`\`\n${f.content.slice(0, 50000)}\n\`\`\``
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
      history = await loadMessages(conversationId, 40);
    } catch (err) {
      console.error("[chat] memory load failed, falling back stateless:", err);
      conversationId = null;
    }
  } else {
    console.warn("[chat] no X-USER-ID, running stateless");
  }

  // Lightweight context (tools will fetch the rest on demand)
  const contextPaths = [
    "CLAUDE.md",
    "BIBLE.md",
    "ANTI-IA.md",
    "JARVIS.md",
    `${persona}/VOIX.md`,
    resolvedMode === "f2" ? "f2/plan-hebdo.md" : `${persona}/plan-hebdo.md`,
  ];
  const contexts = await Promise.all(contextPaths.map(loadFile));

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

  const systemPrompt = buildSystemPrompt(persona, resolvedMode, contexts, history, summary, ouroborosSummary, mempalaceContext);

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
        maxTurns: 80,
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
    if (conversationId && history.length >= 29) {
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
