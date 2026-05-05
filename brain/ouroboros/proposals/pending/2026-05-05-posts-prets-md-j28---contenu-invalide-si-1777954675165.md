---
date: "2026-05-05"
timestamp: "2026-05-05T04:17:55.166Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** posts-prets.md J28 — contenu invalide si J25 non publié, landmine pour la reprise Reddit aujourd'hui
**Contexte:** `fabrice/reddit/posts-prets.md` contient un post J28 (03/05) pré-écrit pour un scénario de validation réussie : *"I got way more takers than expected"*, *"I audited 30+ stores this week"*. Or trois signaux confirment que ce scénario ne s'est probablement pas produit :
1. `progress-semaine F` : zéro entrée Reddit sur toute la S7 (seul Romain a 8 replies Reddit le 27/04 dans son progress-semaine)
2. `counters_today F` : reddit = 0
3. Stores scannés documentés S7 : 3 réels (0foxShop 69/100, thelunarjeweler 72/100, the7letter 64/100)

Publier le J28 tel quel sur r/shopify = metrics inventées + fausse social proof ("30+ stores", "way more takers than expected") au moment exact où la crédibilité communautaire est le capital le plus précieux.
**Recommandation:** Avant toute action Reddit aujourd'hui (J30 milestone, reprise distribution) :
1. Vérifier si le post J25 a réellement été publié sur Reddit (historique compte perso)
2. Si J25 **non publié** : archiver le J28 comme invalide en ajoutant `⚠️ INVALIDE SI J25 NON PUBLIÉ` en tête du bloc, et utiliser le post J25 ou J18 pour démarrer
3. Si J25 **publié avec < 10 réponses** : réécrire le J28 avec les vrais chiffres
**Action:**
- Fichier: `fabrice/reddit/posts-prets.md`
- Modifier: Début du bloc J28 → ajouter `⚠️ INVALIDE SI J25 NON EXÉCUTÉ OU < 10 RÉPONSES — données factuelles incorrectes (30+ stores non vérifiés), ne pas publier tel quel`
**Risques si ignoré:** Signalement sur r/shopify pour fausse promotion déguisée en audit communautaire → ban sub au moment précis où le compte est prêt pour la distribution. Crédibilité détruite sur le canal J30 avant même de démarrer.
