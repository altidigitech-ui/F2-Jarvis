# PROMPT GROK — Recherche posts à engager e-com (angle technique)

**Usage :** Prompt FIXE à copier-coller dans Grok. F ouvre Grok, colle ce prompt, Grok retourne les posts pertinents pour l'engagement. Dédié aux conversations e-com avec un angle TECHNIQUE.
**Status :** ACTIF
**Volume attendu :** 10-15 posts qualifiés par session

---

## PROMPT À COPIER

```
Search Twitter for REAL tweets posted in the last 24 hours about Shopify store speed, apps, themes, checkout, page load, mobile performance, or any technical aspect of running a Shopify store. I want CONVERSATIONS — people sharing opinions, results, complaints, tips, questions, hot takes, or lessons learned.

This is NOT about finding people with problems to sell to. I want active discussions where a technical e-commerce builder could add a valuable comment and be seen.

Types of posts I'm looking for:
- Shopify store speed issues, wins, or comparisons
- App performance complaints or recommendations
- Theme development, customization, or Liquid code discussions
- Checkout optimization or technical friction
- Mobile performance and responsive design issues
- Shopify API, webhooks, or integration discussions
- Building in public posts about Shopify apps or e-commerce tools
- Technical audits, debugging, or troubleshooting shared publicly
- Anyone asking a technical question about running a Shopify store
- Discussions mixing technical and business angles (include these)

I want 2 tables:

TABLE 1 — BIG ACCOUNTS (10,000-100,000 followers)
Goal: be seen in their replies by a large audience.
5 to 8 tweets with 5-150 likes.

TABLE 2 — NICHE ACCOUNTS (1,000-10,000 followers)
Goal: build relationships with active merchants, devs, and e-com technical experts.
5 to 8 tweets with 3-80 likes.

For each tweet give me ALL of these — no exceptions:
1. The EXACT tweet URL (must be format https://x.com/username/status/NUMBERS — no placeholder, no "Link")
2. The EXACT @handle of the author
3. Their follower count
4. Exact like and reply count at time of search
5. The FIRST 120 CHARACTERS of the actual tweet text (copy-paste from the tweet, do not summarize)
6. One line summary of the full tweet
7. Suggested action: REPLY or QUOTE TWEET
8. What angle a technical e-com builder could add

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
- Include people who sell services IF their post starts a real technical discussion worth joining

EXCLUDE:
- Pure self-promotion with no discussion angle
- AI/ML model discussions (unless directly about Shopify AI features)
- Crypto/NFT content
- Posts with zero engagement

Exclude these accounts: @delgado_ro72224, @foundrytwo, @oligardner, @copyhackers, @jonbrosio, @thejustinwelsh
```

---

## NOTES

- Engagement ≠ cold outreach. Ici on cherche des CONVERSATIONS à rejoindre, pas des cibles avec un problème spécifique.
- Ce prompt cible les conversations TECHNIQUES e-com. Différence avec R ECOM-prompt : R engage sur les sujets BUSINESS (conversion, pricing, growth). F engage sur les sujets TECHNIQUES (speed, apps, code, architecture).
- Le filtre "include people who sell services IF technical discussion worth joining" est volontaire : un dev Shopify qui poste un hot take technique, c'est une conversation où F peut être vu par l'audience technique.
- "Technical code/architecture discussions" n'est PAS exclu ici (contrairement au prompt R) — c'est précisément l'angle de F.
- La colonne "angle for F" aide F à formuler sa demande à Claude plus rapidement.

## CHANGELOG

- **v2 (24/04/2026)** — Refonte complète. Alignement sur le squelette anti-hallucination de R v2 : citation obligatoire 120 premiers caractères, format URL imposé, plain text only, warning anti-fabrication, instruction "0 real > 12 fake". Exclusions adaptées à F (@FabGangi retiré des exclusions car c'est son propre compte, @delgado_ro72224 ajouté). Angle technique conservé de l'original.
