import { query } from "@anthropic-ai/claude-agent-sdk";
import { resolveClaudeBinary } from "./claude-binary.js";
import { ghRead, ghCreateMultiple } from "./github.js";
import { createJarvisMcpServer } from "../lib/jarvis-tools.js";

const OUROBOROS_SANDBOX_ALLOWED_TOOLS = [
  "mcp__jarvis__repo_read",
  "mcp__jarvis__repo_search",
  "mcp__jarvis__repo_list_publications",
  "mcp__jarvis__timeline_today",
  "mcp__jarvis__counters_today",
  "mcp__jarvis__recent_history",
  "mcp__jarvis__mempalace_search",
  "web_search",
];

function getCESTDate(): string {
  return new Date().toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).split("/").reverse().join("-");
}

async function checkKillSwitch(): Promise<boolean> {
  try {
    const ouroboros = await ghRead("ops/kill-switches/ouroboros.flag");
    const global_ = await ghRead("ops/kill-switches/global.flag");
    return ouroboros !== null || global_ !== null;
  } catch {
    return false;
  }
}

async function readIdentity(): Promise<string> {
  try {
    const f = await ghRead("brain/ouroboros/identity.md");
    return f ? f.content.slice(0, 3000) : "";
  } catch {
    return "";
  }
}

async function getRecentConversationSummary(): Promise<string> {
  try {
    const { getSupabase } = await import("./supabase.js");
    const sb = getSupabase();

    const { data, error } = await sb
      .from("jarvis_messages")
      .select("role, content, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) return "";

    const messages = (data as Array<{ role: string; content: string; created_at: string }>)
      .reverse()
      .map(m => {
        const time = new Date(m.created_at).toLocaleTimeString("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
        });
        const snippet = m.content.slice(0, 300) + (m.content.length > 300 ? "…" : "");
        return `[${m.role.toUpperCase()} ${time}] ${snippet}`;
      })
      .join("\n");

    return `\n\n## Dernières interactions JARVIS (chat)\n\n${messages}\n`;
  } catch {
    return "";
  }
}

async function getRecentProposalDecisions(): Promise<string> {
  try {
    const { ghList, ghRead: ghReadFile } = await import("./github.js");

    const results: string[] = [];

    for (const status of ["accepted", "rejected"] as const) {
      const dir = `brain/ouroboros/proposals/${status}`;
      try {
        const entries = await ghList(dir);
        const recentMd = entries
          .filter((f: { type: string; name: string }) => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("."))
          .sort((a: { name: string }, b: { name: string }) => b.name.localeCompare(a.name))
          .slice(0, 3);

        for (const file of recentMd) {
          try {
            const data = await ghReadFile(`${dir}/${file.name}`);
            if (!data) continue;
            const titleMatch = data.content.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) || data.content.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i);
            const title = titleMatch ? titleMatch[1].trim() : file.name;
            const commentMatch = data.content.match(/\*\*Action \w+ par \w+\*\*\s*:\s*(.+)/);
            const comment = commentMatch ? ` — Commentaire: "${commentMatch[1].trim()}"` : "";
            const executedMatch = data.content.match(/\*\*Exécuté le ([^*]+)\*\*/);
            const execNote = executedMatch ? ` ✅ EXÉCUTÉ (${executedMatch[1].trim()})` : "";
            results.push(`[${status.toUpperCase()}] ${title}${comment}${execNote}`);
          } catch { /* skip */ }
        }
      } catch { /* dir may not exist */ }
    }

    if (results.length === 0) return "";
    return `\n\n## Décisions récentes sur tes proposals\n\nNe re-propose PAS ces sujets sauf évolution significative :\n${results.join("\n")}\n`;
  } catch {
    return "";
  }
}

async function getCurrentPendingTitles(): Promise<string[]> {
  try {
    const { ghList, ghRead: ghReadFile } = await import("./github.js");
    const entries = await ghList("brain/ouroboros/proposals/pending");
    const mdFiles = entries
      .filter((f: { type: string; name: string }) => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("."))
      .sort((a: { name: string }, b: { name: string }) => b.name.localeCompare(a.name))
      .slice(0, 30);

    const titles: string[] = [];
    for (const file of mdFiles) {
      try {
        const data = await ghReadFile(`brain/ouroboros/proposals/pending/${file.name}`);
        if (!data) continue;
        const titleMatch =
          data.content.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) ||
          data.content.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) ||
          data.content.match(/^#\s+(.+)$/m);
        if (titleMatch) titles.push(titleMatch[1].trim());
      } catch { /* skip */ }
    }
    return titles;
  } catch {
    return [];
  }
}

async function getState(): Promise<Record<string, unknown>> {
  try {
    const f = await ghRead("brain/ouroboros/state.json");
    if (!f) return {};
    return JSON.parse(f.content);
  } catch {
    return {};
  }
}

function buildStateContent(state: Record<string, unknown>, date: string): string {
  return JSON.stringify(
    {
      ...state,
      lastCycle: { date, timestamp: new Date().toISOString() },
      totalCycles: ((state.totalCycles as number) || 0) + 1,
    },
    null,
    2
  );
}

export async function runOuroborosCycle(): Promise<void> {
  console.log("[ouroboros-cycle] starting cycle");

  const killed = await checkKillSwitch();
  if (killed) {
    console.log("[ouroboros-cycle] kill-switch active, skipping");
    return;
  }

  const state = await getState();
  const identity = await readIdentity();
  const conversationContext = await getRecentConversationSummary();
  const proposalDecisions = await getRecentProposalDecisions();
  const pendingTitles = await getCurrentPendingTitles();
  const date = getCESTDate();

  const pendingBlock = pendingTitles.length > 0
    ? `\n\n## Proposals DÉJÀ PENDING (${pendingTitles.length})\n\nCes proposals existent déjà et attendent une décision humaine. NE LES RE-CRÉE PAS. Ne propose PAS de variante sur le même sujet sauf si tu as des données NOUVELLES qui changent fondamentalement l'analyse.\n\n${pendingTitles.map(t => `- ${t}`).join("\n")}\n`
    : "";

  const claudePath = await resolveClaudeBinary();
  const backendBase = process.env.RAILWAY_BACKEND_URL || `http://127.0.0.1:${process.env.PORT || 3001}`;
  const authSecret = process.env.BACKEND_SHARED_SECRET || "";

  const mcpServer = createJarvisMcpServer({
    conversationId: null,
    persona: "fabrice",
    mode: "normal",
    backendBase,
    authSecret,
  });

  const systemPrompt = `${identity}

Tu es Ouroboros, la conscience de fond de FoundryTwo. Tu observes le repo F2-Jarvis.

Date du jour : ${date}.

## TA MISSION

Analyser les signaux du repo et produire :
1. 0 à 5 propositions structurées (si pertinentes)
2. 1 entrée de journal

**Types de propositions attendues :**

a) **Incohérences et risques** (observés dans les fichiers, patterns, alertes)
b) **Actions proactives concrètes**, notamment :
   - Cross-engagement non fait aujourd'hui → "Proposer rappel cross-engagement"
   - Batch S{N+1} non commencé et on est jeudi/vendredi → "Proposer de commencer le batch"
   - Cold outreach en attente de follow-up (réponses non traitées) → "Proposer suivi cold"
   - Compteurs Twitter/LinkedIn à <30% de l'objectif en fin de journée → "Proposer sprint engagement"
   - plan-hebdo non mis à jour depuis lundi → "Proposer mise à jour planning"
   - progress-semaine vide en fin de semaine → "Proposer bilan hebdo"

La priorité est d'être **utile et actionnable**, pas exhaustif. 0 proposal vaut mieux que 5 proposals génériques.

## FORMAT OBLIGATOIRE

Pour chaque proposition, utilise ce bloc exact :

---PROPOSAL---
**Priorité:** faible | moyenne | haute
**Titre:** (une ligne)
**Contexte:** (ce que tu as observé — données précises)
**Recommandation:** (action concrète à prendre)
**Risques si ignoré:** (conséquences)
---END-PROPOSAL---

Pour le journal :
---DIARY---
(tes observations du jour, 200 mots max)
---END-DIARY---

## CONTRAINTES

- Tu NE commits PAS, NE pushes PAS, NE modifies PAS le repo directement
- Tu utilises les outils de lecture pour explorer
- Tu n'as pas accès à propose_action — tu génères les proposals dans ta réponse
- Si rien d'important à signaler, écris une courte entrée de journal et 0 proposals
${pendingBlock}${conversationContext}${proposalDecisions}`;

  const userPrompt = `Cycle Ouroboros du ${date}.

Explore le repo avec tes outils (timeline, compteurs, publications récentes, historique) et analyse l'état du studio FoundryTwo. Produis tes observations structurées.

Commence par explorer : recent_history pour Fabrice et Romain (7 jours), counters_today pour les deux personas, puis tout autre signal que tu juges pertinent.`;

  let fullText = "";

  try {
    for await (const msg of query({
      prompt: userPrompt,
      options: {
        systemPrompt,
        maxTurns: 15,
        mcpServers: { jarvis: mcpServer },
        allowedTools: OUROBOROS_SANDBOX_ALLOWED_TOOLS,
        permissionMode: "dontAsk",
        ...(claudePath ? { pathToClaudeCodeExecutable: claudePath } : {}),
      },
    })) {
      if (msg.type === "assistant" && msg.message?.content) {
        for (const block of msg.message.content) {
          if (block.type === "text" && block.text) fullText += block.text;
        }
      }
    }
  } catch (err) {
    console.error("[ouroboros-cycle] query failed:", err);
    return;
  }

  const filesToCreate: Array<{ path: string; content: string }> = [];

  // Collecter les proposals
  const proposalBlocks = [...fullText.matchAll(/---PROPOSAL---([\s\S]*?)---END-PROPOSAL---/g)];
  const timestamp = Date.now();
  const pendingLower = pendingTitles.map(t => t.toLowerCase());

  for (const [, body] of proposalBlocks) {
    const titleMatch = body.match(/\*\*Titre:\*\*\s*(.+)/);
    const priorityMatch = body.match(/\*\*Priorité:\*\*\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : "Sans titre";
    const priority = priorityMatch ? priorityMatch[1].trim() : "faible";

    // Déduplication : skip si un titre pending contient >60% des mots de ce titre
    const newWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const isDuplicate = pendingLower.some(existing => {
      const matchCount = newWords.filter(w => existing.includes(w)).length;
      return newWords.length > 0 && matchCount / newWords.length > 0.6;
    });

    if (isDuplicate) {
      console.log(`[ouroboros-cycle] SKIPPED duplicate proposal: "${title}"`);
      continue;
    }

    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40);
    const filename = `${date}-${safeTitle}-${timestamp}.md`;

    filesToCreate.push({
      path: `brain/ouroboros/proposals/pending/${filename}`,
      content: `---
date: "${date}"
timestamp: "${new Date().toISOString()}"
auteur: Ouroboros
priorité: ${priority}
statut: pending
---

${body.trim()}
`,
    });
    console.log(`[ouroboros-cycle] queued proposal: ${filename}`);
  }

  // Collecter le diary
  const diaryMatch = fullText.match(/---DIARY---([\s\S]*?)---END-DIARY---/);
  const diaryContent = diaryMatch ? diaryMatch[1].trim() : fullText.slice(0, 500).trim();
  if (diaryContent) {
    filesToCreate.push({
      path: `brain/ouroboros/diary/${date}.md`,
      content: `---
date: "${date}"
auteur: Ouroboros
---

# Journal — ${date}

${diaryContent}
`,
    });
  }

  // Collecter le state
  filesToCreate.push({
    path: "brain/ouroboros/state.json",
    content: buildStateContent(state, date),
  });

  // UN SEUL commit pour tout
  try {
    await ghCreateMultiple(
      filesToCreate,
      `[OUROBOROS] cycle ${date}: ${filesToCreate.length} fichiers (${proposalBlocks.length} proposals + diary)`
    );
    console.log(`[ouroboros-cycle] cycle complete — ${proposalBlocks.length} proposals, 1 commit`);
  } catch (err) {
    console.error("[ouroboros-cycle] batch commit failed:", err);
  }
}
