import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { ghRead, ghList } from "./github.js";
import { getSupabase } from "./supabase.js";
import { searchDrawers } from "./mempalace.js";

type Persona = "fabrice" | "romain";
type Mode = "normal" | "f2";

/**
 * Creates the JARVIS MCP server with all tools bound to the current conversation.
 * Must be called once per /chat request because propose_action needs conversationId.
 */
export function createJarvisMcpServer(options: {
  conversationId: string | null;
  persona: Persona;
  mode: Mode;
  backendBase: string;
  authSecret: string;
}) {
  const { conversationId, backendBase, authSecret } = options;

  // ---------------------------------------------------------------------------
  // repo_read
  // ---------------------------------------------------------------------------
  const repoRead = tool(
    "repo_read",
    "Read a file from the F2-Jarvis repo. Path is relative to the repo root (e.g. 'fabrice/plan-hebdo.md', 'ANTI-IA.md'). Use this when you need the exact content of a specific file: plan-hebdo, progress-semaine, logs, publication examples, context files, system prompts, VOIX.md. Don't use for directory listing — use the search tool for discovery.",
    { path: z.string().describe("Path relative to repo root") },
    async ({ path }) => {
      try {
        const file = await ghRead(path);
        if (!file) {
          return {
            content: [{ type: "text" as const, text: `File not found: ${path}` }],
            isError: true,
          };
        }
        return {
          content: [
            {
              type: "text" as const,
              text: `File: ${path}\nSize: ${file.content.length} chars\n\n${file.content.slice(0, 20000)}${file.content.length > 20000 ? "\n\n[... truncated, file is larger ...]" : ""}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error reading ${path}: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // repo_search
  // ---------------------------------------------------------------------------
  const repoSearch = tool(
    "repo_search",
    "Search the F2-Jarvis repo for text content. Use specific keywords. Returns top 10 matches with file path and snippet. Scope limits search to a persona folder ('fabrice', 'romain', 'f2', 'patterns', 'strategie') or 'all'. Useful before writing a new post (search past publications) or answering a contextual question.",
    {
      query: z.string().describe("Search keywords"),
      scope: z
        .enum(["all", "fabrice", "romain", "f2", "patterns", "strategie", "growth-marketing"])
        .default("all")
        .describe("Limit search to a top-level folder"),
    },
    async ({ query, scope }) => {
      try {
        const OWNER = "altidigitech-ui";
        const REPO = "F2-Jarvis";
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
          return {
            content: [{ type: "text" as const, text: "GITHUB_TOKEN not set" }],
            isError: true,
          };
        }
        const scopeQuery = scope && scope !== "all" ? ` path:${scope}` : "";
        const q = `${query}${scopeQuery} repo:${OWNER}/${REPO}`;
        const url = `https://api.github.com/search/code?q=${encodeURIComponent(q)}&per_page=10`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3.text-match+json",
          },
        });
        if (!res.ok) {
          const txt = await res.text();
          return {
            content: [{ type: "text" as const, text: `GitHub search error ${res.status}: ${txt.slice(0, 200)}` }],
            isError: true,
          };
        }
        const data = (await res.json()) as {
          total_count: number;
          items: Array<{
            path: string;
            text_matches?: Array<{ fragment: string }>;
          }>;
        };
        if (!data.items || data.items.length === 0) {
          return {
            content: [{ type: "text" as const, text: `No results for "${query}" (scope: ${scope})` }],
          };
        }
        const formatted = data.items
          .map((it, i) => {
            const snippet = it.text_matches?.[0]?.fragment?.slice(0, 200) || "";
            return `${i + 1}. ${it.path}\n   ${snippet.replace(/\n/g, " ")}`;
          })
          .join("\n\n");
        return {
          content: [
            {
              type: "text" as const,
              text: `Search "${query}" (scope: ${scope}) — ${data.total_count} total, showing top 10:\n\n${formatted}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `repo_search error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // repo_list_publications
  // ---------------------------------------------------------------------------
  const repoListPublications = tool(
    "repo_list_publications",
    "List recent publications (posts, replies, cross-replies) for a persona. Returns paths grouped by platform. Use this BEFORE generating a new post to avoid repeating angles already used recently.",
    {
      persona: z.enum(["fabrice", "romain"]).describe("Which persona"),
      platform: z
        .enum(["twitter", "linkedin", "reddit", "facebook", "all"])
        .default("all")
        .describe("Platform filter"),
    },
    async ({ persona, platform }) => {
      try {
        const paths: string[] = [];
        const platformsToCheck =
          platform === "all" ? ["twitter", "linkedin", "reddit", "facebook"] : [platform];
        for (const p of platformsToCheck) {
          try {
            const entries = await ghList(`${persona}/${p}`);
            for (const e of entries) {
              if (e.type === "file" && e.name.endsWith(".md")) paths.push(e.path);
            }
          } catch {
            /* folder may not exist */
          }
        }
        try {
          const pubEntries = await ghList(`${persona}/publication`);
          for (const e of pubEntries) {
            if (e.type === "file" && e.name.endsWith(".md")) paths.push(e.path);
          }
        } catch {
          /* ignore */
        }
        if (paths.length === 0) {
          return {
            content: [
              { type: "text" as const, text: `No publications found for ${persona} (platform: ${platform})` },
            ],
          };
        }
        return {
          content: [
            {
              type: "text" as const,
              text: `Publications for ${persona} (platform: ${platform}) — ${paths.length} files:\n\n${paths.join("\n")}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `repo_list_publications error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // repo_search_voice_examples
  // ---------------------------------------------------------------------------
  const repoSearchVoiceExamples = tool(
    "repo_search_voice_examples",
    "Find past voice examples for a persona on a given angle. Searches the persona's publication folders and returns short excerpts. Use this BEFORE generating a new post or reply to calibrate the tone, vocabulary, and structure. Do not reproduce — use for calibration only.",
    {
      persona: z.enum(["fabrice", "romain"]).describe("Which persona's voice"),
      angle: z.string().describe("Angle keywords (e.g. 'ghost billing', 'app bloat', 'agency')"),
    },
    async ({ persona, angle }) => {
      try {
        const OWNER = "altidigitech-ui";
        const REPO = "F2-Jarvis";
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
          return {
            content: [{ type: "text" as const, text: "GITHUB_TOKEN not set" }],
            isError: true,
          };
        }
        const q = `${angle} path:${persona} repo:${OWNER}/${REPO} extension:md`;
        const url = `https://api.github.com/search/code?q=${encodeURIComponent(q)}&per_page=5`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3.text-match+json",
          },
        });
        if (!res.ok) {
          return {
            content: [{ type: "text" as const, text: `GitHub search error ${res.status}` }],
            isError: true,
          };
        }
        const data = (await res.json()) as {
          items: Array<{
            path: string;
            text_matches?: Array<{ fragment: string }>;
          }>;
        };
        if (!data.items || data.items.length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: `No voice examples for ${persona} on "${angle}". Generate without reference.`,
              },
            ],
          };
        }
        const formatted = data.items
          .slice(0, 5)
          .map((it, i) => {
            const snippet = it.text_matches?.[0]?.fragment?.slice(0, 400) || "";
            return `[${i + 1}] ${it.path}\n${snippet.replace(/\n/g, " ")}`;
          })
          .join("\n\n");
        return {
          content: [
            {
              type: "text" as const,
              text: `Voice examples for ${persona} on "${angle}":\n\n${formatted}\n\n(Use for calibration only, do not reproduce.)`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `repo_search_voice_examples error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // timeline_today
  // ---------------------------------------------------------------------------
  const timelineToday = tool(
    "timeline_today",
    "Get the live timeline of items for today (posts + objectives + cross-engagement). Returns JSON array. Use this to answer 'what do I have today?' or 'am I behind on X?'.",
    {
      persona: z.enum(["fabrice", "romain"]).describe("Which persona"),
      mode: z.enum(["normal", "f2"]).default("normal").describe("Mode"),
    },
    async ({ persona, mode }) => {
      try {
        const res = await fetch(
          `${backendBase}/context?persona=${persona}&mode=${mode}`,
          { headers: { "X-JARVIS-AUTH": authSecret } }
        );
        if (!res.ok) {
          return {
            content: [{ type: "text" as const, text: `timeline_today fetch error ${res.status}` }],
            isError: true,
          };
        }
        const data = (await res.json()) as { timeline: unknown[] };
        return {
          content: [
            {
              type: "text" as const,
              text: `Timeline for ${persona} (mode: ${mode}):\n${JSON.stringify(data.timeline, null, 2)}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `timeline_today error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // counters_today
  // ---------------------------------------------------------------------------
  const countersToday = tool(
    "counters_today",
    "Get the live counters for today (cold, twitter engagement, linkedin, cross, IH/PH, total). Returns the same JSON as the sidebar. Use for 'where am I today?' type questions.",
    {
      persona: z.enum(["fabrice", "romain"]).describe("Which persona"),
      mode: z.enum(["normal", "f2"]).default("normal").describe("Mode"),
    },
    async ({ persona, mode }) => {
      try {
        const res = await fetch(
          `${backendBase}/context?persona=${persona}&mode=${mode}`,
          { headers: { "X-JARVIS-AUTH": authSecret } }
        );
        if (!res.ok) {
          return {
            content: [{ type: "text" as const, text: `counters_today fetch error ${res.status}` }],
            isError: true,
          };
        }
        const data = (await res.json()) as { counters: unknown; alerts: unknown[] };
        return {
          content: [
            {
              type: "text" as const,
              text: `Counters for ${persona} (mode: ${mode}):\n${JSON.stringify(data.counters, null, 2)}\n\nActive alerts: ${JSON.stringify(data.alerts, null, 2)}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `counters_today error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // propose_action
  // ---------------------------------------------------------------------------
  const proposeAction = tool(
    "propose_action",
    `Propose a repo-modifying action to the user for validation. Returns an action_id (uuid) that you MUST include in your final response as [ACTION_PENDING:uuid] so the UI can render a Validate button. The action will NOT be executed until the user validates via the UI. Supported action_types and their params:

- mark_published: { title: string }
- log_cold: { platform: "TWITTER"|"LINKEDIN", target: "@handle", vertical: string, insight: string, type?: string }
- batch_cold: { platform: "TWITTER"|"LINKEDIN", targets: [{target, vertical, insight, type?}], vertical?, insight? }
- queue_cold_targets: { platform: "TWITTER"|"LINKEDIN", targets: [{target, vertical?, insight?, notes?}] }
- update_cold_reply: { target: "@handle", reply_status: string, notes?: string }
- log_engagement: { platform: "TWITTER"|"LINKEDIN"|"REDDIT"|"FACEBOOK"|"IH"|"PH", post: string, reply: string }
- log_interaction: { event: string, platform: string, activity: string, action: string }
- mark_cross_published: { post: string, reply: string }
- resolve_alert: { keyword: string }
- log_decision: { decision: string, rationale: string, result?: string }

The 'preview' field is a human-readable description shown to the user before they validate. Keep it under 400 chars.`,
    {
      action_type: z
        .enum([
          "mark_published",
          "log_cold",
          "batch_cold",
          "queue_cold_targets",
          "update_cold_reply",
          "log_engagement",
          "log_interaction",
          "mark_cross_published",
          "resolve_alert",
          "log_decision",
        ])
        .describe("Type of action"),
      params: z.record(z.unknown()).describe("Parameters for the action"),
      preview: z.string().describe("Human-readable description (< 400 chars)"),
    },
    async ({ action_type, params, preview }) => {
      if (!conversationId) {
        return {
          content: [
            {
              type: "text" as const,
              text: "propose_action: no active conversation (user not authenticated). Action cannot be persisted. Ask the user to log in and retry.",
            },
          ],
          isError: true,
        };
      }
      try {
        const sb = getSupabase();
        const { data, error } = await sb
          .from("jarvis_pending_actions")
          .insert({
            conversation_id: conversationId,
            action_type,
            params,
            preview,
          })
          .select("id")
          .single();
        if (error || !data) {
          return {
            content: [
              { type: "text" as const, text: `propose_action insert error: ${error?.message || "unknown"}` },
            ],
            isError: true,
          };
        }
        const actionId = (data as { id: string }).id;
        return {
          content: [
            {
              type: "text" as const,
              text: `Action proposed (pending validation). action_id=${actionId}\nType: ${action_type}\nPreview: ${preview}\n\nIMPORTANT: include [ACTION_PENDING:${actionId}] in your final message so the UI renders the Validate button.`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `propose_action error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // recent_history
  // ---------------------------------------------------------------------------
  const recentHistory = tool(
    "recent_history",
    "Summarize what the persona has done in the last N days. Reads progress-semaine.md and recent engagement/cold logs. Returns text summary. Use for 'what have I done this week?', 'recap', 'bilan' type questions.",
    {
      persona: z.enum(["fabrice", "romain"]).describe("Which persona"),
      days: z.number().int().min(1).max(14).default(7).describe("Lookback window in days"),
    },
    async ({ persona, days }) => {
      try {
        const [progress, cold, engagement] = await Promise.all([
          ghRead(`${persona}/progress-semaine.md`).catch(() => null),
          ghRead(`${persona}/cold/cold-outreach-log.md`).catch(() => null),
          ghRead(`${persona}/engagement/engagement-log.md`).catch(() => null),
        ]);
        const out: string[] = [];
        if (progress) {
          out.push(`=== progress-semaine (${persona}) ===\n${progress.content.slice(0, 6000)}`);
        }
        if (cold) {
          out.push(`=== cold-outreach-log (${persona}) ===\n${cold.content.slice(0, 4000)}`);
        }
        if (engagement) {
          out.push(
            `=== engagement-log (${persona}) ===\n${engagement.content.slice(0, 4000)}`
          );
        }
        return {
          content: [
            {
              type: "text" as const,
              text: `Recent history for ${persona} (last ${days} days window, summary from files):\n\n${out.join("\n\n")}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `recent_history error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // mempalace_search
  // ---------------------------------------------------------------------------
  const mempalaceSearch = tool(
    "mempalace_search",
    "Search the MemPalace verbatim archive (session transcripts, decisions). Use for questions about what was said or decided in the past.",
    {
      query: z.string().describe("Search keywords"),
      limit: z.number().int().min(1).max(10).default(5).describe("Max results"),
    },
    async ({ query, limit }) => {
      try {
        const results = await searchDrawers(query, { limit });
        if (results.length === 0) {
          return {
            content: [{ type: "text" as const, text: `No MemPalace drawers for "${query}"` }],
          };
        }
        const formatted = results
          .map(
            (d, i) =>
              `[${i + 1}] [${d.wing}/${d.filename}] (score ${Math.round((1 - d.score) * 100)}%)\n${d.content.slice(0, 500)}`
          )
          .join("\n\n");
        return {
          content: [
            {
              type: "text" as const,
              text: `MemPalace results for "${query}":\n\n${formatted}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `mempalace_search error: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  return createSdkMcpServer({
    name: "jarvis",
    version: "1.0.0",
    tools: [
      repoRead,
      repoSearch,
      repoListPublications,
      repoSearchVoiceExamples,
      timelineToday,
      countersToday,
      proposeAction,
      recentHistory,
      mempalaceSearch,
    ],
  });
}

/**
 * List of allowed tool names for the SDK's allowedTools option.
 */
export const JARVIS_ALLOWED_TOOLS = [
  "mcp__jarvis__repo_read",
  "mcp__jarvis__repo_search",
  "mcp__jarvis__repo_list_publications",
  "mcp__jarvis__repo_search_voice_examples",
  "mcp__jarvis__timeline_today",
  "mcp__jarvis__counters_today",
  "mcp__jarvis__propose_action",
  "mcp__jarvis__recent_history",
  "mcp__jarvis__mempalace_search",
];
