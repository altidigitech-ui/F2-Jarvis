# PROMPT GROK — Recherche tendances e-com techniques

**Usage :** Prompt FIXE à copier-coller dans Grok. F ouvre Grok le vendredi soir ou samedi avant le batch, colle ce prompt, Grok retourne les sujets tendance techniques de la semaine.

---

## PROMPT À COPIER

```
Search Twitter for the most engaging tweets from the last 7 days about Shopify performance, e-commerce technical issues, app conflicts, store speed, theme code, and technical optimization.

Search these terms in the "Top" tab (most engaging, not most recent):
- "shopify" speed OR performance OR "core web vitals"
- "shopify app" problems OR review OR conflict
- "ecommerce" architecture OR stack OR migration
- "shopify theme" code OR liquid OR bugs
- "headless" shopify OR ecommerce
- "checkout" optimization shopify
- "shopify" PWA OR mobile performance
- "ecommerce" automation OR AI OR workflow
- "unpopular opinion" shopify technical
- "hot take" shopify OR "store performance"

Filter criteria — ONLY include tweets that match ALL of these:
- Posted in the last 7 days
- The tweet has 50+ likes OR 20+ replies (signals of an engaging topic)
- The topic is about a TECHNICAL subject (performance, apps, code, architecture, infrastructure)
- The tweet is in English

EXCLUDE:
- Tweets about purely business topics (revenue, ROI, conversions, pricing — that's R's angle)
- Tweets about design without a technical angle
- Tweets about AI/ML models or training
- Generic motivational tweets with no substance
- Political or societal topics

For each trending topic found, give me:
1. The topic in one line
2. URL of the most engaging tweet on this topic
3. Number of likes + replies on that tweet
4. The dominant angle (what most people are saying about this topic)
5. A possible contrarian or complementary angle for a CTO builder who has analyzed 530+ Shopify app reviews and built AI agents for e-commerce optimization

Give me 5 to 8 trending topics, sorted by engagement potential (best opportunities for a technical e-com expert to add a unique angle first).
```

---

## NOTES

- Ce prompt cherche dans "Top" (pas "Latest") — on veut les sujets qui ont PERFORMÉ.
- Les résultats donnent des SUJETS et ANGLES TECHNIQUES pour le batch samedi. F choisit 2-3 sujets et les rédige avec ses propres données terrain via le projet Claude F.
- Différence avec CREATOR-prompt publication : ici on cherche des tendances purement e-com/Shopify techniques. CREATOR-prompt cherche des tendances creators + e-com.
- Différence avec R ECOM-prompt publication : R cherche des tendances BUSINESS (conversion, pricing, chargebacks). F cherche des tendances TECHNIQUES (speed, apps, code, architecture).
