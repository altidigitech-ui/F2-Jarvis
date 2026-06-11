export default function GraphPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-bold">Knowledge Graph</h1>
        <p className="text-neutral-400 mt-2 font-mono text-sm">
          Visualisation interactive de graphify-out/graph.html
        </p>
      </header>

      {/* Embed iframe du graph.html généré par Graphify */}
      <div className="rounded-lg border border-neutral-800 overflow-hidden">
        <iframe
          src="/api/graphify/embed"
          className="w-full h-[600px] bg-neutral-950"
          title="F2-JARVIS knowledge graph"
        />
      </div>

      <p className="text-xs text-neutral-500 font-mono">
        Source : graphify-out/graph.html · Régénéré à chaque commit (hook post-commit-graphify.sh).
      </p>
    </div>
  );
}
