---
date: "2026-05-05"
timestamp: "2026-05-05T08:18:08.697Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Mettre à jour fabrice/posts-valides.md — bilan affiche 0/14 alors que 6 posts S7 confirmés publiés
**Contexte:** `fabrice/posts-valides.md` a été généré le 25/04/2026 pour le batch S7 et jamais maintenu. Le "Bilan publications S7" en bas du fichier affiche "Total : 0/14 posts publiés" avec toutes les checkboxes `- [ ]` non cochées. `progress-semaine.md` F confirme 6 publications réelles : Twitter Couche A Lun 27/04, Mar 28/04, Mer 29/04 (3/6) ; Twitter Couche B Mer 29/04 B1 (1/4) ; LinkedIn Couche A Mar 28/04 (1/2) ; LinkedIn Couche B Mer 29/04 (1/2) = 6/14 publiés, 8 non publiés (Jeu 30/04, Ven 01/05, Sam 02/05 fenêtres expirées).
**Recommandation:** Mettre à jour posts-valides.md avant archivage S7 — cocher les 6 publications confirmées + corriger le bilan.
**Action:**
- Fichier : `fabrice/posts-valides.md`
- Cocher `[x]` les lignes : Lun 27/04 13h (Couche A), Mar 28/04 13h (Couche A), Mer 29/04 13h (Couche A), Mer 29/04 18h (Couche B B1), Mar 28/04 17h30 (LinkedIn A), Mer 29/04 21h (LinkedIn B)
- Mettre à jour le bilan en bas : `Twitter Couche A : 3/6` · `Twitter Couche B : 1/4` · `LinkedIn Couche A : 1/2` · `LinkedIn Couche B : 1/2` · `Total : 6/14 posts publiés`
**Risques si ignoré:** L'archive S7 contiendra un fichier "posts-valides" indiquant 0 publication alors que des posts ont bien eu lieu. Fausse baseline pour évaluer S7 en retrospective.
