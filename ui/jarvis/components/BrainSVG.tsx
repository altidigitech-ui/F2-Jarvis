"use client";

type Props = { color: string };

export function BrainSVG({ color }: Props) {
  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 animate-pulse-slow"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring slow spin */}
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="4 8"
          opacity="0.3"
          style={{ transformOrigin: "60px 60px", animation: "spin-slow 25s linear infinite" }}
        />
        {/* Middle ring */}
        <circle
          cx="60"
          cy="60"
          r="40"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.2"
        />
        {/* Core */}
        <circle
          cx="60"
          cy="60"
          r="6"
          fill={color}
          opacity="0.6"
        />
        {/* Neural lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + Math.cos(rad) * 8;
          const y1 = 60 + Math.sin(rad) * 8;
          const x2 = 60 + Math.cos(rad) * 36;
          const y2 = 60 + Math.sin(rad) * 36;
          const mx = 60 + Math.cos(rad + 0.3) * 22;
          const my = 60 + Math.sin(rad + 0.3) * 22;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.25"
            />
          );
        })}
        {/* Nodes on ring */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 60 + Math.cos(rad) * 40;
          const y = 60 + Math.sin(rad) * 40;
          return (
            <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.4" />
          );
        })}
      </svg>

      {/* Glow under */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}18 0%, transparent 65%)`,
        }}
      />
    </div>
  );
}
