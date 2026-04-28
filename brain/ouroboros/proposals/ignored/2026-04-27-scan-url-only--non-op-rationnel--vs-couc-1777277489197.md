---
date: "2026-04-27"
timestamp: "2026-04-27T08:11:29.198Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte
**Titre:** Scan URL-only "non opérationnel" vs Couche B mercredi — risque de blocage total
**Contexte:** Dans les commentaires de décisions récentes, Fabrice a explicitement confirmé : "StoreMD URL-only scan n'est pas opérationnel". Or les posts Couche B (B1 mercredi 29/04 18h pour F, B1 mercredi 29/04 19h pour R) promettent "No Install", "51/0 OAuth transparent" et "manual scans, 10 spots". Le pipeline-conversion.md cible 30 scans proactifs sur la semaine (6/jour). Si le scan URL-only n'est pas livré et validé avant mercredi, les posts Couche B promettent une expérience qui ne fonctionne pas : tout prospect qui tente storemd.vercel.app rencontrera le mur OAuth — exactement l'opposé de la promesse annoncée.
**Recommandation:** Avant de publier B1 mercredi (F 18h / R 19h), confirmer explicitement que le scan URL-only est opérationnel sur au moins 3 URLs test. Si ce n'est pas prêt → soit décaler la Couche B d'une semaine, soit modifier le message pour ne pas promettre "no install" tant que la feature n'est pas livrée.
**Risques si ignoré:** Posts Couche B publiés, prospects qui testent, wall OAuth = crédibilité cassée sur la semaine la plus ambitieuse jusqu'ici. 10 beta spots irrécupérables si les premiers impressions sont négatives.
