"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, X, ImageIcon, Paperclip } from "lucide-react";

type Persona = "romain" | "fabrice";
type Mode = "normal" | "f2";
type ActionType = "mark_published" | "log_decision" | "incident_resolved" | null;

type ImageAttachment = {
  data: string;
  media_type: "image/png" | "image/jpeg" | "image/gif" | "image/webp";
  preview: string;
};

type DrawerResult = {
  wing: string;
  filename: string;
  path: string;
  tags: string[];
  date: string;
  content: string;
  score: number;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: ImageAttachment;
  timestamp: string;
  mempalaceSources?: string[];
  graphifySources?: string[];
  searchResults?: DrawerResult[];
  searchQuery?: string;
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

const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

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

function extractCitations(text: string): string[] {
  const matches = [...text.matchAll(/\[([a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+)\]/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

function extractGraphifyCitations(text: string): string[] {
  const matches = [...text.matchAll(/\[G:([a-zA-Z0-9_-]+)\]/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

async function processImageFile(file: File): Promise<ImageAttachment | null> {
  if (file.size > 5 * 1024 * 1024) return null;
  if (!VALID_IMAGE_TYPES.includes(file.type)) return null;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64Data = dataUrl.split(",")[1];
      resolve({
        data: base64Data,
        media_type: file.type as ImageAttachment["media_type"],
        preview: dataUrl,
      });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
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

  const set = (k: string, v: string) => setFields((f: Record<string, string>) => ({ ...f, [k]: v }));

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

type DrawerPopupState = {
  ref: string; // "wing/filename"
  content: string | null;
  loading: boolean;
};

function DrawerPopup({
  popup,
  accentColor,
  onClose,
}: {
  popup: DrawerPopupState;
  accentColor: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[80vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "#0f1117",
          border: `1px solid ${accentColor}30`,
          boxShadow: `0 0 40px ${accentColor}15`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] font-mono" style={{ color: accentColor }}>
            [{popup.ref}]
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <X size={12} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {popup.loading ? (
            <div className="text-[11px] font-mono text-slate-600 animate-pulse">Chargement…</div>
          ) : popup.content ? (
            <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
              {popup.content}
            </pre>
          ) : (
            <div className="text-[11px] font-mono text-slate-600">Drawer introuvable.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchResults({
  results,
  query,
  accentColor,
  onDrawerClick,
}: {
  results: DrawerResult[];
  query: string;
  accentColor: string;
  onDrawerClick: (ref: string, content: string) => void;
}) {
  if (results.length === 0) {
    return (
      <div className="text-[11px] font-mono text-slate-600">
        Aucun drawer trouvé pour &quot;{query}&quot;.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-[9px] font-mono text-slate-600 mb-3">
        {results.length} RÉSULTAT{results.length > 1 ? "S" : ""} — &quot;{query}&quot;
      </div>
      {results.map((d, i) => (
        <button
          key={`${d.wing}/${d.filename}`}
          onClick={() => onDrawerClick(`${d.wing}/${d.filename}`, d.content)}
          className="w-full text-left p-3 rounded-xl transition-all hover:opacity-90"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${accentColor}20`,
          }}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="text-[10px] font-mono" style={{ color: accentColor }}>
              [{d.wing}/{d.filename}]
            </span>
            <span className="text-[9px] font-mono text-slate-700 shrink-0">
              #{i + 1} · {Math.round((1 - d.score) * 100)}%
            </span>
          </div>
          {d.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {d.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[8px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: `${accentColor}10`, color: accentColor, opacity: 0.7 }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
            {d.content.slice(0, 200)}
            {d.content.length > 200 ? "…" : ""}
          </p>
          {d.date && (
            <div className="text-[8px] font-mono text-slate-700 mt-1">{d.date}</div>
          )}
        </button>
      ))}
    </div>
  );
}

type Props = {
  persona: Persona;
  mode?: Mode;
  onAction?: () => void;
  fileContext?: { name: string; content: string } | null;
  onFileContextClear?: () => void;
  graphifyPrefill?: string | null;
  onGraphifyPrefillClear?: () => void;
};

export function Chat({ persona, mode = "normal", onAction, fileContext, onFileContextClear, graphifyPrefill, onGraphifyPrefillClear }: Props) {
  const colors = PERSONA_COLORS[persona];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [lastActionDone, setLastActionDone] = useState(false);
  const [pendingImage, setPendingImage] = useState<ImageAttachment | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [imageSizeError, setImageSizeError] = useState(false);
  const [drawerPopup, setDrawerPopup] = useState<DrawerPopupState | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeAction]);

  useEffect(() => {
    if (graphifyPrefill) {
      setInput(graphifyPrefill);
      onGraphifyPrefillClear?.();
      textareaRef.current?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphifyPrefill]);

  // Load persisted history on mount and when persona/mode changes
  useEffect(() => {
    let cancelled = false;
    async function loadHistory() {
      try {
        const res = await fetch(`/api/chat/history?persona=${persona}&mode=${mode}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          conversation_id: string | null;
          messages: Array<{
            id: string;
            role: "user" | "assistant" | "system";
            content: string;
            image_media_type?: string | null;
            image_data?: string | null;
            created_at: string;
          }>;
        };
        if (cancelled) return;
        if (data.messages && data.messages.length > 0) {
          const rehydrated: Message[] = data.messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({
              id: m.id,
              role: m.role as "user" | "assistant",
              content: m.content,
              timestamp: new Date(m.created_at).toLocaleString("fr-FR", {
                timeZone: "Europe/Paris",
                hour: "2-digit",
                minute: "2-digit",
              }),
              ...(m.image_data && m.image_media_type
                ? {
                    image: {
                      data: m.image_data,
                      media_type: m.image_media_type as ImageAttachment["media_type"],
                      preview: `data:${m.image_media_type};base64,${m.image_data}`,
                    },
                  }
                : {}),
            }));
          setMessages(rehydrated);
        } else {
          setMessages([]);
        }
        setHistoryLoaded(true);
      } catch (err) {
        console.error("[Chat] history load failed:", err);
        setHistoryLoaded(true);
      }
    }
    loadHistory();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona, mode]);

  const attachImage = useCallback(async (file: File) => {
    setImageSizeError(false);
    if (file.size > 5 * 1024 * 1024) {
      setImageSizeError(true);
      return;
    }
    const img = await processImageFile(file);
    if (img) setPendingImage(img);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!(e.currentTarget as Node).contains(e.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
    if (file) await attachImage(file);
  }, [attachImage]);

  const handlePaste = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (file) await attachImage(file);
    }
  }, [attachImage]);

  const openDrawer = useCallback(async (ref: string, preloadedContent?: string) => {
    if (preloadedContent !== undefined) {
      setDrawerPopup({ ref, content: preloadedContent, loading: false });
      return;
    }
    setDrawerPopup({ ref, content: null, loading: true });
    const [wing, filename] = ref.split("/");
    const path = `brain/mempalace/wings/${wing}/drawers/${filename}.md`;
    try {
      const res = await fetch(`/api/file?path=${encodeURIComponent(path)}`);
      if (!res.ok) throw new Error("not found");
      const text = await res.text();
      setDrawerPopup({ ref, content: text, loading: false });
    } catch {
      setDrawerPopup({ ref, content: null, loading: false });
    }
  }, []);

  const sendSearch = useCallback(async (rawText: string) => {
    let query = "";
    let wing: string | undefined;

    if (rawText.startsWith("/wing ")) {
      const parts = rawText.slice(6).trim().split(/\s+/);
      wing = parts[0];
      query = parts.slice(1).join(" ");
    } else if (rawText.startsWith("/search ")) {
      query = rawText.slice(8).trim();
    }

    if (!query) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: rawText,
      timestamp: getCESTTime(),
    };
    const assistantId = uid();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: getCESTTime(),
      searchQuery: query,
      searchResults: undefined,
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsStreaming(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, wing, limit: 5 }),
      });
      const data = await res.json() as { drawers?: DrawerResult[]; error?: string };
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, searchResults: data.drawers ?? [], searchQuery: query }
            : m
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `[Erreur recherche: ${(err as Error).message}]`, searchResults: [] }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const send = async () => {
    const text = input.trim();
    if ((!text && !pendingImage) || isStreaming) return;

    if (text.startsWith("/search ") || text.startsWith("/wing ")) {
      await sendSearch(text);
      return;
    }

    const imageToSend = pendingImage;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      image: imageToSend || undefined,
      timestamp: getCESTTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPendingImage(null);
    setImageSizeError(false);
    setIsStreaming(true);
    setActiveAction(null);
    setLastActionDone(false);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const assistantId = uid();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: getCESTTime(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const messageWithContext = fileContext
        ? `[Contexte fichier: ${fileContext.name}]\n\`\`\`\n${fileContext.content.slice(0, 2500)}\n\`\`\`\n\n${text || "Analyse ce fichier."}`
        : (text || "Analyse cette image.");

      const body: Record<string, unknown> = {
        persona,
        mode,
        message: messageWithContext,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      };

      if (imageToSend) {
        body.image = {
          data: imageToSend.data,
          media_type: imageToSend.media_type,
        };
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        );
      }

      // Extract MemPalace citations from final response
      const citations = extractCitations(fullText);
      const graphifyCitations = extractGraphifyCitations(fullText);
      if (citations.length > 0 || graphifyCitations.length > 0) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  ...(citations.length > 0 ? { mempalaceSources: citations } : {}),
                  ...(graphifyCitations.length > 0 ? { graphifySources: graphifyCitations } : {}),
                }
              : m
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
    { type: "mark_published", label: "✅ Publié" },
    { type: "log_decision", label: "📋 Décision" },
    { type: "incident_resolved", label: "🔧 Résolu" },
  ];

  const canSend = !isStreaming && (!!input.trim() || !!pendingImage);

  return (
    <>
      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="screenshot agrandi"
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={() => setLightboxSrc(null)}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Drawer popup */}
      {drawerPopup && (
        <DrawerPopup
          popup={drawerPopup}
          accentColor={colors.primary}
          onClose={() => setDrawerPopup(null)}
        />
      )}

      <div
        className="flex flex-col h-full relative"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drag overlay */}
        {isDraggingOver && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-xl pointer-events-none"
            style={{
              background: colors.bg,
              border: `2px dashed ${colors.primary}`,
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="text-center">
              <ImageIcon
                size={28}
                className="mx-auto mb-2"
                style={{ color: colors.primary, opacity: 0.8 }}
              />
              <p className="text-sm font-mono" style={{ color: colors.primary }}>
                Drop your screenshot here
              </p>
            </div>
          </div>
        )}

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
                <p className="text-slate-400 text-sm">
                  JARVIS en attente. Que faites-vous aujourd&apos;hui ?
                </p>
                <p className="text-slate-500 text-[12px] mt-2">
                  Drag & drop ou Ctrl+V pour coller un screenshot
                </p>
                <p className="text-slate-500 text-[12px] mt-1 font-mono">
                  /search &lt;query&gt; · /wing &lt;wing&gt; &lt;query&gt;
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
                    {msg.image && (
                      <button
                        className="block mb-2 rounded-lg overflow-hidden cursor-zoom-in"
                        onClick={() => setLightboxSrc(msg.image!.preview)}
                      >
                        <img
                          src={msg.image.preview}
                          alt="screenshot"
                          className="max-w-full rounded-lg object-cover"
                          style={{ maxHeight: "200px" }}
                        />
                      </button>
                    )}

                    {/* Search results */}
                    {msg.searchResults !== undefined ? (
                      <SearchResults
                        results={msg.searchResults}
                        query={msg.searchQuery ?? ""}
                        accentColor={colors.primary}
                        onDrawerClick={(ref, content) => openDrawer(ref, content)}
                      />
                    ) : (
                      <>
                        {msg.content}
                        {msg.role === "assistant" && msg.content === "" && isStreaming && (
                          <span
                            className="inline-block w-1 h-3 ml-0.5 animate-pulse"
                            style={{ background: colors.primary }}
                          />
                        )}
                      </>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-slate-700 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>

              {/* MemPalace sources — below assistant bubble */}
              {msg.role === "assistant" &&
                msg.mempalaceSources &&
                msg.mempalaceSources.length > 0 && (
                  <div className="ml-9 mt-1.5 flex flex-wrap gap-1.5">
                    {msg.mempalaceSources.map((ref) => (
                      <button
                        key={ref}
                        onClick={() => openDrawer(ref)}
                        className="text-[9px] font-mono px-2 py-1 rounded-lg transition-all hover:opacity-100"
                        style={{
                          background: `${colors.primary}10`,
                          border: `1px solid ${colors.primary}25`,
                          color: colors.primary,
                          opacity: 0.75,
                        }}
                      >
                        [{ref}]
                      </button>
                    ))}
                  </div>
                )}

              {/* Graphify concept sources */}
              {msg.role === "assistant" &&
                msg.graphifySources &&
                msg.graphifySources.length > 0 && (
                  <div className="ml-9 mt-1 flex flex-wrap gap-1.5">
                    <span className="text-[8px] font-mono text-slate-700 self-center">⬡</span>
                    {msg.graphifySources.map((id) => (
                      <span
                        key={id}
                        className="text-[9px] font-mono px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(155,143,255,0.1)",
                          border: "1px solid rgba(155,143,255,0.2)",
                          color: "#9b8fff",
                          opacity: 0.85,
                        }}
                      >
                        {id}
                      </span>
                    ))}
                  </div>
                )}

              {/* Action buttons — last assistant message only, after streaming done */}
              {msg.role === "assistant" &&
                msg.searchResults === undefined &&
                idx === lastAssistantIdx &&
                !isStreaming &&
                msg.content && (
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

        {/* Input area */}
        <div
          className="px-6 py-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          {/* File context banner */}
          {fileContext && (
            <div
              className="flex items-center justify-between gap-2 mb-2 px-2 py-1.5 rounded text-[9px] font-mono"
              style={{
                background: `${colors.bg}`,
                border: `1px solid ${colors.border}`,
                color: colors.primary,
              }}
            >
              <span>📄 {fileContext.name}</span>
              <button
                onClick={onFileContextClear}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          )}

          {/* Image preview */}
          {pendingImage && (
            <div className="flex items-start gap-2 mb-3">
              <div className="relative inline-block">
                <img
                  src={pendingImage.preview}
                  alt="preview"
                  className="h-16 rounded-lg object-cover"
                  style={{ maxWidth: "160px" }}
                />
                <button
                  onClick={() => { setPendingImage(null); setImageSizeError(false); }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#94a3b8",
                    fontSize: "8px",
                  }}
                >
                  ✕
                </button>
              </div>
              <span className="text-[9px] font-mono text-slate-600 pt-1">
                {pendingImage.media_type.split("/")[1].toUpperCase()}
              </span>
            </div>
          )}

          {imageSizeError && (
            <div className="text-[10px] font-mono mb-2" style={{ color: "#f06464" }}>
              Image trop grande (max 5 MB)
            </div>
          )}

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
              onPaste={handlePaste}
              placeholder={
                pendingImage
                  ? "Message accompagnant l'image… (optionnel)"
                  : "Message JARVIS… (⏎ envoyer · /search query · /wing wing query)"
              }
              disabled={isStreaming}
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 resize-none outline-none leading-relaxed"
              style={{ maxHeight: "120px" }}
            />
            <button
              onClick={send}
              disabled={!canSend}
              className="flex-none w-7 h-7 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: canSend ? colors.bg : "transparent",
                border: `1px solid ${canSend ? colors.border : "rgba(255,255,255,0.06)"}`,
                color: canSend ? colors.primary : "#334155",
                cursor: !canSend ? "not-allowed" : "pointer",
              }}
            >
              {isStreaming ? (
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: colors.primary }} />
              ) : (
                <Send size={12} />
              )}
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isStreaming}
              className="flex items-center gap-1.5 text-[12px] font-mono px-3 py-1.5 rounded-lg transition-all min-h-[32px]"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.primary,
                cursor: isStreaming ? "not-allowed" : "pointer",
                opacity: isStreaming ? 0.5 : 1,
              }}
            >
              <Paperclip size={12} />
              Joindre image
            </button>
            <div className="text-[11px] text-slate-500">
              Envoyer (⏎) · Drag & drop · Ctrl+V
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) await attachImage(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </>
  );
}
