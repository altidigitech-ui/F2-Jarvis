import { Request, Response } from "express";
import { query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { readFile, access, constants } from "fs/promises";
import path from "path";

const REPO_ROOT = process.env.REPO_ROOT || path.resolve(process.cwd(), "../..");

const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"] as const;
type ValidMediaType = (typeof VALID_IMAGE_TYPES)[number];

type ImagePayload = {
  data: string;
  media_type: ValidMediaType;
};

async function fileExecutable(p: string): Promise<boolean> {
  try { await access(p, constants.X_OK); return true; } catch { return false; }
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
    const content = await readFile(path.join(REPO_ROOT, relPath), "utf-8");
    return `=== ${relPath} ===\n${content}\n`;
  } catch {
    return `=== ${relPath} (absent) ===\n`;
  }
}

async function* makeMultimodalMessage(message: string, image: ImagePayload): AsyncIterable<SDKUserMessage> {
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

export async function chatRoute(req: Request, res: Response): Promise<void> {
  const { persona, mode, message, image } = req.body as {
    persona: "romain" | "fabrice";
    mode?: "normal" | "f2";
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
    // base64 is ~4/3 of binary size — 5 MB binary ≈ 6.7 MB base64
    if (!image.data || image.data.length > 7 * 1024 * 1024) {
      res.status(400).json({ error: "Image trop grande (max 5 MB)" });
      return;
    }
  }

  const isF2 = mode === "f2";
  const personaLabel = isF2
    ? "l'équipe FoundryTwo (@foundrytwo)"
    : persona === "romain" ? "Romain Delgado" : "Fabrice Gangi";

  const contextFiles = isF2
    ? [
        "CLAUDE.md", "BIBLE.md", "ANTI-IA.md",
        "f2/context.md", "f2/plan-hebdo.md", "f2/progress-semaine.md",
        `${persona}/VOIX.md`,
      ]
    : [
        "CLAUDE.md", "BIBLE.md", "ANTI-IA.md",
        `${persona}/context.md`, `${persona}/VOIX.md`,
        `${persona}/plan-hebdo.md`, `${persona}/progress-semaine.md`,
      ];

  const contexts = await Promise.all(contextFiles.map(loadFile));
  const modeLabel = isF2 ? " en mode compte studio @foundrytwo" : "";
  const systemPrompt = `Tu es JARVIS, l'assistant interne de ${personaLabel}${modeLabel} au sein du studio FoundryTwo.

Tu connais l'OS F2-Jarvis et tout le contexte ci-dessous. Tu réponds en français, directement, sans fluff. Pas de bullet points inutiles, pas de listes si une phrase suffit. Respect strict de ANTI-IA.md pour tout contenu destiné à la publication.

Date du jour : ${new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long", year: "numeric" })}.

---

${contexts.join("\n")}`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.flushHeaders();

  const claudePath = await resolveClaudeBinary();

  const prompt = image
    ? makeMultimodalMessage(message || "Analyse cette image.", image)
    : message;

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
          }
        }
      }
    }
    res.end();
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (errMsg.includes("maximum number of turns") || errMsg.includes("max_turns")) {
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
