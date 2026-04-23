"use client";

import { MessageSquare, Calendar, BarChart2, Menu } from "lucide-react";

export type MobilePanel = "timeline" | "counters" | "menu" | null;

type Props = {
  accentColor: string;
  activePanel: MobilePanel;
  onToggle: (panel: MobilePanel) => void;
};

export function MobileNav({ accentColor, activePanel, onToggle }: Props) {
  const items: Array<{
    id: "chat" | "timeline" | "counters" | "menu";
    icon: typeof MessageSquare;
    label: string;
  }> = [
    { id: "chat", icon: MessageSquare, label: "Chat" },
    { id: "timeline", icon: Calendar, label: "Timeline" },
    { id: "counters", icon: BarChart2, label: "Compteurs" },
    { id: "menu", icon: Menu, label: "Menu" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-inset-bottom"
      style={{ background: "#020612", borderTop: `1px solid ${accentColor}20` }}
    >
      <div className="flex items-center justify-around h-14 px-2">
        {items.map(({ id, icon: Icon, label }) => {
          const isChat = id === "chat";
          const isActive = isChat ? activePanel === null : activePanel === id;
          return (
            <button
              key={id}
              onClick={() => {
                if (isChat) {
                  onToggle(null);
                } else {
                  onToggle(activePanel === id ? null : (id as MobilePanel));
                }
              }}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-all min-h-[44px] justify-center"
              style={{ color: isActive ? accentColor : "#475569" }}
            >
              <Icon size={18} />
              <span className="text-[9px] font-mono tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
