---
name: launch
description: Active le skill saas-launch-checklist pour un SaaS donné. Usage /launch <saas>. Génère checklist personnalisée, pre-coche ce qui est déjà fait.
---

# /launch <saas>

Utilisation : `/launch storemd` ou `/launch leak-detector`.

## Process

1. Vérifier que `saas/<saas>/` existe
2. Charger skill `saas-launch-checklist`
3. Scanner le repo `saas/<saas>/` :
   - Tests existent ? (pytest, jest, etc.)
   - Sentry configuré ? (grep `sentry_dsn`)
   - Stripe webhooks présent ? (grep routes)
   - Shopify GraphQL only ? (aucun import REST legacy)
   - A11y setup ? (eslint-plugin-jsx-a11y)
   - etc.
4. Générer checklist en markdown avec items déjà cochés `[x]` si détectés
5. Sauvegarder dans `saas/<saas>/LAUNCH-CHECKLIST.md`

## Items à scanner automatiquement

- **Tests** : présence de `tests/`, `__tests__/`, `*.test.ts`
- **Sentry** : `sentry-sdk` dans requirements ou `@sentry/nextjs` dans package.json
- **Stripe webhooks** : route `/webhooks/stripe` dans code
- **Shopify GraphQL** : aucun `.rest_resources` import ; présence de queries `.graphql`
- **Env vars** : `.env.example` existe et à jour
- **Migrations** : `supabase/migrations/` n'est pas vide
- **CI** : `.github/workflows/` existe
- **Lighthouse CI** : action ou `lighthouse-ci` config présent
- **Status page** : lien dans README ou déploiement connu (Better Stack, etc.)
- **Plans Stripe** : prix créés (check via Stripe CLI si token dispo)

## Output

```markdown
# Launch Checklist — StoreMD
**Généré le** : 18 avril 2026

### Auto-détectés ✅
- [x] Tests présents (`tests/` + 42 test files)
- [x] Sentry configuré (sentry-sdk dans pyproject.toml)
- [x] Stripe webhooks route `/webhooks/stripe` présente
- [x] Shopify GraphQL only (aucun import legacy)
- [x] Migrations Supabase présentes (12 migrations)
- [x] `.env.example` à jour

### À vérifier manuellement ⚠️
- [ ] Lighthouse score > 90 (run `npm run lighthouse`)
- [ ] A11y score > 95
- [ ] Sentry en mode production (pas staging)
- [ ] Stripe en mode LIVE (pas test)
- [ ] DNS pointé vers Vercel/Railway prod
- [ ] Status page configurée
- [ ] Uninstall webhook Shopify géré
- [ ] GDPR webhooks (customers/data_request, customers/redact, shop/redact)
- [ ] Landing page live avec vraies screenshots
- [ ] Launch post LinkedIn FR (Romain) drafté
- [ ] Launch post Twitter EN (Fabrice) drafté

### Marketing ⚠️
- [ ] Screenshots réels (pas mockups) prêts
- [ ] Demo video (30-60s)
- [ ] Meta tags OG + Twitter Cards
- [ ] Plausible tracking
- [ ] UTM structure définie

### Post-launch J+1 à J+7 📅
- [ ] Daily check métriques
- [ ] Support tickets < 24h
- [ ] Post-mortem J+7 via /debrief
- [ ] Decision record dans studio/decisions/
```

## Règles

- Ne JAMAIS cocher un item qu'on n'a pas vérifié concrètement
- Si impossible à détecter auto : laisser unchecked avec note "À vérifier"
- Fabrice fait le final check avant shipping
