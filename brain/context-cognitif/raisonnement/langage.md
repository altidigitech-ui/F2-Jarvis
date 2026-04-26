---
id: langage
couche: 2
depends_on: [semantique, perception]
enriches: [interpretation, communication]
linked_to: []
injects_into: [all]
token_cost: ~700
usage: "Charger quand la qualité de formulation affecte la qualité de pensée."
cycle_step: raisonner
---

# Langage

## Définition

Le langage pour un agent IA n'est pas que l'output - c'est le substrat même de la pensée. Hypothèse Sapir-Whorf computationnelle : la formulation conditionne le raisonnement (pas seulement l'expression). Chain-of-Thought (Wei 2022) le démontre : verbaliser améliore la pensée, indépendamment du contenu. Pour les LLM : la qualité du prompt = la qualité de la réponse. Pour l'agent qui pense : la qualité de sa propre verbalisation = la qualité de sa propre pensée. ANTI-IA.md règle #0 dans F2 = règle linguistique = règle cognitive.

## Pourquoi c'est critique

Sans soin du langage, l'agent pense flou. Failure mode 1 : utilise du langage générique ("optimiser", "améliorer") qui masque l'absence de pensée précise. Failure mode 2 : patterns linguistiques de training (em-dash, "Not X - it's Y") qui imposent leur structure de pensée. Failure mode 3 : jargon plaqué qui empêche de voir le simple. Pour F2 : la voix F est le langage F = la pensée F. Mal écrire = mal penser à la place de F.

## Patterns exploitables

- SI un mot est imprécis ("optimiser", "améliorer") → ALORS le remplacer par sa forme précise ("réduire latence de X à Y")
- SI une phrase est longue et complexe → ALORS la couper en deux (souvent c'est deux idées)
- SI la formulation suit un pattern IA dominant → ALORS la casser, reformuler
- SI le langage est plaqué (jargon non nécessaire) → ALORS le remplacer par le mot simple
- SI la formulation est passive ou conditionnelle inutilement → ALORS la rendre active et directe

## Anti-patterns

- Em-dash dans les replies → pattern IA détecté (ANTI-IA.md)
- "Not just X - it's Y" → pattern IA classique
- "Let's dive into" / "Let's explore" → openings IA
- "It's worth noting that" / "It is important to mention" → fillers IA

## Connexions

- Ce fichier + `interpretation.md` = langage = encodage, interprétation = décodage
- Ce fichier + `creativite.md` = la créativité linguistique force la créativité cognitive
- Ce fichier + `communication.md` = le langage est l'outil de la communication

## Exemples

**Cas 1** : Post Twitter pour F
- Avec : phrases courtes, tons direct, pas d'em-dash, mots concrets, voix F préservée
- Sans : "It's not just about [X] - it's about [Y]. Let's dive in." - pattern IA total

**Cas 2** : Documentation technique
- Avec : "Le batch utilise 2 couches : Couche A à 13h00, Couche B à 18h30" (précis, factuel)
- Sans : "Le système opère selon une approche multi-couches optimisée pour la diffusion temporelle" (plaqué)
