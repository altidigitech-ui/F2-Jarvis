---
date: "2026-07-12"
timestamp: "2026-07-12T14:15:05.882Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Dispatch bloqué par bundle : StoreMD inexistant veto silencieux sur F+R — découpler en 2 temps
**Contexte:** À 17:27 aujourd'hui, JARVIS a proposé 3 actions de dispatch en parallèle. Les fichiers `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` sont INCHANGÉS (contenu S15, dates du 22-26/06) : les 3 actions n'ont pas été validées. Or, la 3ème action cible `saas-app-shopify/storemd/publication/batch-semaine.md` — ce chemin n'existe pas (le répertoire `saas-app-shopify/` entier est absent du repo, submodule non initialisé). Proposer un bundle de 3 où l'une est techniquement inaccessible crée un veto silencieux sur les 2 autres. C'est probablement pourquoi Fabrice n'a pas validé. Ce pattern se répète depuis 6+ semaines : StoreMD bloque systématiquement l'exécution F+R.
**Recommandation:** Découpler en 2 temps. (1) Maintenant : demander à JARVIS de proposer UNIQUEMENT 2 actions — `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` — avec les dates ajustées pour S18 (remplacer 22/06→14/07, 23/06→15/07, 24/06→16/07, 25/06→17/07, 26/06→18/07). Ces 2 fichiers existent, le contenu de fond est valide. (2) Traiter StoreMD séparément une fois le submodule résolu. Commande JARVIS suggérée : `"propose le dispatch F et R uniquement pour S18 — sans la partie StoreMD"`.
**Action:**
- Fichier: fabrice/publication/batch-semaine.md → mettre à jour header "S15" → "S18", et chaque date de post (22/06→14/07, 23/06→15/07, 24/06→16/07, 25/06→17/07, 26/06→18/07)
- Fichier: romain/publication/batch-semaine.md → idem
- NE PAS inclure saas-app-shopify dans cette action (chemin inexistant)
**Risques si ignoré:** Lundi 13/07, la timeline JARVIS reste vide. Le bundle StoreMD continue d'agir comme veto sur toutes les exécutions F+R. Le contenu S15 devient inutilisable après le 19/07.
