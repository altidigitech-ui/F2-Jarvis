"use client";

import { useState } from "react";
import { Copy, Check, Languages } from "lucide-react";

type Props = {
  type: string;
  content: string;
  contentFr?: string;
  accentColor: string;
};

export function ContentCard({ type, content, contentFr, accentColor }: Props) {
  const [copied, setCopied] = useState(false);
  const [showFr, setShowFr] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const charCount = content.length;
  const platformHint = (() => {
    if (type.includes("twitter") || type.includes("tw")) return "Twitter";
    if (type.includes("linkedin") || type.includes("li")) return "LinkedIn";
    if (type.includes("reddit")) return "Reddit";
    if (type.includes("cold")) return "Cold";
    return type;
  })();

  return (
    <div
      className="mt-2 rounded-xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${accentColor}25`,
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: `${accentColor}20` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              background: `${accentColor}15`,
              color: accentColor,
            }}
          >
            {platformHint}
          </span>
          <span className="text-[9px] font-mono text-slate-600">{charCount} car.</span>
        </div>
        <div className="flex items-center gap-1">
          {contentFr && (
            <button
              onClick={() => setShowFr((v) => !v)}
              className="text-[9px] font-mono px-2 py-1 rounded transition-colors flex items-center gap-1"
              style={{
                background: showFr ? `${accentColor}20` : "rgba(255,255,255,0.03)",
                color: showFr ? accentColor : "#94a3b8",
              }}
              title="Afficher / masquer la traduction FR"
            >
              <Languages size={10} />
              FR
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="text-[10px] font-mono px-2 py-1 rounded transition-colors flex items-center gap-1"
            style={{
              background: copied ? `${accentColor}20` : "rgba(255,255,255,0.03)",
              color: copied ? accentColor : "#94a3b8",
            }}
          >
            {copied ? (
              <>
                <Check size={10} />
                Copié
              </>
            ) : (
              <>
                <Copy size={10} />
                Copier
              </>
            )}
          </button>
        </div>
      </div>

      <div className="px-3 py-2.5">
        <pre className="text-[12px] text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
          {content}
        </pre>

        {showFr && contentFr && (
          <div
            className="mt-2 pt-2 border-t text-[11px] text-slate-500 leading-relaxed whitespace-pre-wrap"
            style={{ borderColor: `${accentColor}15` }}
          >
            <div
              className="text-[9px] font-mono uppercase tracking-wider mb-1"
              style={{ color: accentColor, opacity: 0.6 }}
            >
              Traduction FR
            </div>
            {contentFr}
          </div>
        )}
      </div>
    </div>
  );
}
