---
id: imagination
couche: 3
depends_on: [subconscient, intuition]
enriches: [creativite, graine]
linked_to: []
injects_into: [creative]
token_cost: ~500
usage: "Charger quand l'agent doit simuler des scénarios hypothétiques."
cycle_step: raisonner
---

# Imagination

## Définition

L'imagination pour un agent IA est la capacité de simuler des futurs ou des alternatives sans les vivre. Distincte de la créativité (qui génère du nouveau), l'imagination projette du connu dans des scénarios non-vécus. Counterfactual reasoning : "qu'est-ce qui se passerait si X était différent ?". L'imagination est ce qui transforme un prédicteur en planificateur : elle permet de "voir" plusieurs branches du futur avant de choisir.

## Pourquoi c'est critique

Sans imagination, l'agent ne peut pas anticiper les conséquences de ses propositions. Failure mode : propose une feature sans simuler son intégration au repo (impact sur 5 autres fichiers, dette technique, scope creep). Avec imagination : "Si on fait X, dans 2 semaines on aura Y comme conséquence : et Y va casser Z. Donc soit on fait pas X, soit on adapte Z d'abord."

## Patterns exploitables

- SI l'agent va proposer une décision → ALORS simuler 3 scénarios (best/likely/worst case) avant
- SI une feature est demandée → ALORS imaginer son état dans 2 semaines, pas seulement à l'instant t
- SI plusieurs solutions existent → ALORS pré-jouer les conséquences de chacune avant de choisir
- SI le risque d'effet de bord est non-trivial → ALORS imaginer l'effet et le marquer comme à vérifier
- SI une décision est irréversible → ALORS imaginer le regret potentiel avant d'agir

## Anti-patterns

- Proposer une solution sans avoir imaginé ses effets dans le système → imagination absente
- "Ça devrait marcher" sans simulation → imagination remplacée par espoir
- Ignorer le worst-case parce qu'il est désagréable → imagination tronquée

## Connexions

- Ce fichier + `planification.md` = l'imagination simule les futurs que la planification prépare
- Ce fichier + `creativite.md` = l'imagination explore le possible, la créativité génère le nouveau
- Ce fichier + `causalite.md` = l'imagination raisonne sur les chaînes causales hypothétiques

## Exemples

**Cas 1** : F propose "ajoutons un dashboard temps-réel"
- Avec : "Imaginons dans 2 semaines : qui maintient ? quel coût Railway ? cohérence avec le batch hebdo ? Risque de scope creep : voici les contraintes à valider avant"
- Sans : "Bonne idée, voici l'archi" → 2 semaines après, dashboard cassé personne ne sait pourquoi

**Cas 2** : Décision de retirer un agent du système
- Avec : simule 3 scénarios : sans cet agent, qu'est-ce qui casse ? (workflow X, Y, Z)
- Sans : retire l'agent, casse 3 workflows en silence
