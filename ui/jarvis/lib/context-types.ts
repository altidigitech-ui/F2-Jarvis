export interface TimelineItem {
  time: string;
  title: string;
  platform: string;
  status: "done" | "blocked" | "todo";
  publishedBy: string;
}

export interface CounterData {
  // Compteurs par persona (canon 41/82)
  coldTiktok: number;      // cible 10 (compte StoreMD, par opérateur)
  coldInstagram: number;   // cible 10 (compte StoreMD, par opérateur)
  coldFacebook: number;    // cible 5 (perso)
  coldTwitter: number;     // cible 5 (perso)
  coldLinkedin: number;    // cible 5 (perso)
  ph: number;              // cible 6 (perso)
  reddit: number;          // logué, pas de cible dure
  totalPersona: number;    // cible 41
  // Mutualisé (R + F)
  general: number;         // cible 82
  // Pipeline conversion (fabrice)
  pipelineScans?: number;
  pipelineBetas?: number;
  pipelineConvos?: number;
}

export interface AlertItem {
  level: "critical" | "warning";
  title: string;
  description: string;
}

export interface ContextData {
  timeline: TimelineItem[];
  counters: CounterData;
  alerts: AlertItem[];
}
