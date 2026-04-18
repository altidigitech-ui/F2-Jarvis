/**
 * Mapping entre les régions anatomiques du cerveau 3D et les dossiers F2-JARVIS.
 * Voir `.claude/skills/brain-3d-renderer/SKILL.md` pour le rationale.
 */

export type BrainRegion = {
  id: string;
  label: string;
  labelShort: string;
  folder: string;
  description: string;
  // Position approximative (coords Three.js, à ajuster avec vrai modèle)
  position: [number, number, number];
  // Couleur dominante (dark theme)
  color: string;
};

export const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: "cortex-prefrontal",
    label: "Cortex préfrontal",
    labelShort: "Decisions",
    folder: "studio/decisions",
    description: "Décisions stratégiques F2 (DDR)",
    position: [0, 1.2, 1.3],
    color: "#3b4fd8",
  },
  {
    id: "lobe-frontal-left",
    label: "Lobe frontal gauche",
    labelShort: "Vision & Roadmap",
    folder: "studio",
    description: "Vision, roadmap, planification",
    position: [-0.8, 1.0, 0.8],
    color: "#2f3fb5",
  },
  {
    id: "lobe-temporal-left",
    label: "Lobe temporal gauche",
    labelShort: "Marketing",
    folder: "marketing",
    description: "Langage, content, voice",
    position: [-1.3, 0.2, 0.4],
    color: "#f59e0b",
  },
  {
    id: "lobe-temporal-right",
    label: "Lobe temporal droit",
    labelShort: "Brand",
    folder: "marketing/brand",
    description: "Créativité, identité visuelle",
    position: [1.3, 0.2, 0.4],
    color: "#ef4444",
  },
  {
    id: "lobe-parietal",
    label: "Lobe pariétal",
    labelShort: "Ops",
    folder: "ops",
    description: "Coordination, budget, monitoring",
    position: [0, 1.0, -0.5],
    color: "#22c55e",
  },
  {
    id: "lobe-occipital",
    label: "Lobe occipital",
    labelShort: "Raw inputs",
    folder: "raw",
    description: "Perception, inbox, inputs bruts",
    position: [0, 0.4, -1.4],
    color: "#a1a1aa",
  },
  {
    id: "cervelet",
    label: "Cervelet",
    labelShort: "Patterns",
    folder: "patterns",
    description: "Automatismes appris, learnings",
    position: [0, -0.5, -1.2],
    color: "#52525b",
  },
  {
    id: "hippocampus",
    label: "Hippocampe",
    labelShort: "MemPalace",
    folder: "brain/mempalace",
    description: "Mémoire long-terme verbatim",
    position: [0, 0.1, 0],
    color: "#8b5cf6",
  },
  {
    id: "brain-stem",
    label: "Tronc cérébral",
    labelShort: "SaaS live",
    folder: "saas",
    description: "Fonctions vitales — SaaS en production",
    position: [0, -1.2, 0],
    color: "#22c55e",
  },
  {
    id: "amygdala",
    label: "Amygdale",
    labelShort: "Ouroboros alerts",
    folder: "brain/ouroboros/proposals",
    description: "Signaux d'alerte, propositions urgentes",
    position: [-0.3, -0.1, 0.2],
    color: "#ef4444",
  },
];

/**
 * Classification d'un fichier uploadé vers une zone.
 * Haiku via API route /api/classify renvoie l'id de la zone.
 * Voir `.claude/skills/brain-3d-renderer/SKILL.md` pour le prompt.
 */
export type FileClassification = {
  regionId: string;
  confidence: number;
  suggestedFilename: string;
};

export function findRegionById(id: string): BrainRegion | undefined {
  return BRAIN_REGIONS.find((r) => r.id === id);
}
