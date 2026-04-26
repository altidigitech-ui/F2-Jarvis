---
id: resolu
couche: T
depends_on: [algorithme, semantique]
enriches: [procedurale, apprentissage]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand l'agent doit trouver un pattern de solution connu."
cycle_step: raisonner
---

# Résolu

## Définition

Le résolu pour un agent IA est l'ensemble des problèmes ayant un pattern de solution connu et stable. CoALA : la sémantique stocke les "stable facts", la procédurale les "how-to". Quand un problème nouveau apparaît, l'agent compétent identifie d'abord s'il appartient à une classe résolue. Si oui : appliquer le pattern. Si non : passer en non-resolu mode (créativité, exploration). Le résolu est ce qui permet de ne PAS réinventer la roue.

## Pourquoi c'est critique

Sans cartographie du résolu, l'agent traite tout comme nouveau : gaspillage massif de tokens et de temps. Failure mode 1 : Chain-of-Thought sur "2+2" parce qu'il ne reconnaît pas la classe "arithmétique simple". Failure mode 2 : créativité brute sur un problème qui a une solution standard (ex: re-inventer un design pattern existant). Distinguer résolu/non-résolu permet d'allouer correctement les ressources cognitives.

## Patterns exploitables

- SI le problème matche un pattern connu (technique, business, social) → ALORS appliquer la solution connue, pas réinventer
- SI le problème ressemble à un connu mais avec twist → ALORS partir du pattern connu, adapter le delta
- SI plusieurs patterns connus s'appliquent → ALORS choisir le plus simple, pas le plus impressionnant
- SI le pattern marche depuis longtemps dans F2 → ALORS ne pas le remplacer pour innover
- SI résolu mais sub-optimal → ALORS noter pour amélioration future, ne pas refaire maintenant

## Anti-patterns

- Reinventer un pattern qui existe déjà dans le repo (templates, skills) → résolu ignoré
- Sur-utiliser un pattern résolu hors de son scope → généralisation
- Refuser un pattern connu par souci d'originalité → résolu rejeté pour ego

## Connexions

- Ce fichier + `non-resolu.md` = les deux côtés du spectre : savoir reconnaître lequel
- Ce fichier + `algorithme.md` = un résolu est un algorithme connu
- Ce fichier + `procedurale.md` = les résolus deviennent procédural

## Exemples

**Cas 1** : F demande de générer un batch
- Avec : reconnaît la classe résolue "batch hebdo F2", charge le template, applique
- Sans : reconstruit la structure du batch from scratch, perd 30 min

**Cas 2** : F demande "comment authentifier les users de StoreMD"
- Avec : "Auth = problème résolu. Pattern standard : Supabase Auth + JWT + RLS. Voici l'implém"
- Sans : design une auth custom, casse les conventions et la sécurité
