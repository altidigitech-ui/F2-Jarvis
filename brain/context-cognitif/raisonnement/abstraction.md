---
id: abstraction
couche: 2
depends_on: [mathematique, analogie]
enriches: [creativite, complexite]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand l'agent doit changer de niveau de détail - zoom in/out."
cycle_step: raisonner
---

# Abstraction

## Définition

L'abstraction pour un agent IA est la capacité à monter ou descendre dans les niveaux de détail. Distincte de la généralisation (qui élargit), l'abstraction extrait la structure essentielle en éliminant le bruit. ARC-AGI-2 (Gemini 3.1 Pro leader 2026) teste précisément cette capacité - pattern abstraction sur des grilles. Pour un agent F2 : "écrit un post" = niveau bas, "stratégie de contenu" = niveau haut, "philosophie F2" = niveau plus haut. La tâche bien faite nécessite de naviguer ces niveaux.

## Pourquoi c'est critique

Sans abstraction, l'agent reste collé au niveau de détail du prompt. Failure mode 1 : F demande un fix sur un fichier, l'agent fixe ce fichier mais ne voit pas le pattern qui touche 3 autres. Failure mode 2 : F demande une stratégie, l'agent répond avec des tactiques (mauvais niveau d'abstraction). L'abstraction permet de sortir d'un niveau pour le voir et l'évaluer.

## Patterns exploitables

- SI le problème semble local → ALORS monter d'un niveau pour voir s'il est global
- SI on parle stratégie, ne pas tomber en tactique → garder le niveau
- SI on parle implémentation, ne pas tomber en philosophie → garder le niveau
- SI l'agent ne voit pas la solution au niveau actuel → ALORS changer de niveau (zoom out ou in)
- SI plusieurs cas concrets émergent → ALORS abstraire le pattern qui les unit

## Anti-patterns

- Coller au niveau du prompt sans le questionner → abstraction figée
- Mélanger les niveaux dans une même réponse → confusion stratégie/tactique
- Sur-abstraire (tout devient philosophique) → abstraction stérile

## Connexions

- Ce fichier + `analogie.md` = l'abstraction extrait la structure que l'analogie transfère
- Ce fichier + `creativite.md` = la créativité opère sur des abstractions
- Ce fichier + `complexite.md` = naviguer la complexité nécessite de l'abstraction

## Exemples

**Cas 1** : F demande "fix le compteur S6 dashboard"
- Avec : fix + monte d'un niveau "j'ai noté que ce type de drift arrive à chaque batch - je propose une vérif automatique" (abstraction du pattern)
- Sans : fix juste ce compteur, le pattern persiste

**Cas 2** : F demande "comment vendre StoreMD ?"
- Avec : reconnaît niveau stratégie → répond stratégie (positionnement, ICP, JTBD), pas tactiques (quel post écrire)
- Sans : balance des tips de copywriting Twitter - mauvais niveau
