---
date: "2026-07-15"
timestamp: "2026-07-15T02:12:46.191Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Raccourci S19 — Débloquer timeline F+R en remplaçant les dates S15 par S19 (Mar 15 → Ven 18/07)
**Contexte:** La proposal "Raccourci S18" (PENDING 2026-07-14) est périmée : S18 (07-13/07) est fermée. On est mardi 15/07, S19 en cours. `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` contiennent le batch S15 complet et correct — seules les dates sont stales (22/06, 23/06, 24/06, 25/06, 26/06). Lundi 14/07 est perdu. Il reste Mardi 15 (aujourd'hui, marginal), Mer 16, Jeu 17, Ven 18. Le deadlock PENDING "S15 expire 19/07 ↔ S15 evergreen" est résolu par défaut : publier en S19 = choisir evergreen. StoreMD dispatch reste un verrou séparé (déjà en PENDING).
**Recommandation:** Remplacer les 5 dates S15 par les dates S19 correspondantes dans les 2 fichiers dispatch perso. 10 substitutions, zéro rédaction.
**Action:**
- Fichier 1 : `fabrice/publication/batch-semaine.md`
  - Remplacer `Lun 22/06` → `Lun 14/07` (et `22/06` dans les IDs/horaires)
  - Remplacer `Mar 23/06` → `Mar 15/07`
  - Remplacer `Mer 24/06` → `Mer 16/07`
  - Remplacer `Jeu 25/06` → `Jeu 17/07`
  - Remplacer `Ven 26/06` → `Ven 18/07`
- Fichier 2 : `romain/publication/batch-semaine.md` — mêmes 5 remplacements
- Résultat : timeline JARVIS peuplée immédiatement pour les jours restants de S19
**Risques si ignoré:** Lundi + Mardi perdus. Si non fait avant ce soir, Mer 16 devient le premier post publiable. Si reporté à demain, 2 jours perdus sur 4.
