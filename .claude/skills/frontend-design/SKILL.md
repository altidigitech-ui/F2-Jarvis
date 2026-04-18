---
name: frontend-design
description: Skill Anthropic officiel pour éviter les interfaces AI-slop génériques (purple gradients, Inter font, cards arrondies partout). Force Claude à penser purpose/tone/constraints/differentiation avant de coder.
trigger: design creative, interface différenciante, landing unique
when: on-demand
---

# Skill frontend-design (Anthropic officiel)

## Source
`github.com/anthropics/skills` — path `skills/frontend-design/`

## Ce qu'il fait

Force Claude à penser 4 dimensions AVANT d'écrire du code UI :

1. **Purpose** — qui utilise ça et pourquoi ?
2. **Tone** — quelle direction esthétique précise ? (pas "modern" générique)
3. **Constraints** — framework, perf, a11y
4. **Differentiation** — qu'est-ce qui rend cette interface mémorable ?

## Quand l'activer

**Après** ui-ux-pro-max dans la chaîne. Quand tu veux du design avec un point de vue, pas un template générique.

## Anti-patterns bannis par ce skill

- Purple/pink gradients sur blanc
- Inter / Roboto partout
- Cards avec `rounded-xl shadow-md` sans intention
- Animations génériques (bounce, fade-in)
- Layout "hero + 3 features + testimonials + CTA"

## Pour F2

F2 a une identité à défendre (no-fake-stats, authentique, technique). Ce skill empêche Claude de sortir du "SaaS AI générique" quand il design nos landings ou dashboards.

## Installation

```bash
git clone https://github.com/anthropics/skills.git /tmp/anthropic-skills
cp -r /tmp/anthropic-skills/skills/frontend-design/* .claude/skills/frontend-design/
```
