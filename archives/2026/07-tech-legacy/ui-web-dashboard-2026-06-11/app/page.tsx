import { Activity, DollarSign, GitBranch, MessageSquare, Package } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-10">
      <header className="border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Overview F2</h1>
        <p className="text-neutral-400 mt-2 font-mono text-sm">
          Dashboard interne F2-JARVIS · {new Date().toLocaleDateString("fr-FR", { dateStyle: "full" })}
        </p>
      </header>

      {/* Stat cards — données à câbler via API routes lisant le repo */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="MRR cumulé F2"
          value="420 €"
          hint="avril 2026"
          icon={<DollarSign size={18} />}
        />
        <StatCard
          label="SaaS actifs"
          value="1"
          hint="5 en pipeline"
          icon={<Package size={18} />}
        />
        <StatCard
          label="Commits 7j"
          value="—"
          hint="câbler git log"
          icon={<GitBranch size={18} />}
        />
        <StatCard
          label="Propositions Ouroboros"
          value="—"
          hint="à reviewer"
          icon={<MessageSquare size={18} />}
        />
      </section>

      {/* SaaS list */}
      <section>
        <h2 className="text-xl font-semibold mb-4">SaaS F2</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SaasCard name="Leak Detector" status="live" mrr="420 €" />
          <SaasCard name="StoreMD" status="transformation" mrr="—" />
          <SaasCard name="PayloadDiff" status="queue" mrr="—" />
          <SaasCard name="ContentForge" status="concept" mrr="—" />
          <SaasCard name="F2 Ops Hub" status="docs-ready" mrr="—" />
          <SaasCard name="VideoForge" status="archi" mrr="—" />
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction href="/morning" label="Brief du jour" />
          <QuickAction href="/budget" label="Voir budget" />
          <QuickAction href="/proposals" label="Review Ouroboros" />
          <QuickAction href="/graph" label="Knowledge graph" />
        </div>
      </section>

      <footer className="pt-8 border-t border-neutral-800 text-xs text-neutral-500 font-mono">
        <p>F2-JARVIS v1.0 · CEST · Max 5x plan</p>
        <p className="mt-1">
          No fake stats · No fake testimonials · Paraphrase &gt; Cite
        </p>
      </footer>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-400 uppercase tracking-wide">{label}</span>
        <span className="text-neutral-500">{icon}</span>
      </div>
      <div className="text-2xl font-bold font-mono-num">{value}</div>
      <div className="text-xs text-neutral-500 mt-1">{hint}</div>
    </div>
  );
}

function SaasCard({ name, status, mrr }: { name: string; status: string; mrr: string }) {
  const statusColor: Record<string, string> = {
    live: "text-accent-green",
    transformation: "text-accent-amber",
    queue: "text-neutral-400",
    concept: "text-neutral-500",
    "docs-ready": "text-neutral-400",
    archi: "text-neutral-400",
  };
  return (
    <div className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        <span className={`text-xs font-mono ${statusColor[status] ?? "text-neutral-400"}`}>
          {status}
        </span>
      </div>
      <div className="mt-2 text-sm text-neutral-400">
        MRR : <span className="font-mono-num text-neutral-200">{mrr}</span>
      </div>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-neutral-800 p-4 text-center text-sm hover:bg-neutral-900 hover:border-primary-500 transition-colors"
    >
      {label}
    </a>
  );
}
