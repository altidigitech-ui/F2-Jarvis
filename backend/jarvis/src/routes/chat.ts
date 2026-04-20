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
  console.warn("[chat] No executable claude binary found, SDK will use default detection");
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
        {
          type: "text",
          text: message || "Analyse cette image.",
        },
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
      ? `\n---\n\n## Historique récent de notre conversation (${history.length} messages)\n\n${history
          .map(
            (m) =>
              `[${m.role.toUpperCase()} — ${new Date(m.created_at).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" })}]\n${m.content.slice(0, 2000)}${m.content.length > 2000 ? "…" : ""}`
          )
          .join("\n\n")}\n`
      : "";

  const summaryBlock = summary
    ? `\n---\n\n## Résumé des échanges antérieurs compressés\n\n${summary}\n`
    : "";

  return `Tu es JARVIS, l'assistant interne de ${personaLabel}${modeLabel} au sein du studio FoundryTwo.

Tu fonctionnes dans le cockpit F2-Jarvis, tableau de bord réseaux intégral. Tu réponds en français sauf pour la rédaction de contenu destiné à la publication (toujours en anglais pour semaine 6). Pas de fluff. Respect strict de ANTI-IA.md pour tout contenu destiné à la publication.

Tu as une mémoire persistante : tu te souviens de ce qu'on s'est dit dans les sessions précédentes. Reprends naturellement le fil des conversations passées si pertinent.

Date du jour : ${dateFR}.

---

${contextFiles.join("\n")}${summaryBlock}${historyBlock}`;
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
      res.status(400).json({ error: "Format image non supporté (PNG, JPG, GIF, WEBP)" });
      return;
    }
    if (!image.data || image.data.length > 7 * 1024 * 1024) {
      res.status(400).json({ error: "Image trop grande (max 5 MB)" });
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
      console.error("[chat] memory load failed, falling back to stateless:", err);
      conversationId = null;
    }
  } else {
    console.warn("[chat] no X-USER-ID header, running stateless");
  }

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

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.flushHeaders();

  const claudePath = await resolveClaudeBinary();

  const prompt = image
    ? makeMultimodalMessage(message || "Analyse cette image.", image)
    : message;

  let fullAssistantText = "";

  try {
    for await (const msg of query({
      prompt,
      options: {
        systemPrompt,
        maxTurns: 1,
        allowedTools: [],
        permissionMode: "dontAsk",
        ...(claudePath ? { pathToClaudeCodeExecutable: claudePath } : {}),
      },
    })) {
      if (msg.type === "assistant" && msg.message?.content) {
        for (const block of msg.message.content) {
          if (block.type === "text" && block.text) {
            res.write(block.text);
            fullAssistantText += block.text;
          }
        }
      }
    }

    if (conversationId && fullAssistantText) {
      try {
        await saveMessage(conversationId, "assistant", fullAssistantText);
      } catch (err) {
        console.error("[chat] saveMessage assistant failed:", err);
      }
    }

    res.end();
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes("maximum number of turns") || errMsg.includes("max_turns")) {
      if (conversationId && fullAssistantText) {
        try {
          await saveMessage(conversationId, "assistant", fullAssistantText);
        } catch {
          /* ignore */
        }
      }
      res.end();
      return;
    }
    console.error("[/chat]", err);
    if (!res.headersSent) {
      res.status(500).end(`[Erreur JARVIS: ${errMsg}]`);
    } else {
      res.write(`[Erreur JARVIS: ${errMsg}]`);
      res.end();
    }
  }
}
