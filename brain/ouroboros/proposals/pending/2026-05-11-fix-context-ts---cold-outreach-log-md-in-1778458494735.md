---
date: "2026-05-11"
timestamp: "2026-05-11T00:14:54.736Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts — cold-outreach-log.md inexistant → cold counter bloqué à 0 pour toujours
**Contexte:** `context.ts` ligne ~374 lit `readRepo(\`${activePrefix}/cold/cold-outreach-log.md\`)` pour alimenter le compteur cold. Ce fichier **n'existe pas** dans le repo — les cold logs réels sont dans `fabrice/cold/cold-log-twitter.md`, `fabrice/cold/cold-log-linkedin.md`, `fabrice/cold/cold-log-facebook.md` (idem pour romain/) et `saas-app-shopify/storemd/cold/cold-log-instagram.md`, `cold-log-tiktok.md`. Résultat : `coldLog = ""` → `countTodayAny()` retourne toujours 0 → le widget cold dans JARVIS reste à 0 même si F+R font 50 DMs/jour. Ce bug est distinct des proposals PENDING sur plan-hebdo.md — il n'est pas documenté dans les proposals existantes. Il sera masqué tant que la machine cold est à l'arrêt, mais dès que le cold démarre (Phase 2, demain J8), JARVIS affichera 0/50 indéfiniment.
**Recommandation:** Modifier `context.ts` pour lire les 5 fichiers cold réels en parallèle et les agréger. Adapter `countTodayAny()` pour fonctionner sur le contenu combiné — ou créer une fonction `countColdFromLogs(logs: string[], today)`.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Remplacer: `readRepo(\`${activePrefix}/cold/cold-outreach-log.md\`)` → lecture parallèle de `cold-log-twitter.md`, `cold-log-linkedin.md`, `cold-log-facebook.md` + pour StoreMD `storemd/cold/cold-log-instagram.md` + `cold-log-tiktok.md` — contenu concatené avant passage à `countTodayAny()`
**Risques si ignoré:** Cold counter toujours 0 dans JARVIS dès Phase 2. F+R ne verront jamais leur progression. Risque de démotivation + impossibilité de piloter la machine cold depuis le dashboard.
