---
date: "2026-04-29"
timestamp: "2026-04-29T02:12:07.541Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Fabrice — daily-checklist.md : BLOC Couche B manquant, J1 Couche B démarre aujourd'hui
**Contexte:** fabrice/daily-checklist.md, dernière mise à jour le 04/04/2026, ne contient aucun bloc 18h-21h pour la Couche B. Le fichier s'arrête à un "BLOC SOIR" générique qui ne mentionne ni les posts 18h Twitter, ni le LinkedIn 21h, ni les cross B (19h05 et 20h05). Aujourd'hui Mer 29/04 est J1 Couche B — le créneau le plus chargé de S7 (5 publications + 3 cross minimum). La proposal ACCEPTED hier soir demandait de "proposer le fix détaillé avant de toucher quoi que ce soit" — JARVIS devait le faire à 00:03 mais le fichier est resté inchangé.

**Recommandation:** Insérer le bloc suivant dans fabrice/daily-checklist.md, AVANT le bloc "FIN DE JOURNÉE", en remplacement du "BLOC SOIR — COMPLÉMENTAIRE" actuel (le fusionner / le compléter) :

```
## BLOC 18h-21h — COUCHE B (mer-sam uniquement) 🔴 NON NÉGOCIABLE

### Publication + Cross Couche B

- [ ] 18h00 : Publier post Twitter F Couche B (voir plan-hebdo — B1/B2/B3/B4 selon le jour)
- [ ] 19h05 : Cross-engagement sur post Twitter R Couche B (reply technique + like)
- [ ] 20h05 : Cross-engagement sur post F2 Twitter Couche B (reply technique + like)
- [ ] 21h00 : Publier post LinkedIn F Couche B (voir plan-hebdo)
- [ ] Logger les 2 cross dans fabrice/engagement/cross-execution-log.md
- [ ] Si replies reçues → répondre dans les 2h
```

**Action:**
- Fichier: `fabrice/daily-checklist.md`
- Remplacer le bloc `## BLOC SOIR — COMPLÉMENTAIRE 🟢 FLEXIBLE` (lignes 49-54) par le bloc ci-dessus
- Mettre à jour la date en tête : `**Dernière mise à jour :** 29 avril 2026`
- Mettre à jour le tableau "RÉCAP VOLUMES QUOTIDIENS" : ajouter ligne `| Posts Couche B (mer-sam) | 1 Twitter + 1 LinkedIn/jour | 🔴 NON |`

**Risques si ignoré:** Fabrice aborde J1-J4 Couche B sans workflow formalisé. Risque de rater le créneau 18h ou les cross B dans l'urgence de la journée la plus chargée de S7.
