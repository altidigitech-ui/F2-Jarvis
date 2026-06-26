---
date: "2026-06-26"
timestamp: "2026-06-26T02:11:26.769Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Plan-hebdo F + R — templates vides inutilisés, batch-semaine.md est devenu la vraie source de vérité
**Contexte:** fabrice/planning/plan-hebdo.md et romain/planning/plan-hebdo.md affichent encore `# PLAN HEBDO F — Semaine du [DATE] au [DATE]` avec toutes les cellules vides (⏳ sans contenu). Le dispatch S15 a bien alimenté fabrice/publication/batch-semaine.md et romain/publication/batch-semaine.md — qui contiennent les vrais contenus, horaires et répliques. Mais plan-hebdo.md n'a jamais été mis à jour. Il y a donc deux systèmes : un outil de planning (plan-hebdo) qui n'est jamais utilisé, et un fichier publication (batch-semaine) qui fait tout le travail mais sans colonnes statut.
**Recommandation:** Décider : (A) Supprimer plan-hebdo.md et faire du batch-semaine.md la source unique avec une colonne statut ajoutée, ou (B) dispatcher le batch vers plan-hebdo.md en plus — ajoutant une colonne statut | Publié / Non publié. Option A plus simple. Option B plus conforme à l'architecture prévue.
**Action:**
- Fichier: fabrice/planning/plan-hebdo.md + romain/planning/plan-hebdo.md
- Décision requise avant S16 (lundi 29/06) pour que le workflow soit cohérent dès le départ
**Risques si ignoré:** S16 démarrera avec le même désalignement. Les statuts de publication resteront non traçables. Le bug context.ts empêchant déjà la timeline de fonctionner, plan-hebdo.md est la seule alternative de suivi manuel — mais il est vide.
