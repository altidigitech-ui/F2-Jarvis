---
date: "2026-06-20"
timestamp: "2026-06-20T14:12:48.224Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Archiver 3 PENDING à fenêtre temporelle dépassée — posts 15–19/06 non récupérables
**Contexte:** Sur les 21 PENDING actifs, 3 portent sur des posts avec une date dans le passé dont la fenêtre d'action est fermée :
1. *"Posts S14 Lun-Jeu (15-18/06) — 4 jours de contenu 'June 22' sans trace de publication"* → semaine S14 écoulée
2. *"Twitter F + R Ven 19/06 — posts '3 days left' @13h00/14h00"* → hier révolu
3. *"LinkedIn Ven 19/06 — 2 posts avec copy '3 jours restants'"* → hier révolu

Ces posts ont soit été publiés hors repo (scheduling direct), soit manqués — dans les deux cas, aucune action corrective n'est possible aujourd'hui. Les garder PENDING génère du bruit sur la deadline critique (June 22 dans 2 jours).
**Recommandation:** Un passage rapide sur `/review-proposals` pour rejeter ces 3 items avec motif "fenêtre temporelle dépassée — non récupérable". Ramène la queue de 21 → 18 PENDING réellement actifs.
**Risques si ignoré:** La queue continue de grossir avec des items morts. L'attention se dilue sur des proposals non actionnables au détriment des urgences réelles (cold = 0, batch S15, deadline J-2).
