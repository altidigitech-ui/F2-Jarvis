// Phase 5 — LISTEN. Classification d'une réponse cold via Claude Haiku en
// interested | objection | not_now | unsubscribe. Convention REST directe
// (cf. jarvis-memory.ts). Défaut prudent : non-interested si incertain.

import type { ReplyCategory } from "./types.js";

const VALID: ReplyCategory[] = ["interested", "objection", "not_now", "unsubscribe"];

export async function classifyReply(subject: string, text: string): Promise<ReplyCategory> {
  const prompt = `Classify this reply to a cold sales email into exactly one category:
- interested: wants to know more, asks for the breakdown/call/pricing, positive intent.
- objection: pushes back, skeptical, "we already have a tool", "not interested", complains about being emailed.
- not_now: open but later ("circle back", "busy", "next quarter"), neutral acknowledgement.
- unsubscribe: explicitly asks to stop / remove / opt out.

Reply subject: ${subject || "(none)"}
Reply body:
${text.slice(0, 1500)}

Answer with ONLY one word: interested, objection, not_now, or unsubscribe.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 10,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return "not_now";
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const raw = (data.content || []).filter((b) => b.type === "text" && b.text).map((b) => b.text!).join(" ").toLowerCase();
    const found = VALID.find((c) => raw.includes(c));
    return found || "not_now"; // défaut prudent : pas de faux "interested"
  } catch {
    return "not_now";
  }
}
