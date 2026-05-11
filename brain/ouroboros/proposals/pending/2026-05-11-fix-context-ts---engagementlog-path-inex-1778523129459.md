---
date: "2026-05-11"
timestamp: "2026-05-11T18:12:09.459Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts — engagementLog path inexistant → tous les compteurs d'engagement bloqués à 0
**Contexte:** `context.ts` lit `${activePrefix}/engagement/engagement-log.md` mais ce fichier n'existe pas dans le repo. La vraie structure est `engagement/ph/engagement-log.md` et `engagement/reddit/engagement-log.md`. Conséquence directe : Romain a loggé 6 interactions PH aujourd'hui (11/05, 17h15, confirmés dans `romain/engagement/ph/engagement-log.md` ET dans `romain/tracking/progress.md`) mais le counter `ihPh = 0`. Deuxième bug dans le même bloc : même si le path était correct, `countTodayInSection(content, "PH", today)` retourne 0 car le fichier PH est un tableau plat sans section `## PH` — il faut simplement compter les lignes du jour.
**Recommandation:** Modifier le `Promise.all` de `contextRoute` pour lire les sous-fichiers séparément, puis compter les lignes directement :
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Dans le `Promise.all` de `contextRoute`, remplacer `readRepo(`${activePrefix}/engagement/engagement-log.md`)` par deux lectures distinctes :
  ```ts
  readRepo(`${activePrefix}/engagement/ph/engagement-log.md`),   // index: engPhLog
  readRepo(`${activePrefix}/engagement/reddit/engagement-log.md`), // index: engRedditLog
  ```
- Remplacer les calculs de compteurs :
  ```ts
  // AVANT
  const ph = countTodayInSection(engagementLog, "PH", today);
  const reddit = countTodayInSection(engagementLog, "REDDIT", today);
  const twEng = countTodayInSection(engagementLog, "TWITTER", today);
  const liCom = countTodayInSection(engagementLog, "LINKEDIN", today);
  const facebook = countTodayInSection(engagementLog, "FACEBOOK", today) + ...;
  const ih = countTodayInSection(engagementLog, "IH", today) + ...;

  // APRÈS
  const ph = tableRows(engPhLog).filter(r => r[0]?.includes(today)).length;
  const reddit = tableRows(engRedditLog).filter(r => r[0]?.includes(today)).length;
  // twEng, liCom, facebook, ih → à mapper vers leurs propres sous-fichiers quand créés
  // (pour l'instant, laisser à 0 plutôt que de lire un fichier inexistant)
  ```
**Impact:** Counter PH Romain passerait immédiatement de 0 à 6 aujourd'hui. Les compteurs Twitter/LinkedIn/Facebook/IH resteront 0 jusqu'à ce que leurs sous-fichiers soient créés, ce qui est correct.
**Risques si ignoré:** Romain accumule des interactions PH non tracées. Le dashboard reste aveugle à toute activité d'engagement même quand elle existe réellement dans le repo.
