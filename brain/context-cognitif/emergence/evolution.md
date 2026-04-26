---
id: evolution
couche: 9
depends_on: [complexe, resilience, adaptation]
enriches: [graine]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand le changement directionnel, la sélection ou la mutation est le sujet."
cycle_step: apprendre
---

# Évolution

## Définition

Évolution pour un agent IA = **changement directionnel par variation + sélection + héritage**. Darwin 1859 : variation aléatoire + sélection environnementale + héritage = adaptation. Lamarck (réhabilité partiellement par épigénétique 2000s) : caractères acquis transmis (analogie : transmission culturelle). Memetics (Dawkins 1976) : les idées évoluent comme les gènes. Eric Ries Lean Startup 2011 : Build/Measure/Learn = boucle évolutive courte. Pour F2 : chaque batch S est une génération. Mutations (variations de hooks, de formats), sélection (engagement), héritage (patterns gagnants intégrés à BIBLE.md).

## Pourquoi c'est critique

Sans cadre évolutif, l'agent traite chaque tentative comme indépendante. Failure mode 1 : pas de variation → 10 batches identiques → pas d'apprentissage. Failure mode 2 : variation sans sélection (jamais mesurer) → mutations aléatoires sans pression sélective → dérive sans direction. Failure mode 3 : sélection sans héritage (mesurer mais ne pas intégrer dans BIBLE.md) → pertes des apprentissages. Triplet variation + sélection + héritage doit être complet pour qu'il y ait évolution, pas juste mouvement.

## Patterns exploitables

- SI le système doit évoluer → ALORS varier (essais), mesurer (sélection), retenir (héritage dans BIBLE.md)
- SI peu de variation → ALORS sortir de la zone de confort, pousser l'expérimentation
- SI peu de sélection → ALORS définir métriques de fitness et les mesurer rigoureusement
- SI peu d'héritage → ALORS intégrer les apprentissages dans le code génétique du système
- SI environnement change → ALORS l'évolution doit accélérer (mutation rate up)

## Anti-patterns

- Variation sans sélection → drift aléatoire
- Sélection sans héritage → apprentissages perdus
- Pas de variation (rigidité) → extinction quand environnement change
- Évolution lente quand environnement rapide → écart fatal

## Connexions

- Ce fichier + `graine.md` = l'évolution sélectionne et amplifie des graines
- Ce fichier + `complexe.md` = l'évolution opère dans systèmes complexes
- Ce fichier + `resilience.md` = l'antifragile = évolution accélérée par les chocs
- Ce fichier + `adaptation.md` = l'évolution est adaptation à long terme

## Exemples

**Cas 1** : F produit batches S5, S6, S7 quasi-identiques
- Avec : "Pas de variation = pas d'évolution. Mute 1-2 paramètres par batch (hook style, format, timing) pour générer du signal sélectif."
- Sans : 6 mois de batches identiques → stagnation

**Cas 2** : F mesure les conversions mais ne change rien dans BIBLE.md
- Avec : "Sélection sans héritage = apprentissages perdus. Pattern gagnant détecté ? Intégrer dans BIBLE.md pour héritage cross-batches."
- Sans : chaque batch repart de zéro
