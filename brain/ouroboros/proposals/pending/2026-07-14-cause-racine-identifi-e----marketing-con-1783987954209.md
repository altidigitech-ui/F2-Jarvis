---
date: "2026-07-14"
timestamp: "2026-07-14T00:12:34.210Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Cause racine identifiée — `marketing/contenu/batch-semaine/` vide depuis S15 : créer S18 pour débloquer cette semaine

**Contexte:** `marketing/contenu/batch-semaine/` ne contient que `batch-semaine-S15.md` (24/06) + le template. Aucun fichier batch central n'existe pour S16, S17, ni S18. Les fichiers dispatch `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` pointent encore sur le contenu du 22-26/06 — c'est pourquoi la timeline JARVIS n'affiche aucun post cette semaine pour F ni R. Ce n'est pas un problème de motivation ou de workflow : le fichier source n'existe tout simplement pas, le dispatch est structurellement impossible. C'est la cause technique concrète derrière le PENDING "7 semaines sans batch" — qui identifiait le symptôme sans nommer l'artefact manquant.

**Recommandation:** Lancer `generate_batch` via JARVIS pour S18 (Lun 14/07 → Ven 18/07) en s'appuyant sur `batch-template.md`. Dispatcher uniquement vers `fabrice/publication/batch-semaine.md` + `romain/publication/batch-semaine.md` (StoreMD reste bloqué côté module — voir PENDING séparé). Si le contenu S15 est confirmé evergreen (voir Proposal 2), le batch S18 peut re-dispatcher le S15 ; sinon créer un batch original.

**Action:**
- JARVIS tool : `mcp__jarvis__generate_batch`
- Dispatcher vers : `fabrice/publication/batch-semaine.md` + `romain/publication/batch-semaine.md`
- Fichier source à créer : `marketing/contenu/batch-semaine/batch-semaine-S18.md`

**Risques si ignoré:** S18 (14-18/07) se perd comme S16 et S17. La fenêtre se ferme vendredi 18/07 au soir. C'est la 8ème semaine consécutive sans publication.
