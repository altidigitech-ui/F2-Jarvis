"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time} CEST</span>;
}

const ROMAIN_TAGS = ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH", "F2"];
const FABRICE_TAGS = ["TWITTER", "LINKEDIN", "REDDIT", "FACEBOOK", "PH"];

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col z-10">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[var(--color-romain-primary)] animate-pulse-slow" />
          <span className="text-xs font-mono tracking-[0.2em] text-[var(--color-romain-primary)] uppercase">
            Jarvis Online
          </span>
        </div>
        <div className="text-xs font-mono text-slate-500">
          <LiveClock />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-slate-100 mb-3 tracking-tight">
            Bonjour.
          </h1>
          <p className="text-slate-500 text-lg font-mono tracking-wider uppercase text-sm">
            Qui êtes-vous ?
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Romain */}
          <Link href="/romain" className="group block">
            <div
              className="relative glass rounded-2xl p-8 h-full overflow-hidden cursor-pointer
                transition-all duration-300
                hover:border-[rgba(0,255,180,0.25)]
                hover:shadow-[0_0_40px_rgba(0,255,180,0.08)]"
            >
              {/* Accent corner glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,255,180,0.12) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,255,180,0.2), rgba(0,184,144,0.1))",
                    border: "1px solid rgba(0,255,180,0.25)",
                    color: "#00ffb4",
                  }}
                >
                  R
                </div>
                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ color: "#00ffb4" }}
                  >
                    Romain
                  </div>
                  <div className="text-xs text-slate-500">Growth · FoundryTwo</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Distribution, CRO, e-commerce & agences. 30 interactions/jour.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {ROMAIN_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded tracking-widest"
                    style={{
                      background: "rgba(0,255,180,0.06)",
                      border: "1px solid rgba(0,255,180,0.15)",
                      color: "#00b890",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="mt-6 flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#00ffb4" }}
              >
                <span>ACCÉDER</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* Fabrice */}
          <Link href="/fabrice" className="group block">
            <div
              className="relative glass rounded-2xl p-8 h-full overflow-hidden cursor-pointer
                transition-all duration-300
                hover:border-[rgba(155,143,255,0.25)]
                hover:shadow-[0_0_40px_rgba(155,143,255,0.08)]"
            >
              {/* Accent corner glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle, rgba(155,143,255,0.12) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(155,143,255,0.2), rgba(109,95,224,0.1))",
                    border: "1px solid rgba(155,143,255,0.25)",
                    color: "#9b8fff",
                  }}
                >
                  F
                </div>
                <div>
                  <div
                    className="text-base font-semibold"
                    style={{ color: "#9b8fff" }}
                  >
                    Fabrice
                  </div>
                  <div className="text-xs text-slate-500">
                    Builder · FoundryTwo
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Infra technique, SaaS, e-commerce & content creators. 30 interactions/jour.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {FABRICE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded tracking-widest"
                    style={{
                      background: "rgba(155,143,255,0.06)",
                      border: "1px solid rgba(155,143,255,0.15)",
                      color: "#6d5fe0",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="mt-6 flex items-center gap-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#9b8fff" }}
              >
                <span>ACCÉDER</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-[10px] font-mono tracking-[0.25em] text-slate-700 uppercase">
        FoundryTwo · La Toile Invisible
      </footer>
    </div>
  );
}
