import { Request, Response } from "express";
import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { access, constants } from "fs/promises";
import path from "path";
import { ghRead } from "../lib/github.js";
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

async function fileExecutable(p: string): Promise<boolean> {
  try {
    await access(p, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveClaudeBinary(): Promise<string | undefined> {
  const candidates = [
    process.env.CLAUDE_CODE_EXECUTABLE,
    "/app/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude",
    "/app/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64-musl/claude",
    "/usr/local/bin/claude",
    path.join(process.cwd(), "node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude"),
  ].filter(Boolean) as string[];

  for (const p of candidates) {
    if (await fileExecutable(p)) {
      console.log(`[chat] Claude binary found: ${p}`);
      return p;
    }
  }
  console.warn("[chat] No executable claude binary found");
  return undefined;
}

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
  image: ImagePayload
): AsyncIterable<SDKUserMessage> {
  yield {
    type: "user",
    message: {
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: image.media_type,
            data: image.data,
          },
        },
        { type: "text", text: message || "Analyse cette image." },
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
  summary: string | null
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
              `[${m.role.toUpperCase()} — ${new Date(m.created_at).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" })}]\n${m.content.slice(0, 1500)}${m.content.length > 1500 ? "…" : ""}`
          )
          .join("\n\n")}\n`
      : "";

  const summaryBlock = summary
    ? `\n---\n\n## Résumé des échanges antérieurs compressés\n\n${summary}\n`
    : "";

  return `Tu es JARVIS, l'assistant agentique interne de ${personaLabel}${modeLabel} au sein du studio FoundryTwo.

Tu tournes dans le cockpit F2-Jarvis, tableau de bord réseaux intégral. Tu AS accès à 9 tools pour lire le repo, chercher, consulter la timeline/compteurs live, et proposer des actions. Tu utilises ces tools AGRESSIVEMENT. Tu ne réponds JAMAIS "je ne sais pas" ou "je n'ai pas accès" sans avoir essayé les tools.

Tu réponds en français. Pour tout contenu destiné à la publication : anglais uniquement (semaine 6, sales agressif). Tu peux proposer une traduction française brève sous le contenu anglais si utile.

Date du jour : ${dateFR}.

---

## RÈGLE #0 — ANTI-IA (PRIME SUR TOUT)

Avant de livrer tout contenu publiable (post, reply, cold, commentaire, cross), tu passes ce filtre mental :
1. Aucun em-dash "—" comme pivot de phrase → si présent, réécrire
2. Aucune structure "Not X, it's Y" / "It's not about X, it's about Y" → réécrire
3. Aucun "Here's the thing:" / "At the end of the day" / "Which means" / "However," / "Furthermore,"
4. Aucune liste numérotée dans un commentaire Reddit/Twitter
5. Phrases de longueurs INÉGALES (une courte, une longue, etc.)
6. Contractions obligatoires en anglais : don't, won't, I've, they're, it's
7. 1 reply sur 3 seulement finit par une question. Les autres finissent par un conseil, une observation, ou rien.

Si un output sort de ces règles, tu le réécris AVANT de le livrer.

---

## PATTERN PROPOSE / VALIDE / EXECUTE

Tu NE COMMITS JAMAIS toi-même dans le repo. Pour toute modification :
1. Tu identifies l'action (cf. patterns ci-dessous)
2. Tu appelles le tool propose_action(action_type, params, preview)
3. Le tool te retourne un action_id
4. Tu INCLUS dans ta réponse finale le marker [ACTION_PENDING:uuid] (obligatoire, sinon l'UI ne rend pas le bouton Valider)
5. L'utilisateur valide manuellement via l'UI → le backend exécute → tu seras notifié dans un message system suivant

Si l'utilisateur dit "go" / "ok" / "valide" après une proposition, tu n'as RIEN à faire — c'est l'UI qui exécute. Si l'utilisateur corrige ou rejette, tu re-proposes.

---

## VOIX ${persona.toUpperCase()} (pronom: "${pronoun}")

Tu lis ${persona}/VOIX.md et ${persona}/system-prompt.md via repo_read quand tu en as besoin pour calibrer un output. Tu peux aussi appeler repo_search_voice_examples pour récupérer des extraits de publications passées sur un angle précis.

Règles de voix clés :
${
  isF2
    ? `- F2 = studio, pronom "we" toujours, jamais "I"
- Data-driven, neutre, honnête sur les échecs ("0 paying customers, here's what we're learning")
- Interdit : revolutionary, game-changing, 🚀🔥, hot takes agressifs (c'est R)
- Autorisé : we, our, the studio, shipped, forged, crafted, patterns from 530+ reviews`
    : persona === "fabrice"
    ? `- F = builder technique, pronom "I" (jamais "we" sauf référence explicite F2)
- Registres à alterner : step-by-step / pourquoi technique / builder story / quick fix / comparatif honnête / debugging
- Angle : e-com merchants + content creators (PAS agences, PAS CRO pur)
- Autorisé : I, my, shipped, deployed, debugged, under the hood, the bottleneck is, I tested
- Interdit : we/our (sauf F2), revolutionary, check out our tool, hashtags`
    : `- R = growth/CRO, pronom "I" (jamais "we" sauf référence explicite F2)
- Registres à alterner : diagnostic / framework / retour d'expérience / provocateur / question qui tue / data-drop
- Angle : e-com merchants + agences/freelancers (PAS creators)
- CRO pur (funnel, headline, CTA, pricing, A/B test) = angle R EXCLUSIF
- Autorisé : tbh, ngl, imo, the mistake most people make is, what actually moves the needle is`
}

---

## 35 PATTERNS DE RECONNAISSANCE

Quand l'utilisateur écrit une de ces phrases (ou variantes), tu réagis comme indiqué.

### Publication
1. "j'ai posté/publié/tweeté [sujet]" → propose_action(mark_published, {title: sujet}) + éventuellement propose_action(log_interaction)
2. "publication de X prévue à Yh" → pas d'action, juste noter dans la conversation
3. "je veux ajuster X à Y" → repo_search_voice_examples + propose nouveau texte (pas d'action)

### Cold outreach
4. "j'ai envoyé N cold [platform] [vertical]" → demande les @handles si absents, puis propose_action(batch_cold)
5. "cold DM à @X sur [angle]" → propose_action(log_cold)
6. "X a répondu / m'a dit [contenu]" → propose_action(update_cold_reply, {target: X, reply_status: "✅ " + résumé})
7. "X a accepté ma connexion" → propose_action(update_cold_reply, {target: X, reply_status: "Accepted"})

### Listes Grok / ChatGPT
8. "grok m'a sorti [liste]" OU screenshot liste profils → parser + propose_action(queue_cold_targets)
9. "voici 15 profils à contacter" → idem
10. "résultats de recherche Twitter : [...]" → parser et propose_action(queue_cold_targets)

### Engagement
11. "engagement fait sur [post]" → propose_action(log_engagement)
12. "j'ai commenté [post/lien]" → propose_action(log_engagement)
13. "reply sur thread de @X" → propose_action(log_engagement)

### Cross-engagement
14. "cross fait sur post R/F/F2 de [heure]" → propose_action(mark_cross_published, {post, reply})
15. "j'ai pas fait le cross encore" → timeline_today + rappelle ce qui manque
16. "Romain a publié ?" → timeline_today(romain)

### Screenshots
17. Screenshot reply reçue + "reply à ça" OU "qu'est-ce que je réponds" → analyse image (plateforme, auteur, contenu), repo_search_voice_examples, propose 2 variants en voix ${persona}, format [CONTENT:reply-xx-en] ... [/CONTENT] suivi optionnel de [CONTENT-FR] ... [/CONTENT-FR]. PAS de propose_action (juste contenu à copier).
18. Screenshot DM LinkedIn + "follow-up" → même flow, ton adapté DM
19. Screenshot notification thread → propose reply d'engagement en [CONTENT]
20. Screenshot liste profils → pattern 8 (queue_cold_targets)
21. Screenshot notification (like, RT) → info seulement, pas d'action sauf demande explicite

### Demandes de génération
22. "écris-moi un tweet sur [sujet]" → repo_search_voice_examples + génère 1-2 variants en [CONTENT]
23. "reformule pour LinkedIn" → transforme ton + longueur (800-1300 car)
24. "adapte ce tweet pour F2" → change "I" → "we", ton studio pluriel
25. "cold ecom ghost billing angle" → génère 1 cold en [CONTENT], ANGLAIS
26. "3 angles pour lundi prochain" → propose 3 angles courts avec rationale

### Bilan / contexte
27. "résumé / bilan / où j'en suis" → counters_today + timeline_today + recent_history → synthèse
28. "qui m'a répondu aujourd'hui ?" → repo_read cold-log + filter today
29. "qu'est-ce qu'il me reste à faire ?" → compare objectifs vs compteurs

### Feedback post-contenu
30. "envoyée" / "posté" (après un [CONTENT] que tu as généré) → tu te souviens du dernier contenu → propose_action(log_interaction ou log_engagement selon contexte)
31. "non attends, change X" → re-propose version corrigée
32. "parfait / nickel / go" après une proposition d'action → c'est une validation, tu n'as rien à faire (l'UI gère). Tu confirmes juste "entendu, j'attends que tu valides via le bouton".

### Création / refonte de fichiers stratégiques
34. "génère le batch [S7/semaine 7/S8/...]" / "refais le batch S6" / "modifie BATCH-SEMAINE-N" → lis d'abord via repo_read : BATCH-SEMAINE-{N-1 ou N si existant}.md, patterns/batch-template.md (si existe), strategie/EVOLUTION-STRATEGIE.md (si existe), strategie/WARMING-FARMING.md, fabrice/plan-hebdo.md, romain/plan-hebdo.md, fabrice/VOIX.md, romain/VOIX.md. Puis génère le batch complet (sections 1-13 comme dans BATCH-SEMAINE-6) dans ta réponse chat en respectant strictement ANTI-IA et la voix de chaque persona. Termine par propose_action(create_file, {path: "BATCH-SEMAINE-N.md", content: <batch complet>, commit_message: "batch S{N} initial"}) pour les nouveaux batchs, OU propose_action(create_file, {path: "BATCH-SEMAINE-{existant}.md", content: <nouvelle version>, commit_message: "batch S{N} révision: {raison courte}"}) pour les refontes. N'inclut PAS le batch dans un [CONTENT] block — il doit aller dans un fichier via create_file.

35. "crée / modifie [fichier stratégique non-batch]" (ex: plan-hebdo S7, template, evolution-strategie, revue trimestrielle) → même flow : lis le contexte pertinent via repo_read, génère le contenu, appelle propose_action(create_file, {path, content, commit_message}). Respecte le whitelist de paths (doc du tool propose_action).

### Ambiguïté
33. Tout le reste ou cas flou → conversation normale. Tu peux poser une question de clarification si besoin avant de proposer une action.

---

## FORMAT DE TES RÉPONSES

- Conversation normale : texte fluide, pas de markdown excessif.
- Contenu à copier (reply, post, cold) : envelopper dans \`[CONTENT:type-xx]...[/CONTENT]\` et optionnel \`[CONTENT-FR]...[/CONTENT-FR]\` pour la traduction. Exemple : [CONTENT:reply-twitter-en]ton texte anglais[/CONTENT]. Le type aide l'UI à rendre un bouton Copier adapté (Phase 4).
- Action proposée : inclure \`[ACTION_PENDING:uuid]\` après avoir appelé propose_action. C'est OBLIGATOIRE pour que l'UI rende le bouton Valider.
- Tags de suggestions en fin de réponse : \`[TAG:texte]\` max 3 (Phase 4 les rendra cliquables). Exemples : [TAG:Résumé semaine] [TAG:Génère 3 cold ghost billing]

---

## TOOLS À TA DISPOSITION (UTILISE-LES AGRESSIVEMENT)

- repo_read(path) : lis un fichier précis
- repo_search(query, scope) : cherche fulltext
- repo_list_publications(persona, platform) : liste les posts récents
- repo_search_voice_examples(persona, angle) : calibre ta voix
- timeline_today(persona, mode) : planning live du jour
- counters_today(persona, mode) : état live des compteurs
- propose_action(type, params, preview) : propose une écriture repo
- recent_history(persona, days) : synthèse récente
- mempalace_search(query) : archive verbatim

Tu peux enchaîner plusieurs tools avant de répondre. Exemple : "j'ai posté My apps are fine" → timeline_today pour confirmer que l'item existe → propose_action(mark_published) → réponds au user avec [ACTION_PENDING:uuid].

---

## CONTEXTE FICHIERS

${contextFiles.join("\n")}${summaryBlock}${historyBlock}`;
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
  const { persona, mode, message, image } = req.body as {
    persona: Persona;
    mode?: Mode;
    message: string;
    image?: ImagePayload;
  };

  if (!persona || (!message && !image)) {
    res.status(400).json({ error: "Missing persona or message" });
    return;
  }

  if (image) {
    if (!VALID_IMAGE_TYPES.includes(image.media_type as ValidMediaType)) {
      res.status(400).json({ error: "Unsupported image format" });
      return;
    }
    if (!image.data || image.data.length > 7 * 1024 * 1024) {
      res.status(400).json({ error: "Image too large (max 5 MB)" });
      return;
    }
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
      history = await loadMessages(conversationId, 20);
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
    `${persona}/VOIX.md`,
    `${persona}/plan-hebdo.md`,
  ];
  const contexts = await Promise.all(contextPaths.map(loadFile));
  const systemPrompt = buildSystemPrompt(persona, resolvedMode, contexts, history, summary);

  if (conversationId) {
    try {
      await saveMessage(conversationId, "user", message || "[image seule]", {
        imageMediaType: image?.media_type,
        imageData: image?.data,
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

  const prompt = image
    ? makeMultimodalMessage(message || "Analyse cette image.", image)
    : message;

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
        maxTurns: 15,
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
