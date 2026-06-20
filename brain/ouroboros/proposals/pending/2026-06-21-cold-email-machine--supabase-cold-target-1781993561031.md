---
date: "2026-06-21"
timestamp: "2026-06-20T22:12:41.032Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** alerte opérationnelle
**Titre:** Cold email machine (Supabase cold_targets) — aucune réponse loguée, état réel inconnu
**Contexte:** `marketing/saas-app-shopify/storemd/cold/cold-log-email.md` décrit une machine automatique envoyant 50 cold emails/jour via Supabase `cold_targets`. Ce log est strictement vide — aucune réponse, aucune conversion, aucun désinscrit. Deux hypothèses : (A) la machine tourne mais zéro réponse n'a été reçue ni loguée ; (B) la machine ne tourne pas du tout. Le PENDING "Fix double-exécution Supabase" concerne la route action.ts, pas cette machine. Il n'existe aucun signal dans le repo permettant de confirmer que la machine est active. J-1 avant June 22 : si la machine tourne, c'est le dernier jour pour cibler des merchants avec l'offre de lancement.
**Recommandation:** Vérifier dans Supabase (`cold_targets` table) si des envois ont eu lieu cette semaine. Si oui → logger les metrics minimaux (volume envoyé, taux d'ouverture si disponible) dans le cold-log-email.md. Si non → identifier pourquoi la machine est arrêtée.
**Risques si ignoré:** Si la machine est silencieusement arrêtée, le canal email (le plus scalable du stack) manque le dernier jour de l'offre sans que personne ne le sache.
