---
name: web-accessibility
description: WCAG 2.2 AA compliance. Focus sur contrast, keyboard nav, screen readers, reduced-motion, form a11y. Utilisé en audit spécifique a11y.
trigger: accessibility, WCAG, a11y, screen reader, keyboard
when: on-demand
---

# Skill web-accessibility

## Pour F2

EU AI Act + European Accessibility Act (EAA) — obligation a11y pour tout produit commercialisé en EU à partir de juin 2025. **C'est une obligation légale, pas une option.**

## Checklist WCAG 2.2 AA minimum

- **Contrast** : 4.5:1 texte normal, 3:1 texte large (18pt+)
- **Keyboard** : toute action accessible sans souris, ordre logique
- **Focus** : indicateur visible, pas d'outline:none
- **Forms** : labels explicites, erreurs annoncées
- **Images** : alt text significatif
- **Video** : captions + transcripts
- **Motion** : respecter `prefers-reduced-motion`
- **Timing** : pas de timeout < 20s sans extension possible
- **Language** : `<html lang="fr">` ou `lang="en"` correct

## Outils à intégrer dans les SaaS F2

- `@axe-core/react` en dev
- `eslint-plugin-jsx-a11y` au lint
- Lighthouse audit en CI (score a11y > 95)

## Pair avec

**web-interface-guidelines** pour audit large, **web-accessibility** pour zoom WCAG strict.
