"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, ChevronUp, Upload, Play } from "lucide-react";
import { emitSendToChat } from "@/lib/jarvisEvents";

interface Criterion {
  id: string;
  label: string;
  done: boolean;
}

interface BatchStatus {
  weekN: number;
  weekN1: number;
  criteria: Criterion[];
  completionPct: number;
  analyticsFiles: string[];
}

type Props = {
  accentColor: string;
};

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function BatchCard({ accentColor }: Props) {
  const [status, setStatus] = useState<BatchStatus | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchStatus = useCallback(() => {
    fetch("/api/batch/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setStatus(data as BatchStatus);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const contentBase64 = await readFileAsBase64(file);
      const res = await fetch("/api/batch/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentBase64 }),
      });
      if (res.ok) fetchStatus();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (!status) {
    return (
      <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="text-[12px] text-slate-600 animate-pulse">Chargement batch…</div>
      </div>
    );
  }

  const canGenerate = status.completionPct >= 60;

  return (
    <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold text-slate-500">
            Batch S{status.weekN1}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono" style={{ color: accentColor }}>
              {status.completionPct}%
            </span>
            {expanded ? (
              <ChevronUp size={12} className="text-slate-600" />
            ) : (
              <ChevronDown size={12} className="text-slate-600" />
            )}
          </div>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${status.completionPct}%`,
              background: status.completionPct >= 60 ? accentColor : `${accentColor}70`,
            }}
          />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-1.5">
          {status.criteria.map((c) => (
            <div key={c.id} className="flex items-center gap-2 text-[11px] font-mono">
              <span style={{ color: c.done ? accentColor : "#475569" }}>
                {c.done ? "✓" : "✗"}
              </span>
              <span style={{ color: c.done ? "#94a3b8" : "#475569" }}>
                {c.label}
              </span>
            </div>
          ))}

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-mono py-1.5 rounded-lg transition-all disabled:opacity-50 min-h-[30px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${accentColor}30`,
                color: accentColor,
              }}
            >
              <Upload size={11} />
              {uploading ? "Upload…" : "Analytics"}
            </button>
            <button
              disabled={!canGenerate}
              onClick={() => {
                if (!canGenerate) return;
                emitSendToChat(`Génère le batch S${status.weekN1}`);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-mono py-1.5 rounded-lg transition-all disabled:opacity-30 min-h-[30px]"
              style={{
                background: canGenerate ? `${accentColor}18` : "rgba(255,255,255,0.02)",
                border: `1px solid ${canGenerate ? accentColor + "40" : "rgba(255,255,255,0.05)"}`,
                color: canGenerate ? accentColor : "#475569",
              }}
              title={
                canGenerate
                  ? `Générer batch S${status.weekN1}`
                  : "Compléter les critères d'abord (min. 60%)"
              }
            >
              <Play size={11} />
              Générer
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.csv,.md"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}
