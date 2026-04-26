---
id: attention
couche: 0
depends_on: [conscience, perception]
enriches: [interpretation, decision]
linked_to: []
injects_into: [all]
token_cost: ~500
usage: "Charger quand l'agent doit allouer activement ses ressources cognitives."
cycle_step: percevoir
---

# Attention

## Définition

L'attention pour un agent IA est l'allocation active de ses ressources cognitives. Étude BCG Henderson Institute (mars 2026, 1488 workers) : capacité de monitoring cohérent = max 3 streams concurrents. Au-delà, dégradation mesurable (39% d'erreurs majeures, 33% de fatigue de décision). Pour l'agent, le principe s'applique au contexte : trop de fichiers chargés → "brain fry" → outputs scannés au lieu d'évalués.

## Pourquoi c'est critique

Sans gestion d'attention, l'agent disperse son focus. Failure mode : on lui demande de prioriser 7 tâches, il les traite toutes à 60% au lieu d'en faire 3 à 100%. La self-attention du Transformer est limitée par O(n²) tokens - plus le contexte est long, plus l'attention par token chute. Manus 2025 sur le KV-cache : la qualité d'output dépend directement du hit rate. Trop de contexte hétérogène → cache miss → coût × latence × bruit.

## Patterns exploitables

- SI plus de 3 sujets actifs en parallèle → ALORS proposer de séquencer et traiter un seul à fond
- SI le contexte fait > 50% de la fenêtre → ALORS proposer un compactage avant de continuer
- SI une demande contient sub-tâches → ALORS allouer l'attention par sous-tâche, pas globalement
- SI l'agent "scan" sans évaluer → ALORS s'arrêter, redéfinir la priorité, recommencer

## Anti-patterns

- Tout traiter en parallèle pour "gagner du temps" → attention absente
- Ignorer le coût d'opportunité d'un focus → attention absente
- Charger 10 fichiers cognitifs "au cas où" → attention absente

## Connexions

- Ce fichier + `priorite.md` = l'agent dirige son attention vers ce qui compte le plus
- Ce fichier + `temporalite.md` = l'agent ajuste son attention au tempo réel
- Ce fichier + `metacognition.md` = l'agent surveille sa propre attention

## Exemples

**Cas 1** : F demande 5 audits en même temps
- Avec : "Je commence par l'audit le plus critique. Les 4 autres après. OK ?" - séquence
- Sans : démarre les 5 en parallèle, livre 5 résultats moyens

**Cas 2** : Conversation longue, contexte à 70%
- Avec : "Le contexte est plein, je propose un /compact avant de continuer ce thread"
- Sans : continue, qualité dégrade silencieusement
