import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F2-JARVIS",
  description: "OS interne de FoundryTwo. Un repo unique pour tout faire.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body>
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1 p-6 md:p-10 max-w-[1400px] mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function Sidebar() {
  return (
    <aside className="w-56 border-r border-neutral-800 p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-lg font-bold tracking-tight">F2-JARVIS</h1>
        <p className="text-xs text-neutral-400 font-mono">v1.0</p>
      </div>
      <nav className="space-y-1 text-sm">
        <NavLink href="/">Overview</NavLink>
        <NavLink href="/morning">/morning</NavLink>
        <NavLink href="/status">/status</NavLink>
        <NavLink href="/budget">Budget</NavLink>
        <NavLink href="/proposals">Propositions</NavLink>
        <NavLink href="/graph">Graph</NavLink>
        <NavLink href="/timeline">Timeline</NavLink>
        <NavLink href="/mempalace">MemPalace</NavLink>
        <NavLink href="/saas">SaaS</NavLink>
      </nav>
      <div className="mt-8 pt-8 border-t border-neutral-800 text-xs text-neutral-500">
        <p>Zéro fake stats.</p>
        <p>Build in public.</p>
      </div>
    </aside>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block px-3 py-2 rounded text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}
