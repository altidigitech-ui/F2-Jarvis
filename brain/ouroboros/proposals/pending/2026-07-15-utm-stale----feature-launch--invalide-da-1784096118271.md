---
date: "2026-07-15"
timestamp: "2026-07-15T06:15:18.271Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** UTM stale — `feature_launch` invalide dans dispatch F+R si contenu S15 recyclé pour S19
**Contexte:** Les fichiers `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` contiennent `utm_campaign=feature_launch` dans les REPLY de 5 posts Twitter chacun (10 URLs au total). Ce paramètre reflétait la campagne de lancement StoreMD dont l'offre a expiré le 21/06. Si le "Raccourci S19" PENDING est exécuté (recycle ces posts pour Mer 15 → Ven 17/07), tout clic et conversion sera attribué à "feature_launch" — une campagne close depuis 24 jours. Les analytics post-launch deviennent indiscernables du launch.
**Recommandation:** Avant d'exécuter le Raccourci S19, remplacer `utm_campaign=feature_launch` par `utm_campaign=acquisition_organic` dans les 10 URLs REPLY Twitter concernées. Les URLs LinkedIn (qui utilisent déjà `utm_campaign=post`) ne sont pas impactées.
**Action:**
- Fichier: `fabrice/publication/batch-semaine.md`
- Modifier: 5 occurrences de `utm_campaign=feature_launch` → `utm_campaign=acquisition_organic` (lignes REPLY de TW-F-S15-01 à TW-F-S15-05)
- Fichier: `romain/publication/batch-semaine.md`
- Modifier: 5 occurrences de `utm_campaign=feature_launch` → `utm_campaign=acquisition_organic` (lignes REPLY de TW-R-S15-01 à TW-R-S15-05)
**Risques si ignoré:** Données analytics corrompues : les conversions S19 tombent dans le bucket "feature_launch" au lieu d'un bucket acquisition continue. Impossible de mesurer le ROI réel du contenu post-launch.
