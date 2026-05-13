---
date: "2026-05-14"
timestamp: "2026-05-13T22:13:11.197Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Requalification — Proposal PENDING "Batch S9 non dispatché" obsolète : 28 posts SONT schedulés
**Contexte:** La proposal PENDING "Batch S9 préparé mais non dispatché — batch-semaine.md central et publication/ vides" suppose que les posts n'ont pas été publiés. Données nouvelles depuis : `romain/tracking/progress-semaines.md` ligne 13/05 18:42 confirme **"28 posts schedulés du 13/05 au 17/05 pour tous les comptes : Twitter (R, F, StoreMD) ✅, TikTok (TikTok Studio) ✅, Facebook ✅, LinkedIn (R, F) ✅"**. Le vrai batch S9 vit dans `marketing/contenu/batch-semaine/batch-semaine-S9.md` (50KB, 1337 lignes, contenu complet validé RED LINES). Le dispatch s'est fait **directement depuis ce fichier vers les plateformes**, en contournant le fichier `batch-semaine.md` (template vide). Résultat : les posts sont live/schedulés, le problème opérationnel initial est résolu.
**Recommandation:** Fermer la proposal PENDING "Batch S9 préparé mais non dispatché" lors de la prochaine session /review-proposals — diagnostic initial dépassé. Action optionnelle : pour restaurer la cohérence structurelle, déplacer ou symlinker le contenu de `batch-semaine-S9.md` dans `batch-semaine.md` avant archivage fin de semaine.
**Action:**
- Lors de `/review-proposals` : REJECT la proposal "Batch S9 préparé mais non dispatché" avec commentaire "Posts schedulés le 13/05 depuis batch-semaine-S9.md — opérationnel résolu"
- Optionnel : `marketing/contenu/batch-semaine/batch-semaine.md` → y copier le header de S9.md pour indiquer que le batch actif est batch-semaine-S9.md
**Risques si ignoré:** La proposal PENDING continue d'encombrer le backlog /review-proposals avec un diagnostic faux, et peut induire une double-action inutile.
