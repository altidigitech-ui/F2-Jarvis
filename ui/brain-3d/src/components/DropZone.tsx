import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { useBrainStore } from "../lib/store";

/**
 * Overlay drag-and-drop. Quand un fichier est drop :
 * 1. Il est listé dans pendingDrops du store
 * 2. Un appel API /api/classify (Haiku) détermine la zone cible
 * 3. Une confirmation s'affiche dans SidePanel
 * 4. Après accept, le fichier est copié dans le bon dossier F2-JARVIS
 *
 * V1 : UI seulement, API à câbler côté Next.js ou backend F2-JARVIS.
 */
export function DropZone() {
  const addPendingDrop = useBrainStore((s) => s.addPendingDrop);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        addPendingDrop({
          filename: file.name,
          size: file.size,
        });
      });
    },
    [addPendingDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true, // click ouvre pas le file picker (gêne Canvas R3F)
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={[
        "absolute inset-0 pointer-events-none transition-all",
        isDragActive ? "pointer-events-auto" : "",
      ].join(" ")}
    >
      <input {...getInputProps()} />

      {isDragActive && (
        <div className="absolute inset-0 bg-primary-500/20 border-4 border-dashed border-primary-500 flex items-center justify-center z-50">
          <div className="text-center">
            <Upload size={48} className="mx-auto mb-4 text-primary-500" />
            <p className="text-xl font-semibold">Drop your files</p>
            <p className="text-sm text-neutral-300 mt-2">
              Claude Haiku will classify them into the right brain region
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
