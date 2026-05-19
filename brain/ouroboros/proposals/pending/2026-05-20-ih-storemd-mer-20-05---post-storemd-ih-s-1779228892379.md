---
date: "2026-05-20"
timestamp: "2026-05-19T22:14:52.380Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** opérationnel
**Titre:** IH StoreMD Mer 20/05 — post STOREMD-IH-S10-03 à publier aujourd'hui, aucune exécution confirmée

**Contexte:** Le batch `saas-app-shopify/storemd/publication/batch-semaine.md` inclut un post IndieHackers prévu **aujourd'hui mercredi 20/05** (`STOREMD-IH-S10-03` — "Day 9 in the Shopify App Store review queue. Here's the log."). Ce post est long-form (~680 mots), requiert un screenshot du Partner Dashboard "In review" (badge officiel Shopify), et ne peut pas être schedulé : publication 100% manuelle. Aucun événement dans `fabrice/tracking/progress-semaines.md` ni `romain/tracking/progress-semaines.md` ne confirme qu'il a été publié. Les 2 proposals PENDING sur l'IH S10 portent sur *si l'IH est dans le batch* (il l'est) — aucune ne couvre l'exécution du jour J.

**Recommandation:** Publier le post IH dès maintenant sur IndieHackers (compte FoundryTwo). Préparer d'abord le screenshot Partner Dashboard "In review" (asset requis dans le batch). Logger l'événement dans progress-semaines une fois publié.

**Action:**
- Contenu : `saas-app-shopify/storemd/publication/batch-semaine.md` → section `STOREMD-IH-S10-03`
- Asset requis : screenshot Partner Dashboard Shopify avec badge "In review"
- Compte : IndieHackers FoundryTwo
- Logger dans : `romain/tracking/progress-semaines.md` (ou `fabrice/tracking/progress-semaines.md`) → ligne événement avec date/heure

**Risques si ignoré:** Le seul post long-form de la semaine (IH = meilleur canal build-in-public) est manqué. Pas de rattrapage possible le lendemain — le contenu est day-specific ("Day 9"). Visibilité build-in-public perdue pour S10.
