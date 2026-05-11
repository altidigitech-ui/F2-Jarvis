---
date: "2026-05-11"
timestamp: "2026-05-11T16:14:02.796Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts — les fichiers EXISTENT à de nouveaux chemins (requalification du diagnostic pending)
**Contexte:** Les proposals pending "Fix context.ts — progress-semaine.md inexistant" et "Bug context.ts scope incomplet — fabrice/plan-hebdo.md inexistant" diagnostiquaient les fichiers comme absents. Audit ce jour (context.ts ligne ~336 + repo) révèle qu'ils **existent** mais à des chemins restructurés :
- `fabrice/planning/plan-hebdo.md` (3KB) ← context.ts lit `fabrice/plan-hebdo.md` ❌
- `romain/planning/plan-hebdo.md` (3KB) ← context.ts lit `romain/plan-hebdo.md` ❌
- `fabrice/tracking/progress.md` (2KB) ← context.ts lit `fabrice/progress-semaine.md` ❌
- `romain/tracking/progress.md` (2KB) ← context.ts lit `romain/progress-semaine.md` ❌

Le fix est 4 substitutions de strings dans le Promise.all (lignes ~330-340), aucun fichier à créer.
**Recommandation:** Modifier `backend/jarvis/src/routes/context.ts` dans le bloc Promise.all :
```
readRepo(`${activePrefix}/plan-hebdo.md`)       → readRepo(`${activePrefix}/planning/plan-hebdo.md`)
readRepo(`${activePrefix}/progress-semaine.md`) → readRepo(`${activePrefix}/tracking/progress.md`)
readRepo(`${otherPersona}/plan-hebdo.md`)       → readRepo(`${otherPersona}/planning/plan-hebdo.md`)
readRepo(`fabrice/plan-hebdo.md`)               → readRepo(`fabrice/planning/plan-hebdo.md`)
```
**Action:**
- Fichier : `backend/jarvis/src/routes/context.ts`
- Ligne ~336 : `readRepo(\`${activePrefix}/plan-hebdo.md\`)` → `readRepo(\`${activePrefix}/planning/plan-hebdo.md\`)`
- Ligne ~340 : `readRepo(\`${activePrefix}/progress-semaine.md\`)` → `readRepo(\`${activePrefix}/tracking/progress.md\`)`
- Ligne ~342 : `readRepo(\`${otherPersona}/plan-hebdo.md\`)` → `readRepo(\`${otherPersona}/planning/plan-hebdo.md\`)`
- Ligne ~343 : `readRepo("fabrice/plan-hebdo.md")` → `readRepo("fabrice/planning/plan-hebdo.md")`
**Impact:** Timeline et alerts redeviennent fonctionnelles dès déploiement. Résout 3 proposals pending d'un coup (plan-hebdo vide, progress-semaine.md inexistant, alertes muettes).
**Risques si ignoré:** Dashboard entièrement muet indéfiniment malgré les fichiers présents dans le repo.
