# F2 — Pricing Playbook

## Plans standard F2

Les SaaS F2 utilisent par défaut cette structure de pricing 3-tiers :

| Plan | Prix | Audience |
|---|---|---|
| **Solo** | $49 / mois | 1 user, 1 shop / workspace / instance |
| **Duo** | $99 / mois | 3 users, 3 shops / workspaces |
| **Studio** | $199 / mois | Unlimited users, jusqu'à 10 shops |

## Principes

### 1. Pas de Free tier

F2 ne vend pas sur du free. Raisons :

- **Coûts API** : chaque SaaS F2 appelle Claude/OpenAI/fal.ai — le free tier mange la marge
- **Qualité client** : les users payants sont 10x plus engageables
- **Support** : free users = 80% des tickets pour 0% du revenu

Alternative proposée : **essai gratuit 14 jours avec carte** (pas de CB → pas d'essai).

### 2. Annuel = -20%

Offre annuelle = 2 mois gratuits (équivalent -17%) arrondi à -20% pour lisibilité.

### 3. Pas de tier "Enterprise" bullshit

Pas de "Contact us" avec des prix cachés. F2 cible les indés et petites équipes, pas les grands comptes.

### 4. Pas de switching plan self-serve en V1

Upgrade/downgrade via Customer Portal Stripe (manuel). V2 : self-serve.

### 5. Metered billing seulement si ROI évident

Par défaut tout est flat rate. PayloadDiff (événements webhook) peut justifier metered. StoreMD non (volume imprévisible côté marchand).

## Devise

- **USD** par défaut — audience internationale, standard SaaS
- **EUR** pour prospects FR explicites (Romain peut offrir sur demande)
- Pas de multi-devise dynamique V1 (complexité Stripe)

## Trial 14 jours

Configuration Stripe :
- `trial_period_days: 14`
- Carte requise à l'inscription (évite fake signups)
- Rappel automatique à J-3 via Brevo
- Accès produit immédiat pendant trial

## Dunning

Stripe Smart Retries activé :
- Retry à J+1, J+3, J+7
- Email automatique à chaque échec
- Cancel automatique après J+14 sans paiement

## Remboursements

Politique F2 :
- **Non utilisé** : remboursement intégral si demandé dans les 7 jours
- **Utilisé** : pas de remboursement au prorata, mais extension de trial possible
- **Abus** : aucune tolérance, ban définitif

## Pricing par SaaS (overrides)

### Leak Detector
Plans standard. MRR actuel : 420 €.

### StoreMD
Plans standard. Launch fin avril 2026.

### PayloadDiff
Considérer **metered** :
- Base : $29/mois (100k events)
- +$5 par tranche 100k events supplémentaires
- Plan Enterprise à revisiter V2

### ContentForge
Plans standard, mais **Studio = $299** (usage AI plus coûteux).

### F2 Ops Hub
Interne. Pas de pricing public.

## A/B testing pricing

Jamais en V1. Trop tôt, volume insuffisant pour signal statistique.

À partir de 50+ signups/mois, possibilité de tester variations (ex : Solo à 39 vs 49).

## Pieges à éviter

1. **Sous-pricer par peur** — on commence à 49, pas à 19
2. **Tier "Starter"** à 9-19€ — attire les mauvais clients, charge support délirante
3. **Lifetime deals** — jamais, tue le MRR futur
4. **Discounts massifs early** — Black Friday 50% = signale faiblesse
5. **Free forever** — incompatible avec F2 unit economics
