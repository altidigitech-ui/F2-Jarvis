# Archive — FoundryTwo-Growth-Tracker.xlsx (déprécié)

> Date d'archivage : 17/05/2026
> Raison : remplacé par les fichiers markdown `tracking/metrics/*.md`

## Contenu

- `FoundryTwo-Growth-Tracker.xlsx` — outil de saisie hebdomadaire utilisé jusqu'au 16/05/2026

## Pourquoi archivé

Le xlsx contenait 5 sheets (Cold Outreach, Engagement, Content Calendar, Weekly Review, Cross-Engagement) qui doublonnaient avec :

- `tracking/metrics/*.md` — métriques par plateforme (twitter, linkedin, facebook, instagram, tiktok, ph, ih, storemd-admin, hokuno-admin, foundrytwo-analytics)
- `tracking/dashboard-hebdo.md` — consolidation hebdo
- `tracking/decisions-log.md` — décisions stratégiques
- `romain/cold/`, `fabrice/cold/`, `saas-app-shopify/storemd/cold/` — cold-logs par persona/business
- `romain/engagement/`, `fabrice/engagement/` — engagement-logs

Le markdown remplace le xlsx pour deux raisons : navigation native par Jarvis (les agents lisent du markdown, pas du xlsx) et versionning Git lisible (diffs propres entre commits).

## Si besoin de consulter l'historique

Le fichier reste accessible dans cet emplacement pour référence. Ne pas le réintroduire dans `tracking/` — les sources de vérité actuelles sont les fichiers markdown.
