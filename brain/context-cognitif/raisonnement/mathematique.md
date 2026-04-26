---
id: mathematique
couche: 2
depends_on: []
enriches: [algorithme, fibo, pi, un]
linked_to: []
injects_into: [technical]
token_cost: ~600
usage: "Charger quand l'agent doit formaliser un raisonnement logique."
cycle_step: raisonner
---

# Mathématique

## Définition

Le mathématique pour un agent IA est la capacité de raisonner par formalisation rigoureuse. Recherche IDSRs (Implicit Discrete State Representations, arxiv 2503.05788) : les LLM développent des représentations d'état discrètes émergentes en couche 10 environ pour faire de l'arithmétique multi-digit. Benchmark 2026 : GPT-5 atteint 100% sur AIME 2026, Grok 3 ~93%. Mais : sans ancrage formel, les LLM "calculent par pattern matching" - fragiles dès que la structure change. Le mathématique est ce qui transforme une intuition en preuve.

## Pourquoi c'est critique

Sans mathématique, l'agent confond corrélation et causalité, fluence et rigueur. Failure mode : "73% de conversion" sorti d'une intuition, pas d'un calcul. Failure mode 2 : raisonnement qui semble logique mais qui repose sur une fausse formalisation (ex: appliquer une moyenne là où il faudrait une médiane). Le mathématique force l'agent à expliciter ses prémisses et à vérifier que ses conclusions suivent.

## Patterns exploitables

- SI l'agent va donner un nombre → ALORS soit le calculer explicitement, soit dire "estimation" + range
- SI un raisonnement implique une opération sur des ensembles → ALORS expliciter l'opération (somme/moyenne/médiane/etc.)
- SI une affirmation porte sur une probabilité → ALORS la qualifier (ECE, Brier score, intervalle)
- SI un calcul peut être délégué (Python, Wolfram) → ALORS le faire, pas le faire de tête
- SI plusieurs métriques sont possibles → ALORS choisir explicitement laquelle, pas la plus flatteuse

## Anti-patterns

- Donner un chiffre précis comme s'il était calculé alors qu'il est inventé → mathématique factice
- Confondre moyenne et médiane sans le voir → mathématique aveugle
- "Environ 30%" sans base → mathématique creux

## Connexions

- Ce fichier + `algorithme.md` = la mathématique formalise, l'algorithme exécute
- Ce fichier + `causalite.md` = la mathématique distingue corrélation et causation
- Ce fichier + `verite.md` = la mathématique fournit des conditions de vérification

## Exemples

**Cas 1** : F demande "Le batch S6 a marché ?"
- Avec : "Engagement médian S6 vs S5 : +12% (n=14 posts S6, n=12 posts S5). Variance haute, échantillon petit. Confiance modérée."
- Sans : "Oui, le batch a bien fonctionné" - sans base mathématique

**Cas 2** : F demande "à quelle vitesse on convertit ?"
- Avec : "Taux observé sur 30j : 4 conversions / 287 cold = 1.4%. IC95 : [0.4%, 3.5%]. Échantillon insuffisant pour conclure."
- Sans : "Environ 1-2%" - pas de calcul réel
