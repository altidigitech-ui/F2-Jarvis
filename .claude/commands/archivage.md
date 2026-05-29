---
name: archivage
description: Archive la semaine close (progress, plan-hebdo, cold-logs, batch, dashboard) selon la charte archives/README.md, puis reset des sources en template vide. Routine hebdo. Validation R avant tout move.
---

# /archivage

Archive la semaine qui se termine. Cette commande **orchestre** — elle ne recopie pas les règles. La source de vérité, c'est la charte `archives/README.md` (§2.2 set archivé chaque semaine + reset, §2.3 non-archivés, §2.4 logique de reset). Architecture et contexte : `archives/PLAN-ARCHIVAGE-V1.md`.

**Routine HEBDO uniquement.** La bascule annuelle (charte §2.6 / `PLAN-ARCHIVAGE-V1.md` §3.5) est un script `git mv` séparé, lancé une seule fois par an (~01/2027). Elle est **hors** de cette commande.

## Quand

Fin de semaine (vendredi soir ou samedi), **avant** que `/batch` produise la semaine suivante.

## Numéro de semaine close — S[N]

Même règle documentée que `/batch` (charte `archives/README.md` §2.1) : semaine du **projet F2-Jarvis** (pas ISO calendaire), ISO 8601 lun→dim, padding zéro à partir de S09, ancre **S09 = semaine du 11-17 mai 2026**. Le dossier persona archivé = `semaine-NN-DD-DD-mois-YYYY/`.

## Process

1. **Timestamp** : `TZ='Europe/Paris' date '+%A %d %B %Y — %H:%M:%S %Z'`
2. **Lire la charte** `archives/README.md` §2.2-2.4. Calculer la semaine close S[N] + ses dates (lun→dim).
3. **Construire le plan d'archivage** et le présenter à R pour validation **AVANT tout move** :

   **À archiver (charte §2.2)** :
   - `romain/tracking/progress-semaines.md` → `romain/archives/semaine-NN-DATES/progress.md` (puis **reset** template vide, header S[N+1])
   - `romain/planning/plan-hebdo.md` (si rempli) → `romain/archives/semaine-NN-DATES/plan-hebdo.md` (reset template)
   - `romain/cold/cold-log-{twitter,linkedin,facebook}.md` (si activité) → snapshot copy dans `romain/archives/semaine-NN-DATES/` (**PAS de reset** — append continu sur la source)
   - idem pour `fabrice/...`
   - `marketing/contenu/batch-semaine/batch-semaine-SNN.md` → `marketing/archives/batch-semaine/` (pas de reset, le batch S[N+1] est un nouveau fichier)
   - `tracking/dashboard-hebdo.md` (si rempli) → `tracking/archives/dashboard-hebdo/dashboard-SNN.md` (reset template)
   - **Vider** les 3 fichiers dispatch (`romain/publication/batch-semaine.md`, `fabrice/publication/batch-semaine.md`, `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`) — garder le header (cf batch-template §6)

   **À NE PAS toucher (charte §2.3)** : `daily-checklist.md`, `playbook-semaine.md`, `plan-30-jours.md` (archivé à fin de cycle 30j, événementiel — hors `/archivage` hebdo), `comptes-groupes.md`, `karma-reddit.md`, `douleurs-observees.md`, `tracking/recap-sessions/`, `tracking/decisions-log.md`, `tracking/batch-log.md`, `tracking/metrics/**`.

4. **Validation R** → `go`.
5. **Exécuter** (charte §2.4 : simple `git mv`/copy + restauration du template vide, **pas de retraitement, pas de conversion**) via un prompt Claude Code chirurgical. Créer le dossier `{persona}/archives/semaine-NN-DD-DD-mois-YYYY/` s'il n'existe pas.
6. **Confirmer** à R : semaine S[N] archivée, sources reset (header S[N+1]).

## Garde-fous (non-négociables)

- **Validation R avant tout move** (BIBLE §10). Aucun `git mv` sans `go`.
- **Cold-logs = snapshot copy, JAMAIS de reset** (append continu sur la source).
- **Ne jamais toucher la liste §2.3** (non-archivés hebdo).
- **Reset = template vide figé + header semaine N+1.** Aucun retraitement de contenu, aucune décision sur "quoi garder".
- **Bascule annuelle exclue** (script séparé documenté, ~01/2027).
