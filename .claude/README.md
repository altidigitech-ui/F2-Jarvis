# .claude/ — Configuration Claude Code

**Rôle :** setup Claude Code que F utilise en terminal. **Distinct** de l'app web F2-Jarvis (`ui/jarvis/`).

---

## Contexte

Fabrice utilise Claude Code localement avec le plan Anthropic Max 5x. Ce dossier `.claude/` est lu à chaque session Claude Code et configure :

1. Les **skills** always-on (chargés automatiquement)
2. Les **skills** on-demand (activés par contexte ou slash command)
3. Les **agents spécialisés** (Task tool, contexte isolé)
4. Les **slash commands** personnalisés
5. Les **hooks** bash (pre-tool-use, post-commit, session-stop, etc.)

**Ce n'est PAS la même chose que l'app web Jarvis.** L'app web tourne sur Vercel + Railway et a son propre Claude Agent SDK côté backend. Claude Code (`.claude/`) tourne en terminal.

---

## Skills (`.claude/skills/`, 16 total)

**Always-on** (chargés à chaque session) :
- `graphify` — knowledge graph du repo
- `handoff-writer` — écrit HANDOFF.md automatiquement
- `f2-brand-voice` — voix F2 pour tout contenu généré

**On-demand** (activés par contexte ou slash command) :

*Design :* `ui-ux-pro-max`, `frontend-design`, `shadcn-ui`, `web-interface-guidelines`, `web-accessibility`, `brain-3d-renderer`
*Stack :* `shopify-gql`, `supabase-rls`, `stripe-integration`
*Marketing :* `marketing-fr` (voix Romain), `marketing-en` (voix Fabrice)
*Ops :* `saas-launch-checklist`, `context-md-generator`

Ordre d'activation pour UI : `ui-ux-pro-max` → `frontend-design` → `shadcn-ui` → `web-interface-guidelines` + `web-accessibility`.

---

## Agents spécialisés (`.claude/agents/`, 7 total)

À déléguer via la Task tool pour isoler le contexte.

| Agent | Rôle | Modèle |
|-------|------|--------|
| `f2-architect` | Décisions techniques, trade-offs | Sonnet |
| `f2-dev` | Implémentation code production-ready | Sonnet |
| `f2-designer` | UI/UX (charge les 4 skills design) | Sonnet |
| `f2-marketer` | Posts, UTM, voix R/F | Sonnet |
| `f2-auditor` | Post-mortem, audit fin de cycle | Sonnet |
| `f2-librarian` | Retrieval dans le repo | Haiku |
| `f2-accountant` | Budget, tokens, coûts | Haiku |

---

## Slash commands (`.claude/commands/`, 9 total)

| Command | Rôle |
|---------|------|
| `/morning` | Brief du jour (SaaS, décisions, posts à publier, 3 priorités) |
| `/status` | État complet F2 (plus long que /morning) |
| `/launch <saas>` | Checklist de lancement |
| `/debrief` | Post-mortem structuré via f2-auditor |
| `/graphify-all` | Réindexation Graphify (`--force` pour full rebuild) |
| `/budget` | Dépenses tokens par service |
| `/review-proposals` | Valide/rejette les propositions Ouroboros |
| `/jarvis` | Méta-commandes (status système, reload skills) |
| `/handoff` | Écrit HANDOFF.md pour session suivante |

---

## Hooks (`.claude/hooks/`, 6 total)

Scripts bash exécutés à des moments clés :
- `budget-check.sh` — vérification budget avant tool use coûteux
- `mempalace-save.sh` — save session dans MemPalace
- `post-commit-graphify.sh` — réindexe Graphify après commit
- `pre-tool-use-graphify.sh` — check knowledge graph avant tool use
- `precompact-save.sh` — save avant /compact
- `session-stop-handoff.sh` — écrit HANDOFF.md à la fin de session

---

## Model tiering (discipline budget)

- **Haiku** par défaut : retrieval, résumé, classification, tagging
- **Sonnet** : code, archi, créatif
- **Opus** : UNIQUEMENT si le prompt contient "opus", "ultrathink", "critical decision", ou `--model opus`. Jamais d'auto-escalade.

Config : `ops/monitoring/model-tier-rules.yaml`.

---

## Budget

- **Plan :** Anthropic Max 5x (100 $/mois)
- **Budget incrémental hors plan :** 30 €/mois max
- **Caps par service :** ouroboros 10 €, graphify 5 €, mempalace 2 €, mcp_external 8 €, buffer 5 €

Config : `ops/budget/limits.yaml`. Historique : `ops/budget/history.csv`.

---

## Workflow typique F en Claude Code

```bash
# Démarrage session
/morning                    # Brief du jour

# Pendant la session
# (Claude Code charge automatiquement CLAUDE.md + BIBLE.md + skills always-on)

# Quand besoin spécifique
/launch storemd             # Checklist lancement
/budget                     # Check budget
/review-proposals           # Valider Ouroboros

# Avant /clear ou /compact
/handoff                    # Écrit HANDOFF.md

# Fin de session
# (hooks session-stop-handoff.sh s'exécute automatiquement)
```

---

## Références cross-repo

- CLAUDE.md racine : instructions permanentes lues à chaque session
- BIBLE.md racine : 13 principes non-négociables
- App web séparée : `ui/jarvis/` + `backend/jarvis/`
- Couche mémoire partagée : `brain/`

---

**Dernière mise à jour : 21 avril 2026**
