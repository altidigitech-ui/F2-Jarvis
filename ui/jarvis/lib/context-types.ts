export interface TimelineItem {
  time: string;
  title: string;
  platform: string;
  status: "done" | "blocked" | "todo";
  publishedBy: string;
}

export interface CounterData {
  cold: number;
  repliesIn: number;
  twEng: number;
  liCom: number;
  reddit: number;
  facebook: number;
  cross: number;
  ih: number;
  ph: number;
  ihPh: number;
  total: number;
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
  weekPlanningF2: TimelineItem[];
}
