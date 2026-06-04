# .claude/ — Configuration Claude Code

**Rôle :** setup Claude Code que F utilise en terminal. **Distinct** de l'app web F2-Jarvis (`ui/jarvis/`).

---

## Contexte

Fabrice utilise Claude Code localement avec le plan Anthropic Max 5x. Ce dossier `.claude/` est lu à chaque session Claude Code et configure :

1. Les **skills** always-on (chargés automatiquement)
2. Les **skills** on-demand (activés par contexte ou slash command)
3. Les **agents spécialisés** (Task tool, contexte isolé)
4. Les **slash commands** personnalisés
5. Les **hooks** bash (pre-tool-use, post-commit, session-stop, pre-compact)

**Ce n'est PAS la même chose que l'app web Jarvis.** L'app web tourne sur Vercel + Railway et a son propre Claude Agent SDK côté backend. Claude Code (`.claude/`) tourne en terminal.

---

## Skills (`.claude/skills/`, 19 total)

**Always-on** (chargés à chaque session — voir `settings.json`) :
- `graphify` — knowledge graph du repo
- `handoff-writer` — écrit HANDOFF.md automatiquement
- `brand-voice` — garde-fou voix always-on (intégrité, anti-hype, anti-IA, TOILE) + **aiguillage** vers la voix de l'entité concernée (R / F / produit)

**On-demand** (activés par contexte ou slash command) :

*Design :* `ui-ux-pro-max`, `frontend-design`, `shadcn-ui`, `web-interface-guidelines`, `web-accessibility`, `brain-3d-renderer`
*Stack :* `shopify-gql`, `supabase-rls`, `stripe-integration`
*Marketing (voix par entité) :* `marketing/romain` (voix Romain — comptes perso R), `marketing/fabrice` (voix Fabrice — comptes perso F), `marketing/storemd` (voix produit StoreMD — comptes produit)
*Cognition :* `cognitive-loader` (charge sélectivement les fichiers de `brain/context-cognitif/` selon le profil)
*Ops / méta :* `saas-launch-checklist`, `context-md-generator`, `jarvis-upgrade`

Ordre d'activation pour UI : `ui-ux-pro-max` → `frontend-design` → `shadcn-ui` → `web-interface-guidelines` + `web-accessibility`.

> Note : les skills marketing sont nichés à 2 niveaux (`marketing/<entité>/SKILL.md`). Ils sont `on-demand` et chargés **par chemin** via `brand-voice` / `f2-marketer` (pas par auto-découverte).

---

## Agents spécialisés (`.claude/agents/`, 8 total)

À déléguer via la Task tool pour isoler le contexte.

| Agent | Rôle | Modèle |
|-------|------|--------|
| `f2-architect` | Décisions techniques, trade-offs | Sonnet |
| `f2-dev` | Implémentation code production-ready | Sonnet |
| `f2-designer` | UI/UX (charge les skills design) | Sonnet |
| `f2-marketer` | Posts, UTM, aiguillage voix R/F/produit | Sonnet |
| `f2-auditor` | Post-mortem, audit fin de cycle | Sonnet |
| `f2-thinker` | Analyse profonde multi-angles (via `/think`, profil cognitif `deep`) | Sonnet |
| `f2-librarian` | Retrieval dans le repo | Haiku |
| `f2-accountant` | Budget, tokens, coûts | Haiku |

---

## Slash commands (`.claude/commands/`, 14 total)

| Command | Rôle |
|---------|------|
| `/morning` | Brief du jour (SaaS, décisions, posts à publier, 3 priorités) |
| `/status` | État complet F2 (plus long que /morning) |
| `/launch <saas>` | Checklist de lancement |
| `/debrief` | Post-mortem structuré (SEDA) via f2-auditor → `decisions-log.md` |
| `/batch` | Production du batch hebdo de contenu (orchestrateur → `batch-template.md`, 7 blocs + validation R, dispatch, archivage) |
| `/archivage` | Archivage hebdo (orchestrateur → charte `archives/README.md` §2.2-2.4, gate validation R) |
| `/recap` | Recap de session durable → `tracking/recap-sessions/YYYY-MM-DD.md` (≠ `/handoff` éphémère, ≠ `/debrief` événement) |
| `/think` | Analyse profonde via `f2-thinker` (Sonnet, profil `deep`) |
| `/cognition` | Gestion du contexte cognitif (état / load profil / budget / map / reset) |
| `/graphify-all` | Réindexation Graphify (`--force` pour full rebuild) |
| `/budget` | Dépenses tokens par service |
| `/review-proposals` | Valide/rejette les propositions Ouroboros |
| `/jarvis` | Méta-commandes (status système, reload skills) |
| `/handoff` | Écrit HANDOFF.md pour session suivante |

---

## Hooks (`.claude/hooks/`, 8 total)

Scripts bash exécutés à des moments clés. **Câblage dans `.claude/settings.json`** (source réelle lue par Claude Code) :

- `pre-tool-use-graphify.sh` — check knowledge graph avant tool use (Glob/Grep)
- `budget-check.sh` — vérification budget avant tool use coûteux (Bash)
- `post-commit-graphify.sh` — réindexe Graphify après commit
- `precompact-save.sh` — save avant /compact
- `precompact-save-cognitive.sh` — save de l'état cognitif (`.budget`) avant compaction
- `session-stop-handoff.sh` — écrit HANDOFF.md à la fin de session
- `session-stop-cognitive.sh` — save de l'état cognitif final en fin de session
- `mempalace-save.sh` — save session dans MemPalace (périodique — non câblé en hook évènementiel, prévu via planificateur ; no-op si MemPalace absent)

> `.claude/hooks-config.json` = métadonnées (descriptions, `failureMode`, `thresholds`) ; le câblage exécuté reste `settings.json`.

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
/batch                      # Production du batch hebdo
/think <question>           # Analyse profonde (décision, paradoxe, trade-off)
/budget                     # Check budget
/review-proposals           # Valider Ouroboros

# Fin de cycle / archivage hebdo
/archivage                  # Archive la semaine close
/recap                      # Recap de session durable

# Avant /clear ou /compact
/handoff                    # Écrit HANDOFF.md
# (les hooks session-stop / precompact s'exécutent aussi automatiquement)
```

---

## Références cross-repo

- CLAUDE.md racine : instructions permanentes lues à chaque session
- BIBLE.md racine : 13 principes non-négociables
- App web séparée : `ui/jarvis/` + `backend/jarvis/`
- Couche mémoire partagée : `brain/`

---

**Dernière mise à jour : 04 juin 2026**
