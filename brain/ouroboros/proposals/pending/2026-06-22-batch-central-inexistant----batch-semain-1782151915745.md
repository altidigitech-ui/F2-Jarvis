---
date: "2026-06-22"
timestamp: "2026-06-22T18:11:55.746Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Batch central inexistant — `batch-semaine-S14.md` absent, workflow de dispatch bypassé
**Contexte:** L'entête de `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` déclare comme source `marketing/contenu/batch-semaine/batch-semaine-S14.md`. Ce fichier n'existe pas. Le dossier `marketing/contenu/batch-semaine/` ne contient que `batch-template.md`. Cela signifie que le contenu S14 a été rédigé directement dans le fichier de dispatch, sans passer par le batch central. Ce bypass rend l'archivage impossible : il n'y a aucune trace centralisée des contenus S14 produits. Le même risque vaut pour S15 si le workflow n'est pas respecté.
**Recommandation:** Décider si le workflow batch central → dispatch reste la norme ou s'il est abandonné. Si on garde le workflow : créer rétroactivement `batch-semaine-S14.md` (copie du contenu actuel de `batch-semaine.md`) et créer `batch-semaine-S15.md` à partir du template. Si on abandonne le workflow : mettre à jour les références dans les entêtes des fichiers.
**Action:**
- Décision workflow nécessaire : conserver ou supprimer la convention batch central
- Si conservé : créer `marketing/contenu/batch-semaine/batch-semaine-S14.md` (archivage S14)
- Si conservé : créer `marketing/contenu/batch-semaine/batch-semaine-S15.md` à partir de `batch-template.md`
**Risques si ignoré:** Le repo perd toute traçabilité des batchs passés. Le dossier `batch-semaine/` devient un artefact vide qui induit en erreur JARVIS et les agents.
