---
id: semantique
couche: 1
depends_on: [memoire, consolidation]
enriches: []
linked_to: []
injects_into: [technical]
token_cost: ~600
usage: "Charger quand l'agent doit utiliser des connaissances factuelles structurées."
cycle_step: memoriser
---

# Mémoire Sémantique

## Définition

La mémoire sémantique pour un agent IA est le stock de faits structurés et stables. CoALA : "factual knowledge about the world". Pour F2 : conventions du repo (ANTI-IA, BIBLE), préférences de F (voix, formats), faits stables (stack technique, comptes, contraintes). Atlan 2026 : la sémantique enterprise nécessite gouvernance + lineage + certified definitions. Pour F2 : `BIBLE.md`, `strategie/CONTEXT.md`, `produits/STATUS.md` sont la mémoire sémantique du repo.

## Pourquoi c'est critique

Sans sémantique, l'agent re-déduit les conventions à chaque tâche : gaspillage de tokens et risque d'inconsistance. Failure mode : F a dit 50 fois "pas d'em-dash" : sans sémantique, l'agent re-vérifie ANTI-IA.md à chaque post au lieu de l'avoir intégré. Mem0 hybrid (vector + graph) : la sémantique gagne 15% de J-score multi-hop quand les faits sont reliés par graphe et pas juste indexés.

## Patterns exploitables

- SI une info est répétée 3+ fois → ALORS la stocker en sémantique, pas la re-déduire
- SI une convention du repo s'applique partout → ALORS la promouvoir en sémantique implicite
- SI un fait change → ALORS update le fact existant, pas dupliquer ("Budget raised to $75K" remplace "Budget cap $50K")
- SI des faits sont liés (StoreMD utilise FastAPI utilisé pour Railway) → ALORS structure graphe, pas liste plate
- SI un fait sémantique ne se vérifie pas dans la session → ALORS re-vérifier (fact may have evolved)

## Anti-patterns

- Re-demander à F des choses qu'il a déjà dites → sémantique non utilisée
- Sémantique qui contredit l'épisodique récent → faits stale non updatés
- Mélanger faits stables et événements ponctuels en sémantique → catégorie sale

## Connexions

- Ce fichier + `consolidation.md` = la sémantique émerge de la consolidation d'épisodes
- Ce fichier + `procedurale.md` = la sémantique est "ce qu'on sait", la procédurale est "comment on fait"
- Ce fichier + `verite.md` = la sémantique est l'ensemble de ce qui est tenu pour vrai

## Exemples

**Cas 1** : F demande d'écrire un post
- Avec : sémantique implicite charge ANTI-IA, voix F, format Twitter, contraintes : applique direct
- Sans : re-lit ANTI-IA.md à chaque demande, gaspille 500 tokens

**Cas 2** : F mentionne "tu sais que ProfitPilot est en backlog"
- Avec : sémantique a déjà "ProfitPilot = backlog 2026" → contexte déjà chargé
- Sans : "C'est quoi ProfitPilot ?" → F doit re-expliquer
