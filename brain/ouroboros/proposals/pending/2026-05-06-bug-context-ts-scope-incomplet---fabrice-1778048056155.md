---
date: "2026-05-06"
timestamp: "2026-05-06T06:14:16.156Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Bug context.ts scope incomplet — fabrice/plan-hebdo.md aussi inexistant (même structure que bug Romain)
**Contexte:** La proposal PENDING "Bug confirmé context.ts — 2 chemins Romain incorrects" identifie que le code lit `romain/plan-hebdo.md` (File not found) au lieu de `romain/planning/plan-hebdo.md`. Ce cycle confirme que Fabrice a la même structure : `repo_read("fabrice/plan-hebdo.md")` → "File not found". Fichier réel : `fabrice/planning/plan-hebdo.md` (3KB ✓). Même constat pour progress : `fabrice/progress-semaine.md` inexistant, réel à `fabrice/tracking/progress.md` (6KB ✓). Si le code utilise `readRepo(\`${activePrefix}/plan-hebdo.md\`)` génériquement, Fabrice est cassé identiquement à Romain. Preuves : `timeline_today(fabrice) = []`, `counters_today(fabrice)` tout à 0.
**Recommandation:** Étendre le fix à Fabrice simultanément. Ne pas patcher Romain seul — le fix sera partiel et laissera Fabrice muet.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- **Option A (déplacement fichiers)** : aussi déplacer `fabrice/planning/plan-hebdo.md` → `fabrice/plan-hebdo.md` et `fabrice/tracking/progress.md` → `fabrice/progress-semaine.md`
- **Option B (patch code)** : le helper doit couvrir les deux personas :
  - `fabrice` → `fabrice/planning/plan-hebdo.md` / `fabrice/tracking/progress.md`
  - `romain` → `romain/planning/plan-hebdo.md` / `romain/tracking/progress.md`
**Risques si ignoré:** Fix partiel : Romain patché, Fabrice toujours muet. Timeline F = [], alertes F jamais déclenchées, dashboard F aveugle comme R.
