---
date: "2026-05-10"
timestamp: "2026-05-09T22:13:43.939Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** code-fix
**Titre:** Fix parseObjectiveItems : widget "0/30 interactions" sans pertinence en S9 (0 engagement proactif)
**Contexte:** Lu dans `backend/jarvis/src/routes/context.ts` (~ligne 270) : le code cherche `(\d+)\s*interactions?\/jour` dans une section "ENGAGEMENT" de plan-hebdo.md. `fabrice/planning/plan-hebdo.md` ne contient aucune section "ENGAGEMENT" (stratégie S9 = 0 engagement proactif). Fallback codé : `const engTotalTarget = engTargetMatch ? ... : 30`. Résultat : une fois le path bug résolu, la timeline objective affichera `"Engagement: 0/30 interactions aujourd'hui"` en permanence — signal sans signification qui pollue le dashboard.
**Recommandation:** Conditionner l'affichage de l'objectif engagement : si `engTotalTarget === 30 && !engTargetMatch`, ne pas créer l'item (ou afficher `0/0`). Alternative : ajouter une section `## ENGAGEMENT` explicite dans le plan-hebdo avec `0 interactions/jour` pour que le système lise 0 correctement.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Modifier ~ligne 275 : ajouter condition `if (engTotalTarget > 0 && engTargetMatch)` avant de push l'item engagement dans `items`
**Risques si ignoré:** Dashboard affiche un objectif fantôme (0/30) qui n'existe pas dans la stratégie S9. Confusion visuelle mineure, mais dégrade la lisibilité des vrais objectifs (cold, PH).
