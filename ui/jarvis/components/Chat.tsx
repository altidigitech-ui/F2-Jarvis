"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send } from "lucide-react";

type Persona = "romain" | "fabrice";
type Mode = "normal" | "f2";
type ActionType = "mark_published" | "log_decision" | "incident_resolved" | null;

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const PERSONA_COLORS: Record<Persona, { primary: string; bg: string; border: string }> = {
  romain: {
    primary: "#00ffb4",
    bg: "rgba(0,255,180,0.08)",
    border: "rgba(0,255,180,0.2)",
  },
  fabrice: {
    primary: "#9b8fff",
    bg: "rgba(155,143,255,0.08)",
    border: "rgba(155,143,255,0.2)",
  },
};

function getCESTTime() {
  return new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

type ActionFormProps = {
  action: ActionType;
  persona: Persona;
  mode: Mode;
  accentColor: string;
  onClose: () => void;
  onSuccess: () => void;
};

function ActionForm({ action, persona, accentColor, onClose, onSuccess }: ActionFormProps) {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, action, payload: fields }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      onSuccess();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    color: "#cbd5e1",
    fontSize: "11px",
    padding: "6px 10px",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
  } as const;

  const labelStyle = {
    fontSize: "9px",
    color: "#475569",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "3px",
    display: "block",
  };

  return (
    <div
      className="mt-2 p-3 rounded-xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="space-y-2">
        {action === "mark_published" && (
          <>
            <div>
              <label style={labelStyle}>Titre / mot-clé du post</label>
              <input
                style={inputStyle}
                placeholder="ex: Thread Twitter sur CRO…"
                value={fields.title || ""}
                onChange={(e) => set("title", e.target.value)}
                autoFocus
              />
            </div>
          </>
        )}

        {action === "log_decision" && (
          <>
            <div>
              <label style={labelStyle}>Décision</label>
              <input
                style={inputStyle}
                placeholder="ex: Pivot pricing vers monthly"
                value={fields.decision || ""}
                onChange={(e) => set("decision", e.target.value)}
                autoFocus
              />
            </div>
            <div>
              <label style={labelStyle}>Rationale</label>
              <input
                style={inputStyle}
                placeholder="ex: Conversion test — 3 signups en 24h"
                value={fields.rationale || ""}
                onChange={(e) => set("rationale", e.target.value)}
              />
            </div>
          </>
        )}

        {action === "incident_resolved" && (
          <>
            <div>
              <label style={labelStyle}>Mot-clé de l&apos;incident</label>
              <input
                style={inputStyle}
                placeholder="ex: DNS, SUSPENDU, Twitter…"
                value={fields.keyword || ""}
                onChange={(e) => set("keyword", e.target.value)}
                autoFocus
              />
            </div>
          </>
        )}

        {error && (
          <div className="text-[10px] font-mono" style={{ color: "#f06464" }}>
            {error}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={submit}
            disabled={loading}
            className="text-[10px] font-mono px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
              color: accentColor,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "…" : "CONFIRMER"}
          </button>
          <button
            onClick={onClose}
            className="text-[10px] font-mono px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-400 transition-colors"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            ANNULER
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  persona: Persona;
  mode?: Mode;
  onAction?: () => void;
};

export function Chat({ persona, mode = "normal", onAction }: Props) {
  const colors = PERSONA_COLORS[persona];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [lastActionDone, setLastActionDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeAction]);

  const send = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: getCESTTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    setActiveAction(null);
    setLastActionDone(false);

    const assistantId = uid();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: getCESTTime(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          mode,
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `[Erreur: ${(err as Error).message}]` }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  const handleActionSuccess = useCallback(() => {
    setActiveAction(null);
    setLastActionDone(true);
    onAction?.();
  }, [onAction]);

  const lastAssistantIdx = messages.reduce(
    (acc, m, i) => (m.role === "assistant" ? i : acc),
    -1
  );

  const actionButtons: { type: ActionType; label: string }[] = [
    { type: "mark_published", label: "✅ PUBLIÉ" },
    { type: "log_decision", label: "📋 DÉCISION" },
    { type: "incident_resolved", label: "🔧 RÉSOLU" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div
                className="text-3xl font-light mb-2"
                style={{ color: colors.primary, opacity: 0.4 }}
              >
                ◈
              </div>
              <p className="text-slate-600 text-sm">
                JARVIS en attente. Que faites-vous aujourd&apos;hui ?
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={msg.id}>
            <div
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="flex-none w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
                style={
                  msg.role === "user"
                    ? {
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        color: colors.primary,
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#64748b",
                      }
                }
              >
                {msg.role === "user" ? persona[0].toUpperCase() : "J"}
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" ? "rounded-tr-sm" : "glass rounded-tl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background: colors.bg,
                          border: `1px solid ${colors.border}`,
                          color: "#e2e8f0",
                        }
                      : {
                          color: "#cbd5e1",
                        }
                  }
                >
                  {msg.content}
                  {msg.role === "assistant" && msg.content === "" && isStreaming && (
                    <span
                      className="inline-block w-1 h-3 ml-0.5 animate-pulse"
                      style={{ background: colors.primary }}
                    />
                  )}
                </div>
                <span className="text-[9px] font-mono text-slate-700 px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>

            {/* Action buttons — last assistant message only, after streaming done */}
            {msg.role === "assistant" && idx === lastAssistantIdx && !isStreaming && msg.content && (
              <div className="ml-9 mt-2">
                {!activeAction && !lastActionDone && (
                  <div className="flex gap-2 flex-wrap">
                    {actionButtons.map(({ type, label }) => (
                      <button
                        key={type}
                        onClick={() => setActiveAction(type)}
                        className="text-[9px] font-mono px-2.5 py-1 rounded-full transition-all hover:opacity-100"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#475569",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
                {lastActionDone && (
                  <div className="text-[9px] font-mono" style={{ color: colors.primary }}>
                    ✓ Action enregistrée dans le repo
                  </div>
                )}
                {activeAction && (
                  <ActionForm
                    action={activeAction}
                    persona={persona}
                    mode={mode}
                    accentColor={colors.primary}
                    onClose={() => setActiveAction(null)}
                    onSuccess={handleActionSuccess}
                  />
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="px-6 py-4 border-t"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div
          className="flex items-end gap-3 rounded-xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${isStreaming ? colors.border : "rgba(255,255,255,0.07)"}`,
            transition: "border-color 0.2s",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Message JARVIS… (⏎ envoyer, Shift+⏎ nouvelle ligne)"
            disabled={isStreaming}
            rows={1}
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 resize-none outline-none leading-relaxed"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={send}
            disabled={isStreaming || !input.trim()}
            className="flex-none w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: input.trim() && !isStreaming ? colors.bg : "transparent",
              border: `1px solid ${input.trim() && !isStreaming ? colors.border : "rgba(255,255,255,0.06)"}`,
              color: input.trim() && !isStreaming ? colors.primary : "#334155",
              cursor: isStreaming || !input.trim() ? "not-allowed" : "pointer",
            }}
          >
            {isStreaming ? (
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: colors.primary }} />
            ) : (
              <Send size={12} />
            )}
          </button>
        </div>
        <div className="text-[9px] font-mono text-slate-700 mt-1.5 text-right">
          TRANSMIT · ⏎
        </div>
      </div>
    </div>
  );
}
