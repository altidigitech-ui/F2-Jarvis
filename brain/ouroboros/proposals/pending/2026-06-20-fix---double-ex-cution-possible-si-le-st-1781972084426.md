---
date: "2026-06-20"
timestamp: "2026-06-20T16:14:44.426Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** code-fix
**Titre:** Fix — Double-exécution possible si le status Supabase reste "pending" après un commit GitHub réussi
**Contexte:** Dans `executeAction()` (backend/jarvis/src/lib/action-executor.ts, fin de fonction ~ligne 600), si le commit GitHub réussit mais que la mise à jour Supabase vers "executed" échoue (timeout réseau, connexion brève), le code logue l'erreur et **continue sans throw** — `return (updated || action)`. L'action reste "pending" dans l'UI. Si Fabrice voit une action toujours "en attente" et re-clique, un second commit GitHub se déclenche → double entrée dans le cold log ou double ligne dans progress-semaines. Le risque est faible en temps normal mais augmente sous charge (sprint cold J-2 avec actions en rafale).
**Recommandation:** Remplacer le log silencieux par un throw explicite après échec du status update Supabase, pour forcer une vérification manuelle plutôt qu'une re-tentative aveugle.
**Action:**
- Fichier: `backend/jarvis/src/lib/action-executor.ts`
- Bloc actuel (~ligne 598) :
  ```ts
  if (updateErr || !updated) {
    console.error(`[action-executor] failed to update status to executed:`, updateErr);
  }
  return (updated || action) as PendingAction;
  ```
- Remplacer par :
  ```ts
  if (updateErr || !updated) {
    console.error(`[action-executor] CRITICAL: github committed but status update failed — actionId=${actionId}`, updateErr);
    throw new Error(`[action-executor] committed to GitHub but Supabase status update failed (${updateErr?.message}). Do NOT retry — check GitHub for the commit first.`);
  }
  return updated as PendingAction;
  ```
**Risques si ignoré:** Doublons silencieux dans les cold logs ou progress-semaines si un utilisateur re-tente une action après un timeout Supabase. Difficile à détecter : les compteurs paraissent corrects sauf pour les doublons.
