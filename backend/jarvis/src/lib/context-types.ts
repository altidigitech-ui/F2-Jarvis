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
  ihPh: number;
  total: number;
}

export interface AlertItem {
  level: "critical" | "warning";
  title: string;
  description: string;
}
