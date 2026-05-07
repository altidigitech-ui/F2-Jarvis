---
date: "2026-05-07"
timestamp: "2026-05-07T06:12:57.059Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Créer fabrice/publication/ — répertoire absent alors que context.md et plan-30-jours.md le référencent
**Contexte:** `fabrice/context.md` et `fabrice/planning/plan-30-jours.md` référencent tous deux `publication/batch-semaine.md` comme emplacement du batch personnel F (Twitter F, LinkedIn F). Or `fabrice/publication/` **n'existe pas** — ni le dossier, ni aucun fichier. Romain a au minimum `romain/publication/archives/`. Fabrice a zéro. Quand le batch S8 sera préparé samedi, JARVIS n'aura nulle part où le créer au bon endroit.
**Recommandation:** Créer le répertoire `fabrice/publication/` avec un fichier `batch-semaine.md` vide (template) pour que le batch du samedi puisse être déposé au bon endroit.
**Action:**
- Créer : `fabrice/publication/batch-semaine.md` (fichier vide avec en-tête `# BATCH SEMAINE F — Semaine du [DATE]`)
- Optionnel : `fabrice/publication/archives/` (miroir de la structure Romain)
**Risques si ignoré:** Le prochain batch samedi 09/05 sera créé n'importe où (ou pas du tout), et JARVIS ne saura pas le lire pour alimenter la timeline.
