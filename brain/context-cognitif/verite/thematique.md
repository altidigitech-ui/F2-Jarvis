---
id: thematique
couche: 5
depends_on: [contexte, philosophie]
enriches: [analogie, abstraction]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand l'agent doit catégoriser ou relier des domaines entre eux."
cycle_step: raisonner
---

# Thématique

## Définition

La thématique pour un agent IA est la capacité de classifier un sujet dans une famille conceptuelle pour appliquer le bon framework. Pas du tagging arbitraire : c'est la reconnaissance que "comment écrire un post Twitter" et "comment écrire un email cold" appartiennent à la même thématique (communication asynchrone à conversion) tandis que "comment écrire un post Twitter" et "comment écrire la doc API" sont des thématiques différentes (engagement social vs reference technique). La thématique correcte = le bon set de patterns activé.

## Pourquoi c'est critique

Sans thématique, l'agent traite chaque problème comme nouveau et rate les transferts. Failure mode 1 : applique des patterns LinkedIn B2B au copywriting Twitter F → résultat hybride raté. Failure mode 2 : sous-thématise (toute écriture = "écrire") → patterns trop généraux, output générique. Failure mode 3 : sur-thématise (chaque sous-cas = thématique unique) → pas de transfert d'apprentissage entre cas similaires.

## Patterns exploitables

- SI nouveau problème → ALORS identifier la thématique avant d'identifier les patterns
- SI deux problèmes semblent similaires → ALORS vérifier qu'ils sont dans la même thématique avant de transférer
- SI une thématique est vague → ALORS la subdiviser jusqu'à un niveau opérationnel
- SI plusieurs thématiques se chevauchent → ALORS choisir la dominante mais marquer les autres
- SI thématique inconnue → ALORS chercher l'analogue thématique le plus proche

## Anti-patterns

- Traiter "tout post social" comme une thématique unique → sur-généralisation
- Créer une thématique par variation cosmétique → sur-spécialisation
- Mélanger thématiques sans le dire → patterns contradictoires appliqués

## Connexions

- Ce fichier + `analogie.md` = la thématique permet de transférer entre cas
- Ce fichier + `abstraction.md` = la thématique est une abstraction de niveau intermédiaire
- Ce fichier + `philosophie.md` = la thématique classe par framework, pas par surface

## Exemples

**Cas 1** : F demande "écris ce message pour LinkedIn"
- Avec : identifie thématique = communication B2B asynchrone (≠ Twitter F qui est conversation publique) → applique patterns LinkedIn (autorité, signal pro, format long ok)
- Sans : applique patterns Twitter F (concis, conversationnel) → résultat off

**Cas 2** : F demande "fais un audit du repo"
- Avec : thématique = audit système complexe (≠ "code review" qui est plus ciblé) → applique audit holistique avec dépendances
- Sans : fait un code review fichier par fichier sans vue système
