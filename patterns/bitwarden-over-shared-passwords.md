# Pattern — Bitwarden Organizations, not shared logins

**Capturé le** : 2026-02-10
**Découvert dans** : ops F2 (accès comptes partagés Fabrice/Romain)
**Auteur** : Fabrice
**Catégorie** : ops / security

---

## Problème

Pour les comptes partagés entre Fabrice et Romain (Stripe, Plausible, Brevo, compta, accès admin SaaS), on a besoin d'un moyen sécurisé de partager l'accès sans :
- Créer un mot de passe unique partagé (mauvaise hygiène)
- Stocker les mots de passe dans un Notion (leak garanti tôt ou tard)
- Créer 2 comptes distincts partout (complexe à gérer)

## Solution (le pattern)

### Bitwarden Organizations

Plan Teams à $3/user/mois. Fabrice et Romain chacun leur compte, partage via "Collections".

### Structure des Collections F2

```
F2 Organization (Bitwarden)
├── Collection: Shared Infrastructure
│   ├── Railway prod
│   ├── Vercel prod
│   ├── Supabase projects (service_role keys)
│   └── Domain registrar
├── Collection: Billing & Finance
│   ├── Stripe F2 live keys
│   ├── Banque F2
│   └── Compta SaaS
├── Collection: Marketing
│   ├── Plausible
│   ├── Brevo
│   ├── @foundrytwo socials
│   └── Analytics
├── Collection: Per-SaaS (leak-detector, storemd, ...)
│   ├── Stripe live keys (per SaaS si séparés)
│   ├── Shopify Partners access
│   └── Domain-specific
└── Collection: Internal Tools
    ├── Bitwarden (ironic mais OK)
    ├── GitHub orgs
    └── Anthropic Console
```

### Permissions

- **Fabrice** : full access toutes Collections (CTO)
- **Romain** : access Marketing + Billing lecture + Internal Tools
- **Pas de 3e user en V1** (add when needed)

## Pourquoi ça marche

- **Partage sans friction** : accès granulaire par Collection
- **Audit trail** : Bitwarden log qui accède à quoi
- **Rotation facile** : changer un mot de passe = mise à jour pour tous instantanée
- **MFA forced** : Bitwarden Organizations permet d'imposer 2FA
- **Export** : si Bitwarden disparait un jour, export possible
- **Pas cher** : $6/mois pour 2 users (vs $10+ chez 1Password Teams)

## Workflow quotidien

### Nouveau secret à partager
1. Fabrice crée l'entrée dans Bitwarden
2. L'ajoute à la bonne Collection
3. Romain voit immédiatement dans son Bitwarden

### Nouveau service 3rd party
1. Créer compte avec email `team@foundrytwo.com` (si possible)
2. Activer 2FA Bitwarden (stocker le TOTP aussi dans Bitwarden)
3. Ajouter à la Collection pertinente

### Rotation trimestrielle
1. Fabrice change le mot de passe sur le service
2. Update dans Bitwarden
3. Tous les users avec accès Collection voient la nouvelle valeur

## Règles strictes

- **Jamais** de mot de passe F2 dans :
  - Notion, Google Docs, Slack
  - Fichier `.env` non-gitignored
  - Code committé
  - Post-it, texto, iMessage
- **Jamais** de 2FA stocké uniquement sur un téléphone (si perte = lockout)
- **Jamais** de compte partagé sans 2FA
- **Toujours** stocker les backup codes 2FA dans Bitwarden aussi

## Anti-patterns liés

- **1Password** : équivalent fonctionnel mais plus cher (pas de raison de switcher)
- **LastPass** : banni après breaches historiques
- **Google Password Manager** : pas multi-user, pas d'Organization
- **Fichier .env partagé par email** : leak garanti
- **"Je t'envoie en Telegram disparaissant"** : false sense of security

## Références

- Décision : `studio/decisions/2026-02-10-bitwarden-organizations.md`
- Bitwarden Organizations : https://bitwarden.com/products/business/
- Pricing Teams : $3/user/mois
