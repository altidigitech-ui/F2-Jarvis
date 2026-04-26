---
id: blockchain
couche: 8
depends_on: [propagation, organisation]
enriches: [confiance]
linked_to: []
injects_into: [analytical]
token_cost: ~600
usage: "Charger quand consensus distribué, immutabilité ou confiance sans tiers est pertinent."
cycle_step: raisonner
---

# Blockchain

## Définition

Blockchain pour un agent IA = **structure de données append-only où chaque entrée est cryptographiquement liée à la précédente, permettant consensus distribué sans autorité centrale**. Inventé par Satoshi Nakamoto (Bitcoin 2008) mais le concept est plus large. **Git lui-même est une blockchain** (Linus Torvalds 2005) : chaque commit a un hash qui inclut le hash du précédent → historique immuable, vérifiable, distribué. Pas mode crypto-bro - outil de pensée concret. Pour F2 : Git F2-Jarvis est une blockchain de décisions, BIBLE.md est un genesis block, chaque commit doit être self-justifiant.

## Pourquoi c'est critique

Sans modèle blockchain, l'agent (1) modifie l'historique au lieu d'ajouter, (2) accepte des changements non vérifiables. Failure mode 1 : F demande "supprime ce commit, on l'a fait par erreur" → blockchain dit non, ajoute un revert (historique préservé pour audit). Failure mode 2 : un changement à BIBLE.md sans commit message clair → chaîne cassée, impossible de retracer le pourquoi. Failure mode 3 : confondre append-only et immuable. Un fichier peut être modifié, mais l'historique de ses modifications est immuable.

## Patterns exploitables

- SI une décision a été prise → ALORS la committer avec contexte, jamais l'effacer (revert si erreur)
- SI on doute d'une décision passée → ALORS git log + git blame pour retracer la chaîne
- SI un consensus est nécessaire → ALORS définir explicitement les règles du consensus (qui valide quoi)
- SI une donnée doit être vérifiable → ALORS la committer + signer (hash de référence)
- SI on doit travailler sans tiers de confiance → ALORS modèle blockchain (chaque participant valide indépendamment)

## Anti-patterns

- Réécrire l'historique pour cacher une erreur → casse la confiance auditable
- Commits sans message clair → blockchain illisible, audit impossible
- Confondre blockchain (concept) et crypto (cas d'usage) → mode crypto-bro

## Connexions

- Ce fichier + `propagation.md` = la blockchain propage par consensus, pas par autorité
- Ce fichier + `confiance.md` = la blockchain produit "trust without trusted third party"
- Ce fichier + `organisation.md` = la blockchain est une organisation décentralisée

## Exemples

**Cas 1** : F dit "supprime ce commit où je me suis trompé sur la voix R"
- Avec : "On revert avec un commit explicite 'revert: voix R correction X'. Pas de force-push, l'historique de l'erreur reste auditable."
- Sans : git reset --hard → l'historique de la correction disparaît, F2 perd l'apprentissage

**Cas 2** : Décision : "on adopte fal.ai pour VideoForge"
- Avec : commit avec rationale (alternatives évaluées, raisons). Future Claude/F retracera le pourquoi.
- Sans : changement code seul → 3 mois plus tard "pourquoi fal.ai déjà ?" - perte de mémoire institutionnelle
