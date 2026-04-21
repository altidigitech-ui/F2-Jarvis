# ops/ — Discipline budget et kill-switches

**Rôle :** garde-fous financiers et opérationnels de F2-Jarvis.

---

## Contenu

### `ops/budget/`

- `limits.yaml` — caps mensuels par service (ouroboros 10€, graphify 5€, mempalace 2€, mcp_external 8€, buffer 5€). Total budget incrémental hors plan : 30 €/mois.
- `history.csv` — historique des dépenses tokens/jour/service. **NE PAS MODIFIER MANUELLEMENT.** Rempli automatiquement par `f2-accountant`.

### `ops/kill-switches/`

- `ouroboros.flag` — si présent, Ouroboros ne tourne pas
- `mempalace.flag` — si présent, MemPalace ne save rien
- `graphify.flag` — si présent, Graphify ne réindexe pas
- `global.flag` — si présent, cut tout (nucléaire)

Auto-activés par `f2-accountant` si budget dérive :
- 90% du budget → `ouroboros.flag`
- 100% du budget → `global.flag`

### `ops/monitoring/`

- `model-tier-rules.yaml` — règles de routage Haiku/Sonnet/Opus
- `cache-policy.md` — TTL du cache des fichiers (CLAUDE.md 1h, skills on-demand 5min, etc.)

---

## Références

- Check budget : `/budget` slash command
- Config BIBLE.md §11 : budget incrémental plafonné 30 €/mois
- Agent responsable : `.claude/agents/f2-accountant.md`

---

**Dernière mise à jour : 21 avril 2026**
