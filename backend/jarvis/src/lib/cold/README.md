# Cold pipeline (`lib/cold/`)

Implémentation du pipeline cold (SOURCE Apify → ENRICH → SCAN StoreMD → COMPOSE → PUSH).
Ce README + le code de ce dossier sont la spec de référence.
Jarvis EST le séquenceur (pas de SaaS d'envoi). Tout est piloté par la queue BullMQ `cold`.

## Modules

| Fichier | Rôle | Phase |
|---|---|---|
| `types.ts` | Types partagés (miroir de `cold_targets`) | — |
| `mailboxes.ts` | Parse les boîtes du fournisseur cold depuis l'env (utilisé par `imap.ts` pour le poll des réponses) | 2 |
| `resend.ts` | Transport bas niveau : `sendColdEmailResend` (POST api.resend.com/emails), erreurs structurées, rate limit 5 req/s | 4b |
| `mailer.ts` | Garde-fous d'envoi : pause campagne + cap/jour **global** (Redis), délègue à `resend.ts` | 4b |
| `imap.ts` | Lecture IMAP (imapflow), poll des réponses humaines | 2 |
| `sequence.ts` | Séquence J0 / J3 / J7 / J15 puis stop | 2 |
| `shopify-detect.ts` | Détection Shopify déterministe (`/products.json`, signatures) + pays | 3 |
| `smtp-verify.ts` | Vérif SMTP (MX → RCPT) sans envoyer + drop role | 3 |
| `apify.ts` | Client actor Apify `clearpath/shopify-store-leads` (SOURCE : domaine + email + nom + pays) | 3 |
| `scraper.ts` | SOURCE (rotation mots-clés `cold_source_seeds` + ingestion) + ENRICH (vérif SMTP) | 3 |
| `storemd.ts` | Client endpoint interne preview-scan StoreMD + top-3 findings | 4 |
| `jobs.ts` | Jobs `qualify` · `enrich` · `scan` · `compose` · `push` + crons | 4 |
| `guardrails.ts` | Pause auto sur seuils bounce/plaintes + état pause (Redis) | 7 |
| `cold-log.ts` | Append cold-log-email.md + decisions-log.md (API GitHub) | 8 |

## Flux

```
SOURCE (scraper.sourceStores)         → cold_targets [sourced]
  → enqueueCold("qualify")            → [qualified] | [rejected]
  → (auto) enqueueCold("enrich")      → [enriched]  | [unreachable]
  → (auto) enqueueCold("scan")        → [scanned]   (StoreMD preview-scan)
  → (auto) enqueueCold("compose")     → [composed]
  → (auto) enqueueCold("push")        → [in_sequence]  (1ère touche J0)
crons:
  sequence-tick (15m)                 → relances J3/J7/J15 dues → stop après 4
  imap-poll (10m)                     → réponses → [replied] | [unsubscribed]
```

`scan` appelle l'endpoint interne StoreMD (`POST /internal/preview-scan`, auth
Bearer), récupère `score` + `findings[]`, et écrit `scan_score` + les **3
findings les plus parlants** (sévérité puis présence d'un chiffre d'impact) dans
`cold_targets`. Le pipeline tourne désormais de bout en bout jusqu'à `in_sequence`.

## Variables d'environnement

```
# Envoi cold via l'API Resend (HTTP direct depuis le worker)
RESEND_API_KEY=                    # Bearer pour POST api.resend.com/emails
COLD_FROM=hello@mail.altidigitech.com   # expéditeur (domaine vérifié Resend)
COLD_REPLY_TO=                     # adresse de réponse (reply_to) — boîte de réception cold
COLD_DAILY_CAP=5                   # cap/jour GLOBAL (un seul expéditeur) — montée au signal
RESEND_MAX_RPS=5                   # plafond req/s respecté par le worker (rate limit Resend)

# Boîtes du fournisseur cold (Maildoso/Mailforge) — désormais utilisées UNIQUEMENT
# par imap.ts pour le poll des réponses humaines (plus pour l'envoi).
MAILBOX_1_IMAP_HOST=  MAILBOX_1_IMAP_PORT=993  MAILBOX_1_IMAP_USER=  MAILBOX_1_IMAP_PASS=
# ... _2, _3, ...
COLD_WORKER_CONCURRENCY=5
COLD_SMTP_PROBE_FROM=verify@leakdetector.tech
COLD_BOUNCE_MAX=0.02               # seuil bounce → pause auto (Phase 7)
COLD_COMPLAINT_MAX=0.003           # seuil plaintes → pause auto
COLD_GUARD_MIN_SAMPLE=20           # échantillon mini avant d'armer les seuils
GITHUB_TOKEN=                      # écriture des logs repo (déjà utilisé par Jarvis)

# compose passe par l'Agent SDK (claude-binary), plus de clé API cold ici.
# l'envoi passe par Resend (cf. plus haut), l'ancien relais HTTPS est retiré.
STOREMD_PREVIEW_SCAN_URL=          # URL complète de POST /internal/preview-scan
STOREMD_PREVIEW_SCAN_KEY=          # clé partagée (Authorization: Bearer)

# Apify — SOURCE (actor clearpath/shopify-store-leads = R9SL2PPdhdhLQwdck)
APIFY_API_TOKEN=
APIFY_SHOPIFY_ACTOR_ID=R9SL2PPdhdhLQwdck
```

Si aucune boîte `MAILBOX_*` n'est configurée, les crons cold ne sont pas planifiés.

## Garde-fous (Phase 7)

- **Filtres durs SOURCE** : pays ∈ {US,UK,AU} + dédup (`scraper.ts`).
- **Suppression** vérifiée avant chaque envoi (`jobs.ts` push + sequence-tick) ;
  désinscriptions → `cold_suppression`.
- **Cap/jour global** respecté (`mailer.ts`, compteur Redis `cold:cap:global:<jour>`).
- **Rate limit Resend** (5 req/s) respecté par `resend.ts` (gate process).
- **Persistance d'erreur** : tout échec d'envoi écrit l'erreur tronquée dans
  `cold_targets.error` (push relaie à BullMQ pour retry ; relances loguées + persistées).
- **Seuils délivrabilité** (`guardrails.ts`) : `bounce > 2%` ou `plaintes > 0,3%`
  (au-delà de `COLD_GUARD_MIN_SAMPLE`) → **pause auto** : flag Redis `cold:paused`,
  `sendColdEmail` et `sourceStores` refusent, ligne ajoutée à `decisions-log.md`.
  Levée manuelle via `resumeCold()` après correction.

> **Lot 2 (à venir) :** avec Resend, bounces et plaintes arrivent par **webhook**
> (`email.bounced` / `email.complained`), plus par IMAP. Tant que le webhook
> `POST /cold/resend-webhook` n'est pas branché, le compteur bounce n'est plus
> alimenté et la pause auto ne se déclenche pas. `imap-poll` reste en place pour
> les **réponses humaines** (reply_to = `COLD_REPLY_TO`).

## Logging (Phase 8) — fichiers EXISTANTS, agrégé dans Git, nominatif dans Supabase

| Quoi | Fichier repo | Quand |
|---|---|---|
| Cycle cold (sourcés/envoyés/réponses) | `tracking/batch-log.md` | cron `/api/commit-batch` → backend `GET /cold/cycle-log` |
| Réponses + désinscriptions | `marketing/saas-app-shopify/storemd/cold/cold-log-email.md` | au poll IMAP (1 commit/lot) |
| Pause campagne | `tracking/decisions-log.md` | au déclenchement d'une pause |
| Détail par prospect (50/j) | Supabase `cold_targets` | hors Git (PII) |

On ne logge **jamais** les envois bruts ni les emails de prospects (PII) : seulement
Store URL + score + statut. Le cycle réutilise le cron existant, pas de cron parallèle.

## Conformité

- **ANTI-IA (§0) :** sujet templaté (`domain: score/100`, pas d'em-dash), corps Haiku
  sous contraintes anti-détection + garde-fous (em-dash neutralisé, opt-out forcé).
- **Légal :** ciblage US/UK/AU uniquement (filtre SOURCE), pas d'EU/FR.
