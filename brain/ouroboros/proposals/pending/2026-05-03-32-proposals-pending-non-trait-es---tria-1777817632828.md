---
date: "2026-05-03"
timestamp: "2026-05-03T14:13:52.829Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** opérationnel
**Titre:** 32 proposals PENDING non traitées — triage obligatoire avant création plan S8
**Contexte:** À ce jour Dim 03/05 (dernier jour S7), 32 proposals sont en attente de décision. Elles incluent des corrections critiques pour S8 : bug platform detection (action-executor.ts), recalibration cold F+R (15/50 et 10/50), synchronisation de fichiers plan-hebdo, fix timeline OFF days, et décisions sur le pipeline beta. Le plan S8 ne peut pas être créé proprement sans savoir quelles corrections sont acceptées — sinon S8 hérite des mêmes erreurs.
**Recommandation:** Lancer `/review-proposals` avant de créer `fabrice/plan-hebdo.md` et `romain/plan-hebdo.md` S8. Prioriser les proposals type `code-fix` et `maintenance` qui ont un impact sur le tracking automatique (compteurs, archivage, platform labeling).
**Risques si ignoré:** Le plan S8 est construit sur des fichiers incohérents et des bugs non corrigés. Les mêmes anomalies de compteurs et de progress-semaine se reproduisent en S8.
