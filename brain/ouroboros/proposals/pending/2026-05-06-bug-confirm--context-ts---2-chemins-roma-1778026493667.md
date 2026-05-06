---
date: "2026-05-06"
timestamp: "2026-05-06T00:14:53.668Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Bug confirmé context.ts — 2 chemins Romain incorrects → dashboard et timeline entièrement muets
**Contexte:** `context.ts` tente de lire `romain/plan-hebdo.md` et `romain/progress-semaine.md`. Ces fichiers n'existent pas à ces chemins. Les vrais fichiers sont à `romain/planning/plan-hebdo.md` (3KB) et `romain/tracking/progress.md` (7KB). Résultat : `planHebdo = ""` et `progressSemaine = ""` pour tout appel Romain. Conséquences concrètes observées aujourd'hui :
- `timeline_today` Romain = `[]` (vide total — aucun objectif, aucun post)
- `parseObjectiveItems("", ...)` retourne `[]` → Romain ne voit jamais "Cold: 0/10", "Engagement: 0/30"
- `parseAlerts("")` retourne `[]` → aucune alerte possible pour Romain
- F2 mode : hardcoded `readRepo("romain/plan-hebdo.md")` ligne 293 → même erreur silencieuse
- `recent_history` Romain : retourne cold-log ✅ + engagement-log ✅ mais PAS progress-semaine (même cause racine, probablement jarvis-tools.ts)
**Recommandation:** Option A (repo, sans déploiement) — déplacer/renommer : `romain/planning/plan-hebdo.md` → `romain/plan-hebdo.md` et `romain/tracking/progress.md` → `romain/progress-semaine.md`. Vérifier que rien d'autre ne référence les anciens paths dans le repo. Option B (code, plus robuste) — patcher context.ts : remplacer les 3 occurrences de path Romain par les chemins corrects, déployer sur Railway.
**Action:**
- Option A : Renommer `romain/planning/plan-hebdo.md` → `romain/plan-hebdo.md` + `romain/tracking/progress.md` → `romain/progress-semaine.md`
- Option B fichier: `backend/jarvis/src/routes/context.ts`
  - Ligne ~55 : `readRepo(\`${activePrefix}/plan-hebdo.md\`)` → ajouter helper `planHebdoPath(persona)` qui retourne `romain/planning/plan-hebdo.md` si `persona === "romain"`, sinon `${persona}/plan-hebdo.md`
  - Ligne ~59 : même logique pour `progress-semaine.md` → `romain/tracking/progress.md`
  - Ligne ~293 (F2 branch) : `readRepo("romain/plan-hebdo.md")` → `readRepo("romain/planning/plan-hebdo.md")`
**Risques si ignoré:** Romain opère sans aucun feedback visuel dans le dashboard — aucun objectif affiché, aucune alerte, aucun post planifié visible. Le bug existait déjà depuis la création de la structure Romain et masque silencieusement tous les problèmes de suivi.
