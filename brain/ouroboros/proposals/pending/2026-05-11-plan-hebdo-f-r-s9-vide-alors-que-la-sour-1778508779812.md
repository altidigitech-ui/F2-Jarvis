---
date: "2026-05-11"
timestamp: "2026-05-11T14:12:59.813Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** plan-hebdo F+R S9 vide alors que la source est disponible — timeline JARVIS muette même après fix context.ts
**Contexte:** `fabrice/planning/plan-hebdo.md` et `romain/planning/plan-hebdo.md` sont des templates avec `[DATE]` et tableaux vides pour toute la semaine S9. Or `batch-semaine-S9.md` contient tous les horaires précis par jour et par plateforme : ex. Twitter F Lun 11/05 13h00 (✅), Twitter R Lun 11/05 14h00 (✅), TikTok StoreMD Lun 11/05 14h00 (✅), Instagram StoreMD Lun 11/05 18h00 (✅), etc. La donnée existe — elle n'a simplement pas été copiée dans plan-hebdo. Sans plan-hebdo rempli, même si le bug context.ts (chemin `plan-hebdo.md` vs `planning/plan-hebdo.md`) est corrigé, la timeline JARVIS restera vide.
**Recommandation:** Remplir les sections 1 (comptes perso) et 2 (StoreMD) de `fabrice/planning/plan-hebdo.md` et `romain/planning/plan-hebdo.md` avec les posts de batch-semaine-S9.md pour chaque jour lun-ven. Correction à faire en parallèle du fix context.ts.
**Action:**
- Fichier : `fabrice/planning/plan-hebdo.md`
- Remplacer `# PLAN HEBDO F — Semaine du [DATE] au [DATE]` → `# PLAN HEBDO F — Semaine du 11/05/2026 au 17/05/2026`
- Section 1 Twitter F : remplir les 5 lignes Lun→Ven depuis les entrées `STOREMD-TW-F-S9-0X` de batch-semaine-S9.md (sujet + horaire + statut ✅)
- Section 1 LinkedIn F : idem depuis `STOREMD-LI-F-S9-0X`
- Section 2 StoreMD : remplir statut global par plateforme (TikTok ✅, Instagram ✅, Twitter ✅, Facebook ✅, IH ✅)
- Même opération pour `romain/planning/plan-hebdo.md` depuis les entrées `STOREMD-TW-R-S9-0X` et `STOREMD-LI-R-S9-0X`
**Risques si ignoré:** Timeline JARVIS vide toute la semaine même après correction du chemin dans context.ts. Dashboard aveugle sur ce qui est publié ou non.
