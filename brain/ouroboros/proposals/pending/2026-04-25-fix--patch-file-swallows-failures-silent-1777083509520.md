---
date: "2026-04-25"
timestamp: "2026-04-25T02:18:29.520Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix: patch_file swallows failures silently → boucle infinie dans les sessions JARVIS
**Contexte:** Dans `backend/jarvis/src/lib/action-executor.ts`, la branche `case "patch_file"` du switch `applyTransform()` (lignes ~310-335) : quand aucun patch ne trouve sa chaîne de recherche, la fonction log `console.error` mais **retourne le fichier inchangé sans throw**. `ghUpdate()` commit alors du contenu identique, l'action passe à `status: "executed"`, et JARVIS ne reçoit aucun signal d'échec. Lors du tour suivant, JARVIS re-lit le fichier, constate qu'il est inchangé, et re-propose les mêmes patches. C'est la cause directe du loop observé dans la session Fabrice 03:55→04:11 où "les 4 commits n'ont jamais été appliqués" a été répété 3 fois.
**Recommandation:** Après la boucle de patches, si `applied.length === 0 && patches.length > 0`, lever une erreur au lieu de retourner silencieusement. L'erreur remontera dans `executeAction`, marquera l'action `failed` en Supabase, et JARVIS verra l'échec dans le prochain tour.
**Action:**
- Fichier: `backend/jarvis/src/lib/action-executor.ts`
- Trouver le bloc (dans `applyTransform`, case `patch_file`):
```typescript
  if (applied.length === 0 && patches.length > 0) {
    console.error(`[action-executor] patch_file: NO patches applied out of ${patches.length}`);
  }

  return result;
```
- Remplacer par:
```typescript
  if (applied.length === 0 && patches.length > 0) {
    throw new Error(
      `patch_file: aucun patch appliqué (${patches.length} tentatives). Chaînes non trouvées: ${failed.slice(0, 3).map(s => `"${s}"`).join(', ')}`
    );
  }

  return result;
```
**Impact:** L'action sera marquée `failed` avec un message clair → JARVIS voit l'erreur dans le tour suivant → plus de boucle. Zéro impact sur les patches qui fonctionnent.
**Risques si ignoré:** Chaque session où Fabrice demande un patch code continuera à boucler. Les commits "fantômes" (contenu inchangé) continuent à polluer l'historique Git et à consommer des appels GitHub API.
