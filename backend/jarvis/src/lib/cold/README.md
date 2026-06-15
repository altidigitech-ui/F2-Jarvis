# Cold pipeline (`lib/cold/`)

Implémentation des Phases 2 à 4 de `marketing/saas-app-shopify/storemd/machine/plan.md`.
Jarvis EST le séquenceur (pas de SaaS d'envoi). Tout est piloté par la queue BullMQ `cold`.

## Modules

| Fichier | Rôle | Phase |
|---|---|---|
| `types.ts` | Types partagés (miroir de `cold_targets`) | — |
| `mailboxes.ts` | Parse les boîtes du fournisseur cold depuis l'env + cap/jour | 2 |
| `mailer.ts` | Envoi SMTP (nodemailer), round-robin, cap/jour par boîte (Redis) | 2 |
| `imap.ts` | Lecture IMAP (imapflow), poll des réponses | 2 |
| `sequence.ts` | Séquence J0 / J3 / J7 / J15 puis stop | 2 |
| `shopify-detect.ts` | Détection Shopify déterministe (`/products.json`, signatures) + pays | 3 |
| `smtp-verify.ts` | Vérif SMTP (MX → RCPT) sans envoyer + drop role | 3 |
| `openclaw.ts` | Client du Gateway OpenClaw (découverte + email décideur) | 3 |
| `scraper.ts` | SOURCE + ENRICH (orchestration) | 3 |
| `jobs.ts` | Jobs `qualify` · `enrich` · `scan`(STUB) · `compose` · `push` + crons | 4 |

## Flux

```
SOURCE (scraper.sourceStores)         → cold_targets [sourced]
  → enqueueCold("qualify")            → [qualified] | [rejected]
  → (auto) enqueueCold("enrich")      → [enriched]  | [unreachable]
  → ⛔ scan EN STUB                    → s'arrête à [enriched]
  → (quand endpoint StoreMD prêt)     → [scanned]
  → compose                           → [composed]
  → (auto) push                       → [in_sequence]  (1ère touche J0)
crons:
  sequence-tick (15m)                 → relances J3/J7/J15 dues → stop après 4
  imap-poll (10m)                     → réponses → [replied] | [unsubscribed]
```

`scan` est volontairement un stub : l'endpoint interne StoreMD qui renvoie les
findings détaillés n'est pas encore livré (cf. `reco-findings.md` Tâche B). Le
pipeline tourne donc jusqu'à `enriched` ; `compose`/`push` sont prêts et se
déclenchent dès qu'un row a `scan_score` + `scan_findings`.

## Variables d'environnement

```
# Boîtes du fournisseur cold (Maildoso/Mailforge), ~10, numérotées sans trou
MAILBOX_1_SMTP_HOST=  MAILBOX_1_SMTP_PORT=587  MAILBOX_1_SMTP_USER=  MAILBOX_1_SMTP_PASS=
MAILBOX_1_IMAP_HOST=  MAILBOX_1_IMAP_PORT=993  MAILBOX_1_FROM="Jane Doe <jane@leakdetector.tech>"
# ... _2, _3, ...
COLD_DAILY_CAP_PER_INBOX=15        # cap/jour/boîte (à confirmer avec le fournisseur)
COLD_WORKER_CONCURRENCY=5
COLD_SMTP_PROBE_FROM=verify@leakdetector.tech

ANTHROPIC_API_KEY=                 # compose (Haiku) — déjà utilisé par Jarvis
STOREMD_PREVIEW_SCAN_URL=          # endpoint interne StoreMD (Phase scan, à venir)

# Gateway OpenClaw (VPS) — SOURCE + ENRICH
OPENCLAW_GATEWAY_URL=
OPENCLAW_API_KEY=
```

Si aucune boîte `MAILBOX_*` n'est configurée, les crons cold ne sont pas planifiés.

## Conformité

- **ANTI-IA (§0) :** sujet templaté (`domain: score/100`, pas d'em-dash), corps Haiku
  sous contraintes anti-détection + garde-fous (em-dash neutralisé, opt-out forcé).
- **Garde-fous :** suppression vérifiée avant chaque envoi ; `List-Unsubscribe` posé ;
  désinscriptions routées en `cold_suppression` (jamais recontactées).
- **Légal :** ciblage US/UK/AU uniquement (filtre SOURCE), pas d'EU/FR.
