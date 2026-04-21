"use client";

type Props = {
  label: string;
  value: number;
  target: number;
  accentColor: string;
  onClick?: () => void;
};

export function CounterTile({ label, value, target, accentColor, onClick }: Props) {
  const pct = target > 0 ? Math.min(100, (value / target) * 100) : 0;
  const isComplete = value >= target && target > 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="w-full text-left rounded-lg p-2.5 transition-all"
      style={{
        background: isComplete ? `${accentColor}10` : "rgba(255,255,255,0.02)",
        border: `1px solid ${isComplete ? accentColor + "40" : "rgba(255,255,255,0.05)"}`,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[10px] text-slate-400 font-mono">{label}</span>
        <span
          className="text-[13px] font-mono font-semibold"
          style={{ color: isComplete ? accentColor : "#94a3b8" }}
        >
          {value}/{target}
        </span>
      </div>
      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: accentColor }}
        />
      </div>
    </button>
  );
}
