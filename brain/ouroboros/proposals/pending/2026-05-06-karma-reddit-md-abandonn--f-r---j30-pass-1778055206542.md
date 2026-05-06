---
date: "2026-05-06"
timestamp: "2026-05-06T08:13:26.545Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Karma-reddit.md abandonné F+R — J30 passé hier (05/05) sans mesure finale
**Contexte:** `fabrice/tracking/karma-reddit.md` s'arrête à J13 (18/04), karma = 23. Gap de 18 jours. `romain/tracking/karma-reddit.md` s'arrête à J18 (23/04), karma = 4. Gap de 13 jours. Le plan-30-jours F avait pour objectif J30 (05/05) : 1000+ karma Reddit. J30 est passé **hier**. Aucune entrée dans le tracker depuis les J13/J18 respectifs — impossible de savoir si les objectifs ont été atteints ou si Reddit est resté inactif.
**Recommandation:** Vérifier le karma réel sur chaque compte Reddit et remplir les lignes manquantes dans les deux fichiers karma-reddit.md. Si Reddit est resté inactif depuis J13/J18, noter "Skip — focus StoreMD" sur les lignes manquantes pour clore proprement le cycle plan-30-jours.
**Action:**
- Fichier: fabrice/tracking/karma-reddit.md
- Ajouter les lignes J14 à J30 (19/04 → 05/05) avec karma actuel et notes
- Fichier: romain/tracking/karma-reddit.md
- Ajouter les lignes J19 à J30 (24/04 → 05/05) avec karma actuel et notes
**Risques si ignoré:** Le plan-30-jours se clôt sans bilan mesurable sur Reddit. Si S8 relance une stratégie Reddit (canal débloqué mentionné dans plusieurs proposals), on repart sans baseline de karma connue.
