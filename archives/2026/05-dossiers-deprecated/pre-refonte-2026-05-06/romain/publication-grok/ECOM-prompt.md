# PROMPT GROK — Recherche tendances et sujets e-com & marketing

**Usage :** Prompt FIXE à copier-coller dans Grok. R ouvre Grok le vendredi soir ou samedi avant le batch, colle ce prompt, Grok retourne les sujets tendance de la semaine.

---

## PROMPT À COPIER

```
Search Twitter for the most engaging tweets from the last 7 days about e-commerce, Shopify, marketing agencies, conversion, chargebacks, store speed, pricing, and growth.

Search these terms in the "Top" tab (most engaging, not most recent):
- "shopify" conversion OR speed OR chargeback OR tips
- "ecommerce" growth OR retention OR marketing
- "agency" client reporting OR ROI OR scaling
- "freelance marketing" growth OR strategy
- "shopify app" slow OR problems OR review
- "chargeback" shopify OR ecommerce
- "product page" conversion OR speed
- "pricing" ecommerce strategy
- "store speed" impact OR conversion
- "ecommerce" hidden costs OR losing money
- "unpopular opinion" ecommerce OR shopify OR agency
- "hot take" ecommerce OR marketing
- "shopify store" revenue OR growth
- "agency owner" tips OR lessons

Filter criteria — ONLY include tweets that match ALL of these:
- Posted in the last 7 days
- The tweet has 50+ likes OR 20+ replies (signals of an engaging topic)
- The topic is about BUSINESS (e-commerce, marketing, agencies, conversion, pricing, growth)
- The tweet is in English

EXCLUDE:
- Tweets about purely technical topics (code, bugs, architecture, DevOps)
- Tweets about design without a business angle
- Tweets about AI/ML models or training
- Generic motivational tweets with no substance
- Political or societal topics

For each trending topic found, give me:
1. The topic in one line
2. URL of the most engaging tweet on this topic
3. Number of likes + replies on that tweet
4. The dominant angle (what most people are saying about this topic)
5. A possible contrarian or complementary angle for someone with hands-on e-commerce and marketing data from analyzing 530+ app reviews and talking to 50+ agency owners

Give me 5 to 8 trending topics, sorted by engagement potential (best opportunities for an e-com/marketing growth expert to add a unique angle first).
```

---

## NOTES

- Ce prompt cherche dans "Top" (pas "Latest") — on veut les sujets qui ont PERFORMÉ.
- Les résultats donnent des SUJETS et ANGLES pour le batch samedi. R choisit 2-3 sujets et les rédige avec ses propres données terrain via le projet Claude R.
- Grok suggère un angle contraire ou complémentaire pour chaque sujet. R peut le prendre, l'adapter, ou l'ignorer.
