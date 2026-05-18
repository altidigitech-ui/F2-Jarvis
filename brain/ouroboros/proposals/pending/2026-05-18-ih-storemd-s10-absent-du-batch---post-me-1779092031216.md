---
date: "2026-05-18"
timestamp: "2026-05-18T08:13:51.217Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** opérationnel
**Titre:** IH StoreMD S10 absent du batch — post mercredi 20/05 sans rappel si manuel

**Contexte:** Le plan-hebdo template prévoit "IH StoreMD — 1/sem (mercredi)". En S9, l'IH a été publié manuellement (event Romain 13/05 18:42 : "IH publié manuellement"). Le batch S10 central (41 posts) ne contient aucun post IH — codes présents : TW, TK, IG, FB, LI uniquement. Le `plan-hebdo.md` F+R est vide (template). Résultat : mercredi 20/05, aucun fichier du repo ne rappelle qu'il faut publier le post IH StoreMD.

**Recommandation:** Si IH reste intentionnellement hors-batch (gestion manuelle), ajouter un rappel dans le plan-hebdo S10 une fois rempli, ou noter dans le batch-template que IH = hors-dispatch. Si oubli involontaire dans le batch, rédiger le post IH avant mercredi 20/05.

**Action:**
- Confirmer si IH S10 est intentionnellement hors-batch (comme S9) ou oublié
- Si intentionnel : ajouter "IH = manuel, hors-batch" dans `marketing/contenu/batch-semaine/batch-template.md` pour mémoire future
- Si oublié : rédiger et ajouter STOREMD-IH-S10 dans le batch central avant mercredi

**Risques si ignoré:** Post IH S10 manqué mercredi — 1 semaine de gap IH si le pattern S9 (J3 IH = 13/05) ne se répète pas spontanément.
