---
name: shadcn-ui
description: Skill officiel shadcn/ui. Connaît les composants, variants, props exacts de shadcn. Essentiel quand on code du UI F2 (stack fixe = Next.js + Tailwind + shadcn).
trigger: shadcn, component, button, form, dialog, table
when: on-demand
---

# Skill shadcn-ui (officiel)

## Source
`ui.shadcn.com/docs/skills`

## Installation

```bash
# Installation automatique via shadcn CLI
npx shadcn@latest skill install
```

Le skill lit `components.json` du projet pour connaître :
- Framework (Next.js 14 pour F2)
- Tailwind version
- Aliases (`@/components`, `@/lib`)
- Base library (radix par défaut pour F2)
- Icon library (lucide-react pour F2)
- Composants déjà installés

## Ce qu'il fait

- Génère des composants avec les variants corrects du premier coup
- Connait les props API de Button, Card, Dialog, Form, Table, Command, etc.
- Compose correctement (ex: `<Select><Select.Trigger/><Select.Content/></Select>`)
- Thème cohérent avec les tokens du projet

## Pour F2

F2 utilise shadcn partout. Ajouter au CLAUDE.md de chaque SaaS :

```
This project uses shadcn/ui for all UI components. Always use:
Button, Card, Dialog, Form, Input, Select, Table, Command, Badge, 
DropdownMenu, Tabs, Toast, Skeleton, Tooltip.
Theme: dark by default, follow design-tokens.json.
```

## Pair avec

- **ui-ux-pro-max** → style direction
- **frontend-design** → anti-slop
- **web-interface-guidelines** → audit
- **web-accessibility** → WCAG
