---
date: "2026-05-08"
timestamp: "2026-05-08T00:23:50.785Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** plan-hebdo.md F+R — double blocage : path incorrect dans context.ts ET template jamais rempli
**Contexte:** La pending "Bug context.ts — chemins incorrects" identifie que context.ts lit `fabrice/plan-hebdo.md` (404) au lieu de `fabrice/planning/plan-hebdo.md`. Mais en lisant le fichier réel à `fabrice/planning/plan-hebdo.md`, le contenu est un template pur avec des placeholders `[DATE]`, `[HORAIRE]`, `[À remplir]` partout — le fichier n'a jamais été rempli pour aucune semaine. Même situation pour Romain. Corriger le chemin dans context.ts sans remplir le template produira toujours une timeline vide : les deux actions doivent être faites ensemble.
**Recommandation:** Regrouper les deux corrections dans une seule action : (1) Fix context.ts : `fabrice/plan-hebdo.md` → `fabrice/planning/plan-hebdo.md` et `fabrice/progress-semaine.md` → `fabrice/tracking/progress.md` (idem Romain) ; (2) Remplir le template plan-hebdo pour S9 lors du batch samedi. Sans (2), le fix (1) ne sert à rien car le fichier est vide.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts`
- Corriger les 2 chemins Fabrice : `fabrice/plan-hebdo.md` → `fabrice/planning/plan-hebdo.md` et `fabrice/progress-semaine.md` → `fabrice/tracking/progress.md`
- Corriger les 2 chemins Romain : `romain/plan-hebdo.md` → `romain/planning/plan-hebdo.md` et `romain/progress-semaine.md` → `romain/tracking/progress.md`
- Puis : remplir `fabrice/planning/plan-hebdo.md` pour S9 (batch samedi)
**Risques si ignoré:** Dashboard JARVIS continue à afficher timeline vide et compteurs 0 pour F et R. Les objectifs quotidiens (cold, engagement, PH) ne sont pas trackés. Aucune visibilité sur l'exécution.
