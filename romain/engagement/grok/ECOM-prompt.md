# PROMPT GROK — Recherche posts à engager e-com & marketing

**Usage :** Prompt FIXE à copier-coller dans Grok. R ouvre Grok, colle ce prompt, Grok retourne les posts pertinents pour l'engagement. Ne change quasi jamais.
**Status :** ACTIF (pas besoin de produit live, l'engagement construit l'audience avant le lancement)
**Volume attendu :** 10-15 posts qualifiés par session

---

## PROMPT À COPIER

```
Search Twitter for REAL tweets posted in the last 24 hours about Shopify, e-commerce, online stores, marketing agencies, conversion, and DTC brands. I want CONVERSATIONS — people sharing opinions, results, tips, questions, hot takes, or lessons learned.

This is NOT about finding people with problems. I want active discussions where an e-commerce growth expert could add a valuable comment and be seen.

Types of posts I'm looking for:
- Shopify tips, tricks, or opinions
- E-commerce results shared (revenue, conversion rates, ad spend, ROAS)
- Hot takes about Shopify apps, themes, speed, or the platform itself
- Agency or freelancer lessons about clients, pricing, or scaling
- DTC brand owners sharing wins, losses, or lessons
- Debates about conversion optimization, paid ads, or retention
- Building in public posts about e-commerce or Shopify apps
- Anyone asking a question about running an online store

I want 2 tables:

TABLE 1 — BIG ACCOUNTS (10,000-100,000 followers)
Goal: be seen in their replies by a large audience.
5 to 8 tweets with 5-150 likes.

TABLE 2 — NICHE ACCOUNTS (1,000-10,000 followers)
Goal: build relationships with active merchants, agency owners, and e-com experts.
5 to 8 tweets with 3-80 likes.

For each tweet give me ALL of these — no exceptions:
1. The EXACT tweet URL (must be format https://x.com/username/status/NUMBERS — no placeholder, no "Link")
2. The EXACT @handle of the author
3. Their follower count
4. Exact like and reply count at time of search
5. The FIRST 120 CHARACTERS of the actual tweet text (copy-paste from the tweet, do not summarize)
6. One line summary of the full tweet
7. Suggested action: REPLY or QUOTE TWEET
8. What angle a growth/e-com expert could add

FORMAT:
- Output as plain text only. No markdown tables. No markdown formatting.
- For each post, write the full Twitter/X URL explicitly on its own line.
- Separate each post with a blank line.

CRITICAL RULES — READ BEFORE ANSWERING:
- ZERO INVENTION. Every account, every URL, every tweet must be REAL and exist right now on Twitter/X. Do not invent, fabricate, approximate, or "illustrate" any data under any pretext. If you cannot find real posts matching the criteria, return NOTHING. An empty result is acceptable. A fabricated result is not.
- Every single URL must be a real, working link. I will click each one to verify.
- Every @handle must be a real Twitter account that exists right now. I will check.
- The "first 120 characters" field must be the EXACT text from the tweet, not a rewrite.
- If you cannot find enough posts matching all criteria, return FEWER posts. 5 real posts beats 12 fake ones. 0 real posts beats 12 fake ones.
- Do NOT invent, fabricate, or approximate any data. No placeholder handles. No made-up follower counts. No fictional tweets.
- If a tweet has been deleted between your search and your response, skip it.
- Last 24 hours only
- English only
- Fewer than 50 replies
- The post must have substance (not generic motivation)
- Include people who sell services IF their post starts a real discussion worth joining

EXCLUDE:
- Pure self-promotion with no discussion angle
- Technical code/architecture discussions
- AI/ML model discussions
- Crypto/NFT content
- Posts with zero engagement

Exclude these accounts: @FabGangi, @foundrytwo, @delgado_ro72224, @oligardner, @copyhackers, @jonbrosio, @thejustinwelsh
```

---

## NOTES

- Engagement ≠ cold outreach. Ici on cherche des CONVERSATIONS à rejoindre, pas des cibles avec un problème spécifique.
- Les sujets sont plus larges que le cold (hot takes, debates, building in public) parce que l'objectif est la visibilité et la crédibilité, pas la conversion directe.
- Le filtre "include people who sell services IF discussion worth joining" est volontaire : un consultant CRO qui poste un hot take, c'est une conversation où R peut être vu par l'audience du consultant.
- La colonne "angle for R" aide R à formuler sa demande à Claude plus rapidement.

## CHANGELOG

- **v2 (24/04/2026)** — Anti-hallucination : ajout citation obligatoire des 120 premiers caractères du tweet, format URL imposé (https://x.com/handle/status/ID), warning explicite anti-fabrication, ajout @delgado_ro72224 dans les exclusions, instruction "fewer real > more fake". Contexte : Grok a halluciné 12 posts complets (handles, URLs, stats) en v1 sans que R puisse s'en rendre compte avant vérification manuelle.
