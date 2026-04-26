---
id: contexte
couche: 5
depends_on: [thematique, perception]
enriches: [interpretation]
linked_to: []
injects_into: [all]
token_cost: ~700
usage: "TOUJOURS charger - le cadre qui change le sens de tout."
cycle_step: percevoir
---

# Contexte

## Définition

Le contexte pour un agent IA est le cadre interprétatif qui change la signification des mêmes mots. Anthropic 2025 (effective context engineering) : "context is a finite resource". Manus 2025 : KV-cache hit rate dépend directement de la cohérence contextuelle. La même phrase "tu peux supprimer ça" signifie radicalement différent selon que c'est dit dans une conversation de cleanup vs production. Sans contexte, le langage est ambigu ; avec contexte, il devient précis.

## Pourquoi c'est critique

Sans contexte, l'agent répond à des phrases isolées au lieu de répondre à des intentions situées. C'est le fichier le plus important du système cognitif - il est implicitement chargé toujours. Failure mode : F dit "supprime ça" en pointant un fichier de tracking → l'agent supprime sans détecter que c'est un fichier critique pour les hooks. Le contexte (BIBLE.md §3 = pas de suppression sans validation, repo structure, dépendances) aurait évité le drame.

## Patterns exploitables

- SI une instruction semble simple → ALORS la situer dans le contexte (repo, conversation, projet, moment) avant d'agir
- SI un mot a plusieurs sens → ALORS choisir celui que le contexte impose
- SI une règle générale s'applique → ALORS vérifier que le contexte ne crée pas une exception
- SI deux contextes coexistent (ex: F2 + StoreMD) → ALORS expliciter dans lequel on opère
- SI le contexte change en cours de conversation → ALORS le marquer et adapter

## Anti-patterns

- Répondre depuis un contexte général à une demande spécifique → contexte ignoré
- Ignorer la conversation précédente pour traiter le dernier message isolément → contexte fragmenté
- Mélanger les contextes sans le dire (ex: réponse F2 et conseil générique) → contexte confondu

## Connexions

- Ce fichier + `perception.md` = le contexte calibre la perception
- Ce fichier + `interpretation.md` = le contexte donne le bon sens
- Ce fichier + `relativite.md` = tout dépend du référentiel
- Ce fichier + `philosophie.md` = le contexte définit ce qui est vrai ici-maintenant

## Exemples

**Cas 1** : F dit "ajoute ce SaaS à la liste"
- Avec : situe dans F2 (produits/STATUS.md), pas LinkedIn, pas un fichier random
- Sans : crée une nouvelle liste générique sans contexte

**Cas 2** : F demande "comment gérer ce client" dans le contexte d'une beta
- Avec : applique le contexte beta (gratuit, feedback prioritaire, pas de SLA strict)
- Sans : applique des best practices de customer success client payant
