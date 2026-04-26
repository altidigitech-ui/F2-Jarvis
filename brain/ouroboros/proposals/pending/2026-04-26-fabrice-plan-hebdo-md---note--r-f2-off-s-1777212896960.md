---
date: "2026-04-26"
timestamp: "2026-04-26T14:14:56.960Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** fabrice/plan-hebdo.md — Note "R+F2 OFF sam" pour Sam 02/05 : ambiguïté sur le cross R du samedi
**Contexte:** La section 5 de `fabrice/plan-hebdo.md` indique pour Sam 02/05 : `— (R+F2 OFF sam)` dans les colonnes cross. Cette note est vraie pour F (F n'a rien à crosse puisque R et F2 ne publient pas le samedi). Mais elle peut laisser entendre qu'il n'y a aucun cross samedi — ce qui est faux. `romain/plan-hebdo.md` ligne Sam 02/05 montre `⏳ (F A6 13h05)` et `⏳ (F B4 18h05)`, et `romain/cross-engagement-tracker.md` contient bien B9 (13h05) et B10 (18h05) rédigés pour ce jour.
**Recommandation:** Clarifier la note dans `fabrice/plan-hebdo.md` pour distinguer "F ne publie rien à crosse samedi" de "aucun cross samedi" :
**Action:**
- Fichier: `fabrice/plan-hebdo.md`
- Ligne Sam 02/05, col Cross Couche A : `— (R+F2 OFF sam)` → `— (F n'a rien à crosse — R ne publie pas sam)`
- Ligne Sam 02/05, col Cross Couche B : `— (R+F2 OFF sam)` → `— (F n'a rien à crosse — F2 OFF sam)`
**Risques si ignoré:** Si Fabrice lit sa note et croit que R est OFF pour les crosses du samedi, il pourrait (à tort) rappeler à Romain de ne pas crosse le 02/05 — ce qui ferait rater B9+B10 (2 crosses sur le post résumé de semaine, potentiellement les plus importants pour la clôture S7).
