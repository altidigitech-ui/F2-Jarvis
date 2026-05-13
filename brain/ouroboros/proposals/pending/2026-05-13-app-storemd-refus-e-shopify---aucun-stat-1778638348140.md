---
date: "2026-05-13"
timestamp: "2026-05-13T02:12:28.140Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** risque produit
**Titre:** App StoreMD refusée Shopify — aucun statut depuis 24h, publication démarre aujourd'hui J3
**Contexte:** `romain/tracking/progress-semaines.md` ligne du 12/05 19:15 : "StoreMD app refusée Shopify, en cours de réparation, demande relancée". Aujourd'hui 13/05 = J3 = premier jour de publication effective StoreMD (Romain a loggé "départ publication à partir du 13/05"). Aucune mise à jour visible dans le repo sur le statut de la relance. Les posts en cours de publication renvoient vers `storemd.vercel.app` (URL web directe, non impactée), mais les cold DMs StoreMD TikTok/Instagram sont bloquants : envoyer des DMs depuis un compte StoreMD dont l'app est refusée par Shopify crédibilise mal la démarche.
**Recommandation:** Vérifier le statut dans le Shopify Partner Dashboard ce matin. Si refus toujours en cours → adapter les templates cold pour ne référencer que `storemd.vercel.app` (scan gratuit web) sans mentionner "app Shopify". Loguer le résultat dans `romain/tracking/progress-semaines.md`.
**Risques si ignoré:** Cold lancé avec un pitch "Shopify app" invalide. Si un prospect clique sur un lien App Store, il tombe sur une app refusée = perte de crédibilité immédiate + DMs ignorés.
