---
date: "2026-04-27"
timestamp: "2026-04-26T22:11:26.636Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte-opérationnelle
**Titre:** Posts Romain S7 : 12 publications manuelles ⏳ — risque immédiat lundi 14h00

**Contexte:** `romain/plan-hebdo.md` montre 12 publications S7 toutes en ⏳ (0 schedulées) : 5 posts Twitter Couche A (lun-ven 14h00), 3 posts Twitter Couche B (mer-ven 19h00), 2 posts LinkedIn Couche A (mar+jeu), 2 posts LinkedIn Couche B (mer+ven). En comparaison, `fabrice/plan-hebdo.md` affiche 10 posts en 📅 (automatiques) sauf le thread mardi manuel. La conversation du 25/04 22h47 ne mentionne que le scheduling de "mes posts" par Fabrice — aucune mention du scheduling de Romain.

**Risque immédiat :** Le post Romain A1 Twitter **27/04 à 14h00** est ⏳ (manuel). Si Romain n'est pas disponible à 14h, le post rate. Conséquence directe : Fabrice doit cross-engager ce post à 14h05 (cross A1, `fabrice/engagement/cross-execution-log.md` ligne A1). Si le post R n'existe pas, ce cross tombe à l'eau et la chaîne amplification Couche A lundi est brisée.

**Recommandation:** Vérifier si Romain peut accéder à un outil de scheduling (Buffer, Publer, TweetDeck). Si oui, scheduler ses 12 posts S7 dès ce matin. Si le scheduling n'est pas possible, mettre en place un rappel quotidien : 13h45 (avant 14h post Twitter), 18h45 (avant 19h Couche B), 16h45 (avant 17h LinkedIn).

**Risques si ignoré:** Posts Romain ratés → chaîne cross F/R rompue sur 5 jours → perte de signal d'amplification mutuelle qui a été la meilleure tactique S6 (638 imp. agency post).
