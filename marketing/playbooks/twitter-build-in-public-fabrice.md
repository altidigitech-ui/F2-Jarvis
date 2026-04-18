# Playbook — Twitter/X Build-in-Public Fabrice

## Objectif

Construire une audience tech internationale (US + EU + Shopify ecosystem) qui associe Fabrice/F2 à :
- Shopify GraphQL expertise
- Claude Code power user
- Indie SaaS shipping cadence

## Cadence

- **3 à 5 tweets / semaine** idéal
- **1 thread / semaine** (technique ou post-mortem)
- **Pas de quote tweet systématique** (bruit)

## Types de contenu

### 1. Observation technique courte (single tweet)
```
Shopify REST API is legacy since April 2025.
If your SaaS still uses it, you're shipping on borrowed time.
GraphQL is mandatory now.
```

### 2. Métrique brute F2 (single)
```
MRR F2 April 2026: 420€.
2 founders, 60 days, no VC.
1 SaaS live (Leak Detector), 1 shipping soon (StoreMD).
Build in public.
```

### 3. Code snippet + learning
```
Pro tip: use Shopify's `read_reports` scope + ShopifyQL SDK
to replace 90% of REST analytics endpoints.

[screenshot code]

Faster, cheaper, structured.
No more N+1 queries.
```

### 4. Thread post-mortem (5-15 tweets)
Voir template dans `launch-saas.md` → section "Template thread Fabrice".

### 5. Contrarian take tech
```
Unpopular opinion: 
Most "AI-powered" SaaS don't need AI.
They just need better automation.
```

### 6. Reply technique à quelqu'un
- Seulement si substance réelle
- Pas de "THIS" tout court
- Pas de self-promo déguisé

## Horaires (audience globale)

- **9h CEST (3am ET)** : EU morning, US lost
- **12h-14h CEST (6-8am ET)** : EU + US east waking up — sweet spot
- **17h-19h CEST (11am-1pm ET)** : US full active — peak
- **Après 22h CEST** : trop tard pour EU, US encore là mais faible ROI

## Règles

### Format
- **Pas de hashtag** (Twitter ≠ LinkedIn)
- **0 à 1 emoji** par tweet
- **Screenshots code** : thème dark, font lisible (Geist Mono ou JetBrains Mono)
- **Thread numéroté** : "1/" "2/" etc.
- **Closer thread** : CTA soft + lien (pas "RT if you agree")

### Engagement
- Répondre aux commentaires dans les 2h les 2 premières heures
- Liker les replies qualifiés
- Ne PAS retweet ses propres tweets dans la foulée
- Pas de quote tweet "piling on" quelqu'un

### Anti-patterns absolus
- Threads "I learned X things after Y years"
- "Let me tell you something you won't like"
- "100 founders told me this"
- Engagement bait ("What's your take? 👇")
- Screenshots ChatGPT passés comme stratégie
- RT sponsored systématiques

## Métriques

Dans `marketing/analytics/twitter-stats.csv` :
- Impressions
- Engagements (likes + RT + replies + bookmarks)
- Profile visits
- Follows gained
- Link clicks (UTM)

## TOILE rule

Zéro mention Altistone. Même en reply, même en DM public.

## Voix Fabrice rappel

- Direct, sec, technique
- Humor sèche OK mais rare
- Pas de "We are so thrilled"
- Dates explicites ("April 2026" pas "recently")
- Chiffres réels ou rien

## Workflow

1. **Idea capture** : dans `raw/tweets/` (inbox)
2. **Draft** : dans `marketing/posts/draft/`
3. **Review perso** : 30 min plus tard, avant publish
4. **Publish** : via buffer ou direct
5. **Archive** : après 7 jours, déplacer dans `marketing/posts/published/YYYY-MM/`
6. **Stats** : report à J+7 dans `marketing/analytics/twitter-stats.csv`
