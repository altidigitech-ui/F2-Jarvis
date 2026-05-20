# PROMPT GROK — Recherche cibles cold outreach e-com (angle technique)

**Usage :** Prompt FIXE à copier-coller dans Grok. F ouvre Grok, colle ce prompt, Grok retourne les cibles. Dédié aux merchants Shopify avec des problèmes TECHNIQUES (pas business).

---

## PROMPT À COPIER

```
Search Twitter for recent posts (last 48 hours) from Shopify merchants and e-commerce store owners who are experiencing TECHNICAL problems with their store:

- Store speed issues (slow page load, poor Core Web Vitals)
- App conflicts or apps injecting too much JavaScript
- Theme bugs, broken layouts, Liquid template issues
- Checkout slowness or broken checkout flow
- Mobile rendering or performance problems
- Leftover code from uninstalled apps
- JavaScript bloat or render-blocking scripts

Search these terms one by one in the "Latest" tab:

- "shopify slow" OR "store speed" shopify
- "shopify app" broke OR conflict OR issues OR slow
- "theme" shopify problems OR bugs OR broken
- "page speed" shopify failing
- "checkout" slow OR broken shopify
- "shopify" javascript OR "page load" OR render
- "core web vitals" shopify failing
- "shopify app" uninstall left code
- "mobile" shopify slow OR broken

For each relevant post found, give me:

1. URL of the tweet
2. Number of followers of the account
3. Number of replies on the tweet
4. One line: what technical problem they're experiencing

Filter criteria — ONLY include posts that:

- Posted in the last 48 hours
- Account has 50-50,000 followers
- Tweet has fewer than 50 replies
- Post is in English
- Post is about a TECHNICAL problem (speed, apps, theme, code, performance — NOT business/revenue)

EXCLUDE:

- Content creators (YouTubers, TikTokers, podcasters — that's CREATOR-prompt)
- Marketing agencies or freelance marketers (that's R's territory)
- Posts about chargebacks, ROI, revenue, conversions (business angle = R)
- Developers discussing pure code architecture
- Accounts selling competing SaaS tools
- Posts from accounts I already follow: @delgado_ro72224, @foundrytwo

Give me 10 to 15 results, sorted by most recent first.
```

---

## NOTES

- Ce prompt cible UNIQUEMENT des merchants Shopify avec des problèmes TECHNIQUES. Pas de creators, pas d'agences.
- Différence avec CREATOR-prompt : CREATOR-prompt cherche des creators (YouTubers, podcasters) + e-com. Ici on cherche UNIQUEMENT des merchants e-com angle technique.
- Différence avec R ECOM-prompt : R dit "you're losing $800/month" (business). F dit "14 apps each injecting their own JavaScript" (technique).
