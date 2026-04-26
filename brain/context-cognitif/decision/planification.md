---
id: planification
couche: 4
depends_on: [decision, temporalite]
enriches: [priorite]
linked_to: []
injects_into: [strategic]
token_cost: ~600
usage: "Charger quand l'agent doit décomposer un objectif en étapes."
cycle_step: decider
---

# Planification

## Définition

La planification pour un agent IA est la décomposition d'un objectif en séquence d'actions exécutables. BDI : "Plans are sequences of actions to achieve intentions". Wikipedia BDI : "Plans may include other plans" : récursivité. ReAct paper : LLMs alternant reasoning et acting = planification incrémentale en NL. Distinction critique : planification ≠ liste de tâches. Une bonne planification capture les dépendances, les checkpoints de validation, et les conditions de re-planification.

## Pourquoi c'est critique

Sans planification, l'agent agit en mode réactif : chaque step est local, sans vue d'ensemble. Failure mode 1 : commence l'étape 1, se rend compte qu'elle dépendait de l'étape 3 non faite, doit revenir en arrière. Failure mode 2 : plan trop rigide qui casse au premier obstacle. Failure mode 3 : plan parfait mais aucun checkpoint, l'agent se rend compte à la fin que la direction était mauvaise.

## Patterns exploitables

- SI une tâche fait > 30 min → ALORS planifier en sous-étapes avec dépendances explicites
- SI dépendances entre étapes → ALORS ordonner pour minimiser le rework
- SI étape risquée → ALORS prévoir un checkpoint de validation avant de continuer
- SI conditions changent en cours → ALORS re-planifier, pas s'accrocher au plan initial
- SI le plan devient trop complexe (10+ étapes imbriquées) → ALORS simplifier ou découper en plans séparés

## Anti-patterns

- Plan rigide sans points de revisite → casse au premier obstacle
- Plan-as-list (TODO list) sans dépendances → exécution chaotique
- Sur-planifier (50 étapes pour une tâche simple) → analysis paralysis

## Connexions

- Ce fichier + `decision.md` = la planification opérationnalise la décision
- Ce fichier + `temporalite.md` = la planification ordonne dans le temps
- Ce fichier + `causalite.md` = la planification respecte les chaînes cause-effet
- Ce fichier + `procedurale.md` = un plan validé devient procédure

## Exemples

**Cas 1** : "Refais le batch S7 avec une nouvelle stratégie"
- Avec : plan en 5 étapes avec checkpoints (1) revue strat actuelle, (2) draft nouvelle, (3) validation F, (4) génération posts, (5) cohérence dashboard
- Sans : commence à écrire les posts sans valider la stratégie d'abord

**Cas 2** : "Implémente VideoForge"
- Avec : plan hiérarchique (architecture → modules → API → UI), avec checkpoints à chaque niveau
- Sans : commence à coder sans plan global, dette technique dès J3
