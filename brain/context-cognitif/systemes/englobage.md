---
id: englobage
couche: 8
depends_on: [organisation]
enriches: [complexe, propagation]
linked_to: [emotion, reaction]
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand des systèmes imbriqués ou conteneurs sont en jeu."
cycle_step: raisonner
---

# Englobage

## Définition

Englobage pour un agent IA = **principe que tout système est à la fois un tout (composé de parties) ET une partie (d'un tout plus grand)**. Concept de **holon** (Arthur Koestler, "The Ghost in the Machine" 1967) : un atome est un tout pour ses particules, une partie pour la molécule. Pour F2 : un post est un tout (mots) et une partie (du batch). Le batch est un tout (posts) et une partie (de la stratégie semaine). La semaine est un tout et une partie du plan F2. Comprendre le bon niveau d'englobage = comprendre où agir.

## Pourquoi c'est critique

Sans englobage, l'agent confond les niveaux. Failure mode 1 : F demande "ce mot sonne bien ?" → l'agent optimise le mot isolé → casse la cohérence du post (sur-optimisation locale). Failure mode 2 : optimise un post → casse la dynamique du batch (le post est trop fort, déséquilibre les autres). Failure mode 3 : optimise le batch → désaligne la stratégie semaine. Niveau d'optimisation ≠ niveau d'évaluation. La bonne action dépend du niveau auquel on est.

## Patterns exploitables

- SI on optimise un élément → ALORS vérifier que ça ne casse pas le niveau supérieur
- SI on évalue un système → ALORS l'évaluer au niveau qui correspond à son rôle (un post pour le batch, un batch pour la semaine)
- SI un changement à un niveau inférieur → ALORS propager les implications au niveau supérieur
- SI un problème à un niveau → ALORS chercher si la cause est au niveau supérieur (Hofstadter strange loop)
- SI un détail bouge → ALORS regarder le contexte englobant avant de réagir

## Anti-patterns

- Sur-optimiser un élément hors contexte d'englobage → break du niveau supérieur
- Critiquer un détail sans considérer le tout → critique sans valeur
- Confondre "le tout" et "la somme des parties" (sera traité dans complexe.md)

## Connexions

- Ce fichier + `organisation.md` = l'organisation hiérarchise les niveaux d'englobage
- Ce fichier + `emotion.md` + `reaction.md` = triplet lié (linked_to) - l'émotion englobe la conversation, pas un mot
- Ce fichier + `complexe.md` = l'englobage permet à la complexité d'émerger

## Exemples

**Cas 1** : F dit "ce mot dans le post 3 sonne off"
- Avec : "Mot off OU déséquilibre par rapport au post entier OU par rapport au batch. Niveau d'englobage du problème ?"
- Sans : change le mot → casse le rythme du post

**Cas 2** : Une feature StoreMD performe mal
- Avec : "Feature isolée OU intégration cassée OU problème stratégie produit ? Vérifier les 3 niveaux."
- Sans : optimise la feature → ignore que le problème est au niveau stratégie
