export default function ProposalsPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-bold">Propositions Ouroboros</h1>
        <p className="text-neutral-400 mt-2 font-mono text-sm">
          À reviewer · accept / reject / defer / ignore
        </p>
      </header>

      {/* Liste à câbler : API route lit brain/ouroboros/proposals/*.md */}
      <div className="rounded-lg border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
        <p className="text-sm">
          Cette page liste les fichiers de <code className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded">brain/ouroboros/proposals/</code> hors archive.
        </p>
        <p className="text-xs mt-2">
          À câbler : API route Next.js qui lit le dossier et permet accept / reject / defer / ignore.
        </p>
      </div>

      {/* Exemple de proposition mockée */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Exemple de proposition</h2>
        <ProposalCard
          date="2026-04-17"
          title="Incohérence CAC StoreMD"
          priority="haute"
          summary="Le rapport marketing Q1 donne un CAC Leak Detector de 32€, alors que le plan budget Romain suppose un CAC < 25€. Recommandation : recalculer le budget ads avec le CAC réel."
        />
      </section>

      <footer className="text-xs text-neutral-500 font-mono">
        <p>Rappel : Ouroboros propose, ne commit pas. Voir brain/ouroboros/bible.md.</p>
      </footer>
    </div>
  );
}

function ProposalCard({
  date,
  title,
  priority,
  summary,
}: {
  date: string;
  title: string;
  priority: "faible" | "moyenne" | "haute";
  summary: string;
}) {
  const priorityColor = {
    faible: "text-neutral-400",
    moyenne: "text-accent-amber",
    haute: "text-accent-red",
  }[priority];

  return (
    <div className="rounded-lg border border-neutral-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-neutral-500 font-mono">{date}</p>
        </div>
        <span className={`text-xs font-mono uppercase ${priorityColor}`}>{priority}</span>
      </div>
      <p className="text-sm text-neutral-300 mb-4">{summary}</p>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 text-xs rounded border border-accent-green text-accent-green hover:bg-accent-green/10">
          Accept
        </button>
        <button className="px-3 py-1.5 text-xs rounded border border-accent-red text-accent-red hover:bg-accent-red/10">
          Reject
        </button>
        <button className="px-3 py-1.5 text-xs rounded border border-neutral-700 text-neutral-400 hover:bg-neutral-900">
          Defer
        </button>
        <button className="px-3 py-1.5 text-xs rounded border border-neutral-800 text-neutral-500 hover:bg-neutral-900">
          Ignore
        </button>
      </div>
    </div>
  );
}
