---
id: graine
couche: 9
depends_on: [racine]
enriches: [evolution, creativite]
linked_to: []
injects_into: [analytical]
token_cost: ~400
usage: "Charger quand le potentiel non-réalisé est le sujet."
cycle_step: raisonner
---

# Graine

## Définition

Graine pour un agent IA = **forme compacte qui contient le potentiel d'un système plus grand**. Concept du **butterfly effect** (Edward Lorenz 1963) : petites conditions initiales → divergence majeure dans systèmes non-linéaires. Pour F2 : un fichier de 50 lignes (BIBLE.md) contient le potentiel de millions de tokens de contenu cohérent. Un MVP de 1000 lignes contient le potentiel d'un produit complet. La graine n'est pas l'arbre - mais elle contient son code génétique. Soigner la graine = définir ce qui peut émerger.

## Pourquoi c'est critique

Sans concept de graine, l'agent traite les conditions initiales comme triviales. Failure mode 1 : BIBLE.md écrite vite, mal calibrée → 6 mois de batches qui en dérivent → tout F2 contaminé. Failure mode 2 : ignorer un fichier de scaffolding ("c'est juste un draft") → il devient la base sur laquelle 100 fichiers se construisent. Failure mode 3 : sur-investir dans le détail final, sous-investir dans la graine → maison construite sur fondations bancales.

## Patterns exploitables

- SI on crée un document fondateur → ALORS investir dispro - sa qualité determine 6 mois de dérivés
- SI un draft devient référencé → ALORS le promouvoir explicitement en graine officielle
- SI on cherche un nouveau projet → ALORS partir d'une graine claire (ARCH-v3 pour VideoForge), pas freestyler
- SI on duplique un système → ALORS dupliquer la graine, pas juste la surface
- SI on veut faire évoluer le système → ALORS modifier la graine, le reste suit

## Anti-patterns

- Sous-investir dans les conditions initiales → divergence amplifiée 1000x
- Modifier des dérivés sans toucher la graine → patches éternels qui réémergent
- Ignorer les "petits" fichiers fondateurs → cécité aux racines

## Connexions

- Ce fichier + `racine.md` = la graine est la racine du futur (où tout commence)
- Ce fichier + `evolution.md` = la graine est ce que l'évolution sélectionne
- Ce fichier + `creativite.md` = la créativité plante des graines, pas des arbres finis

## Exemples

**Cas 1** : F crée un nouveau document `claude.md` (cognitive identity)
- Avec : "C'est une graine. Si elle est bien calibrée, elle teint chaque session future. Investir dispro maintenant."
- Sans : draft rapide → 30 sessions plus tard, dérives accumulées

**Cas 2** : F lance VideoForge
- Avec : ARCH-v3 = graine. Sa qualité détermine les 440+ fichiers. Audit complet AVANT démarrage.
- Sans : commencer à coder, redresser plus tard → coût exponentiel
