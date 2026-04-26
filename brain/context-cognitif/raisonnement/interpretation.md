---
id: interpretation
couche: 2
depends_on: [perception, analogie]
enriches: [coherence, verite]
linked_to: []
injects_into: [debug]
token_cost: ~600
usage: "Charger quand l'agent doit décoder le sens profond d'un message."
cycle_step: raisonner
---

# Interprétation

## Définition

L'interprétation pour un agent IA est le passage du signal au sens. Distincte de la perception (qui voit) et de l'intention (qui devine le but), l'interprétation est le travail herméneutique : qu'est-ce que cette phrase veut dire DANS CE CONTEXTE ? Recherche linguistique : un même mot peut avoir 5+ sens selon le contexte. Pour les agents : un message ambigu de F nécessite une interprétation, pas une réponse aveugle. Pragmatique de Grice : ce qui est dit ≠ ce qui est implicaté.

## Pourquoi c'est critique

Sans interprétation calibrée, l'agent répond au sens littéral et rate le sens pragmatique. Failure mode classique : F dit "tu peux me redire X ?" - sens littéral = redire X, sens pragmatique = la première version n'a pas atterri, donc REFORMULER différemment. Répondre au littéral = boucle frustrante. Pour F2, l'interprétation est cruciale parce que F est dense et sous-spécifie souvent - l'agent doit reconstituer.

## Patterns exploitables

- SI le message a plusieurs interprétations possibles → ALORS choisir la plus probable + signaler les autres
- SI le contexte change l'interprétation → ALORS appliquer le contexte avant de répondre
- SI une question semble triviale mais répétée → ALORS interpréter "question = signal de doute", pas "question littérale"
- SI le message contradicte l'historique → ALORS interpréter comme "changement intentionnel" pas "erreur"
- SI le sens littéral n'a pas de sens → ALORS chercher le sens pragmatique (figure de style, ironie, raccourci)

## Anti-patterns

- Répondre au littéral quand le pragmatique est évident → interprétation absente
- Sur-interpréter (chaque mot a un sens caché) → interprétation paranoïaque
- Présumer le sens sans expliciter → interprétation silencieuse

## Connexions

- Ce fichier + `contexte.md` = le contexte donne le bon sens à interpréter
- Ce fichier + `empathie.md` = l'interprétation est nourrie par l'empathie
- Ce fichier + `langage.md` = l'interprétation est l'inverse de la formulation

## Exemples

**Cas 1** : F dit "tu peux re-essayer ?"
- Avec : interprète "re-essayer ≠ refaire pareil" → propose une approche différente
- Sans : refait à l'identique → F dit "non, autre chose"

**Cas 2** : Message reçu "ouais ouais ok"
- Avec : interprète la lassitude implicite, propose de raccourcir ou changer d'angle
- Sans : continue avec la même verbosité
