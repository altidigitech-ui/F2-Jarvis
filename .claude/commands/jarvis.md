---
name: jarvis
description: Meta-commandes F2-JARVIS. Status système, reload skills, reset memory, health check.
---

# /jarvis [subcommand]

Meta-contrôle de F2-JARVIS.

## Subcommands

### `/jarvis` (sans argument)
Health check complet :

```markdown
## F2-JARVIS — Health Check

### Core
- CLAUDE.md : ✅ présent, 320 lignes
- BIBLE.md : ✅ présent, v1.0 (17 avril)
- HANDOFF.md : ⚠️ last modified > 24h

### Claude Code config
- settings.json : ✅
- hooks-config.json : ✅ 6 hooks actifs
- settings.local.json : ⚠️ pas configuré (créer depuis .example)

### Skills
- Always-on chargés : graphify ✅, f2-brand-voice ✅, handoff-writer ✅
- On-demand disponibles : 13

### Agents
- 7 agents définis ✅

### Commands
- 9 slash commands disponibles ✅

### Brain
- Ouroboros : ⚠️ non-initialisé (consciousness.py pas run)
- MemPalace : ❌ non-installé
- Mem0 : ❌ non-installé

### Graphify
- Index : ⚠️ absent (run /graphify-all)
- GRAPH_REPORT.md : ❌ pas généré

### Submodules SaaS
- saas/ : vide (aucun submodule ajouté)

### Budget
- Month-to-date : 0 € / 30 €
- Kill-switches : tous off ✅

### Recommandations
1. Créer `.claude/settings.local.json` depuis l'exemple
2. Installer MemPalace : `pip install mempalace && mempalace init`
3. Installer Graphify : `pip install graphifyy && graphify install`
4. Ajouter submodules SaaS (voir .gitmodules)
5. Run `/graphify-all` une fois les submodules ajoutés
```

### `/jarvis reload`
Recharge la config Claude Code (settings.json, hooks, skills).

### `/jarvis skills`
Liste tous les skills disponibles avec leur statut (always-on / on-demand / unloaded).

### `/jarvis agents`
Liste les agents disponibles avec leur modèle et couleur.

### `/jarvis reset-memory [wing]`
Reset MemPalace pour un wing spécifique. **Demande confirmation**. Dangereux.

### `/jarvis doctor`
Alias pour `/jarvis` (health check).

### `/jarvis version`
Affiche version F2-JARVIS, version CLAUDE.md, version BIBLE.md, date de création.

### `/jarvis brain-status`
Statut détaillé des composants brain :
- Ouroboros : running ? dernière cycle ? propositions en queue ?
- MemPalace : nb wings, nb drawers, taille DB
- Mem0 : nb facts, dernière extraction

## Règles

- Commandes **lecture-only** par défaut
- Commandes destructrices (reset-memory) : confirmation obligatoire
- Haiku suffit pour tous les outputs
