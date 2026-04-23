import { ghCreate } from "./github.js";
import { invalidateMempalaceCache } from "./mempalace.js";

type Persona = "romain" | "fabrice";

function getCESTDate(): string {
  return new Date().toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).split("/").reverse().join("-");
}

function getCESTTime(): string {
  return new Date().toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(":", "h");
}

function hash4(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).slice(0, 4);
}

export async function ingestToMemPalace(
  persona: Persona,
  userMessage: string,
  assistantResponse: string
): Promise<void> {
  if (userMessage.length < 50) return;
  if (assistantResponse.startsWith("[Erreur")) return;

  const date = getCESTDate();
  const time = getCESTTime();
  const id = hash4(userMessage + date + time);
  const filename = `${date}-${time}-${id}.md`;
  const path = `brain/mempalace/wings/${persona}/drawers/${filename}`;

  const tags = [persona, "conversation", date];
  const content = `---
tags: [${tags.join(", ")}]
date: "${date}"
source: "jarvis-web"
---
# Conversation ${persona} — ${date} ${time}

**User:** ${userMessage.slice(0, 2000)}

**JARVIS:** ${assistantResponse.slice(0, 5000)}
`;

  try {
    await ghCreate(path, content, "[MEMPALACE] ingest conversation");
    invalidateMempalaceCache();
    console.log(`[mempalace-ingest] created ${path}`);
  } catch (err) {
    console.warn(`[mempalace-ingest] failed for ${path}:`, err);
  }
}
