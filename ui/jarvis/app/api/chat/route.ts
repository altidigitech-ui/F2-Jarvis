import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const maxDuration = 120;

const REPO_ROOT = path.resolve(process.cwd(), "../..");

async function loadFile(relPath: string): Promise<string> {
  try {
    const content = await readFile(path.join(REPO_ROOT, relPath), "utf-8");
    return `=== ${relPath} ===\n${content}\n`;
  } catch {
    return `=== ${relPath} (absent) ===\n`;
  }
}

export async function POST(req: Request) {
  const { persona, message } = await req.json() as {
    persona: "romain" | "fabrice";
    message: string;
    history?: { role: string; content: string }[];
  };

  if (!persona || !message) {
    return new Response("Missing persona or message", { status: 400 });
  }

  const personaLabel = persona === "romain" ? "Romain Delgado" : "Fabrice Gangi";

  const contextFiles = [
    "CLAUDE.md",
    "BIBLE.md",
    "ANTI-IA.md",
    `${persona}/context.md`,
    `${persona}/VOIX.md`,
    `${persona}/plan-hebdo.md`,
    `${persona}/progress-semaine.md`,
  ];

  const contexts = await Promise.all(contextFiles.map(loadFile));

  const systemPrompt = `Tu es JARVIS, l'assistant interne de ${personaLabel} au sein du studio FoundryTwo.

Tu connais l'OS F2-Jarvis et tout le contexte ci-dessous. Tu réponds en français, directement, sans fluff. Pas de bullet points inutiles, pas de listes si une phrase suffit. Respect strict de ANTI-IA.md pour tout contenu destiné à la publication.

Date du jour : ${new Date().toLocaleDateString("fr-FR", { timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long", year: "numeric" })}.

---

${contexts.join("\n")}`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const msg of query({
          prompt: message,
          options: {
            systemPrompt,
            maxTurns: 1,
            allowedTools: [],
            permissionMode: "dontAsk",
          },
        })) {
          if (
            msg.type === "assistant" &&
            msg.message?.content
          ) {
            for (const block of msg.message.content) {
              if (block.type === "text" && block.text) {
                controller.enqueue(encoder.encode(block.text));
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        // maxTurns=1 causes a "Reached maximum number of turns" error — this is expected, not a real failure
        if (errMsg.includes("maximum number of turns") || errMsg.includes("max_turns")) {
          controller.close();
          return;
        }
        console.error("[/api/chat]", err);
        controller.enqueue(encoder.encode(`[Erreur JARVIS: ${errMsg}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
