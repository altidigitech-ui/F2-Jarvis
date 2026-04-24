import { query } from "@anthropic-ai/claude-agent-sdk";
import { resolveClaudeBinary } from "./claude-binary.js";
import { ghRead, ghList, ghCreateMultiple } from "./github.js";
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

interface PendingSummary {
  title: string;
  subject: string; // normalized subject for dedup
}

function extractSubject(title: string): string {
  let s = title.toLowerCase()
    .replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2700}-\u{27BF}❓❌✅⏳🔴🟠🟡🟢⚠️]/gu, "")
    .replace(/s\d+/g, "") // Remove S6, S7, etc.
    .replace(/j\d+/g, "") // Remove J4, J3, etc.
    .replace(/\d+[%€$hk]/g, "") // Remove numbers with units
    .replace(/\d+\/\d+/g, "") // Remove fractions like 3/70
    .replace(/\d+/g, "") // Remove remaining numbers
    .replace(/[—–\-:=()\/\[\].,;!?'"«»]/g, " ") // Punctuation to spaces
    .replace(/\b(le|la|les|du|de|des|un|une|en|à|au|aux|et|ou|non|pas|pour|sur|par|ce|cette|ces|qui|que|est|sont|a|ont)\b/g, " ")
    .replace(/\b(the|a|an|in|on|at|to|for|of|is|are|not|no|and|or|but|with)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = s.split(" ").filter(w => w.length > 2).sort();
  return words.join(" ");
}

function subjectsOverlap(a: string, b: string): boolean {
  const wordsA = new Set(a.split(" "));
  const wordsB = new Set(b.split(" "));
  if (wordsA.size === 0 || wordsB.size === 0) return false;

  let shared = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) shared++;
  }

  const minSize = Math.min(wordsA.size, wordsB.size);
  return shared / minSize >= 0.35;
}

async function getCurrentPendingSummaries(): Promise<PendingSummary[]> {
  try {
    const entries = await ghList("brain/ouroboros/proposals/pending");
    const mdFiles = entries
      .filter((f: { type: string; name: string }) => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("."))
      .sort((a: { name: string }, b: { name: string }) => b.name.localeCompare(a.name))
      .slice(0, 50);

    console.log(`[ouroboros-cycle] found ${mdFiles.length} pending proposal files`);

    const summaries: PendingSummary[] = [];
    for (const file of mdFiles) {
      try {
        const data = await ghRead(`brain/ouroboros/proposals/pending/${file.name}`);
        if (!data) continue;
        const titleMatch =
          data.content.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) ||
          data.content.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) ||
          data.content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
          const title = titleMatch[1].trim();
          summaries.push({ title, subject: extractSubject(title) });
        }
      } catch { /* skip */ }
    }

    console.log(`[ouroboros-cycle] extracted ${summaries.length} pending subjects for dedup`);
    return summaries;
  } catch (err) {
    console.error(`[ouroboros-cycle] getCurrentPendingSummaries FAILED:`, err);
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
  const pendingSummaries = await getCurrentPendingSummaries();
  const pendingTitles = pendingSummaries.map(s => s.title);
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

## MAINTENANCE DU REPO

Tu es aussi le **gardien du repo**. Tu dois vérifier la cohérence entre les fichiers et proposer des corrections concrètes. Types de maintenance :

### Synchronisation des données
- Si plan-hebdo.md dit ⏳ sur un post mais que progress-semaine.md ou engagement-log.md montre qu'il est fait → proposer la correction du plan-hebdo
- Si un cold est dans cold-outreach-log.md mais pas compté dans progress-semaine.md → proposer l'ajout
- Si des analytics (impressions, engagement rate) sont vides dans progress-semaine.md alors que les posts sont publiés depuis plusieurs jours → le signaler

### Cohérence structurelle
- Si un fichier existe en double (ex: un log à deux endroits) → proposer de supprimer le doublon
- Si un fichier est vide alors qu'il devrait être rempli (ex: cross-execution-log vide avec des cross faits) → proposer le remplissage
- Si un fichier référence des données obsolètes (ex: mentions de Leak Detector au lieu de StoreMD) → proposer la correction

### Format des corrections
Pour les proposals de maintenance, utilise ce format ENRICHI avec un bloc ACTION qui décrit EXACTEMENT ce qu'il faut modifier :

---PROPOSAL---
**Priorité:** haute
**Type:** maintenance
**Titre:** Synchroniser plan-hebdo F : post Twitter jeudi ⏳ → ✅
**Contexte:** Le plan-hebdo.md montre ⏳ pour le post Twitter jeudi "5 things Shopify dashboard HIDES" mais le progress-semaine.md ligne 19 confirme "✅ Publié 13h00" le 23/04.
**Recommandation:** Mettre à jour fabrice/plan-hebdo.md : remplacer ⏳ par ✅ Publié 13h00 sur la ligne du jeudi 23/04.
**Action:**
- Fichier: fabrice/plan-hebdo.md
- Modifier: ligne "|Jeu 23/04|...|⏳|" → "|Jeu 23/04|...|✅ Publié 13h00|"
**Risques si ignoré:** Le dashboard et les compteurs montrent un faux état, l'équipe croit que le post n'est pas fait.
---END-PROPOSAL---

Le bloc **Action:** est CRITIQUE — il doit contenir le chemin du fichier et le changement précis. Sans ça, JARVIS ne pourra pas exécuter la correction.

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
- Maximum 3 proposals par cycle. Si tu as plus de 3 observations, garde les 3 plus critiques.
- Ne re-propose JAMAIS un sujet déjà couvert dans les proposals PENDING listées plus haut. Pas de variante, pas de reformulation. Si le sujet existe déjà, passe.
${pendingBlock}${conversationContext}${proposalDecisions}`;

  const userPrompt = `Cycle Ouroboros du ${date}.

## ÉTAPE 1 — EXPLORATION
Explore le repo avec tes outils. Commence par :
1. counters_today pour Fabrice et Romain
2. timeline_today pour les deux personas
3. repo_read sur fabrice/plan-hebdo.md et romain/plan-hebdo.md
4. repo_read sur fabrice/progress-semaine.md et romain/progress-semaine.md
5. recent_history pour les deux personas (7 jours)

## ÉTAPE 2 — VÉRIFICATION DE COHÉRENCE
Compare les données entre les fichiers :
- Les statuts dans plan-hebdo matchent-ils les événements dans progress-semaine ?
- Les cold loggés matchent-ils les compteurs ?
- Les cross-engagements faits matchent-ils le tracker ?
- Y a-t-il des fichiers vides qui devraient être remplis ?
- Y a-t-il des données contradictoires entre deux fichiers ?

## ÉTAPE 3 — PROPOSALS
Produis tes proposals. PRIORITÉ aux corrections de maintenance (type: maintenance) AVANT les alertes opérationnelles. Maximum 5 proposals au total.
Si rien à corriger, c'est que le repo est propre — dis-le dans le journal.`;

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
  const pendingSubjects = pendingSummaries.map(s => s.subject);

  for (const [, body] of proposalBlocks) {
    const titleMatch = body.match(/\*\*Titre:\*\*\s*(.+)/);
    const priorityMatch = body.match(/\*\*Priorité:\*\*\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : "Sans titre";
    const priority = priorityMatch ? priorityMatch[1].trim() : "faible";

    const newSubject = extractSubject(title);
    const isDuplicate = pendingSubjects.some(existing => subjectsOverlap(newSubject, existing));

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
