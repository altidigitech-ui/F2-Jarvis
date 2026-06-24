// Registre des sources de génération de batch, par produit.
// Ajouter un business = ajouter une entrée dans REGISTRY (aucune autre modif).
// Les chemins vidéos sont les chemins RÉELS (le template en cite des faux).

export interface BatchSources {
  templatePath: string;
  hashtagsPath: string;
  voicePaths: string[];
  videoMappingPaths: string[];
  utmPath: string;
  archiveDir: string;
}

type Persona = "romain" | "fabrice";

const REGISTRY: Record<string, (persona: Persona) => BatchSources> = {
  storemd: (persona) => ({
    templatePath: "marketing/contenu/batch-semaine/batch-template.md",
    hashtagsPath: "marketing/saas-app-shopify/hashtags.md",
    voicePaths: [`${persona}/VOIX.md`, "marketing/saas-app-shopify/storemd/VOIX.md"],
    videoMappingPaths: [
      "asset-brand/storemd/videos/V1/MAPPING_VIDEOS_V1.md",
      "asset-brand/storemd/videos/V2/MAPPING_VIDEOS_V2.md",
      "asset-brand/storemd/videos/V1/STOREMD_TIKTOK_10_VIDEOS_V2.md",
      "asset-brand/storemd/videos/V1/STOREMD_TIKTOK_10_VIDEOS_V3.md",
    ],
    utmPath: "tracking/utm/StoreMD/UTM_TRACKING_LINKS.md",
    archiveDir: "marketing/archives/batch-semaine",
  }),
};

/** Résout les sources d'un produit, persona déjà substituée. Défaut: storemd. */
export function getBatchSources(product: string, persona: Persona): BatchSources {
  const factory = REGISTRY[product] ?? REGISTRY.storemd;
  return factory(persona);
}
