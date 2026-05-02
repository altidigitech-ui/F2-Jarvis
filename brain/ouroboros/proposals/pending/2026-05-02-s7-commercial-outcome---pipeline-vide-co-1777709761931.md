---
date: "2026-05-02"
timestamp: "2026-05-02T08:16:01.931Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** S7 commercial outcome — pipeline vide confirmé, S8 batch doit rebaseer les KPIs beta
**Contexte:** `fabrice/pipeline-conversion.md` documente le résultat complet du funnel S7 Couche B "No Install" : 3/30 scans envoyés (10%), 0 beta spots claimed sur 10 disponibles, 0 réponses reçues, 0 conversations actives, MRR externe = €0. La cible S7 était 8/10 spots + 2-3 conversions payantes. Le delta entre plan et réalité est total. Les 10 beta spots restent 100% ouverts, les scans proactifs ont été interrompus après J2, et la Couche B n'a pas généré de pipeline. Note : les posts Couche B (B1-B4) étaient en grande partie non publiés sur les jours prévus (B2+B3 manquants, B4 aujourd'hui uniquement).
**Recommandation:** Intégrer dans le batch S8 (à créer avant dimanche) une décision explicite sur : (1) les 10 beta spots — les maintenir en S8 avec copy réajusté ou les fermer ; (2) les scans proactifs — repartir à 6/jour dès lundi ou réduire l'objectif ; (3) si les posts Couche B Jeu-Ven non publiés (B2 R+F, B3 R+F) sont rollés en S8 ou abandonnés. Sans cette décision explicite, S8 parte avec un plan S7 incomplet comme base.
**Action:**
- Fichier: à créer → `fabrice/plan-hebdo-s8.md` et `romain/plan-hebdo-s8.md`
- Section dédiée : "ROLLOVER S7 → S8" listant les éléments à décider
- Référencer `fabrice/pipeline-conversion.md` ligne "beta spots: 0/10" comme point de départ
**Risques si ignoré:** S8 batch commence sans bilan commercial S7 → même plan, même exécution partielle, même résultat zéro.
