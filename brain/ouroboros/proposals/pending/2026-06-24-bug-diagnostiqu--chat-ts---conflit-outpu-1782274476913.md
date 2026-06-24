---
date: "2026-06-24"
timestamp: "2026-06-24T04:14:36.914Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Bug diagnostiqué chat.ts — conflit OUTPUT§"batch complet" vs PATTERNS§create_file provoque saturation tokens et loop infini

**Contexte:** Lors de la session du 22-23/06 (6 tentatives entre 18:39 et 19:45), JARVIS n'a jamais pu commiter le batch S15. Cause racine identifiée dans `backend/jarvis/src/routes/chat.ts` :

- **Ligne 161** (table PATTERNS NATURELS) dit : `"génère le batch S[N]" → propose_action(create_file)` ← intention correcte
- **Ligne 191** (section OUTPUT) dit : *"Aussi long que nécessaire (batch complet, analyse stratégique, rapport d'audit), aucune limite artificielle."* ← contradiction

JARVIS lit l'exception "batch complet" de l'OUTPUT avant de lire la règle ligne 161, et génère les ~41 posts inline dans sa réponse textuelle. À ~300 chars/post × 41 posts = ~12KB de texte visible avant même d'avoir tenté d'appeler l'outil. Budget output tokens épuisé → réponse tronquée (confirmé : "coupée net au milieu du tweet StoreMD Twitter Lundi") → propose_action jamais appelé → tour suivant, même logique, même échec. 6 boucles identiques.

**Recommandation:** Patcher ligne 161 de `chat.ts` pour rendre la règle "contenu dans l'action, pas dans le texte" explicite et prioritaire sur l'exception OUTPUT.

**Action:**
- Fichier: `backend/jarvis/src/routes/chat.ts`
- Modifier ligne 161 (chaîne à chercher) :
```
| "génère le batch S[N]" | lis stratégie + voix (PAS le batch précédent en entier) → propose_action(create_file) |
```
→ Remplacer par :
```
| "génère le batch S[N]" | lis stratégie + voix (PAS le batch précédent en entier) → propose_action(create_file). **CRITIQUE — NE JAMAIS générer les posts in extenso dans le texte avant l'action** (saturation output tokens → tool call bloqué → loop infini). Contenu complet va dans params.content de l'action. Réponse texte = table synthèse 7 lignes max (1 par jour : angle + vidéo + nb posts). |
```

**Impact:** Résout le bug de génération batch. Aucun impact sur les autres workflows. Le patch est <200 chars, patch_file applicable directement.
**Risques si ignoré:** Chaque tentative de génération de batch via JARVIS reproduira le même échec. S16 sera aussi impossible à créer que S15.
