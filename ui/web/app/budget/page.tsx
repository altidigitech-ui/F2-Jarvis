export default function BudgetPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-bold">Budget F2-JARVIS</h1>
        <p className="text-neutral-400 mt-2 font-mono text-sm">
          Plan Max 5x ($100/mois) + extra usage incrémental
        </p>
      </header>

      {/* KPI row — à câbler avec API route lisant ops/budget/history.csv */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Gauge label="Max 5x usage (week)" value="42%" sub="Plan inclus" tone="green" />
        <Gauge label="Extra usage (month)" value="4.20 € / 30 €" sub="projection ~9 €" tone="green" />
        <Gauge label="Kill-switches" value="0 actifs" sub="tous off" tone="green" />
      </section>

      {/* Par service */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Par service</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 text-left">
              <th className="py-2">Service</th>
              <th className="py-2 text-right">Utilisé</th>
              <th className="py-2 text-right">Cap</th>
              <th className="py-2 text-right">%</th>
            </tr>
          </thead>
          <tbody className="font-mono-num">
            <TableRow service="Claude Code" used="0 €" cap="inclus" pct="—" />
            <TableRow service="Ouroboros" used="3.10 €" cap="10 €" pct="31%" />
            <TableRow service="Graphify" used="0.80 €" cap="5 €" pct="16%" />
            <TableRow service="MemPalace" used="0 €" cap="2 €" pct="0%" />
            <TableRow service="MCP externes" used="0.30 €" cap="8 €" pct="4%" />
            <TableRow service="Buffer" used="0 €" cap="5 €" pct="0%" />
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Par modèle</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 text-left">
              <th className="py-2">Modèle</th>
              <th className="py-2 text-right">Utilisé</th>
              <th className="py-2 text-right">Cap</th>
            </tr>
          </thead>
          <tbody className="font-mono-num">
            <TableRow service="Haiku 4.5" used="2.10 €" cap="10 €" pct="21%" />
            <TableRow service="Sonnet 4.6" used="2.10 €" cap="15 €" pct="14%" />
            <TableRow service="Opus 4.6/4.7" used="0 €" cap="5 €" pct="0%" />
          </tbody>
        </table>
      </section>

      <footer className="text-xs text-neutral-500 font-mono">
        <p>Source : ops/budget/history.csv · Règles : ops/budget/limits.yaml</p>
        <p className="mt-1">
          Auto-actions : kill-switch Ouroboros à 90% du cap mensuel, global à 100%.
        </p>
      </footer>
    </div>
  );
}

function Gauge({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "green" | "amber" | "red";
}) {
  const toneClass = {
    green: "text-accent-green",
    amber: "text-accent-amber",
    red: "text-accent-red",
  }[tone];
  return (
    <div className="rounded-lg border border-neutral-800 p-5">
      <div className="text-xs text-neutral-400 uppercase tracking-wide mb-2">{label}</div>
      <div className={`text-2xl font-bold font-mono-num ${toneClass}`}>{value}</div>
      <div className="text-xs text-neutral-500 mt-1">{sub}</div>
    </div>
  );
}

function TableRow({
  service,
  used,
  cap,
  pct,
}: {
  service: string;
  used: string;
  cap: string;
  pct: string;
}) {
  return (
    <tr className="border-b border-neutral-900">
      <td className="py-2 text-neutral-200 font-sans">{service}</td>
      <td className="py-2 text-right">{used}</td>
      <td className="py-2 text-right text-neutral-400">{cap}</td>
      <td className="py-2 text-right text-neutral-500">{pct}</td>
    </tr>
  );
}
