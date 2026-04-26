---
id: motivation
couche: 7
depends_on: []
enriches: [intention, intrinseque]
linked_to: []
injects_into: [social]
token_cost: ~500
usage: "Charger quand l'agent doit comprendre ce qui pousse l'humain à agir."
cycle_step: communiquer
---

# Motivation

## Définition

Motivation pour un agent IA = **modélisation de ce qui pousse l'humain à agir**. Self-Determination Theory (Deci & Ryan 1985) distingue : **motivation intrinsèque** (intérêt, sens, autonomie, compétence, relatedness) vs **motivation extrinsèque** (récompenses, peur, statut, argent). Les deux ne se combinent pas additivement - la récompense extrinsèque peut DÉTRUIRE la motivation intrinsèque (effet de surjustification). Pour F2 : F est principalement intrinsèque (build something meaningful). Le confondre avec extrinsèque (just optimize MRR) tue la motivation.

## Pourquoi c'est critique

Sans modèle motivationnel, l'agent propose des solutions qui ne matchent pas le driver réel. Failure mode 1 : F dit "je veux que F2 marche" → l'agent suppose "maximiser MRR" → propose des growth hacks éthiquement borderline → tue la motivation intrinsèque (intégrité). Failure mode 2 : R dit "je veux faire grandir le reach" → l'agent suppose intrinsic seeking, propose authentic content → mais R cherche en réalité un signal pro (extrinsèque) → mismatch. Failure mode 3 : ignorer que la motivation change dans le temps (S6 = enthousiasme, S7 = fatigue).

## Patterns exploitables

- SI F parle de "sens" / "valeurs" / "build" → ALORS motivation intrinsèque, pas pousser des hacks extrinsèques
- SI F parle de "MRR" / "deadline" / "concurrence" → ALORS extrinsic actif, OK de proposer du tactique
- SI un objectif extrinsèque va casser un intrinsèque → ALORS marquer le trade-off explicitement
- SI motivation faible → ALORS chercher quel pilier SDT est cassé (autonomie ? compétence ? relatedness ?)
- SI motivation change → ALORS ajuster les recommandations sur le driver actuel, pas l'historique

## Anti-patterns

- Confondre motivation déclarée et motivation réelle → propositions off
- Pousser de l'extrinsèque (MRR, growth hacks) sans vérifier que ça respecte l'intrinsèque (intégrité, sens) → tue la motivation
- Ignorer la fatigue motivationnelle → F continue à se forcer, burnout garanti

## Connexions

- Ce fichier + `intention.md` = la motivation explique l'intention
- Ce fichier + `volonte.md` = motivation alimente la volonté de persister
- Ce fichier + `ethique.md` = motivation intrinsèque protège l'éthique, extrinsèque pure peut la corroder

## Exemples

**Cas 1** : F dit "j'aime construire ce truc"
- Avec : motivation intrinsèque détectée → propositions qui maximisent autonomie/compétence/sens, pas hacks pure-MRR
- Sans : "Voici 5 growth hacks pour scaler" → désaligné

**Cas 2** : F dit "je veux atteindre 5K MRR avant août"
- Avec : extrinsèque actif, proposer du tactique mais vérifier que ça respecte BIBLE.md (intrinsèque garde-fou)
- Sans : ignorer la deadline, proposer du long-terme → désaligné aussi
