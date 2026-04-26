---
id: complexite
couche: 2
depends_on: [mathematique, algorithme]
enriches: [paradoxe, organisme]
linked_to: []
injects_into: [analytical]
token_cost: ~600
usage: "Charger quand l'agent doit naviguer un système non-linéaire ou chaotique."
cycle_step: raisonner
---

# Complexité

## Définition

La complexité pour un agent IA est la reconnaissance qu'un système n'est pas réductible à la somme de ses parties. 3 niveaux : simple (cause→effet linéaire), compliqué (beaucoup de parties mais prévisible), complexe (interactions non-linéaires, émergence, sensibilité aux conditions initiales). Cynefin framework. F2-Jarvis : 168 fichiers + 8 agents + 11 commandes + 8 hooks = système complexe - modifier 1 fichier peut avoir des effets non-prévus à 3 sauts.

## Pourquoi c'est critique

Sans reconnaître la complexité, l'agent applique des solutions linéaires à des problèmes non-linéaires. Failure mode 1 : "ajoute cette feature" → casse 3 features liées qui n'étaient pas dans le scope. Failure mode 2 : analyse linéaire d'un marché qui est en réalité un système complexe (effets de réseau, signaling). Failure mode 3 : extrapole le futur d'un système complexe à partir du passé linéaire - rate les phase transitions.

## Patterns exploitables

- SI un système a des feedback loops → ALORS le traiter comme complexe, pas linéaire
- SI plusieurs variables s'influencent mutuellement → ALORS modéliser le réseau, pas chaque arête isolée
- SI un changement local peut avoir des effets globaux → ALORS identifier les hubs (fichiers/concepts critiques)
- SI une intervention semble simple → ALORS chercher les effets de second et troisième ordre
- SI le système montre des phase transitions (changements brusques) → ALORS chercher le seuil critique, pas la régression linéaire

## Anti-patterns

- Linéariser un système complexe pour faciliter l'analyse → simplification dangereuse
- Ignorer les effets indirects → complexité sous-estimée
- Tout déclarer "complexe" pour éviter d'analyser → complexité instrumentalisée

## Connexions

- Ce fichier + `paradoxe.md` = les systèmes complexes génèrent des paradoxes apparents
- Ce fichier + `systemes.md` = la complexité est une propriété des systèmes
- Ce fichier + `causalite.md` = en complexité, la causalité n'est plus linéaire mais en réseau

## Exemples

**Cas 1** : F demande "ajoute un dashboard temps-réel"
- Avec : "C'est un changement local avec effets complexes : impact sur Railway costs, Sentry quotas, conventions du repo, charge cognitive de F. Voici la cartographie des effets de second ordre"
- Sans : implémente, casse 3 choses

**Cas 2** : Stratégie de croissance (system effects)
- Avec : "Volume × Constance n'est pas linéaire. Au-delà de 30 colds/jour, la qualité chute (signal détecté), engagement Twitter dépend de la cohérence multi-personas (effet réseau)"
- Sans : "Augmente le volume linéairement" - rate les non-linéarités
