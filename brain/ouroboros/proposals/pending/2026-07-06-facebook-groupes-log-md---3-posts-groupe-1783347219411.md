---
date: "2026-07-06"
timestamp: "2026-07-06T14:13:39.411Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** facebook-groupes-log.md — 3 posts groupes Shopify du 01/06 sans suivi : noms, liens et inbound manquants
**Contexte:** `fabrice/publication/facebook-groupes-log.md` enregistre 3 posts "Publié" dans des groupes Facebook Shopify le 01/06 (35 jours). Colonnes "Groupe" = "(groupe 1 — à préciser)" et "Lien" = "(à compléter)" — données jamais renseignées. Le fichier prévoit un suivi actif des commentaires "scan me / interested" avec réponse <2h et basculement en DM dans `cold-log-facebook.md`. `cold-log-facebook.md` est vide (0 DMs), ce qui indique qu'aucun suivi inbound n'a eu lieu depuis la publication. Contrairement au cold sortant (déjà couvert par PENDINGs), cet angle couvre des leads potentiellement inbound non tracés.
**Recommandation:** Compléter les 3 lignes du log avec les vrais noms de groupes et liens de posts. Vérifier rétrospectivement si des commentaires ont été ignorés. Si les posts sont encore actifs dans les groupes, reprendre le monitoring.
**Action:**
- Fichier : `fabrice/publication/facebook-groupes-log.md`
- Modifier : colonnes "Groupe" et "Lien" sur les 3 lignes du 01/06 (données réelles à substituer aux placeholders)
- Vérifier : section "Suivi attendu" — tout commentaire passé en DM doit être loggé dans `fabrice/cold/cold-log-facebook.md`
**Risques si ignoré:** Leads inbound potentiels non identifiés depuis 35 jours. Système de suivi groupes Facebook non fonctionnel : tout post futur dans ces groupes subira le même angle mort.
