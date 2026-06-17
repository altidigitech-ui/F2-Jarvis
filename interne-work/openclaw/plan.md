# La Machine F2 — PLAN D'IMPLÉMENTATION

> **Le QUOI/COMMENT.** Exécutable par Claude Code + OpenClaw. Lire `context.md` avant.
> **Tout vit dans Jarvis** (`backend/jarvis/`, TypeScript), hébergé sur **1 VPS** avec OpenClaw.
> **Convention :** branches + PR, jamais de commit direct sur main. Après migration Supabase : `NOTIFY pgrst, 'reload schema';`

---

## 0. STACK (1 VPS, tout open-source sauf les boîtes)

- **VPS** (Hetzner/Hostinger ~5-8$) : héberge Jarvis + worker + OpenClaw. Remplace Railway.
- **Jarvis = aussi le séquenceur.** Pas de SaaS d'envoi. Jarvis envoie via **SMTP** (nodemailer) à travers les boîtes du fournisseur cold et lit les réponses via **IMAP** (imapflow). Rotation + séquence dans Jarvis ; warmup géré par le fournisseur. (Libs standard nodemailer/imapflow ; pas de 2e service à déployer.)
- **Boîtes d'envoi :** fournisseur d'infra cold (Maildoso/Mailforge/Zapmail), ~10 boîtes à ~2-3$ pièce, warmup + DNS + monitoring inclus, sur `leakdetector.tech` (+ domaines du provider si besoin). **Jamais de boîte mail grand public (cold interdit), jamais l'IP du VPS.**
- **Scraping :** OpenClaw (browser) pour SOURCE + ENRICH.
- **Scan :** endpoint preview-scan StoreMD en HTTP (lire le contrat exact dans `STOREMD/backend/` — route du free scan + table `preview_scans`).
- **Compose :** Claude API, modèle **Haiku**.
- **Supabase :** base de **Jarvis** (`cold_targets`). `preview_scans` = base StoreMD (`ilqjqbwiljrdfsqrerwo`), lecture seule si besoin.
- **Réseaux :** publication via API officielles des plateformes.

---

## PHASE 0 — SETUP INFRA

1. **VPS** : provisionner Ubuntu 22.04, 4GB RAM min (8GB si browser lourd). Déployer Jarvis + OpenClaw (Docker).
2. **Boîtes** : souscrire un fournisseur d'infra cold (Maildoso/Zapmail), créer ~10 boîtes sur `leakdetector.tech` (+ domaines du provider). Le provider configure SPF/DKIM/DMARC + warmup. Récupérer les **creds SMTP + IMAP** de chaque boîte.
3. **Clés** : Anthropic (Haiku), tokens API réseaux (voir §ENV).
4. **LIA** (1 page) — couverture légale.

> Provisioning VPS + souscription fournisseur cold = action humaine. Le reste (déploiement, code) = Claude Code + OpenClaw.

---

## PHASE 1 — DATA MODEL (Supabase de Jarvis)

```sql
create table cold_targets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  store_url text not null,
  store_domain text not null,
  country text,                       -- US/UK/AU only
  platform_data jsonb,                -- données scrapées (apps, thème, trafic)
  qualify_score int,
  decision_maker_name text,
  decision_maker_email text,
  email_verified boolean default false,
  scan_score int,
  scan_findings jsonb,
  email_subject text,
  email_body text,
  sending_inbox text,                 -- quelle boîte du provider a envoyé
  next_touch_at timestamptz,          -- prochaine relance due
  touch_count int default 0,
  status text not null default 'sourced',
  reply_category text,
  error text,
  constraint uq_cold_targets_domain unique (store_domain)
);
create index idx_ct_status on cold_targets(status);
create index idx_ct_next_touch on cold_targets(next_touch_at);

create table cold_suppression (
  email text primary key,
  reason text,
  created_at timestamptz default now()
);
```
Statuts : `sourced → qualified|rejected → enriched|unreachable → scanned → composed → in_sequence → replied|bounced|unsubscribed → interested|closed`
Après migration : `NOTIFY pgrst, 'reload schema';`

---

## PHASE 2 — SÉQUENCEUR INTÉGRÉ (dans Jarvis)

- **Envoi** : `nodemailer` avec les creds SMTP des boîtes du fournisseur cold. Rotation round-robin sur les ~10 boîtes. Cap/boîte/jour : démarrer 10-15, monter au signal.
- **Séquence** : J0 initial → J3 relance 1 → J7 relance 2 → J15 relance 3 (finale), puis stop. `next_touch_at` + `touch_count` dans `cold_targets`. Un cron envoie les touches dues.
- **Warmup** : géré par le fournisseur cold (inclus). Côté Jarvis, démarrage bas volume + montée au signal. Pas d'attente bloquante.
- **Réception** : poll IMAP (`imapflow`) des 2 boîtes → matcher la réponse au lead → Phase 5.

**Acceptation :** un email part via une boîte du provider, arrive en inbox sur une adresse test, la relance se déclenche à J3 si pas de réponse, une réponse est détectée par IMAP. (Au build : confirmer que le provider expose des creds SMTP/IMAP utilisables par du code custom.)

---

## PHASE 3 — SCRAPING (OpenClaw) : SOURCE + ENRICH

- **SOURCE** : OpenClaw scrape des boutiques Shopify (annuaires, tech-detection, données publiques), filtre US/UK/AU + signaux (apps, thème). Dédup vs `cold_targets`/funnel/clients. → rows `sourced`.
- **ENRICH** : OpenClaw + scripts open-source trouvent l'email décideur (pattern + pages contact), vérif SMTP. Drop role/perso. → `enriched`/`unreachable`.

**Acceptation :** OpenClaw produit une liste de boutiques qualifiées avec un email vérifié, écrite dans `cold_targets`.

---

## PHASE 4 — JOBS COLD (Jarvis BullMQ)

| Job | Entrée | Action | Sortie |
|-----|--------|--------|--------|
| `qualify` | `sourced` | score sur `platform_data` | `qualified`/`rejected` |
| `scan` | `enriched` | preview-scan StoreMD → score + findings | `scanned` |
| `compose` | `scanned` | Claude Haiku → sujet `domain — score/100` + corps (3 findings, 1 CTA, opt-out) | `composed` |
| `push` | `composed` | passer au séquenceur (Phase 2) : 1ère touche + planifier relances | `in_sequence` |

**Acceptation :** la chaîne `sourced→…→in_sequence` tourne sans humain sur 1 boutique test.

---

## PHASE 5 — LISTEN (réponses)

Réponse détectée (IMAP) → Claude classe (`interested|objection|not_now|unsubscribe`).
- `interested` → écrire dans `pipeline-conversion` + notif. 
- `unsubscribe` → `cold_suppression` + statut `unsubscribed`.
- bounce hard → `cold_suppression` + `bounced`.

**Acceptation :** une réponse test est classée et routée ; une désinscription atterrit en suppression et n'est plus jamais ciblée.

---

## PHASE 6 — MOTEUR RÉSEAUX

- **PLAN** : calendrier 1 post/jour/canal (TikTok/IG/FB/X/LinkedIn).
- **GENERATE** : Claude génère scripts + captions ; vidéos via Higgsfield/Canva (déjà connectés).
- **VALIDATE** : file d'attente Supabase, l'humain approuve.
- **PUBLISH** : API officielles (IG/FB Graph, TikTok Content Posting, X free tier, LinkedIn). Détail faisabilité/pièges/délais par plateforme → `04-RESEAUX-API.md`. Points durs : Meta review 2-4 sem (compte Business), TikTok audit obligatoire sinon posts privés + AI-label, LinkedIn page = partenaire requis (viser profil perso). Lancer les demandes en J0, démarrer par X.

**Acceptation :** un post validé est publié via API sur au moins un canal, sans intervention sur l'envoi.

---

## PHASE 7 — GARDE-FOUS

- Filtres durs SOURCE : pays ∈ {US,UK,AU}. Dédup. Suppression vérifiée avant tout envoi.
- Seuils : bounce > 2% ou plaintes > 0,3% → pause + stop sourcing + alerte.
- Cap/boîte respecté.

---

## PHASE 8 — LOGGING (remplir les fichiers EXISTANTS du repo, pas en créer un nouveau système)

> Le repo a déjà une infra `tracking/` avec conventions. La machine **écrit dedans**, elle n'invente pas de dossier `logs/`. Carte de référence : `tracking/context.md` §2.

**Source de vérité par prospect = Supabase `cold_targets`** (50/jour). On ne commite PAS 50 lignes/jour ni les emails de prospects en clair dans Git (bloat + PII). Le repo reçoit l'agrégé et les événements notables.

| Ce que la machine fait | Fichier repo à remplir | Quoi y écrire |
|---|---|---|
| Cycle auto (chaque run) | `tracking/batch-log.md` | 1 ligne `\| Timestamp \| Cycle \| Note \|` — Note = résumé court (X sourcés, Y envoyés, Z réponses). Réutiliser le mécanisme cron + `/api/commit-batch` existant, ne pas en créer un parallèle. |
| Cold email — réponses + conversions notables | `marketing/saas-app-shopify/storemd/cold/cold-log-email.md` (NOUVEAU fichier, **même format de table** que `cold-log-instagram.md`/`cold-log-tiktok.md`) | 1 ligne par réponse/conversion (Date, Store URL, Statut, Notes). Pas les 50 envois bruts. |
| Détail par prospect (50/jour) | Supabase `cold_targets` | tout l'état nominatif — reste hors Git |
| Publications réseaux | `tracking/metrics/<plateforme>/storemd.md` | métriques en suivant le `<plateforme>-TEMPLATE.md` existant |
| Conversions (intéressés → payants) | `marketing/saas-app-shopify/storemd/pipeline-conversion.md` | funnel existant (déjà destination de la Phase 5) |
| Métriques consolidées hebdo | `tracking/dashboard-hebdo.md` | fin de semaine, agrégé |
| Décision stratégique (ex. pause campagne) | `tracking/decisions-log.md` | 1 ligne quand une décision est prise |

**Règle :** agrégé dans Git, nominatif dans Supabase. Suivre les formats de table existants, ne pas en inventer. Commits de log sur une cadence (cycle/jour), pas un commit par mail.

---

## VARIABLES D'ENVIRONNEMENT (VPS / Jarvis)

```
# Boîtes du fournisseur cold (creds SMTP + IMAP par boîte, ~10 boîtes)
MAILBOX_1_SMTP_USER=  MAILBOX_1_SMTP_PASS=  MAILBOX_1_SMTP_HOST=  MAILBOX_1_IMAP_HOST=
# ... idem pour chaque boîte (fournies par Maildoso/Zapmail)
ANTHROPIC_API_KEY=             # Haiku
STOREMD_PREVIEW_SCAN_URL=
# Réseaux
META_GRAPH_TOKEN=  TIKTOK_API_TOKEN=  X_API_TOKEN=  LINKEDIN_API_TOKEN=
# Supabase Jarvis : réutiliser l'existant
```

---

## ORDRE D'EXÉCUTION

0. **AVANT TOUT : `00-RECO.md`** — audit Jarvis + StoreMD, confirmer le contrat du scan, valider le fournisseur cold. Aucun build tant que `reco-findings.md` n'est pas rempli et validé.
1. Phase 0 (humain : VPS + fournisseur cold) → Claude Code déploie Jarvis + OpenClaw.
2. Phases 1 → 2 → 3 → 4 → 5 (cold email d'abord, c'est le moteur de revenu).
3. Phase 6 (réseaux) ensuite.
4. Phases 7 (garde-fous) + 8 (logging) transverses.
5. Test bout-en-bout sur 1 boutique avant d'ouvrir le volume (10-15/jour), montée au signal.

---

## NON-OBJECTIFS

- Pas d'envoi depuis l'IP du VPS (serveur mail maison) → spam.
- Pas de SaaS d'envoi payant (Jarvis fait le séquenceur).
- Pas de boîte mail grand public pour l'envoi (cold interdit → suspension). Boîtes via fournisseur cold conforme.
- Pas de DM social auto en masse (ban). Pas de ciblage EU/FR.
