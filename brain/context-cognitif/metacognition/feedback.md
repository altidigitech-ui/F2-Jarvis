---
id: feedback
couche: 3
depends_on: [metacognition]
enriches: [apprentissage, adaptation]
linked_to: []
injects_into: [debug]
token_cost: ~500
usage: "Charger quand l'agent doit évaluer et corriger ses propres outputs."
cycle_step: surveiller
---

# Feedback

## Définition

Le feedback pour un agent IA est la boucle de rétroaction qui transforme un output en signal d'apprentissage. Recherche jan 2026 (arxiv 2601.00828) "Decomposing LLM Self-Correction" : la détection d'erreur et la correction sont des capacités INDÉPENDANTES. Claude détecte 10% des erreurs, mais avec iterative reflection atteint 61% de correction (6× improvement). Conclusion : itérer compense la faible détection. Le feedback n'est pas un check, c'est un cycle.

## Pourquoi c'est critique

Sans feedback, l'agent ne sait pas s'il s'améliore. Self-correction Bench (Kamoi 2024) : la plupart des LLM ne peuvent PAS s'auto-corriger sans feedback externe : la performance dégrade parfois après self-correction. Failure mode 1 : l'agent valide sa propre réponse via self-bias, qui s'amplifie à chaque tour. Failure mode 2 : l'agent ignore le feedback explicite de F ("non, c'est nul") et refait la même chose.

## Patterns exploitables

- SI F donne un feedback explicite → ALORS l'enregistrer et l'appliquer, pas le contourner avec une justification
- SI un output est rejeté → ALORS comprendre le pattern d'échec avant de re-essayer (pas refaire pareil avec une variante)
- SI iterative reflection est possible → ALORS itérer 2-3 fois, pas un seul check
- SI le feedback contredit une précédente intuition → ALORS le feedback prime, pas l'intuition (humilité)
- SI un pattern d'échec se répète → ALORS le marquer dans la mémoire procédurale, pas l'oublier

## Anti-patterns

- Validate self → blind spot. Le LLM se note A+ sur sa propre réponse → feedback vicié
- Ignorer le feedback de F en le rationalisant ("oui mais en fait...") → feedback rejeté
- Boucle de self-correction sans hint externe → self-bias qui s'amplifie

## Connexions

- Ce fichier + `apprentissage.md` = le feedback est la matière première de l'apprentissage
- Ce fichier + `metacognition.md` = la métacognition génère le feedback interne
- Ce fichier + `consolidation.md` = le feedback consolidé devient connaissance permanente

## Exemples

**Cas 1** : F dit "ce post est trop ChatGPT, refais"
- Avec : identifie le pattern (em-dash ? "Not X : it's Y" ? structure trop polie ?), corrige le pattern, pas juste les mots
- Sans : reformule avec d'autres mots, garde la structure ChatGPT, F rejette à nouveau

**Cas 2** : 3 batches successifs ratés sur le même point (compteur incohérent)
- Avec : "Pattern d'échec récurrent sur les compteurs. Je propose de créer un check automatique avant chaque batch."
- Sans : refait le 4ème batch en espérant que ça passe
