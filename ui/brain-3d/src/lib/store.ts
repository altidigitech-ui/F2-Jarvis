import { create } from "zustand";
import type { BrainRegion, FileClassification } from "./zones";

type BrainState = {
  // Région actuellement sélectionnée (via click)
  selectedRegion: BrainRegion | null;
  // Région hover
  hoveredRegion: string | null;
  // Activité détectée par région (commits 7j, propositions récentes, etc.)
  activity: Record<string, number>;
  // Fichiers en attente de confirmation (drop pending)
  pendingDrops: Array<{
    filename: string;
    size: number;
    classification?: FileClassification;
  }>;

  setSelectedRegion: (r: BrainRegion | null) => void;
  setHoveredRegion: (id: string | null) => void;
  setActivity: (a: Record<string, number>) => void;
  addPendingDrop: (f: { filename: string; size: number }) => void;
  clearPendingDrops: () => void;
};

export const useBrainStore = create<BrainState>((set) => ({
  selectedRegion: null,
  hoveredRegion: null,
  activity: {},
  pendingDrops: [],

  setSelectedRegion: (r) => set({ selectedRegion: r }),
  setHoveredRegion: (id) => set({ hoveredRegion: id }),
  setActivity: (a) => set({ activity: a }),
  addPendingDrop: (f) =>
    set((state) => ({ pendingDrops: [...state.pendingDrops, f] })),
  clearPendingDrops: () => set({ pendingDrops: [] }),
}));
