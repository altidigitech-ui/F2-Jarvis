---
date: "2026-06-21"
timestamp: "2026-06-21T10:12:47.330Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** code-fix
**Titre:** Objectif cold affiché : 35 DMs/jour dans JARVIS vs 50 DMs/jour dans les deux plan-hebdo — discordance + dead code
**Contexte:** `backend/jarvis/src/routes/context.ts` ligne 4 définit `COLD_TARGETS = {tiktok:10, instagram:10, facebook:5, twitter:5, linkedin:5}` (total = 35). La fonction `buildObjectives()` utilise le hardcode `35` (pas `COLD_TARGETS`). `COLD_TARGETS` n'est **jamais référencé** dans aucune autre fonction du fichier = dead code. Or `fabrice/planning/plan-hebdo.md` et `romain/planning/plan-hebdo.md` déclarent explicitement **50 DMs/jour lun-ven** (10 par plateforme × 5 plateformes). Résultat : le dashboard marque l'objectif cold comme "atteint" à 35, alors que l'objectif opérationnel réel est 50. Écart de 15 DMs/jour par persona.
**Recommandation:** Deux corrections dans `backend/jarvis/src/routes/context.ts` :
1. Mettre à jour `COLD_TARGETS` pour refléter le plan actuel : `{ tiktok: 10, instagram: 10, facebook: 10, twitter: 10, linkedin: 10 }`
2. Connecter `buildObjectives` à la constante plutôt qu'au hardcode : remplacer `mk("Cold", totalCold, 35)` par `mk("Cold", totalCold, Object.values(COLD_TARGETS).reduce((a,b)=>a+b,0))`
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Modifier ligne 4 : `const COLD_TARGETS = { tiktok: 10, instagram: 10, facebook: 5, twitter: 5, linkedin: 5 };` → `const COLD_TARGETS = { tiktok: 10, instagram: 10, facebook: 10, twitter: 10, linkedin: 10 };`
- Modifier dans `buildObjectives` : `mk("Cold", totalCold, 35)` → `mk("Cold", totalCold, Object.values(COLD_TARGETS).reduce((a, b) => a + b, 0))`
**Impact:** L'objectif affiché passera de 35 à 50. Zéro changement fonctionnel sur le comptage des DMs. Elimine le dead code.
**Risques si ignoré:** Fabrice et Romain croient avoir atteint leur quota à 35, alors qu'ils sont 15 DMs sous la cible réelle. Faux sentiment de performance.
