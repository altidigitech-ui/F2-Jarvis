---
name: ui-ux-pro-max
description: Design intelligence complet pour UI/UX. 50+ styles, 161 palettes, 57 pairings typo, 99 guidelines UX, 25 chart types. Premier skill à activer pour tout nouveau design. Génère un design system avant de coder.
trigger: design, UI, UX, interface, landing, dashboard
when: on-demand
---

# Skill ui-ux-pro-max

## Ce que c'est

Source : `github.com/nextlevelbuilder/ui-ux-pro-max-skill` (MIT, ~29k stars).

Design database searchable : 50+ styles (glassmorphism, claymorphism, minimalism, brutalism, bento grid, dark mode, neumorphism, skeuomorphism, flat), 161 palettes par industrie, 57 font pairings avec reasoning, 161 types de produits, 99 UX guidelines, 25 chart types sur 10 stacks.

## Quand l'activer

**TOUJOURS en premier** sur un nouveau design. Avant frontend-design, avant shadcn-ui.

## Workflow en 4 étapes

### Étape 1 — Analyze requirements
Extraire du brief utilisateur :
- Product type (SaaS dashboard, landing, e-commerce, portfolio, admin)
- Style keywords (moderne, sérieux, ludique, technique, premium)
- Industry (fintech, healthcare, e-commerce, dev tools, etc.)
- Stack (react, nextjs, vue, svelte, shadcn, swiftui, react-native, flutter, tailwind, html)

### Étape 2 — Generate design system (REQUIRED)
```bash
python .claude/skills/ui-ux-pro-max/scripts/search.py --design-system \
  --product-type "SaaS dashboard" \
  --industry "e-commerce monitoring" \
  --keywords "serious, data-dense, trustworthy" \
  --stack "nextjs,shadcn"
```
Retourne : style recommandé, palette, typo, anti-patterns à éviter.

### Étape 3 — Stack-specific search
Ne pas gaspiller de tokens sur les autres stacks :
```bash
python .claude/skills/ui-ux-pro-max/scripts/search.py --stack shadcn --component "data-table"
```

### Étape 4 — Pre-delivery checklist
Avant de livrer, run le checklist du skill pour vérifier cohérence.

## Pair avec

- **frontend-design** (Anthropic) — direction créative complémentaire
- **shadcn-ui** (officiel) — composants ready-to-use
- **web-interface-guidelines** (Vercel) — audit a11y/perf
- **web-accessibility** — WCAG compliance

## Pour F2 spécifiquement

F2 favorise :
- Minimalism avec touches techniques
- Dark mode par défaut (dashboards ops)
- Data-dense mais lisible (StoreMD monitoring)
- Pas de glassmorphism bleu générique
- shadcn/ui + Tailwind, toujours
- Pas de gradient violet/rose AI-slop

## Installation

```bash
# Cloner le skill dans .claude/skills/ui-ux-pro-max/ (déjà fait par structure)
# Le script search.py + data/ sont à récupérer depuis le repo upstream
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git /tmp/ui-ux-pro-max
cp -r /tmp/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/* .claude/skills/ui-ux-pro-max/
```
