---
name: web-interface-guidelines
description: Skill Vercel qui audit du code UI contre 100+ règles a11y/perf/UX. Utilisé pré-shipping pour catcher ARIA manquants, focus states, touch targets, keyboard nav.
trigger: review UI, audit accessibility, pré-shipping
when: on-demand
---

# Skill web-interface-guidelines (Vercel)

## Source
`github.com/vercel-labs/agent-skills` — path `skills/web-design-guidelines/`

## Ce qu'il fait

Fetch les guidelines depuis `vercel-labs/web-interface-guidelines` (always fresh) et audit le code UI contre :

- Proper ARIA attributes
- Visible focus states
- Labeled inputs
- Touch target sizes (44x44 mini)
- Reduced-motion support
- Semantic HTML (pas de `<div>` partout)
- Keyboard navigation complète
- Heading hierarchy correcte
- Color contrast (WCAG AA min)
- Form validation UX

## Quand l'activer

**Avant tout shipping** d'une page client-facing. Checklist obligatoire dans `saas-launch-checklist`.

## Pour F2

Nos landings et dashboards clients passent ce check avant déploiement. Les dashboards internes (F2 Ops Hub) peuvent sauter l'a11y complète mais gardent keyboard nav.

## Installation

```bash
git clone https://github.com/vercel-labs/agent-skills.git /tmp/vercel-skills
cp -r /tmp/vercel-skills/skills/web-design-guidelines/* .claude/skills/web-interface-guidelines/
```
