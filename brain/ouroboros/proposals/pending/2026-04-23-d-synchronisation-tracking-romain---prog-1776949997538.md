---
date: "2026-04-23"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Titre:** Désynchronisation tracking Romain — progress-semaine vs engagement-log vs compteurs
**Contexte:** Le progress-semaine R indique une activité Twitter le 23/04 (aujourd'hui) : "5 replies : @pauljauregui 15K, @KaiCromwell 12K, @Goldikam 3.5K, @growthzacks 2.5K, @wetracked 1.2K". Pourtant : (1) les compteurs Romain affichent twEng=0, (2) l'engagement-log R section Twitter est **complètement vide** sur toute la semaine. Le système de compteurs lit l'engagement-log — pas le progress-semaine. Les 5 replies de ce matin ne sont pas comptabilisées, et ne seront pas incluses dans les métriques fin de semaine.
**Recommandation:** Logger les 5 replies Twitter de ce matin dans l'engagement-log R (format standard : date, heure, résumé post, reply envoyée). Vérifier si le 22/04 PH (logué dans progress-semaine) a été dupliqué dans l'engagement-log R section PH. Établir un réflexe : engagement-log = source de vérité, progress-semaine = events notables seulement.
**Risques si ignoré:** Les métriques de fin de semaine sous-estiment l'activité réelle. Impossible de diagnostiquer la performance (engagement rate, taux de réponse). Le retrospective S6 sera basé sur des données incomplètes.
