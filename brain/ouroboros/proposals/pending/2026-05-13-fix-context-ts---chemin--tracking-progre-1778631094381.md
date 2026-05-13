---
date: "2026-05-13"
timestamp: "2026-05-13T00:11:34.381Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix context.ts — chemin `tracking/progress.md` incorrect → le vrai fichier est `tracking/progress-semaines.md`
**Contexte:** La proposal pending `2026-05-11-fix-context-ts---les-fichiers-existent...md` prescrit comme correction : `readRepo(\`${activePrefix}/progress-semaine.md\`)` → `readRepo(\`${activePrefix}/tracking/progress.md\`)`. Or l'audit de `fabrice/tracking/` et `romain/tracking/` ce cycle confirme que le fichier s'appelle **`progress-semaines.md`** (avec un **s**), pas `progress.md`. `progress.md` n'existe pas. Si la correction est appliquée telle quelle, le dashboard reste aveugle pour les alertes et le contexte semaine.
**Recommandation:** Appliquer la correction context.ts en utilisant le bon chemin :
- Remplacer `readRepo(\`${activePrefix}/progress-semaine.md\`)` → `readRepo(\`${activePrefix}/tracking/progress-semaines.md\`)`
Et corriger simultanément la proposal pending pour éviter la confusion à l'application.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Dans le `Promise.all` (ligne ~338) : `readRepo(\`${activePrefix}/progress-semaine.md\`)` → `readRepo(\`${activePrefix}/tracking/progress-semaines.md\`)`
- La correction `plan-hebdo.md` → `planning/plan-hebdo.md` de la même proposal reste elle valide et correcte.
**Risques si ignoré:** La proposal pending sera exécutée avec un mauvais chemin et continuera de bloquer les alertes et l'affichage du contexte semaine dans le dashboard.
