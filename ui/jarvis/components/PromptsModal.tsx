"use client";

import { useState, useEffect, useCallback } from "react";

interface PromptItem {
  category: string;
  tool: string;
  vertical: string;
  path: string;
  content: string;
}

type Props = {
  persona: "fabrice" | "romain";
  accentColor: string;
  onClose: () => void;
};

const TOOL_ICON: Record<string, string> = {
  grok: "🔍",
  chrome: "🌐",
  claude: "🤖",
};

const CATEGORY_LABEL: Record<string, string> = {
  cold: "COLD OUTREACH",
  engagement: "ENGAGEMENT",
  publication: "PUBLICATION",
};

const CATEGORIES = ["cold", "engagement", "publication"];

function toolLabel(tool: string, vertical: string): string {
  const icon = TOOL_ICON[tool] || "📄";
  const name = tool.charAt(0).toUpperCase() + tool.slice(1);
  const v = vertical && vertical !== "GENERAL" ? ` — ${vertical}` : "";
  return `${icon} ${name}${v}`;
}

export function PromptsModal({ persona, accentColor, onClose }: Props) {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prompts?persona=${persona}`);
      if (res.ok) {
        const data = await res.json();
        setPrompts(data.prompts || []);
      }
    } finally {
      setLoading(false);
    }
  }, [persona]);

  useEffect(() => { fetchPrompts(); }, [fetchPrompts]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleCopy(content: string, path: string, e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(path);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // fallback
    }
  }

  const groupedByCategory = CATEGORIES.reduce<Record<string, PromptItem[]>>((acc, cat) => {
    acc[cat] = prompts.filter(p => p.category === cat);
    return acc;
  }, {});

  const totalCount = prompts.length;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(8,10,16,0.96)", backdropFilter: "blur(8px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-8 py-4 border-b flex-none"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono font-semibold" style={{ color: accentColor }}>
            PROMPTS — {persona.toUpperCase()}
          </span>
          {!loading && (
            <span className="text-[10px] font-mono text-slate-600">
              {totalCount} prompt{totalCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-[11px] font-mono text-slate-600 hover:text-slate-300 transition-colors px-3 py-1.5 rounded"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          ESC
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {loading && (
          <div className="text-[10px] font-mono text-slate-700">Chargement…</div>
        )}

        {!loading && totalCount === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <div className="text-2xl opacity-30" style={{ color: accentColor }}>📋</div>
            <div className="text-[11px] font-mono text-slate-600">
              Aucun prompt trouvé pour {persona}
            </div>
          </div>
        )}

        {!loading && totalCount > 0 && (
          <div className="max-w-3xl mx-auto space-y-8">
            {CATEGORIES.map(cat => {
              const items = groupedByCategory[cat];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat}>
                  <div
                    className="text-[9px] font-mono uppercase tracking-widest mb-3 pb-2 border-b"
                    style={{ color: accentColor, borderColor: `${accentColor}20` }}
                  >
                    {CATEGORY_LABEL[cat] || cat.toUpperCase()}
                  </div>
                  <div className="space-y-2">
                    {items.map(prompt => {
                      const isExpanded = expandedPath === prompt.path;
                      const isCopied = copied === prompt.path;
                      const preview = prompt.content.slice(0, 100).replace(/\n/g, " ");
                      return (
                        <div
                          key={prompt.path}
                          className="rounded-lg overflow-hidden transition-all cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.02)",
                            border: `1px solid ${isExpanded ? accentColor + "30" : "rgba(255,255,255,0.06)"}`,
                          }}
                          onClick={() => setExpandedPath(isExpanded ? null : prompt.path)}
                        >
                          {/* Row */}
                          <div className="flex items-center gap-3 px-4 py-3">
                            <span className="text-[12px] font-mono text-slate-300 flex-1 min-w-0">
                              {toolLabel(prompt.tool, prompt.vertical)}
                            </span>
                            {!isExpanded && (
                              <span className="text-[10px] font-mono text-slate-600 flex-1 truncate hidden sm:block">
                                {preview}{prompt.content.length > 100 ? "…" : ""}
                              </span>
                            )}
                            <button
                              onClick={(e) => handleCopy(prompt.content, prompt.path, e)}
                              className="flex-none text-[10px] font-mono px-3 py-1 rounded transition-all"
                              style={{
                                background: isCopied ? `${accentColor}20` : "rgba(255,255,255,0.04)",
                                border: `1px solid ${isCopied ? accentColor + "50" : "rgba(255,255,255,0.10)"}`,
                                color: isCopied ? accentColor : "#64748b",
                              }}
                            >
                              {isCopied ? "✓ Copié" : "Copier"}
                            </button>
                            <span className="text-[10px] font-mono text-slate-700 flex-none">
                              {isExpanded ? "▲" : "▼"}
                            </span>
                          </div>

                          {/* Expanded content */}
                          {isExpanded && (
                            <div
                              className="px-4 pb-4 border-t"
                              style={{ borderColor: "rgba(255,255,255,0.04)" }}
                            >
                              <div
                                className="mt-3 max-h-96 overflow-y-auto text-[11px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap rounded p-3"
                                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}
                              >
                                {prompt.content}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
