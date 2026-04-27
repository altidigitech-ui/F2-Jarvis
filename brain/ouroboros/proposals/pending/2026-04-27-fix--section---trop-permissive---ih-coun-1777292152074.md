---
date: "2026-04-27"
timestamp: "2026-04-27T12:15:52.075Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix: section() trop permissive — IH counter F2 bloqué à 0 malgré 3 engagements loggés
**Contexte:** La fonction `section(content, title)` dans `backend/jarvis/src/routes/context.ts` (ligne 60) cherche toute ligne contenant le titre, pas uniquement les headers Markdown. `f2/engagement/engagement-log.md` contient `**Plateforme :** IH principalement.` en en-tête du fichier. Quand `countTodayInSection(engagementLog, "IH", today)` est appelé, `section()` s'active sur ce texte de description, collecte jusqu'au premier `## IH` (qui l'arrête immédiatement), retourne un bloc vide → `ih: 0`. Résultat constaté : `counters_today(fabrice, mode:f2)` retourne `ih: 0` alors que 3 commentaires IH du 27/04 sont présents dans le log. Bug non présent sur Fabrice/Romain normal (leurs headers ne mentionnent pas "IH").
**Recommandation:** Restreindre le match de `section()` aux lignes qui sont des headings Markdown (`#`, `##`, `###`).
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Modifier ligne 60 :
  - Avant : `if (!active && line.includes(title)) { active = true; continue; }`
  - Après : `if (!active && /^#{1,3}\s/.test(line) && line.includes(title)) { active = true; continue; }`
**Impact:** Le counter IH de F2 reflètera les vrais engagements. Aucun impact sur Fabrice/Romain normal (leurs headers sont propres). Correction de 1 ligne.
**Risques si ignoré:** Le dashboard F2 affiche `ih: 0` en permanence quelle que soit l'activité IH. Le timeline objectif engagement F2 reste à 0/N indéfiniment. Invisible jusqu'au vendredi où le bilan S7 sera faux.
