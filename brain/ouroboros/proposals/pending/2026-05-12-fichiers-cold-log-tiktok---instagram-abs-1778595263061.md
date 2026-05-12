---
date: "2026-05-12"
timestamp: "2026-05-12T14:14:23.061Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Fichiers cold-log TikTok + Instagram absents de fabrice/cold/ et romain/cold/
**Contexte:** La stratégie S9 prévoit 20 DMs/jour via les comptes StoreMD partagés : 10 DMs/jour TikTok StoreMD + 10 DMs/jour Instagram StoreMD. Le progress.md de F et R contient bien les lignes "Cold StoreMD TikTok (partagé) : 0" et "Cold StoreMD Instagram (partagé) : 0". Mais les répertoires `fabrice/cold/` et `romain/cold/` ne contiennent que 3 fichiers chacun : cold-log-facebook.md, cold-log-linkedin.md, cold-log-twitter.md. Aucun cold-log-tiktok.md, aucun cold-log-instagram.md. Si le cold sur ces canaux démarre (sprint J3), les DMs ne pourront pas être loggés de façon structurée.
**Recommandation:** Créer `fabrice/cold/cold-log-tiktok-storemd.md` et `fabrice/cold/cold-log-instagram-storemd.md` (+ équivalents romain/) avec un header minimal : date, plateforme, compte cible, message envoyé, réponse reçue.
**Action:**
- Fichier à créer : `fabrice/cold/cold-log-tiktok-storemd.md`
- Fichier à créer : `fabrice/cold/cold-log-instagram-storemd.md`
- Fichier à créer : `romain/cold/cold-log-tiktok-storemd.md`
- Fichier à créer : `romain/cold/cold-log-instagram-storemd.md`
- Format header : `| Date | Heure | Compte cible | Message | Réponse | Statut |`
**Risques si ignoré:** Les DMs TikTok/Instagram ne sont pas tracés → impossible d'analyser les taux de réponse par canal et d'optimiser le cold. Les compteurs de progress.md restent indéfiniment à 0.
