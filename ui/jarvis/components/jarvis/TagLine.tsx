"use client";

type Props = {
  tags: string[];
  accentColor: string;
  onTagClick: (label: string) => void;
};

export function TagLine({ tags, accentColor, onTagClick }: Props) {
  if (tags.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tags.map((t, i) => (
        <button
          key={i}
          onClick={() => onTagClick(t)}
          className="text-[10px] font-mono px-2.5 py-1 rounded-full transition-all hover:opacity-100"
          style={{
            background: `${accentColor}10`,
            border: `1px solid ${accentColor}25`,
            color: accentColor,
            opacity: 0.8,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
