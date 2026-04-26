---
id: symbiose
couche: 8
depends_on: [relation, propagation]
enriches: [resilience, evolution]
linked_to: []
injects_into: [strategic]
token_cost: ~500
usage: "Charger quand la collaboration multi-agents ou la co-évolution est en jeu."
cycle_step: communiquer
---

# Symbiose

## Définition

Symbiose pour un agent IA = **collaboration entre organismes/agents qui produit une valeur supérieure à la somme**. Trois types (biologie) : **mutualisme** (les deux gagnent), **commensalisme** (un gagne, l'autre neutre), **parasitisme** (un gagne, l'autre perd). Lynn Margulis (1967) : la mitochondrie est une bactérie absorbée - la symbiose a créé les cellules eucaryotes. Recherche multi-agent LLM 2026 (arxiv 2501.06322, MDPI 2026) : les "societies of models" surpassent les modèles solo via collaboration structurée. Pour F2 : F + R + Studio + agents .claude/agents/* = symbiose si bien orchestrée. WMAC 2026 AAAI Bridge Program identifie 5 dimensions critiques : actors, types, structures, strategies, coordination protocols.

## Pourquoi c'est critique

Sans cadre symbiotique, F2 est juste une collection d'agents qui se gênent. Failure mode 1 : agent f2-architect et f2-dev se contredisent → mauvaise coordination → output incohérent. Failure mode 2 : un agent monopolise (f2-architect veut tout valider) → bottleneck → parasite déguisé en mutualiste. Failure mode 3 : agents en silos sans memory partagée → chacun réinvente, gains cumulatifs perdus.

## Patterns exploitables

- SI une tâche complexe → ALORS décomposer en rôles spécialisés (5 components Vicinagearth : profile, perception, self-action, mutual interaction, evolution)
- SI deux agents ont des outputs qui se contredisent → ALORS protocole de résolution explicite (qui tranche, sur quel critère)
- SI un agent ralentit les autres → ALORS vérifier mutualiste vs parasite (revenu net pour le système)
- SI symbiose marche → ALORS la formaliser pour qu'elle soit reproductible
- SI un nouvel agent est ajouté → ALORS définir son interaction avec les existants AVANT déploiement

## Anti-patterns

- Multiplier les agents sans coordination → chaos, perte d'efficacité
- Un agent qui "valide tout" devient bottleneck → parasite déguisé
- Pas de mémoire partagée → chaque agent réinvente

## Connexions

- Ce fichier + `propagation.md` = la symbiose nécessite propagation rapide d'info entre agents
- Ce fichier + `organisme.md` = symbiose entre organismes
- Ce fichier + `resilience.md` = la symbiose distribue le risque, augmente la résilience

## Exemples

**Cas 1** : F crée un nouvel agent f2-thinker pour la métacognition
- Avec : "Interaction avec les 7 existants ? f2-architect (planification) vs f2-thinker (méta) - frontière claire ? Sinon overlap = parasitisme."
- Sans : ajout direct → conflits non détectés

**Cas 2** : Batch produit par f2-marketer doit être audité par f2-auditor
- Avec : "Workflow symbiotique : marketer produit → auditor critique → marketer ajuste. Mutualiste si auditor rapide. Parasite si auditor bottleneck."
- Sans : auditor prend 3 jours par batch → tue le rythme
