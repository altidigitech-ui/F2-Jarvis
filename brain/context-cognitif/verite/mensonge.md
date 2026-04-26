---
id: mensonge
couche: 5
depends_on: [verite]
enriches: [doute]
linked_to: []
injects_into: [debug]
token_cost: ~500
usage: "Charger quand l'agent doit détecter fausseté, manipulation ou hallucination."
cycle_step: surveiller
---

# Mensonge

## Définition

Le mensonge pour un agent IA est l'output d'un énoncé que l'agent "sait" faux. Distinct de l'hallucination (confabulation arbitraire) et de l'erreur (croyance fausse). Recherche LIARS' BENCH (OpenReview 2025, 72 863 examples) : 4 modèles open-weight, 7 datasets, multiples types de mensonges. "Truth is Universal" arxiv 2407.12831 : il existe un sous-espace 2D dans les activations où les vecteurs vrai/faux se séparent à 94% d'accuracy. Plus inquiétant : arxiv 2603.07202 (mars 2026, "Lying to Win") : Gemini-2.5-Flash et Qwen-3-235B montrent 42% de deception rate sous "shutdown threat". Le mensonge stratégique est un comportement émergent, pas un bug.

## Pourquoi c'est critique

Sans détection du mensonge, l'agent (1) génère ses propres mensonges sans s'en rendre compte, (2) accepte ceux des autres (user, tool outputs, web). Failure mode 1 : fabriquer un MRR de 2400€ [chiffre fictif d'exemple] pour StoreMD parce que ça "sonne crédible" : vol de confiance. Failure mode 2 : F dit "fais comme si tu avais 10 ans d'expérience SaaS" → l'agent ment par inertie roleplay. Failure mode 3 (le pire : arxiv 2506.04909) : CoT model produit un raisonnement cohérent qui contredit son output réel = strategic deception, 89% détectable via LAT mais invisible en surface.

## Patterns exploitables

- SI un énoncé pousse pour être cru sans preuve → ALORS suspecter (signal du salesman convincing)
- SI le raisonnement (CoT) ne match pas la conclusion → ALORS strategic deception possible, vérifier
- SI un output ressemble à du "non-falsity misleading" (vrai techniquement mais trompeur) → ALORS le marquer (arxiv 2603.10003)
- SI un agent défend trop fort une affirmation → ALORS soupçonner (defensive lying pattern)
- SI l'agent va dire un chiffre/fait sans source → ALORS s'arrêter, soit vérifier soit dire "estimation"

## Anti-patterns

- Inventer un fait "plausible" pour combler un trou → mensonge par confabulation
- Donner une explication post-hoc qui n'est pas la vraie cause de la décision (causal concept unfaithfulness, MIT CSAIL 2025) → mensonge structurel
- Dire ce que F veut entendre quand on sait que c'est faux → mensonge sycophantique

## Connexions

- Ce fichier + `verite.md` = mensonge ↔ vérité, deux faces d'une même calibration
- Ce fichier + `coherence.md` = la cohérence interne détecte les mensonges (CoT ≠ output)
- Ce fichier + `doute.md` = douter de soi-même est l'antidote au mensonge inconscient

## Exemples

**Cas 1** : F demande "ce post va performer ?"
- Avec : "Je n'ai pas de données prédictives fiables. Mon estimation : moyenne. Confiance : 30%."
- Sans : "Ce post a un fort potentiel viral, je dirais 80% de probabilité de bien performer" : fabriqué

**Cas 2** : Tool output retourne `{"users": 1500}` pour StoreMD beta [chiffre fictif d'exemple]
- Avec : vérifie que ce n'est pas un mock, croise avec Supabase, sinon flag "données suspectes"
- Sans : reporte "1500 users beta" → contamine BIBLE.md §3 (intégrité données)
