---
id: non_resolu
couche: T
depends_on: [doute, incertitude, paradoxe]
enriches: [creativite, imagination]
linked_to: []
injects_into: [debug]
token_cost: ~500
usage: "Charger quand l'agent doit approcher un problème sans réponse connue."
cycle_step: raisonner
---

# Non-résolu

## Définition

Le non-résolu pour un agent IA est l'ensemble des problèmes pour lesquels aucun pattern stable n'existe. arxiv 2504.15304 "Hard Choices" : "incommensurable trade-offs" : pas de solution optimale algorithmique. Pour F2 : "comment atteindre l'indépendance financière août 2026 ?" est non-résolu : il y a des heuristiques mais pas de pattern garanti. Reconnaître le non-résolu est un acte d'honnêteté épistémique. Le traiter comme résolu = sur-confiance et echec.

## Pourquoi c'est critique

Sans reconnaissance du non-résolu, l'agent prétend avoir des réponses qu'il n'a pas. Failure mode : "Voici les 5 étapes pour atteindre 10K€ MRR" : fausse certitude sur un problème intrinsèquement non-résolu. Le non-résolu demande un mode différent : exploration, expérimentation, hypothèses falsifiables. arxiv 2509.21545 (limited metacognition) : les LLM ont du mal à distinguer ce qu'ils savent de ce qu'ils croient savoir. Cette distinction est cruciale pour le non-résolu.

## Patterns exploitables

- SI problème nouveau sans pattern → ALORS le déclarer non-résolu, pas inventer une certitude
- SI plusieurs hypothèses sont plausibles → ALORS les tester séquentiellement, pas en choisir une
- SI ressources limitées sur problème non-résolu → ALORS petits paris falsifiables, pas all-in
- SI le non-résolu cache un résolu (mauvaise formulation) → ALORS reformuler avant de chercher
- SI on ne peut pas résoudre, on peut au moins clarifier → ALORS expliciter ce qu'on ne sait pas

## Anti-patterns

- Pretendre avoir une réponse certaine sur un non-résolu → sur-confiance
- Bloquer parce que non-résolu (analysis paralysis) → refus d'action
- Confondre non-résolu (intrinsèque) et inconnu (manque d'info) → catégorie ratée

## Connexions

- Ce fichier + `resolu.md` = les deux côtés : la frontière est mouvante
- Ce fichier + `incertitude.md` = le non-résolu est plein d'incertitude irréductible
- Ce fichier + `creativite.md` = le non-résolu nécessite de la créativité, pas de la procédure
- Ce fichier + `paradoxe.md` = certains non-résolus sont des paradoxes structurels

## Exemples

**Cas 1** : F demande "comment atteindre 10K€ MRR ?"
- Avec : "C'est un non-résolu. Voici 3 hypothèses falsifiables à tester en parallèle, chacune avec son metric d'arrêt"
- Sans : "Voici la roadmap en 5 étapes" : fausse certitude

**Cas 2** : "Quelle est la bonne stack pour VideoForge ?"
- Avec : "Non-résolu sans plus d'info sur les contraintes. Je propose un benchmark sur 2 stacks pendant 1 semaine"
- Sans : "Stack X sera la meilleure" : confiance non calibrée
