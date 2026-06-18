---
date: "2026-06-18"
timestamp: "2026-06-18T16:11:36.112Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Plan-hebdo F et R — templates vides, aucune semaine remplie depuis la création
**Contexte:** `fabrice/planning/plan-hebdo.md` et `romain/planning/plan-hebdo.md` contiennent uniquement le template d'origine avec `[DATE]`, `[HORAIRE]`, et toutes les cellules vides. On est jeudi 18/06 — aucun plan de la semaine S14 n'a été formalisé dans ces fichiers. Le batch S14 existe dans `marketing/contenu/` et fait office de référence contenu, mais les plan-hebdo sont la source de vérité opérationnelle (cold, PH, LinkedIn, réponses) — ils sont absents.
**Recommandation:** Au prochain batch (samedi 21/06 avant la deadline offre), remplir les plan-hebdo S15 (23→27/06) pour les deux personas avec les dates, horaires, et statuts. Lier explicitement au batch-semaine S15 quand il sera créé.
**Action:**
- Fichier: `fabrice/planning/plan-hebdo.md` → remplacer `[DATE]` par "16/06 au 20/06" (S14 actuelle) ou préparer S15 au batch samedi
- Fichier: `romain/planning/plan-hebdo.md` → même opération
**Risques si ignoré:** Sans plan-hebdo rempli, JARVIS ne peut pas construire la timeline du jour avec les posts planifiés. Chaque matin, le dashboard est vide sur les posts prévus.
