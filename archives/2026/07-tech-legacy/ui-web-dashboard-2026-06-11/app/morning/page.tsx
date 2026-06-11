export default function MorningPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-bold">/morning</h1>
        <p className="text-neutral-400 mt-2 font-mono text-sm">
          Brief du jour — {new Date().toLocaleDateString("fr-FR", { dateStyle: "full" })}
        </p>
      </header>

      {/* Section à câbler via API route qui exécute /morning slash command
          et lit l'output. V1 = placeholder. */}
      <div className="rounded-lg border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
        <p className="text-sm">
          Cette page affiche l'output de la slash command <code className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded">/morning</code>.
        </p>
        <p className="text-xs mt-2">
          À câbler : API route Next.js qui exécute la command et stream le markdown.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Structure attendue du brief</h2>
        <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside">
          <li>Timestamp CEST</li>
          <li>Activité git (F2-JARVIS + submodules SaaS) depuis hier</li>
          <li>État des SaaS (statut 1 ligne par SaaS)</li>
          <li>Propositions Ouroboros à reviewer</li>
          <li>Décisions proposées non validées</li>
          <li>Posts en draft marketing/</li>
          <li>3 priorités recommandées pour la journée</li>
          <li>Rappels : réunions, deadlines, budget</li>
        </ul>
      </section>
    </div>
  );
}
