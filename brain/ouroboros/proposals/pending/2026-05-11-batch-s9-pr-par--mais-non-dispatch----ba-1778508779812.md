---
date: "2026-05-11"
timestamp: "2026-05-11T14:12:59.813Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Batch S9 préparé mais non dispatché — batch-semaine.md central et publication/ vides
**Contexte:** `marketing/contenu/batch-semaine/batch-semaine-S9.md` existe (65KB, 41 publications, tous les posts F/R/StoreMD pour la semaine 11-17/05 avec statuts ✅ et horaires précis). Cependant le fichier dispatch central `marketing/contenu/batch-semaine/batch-semaine.md` affiche toujours `Semaine du : [DATE]` avec tableaux vides. Les 3 fichiers dispatch individuels sont identiquement vides : `fabrice/publication/batch-semaine.md`, `romain/publication/batch-semaine.md`, `saas-app-shopify/storemd/publication/batch-semaine.md`.
**Recommandation:** Dispatcher le contenu de `batch-semaine-S9.md` vers `batch-semaine.md` (remplacer le header `[DATE]` par `11/05/2026 au 17/05/2026`) puis vers les 3 fichiers publication/ individuels par compte.
**Action:**
- Fichier 1 : `marketing/contenu/batch-semaine/batch-semaine.md` → remplacer `Semaine du : [DATE]` par `Semaine du : 11/05/2026 au 17/05/2026`, puis copier les sections par compte depuis batch-semaine-S9.md
- Fichier 2 : `fabrice/publication/batch-semaine.md` → remplir avec les lignes Twitter F + LinkedIn F issues de batch-semaine-S9.md (STOREMD-TW-F-S9-01 à S9-05, STOREMD-LI-F-S9-*)
- Fichier 3 : `romain/publication/batch-semaine.md` → remplir avec Twitter R + LinkedIn R
- Fichier 4 : `saas-app-shopify/storemd/publication/batch-semaine.md` → remplir avec TikTok, Instagram, Twitter StoreMD, Facebook, IH
**Risques si ignoré:** Les fichiers de référence hebdomadaires restent désynchronisés de la réalité toute la semaine. Si le bug context.ts est corrigé, la timeline restera vide car plan-hebdo n'est pas alimenté.
