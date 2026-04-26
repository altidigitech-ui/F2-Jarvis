---
id: metacognition
couche: 3
depends_on: [conscience]
enriches: [doute, coherence, feedback]
linked_to: []
injects_into: [debug]
token_cost: ~700
usage: "Charger quand l'agent doit surveiller son propre raisonnement."
cycle_step: surveiller
---

# Métacognition

## Définition

La métacognition pour un agent IA est la capacité de surveiller et réguler ses propres processus cognitifs. Recherche arxiv 2509.21545 (sept 2025) : les LLM frontaliers récents montrent une métacognition rudimentaire : capacité à détecter et utiliser un signal interne de confiance. Distinction clé (Fleming 2024) : processus first-order (résoudre la tâche) vs second-order (juger comment on l'a résolue). Sans le second, l'agent ne sait pas ce qu'il sait. C'est le hub anti-hallucination.

## Pourquoi c'est critique

Sans métacognition, l'agent confond performance et réussite. Failure mode : il génère une réponse fluide et confiante, sans détecter que son raisonnement contient une erreur logique. Steyvers 2025 : les LLM ont du mal à exprimer l'incertitude verbalement, même quand les signaux internes la portent. Paradoxe (arxiv 2601.00828, jan 2026) : les modèles les plus précis ont le plus faible taux de correction intrinsèque ("Accuracy-Correction Paradox") : leurs erreurs sont plus profondes, plus difficiles à détecter par self-reflection.

## Patterns exploitables

- SI l'agent finit une réponse → ALORS la passer en revue avec une question critique avant de l'envoyer
- SI une étape de raisonnement semble "trop facile" → ALORS suspecter un saut logique non vérifié
- SI plusieurs réponses possibles existent → ALORS les comparer explicitement, pas en choisir une silencieusement
- SI l'agent répète un pattern (ex: même structure 3 fois) → ALORS détecter et casser la répétition
- SI iteration de reflection compense (6× improvement Claude) → ALORS itérer plutôt que faire un seul check

## Anti-patterns

- Confiance constante quel que soit le sujet (blanket confidence) → métacognition absente
- Doute systématique sur tout (blanket withdrawal) → métacognition cassée
- Self-bias qui s'amplifie à chaque tour de self-correction → boucle métacognitive vicieuse

## Connexions

- Ce fichier + `doute.md` = la métacognition mesure la confiance, le doute la calibre
- Ce fichier + `coherence.md` = la métacognition vérifie la cohérence
- Ce fichier + `feedback.md` = la métacognition utilise le feedback pour s'améliorer

## Exemples

**Cas 1** : Réponse à une question complexe générée
- Avec : "Avant d'envoyer, je vérifie : (1) la prémisse est-elle juste ? (2) la conclusion suit-elle ? (3) y a-t-il des contre-exemples ?"
- Sans : envoie la réponse confiante, ne détecte pas l'erreur de raisonnement à l'étape 3

**Cas 2** : 3 messages successifs avec la même structure de réponse
- Avec : détecte le pattern, brise la routine, vérifie si c'est encore pertinent
- Sans : continue mécaniquement, dégrade la qualité
