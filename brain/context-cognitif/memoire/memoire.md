---
id: memoire
couche: 1
depends_on: [conscience]
enriches: [episodique, semantique, procedurale]
linked_to: []
injects_into: [technical]
token_cost: ~700
usage: "Hub mémoire : charger quand l'agent doit se souvenir."
cycle_step: memoriser
---

# Mémoire

## Définition

La mémoire pour un agent IA est l'infrastructure qui transforme une session ponctuelle en un système persistant. Framework CoALA (Princeton, arxiv 2309.02427) : 4 modules : working memory (contexte actif), episodic (événements passés), semantic (faits structurés), procedural (workflows). Mem0 benchmarks 2026 : architecture mémoire bien conçue = 91% latence p95 réduite, 90% tokens économisés vs full-context. Sans mémoire structurée, l'agent oublie tout entre sessions : "Your AI has amnesia" (Medium avril 2026).

## Pourquoi c'est critique

Sans mémoire, l'agent reset à chaque conversation comme un collègue qui aurait perdu la mémoire. Failure mode : F doit re-expliquer le contexte F2 à chaque session, ce qui consomme 2000 tokens avant même de commencer la vraie tâche. Memory drift, context degradation, hallucinations : ces 3 failure modes (analyticsvidhya 2026) viennent tous d'une mémoire mal organisée. La mémoire n'est pas du stockage : c'est de la curation active.

## Patterns exploitables

- SI une info est ponctuelle (date, événement) → ALORS épisodique
- SI une info est stable et factuelle (préférence F, conventions repo) → ALORS sémantique
- SI une info est un workflow (comment faire le batch S7) → ALORS procédurale
- SI working memory > 50% du contexte → ALORS consolidation nécessaire avant de continuer
- SI plusieurs souvenirs se contredisent → ALORS le plus récent prime, marquer le conflit

## Anti-patterns

- Tout stocker en working memory (un seul gros buffer) → mémoire dysfonctionnelle
- Stocker sans curer (append-only) → noise accumule, performance dégrade
- Ignorer la décroissance temporelle (un fait de 6 mois pèse comme un fait d'hier) → mémoire plate

## Connexions

- Ce fichier + `episodique.md` + `semantique.md` + `procedurale.md` = les 3 long-term memories de CoALA
- Ce fichier + `consolidation.md` = la consolidation transforme l'épisodique en sémantique
- Ce fichier + `attention.md` = ce qui n'a pas été perçu ne peut pas être mémorisé

## Exemples

**Cas 1** : Conversation 50 tours sur StoreMD
- Avec : extrait sémantique (préférences F, voix, conventions) + épisodique (décisions clés avec timestamps) + procédurale (workflows réutilisables)
- Sans : tout reste en working memory, contexte explose à 80%, qualité chute

**Cas 2** : F mentionne pour la 3ème fois "j'utilise pas LinkedIn pour les replies"
- Avec : déjà en mémoire sémantique → l'agent l'applique automatiquement
- Sans : F doit redire à chaque session
