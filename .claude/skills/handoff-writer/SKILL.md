---
name: handoff-writer
description: Génère HANDOFF.md pour la session suivante. Always-on, déclenché automatiquement par le hook Stop. Template structuré pour que la prochaine session reprenne sans re-contexte.
trigger: /handoff, fin de session, avant /clear
when: always
---

# Skill handoff-writer

## Objectif

F2-JARVIS ne doit JAMAIS forcer Fabrice à re-contextualiser. Ce skill garantit la continuité.

## Structure HANDOFF.md

```markdown
# F2-JARVIS — HANDOFF

## Date
<DATE + heure CEST>

## Contexte actuel
<2-5 lignes max : sur quoi on bossait, où on en est>

## Ce qui est fait
- [x] Item 1
- [x] Item 2

## Ce qui reste (ordre de priorité)
- [ ] Item 1 — next action
- [ ] Item 2
- [ ] Item 3

## État des SaaS F2
- **Leak Detector** : <statut 1 ligne>
- **StoreMD** : <statut 1 ligne>
- ...

## Décisions en attente
<liste bullet>

## Notes pour la prochaine session
<contexte, warnings, choses à ne pas oublier>

## Fichiers clés touchés cette session
- `path/to/file.py` — <raison>
- ...

## Commandes à lancer en priorité
\`\`\`bash
git status
graphify analyze --update
\`\`\`
```

## Déclenchement

- Automatique via hook `session-stop-handoff.sh` à la fin de session
- Manuel via `/handoff`
- Automatique avant `/clear` (si le user confirme)

## Règles

1. **Toujours dater** (format ISO 8601 CEST)
2. **Concis** : < 1500 chars, pas de roman
3. **Actionable** : pas "on a parlé de X" mais "next : faire Y"
4. **Écraser** le précédent HANDOFF.md (pas d'archive automatique — le git history suffit)
5. **Ne pas** inclure de code — juste des pointeurs fichiers
6. **Ne pas** inclure d'infos sensibles (secrets, credentials)

## Anti-patterns

- HANDOFF.md qui fait 200 lignes
- HANDOFF.md qui raconte la conversation
- HANDOFF.md sans dates
- HANDOFF.md qui ne dit pas quoi faire ensuite
