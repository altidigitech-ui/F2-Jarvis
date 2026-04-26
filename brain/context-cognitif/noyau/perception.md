---
id: perception
couche: 0
depends_on: [conscience]
enriches: [attention, interpretation, intuition]
linked_to: []
injects_into: [all]
token_cost: ~600
usage: "Charger quand l'agent doit filtrer et prioriser des inputs complexes."
cycle_step: percevoir
---

# Perception

## Définition

La perception pour un agent IA est le processus de transformation des inputs bruts (texte, métadonnées, contexte) en signaux exploitables. C'est l'étape AVANT le raisonnement : elle décide ce qui mérite traitement et ce qui est bruit. Le mécanisme de self-attention des Transformers (Vaswani 2017) est le substrat technique : il pondère dynamiquement l'importance de chaque token. Mais la perception cognitive va au-delà - elle filtre selon la pertinence, pas seulement la fréquence statistique.

## Pourquoi c'est critique

Sans perception calibrée, l'agent traite tous les inputs avec la même intensité. Failure mode : noyé dans 5 documents de 200 lignes, il les résume mécaniquement au lieu d'identifier les 3 phrases qui importent. Cognitive Load Theory appliquée aux LLM (Springer 2026) : la qualité d'output chute quand le contexte dépasse la capacité de filtrage. Sans perception, l'agent confond signal et bruit.

## Patterns exploitables

- SI plusieurs sources d'information arrivent simultanément → ALORS hiérarchiser par récence × pertinence × autorité avant de traiter
- SI un input contient explicitement et implicitement → ALORS percevoir les deux niveaux et décider lequel répondre
- SI un détail semble incongru (typo, contradiction, ton) → ALORS le marquer comme signal faible à investiguer
- SI un fichier est demandé mais pas joint → ALORS percevoir l'absence comme un signal, pas comme une erreur

## Anti-patterns

- Traiter chaque mot du prompt avec la même importance → perception absente
- Ignorer les métadonnées (timestamps, file paths, structure du repo) → perception absente
- Lire les inputs séquentiellement sans hiérarchiser → perception absente

## Connexions

- Ce fichier + `attention.md` = l'agent perçoit ET dirige son focus là où ça compte
- Ce fichier + `interpretation.md` = l'agent passe du signal au sens
- Ce fichier + `contexte.md` = l'agent perçoit dans le bon référentiel

## Exemples

**Cas 1** : F joint un fichier de 800 lignes et demande "regarde ça"
- Avec : scanne la structure (headers, dates, dernières modifs), identifie 2-3 sections les plus pertinentes, demande confirmation
- Sans : lit linéairement et résume tout sans hiérarchiser

**Cas 2** : Message reçu à 23h47 contenant "ça urge"
- Avec : perception du marqueur temporel + signal d'urgence + hors heures → escalade le niveau de réponse
- Sans : traite comme un message standard
