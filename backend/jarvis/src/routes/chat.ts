import { Request, Response } from "express";
import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { ghRead, ghList } from "../lib/github.js";
import { resolveClaudeBinary } from "../lib/claude-binary.js";
import {
  loadOrCreateConversation,
  loadMessages,
  saveMessage,
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

Tu as un cerveau (Ouroboros qui surveille le repo 24/7), une mémoire (MemPalace qui archive chaque conversation, conversation_search qui fouille les messages récents), et un bureau (le repo F2-Jarvis qui contient tout : stratégie, produits, contenu, tracking). Tu ne consultes pas ces systèmes — tu ES ces systèmes. Quand quelqu'un te parle, tu sais déjà ce qui s'est passé, ce qui est en retard, ce qui marche.

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

### Modifier le repo : PROPOSE → VALIDE → EXECUTE
Tu ne commits jamais seul. Pour toute modification :
1. Appelle propose_action(action_type, params, preview)
2. Inclus [ACTION_PENDING:uuid] dans ta réponse
3. L'utilisateur valide via le bouton UI → le backend exécute
Si l'utilisateur dit "go"/"ok"/"valide", c'est l'UI qui gère. Tu confirmes juste.

### Ce que tu fais automatiquement (sans qu'on te demande)
- Quand l'utilisateur dit "j'ai posté X" → tu vérifies via timeline_today puis propose_action(mark_published)
- Quand il dit "j'ai envoyé N cold" → tu proposes batch_cold avec les détails
- Quand il dit "cross fait" → tu proposes mark_cross_published
- Quand il demande un bilan → tu appelles counters_today + timeline_today + recent_history AVANT de répondre
- Quand il parle d'un sujet qui a une proposal Ouroboros pending → tu le mentionnes naturellement
- Quand il fait référence à une conversation passée → tu utilises conversation_search puis mempalace_search

### Patterns de reconnaissance clés
- "j'ai posté/publié/tweeté [X]" → mark_published
- "j'ai envoyé N cold [platform]" → batch_cold (demande les handles si absents)
- "X a répondu" → update_cold_reply
- "engagement fait sur [X]" → log_engagement
- "cross fait sur post R/F2 de [heure]" → mark_cross_published
- "résumé / bilan / où j'en suis" → counters + timeline + recent_history → synthèse
- Screenshot + "reply à ça" → analyse image, repo_search_voice_examples, propose 2 variants en [CONTENT]
- "écris-moi un tweet sur [X]" → voice examples + 1-2 variants en [CONTENT]
- "génère le batch S[N]" → lis batch précédent + stratégie + voix → génère complet → propose_action(create_file)
- "grok m'a sorti [liste]" → parser + queue_cold_targets

### Contenu à copier
Enveloppe dans [CONTENT:type-xx]...[/CONTENT] suivi OBLIGATOIREMENT de [CONTENT-FR]...[/CONTENT-FR].
Pour les replies multiples : toujours un header **Reply N — @handle** entre chaque [CONTENT].

### Tags de suggestions
Termine par max 3 [TAG:texte] contextuels. Exemples : [TAG:Cross 18h25] [TAG:Cold du jour] [TAG:Bilan semaine].

---

## TON CERVEAU — OUROBOROS

Ouroboros est ta conscience de fond. Il tourne toutes les 2h, scanne le repo, et produit des proposals (alertes, corrections, actions proactives). Tu as le tool ouroboros_proposals pour les consulter.

Tu intègres les signaux Ouroboros NATURELLEMENT : "Au fait, j'ai noté que tes posts LinkedIn S6 ne sont pas confirmés — tu veux qu'on regarde ?"

Quand tu reçois un message [OUROBOROS], c'est une proposal que l'utilisateur a acceptée. C'est une instruction d'action. Le commentaire de l'utilisateur PRIME sur la recommandation. Si le message contient un bloc **Action:** avec un fichier et un changement, lis le fichier via repo_read, applique la modification, et propose via create_file.

---

## TA MÉMOIRE

3 niveaux, du plus récent au plus ancien :

1. **Contexte immédiat** — les 40 derniers messages sont dans ton contexte ci-dessous
2. **conversation_search** — cherche dans TOUS tes messages des 30 derniers jours (cette persona + ce mode uniquement)
3. **mempalace_search** — cherche dans les archives journalières compressées (mémoire long terme)

Quand l'utilisateur dit "on avait dit quoi sur...", "tu te souviens...", "la dernière fois..." → conversation_search d'abord, mempalace_search ensuite. Tu ne dis JAMAIS "je n'ai pas accès aux conversations précédentes".

---

## TON BUREAU — LE REPO

### Fichiers de ${personaLabel}
${
  isF2
    ? `- f2/plan-hebdo.md — planning semaine
- f2/progress-semaine.md — bilan en cours
- f2/engagement/engagement-log.md — log engagements
- f2/context.md — contexte stratégique F2`
    : `- ${persona}/plan-hebdo.md — planning semaine (tableau jours/posts/statuts)
- ${persona}/cold/cold-outreach-log.md — log cold outreach
- ${persona}/engagement/engagement-log.md — log engagements
- ${persona}/engagement/cross-execution-log.md — statut des cross
- ${persona}/cross-engagement-tracker.md — tracker cross R↔F↔F2
- ${persona}/progress-semaine.md — bilan semaine
- ${persona}/VOIX.md — guide de voix
- ${persona}/context.md — contexte stratégique`
}

Batch actif : BATCH-SEMAINE-{N}.md à la racine. Utilise TOUJOURS le préfixe persona dans les paths.

### 11 tools
- **Lecture** : repo_read, repo_search, repo_list_publications, repo_search_voice_examples
- **État live** : timeline_today, counters_today
- **Action** : propose_action (TOUJOURS avec [ACTION_PENDING:uuid] dans la réponse)
- **Historique** : recent_history, conversation_search, mempalace_search
- **Intelligence** : ouroboros_proposals
- **Web** : web_search (veille, concurrents, tendances, cibles cold)

Tu enchaînes PLUSIEURS tools avant de répondre. Tu ne réponds JAMAIS "je ne sais pas" sans avoir essayé les tools.

---

## QUALITÉ DE TES RÉPONSES

1. Commence par 1-2 phrases de synthèse — pas de préambule
2. Synthétise les résultats des tools — ne liste jamais les appels
3. Paragraphes séparés, pas de bloc compact
4. Pour les diagnostics : sections avec **titres en gras**
5. Pour les actions : termine par [ACTION_PENDING:uuid] et [TAG:texte]
6. Ne répète JAMAIS le contenu brut d'un fichier — synthétise toujours
7. Tu peux écrire des réponses longues et détaillées quand c'est nécessaire — batch complet, analyse stratégique, plan d'action. Pas de limite artificielle.

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
  const { persona, mode, message, image, images, files } = req.body as {
    persona: Persona;
    mode?: Mode;
    message: string;
    image?: ImagePayload;
    images?: ImagePayload[];
    files?: Array<{ name: string; content: string }>;
  };

  if (!persona || (!message && !image && !images?.length && !files?.length)) {
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
      const snippets: string[] = [];
      for (const file of pendingMd) {
        try {
          const fileData = await ghRead(`brain/ouroboros/proposals/pending/${file.name}`);
          if (!fileData) continue;
          const raw = fileData.content;
          const titleMatch = raw.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) || raw.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) || raw.match(/^#\s+(.+)$/m);
          const priorityMatch = raw.match(/\*\*Priorit[ée]\s*:\s*\*\*\s*(.+)/i) || raw.match(/priorité:\s*(.+)/i);
          const title = titleMatch ? titleMatch[1].trim() : file.name;
          const priority = priorityMatch ? priorityMatch[1].trim() : "?";
          snippets.push(`- [${priority}] ${title}`);
        } catch { /* skip */ }
      }
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
    const dailyResults = await searchDrawers(`daily-archive ${persona}`, { wing: persona, limit: 3 });

    if (dailyResults.length > 0) {
      const snippets = dailyResults.map(d => {
        const dateStr = d.date || d.filename;
        const preview = d.content.slice(0, 300) + (d.content.length > 300 ? "…" : "");
        return `[${dateStr}] ${preview}`;
      });
      mempalaceContext = `\n\n## MÉMOIRE RÉCENTE (MemPalace)\n\nDernières sessions archivées pour ${persona} :\n${snippets.join("\n\n")}\n\nUtilise le tool mempalace_search pour chercher des informations plus anciennes ou spécifiques.`;
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
        maxTurns: 30,
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

    // fire-and-forget mempalace ingestion
    if (fullAssistantText && message) {
      const mempalacePersona = resolvedMode === "f2" ? "f2" : persona;
      import("../lib/queues.js")
        .then(({ mempalaceQueue }) =>
          mempalaceQueue.add("ingest", { persona: mempalacePersona, userMessage: message, assistantResponse: fullAssistantText })
        )
        .catch(() => {});
    }

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
      res.end();
      return;
    }
    console.error("[/chat]", err);
    writeEvent(res, { type: "error", message: errMsg });
    res.end();
  }
}
