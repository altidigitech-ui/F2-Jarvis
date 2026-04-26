# Pattern : Chargement de contexte cognitif à la demande

**Capturé le** : 2026-04-26
**Découvert dans** : F2-Jarvis : intégration système cognitif 77 fichiers
**Auteur** : Fabrice
**Catégorie** : ops

---

## Problème

Un agent IA avec accès à 77 fichiers de contexte cognitif risque de tout charger systématiquement, diluant le signal dans le bruit et explosant le budget tokens.

## Contexte d'apparition

Intégration de `brain/context-cognitif/` (77 fichiers, ~42K tokens total) dans F2-Jarvis. Recherche croisée Anthropic (context engineering blog), Manus (KV-cache hit rate), Google ADK (compiled views), Datadog State of AI 2026 (context quality > volume).

## Solution (le pattern)

Chargement on-demand via le skill `cognitive-loader` avec profils pré-définis et budget strict.

```
Budget : 5000 tokens/session, 5 fichiers max
Profils : technical, creative, social, strategic, debug, deep
Noyau minimal implicite : conscience.md + contexte.md
Chargement : /cognition load <profil>
Analyse profonde : /think <question> (via f2-thinker, profil deep)
```

## Pourquoi ça marche

- Le contexte est une ressource finie : chaque token supplémentaire dilue les tokens existants
- Le KV-cache hit rate (métrique clé selon Manus) chute quand le contexte est trop hétérogène
- La progressive disclosure (Anthropic docs) permet de ne payer que ce qu'on utilise
- 12% du corpus chargé à chaque session = les 12% les plus pertinents

## Quand l'utiliser

- Toute session Claude Code dans F2-Jarvis
- Tâche complexe nécessitant un cadre de raisonnement
- Décision stratégique, diagnostic, analyse créative

## Quand NE PAS l'utiliser

- Bug fix trivial
- Copier-coller de contenu existant
- Commandes opérationnelles (/morning, /status)

## Anti-patterns liés

- **Charger tout "au cas où"** : ~42K tokens supplémentaires, tue les performances
- **Toujours le même profil** : ne profite pas de la diversité cognitive
- **Ignorer le budget** : dépassement silencieux, dégradation progressive
- **Mettre les cognitifs dans CLAUDE.md** : gonfle le fichier, viole "concis et lisible"

## Références

- Anthropic : "Effective context engineering for AI agents" (2025)
- Manus : "Context Engineering for AI Agents: Lessons from Building Manus" (2025)
- Google ADK : "Architecting efficient context-aware multi-agent framework" (2025)
- Datadog : "State of AI Engineering" (2026)
- Décisions liées : `tracking/decisions-log.md`
