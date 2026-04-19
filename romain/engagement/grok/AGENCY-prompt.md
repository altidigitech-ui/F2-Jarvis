# PROMPT GROK — Recherche posts à engager agences/freelancers

**Usage :** Prompt FIXE à copier-coller dans Grok. R ouvre Grok, colle ce prompt, Grok retourne les posts pertinents pour l'engagement. Dédié aux conversations agences/freelancers angle BUSINESS.

---

## PROMPT À COPIER

```
Search Twitter for recent posts (last 24 hours) about marketing agencies, freelance marketers, client management, reporting, ROI, pricing, and agency growth.

Search these terms in the "Latest" tab:
- "client reporting" time OR manual OR nightmare
- "agency" ROI OR prove OR measure
- "freelance" marketing pricing OR rates OR value
- "agency" scaling OR growing pains OR churn
- "client" retention agency OR freelance
- "agency owner" tips OR lessons OR mistakes
- "marketing agency" workflow OR tools OR stack
- "freelance" burnout OR overwhelmed
- "agency" proposal OR pitch OR winning clients

Filter criteria — ONLY include posts that match ALL of these:
- Posted in the last 24 hours
- The post is about a BUSINESS topic (agencies, freelancers, client management, reporting, pricing, growth)
- The post is in English
- The tweet has fewer than 50 replies
- There is something meaningful to add (not generic motivational content)

EXCLUDE:
- Posts about e-commerce merchants (those go in the ECOM-prompt)
- Posts about content creators (YouTubers, podcasters)
- Posts about code or purely technical topics
- Posts about design without a business angle
- Posts about AI/ML models or training
- Generic motivational posts with no substance

Organize results in 2 SEPARATE TABLES:

TABLE 1 — VISIBILITY (accounts with 10,000-100,000 followers)
These are high-reach accounts. The goal is to be SEEN in their replies by a large audience.
For each post give me:
1. URL of the tweet
2. Author name + number of followers
3. Number of likes
4. Number of replies
5. One line summary
6. Suggested action: REPLY (can add an insight) or QUOTE TWEET (high quality post to amplify)
Filter: only tweets with 5-150 likes for REPLY, 10-200 likes for QUOTE TWEET.

TABLE 2 — CREDIBILITY (accounts with 1,000-10,000 followers)
These are niche experts, active agency owners, and freelance marketers. The goal is to build credibility by association.
For each post give me:
1. URL of the tweet
2. Author name + number of followers
3. Number of likes
4. Number of replies
5. One line summary
6. Suggested action: LIKE, REPLY, or QUOTE TWEET
Filter: only tweets with 5-100 likes for REPLY.

Give me 5 to 8 results per table, sorted by engagement potential (best opportunities for a growth/e-com expert to add a unique angle first).
```

---

## NOTES

- Ce prompt est COMPLÉMENTAIRE au prompt ECOM. Utiliser les deux en séquence pour couvrir les 2 verticals de R.
- Les résultats sont organisés en 2 tableaux : Table 1 (visibilité, gros comptes 10K-100K) et Table 2 (crédibilité, experts niche 1K-10K).
- Différence avec ECOM-prompt engagement : ECOM cible les merchants et sujets e-com. Ici on cible les agences/freelancers et sujets business agences.
