---
date: "2026-05-10"
timestamp: "2026-05-10T04:13:03.132Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Recherche-logs cold chrome = 0 session — cold J1 lundi sans aucune cible pré-qualifiée
**Contexte:** J'ai lu les 3 recherche-logs sources (distincts des cold-logs de DMs déjà en PENDING) : `saas-app-shopify/recherche/cold/chrome/instagram/recherche-log.md` = 893 chars, template vide, 0 session enregistrée. `saas-app-shopify/recherche/cold/chrome/tiktok/recherche-log.md` = 1KB, template vide, 0 session. `saas-app-shopify/recherche/cold/chrome/facebook/recherche-log.md` = 1KB, template vide, 0 session. Ces fichiers sont la SOURCE de prospects qualifiés pour le cold. Lundi matin, il n'y a aucun handle pré-qualifié disponible pour les 30 DMs Instagram+TikTok+Facebook prévus. Les prompts de recherche existent (`prompt-recherche.md` dans chaque dossier) mais n'ont jamais été exécutés.
**Recommandation:** Faire 1 session de recherche Chrome (Instagram ou TikTok, 30-45 min) aujourd'hui, pour avoir 20-30 prospects qualifiés prêts lundi matin. Le prompt est clé-en-main, lire `saas-app-shopify/recherche/cold/chrome/instagram/prompt-recherche.md` puis exécuter.
**Action:**
- Lire: `saas-app-shopify/recherche/cold/chrome/instagram/prompt-recherche.md`
- Exécuter: 1 session Claude Chrome avec ce prompt
- Remplir: `saas-app-shopify/recherche/cold/chrome/instagram/recherche-log.md` avec les résultats (Session 1 — 10/05/2026)
**Risques si ignoré:** Cold J1 lundi = recherche + DMs dans la même session, temps doublé, objectif 50 DMs/jour non atteignable en J1. Mauvais départ pour la Phase 1 du plan-30-jours dont l'objectif est d'installer la routine dès J1-J7.
