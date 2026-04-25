"use client";
import { useState } from "react";

type Persona = "romain" | "fabrice";

type QuickAccessSidebarProps = {
  persona: Persona;
  accentColor: string;
  weekNumber?: number;
  onOpenPlanHebdo: () => void;
  onOpenPostsBatch: () => void;
  onOpenCrossEngagement: () => void;
  onOpenColdOutreach: () => void;
  onOpenProgress: () => void;
  onOpenToday?: () => void;
  onOpenPrompts?: () => void;
  onOpenUtmLinks?: () => void;
};

const ICONS = {
  today: "📅",
  plan: "🗓",
  posts: "📝",
  cross: "🔄",
  cold: "📩",
  progress: "📊",
  prompts: "📋",
  utm: "🔗",
};

export function QuickAccessSidebar({
  accentColor,
  weekNumber,
  onOpenPlanHebdo,
  onOpenPostsBatch,
  onOpenCrossEngagement,
  onOpenColdOutreach,
  onOpenProgress,
  onOpenToday,
  onOpenPrompts,
  onOpenUtmLinks,
}: QuickAccessSidebarProps) {
  const [active, setActive] = useState<string>("today");

  const planLabel = weekNumber ? `Plan semaine ${weekNumber}` : "Plan semaine";

  const items = [
    {
      id: "today",
      label: "Aujourd'hui",
      icon: ICONS.today,
      onClick: onOpenToday ?? (() => window.scrollTo({ top: 0, behavior: "smooth" })),
    },
    { id: "plan", label: planLabel, icon: ICONS.plan, onClick: onOpenPlanHebdo },
    { id: "posts", label: "Posts batchés", icon: ICONS.posts, onClick: onOpenPostsBatch },
    { id: "cross", label: "Cross-engagement", icon: ICONS.cross, onClick: onOpenCrossEngagement },
    { id: "cold", label: "Cold outreach", icon: ICONS.cold, onClick: onOpenColdOutreach },
    { id: "progress", label: "Progress semaine", icon: ICONS.progress, onClick: onOpenProgress },
    { id: "prompts", label: "Prompts", icon: ICONS.prompts, onClick: onOpenPrompts ?? (() => {}) },
    { id: "utm", label: "Liens UTM", icon: ICONS.utm, onClick: onOpenUtmLinks ?? (() => {}) },
  ];

  return (
    <div className="flex-1 px-3 pb-4">
      <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-3 px-1">
        Accès rapide
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                item.onClick();
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] text-left transition-all"
              style={{
                background: isActive ? `${accentColor}15` : "transparent",
                color: isActive ? accentColor : "#94a3b8",
                border: `1px solid ${isActive ? accentColor + "30" : "transparent"}`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span className="text-[14px]">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
