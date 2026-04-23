"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";

interface Proposal {
  id: string;
  filename: string;
  type: string;
  priority: "critical" | "high" | "medium" | "low";
  wing: string;
  title: string;
  preview: string;
  timestamp: string;
  cycle: string;
  fullContent: string;
}

interface DiaryEntry {
  filename: string;
  content: string;
}

type Props = {
  accentColor: string;
  persona: string;
  mode: "proposals" | "diary";
  onClose: () => void;
};

const PRIORITY_ICON: Record<string, string> = {
  critical: "🔴",
  high: "🟠",
  medium: "🟡",
  low: "🟢",
};

const PRIORITY_COLOR: Record<string, string> = {
  critical: "#f06464",
  high: "#ef9f27",
  medium: "#f0c060",
  low: "#4ade80",
};

const TYPE_LABEL: Record<string, string> = {
  incoherence: "incohérence",
  pattern: "pattern",
  risk: "risque",
  optimization: "optim",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++} className="font-semibold text-slate-200">{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : text;
}

function SimpleMarkdown({ content, large }: { content: string; large?: boolean }) {
  const lines = content.split("\n");
  const textSm = large ? "text-[14px]" : "text-[10px]";
  const textH2 = large ? "text-[15px]" : "text-[11px]";
  const textH1 = large ? "text-base" : "text-sm";
  const lineStyle = large ? { lineHeight: "1.7" } : undefined;
  const gap = large ? "space-y-2" : "space-y-1";
  const emptyH = large ? "h-3" : "h-1";

  return (
    <div className={gap}>
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return (
            <div key={i} className={`${textH2} font-mono font-semibold text-slate-300 mt-4 mb-1`}>
              {renderInline(line.slice(3))}
            </div>
          );
        if (line.startsWith("# "))
          return (
            <div key={i} className={`${textH1} font-mono font-bold text-slate-200 mb-2`}>
              {renderInline(line.slice(2))}
            </div>
          );
        if (line.startsWith("- "))
          return (
            <div key={i} className={`${textSm} font-mono text-slate-400 pl-2 flex gap-1.5`} style={lineStyle}>
              <span className="text-slate-600 flex-none">·</span>
              <span>{renderInline(line.slice(2))}</span>
            </div>
          );
        if (line.startsWith("---"))
          return <div key={i} className="border-t my-2" style={{ borderColor: "rgba(255,255,255,0.06)" }} />;
        if (line.trim() === "") return <div key={i} className={emptyH} />;
        return (
          <div key={i} className={`${textSm} font-mono text-slate-400`} style={lineStyle}>
            {renderInline(line)}
          </div>
        );
      })}
    </div>
  );
}

export function OuroborosProposalsModal({ accentColor, persona, mode, onClose }: Props) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterWing, setFilterWing] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [done, setDone] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (mode === "proposals") {
        const res = await fetch("/api/ouroboros/proposals");
        if (res.ok) setProposals(await res.json());
      } else {
        const res = await fetch("/api/ouroboros/diary");
        if (res.ok) {
          const data = await res.json();
          setDiary(data.entries || []);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleAction(proposalId: string, action: "accept" | "reject" | "ignore") {
    setActionLoading(proposalId + action);
    try {
      const res = await fetch("/api/ouroboros/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId, action, persona }),
      });
      if (res.ok) {
        setDone(prev => new Set([...prev, proposalId]));
        setExpandedId(null);
      }
    } finally {
      setActionLoading(null);
    }
  }

  const visibleProposals = proposals.filter(p => {
    if (done.has(p.id)) return false;
    if (filterPriority !== "all" && p.priority !== filterPriority) return false;
    if (filterWing !== "all" && p.wing !== filterWing) return false;
    if (filterType !== "all" && p.type !== filterType) return false;
    return true;
  });

  const wings = [...new Set(proposals.map(p => p.wing))];
  const types = [...new Set(proposals.map(p => p.type))];

  const counts = {
    critical: proposals.filter(p => p.priority === "critical" && !done.has(p.id)).length,
    high: proposals.filter(p => p.priority === "high" && !done.has(p.id)).length,
    medium: proposals.filter(p => p.priority === "medium" && !done.has(p.id)).length,
    low: proposals.filter(p => p.priority === "low" && !done.has(p.id)).length,
  };

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
            {mode === "proposals" ? "OUROBOROS — PROPOSITIONS" : "OUROBOROS — JOURNAL"}
          </span>
          {mode === "proposals" && !loading && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
              <span>{visibleProposals.length} proposition{visibleProposals.length !== 1 ? "s" : ""}</span>
              {counts.critical > 0 && <span style={{ color: PRIORITY_COLOR.critical }}>· {counts.critical} critical</span>}
              {counts.high > 0 && <span style={{ color: PRIORITY_COLOR.high }}>· {counts.high} high</span>}
              {counts.medium > 0 && <span style={{ color: PRIORITY_COLOR.medium }}>· {counts.medium} medium</span>}
              {counts.low > 0 && <span style={{ color: PRIORITY_COLOR.low }}>· {counts.low} low</span>}
            </div>
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

      {/* Filters (proposals only) */}
      {mode === "proposals" && (
        <div
          className="flex items-center gap-3 px-8 py-2 border-b flex-none"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Filtres</span>

          {/* Priority filter */}
          <div className="flex gap-1">
            {(["all", "critical", "high", "medium", "low"] as const).map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className="text-[9px] font-mono px-2 py-0.5 rounded transition-all"
                style={{
                  background: filterPriority === p ? `${accentColor}20` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${filterPriority === p ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
                  color: filterPriority === p ? accentColor : "#475569",
                }}
              >
                {p === "all" ? "TOUT" : p.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Wing filter */}
          {wings.length > 1 && (
            <div className="flex gap-1">
              <button
                onClick={() => setFilterWing("all")}
                className="text-[9px] font-mono px-2 py-0.5 rounded transition-all"
                style={{
                  background: filterWing === "all" ? `${accentColor}20` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${filterWing === "all" ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
                  color: filterWing === "all" ? accentColor : "#475569",
                }}
              >
                WINGS
              </button>
              {wings.map(w => (
                <button
                  key={w}
                  onClick={() => setFilterWing(w)}
                  className="text-[9px] font-mono px-2 py-0.5 rounded transition-all capitalize"
                  style={{
                    background: filterWing === w ? `${accentColor}20` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${filterWing === w ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
                    color: filterWing === w ? accentColor : "#475569",
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          )}

          {/* Type filter */}
          {types.length > 1 && (
            <div className="flex gap-1">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(filterType === t ? "all" : t)}
                  className="text-[9px] font-mono px-2 py-0.5 rounded transition-all"
                  style={{
                    background: filterType === t ? `${accentColor}20` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${filterType === t ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
                    color: filterType === t ? accentColor : "#475569",
                  }}
                >
                  {TYPE_LABEL[t] || t}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {loading && (
          <div className="text-[10px] font-mono text-slate-700">Chargement…</div>
        )}

        {/* PROPOSALS MODE */}
        {mode === "proposals" && !loading && (
          <>
            {visibleProposals.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-3 py-20"
              >
                <div className="text-2xl opacity-30" style={{ color: accentColor }}>◈</div>
                <div className="text-[11px] font-mono text-slate-600">
                  Aucune proposition en attente
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-3">
                {visibleProposals.map(p => {
                  const isExpanded = expandedId === p.id;
                  return (
                    <div
                      key={p.id}
                      className="rounded-lg overflow-hidden transition-all"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${isExpanded ? accentColor + "30" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {/* Card header */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : p.id)}
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-sm flex-none mt-0.5">{PRIORITY_ICON[p.priority] || "⚪"}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="text-xs font-mono font-medium text-slate-200 truncate"
                              >
                                {p.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[9px] font-mono text-slate-600">
                              <span
                                className="px-1.5 py-0.5 rounded"
                                style={{
                                  background: `${PRIORITY_COLOR[p.priority]}15`,
                                  color: PRIORITY_COLOR[p.priority],
                                  border: `1px solid ${PRIORITY_COLOR[p.priority]}30`,
                                }}
                              >
                                {p.priority}
                              </span>
                              {p.type && (
                                <span
                                  className="px-1.5 py-0.5 rounded"
                                  style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                  }}
                                >
                                  {TYPE_LABEL[p.type] || p.type}
                                </span>
                              )}
                              {p.wing && <span>wing: {p.wing}</span>}
                              {p.timestamp && <span>{formatDate(p.timestamp)}</span>}
                              {p.cycle && <span>cycle #{p.cycle}</span>}
                            </div>
                            {!isExpanded && (
                              <div className="text-[10px] font-mono text-slate-600 mt-1.5 leading-relaxed truncate">
                                {p.preview}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-700 flex-none mt-0.5">
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div
                          className="px-4 pb-4 border-t"
                          style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        >
                          <div className="pt-4 pb-4 max-h-80 overflow-y-auto">
                            <SimpleMarkdown content={p.fullContent} />
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                            <button
                              onClick={() => handleAction(p.id, "accept")}
                              disabled={actionLoading !== null}
                              className="flex-1 text-[11px] font-mono py-2 rounded transition-all disabled:opacity-40"
                              style={{
                                background: "rgba(74,222,128,0.08)",
                                border: "1px solid rgba(74,222,128,0.25)",
                                color: "#4ade80",
                              }}
                            >
                              {actionLoading === p.id + "accept" ? "…" : "✅ ACCEPTER"}
                            </button>
                            <button
                              onClick={() => handleAction(p.id, "reject")}
                              disabled={actionLoading !== null}
                              className="flex-1 text-[11px] font-mono py-2 rounded transition-all disabled:opacity-40"
                              style={{
                                background: "rgba(240,100,100,0.08)",
                                border: "1px solid rgba(240,100,100,0.25)",
                                color: "#f06464",
                              }}
                            >
                              {actionLoading === p.id + "reject" ? "…" : "❌ REJETER"}
                            </button>
                            <button
                              onClick={() => handleAction(p.id, "ignore")}
                              disabled={actionLoading !== null}
                              className="flex-1 text-[11px] font-mono py-2 rounded transition-all disabled:opacity-40"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#64748b",
                              }}
                            >
                              {actionLoading === p.id + "ignore" ? "…" : "⊘ IGNORER"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* DIARY MODE */}
        {mode === "diary" && !loading && (
          <div className="max-w-3xl mx-auto">
            {diary.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20">
                <div className="text-2xl opacity-30" style={{ color: accentColor }}>◈</div>
                <div className="text-[11px] font-mono text-slate-600">
                  Journal vide — aucun cycle enregistré
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {diary.map(entry => (
                  <div
                    key={entry.filename}
                    className="rounded-lg p-5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-3 pb-2 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      {entry.filename.replace(/\.md$/, "")}
                    </div>
                    <SimpleMarkdown content={entry.content} large />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
