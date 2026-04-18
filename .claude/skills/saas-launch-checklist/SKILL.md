---
name: saas-launch-checklist
description: Checklist complète de lancement SaaS F2. Technique, business, marketing, ops. Utilisée via /launch <saas>.
trigger: launch, shipping, lancer, release
when: on-demand
---

# Skill saas-launch-checklist

## Usage
```
/launch storemd
```
Le skill génère un checklist adapté au SaaS, avec les tâches déjà faites pré-cochées (lues depuis le repo).

## Checklist générale F2

### Technique

- [ ] **Tests** : couverture minimum 60% sur core
- [ ] **Monitoring** : Sentry init'd, erreurs capturées
- [ ] **Logs** : structurés (JSON), niveau INFO minimum en prod
- [ ] **Rate limiting** : actif sur endpoints publics
- [ ] **CORS** : whitelist précise, pas `*`
- [ ] **Env vars** : toutes dans Railway, rien committé
- [ ] **Secrets** : rotation récente (< 30 jours), Bitwarden
- [ ] **Backups** : Supabase backup automatique activé
- [ ] **Domain** : DNS configuré, SSL auto Let's Encrypt
- [ ] **Email transactional** : Brevo configuré, DKIM/SPF validés
- [ ] **Status page** : Better Stack ou équivalent connecté
- [ ] **Graphify** : indexé, GRAPH_REPORT.md à jour

### Shopify (si applicable)

- [ ] **GraphQL only** — aucun call REST
- [ ] **Scopes** validés, minimaux
- [ ] **Custom Distribution App** setup (pas App Store)
- [ ] **Webhooks** : HMAC verification, idempotents
- [ ] **Rate limits** : gestion cost-based
- [ ] **Uninstall webhook** géré (cleanup data)
- [ ] **GDPR webhooks** : `customers/data_request`, `customers/redact`, `shop/redact`

### Billing

- [ ] **Stripe** en mode live
- [ ] **Webhooks** live configurés, endpoint HTTPS
- [ ] **Plans** créés (Solo/Duo/Studio ou adapté)
- [ ] **Trial** 14 jours activé
- [ ] **Customer Portal** configuré
- [ ] **Invoice** template avec logo F2
- [ ] **Dunning** configuré (smart retries)

### A11y / UX

- [ ] **Lighthouse** score > 90 partout
- [ ] **a11y** score > 95 (WCAG AA minimum)
- [ ] **Mobile** testé (Chrome DevTools + vrai device)
- [ ] **Dark mode** testé (F2 = dark default)
- [ ] **Loading states** partout
- [ ] **Error states** informatifs
- [ ] **Empty states** designés (pas `[]`)

### Business

- [ ] **Pricing page** avec les 3 plans
- [ ] **Terms of Service** datés
- [ ] **Privacy Policy** datée, conforme GDPR
- [ ] **Cookie banner** (si cookies non-essentiels)
- [ ] **Contact email** actif : `support@<saas>.com`
- [ ] **About page** mentionne F2 (**pas Altistone**)

### Marketing

- [ ] **Landing page** live
- [ ] **Meta tags** OG + Twitter Cards
- [ ] **Plausible** tracking installé
- [ ] **UTM** structure définie
- [ ] **Launch post** LinkedIn FR (Romain) drafté
- [ ] **Launch post** Twitter EN (Fabrice) drafté
- [ ] **Email à la waitlist** drafté (si waitlist existe)
- [ ] **Screenshots** réels (pas mockups) prêts
- [ ] **Demo video** si applicable (TikTok native editor préféré)

### Ops

- [ ] **Telegram alerts** configurés (erreurs critiques)
- [ ] **Runbook** écrit pour incidents majeurs
- [ ] **Support process** défini (qui répond, en combien de temps)
- [ ] **Onboarding email** automatisé (Brevo)
- [ ] **Churn detection** logique prête (au moins log, pas forcément auto-action)

### Post-launch (J+1 à J+7)

- [ ] **Daily check** métriques (signups, churn, erreurs)
- [ ] **Réponse feedback** < 24h
- [ ] **Hotfixes** déployés dès détection
- [ ] **Post-mortem** J+7 via `/debrief`
- [ ] **Decision record** écrit dans `studio/decisions/`

## Integration avec F2-JARVIS

Le skill peut auto-détecter l'état :
- `saas/<n>/` existe ?
- `supabase/migrations/` a des migrations récentes ?
- `.env.production` bien provisionné en prod ?
- DNS pointant vers Vercel/Railway ?

Et cocher les items déjà faits.

## Anti-patterns

- Ne PAS lancer sans a11y audit (obligation légale EU)
- Ne PAS lancer sans uninstall webhook Shopify (on perd des données clients)
- Ne PAS lancer avec service_role key côté client
- Ne PAS lancer sans page `/status` visible
- Ne PAS lancer avec fake stats sur la landing
