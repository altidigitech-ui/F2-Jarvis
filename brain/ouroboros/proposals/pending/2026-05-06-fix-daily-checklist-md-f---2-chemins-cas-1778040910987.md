---
date: "2026-05-06"
timestamp: "2026-05-06T04:15:10.987Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Fix daily-checklist.md F — 2 chemins cassés en section "FIN DE JOURNÉE"
**Contexte:** `fabrice/planning/daily-checklist.md` (dernière MAJ 04/04/2026) référence en section "FIN DE JOURNÉE" :
- `fabrice/cold/cold-outreach-log.md` → ce fichier **n'existe pas** (le répertoire `fabrice/cold/` ne contient qu'un sous-dossier `archives/`, aucun log actif)
- `fabrice/progress-semaine.md` → **mauvais chemin** ; le fichier réel est `fabrice/tracking/progress.md`

Ces deux chemins datent d'avant la refonte du repo et n'ont pas été mis à jour.

**Recommandation:** Mettre à jour `fabrice/planning/daily-checklist.md` section "FIN DE JOURNÉE" avec les bons chemins.
**Action:**
- Fichier : `fabrice/planning/daily-checklist.md`
- Ligne "Logger dans `fabrice/cold/cold-outreach-log.md`" → remplacer par `fabrice/cold/cold-log-s8.md` (ou le nom de fichier actif S8 à créer)
- Ligne "Si événement notable → le noter dans `fabrice/progress-semaine.md`" → remplacer par `fabrice/tracking/progress.md`
**Risques si ignoré:** Les instructions de fin de journée pointent vers des fichiers fantômes. Si Fabrice suit la checklist pour logger cold ou un événement, les chemins sont trompeurs.
