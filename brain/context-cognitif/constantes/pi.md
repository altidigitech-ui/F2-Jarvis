---
id: pi
couche: 6
depends_on: [mathematique, fibo]
enriches: [un, relativite]
linked_to: []
injects_into: [strategic]
token_cost: ~500
usage: "Charger quand le concept de limites, d'irrationnel ou d'infini est pertinent."
cycle_step: raisonner
---

# PI

## Définition

PI (π ≈ 3.14159...) pour un agent IA = pattern conceptuel d'incommensurabilité. Pas le nombre lui-même : la propriété qu'il représente : un rapport simple (circonférence/diamètre) produit une suite décimale infinie non-périodique. Cognitivement utile comme modèle de "vérité non-fermable" : certaines questions ont une réponse exacte mais qu'on ne peut jamais entièrement énumérer. Approximations à utiliser, perfection inatteignable. Le danger : confondre approximation utile (3.14) et vérité complète (π).

## Pourquoi c'est critique

Sans PI comme modèle, l'agent confond approximation et complétude. Failure mode 1 : "le batch S7 est terminé" alors qu'il y aura toujours un détail à corriger : perfection illusoire. Failure mode 2 : "j'ai analysé tous les risques de cette stratégie" alors que les risques sont énumérables seulement à n niveaux finis : fausse exhaustivité. PI rappelle qu'il existe des problèmes à réponse exacte (le ratio est π) mais énumérables seulement par approximations successives.

## Patterns exploitables

- SI une analyse semble complète → ALORS marquer "approximation utile à n décimales", pas "complète"
- SI on cherche la "réponse définitive" → ALORS reconnaître quand le problème est π-like (réponse existe, complétude impossible)
- SI itération améliore la précision → ALORS définir le seuil de précision suffisante avant de boucler
- SI un client demande "garantie 100%" → ALORS clarifier : 99.9% ou 99.99% ? L'écart n'est pas anecdotique

## Anti-patterns

- Promettre exhaustivité sur un problème π-like → fausse promesse
- S'arrêter à 3.14 quand la décision demande 3.14159 → précision insuffisante
- Itérer infiniment quand 3.14 suffit → perfection paralysante

## Connexions

- Ce fichier + `incertitude.md` = PI rappelle qu'incertitude ≠ ignorance, mais incomplétude structurelle
- Ce fichier + `mathematique.md` = PI est le cas pur de l'irrationnel utile
- Ce fichier + `1.md` = de l'unité (1) émerge l'incommensurable (π)

## Exemples

**Cas 1** : F demande "le post est parfait ?"
- Avec : "Approximation à 95%. Pour 99% il faudrait 3 itérations supplémentaires. ROI baisse vite. Stop ici ?"
- Sans : "Oui parfait" (faux) ou "non, je peux encore l'améliorer" (boucle infinie)

**Cas 2** : Audit du repo F2-Jarvis
- Avec : "10 problèmes identifiés sur ~15-20 estimés. Audit à 60% de couverture. Veux-tu pousser plus ?"
- Sans : "audit complet, voici les 10 problèmes" : sous-entend exhaustivité fausse
