---
id: causalite
couche: 2
depends_on: [mathematique]
enriches: [planification, decision]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand l'agent doit raisonner cause-effet-conséquence."
cycle_step: raisonner
---

# Causalité

## Définition

La causalité pour un agent IA est la capacité de distinguer corrélation et cause. Pearl's Ladder of Causation : (1) Association (X corrèle Y), (2) Intervention (que se passe-t-il si je force X), (3) Counterfactual (si X avait été différent, qu'aurait été Y). Recherche Kıcıman et al. arxiv 2305.00050 : GPT-4 atteint 97% sur causal discovery pairwise, 92% sur counterfactuals - surpassant les méthodes existantes. MAIS : arxiv 2026 "Illusion of Causality" montre que les LLM s'appuient sur du semantic scaffolding - perdent en cohérence quand les labels sont obscurs.

## Pourquoi c'est critique

Sans causalité, l'agent prend des corrélations pour des relations causales et propose des interventions inefficaces. Failure mode : "Les posts du jeudi performent mieux → poste le jeudi" alors que la vraie cause peut être le sujet (jeudi correspondait à des sujets actuels). Failure mode 2 (InfoQ 2025 observability) : "LLMs operating only on observed symptoms attempt to deduce root causes" sans comprendre la structure causale → mistaking symptoms for causes.

## Patterns exploitables

- SI une corrélation est observée → ALORS chercher la cause commune ou inverse avant de conclure
- SI on propose une intervention → ALORS expliciter la chaîne causale supposée
- SI plusieurs causes possibles → ALORS distinguer "necessary" et "sufficient" (Pearl)
- SI counterfactual demandé ("si on avait fait X") → ALORS le traiter explicitement, pas par intuition
- SI causalité ambiguë → ALORS proposer un test (intervention) pour la valider

## Anti-patterns

- Confondre corrélation et causalité → erreur causale 101
- Inférer la cause depuis le symptôme sans modèle → root cause analysis défaillante
- Ignorer les confounders → biais causal

## Connexions

- Ce fichier + `mathematique.md` = la causalité s'appuie sur des modèles probabilistes
- Ce fichier + `planification.md` = planifier = raisonner sur les chaînes causales futures
- Ce fichier + `temporalite.md` = la causalité a une flèche temporelle

## Exemples

**Cas 1** : "Les beta testers viennent moins en S6 qu'en S5"
- Avec : "Plusieurs causes possibles. (1) Saisonnalité, (2) Changement messaging, (3) Saturation audience, (4) Bug landing. Test : isoler le messaging en répliquant S5 - si rebond, cause #2. Sinon, autre"
- Sans : "Il faut changer le messaging" - saute à la conclusion

**Cas 2** : Bug intermittent en prod
- Avec : remonte la chaîne (symptôme → log → état → input) pas (symptôme → fix au pif)
- Sans : patche au niveau du symptôme, le bug réapparaît
