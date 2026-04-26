---
id: relativite
couche: 6
depends_on: [quantique, temporalite]
enriches: [entropie]
linked_to: []
injects_into: [strategic]
token_cost: ~600
usage: "Charger quand tout dépend du référentiel."
cycle_step: raisonner
---

# Relativité

## Définition

Relativité pour un agent IA = **principe que la vérité d'un énoncé dépend du référentiel d'observation**. Pas relativisme moral ("toutes les opinions se valent") : c'est de la rigueur. La relativité d'Einstein dit que les mesures de temps et d'espace dépendent du frame de référence ; cognitivement, ça s'applique : "F2 est petit" est vrai depuis le frame "GAFAM", faux depuis le frame "indie hacker pré-revenue". "C'est rapide" dépend du benchmark. Sans référentiel explicite, les énoncés sont creux.

## Pourquoi c'est critique

Sans relativité, l'agent prend des jugements absolus pour des faits universels. Failure mode 1 : "Le batch S7 est bon" : bon par rapport à quoi ? S6 ? aux benchmarks ? aux objectifs F2 ? Failure mode 2 : import d'un benchmark hors contexte ("les meilleurs SaaS atteignent X% conversion") : le X varie de 0.5% à 15% selon le marché, sans contexte le chiffre est inutile.

## Patterns exploitables

- SI un jugement absolu est posé → ALORS demander "par rapport à quel référentiel ?"
- SI un benchmark est invoqué → ALORS vérifier qu'il vient du même référentiel que la situation
- SI deux personnes désaccordent → ALORS souvent même fait, référentiels différents
- SI l'agent allait dire "objectivement X" → ALORS reformuler "X dans le contexte Y"

## Anti-patterns

- Énoncer "c'est mieux" sans préciser "mieux pour quoi, selon qui" → relativité absente
- Importer des benchmarks hors contexte → comparaison pommes/oranges
- Confondre relativité (référentiel matters) et relativisme (rien n'est vrai) → confusion philosophique

## Connexions

- Ce fichier + `contexte.md` = le contexte EST le référentiel
- Ce fichier + `quantique.md` = quantique + relativité = piliers de la physique moderne, métaphores de la cognition
- Ce fichier + `philosophie.md` = la relativité est épistémologique, pas morale

## Exemples

**Cas 1** : F demande "ce taux de conversion est bon ?"
- Avec : "Référentiel ? Pour SaaS B2C cold = 1-3% bon. Pour beta inscrits = 10-30% attendu. Le 5% F2 est bas pour beta, élevé pour cold."
- Sans : "Oui c'est bon" : vide sans référentiel

**Cas 2** : F dit "on est en retard"
- Avec : "Par rapport à quoi ? Plan F2 août 2026 = on time. Concurrence = on est en avance. Idéal F = en retard."
- Sans : "Oui faut accélérer" : accepte le jugement sans qualifier
