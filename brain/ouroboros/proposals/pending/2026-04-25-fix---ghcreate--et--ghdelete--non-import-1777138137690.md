---
date: "2026-04-25"
timestamp: "2026-04-25T17:28:57.691Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix: `ghCreate` et `ghDelete` non importés dans `ouroboros.ts` — kill-switch route cassée silencieusement
**Contexte:** La ligne 2 de `backend/jarvis/src/routes/ouroboros.ts` n'importe que `{ ghRead, ghList, ghMoveFile, ghDeleteMultiple, GitHubDirEntry }`. Or `ghCreate` est appelé dans `safeCreate()` (ligne ~57) et `ouroborosInitialize`, et `ghDelete` est appelé dans `ouroborosKillSwitch()`. Au runtime : `ghCreate is not a function` → `safeCreate()` catch silencieux → initialize échoue sans erreur ; `ouroborosKillSwitch` retourne 500.
**Recommandation:** Ajouter `ghCreate, ghDelete` à la ligne d'import.
**Action:**
- Fichier: `backend/jarvis/src/routes/ouroboros.ts`
- Modifier ligne 2 :
```typescript
// AVANT
import { ghRead, ghList, ghMoveFile, ghDeleteMultiple, GitHubDirEntry } from "../lib/github.js";

// APRÈS
import { ghRead, ghCreate, ghDelete, ghList, ghMoveFile, ghDeleteMultiple, GitHubDirEntry } from "../lib/github.js";
```
**Impact:** Le kill-switch activation/désactivation via JARVIS UI redevient fonctionnel. `ouroborosInitialize` crée réellement les dossiers. Zéro changement de logique.
**Risques si ignoré:** Impossible d'activer/désactiver le kill-switch Ouroboros via l'UI. En cas d'urgence (cycle runaway), le kill-switch manuel resterait la seule option.
