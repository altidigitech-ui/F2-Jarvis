---
date: "2026-07-02"
timestamp: "2026-07-02T14:12:35.054Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Dispatch files F et R toujours sur S15 — bloquent la timeline JARVIS dès que le batch S17 existera
**Contexte:** `fabrice/publication/batch-semaine.md` (8KB, header "BATCH S15 — Compte F") et `romain/publication/batch-semaine.md` (8KB, header "BATCH S15 — Compte R") référencent tous deux les posts du 22-26/06. Ce sont les fichiers que la timeline JARVIS lit pour afficher les posts du jour. Tant qu'ils ne sont pas mis à jour avec S17, la timeline restera vide même après création du batch central.
**Recommandation:** Lors du dispatch S17 (samedi 05/07), écraser ces deux fichiers avec le contenu S17 correspondant. **Ne pas modifier avant que le batch S17 central soit créé.**
**Action:**
- Fichier: `fabrice/publication/batch-semaine.md` → écraser avec le dispatch F du batch S17
- Fichier: `romain/publication/batch-semaine.md` → écraser avec le dispatch R du batch S17
**Risques si ignoré:** La timeline JARVIS continuera à afficher 0 posts même après création du batch S17, rendant le planning invisible et le dashboard inutilisable pour la semaine S17.
