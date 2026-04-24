import { ghCreate, ghRead, ghUpdate, ghCreateMultiple } from "./github.js";
import { invalidateMempalaceCache } from "./mempalace.js";

type Persona = "romain" | "fabrice" | "f2";

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

export async function archiveDailyConversation(
  persona: Persona,
): Promise<void> {
  try {
    const { getSupabase } = await import("./supabase.js");
    const sb = getSupabase();

    const now = new Date();
    const cestOffset = 2 * 60 * 60 * 1000;
    const cestNow = new Date(now.getTime() + cestOffset);
    const todayStr = cestNow.toISOString().slice(0, 10);
    const startOfDay = new Date(`${todayStr}T00:00:00+02:00`);

    let query = sb.from("jarvis_conversations").select("id, mode");
    if (persona === "f2") {
      // F2 conversations are stored as persona=romain, mode=f2
      query = query.eq("persona", "romain").eq("mode", "f2");
    } else {
      // Normal conversations — exclude f2 mode to avoid mixing
      query = query.eq("persona", persona).eq("mode", "normal");
    }
    const { data: convs, error: convErr } = await query;

    if (convErr || !convs || convs.length === 0) return;

    const allMessages: Array<{ role: string; content: string; created_at: string; mode: string }> = [];

    for (const conv of convs) {
      const { data: msgs, error: msgErr } = await sb
        .from("jarvis_messages")
        .select("role, content, created_at")
        .eq("conversation_id", (conv as { id: string }).id)
        .gte("created_at", startOfDay.toISOString())
        .order("created_at", { ascending: true });

      if (!msgErr && msgs) {
        for (const m of msgs as Array<{ role: string; content: string; created_at: string }>) {
          allMessages.push({ ...m, mode: (conv as { id: string; mode: string }).mode });
        }
      }
    }

    if (allMessages.length < 2) return;

    allMessages.sort((a, b) => a.created_at.localeCompare(b.created_at));

    const digest = allMessages.map(m => {
      const time = new Date(m.created_at).toLocaleTimeString("fr-FR", {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
      });
      const snippet = m.content.slice(0, 500) + (m.content.length > 500 ? "…" : "");
      return `[${m.role.toUpperCase()} ${time}] ${snippet}`;
    }).join("\n\n");

    const path = `brain/mempalace/wings/${persona}/drawers/daily-${todayStr}.md`;

    try {
      const existing = await ghRead(path);
      if (existing) {
        await ghUpdate(path, () => buildDailyArchive(persona, todayStr, digest, allMessages.length), `[MEMPALACE] update daily archive ${persona} ${todayStr}`);
        return;
      }
    } catch { /* not found, create */ }

    const content = buildDailyArchive(persona, todayStr, digest, allMessages.length);
    await ghCreate(path, content, `[MEMPALACE] daily archive ${persona} ${todayStr}`);
    invalidateMempalaceCache();
    console.log(`[mempalace-ingest] daily archive created: ${path}`);
  } catch (err) {
    console.warn(`[mempalace-ingest] daily archive failed for ${persona}:`, err);
  }
}

export async function ingestToMemPalaceBatch(
  persona: Persona,
  messages: Array<{ userMessage: string; assistantResponse: string; timestamp: string }>
): Promise<void> {
  if (messages.length === 0) return;
  const meaningful = messages.filter(
    (m) => m.userMessage.length >= 50 || m.assistantResponse.length >= 100
  );
  if (meaningful.length === 0) return;

  const date = getCESTDate();
  const time = getCESTTime();
  const id = hash4(meaningful[0].userMessage + date + time);
  const filename = `${date}-${time}-${id}.md`;
  const path = `brain/mempalace/wings/${persona}/drawers/${filename}`;

  const tags = [persona, "conversation", date];
  const conversationBlock = meaningful
    .map((m) => {
      const msgTime = new Date(m.timestamp).toLocaleTimeString("fr-FR", {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
      });
      return `[USER ${msgTime}]\n${m.userMessage.slice(0, 1000)}\n\n[ASSISTANT ${msgTime}]\n${m.assistantResponse.slice(0, 2000)}`;
    })
    .join("\n\n---\n\n");

  const content = `---
tags: [${tags.join(", ")}]
date: "${date}"
source: "jarvis-web"
messages: ${meaningful.length}
---
# Session ${persona} — ${date} ${time} (${meaningful.length} échanges)

${conversationBlock}
`;

  try {
    await ghCreate(
      path,
      content,
      `[MEMPALACE] ${persona} session ${date} ${time} (${meaningful.length} msgs)`
    );
    invalidateMempalaceCache();
    console.log(`[mempalace-ingest] batch ingested ${meaningful.length} messages for ${persona}`);
  } catch (err) {
    console.error(`[mempalace-ingest] batch ingest failed for ${persona}:`, err);
  }
}

async function buildDailyArchiveContent(
  persona: Persona
): Promise<{ path: string; content: string } | null> {
  try {
    const { getSupabase } = await import("./supabase.js");
    const sb = getSupabase();

    const now = new Date();
    const cestOffset = 2 * 60 * 60 * 1000;
    const cestNow = new Date(now.getTime() + cestOffset);
    const todayStr = cestNow.toISOString().slice(0, 10);
    const startOfDay = new Date(`${todayStr}T00:00:00+02:00`);

    let query = sb.from("jarvis_conversations").select("id, mode");
    if (persona === "f2") {
      query = query.eq("persona", "romain").eq("mode", "f2");
    } else {
      query = query.eq("persona", persona).eq("mode", "normal");
    }
    const { data: convs, error: convErr } = await query;

    if (convErr || !convs || convs.length === 0) return null;

    const allMessages: Array<{ role: string; content: string; created_at: string; mode: string }> =
      [];

    for (const conv of convs) {
      const { data: msgs, error: msgErr } = await sb
        .from("jarvis_messages")
        .select("role, content, created_at")
        .eq("conversation_id", (conv as { id: string }).id)
        .gte("created_at", startOfDay.toISOString())
        .order("created_at", { ascending: true });

      if (!msgErr && msgs) {
        for (const m of msgs as Array<{ role: string; content: string; created_at: string }>) {
          allMessages.push({ ...m, mode: (conv as { id: string; mode: string }).mode });
        }
      }
    }

    if (allMessages.length < 2) return null;

    allMessages.sort((a, b) => a.created_at.localeCompare(b.created_at));

    const digest = allMessages
      .map((m) => {
        const time = new Date(m.created_at).toLocaleTimeString("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
        });
        const snippet = m.content.slice(0, 500) + (m.content.length > 500 ? "…" : "");
        return `[${m.role.toUpperCase()} ${time}] ${snippet}`;
      })
      .join("\n\n");

    return {
      path: `brain/mempalace/wings/${persona}/drawers/daily-${todayStr}.md`,
      content: buildDailyArchive(persona, todayStr, digest, allMessages.length),
    };
  } catch (err) {
    console.warn(`[mempalace-ingest] buildDailyArchiveContent failed for ${persona}:`, err);
    return null;
  }
}

export async function archiveAllDailyConversations(): Promise<void> {
  const personas: Persona[] = ["fabrice", "romain", "f2"];
  const files: Array<{ path: string; content: string }> = [];

  for (const persona of personas) {
    const result = await buildDailyArchiveContent(persona);
    if (result) files.push(result);
  }

  if (files.length === 0) return;

  const personaNames = files.map((f) => f.path.split("/")[3]).join(", ");
  await ghCreateMultiple(files, `[MEMPALACE] daily archive: ${personaNames}`);
  invalidateMempalaceCache();
  console.log(`[mempalace-ingest] daily archive: ${files.length} personas in 1 commit`);
}

function buildDailyArchive(persona: string, date: string, digest: string, msgCount: number): string {
  return `---
tags: [${persona}, daily-archive, ${date}]
date: "${date}"
source: "jarvis-daily-archive"
type: "daily-digest"
message_count: ${msgCount}
---
# Journal de conversation ${persona} — ${date}

${digest}
`;
}
