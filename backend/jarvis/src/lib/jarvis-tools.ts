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
    "Read a file from the F2-Jarvis repo. Path is relative to the repo root (e.g. 'fabrice/plan-hebdo.md', 'ANTI-IA.md'). Use this when you need the exact content of a specific file: plan-hebdo, progress-semaine, logs, publication examples, context files, system prompts, VOIX.md. Don't use for directory listing — use the search tool for discovery. For large files (>40K chars), use offset or line_range to read specific parts.",
    {
      path: z.string().describe("Path relative to repo root"),
      offset: z.number().int().min(0).optional().describe("Start reading from this character offset (for large files)"),
      line_range: z.string().optional().describe("Read specific lines, e.g. '100-200' or '250-end'. More precise than offset for code files."),
    },
    async ({ path, offset, line_range }) => {
      try {
        const file = await ghRead(path);
        if (!file) {
          return {
            content: [{ type: "text" as const, text: `File not found: ${path}` }],
            isError: true,
          };
        }

        let output = file.content;
        const totalChars = file.content.length;
        const totalLines = file.content.split("\n").length;

        if (line_range) {
          const lines = file.content.split("\n");
          const [startStr, endStr] = line_range.split("-");
          const start = Math.max(0, parseInt(startStr, 10) - 1);
          const end = endStr === "end" ? lines.length : Math.min(lines.length, parseInt(endStr, 10));
          output = lines.slice(start, end).map((l, i) => `${start + i + 1}: ${l}`).join("\n");
          return {
            content: [{
              type: "text" as const,
              text: `File: ${path} (lines ${start + 1}-${end} of ${totalLines}, ${totalChars} total chars)\n\n${output}`,
            }],
          };
        }

        if (offset && offset > 0) {
          output = file.content.slice(offset, offset + 40000);
          return {
            content: [{
              type: "text" as const,
              text: `File: ${path} (offset ${offset}-${offset + output.length} of ${totalChars} chars)\n\n${output}`,
            }],
          };
        }

        const truncated = totalChars > 40000;
        return {
          content: [
            {
              type: "text" as const,
              text: `File: ${path}\nSize: ${totalChars} chars, ${totalLines} lines${truncated ? " [TRUNCATED — use line_range or offset to read the rest]" : ""}\n\n${output.slice(0, 40000)}${truncated ? "\n\n[... truncated at 40000 chars ...]" : ""}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `repo_read error: ${err instanceof Error ? err.message : String(err)}`,
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
- create_file: { path: string, content: string, commit_message?: string }
  Creates a new file OR overwrites an existing file at \`path\` with \`content\`.
  Allowed paths: prefixes f2/, fabrice/, romain/, strategie/, patterns/,
    tracking/, archives/, distribution/, growth-marketing/, saas/, produits/,
    ops/, marketing/ — OR root files matching BATCH-SEMAINE-N.md,
    PLAN-*.md, HANDOFF*.md, CHANGELOG*.md, REVUE-*.md.
  Allowed extensions: .md .txt .json .yml .yaml .csv.
  Max content size: 500 KB. Use this for full batch generation, strategic
  memos, or fresh templates. Do NOT use for small edits (use the specific
  action types like log_cold, mark_published instead — they're idempotent
  and safer). The file is committed to main branch with message prefix
  "[JARVIS] {commit_message or 'create {path}'}". Git keeps full history.

- patch_file: Apply search & replace patches to an existing file. params: { path: string, patches: [{ search: "exact text to find", replace: "replacement text" }], commit_message: string }. Use this instead of create_file when you only need to change specific parts of a large file. Each patch.search MUST be an exact match of the existing text (copied verbatim from repo_read). Allowed paths: same as create_file PLUS backend/jarvis/src/, ui/jarvis/, .claude/skills/. Allowed extensions: .md .txt .json .yml .yaml .csv .ts .tsx.

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
          "create_file",
          "patch_file",
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
        const enrichedParams = {
          ...params,
          _persona_prefix: options.mode === "f2" ? "f2" : options.persona,
        };
        const { data, error } = await sb
          .from("jarvis_pending_actions")
          .insert({
            conversation_id: conversationId,
            action_type,
            params: enrichedParams,
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

  // ---------------------------------------------------------------------------
  // conversation_search
  // ---------------------------------------------------------------------------
  const conversationSearch = tool(
    "conversation_search",
    "Search through past conversation messages in the database for the current persona and mode. Use when the user references something discussed before: 'on avait dit quoi sur X ?', 'qu est-ce que j ai dit mardi ?', 'tu te souviens de...', 'la dernière fois on a décidé...'. Returns matching messages with timestamps. For older archived sessions, combine with mempalace_search.",
    {
      query: z.string().describe("Search keywords"),
      days: z.number().int().min(1).max(30).default(7).describe("How many days back to search"),
      limit: z.number().int().min(1).max(20).default(10).describe("Max results"),
    },
    async ({ query, days, limit }) => {
      try {
        const { getSupabase } = await import("./supabase.js");
        const sb = getSupabase();

        const since = new Date();
        since.setDate(since.getDate() - days);

        const { data: convs } = await sb
          .from("jarvis_conversations")
          .select("id")
          .eq("persona", options.persona)
          .eq("mode", options.mode);

        if (!convs || convs.length === 0) {
          return { content: [{ type: "text" as const, text: "No conversations found for this persona/mode." }] };
        }

        const convIds = (convs as Array<{ id: string }>).map(c => c.id);

        const { data: msgs, error } = await sb
          .from("jarvis_messages")
          .select("role, content, created_at")
          .in("conversation_id", convIds)
          .gte("created_at", since.toISOString())
          .order("created_at", { ascending: false })
          .limit(200);

        if (error || !msgs) {
          return { content: [{ type: "text" as const, text: `Search error: ${error?.message || "unknown"}` }], isError: true };
        }

        const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        if (words.length === 0) {
          return { content: [{ type: "text" as const, text: "Query too short — need words with 3+ characters." }] };
        }

        const results = (msgs as Array<{ role: string; content: string; created_at: string }>)
          .filter(m => {
            const lower = m.content.toLowerCase();
            const matched = words.filter(w => lower.includes(w)).length;
            return matched >= Math.ceil(words.length / 2);
          })
          .slice(0, limit);

        if (results.length === 0) {
          return { content: [{ type: "text" as const, text: `No messages matching "${query}" in the last ${days} days.` }] };
        }

        const formatted = results.map((m, i) => {
          const time = new Date(m.created_at).toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
            day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
          });
          const snippet = m.content.slice(0, 500) + (m.content.length > 500 ? "…" : "");
          return `[${i + 1}] [${m.role.toUpperCase()} — ${time}]\n${snippet}`;
        }).join("\n\n");

        return {
          content: [{ type: "text" as const, text: `${results.length} messages matching "${query}" (last ${days} days):\n\n${formatted}` }],
        };
      } catch (err) {
        return {
          content: [{ type: "text" as const, text: `conversation_search error: ${err instanceof Error ? err.message : String(err)}` }],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // code_check — typecheck TypeScript files
  // ---------------------------------------------------------------------------
  const codeCheck = tool(
    "code_check",
    "Run TypeScript type checking on the backend codebase. Use BEFORE proposing a create_file on any .ts or .tsx file. Returns compilation errors if any. Can also check a specific file content without committing it.",
    {
      mode: z.enum(["full", "file"]).default("full").describe("'full' runs tsc --noEmit on the whole project. 'file' checks a specific file content."),
      filePath: z.string().optional().describe("For mode 'file': the path of the file to check (e.g. 'backend/jarvis/src/routes/action.ts')"),
      fileContent: z.string().optional().describe("For mode 'file': the new content to validate before committing"),
    },
    async ({ mode, filePath, fileContent }) => {
      try {
        const { execSync } = await import("child_process");

        if (mode === "full") {
          try {
            const output = execSync("npx tsc --noEmit 2>&1", {
              cwd: "/app",
              timeout: 30_000,
              encoding: "utf-8",
            });
            return {
              content: [{ type: "text" as const, text: `✅ TypeScript check passed. No errors.\n${output.slice(0, 500)}` }],
            };
          } catch (err) {
            const error = err as { stdout?: string; stderr?: string };
            const output = (error.stdout || "") + (error.stderr || "");
            const errors = output.split("\n").filter(l => l.includes("error TS"));
            return {
              content: [{
                type: "text" as const,
                text: `❌ TypeScript check failed — ${errors.length} error(s):\n\n${errors.slice(0, 20).join("\n")}\n\n${errors.length > 20 ? `... and ${errors.length - 20} more` : ""}`,
              }],
            };
          }
        } else if (mode === "file" && filePath && fileContent) {
          const fs = await import("fs/promises");
          const fullPath = filePath.startsWith("/app/") ? filePath : `/app/${filePath}`;

          let original: string | null = null;
          try {
            original = await fs.readFile(fullPath, "utf-8");
          } catch {
            // new file
          }

          await fs.writeFile(fullPath, fileContent, "utf-8");

          try {
            execSync("npx tsc --noEmit 2>&1", {
              cwd: "/app",
              timeout: 30_000,
              encoding: "utf-8",
            });
            return {
              content: [{ type: "text" as const, text: `✅ File "${filePath}" compiles. No errors.` }],
            };
          } catch (err) {
            const error = err as { stdout?: string; stderr?: string };
            const output = (error.stdout || "") + (error.stderr || "");
            const errors = output.split("\n").filter(l => l.includes("error TS"));
            return {
              content: [{
                type: "text" as const,
                text: `❌ File "${filePath}" has TypeScript errors:\n\n${errors.slice(0, 20).join("\n")}`,
              }],
            };
          } finally {
            if (original !== null) {
              await fs.writeFile(fullPath, original, "utf-8");
            } else {
              await fs.unlink(fullPath).catch(() => {});
            }
          }
        }

        return {
          content: [{ type: "text" as const, text: "Invalid mode or missing parameters." }],
        };
      } catch (err) {
        return {
          content: [{
            type: "text" as const,
            text: `code_check error: ${err instanceof Error ? err.message : String(err)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // ---------------------------------------------------------------------------
  // ouroboros_proposals
  // ---------------------------------------------------------------------------
  const ouroborosProposals = tool(
    "ouroboros_proposals",
    "List pending Ouroboros proposals (the background consciousness of FoundryTwo). Returns the most recent proposals with title, priority, and preview. Use this when the user asks about Ouroboros, pending recommendations, what the system has noticed, or when you need context about what Ouroboros is tracking. Also use proactively when relevant to the conversation (e.g., user asks about LinkedIn status and there's a pending proposal about LinkedIn).",
    {
      status: z.enum(["pending", "accepted", "rejected"]).default("pending").describe("Which proposals to list"),
      limit: z.number().int().min(1).max(20).default(10).describe("Max proposals to return"),
    },
    async ({ status, limit }) => {
      try {
        const dirMap: Record<string, string> = {
          pending: "brain/ouroboros/proposals/pending",
          accepted: "brain/ouroboros/proposals/accepted",
          rejected: "brain/ouroboros/proposals/rejected",
        };
        const dir = dirMap[status];
        const entries = await ghList(dir);
        const mdFiles = entries
          .filter((f) => f.type === "file" && f.name.endsWith(".md") && !f.name.startsWith("_") && !f.name.startsWith("."))
          .sort((a, b) => b.name.localeCompare(a.name))
          .slice(0, limit);

        if (mdFiles.length === 0) {
          return {
            content: [{ type: "text" as const, text: `Aucune proposal ${status} trouvée.` }],
          };
        }

        const summaries: string[] = [];
        for (const file of mdFiles) {
          try {
            const fileData = await ghRead(`${dir}/${file.name}`);
            if (!fileData) continue;
            const raw = fileData.content;
            const titleMatch = raw.match(/\*\*Titr[ée]\s*:\s*\*\*\s*(.+)/i) || raw.match(/\*\*Titr[ée]\*\*\s*:\s*(.+)/i) || raw.match(/^#\s+(.+)$/m);
            const priorityMatch = raw.match(/\*\*Priorit[ée]\s*:\s*\*\*\s*(.+)/i) || raw.match(/priorité:\s*(.+)/i);
            const recommMatch = raw.match(/\*\*Recommandation[^*]*\*\*\s*:\s*([\s\S]*?)(?=\*\*Risques|\*\*Action|\n---|$)/i);
            const contextMatch = raw.match(/\*\*Contexte[^*]*\*\*\s*:\s*([\s\S]*?)(?=\*\*Recomm|\*\*Action|\n---|$)/i);
            const tsMatch = raw.match(/timestamp:\s*"?([^"\n]+)"?/);
            const epochMatch = file.name.match(/-(\d{13,})\.md$/);
            const ts = tsMatch ? tsMatch[1] : (epochMatch ? new Date(parseInt(epochMatch[1], 10)).toISOString() : "");

            const title = titleMatch ? titleMatch[1].trim() : file.name;
            const priority = priorityMatch ? priorityMatch[1].trim() : "medium";
            const recommendation = recommMatch ? recommMatch[1].trim().slice(0, 200) : "";
            const context = contextMatch ? contextMatch[1].trim().slice(0, 200) : "";

            summaries.push(`[${priority.toUpperCase()}] ${title}${ts ? ` (${ts})` : ""}\n  Contexte: ${context || "(aucun)"}\n  Recommandation: ${recommendation || "(aucune)"}\n  Fichier: ${file.name}`);
          } catch {
            // skip unreadable files
          }
        }

        return {
          content: [{
            type: "text" as const,
            text: `Proposals Ouroboros (${status}) — ${summaries.length} résultats :\n\n${summaries.join("\n\n")}`,
          }],
        };
      } catch (err) {
        return {
          content: [{
            type: "text" as const,
            text: `ouroboros_proposals error: ${err instanceof Error ? err.message : String(err)}`,
          }],
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
      conversationSearch,
      codeCheck,
      ouroborosProposals,
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
  "mcp__jarvis__conversation_search",
  "mcp__jarvis__code_check",
  "mcp__jarvis__ouroboros_proposals",
];
