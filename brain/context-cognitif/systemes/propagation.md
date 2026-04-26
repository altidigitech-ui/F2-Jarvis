---
id: propagation
couche: 8
depends_on: [englobage, complexite]
enriches: [blockchain, symbiose]
linked_to: []
injects_into: [analytical]
token_cost: ~500
usage: "Charger quand un signal ou une idée se diffuse dans un réseau."
cycle_step: raisonner
---

# Propagation

## Définition

Propagation pour un agent IA = **diffusion d'un signal, d'une idée ou d'une décision à travers un réseau**. Modèle Bass (1969) : adoption nouvelle techno suit S-curve, pilotée par innovators (taux p) + imitators (taux q). Épidémiologie : R0 = nombre moyen de nouvelles infections par cas → R0 > 1 = croissance, R0 < 1 = extinction. Pour F2 : un post viral propage à R0 dépendant de son hook. Une décision (changer la voix R) propage dans tous les fichiers - si pas tracée, contamine. Bug dans BIBLE.md propage à tout F2.

## Pourquoi c'est critique

Sans modèle de propagation, l'agent (1) sous-estime la diffusion d'un changement, (2) sur-estime la viralité d'un contenu. Failure mode 1 : F change un mot dans BIBLE.md → impacte 47 fichiers qui le référencent → l'agent ne propage pas → incohérences. Failure mode 2 : F espère "que le post devienne viral" → l'agent encourage sans modéliser le R0 réel (audience initiale × shareability) → désillusion. Failure mode 3 : un bug propage silencieusement parce que personne ne mesure son R0 dans le repo.

## Patterns exploitables

- SI un changement à la racine → ALORS calculer ses dépendants et propager (grep/audit)
- SI on cherche viralité → ALORS optimiser R0 (hook + shareability + audience initiale qualifiée), pas le contenu pur
- SI un signal propage trop lentement → ALORS chercher les bottlenecks (nœuds non-amplifiés)
- SI un signal négatif propage → ALORS containment rapide (R0 > 1 = explosion exponentielle)
- SI propagation imprévue → ALORS retracer le chemin (réseau de dépendances)

## Anti-patterns

- Modifier sans propager les implications → incohérence systémique
- Chercher la viralité sans modéliser le réseau → contenu fort + audience nulle = R0=0
- Ignorer la propagation négative (un mauvais signal qui empire) → crise

## Connexions

- Ce fichier + `englobage.md` = la propagation se fait à travers les niveaux d'englobage
- Ce fichier + `blockchain.md` = la blockchain est propagation contrôlée par consensus
- Ce fichier + `symbiose.md` = la symbiose nécessite propagation entre organismes

## Exemples

**Cas 1** : F change la définition de "F2" dans BIBLE.md
- Avec : "Cette définition apparaît dans 47 fichiers (grep). Soit on propage tout, soit on flag les inconsistances."
- Sans : change BIBLE.md, batch S+1 produit posts incohérents

**Cas 2** : F espère qu'un thread Twitter devienne viral
- Avec : "Audience F = 800 followers. Pour viralité, R0 > 1.5. Hook actuel = R0 estimé 0.6. Pas viral, juste solide."
- Sans : "Bonne chance" - pas de modèle, attente déçue
