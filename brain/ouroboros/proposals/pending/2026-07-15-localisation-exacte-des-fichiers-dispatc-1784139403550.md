---
date: "2026-07-15"
timestamp: "2026-07-15T18:16:43.551Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Localisation exacte des fichiers dispatch F+R introuvable — à confirmer avant le Raccourci S19
**Contexte:** Le diary du cycle précédent (ce matin, 2026-07-15) affirme "Les 3 fichiers dispatch sont en place, tous sur dates S15 (22-26/06)". Pourtant :
- `fabrice/planning/` → 4 fichiers listés (daily-checklist.md, plan-30-jours.md, plan-hebdo.md, playbook-semaine.md) — **aucun fichier dispatch**
- `romain/planning/` → idem, 4 fichiers, aucun dispatch
- `saas-app-shopify/storemd/publication` → **File not found**
Le PENDING "Raccourci S19" suppose l'édition de fichiers existants ("remplaçant les dates S15 par S19 dans 2 fichiers existants"). Si ces fichiers sont introuvables dans leur répertoire attendu, l'exécution du Raccourci échouera silencieusement.
**Recommandation:** Avant d'exécuter le Raccourci S19, confirmer le chemin exact des 3 fichiers dispatch (F, R, StoreMD) via un `repo_search "dispatch"` ou `github_explore`. Si introuvables → les créer from scratch (pas les éditer). Si trouvés → noter le chemin exact dans le plan d'action.
**Action:**
- Faire un `repo_search` sur "dispatch" ou "batch-semaine" pour localiser les fichiers
- Ou demander à JARVIS : "où sont les fichiers dispatch F, R et StoreMD ?"
**Risques si ignoré:** Le Raccourci S19 tente d'éditer des fichiers qui n't existent pas au chemin supposé → échec silencieux → timeline toujours vide → S19 perdu à J3-J5 malgré le plan.
