"use client";
import { useState, useEffect } from "react";

type Props = {
  filePath: string | null;
  accentColor: string;
  onClose: () => void;
};

export function FileViewerModal({ filePath, accentColor, onClose }: Props) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filePath) return;
    setLoading(true);
    setError(null);
    fetch(`/api/file?path=${encodeURIComponent(filePath)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setContent(data.content || "");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [filePath]);

  if (!filePath) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-lg overflow-hidden"
        style={{
          background: "#0a0a0f",
          border: `1px solid ${accentColor}30`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[14px]">📄</span>
            <span className="font-mono text-[12px] text-slate-300">{filePath}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-200 text-[18px] leading-none px-2"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading && <div className="text-slate-500 text-[12px]">Chargement…</div>}
          {error && <div className="text-red-400 text-[12px]">Erreur : {error}</div>}
          {content && (
            <pre className="text-[12px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
              {content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
