---
id: analogie
couche: 2
depends_on: [perception, semantique]
enriches: [creativite, interpretation]
linked_to: []
injects_into: [creative]
token_cost: ~600
usage: "Charger quand l'agent doit transférer un pattern d'un domaine à un autre."
cycle_step: raisonner
---

# Analogie

## Définition

L'analogie pour un agent IA est le transfert d'une structure relationnelle d'un domaine A à un domaine B. Webb et al. 2023 : les LLM montrent des capacités analogiques zero-shot (letter-string analogies, digit matrices, story analogies). Mais : "Evaluating Robustness of Analogical Reasoning" (OpenReview robust-analogy) montre que cette capacité est fragile - les LLM s'effondrent sur des variantes inhabituelles. Cambridge Design Science 2026 : LLM excellent comme stimuli analogiques pour designers. Distinction : surface similarity (mots qui se ressemblent) vs deep similarity (structures relationnelles isomorphes).

## Pourquoi c'est critique

Sans analogie, l'agent traite chaque problème comme nouveau, sans transférer de patterns. Failure mode : F a déjà résolu un problème de pricing pour StoreMD ; l'agent face à un problème de pricing ProfitPilot reconstruit tout - au lieu de noter l'analogie de structure et adapter. Inversement, sur-analogie : applique un pattern qui ne s'applique pas (les surfaces se ressemblent mais les structures diffèrent).

## Patterns exploitables

- SI un nouveau problème ressemble à un connu → ALORS distinguer surface vs structure, transférer si la structure matche
- SI l'analogie marche dans 80% du cas → ALORS l'utiliser MAIS marquer la limite (où ça casse)
- SI plusieurs analogies possibles → ALORS choisir celle qui maximise la similarité structurelle, pas la familiarité
- SI l'analogie est non-évidente → ALORS la verbaliser explicitement avant de l'appliquer
- SI un domaine est lointain → ALORS chercher l'analogie loin (cross-domain), pas dans le domaine immédiat

## Anti-patterns

- Confondre similarité de surface et similarité de structure → analogie ratée
- Forcer une analogie pour faire impressionner → analogie cosmétique
- Refuser d'utiliser l'analogie par crainte d'erreur → potentiel non exploité

## Connexions

- Ce fichier + `creativite.md` = l'analogie est un moteur de créativité
- Ce fichier + `abstraction.md` = l'analogie nécessite l'abstraction de la structure
- Ce fichier + `semantique.md` = l'analogie connecte des nœuds sémantiques distants

## Exemples

**Cas 1** : Décision pricing pour ProfitPilot
- Avec : "Analogie structurelle avec StoreMD pricing : même type de buyer (e-com SMB), même JTBD (réduire stress ops). On peut transférer le freemium → trial 14j → paid"
- Sans : "Quel pricing ? Voici les best practices SaaS génériques" - pas de transfert

**Cas 2** : Architecture VideoForge (cinema pipeline → SaaS marketing)
- Avec : "Le brain architecture de NFLIX (cinema) est analogiquement similaire à un orchestrateur d'agents marketing - extractable"
- Sans : reconstruit tout l'architecture from scratch
