---
date: "2026-07-03"
timestamp: "2026-07-03T08:11:52.889Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Dispatch S17 incomplet — 3ème fichier StoreMD absent du PENDING dispatch
**Contexte:** Le PENDING "Dispatch files F et R" liste deux fichiers cibles : `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md`. Mais il existe un **3ème fichier dispatch** : `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` (24KB, 723 lignes, actuellement sur S15 — header ligne 1 : "BATCH PUBLICATION — Comptes StoreMD — S15"). Ce fichier contient les posts des comptes StoreMD partagés (TikTok + Twitter StoreMD + Instagram + Facebook + IH). Si ce fichier n'est pas mis à jour lors du dispatch S17, les posts StoreMD seront invisibles dans la timeline pour les deux personas.
**Recommandation:** Lors du dispatch S17 (demain 04/07), ajouter `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` comme 3ème fichier à écraser — en plus des deux fichiers déjà listés dans le PENDING dispatch existant.
**Action:**
- Fichier: `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
- Action: Écraser avec le dispatch StoreMD du batch S17 (section "Comptes StoreMD" du batch central)
**Risques si ignoré:** Dispatch S17 livré à 2/3. La timeline affiche les posts perso F et R mais pas les posts StoreMD partagés (TikTok, Twitter StoreMD, IG, FB, IH). Première semaine de contenu avec planning partiel — risque d'oublier les posts StoreMD lors de la publication manuelle.
