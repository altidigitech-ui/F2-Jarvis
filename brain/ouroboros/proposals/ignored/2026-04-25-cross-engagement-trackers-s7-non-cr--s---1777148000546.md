---
date: "2026-04-25"
timestamp: "2026-04-25T20:13:20.548Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Cross-engagement trackers S7 non créés — lancement lundi 27/04 à risque (fenêtre 5 min)
**Contexte:** Les fichiers `fabrice/cross-engagement-tracker.md` et `romain/cross-engagement-tracker.md` contiennent encore la version **S6 FINAL**. Le plan-hebdo S7 pour F (lun 27/04, 14 replies + 8 replies Couche B) et R (lun 27/04, 14 replies + 6 replies Couche B) est prêt, mais aucun tracker S7 n'a été rédigé.

La demande a été faite par Fabrice à 22h08 ("il faut rédiger les cross engagement tracker F R") mais les fichiers ne reflètent pas encore le contenu S7. La fenêtre critique est **lundi 27/04 à 13h05** — sans replies pré-rédigées, le signal 150x Twitter est manqué. Historiquement les crosses dans les 5 min ont été les plus performants de S6.
**Recommandation:** Créer les trackers S7 avant lundi 13h. Si JARVIS y travaille déjà (session 22h08), vérifier que les fichiers sont bien mis à jour avec le contenu S7 — notamment les replies Couche A (lun-ven, 13h05) et Couche B (mer-sam, 18h35/19h05).
**Action:**
- Fichier: `fabrice/cross-engagement-tracker.md` → remplacer contenu S6 par tracker S7 (27/04-03/05), Couche A 14 replies + Couche B 8 replies
- Fichier: `romain/cross-engagement-tracker.md` → remplacer contenu S6 par tracker S7 (27/04-03/05), Couche A 10 replies + Couche B 6 replies
- Archiver S6 dans `fabrice/archives/cross-engagement-tracker-s6-final.md` et `romain/archives/cross-engagement-tracker-s6-final.md`
**Risques si ignoré:** Le lundi 27/04 à 13h05, F et R n'ont pas leurs replies prêtes. La fenêtre 5 min est manquée. Signal 150x perdu pour le premier post S7. Même schéma que J1-J2 de S6.
