---
id: complexe
couche: 9
depends_on: [englobage, propagation]
enriches: [evolution]
linked_to: []
injects_into: [strategic]
token_cost: ~500
usage: "Charger quand le tout dépasse la somme des parties."
cycle_step: raisonner
---

# Complexe

## Définition

Complexe pour un agent IA = **système où l'émergence produit des propriétés non réductibles aux composants**. Distinct du **compliqué** (beaucoup de parties mais déterministe, comme une montre suisse) - le complexe est non-linéaire, sensitive aux conditions initiales, génère des comportements émergents. Santa Fe Institute (Gell-Mann, Holland) : Complex Adaptive Systems (CAS). Conway's Game of Life (1970) : 4 règles simples → patterns infinis émergents (gliders, oscillateurs, machines de Turing). Marchés économiques, fourmilières, F2 lui-même = systèmes complexes.

## Pourquoi c'est critique

Sans cadre complexe, l'agent applique des solutions linéaires à des problèmes non-linéaires. Failure mode 1 : "doubler le marketing → doubler les conversions" - linéaire, faux. Failure mode 2 : prédire le comportement F2 par décomposition (StoreMD + ProfitPilot + audience) → manque l'émergent (réputation, network effects, brand). Failure mode 3 : sur-contrôler un système complexe → casse l'émergence positive. Le complexe se gouverne par règles simples, pas par micro-management.

## Patterns exploitables

- SI le système a feedback loops → ALORS modèle complexe, pas linéaire
- SI petites variations → grandes conséquences → sensibilité aux conditions initiales (cf. graine.md)
- SI on veut influer un complexe → ALORS modifier les règles simples, pas chaque comportement
- SI on prédit un complexe → ALORS scénarios + probabilités, pas trajectoire unique
- SI le complexe émerge bien → ALORS ne pas sur-contrôler (laisser émerger)

## Anti-patterns

- Modèle linéaire sur système non-linéaire → prédictions toujours fausses
- Décomposer un complexe et additionner les parties → rate l'émergent
- Micro-manager au lieu de définir des règles claires → tue l'émergence

## Connexions

- Ce fichier + `englobage.md` = le complexe émerge entre niveaux d'englobage
- Ce fichier + `propagation.md` = la propagation dans un complexe est non-linéaire
- Ce fichier + `evolution.md` = l'évolution opère sur les systèmes complexes

## Exemples

**Cas 1** : F demande "si je double le contenu, je double les conversions ?"
- Avec : "Système complexe avec saturation et fatigue audience. Probable courbe en S, plateau possible. Pas linéaire."
- Sans : "Oui ça suit" - modèle naïf

**Cas 2** : F2 = F + R + Studio + agents + audience + repo
- Avec : "Réputation F2 = émergent, pas réductible aux composants. Tu peux tout optimiser individuellement et rater l'émergent (cohérence brand)."
- Sans : optimise chaque composant indépendamment → brand fragmenté
