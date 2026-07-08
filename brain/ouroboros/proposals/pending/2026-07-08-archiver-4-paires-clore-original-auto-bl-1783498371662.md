---
date: "2026-07-08"
timestamp: "2026-07-08T08:12:51.662Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Archiver 4 paires CLORE↔ORIGINAL auto-bloquantes — queue 44→36 sans nouvelle décision
**Contexte:** La queue PENDING contient 4 paires où une proposal "CLORE X" et son PENDING original X coexistent tous les deux en PENDING, ce qui rend la queue auto-contradictoire. Les 4 paires identifiées :
1. "CLORE Escalade niv.4" ↔ "ESCALADE niv.4 — S17 window CLOSED"
2. "CLORE la CORRECTION URGENTE du 03/07" ↔ "CORRECTION URGENTE — Fenêtre batch S17"
3. "Fermer PENDING Dispatch S15 non exécuté" ↔ "Dispatch S15 non exécuté"
4. "Fermer PENDING #14" ↔ original "publication/ inexistant" (voir Proposal 1 ci-dessus)

Ces 8 items = 18% de la queue (8/44). La queue a augmenté de 20 items (26/06) à 44 items (08/07) en 12 jours sans être vidée.
**Recommandation:** Ouvrir /review-proposals avec filtre sur "CLORE" et "Fermer PENDING" pour traiter ces 4 paires en batch. Pour chaque paire : une seule décision (clore l'original si résolu, ou supprimer le "CLORE" si pas encore résolu). Gain immédiat : 8 items hors queue, sans résoudre quoi que ce soit de nouveau.
**Action:**
- Fichiers à traiter en priorité dans `brain/ouroboros/proposals/pending/` :
  - `2026-07-06-clore-escalade-niv-4--factuellement-sup-*.md`
  - `2026-07-04-clore-la--correction-urgente--du-03-07-*.md`
  - `2026-06-25-fermer-pending--dispatch-s15-non-ex-cut-*.md`
  - `2026-06-27-fermer-pending--14--publication---inex-*.md`
**Risques si ignoré:** La queue continue à grossir à ~3 items/jour. À 60+ items, /review-proposals devient inutilisable. Les décisions importantes (S17, S18) se perdent dans le bruit.
