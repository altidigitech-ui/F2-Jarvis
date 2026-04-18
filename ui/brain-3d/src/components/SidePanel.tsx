import { X } from "lucide-react";
import { useBrainStore } from "../lib/store";

/**
 * Panel latéral droit qui affiche :
 * - Le contenu de la région sélectionnée
 * - Les fichiers pending drop (confirmation classification)
 */
export function SidePanel() {
  const selectedRegion = useBrainStore((s) => s.selectedRegion);
  const setSelectedRegion = useBrainStore((s) => s.setSelectedRegion);
  const pendingDrops = useBrainStore((s) => s.pendingDrops);
  const clearPendingDrops = useBrainStore((s) => s.clearPendingDrops);

  // Pas de région sélectionnée ni de drops → panel hidden
  if (!selectedRegion && pendingDrops.length === 0) {
    return null;
  }

  return (
    <aside className="absolute top-0 right-0 h-full w-full md:w-96 bg-neutral-900/95 backdrop-blur border-l border-neutral-800 p-6 overflow-y-auto z-40">
      {/* Drops pending (priorité) */}
      {pendingDrops.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Files to classify</h2>
            <button
              onClick={clearPendingDrops}
              className="text-neutral-400 hover:text-white"
              aria-label="Clear"
            >
              <X size={18} />
            </button>
          </div>
          <ul className="space-y-2">
            {pendingDrops.map((drop, i) => (
              <li
                key={i}
                className="border border-neutral-800 rounded px-3 py-2 text-sm"
              >
                <div className="font-mono text-xs text-neutral-200 truncate">
                  {drop.filename}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {(drop.size / 1024).toFixed(1)} KB
                </div>
                {drop.classification ? (
                  <div className="text-xs text-primary-500 mt-2">
                    → {drop.classification.regionId} (conf:{" "}
                    {Math.round(drop.classification.confidence * 100)}%)
                  </div>
                ) : (
                  <div className="text-xs text-neutral-500 mt-2 italic">
                    Classifying via Haiku…
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-neutral-500 mt-3">
            API /api/classify à câbler côté backend F2-JARVIS.
          </p>
        </section>
      )}

      {/* Région sélectionnée */}
      {selectedRegion && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold">{selectedRegion.label}</h2>
              <p className="text-xs text-neutral-500 font-mono">
                {selectedRegion.folder}
              </p>
            </div>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-neutral-400 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-sm text-neutral-300 mb-4">
            {selectedRegion.description}
          </p>

          {/* Contenu du dossier à fetcher via /api/list?folder=... */}
          <div className="border border-dashed border-neutral-700 rounded p-4 text-center text-neutral-500 text-sm">
            <p>
              Contenu de <code className="font-mono">{selectedRegion.folder}</code>
            </p>
            <p className="text-xs mt-2">
              API /api/list à câbler — liste les fichiers + mini-preview markdown.
            </p>
          </div>

          <button
            className="mt-4 w-full px-3 py-2 text-sm rounded border border-neutral-700 hover:bg-neutral-800"
            onClick={() => {
              // Ouvrir dans éditeur / VS Code — à câbler
              console.log("Open in editor:", selectedRegion.folder);
            }}
          >
            Open in editor
          </button>
        </section>
      )}
    </aside>
  );
}
