---
date: "2026-05-18"
timestamp: "2026-05-18T06:11:41.650Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** code-fix
**Titre:** Fix context.ts — cold-outreach-log.md introuvable, cold counter bloqué à 0
**Contexte:** `backend/jarvis/src/routes/context.ts` lit `readRepo(\`${activePrefix}/cold/cold-outreach-log.md\`)`. Ce fichier n'existe pas. Les cold logs réels sont fragmentés en 3 fichiers par plateforme : `fabrice/cold/cold-log-facebook.md`, `fabrice/cold/cold-log-linkedin.md`, `fabrice/cold/cold-log-twitter.md` (identique pour romain). La fonction `countTodayAny()` reçoit une string vide → cold counter = 0 même si des DMs sont loggés. Ce bug est distinct de la proposal PENDING sur `engagementLog`.
**Recommandation:** Remplacer la lecture unique par une lecture de 3 fichiers et concaténation du contenu avant passage à `countTodayAny()`.
**Action:**
- Fichier : `backend/jarvis/src/routes/context.ts`
- Remplacer `readRepo(\`${activePrefix}/cold/cold-outreach-log.md\`)` par une lecture parallèle des 3 fichiers (`cold-log-facebook.md`, `cold-log-linkedin.md`, `cold-log-twitter.md`) et concaténation
- Exemple : `const coldLog = (await Promise.all(['facebook','linkedin','twitter'].map(p => readRepo(\`${activePrefix}/cold/cold-log-\${p}.md\`)))).join('\\n');`
**Risques si ignoré:** Compteur cold toujours à 0 même avec des DMs envoyés. Impossible de mesurer la progression cold S10 en temps réel depuis JARVIS.
