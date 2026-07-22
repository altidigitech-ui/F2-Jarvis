---
date: "2026-07-22"
timestamp: "2026-07-22T08:14:58.211Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte
**Titre:** Cold outreach = 0 depuis 8 semaines — décision ACCEPTED 29/04 jamais exécutée, workstream indépendant du batch
**Contexte:**
- Décision ACCEPTED du 29/04 : *"Romain cold — sprint 13-14/jour sur Jeu+Ven+Sam pour tenir l'objectif S7"*
- Lecture complète des logs aujourd'hui (22/07) : Twitter F, LinkedIn F, Facebook F, TikTok StoreMD (F), Instagram StoreMD (F) → **tous vides, aucune entrée**
- Idem pour R : Twitter R, LinkedIn R, Facebook R → **tous vides**
- `progress-semaines F` : "Cold envoyés S11 = 0", pas de mise à jour depuis le 25/05
- Période sans cold confirmée : **au moins 8 semaines** (S11 → S19 J3, soit ~2000 DMs/persona non envoyés)
- Différence clé avec le batch/dispatch : **le cold ne dépend d'aucun fichier scheduling, d'aucune action JARVIS, d'aucun batch central**. C'est un geste humain direct sur les plateformes.
**Recommandation:** Lancer le cold aujourd'hui, indépendamment de la résolution batch/dispatch. Minimum viable : 10 DMs LinkedIn F + 10 DMs LinkedIn R sur des cibles Shopify merchants identifiées dans `saas-app-shopify/recherche/cold/`. Le cold est le seul workstream qui génère des conversations qualifiées et des potentiels beta-testeurs sans prérequis technique.
**Risques si ignoré:** Chaque semaine sans cold = 500 contacts non atteints (F+R combinés). Sur 8 semaines de silence = ~4000 marchands Shopify potentiels non touchés. Pendant ce temps, MRR = €0 et le Jalon 4 "Premier payeur" est déjà en dehors de la fenêtre prévue (S4-8 post-acceptation).
