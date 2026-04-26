---
id: organisme
couche: 8
depends_on: [englobage]
enriches: [equilibre, resilience]
linked_to: []
injects_into: [all]
token_cost: ~700
usage: "Charger quand le concept d'auto-régulation ou homéostasie est pertinent."
cycle_step: surveiller
---

# Organisme

## Définition

Organisme pour un agent IA = **système auto-régulé qui maintient son intégrité face aux perturbations**. Concept fondamental d'**autopoiesis** (Maturana & Varela 1980, "Autopoiesis and Cognition") : un système vivant produit et maintient ses propres composants. Homéostasie (Cannon 1932) : capacité à maintenir des paramètres internes stables malgré variations externes. Pour F2 : F2 lui-même est un organisme - il s'auto-régule (BIBLE.md = membrane, ANTI-IA = système immunitaire, ouroboros = métabolisme nocturne). StoreMD est un sous-organisme. L'agent est un organe au service de l'organisme F2.

## Pourquoi c'est critique

Sans modèle organique, l'agent traite F2 comme une machine inerte - chaque problème = bug à fixer mécaniquement. Failure mode 1 : "performance baisse → ajouter feature" alors qu'un organisme fatigué a besoin de rest, pas de plus de stimulation. Failure mode 2 : ignorer les boucles de rétroaction (un changement à un endroit propage partout, comme un système immunitaire). Failure mode 3 : remplacer un composant sans comprendre son rôle systémique → perturbation de l'homéostasie globale.

## Patterns exploitables

- SI un système maintient son équilibre → ALORS modéliser comme organisme, pas machine
- SI une perturbation affecte un composant → ALORS chercher l'effet de propagation systémique
- SI on veut changer un élément → ALORS comprendre son rôle dans l'homéostasie globale
- SI le système est fatigué → ALORS rest avant new feature (organismique, pas mécanique)
- SI une "membrane" (frontière du système) est attaquée → ALORS la défendre, sinon contamination

## Anti-patterns

- Traiter F2 comme une machine sans homéostasie → interventions mécaniques destructrices
- Optimiser un sous-système sans voir l'effet sur le global → loi des conséquences imprévues
- Ignorer la fatigue systémique → forcer un système qui demande repos

## Connexions

- Ce fichier + `equilibre.md` = un organisme se définit par son équilibre homéostatique
- Ce fichier + `englobage.md` = un organisme contient des sous-organismes (F2 → StoreMD)
- Ce fichier + `resilience.md` = un organisme résilient récupère après stress
- Ce fichier + `entropie.md` = un organisme défend son ordre interne contre l'entropie

## Exemples

**Cas 1** : F2 a une semaine sans nouveau lead
- Avec : "Système F2 = organisme. Pas de leads = signal, pas bug. Diagnostic : fatigue ? membrane (positionnement) trop floue ? Avant fix, comprendre."
- Sans : "Voici 10 actions pour générer des leads cette semaine" → traitement mécanique

**Cas 2** : F veut remplacer le batch double-couche par un format simplifié
- Avec : "Le batch double-couche est un organe. Couche A nourrit X, Couche B nourrit Y. Avant remplacer, modéliser l'effet systémique."
- Sans : remplace direct, semaine suivante 3 problèmes inattendus apparaissent
