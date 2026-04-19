"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Persona = "romain" | "fabrice";

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

type Props = { persona: Persona };

export function Chat({ persona }: Props) {
  const colors = PERSONA_COLORS[persona];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

        {messages.map((msg) => (
          <div
            key={msg.id}
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
