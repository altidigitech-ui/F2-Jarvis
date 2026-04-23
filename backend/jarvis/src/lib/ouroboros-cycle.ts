import { query } from "@anthropic-ai/claude-agent-sdk";
import { resolveClaudeBinary } from "./claude-binary.js";
import { ghRead, ghCreate, ghWrite } from "./github.js";
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

async function getState(): Promise<Record<string, unknown>> {
  try {
    const f = await ghRead("brain/ouroboros/state.json");
    if (!f) return {};
    return JSON.parse(f.content);
  } catch {
    return {};
  }
}

async function updateState(state: Record<string, unknown>): Promise<void> {
  try {
    const existing = await ghRead("brain/ouroboros/state.json");
    const content = JSON.stringify({ ...state, lastCycle: { date: getCESTDate(), timestamp: new Date().toISOString() }, totalCycles: ((state.totalCycles as number) || 0) + 1 }, null, 2);
    if (existing) {
      await ghWrite("brain/ouroboros/state.json", content, existing.sha, "[OUROBOROS] update state");
    } else {
      await ghCreate("brain/ouroboros/state.json", content, "[OUROBOROS] init state");
    }
  } catch (err) {
    console.warn("[ouroboros-cycle] state update failed:", err);
  }
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
  const date = getCESTDate();

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
`;

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

  // Parse and write proposals
  const proposalBlocks = [...fullText.matchAll(/---PROPOSAL---([\s\S]*?)---END-PROPOSAL---/g)];
  for (const [, body] of proposalBlocks) {
    const titleMatch = body.match(/\*\*Titre:\*\*\s*(.+)/);
    const priorityMatch = body.match(/\*\*Priorité:\*\*\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : "Sans titre";
    const priority = priorityMatch ? priorityMatch[1].trim() : "faible";
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40);
    const timestamp = Date.now();
    const filename = `${date}-${safeTitle}-${timestamp}.md`;

    const proposalContent = `---
date: "${date}"
auteur: Ouroboros
priorité: ${priority}
statut: pending
---

${body.trim()}
`;

    try {
      await ghCreate(
        `brain/ouroboros/proposals/pending/${filename}`,
        proposalContent,
        `[OUROBOROS] proposal: ${title.slice(0, 50)}`
      );
      console.log(`[ouroboros-cycle] wrote proposal: ${filename}`);
    } catch (err) {
      console.warn(`[ouroboros-cycle] failed to write proposal ${filename}:`, err);
    }
  }

  // Parse and write diary
  const diaryMatch = fullText.match(/---DIARY---([\s\S]*?)---END-DIARY---/);
  const diaryContent = diaryMatch ? diaryMatch[1].trim() : fullText.slice(0, 500).trim();
  if (diaryContent) {
    const diaryEntry = `---
date: "${date}"
auteur: Ouroboros
---

# Journal — ${date}

${diaryContent}
`;
    try {
      await ghCreate(
        `brain/ouroboros/diary/${date}.md`,
        diaryEntry,
        `[OUROBOROS] diary ${date}`
      );
      console.log(`[ouroboros-cycle] diary written for ${date}`);
    } catch (err) {
      console.warn("[ouroboros-cycle] diary write failed:", err);
    }
  }

  await updateState(state);
  console.log(`[ouroboros-cycle] cycle complete — ${proposalBlocks.length} proposals`);
}
