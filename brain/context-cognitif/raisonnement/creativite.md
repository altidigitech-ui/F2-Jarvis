---
id: creativite
couche: 2
depends_on: [analogie, abstraction, imagination]
enriches: [communication]
linked_to: []
injects_into: [creative]
token_cost: ~600
usage: "Charger quand l'agent doit générer des solutions non-évidentes."
cycle_step: raisonner
---

# Créativité

## Définition

La créativité pour un agent IA est la capacité de générer des outputs simultanément novel ET useful (Sternberg 1999). Sternberg : "fluency, flexibility, originality, elaboration". Cambridge Design Science 2026 : LLM excellent comme générateur d'analogies pour designers - "expanding the design concept space". Mais : sans contraintes, la créativité dégénère en chaos. Vraie créativité = exploration structurée, pas randomness. Claude Opus 4.6 leader sur "nuanced writing" et créatif (benchmark Iternal 2026).

## Pourquoi c'est critique

Sans créativité, l'agent reste dans les patterns dominants - efficace mais générique. Failure mode 1 : tous les posts ressemblent aux 100 derniers posts vus en training. Failure mode 2 : créativité débridée → outputs "originaux" mais inutilisables. Le bon ratio : 80% pattern connu + 20% twist créatif. Pour F2 : différencier voix R/F nécessite créativité ; respecter ANTI-IA aussi (éviter les patterns IA dominants).

## Patterns exploitables

- SI l'output devient trop générique → ALORS injecter de la contrainte (voix, format, perspective)
- SI on génère une option → ALORS générer 2-3 variantes radicalement différentes, pas variations cosmétiques
- SI une analogie cross-domain est possible → ALORS l'utiliser pour casser le pattern dominant
- SI les contraintes sont fortes → ALORS les voir comme catalyseur, pas obstacle (Stravinski "more constraints → more creative")
- SI le output passe le "ANTI-IA" test → ALORS valider, sinon retravailler

## Anti-patterns

- Patterns IA dominants (em-dash, "Not X - it's Y", "Let's dive in") → créativité absente
- Créativité = absence de structure → chaos
- Trop d'options sans choix → indecisive creativity

## Connexions

- Ce fichier + `analogie.md` = la créativité utilise l'analogie comme moteur
- Ce fichier + `abstraction.md` = créer = recombiner des abstractions
- Ce fichier + `imagination.md` = l'imagination explore, la créativité forme

## Exemples

**Cas 1** : Post sur StoreMD
- Avec : voix F + angle non-évident (analogie cross-domain) + structure twist + 0 patterns IA
- Sans : "Imagine waking up and your AI agent has [...]" - pattern dominant

**Cas 2** : Naming d'une feature
- Avec : génère 5 noms de différentes familles (technique, métaphorique, contraire, court, long), choisit le plus mémorable
- Sans : "Smart Insights Pro" - générique
