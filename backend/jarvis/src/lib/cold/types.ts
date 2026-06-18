// Types partagés du pipeline cold email (La Machine F2 / StoreMD).
// Miroir de la table cold_targets (supabase-migrations/003_cold_targets.sql).

export type ColdStatus =
  | "sourced"
  | "qualified"
  | "rejected"
  | "enriched"
  | "unreachable"
  | "scanned"
  | "composed"
  | "in_sequence"
  | "replied"
  | "bounced"
  | "unsubscribed"
  | "interested"
  | "closed";

export type ReplyCategory = "interested" | "objection" | "not_now" | "unsubscribe";

export type Country = "US" | "UK" | "AU";

// Findings détaillés : viennent de la RÉPONSE de l'endpoint interne StoreMD
// (PAS de la table preview_scans, qui ne stocke que score + compteurs).
export interface ScanFinding {
  title: string;       // ex. "Cart drawer app blocks main thread"
  detail: string;      // explication concrète, chiffrée si possible
  severity?: "high" | "medium" | "low";
  metric?: string;     // ex. "+2.3s LCP", "-7% conversion"
}

// Données issues de la SOURCE Apify + détection déterministe (platform_data).
export interface PlatformData {
  is_shopify: boolean;
  product_count?: number;
  theme?: string;
  apps?: string[];
  estimated_traffic?: number;
  source?: string;     // d'où vient le lead (annuaire, bio réseau, recherche)
}

export interface ColdTarget {
  id: string;
  created_at: string;
  updated_at: string;
  store_url: string;
  store_domain: string;
  country: Country | null;
  platform_data: PlatformData | null;
  qualify_score: number | null;
  decision_maker_name: string | null;
  decision_maker_email: string | null;
  email_verified: boolean;
  scan_score: number | null;
  scan_findings: ScanFinding[] | null;
  email_subject: string | null;
  email_body: string | null;
  sending_inbox: string | null;
  next_touch_at: string | null;
  touch_count: number;
  status: ColdStatus;
  reply_category: ReplyCategory | null;
  error: string | null;
}

// Boîte d'envoi du fournisseur cold (Maildoso/Mailforge). Creds SMTP + IMAP.
export interface Mailbox {
  id: string;          // identifiant lisible (= adresse from), sert de sending_inbox
  from: string;        // "Jane Doe <jane@leakdetector.tech>"
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  imapHost: string;
  imapPort: number;
  imapUser: string;
  imapPass: string;
}

// Noms des jobs de la queue "cold".
export type ColdJobName =
  | "qualify"
  | "enrich"
  | "scan"
  | "compose"
  | "push"
  | "sequence-tick"
  | "imap-poll"
  | "source-tick";

export interface ColdJobData {
  targetId?: string;   // pour qualify/enrich/scan/compose/push
  count?: number;      // pour source-tick
}
