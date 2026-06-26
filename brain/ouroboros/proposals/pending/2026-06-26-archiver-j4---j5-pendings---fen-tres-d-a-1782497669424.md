---
date: "2026-06-26"
timestamp: "2026-06-26T18:14:29.424Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Archiver J4 + J5 PENDINGs — fenêtres d'action expirées (S15 terminé)
**Contexte:** Deux proposals opérationnelles créées les 25 et 26/06 signalaient des posts à publier le jour-même. S15 se clôt ce soir. Toutes les fenêtres sont passées :
- J4 : TW-F 25/06 13h00, TW-R 14h00, LI-R 18h00 — tous expirés
- J5 : TW-F 26/06 13h00, TW-R 14h00, LI-F 15h30 — tous expirés (chat à 17:27)
Par ailleurs, LI-R-S15-02 était en réalité un post du **jeudi 25/06** (romain/publication/batch-semaine.md ligne 165 : "Jeu 25/06 18h00"), la J5 PENDING le comptait par erreur comme post du vendredi. Ces proposals ne peuvent plus déclencher d'action.
**Recommandation:** Déplacer les 2 fichiers vers `brain/ouroboros/proposals/ignored/` (fenêtre expirée, non rejetées — l'alerte était légitime, juste non traitée à temps).
**Action:**
- `brain/ouroboros/proposals/pending/2026-06-25-j4-s15--25-06----3-posts-sans-confirmati-1782411188916.md` → `ignored/`
- `brain/ouroboros/proposals/pending/2026-06-26-j5-s15--26-06----4-posts-aujourd-hui--tw-1782447116153.md` → `ignored/`
**Risques si ignoré:** Le backlog PENDING grossit avec des proposals non-actionnables — lecture polluée pour les prochains cycles.
