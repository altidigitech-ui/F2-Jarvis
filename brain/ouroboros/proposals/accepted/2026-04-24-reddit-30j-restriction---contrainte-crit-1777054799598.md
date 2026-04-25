---
date: "2026-04-24"
timestamp: "2026-04-24T18:19:59.598Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte
**Titre:** Reddit 30j restriction — contrainte critique confirmée ce soir, non documentée dans les fichiers stratégie
**Contexte:** Fabrice a confirmé le 24/04 à 20h05 : r/shopify et r/ecommerce exigent une ancienneté de compte de 30 jours minimum pour poster et commenter. Un modérateur a déjà supprimé un post du compte R. Compte Reddit R créé le 06/04/2026 → restriction active jusqu'au **05/05/2026** (J30). Il reste 11 jours de restriction. Cette contrainte n'apparaît dans **aucun fichier** du repo (ni plan-30-jours.md, ni romain/context, ni batch S6). Or **BATCH-SEMAINE-7.md est en cours de rédaction ce soir** — si Reddit est inclus dans le batch S7 sans noter cette contrainte, le batch sera construit sur de mauvaises hypothèses.
**Recommandation:** (1) Ajouter une note explicite dans `plan-30-jours.md` sur la restriction Reddit (30j, lève le 05/05). (2) Lors de la rédaction de BATCH-SEMAINE-7.md, exclure tout post Reddit r/shopify / r/ecommerce jusqu'au 05/05, et orienter l'activité Reddit sur des subreddits sans restriction d'ancienneté (r/AskReddit, r/Entrepreneur mid-size) en attendant.
**Action:**
- Fichier: `plan-30-jours.md` (ou `romain/context/reddit-strategy.md` si existant)
- Ajouter section : `⚠️ Reddit restriction — r/shopify + r/ecommerce bloqués jusqu'au 05/05/2026 (J30). Poster uniquement sur r/AskReddit, r/Entrepreneur, r/ecommerce (mid-size) en attendant.`
- Fichier: BATCH-SEMAINE-7.md (à créer) — inclure ce contexte dans la section Reddit
**Risques si ignoré:** S7 batch intègre Reddit comme canal actif → posts supprimés par modérateurs → perte de crédibilité du compte + time wasted rédiger du contenu inutilisable. Pattern déjà observé S6.


---
**Action accept par romain** : Oui la restrictions reddit et confirmé, pour les posts il faut minimum 30 jours d'ancienneté et pour commenté certains post sur certains "r/" specifique comme "r/shopify" ou "r/ecommerce" obligations d'ancienneté demander, on peut juste liké les post et idenfifié des douleurs pour l'instant.
A prendre en compte que romain a pris enormément de retard sur reddit.
