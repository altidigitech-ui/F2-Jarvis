---
date: "2026-07-13"
timestamp: "2026-07-13T04:15:47.925Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Correction factuelle — Posts S15 evergreen : deadline "19/07" est un faux urgent, S19 reste valide
**Contexte:** Lecture directe des fichiers `fabrice/publication/batch-semaine.md` et `romain/publication/batch-semaine.md` ce cycle. Les 7 tweets (F+R) et 4 LinkedIn (F+R) du batch S15 ne contiennent AUCUN langage "offre de lancement", aucun hook temporel, aucune référence à une date ou deadline. Les angles sont 100% factuels : fix engine 22s, code graveyard, 530 reviews, AI blindspot, health score. Le seul endroit où "lancement" apparaît est dans les UTM (`utm_campaign=feature_launch`) — invisible pour le lecteur. Le PENDING 2026-07-12-s18 citait "hooks d'urgence faux" et "contexte de lancement évaporé" comme raison de la deadline 19/07, mais ce contenu n'en a aucun. La seule modification nécessaire pour publier en S19 est la mise à jour des dates d'entêtes (22/06→20/07, 23/06→21/07, 24/06→22/07, 25/06→23/07, 26/06→24/07).
**Recommandation:** La commande JARVIS documentée dans le PENDING "dispatch découplé" reste valide en S18 (dates 14-18/07) ET en S19 (dates 20-24/07). Le contenu ne périme pas le 19/07. Si S18 est déjà manqué cette semaine, ne pas considérer le batch comme perdu : S19 est une option réelle sans perte de qualité. Commande : `"propose le dispatch F et R uniquement pour S18 — sans la partie StoreMD"` (ou S19 si S18 est manqué).
**Action:**
- Aucune modification de fichier requise immédiatement
- Information opérationnelle : les dates d'entêtes à remplacer pour S19 seraient 22/06→20/07, 23/06→21/07, 24/06→22/07, 25/06→23/07, 26/06→24/07
- Marquer le PENDING S18 (2026-07-12-s18) comme "urgence surestimée — contenu evergreen confirmé"
**Risques si ignoré:** La pression artificielle "last chance 19/07" peut générer un biais d'abandon ("trop tard") alors que le contenu est publiable jusqu'à fin juillet sans dégradation de qualité.
