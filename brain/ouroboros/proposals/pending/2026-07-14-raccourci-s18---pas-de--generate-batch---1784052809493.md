---
date: "2026-07-14"
timestamp: "2026-07-14T18:13:29.493Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Raccourci S18 : pas de `generate_batch` nécessaire — 10 remplacements de dates dans 2 fichiers existants déjà complets

**Contexte:** J'ai lu les deux fichiers dispatch intégralement ce cycle (lecture que le cycle matin n'avait pas faite). Résultat : `fabrice/publication/batch-semaine.md` (223 lignes) et `romain/publication/batch-semaine.md` (229 lignes) contiennent **tout le contenu S18** — 5 angles × 2 personas, textes Twitter complets avec reply UTM, posts LinkedIn longs format, aucun hook temporel, aucune mention offre de lancement. La SEULE chose qui bloque la timeline JARVIS sont les 5 en-têtes de section avec les dates du 22-26/06. Le PENDING "Cause racine" préconise `generate_batch` → créer `batch-semaine-S18.md` → dispatcher — 3 étapes LLM avec risque de régression ou contenu différent. Le chemin court : modifier les 10 en-têtes (5 par fichier) directement.

**Recommandation:** JARVIS exécute 2 `propose_action` en parallèle avec les remplacements suivants dans chaque fichier :
- `LUNDI 22/06` → `LUNDI 14/07`
- `MARDI 23/06` → `MARDI 15/07`
- `MERCREDI 24/06` → `MERCREDI 16/07`
- `JEUDI 25/06` → `JEUDI 17/07`
- `VENDREDI 26/06` → `VENDREDI 18/07`
Et dans chaque post ID + horaire : `22/06` → `14/07`, `23/06` → `15/07`, etc. (remplacement global). Changer aussi le titre ligne 1 : "S15" → "S18" dans les 2 fichiers.

**Action:**
- Fichier 1 : `fabrice/publication/batch-semaine.md` — replace_all `22/06` → `14/07`, `23/06` → `15/07`, `24/06` → `16/07`, `25/06` → `17/07`, `26/06` → `18/07`, "S15" → "S18" (titre uniquement)
- Fichier 2 : `romain/publication/batch-semaine.md` — mêmes remplacements
- Aucun nouveau fichier dans `marketing/contenu/batch-semaine/` — la cause racine n'est pas l'absence d'un batch central mais l'écart de dates dans le dispatch

**Risques si ignoré:** La voie `generate_batch` reste la seule option documentée dans les PENDINGs — elle peut générer du contenu différent du S15 validé, nécessite plus de temps, et risque de créer une incohérence entre le batch central et les fichiers dispatch. Les 4 jours restants de S18 (Mar-Ven 15-18/07) continuent à passer.
