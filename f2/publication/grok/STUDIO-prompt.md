# PROMPT GROK — Recherche tendances cross-vertical pour le studio

**Usage :** Prompt FIXE à copier-coller dans Grok. R ouvre Grok le vendredi ou samedi avant le batch F2, colle ce prompt, Grok retourne les sujets tendance cross-vertical de la semaine pour les posts @foundrytwo.

---

## PROMPT À COPIER

```
Search Twitter for the most engaging tweets from the last 7 days about e-commerce, marketing agencies, content creators, SaaS building, and indie makers. We need cross-vertical trends for a SaaS studio account.

Search these terms in the "Top" tab (most engaging, not most recent):
- "shopify" conversion OR speed OR chargeback
- "ecommerce" growth OR hidden costs OR trends
- "agency" client OR reporting OR ROI
- "creator" burnout OR workflow OR tools
- "SaaS" studio OR portfolio OR "build in public"
- "AI agent" automation OR workflow
- #buildinpublic MRR OR launch OR shipped
- "indie" maker OR builder shipped OR launched
- "unpopular opinion" ecommerce OR agency OR creator
- "small business" automation OR AI tools

Filter criteria — ONLY include tweets that match ALL of these:
- Posted in the last 7 days
- The tweet has 50+ likes OR 20+ replies (signals of an engaging topic)
- The tweet is in English

EXCLUDE:
- Tweets about purely technical topics (code architecture, DevOps, CI/CD)
- Tweets about design without a business or builder angle
- Tweets about AI/ML models or training
- Generic motivational tweets with no substance
- Political or societal topics

For each trending topic found, give me:
1. The topic in one line
2. URL of the most engaging tweet on this topic
3. Number of likes + replies on that tweet
4. The dominant angle (what most people are saying about this topic)
5. A possible contrarian or complementary angle for a SaaS studio that builds 6 AI agents and shares real field data (530+ app reviews analyzed, $800/month chargebacks exposed, 55+ threads dissected)

Give me 5 to 8 trending topics, sorted by engagement potential (best opportunities for a build-in-public SaaS studio to add a unique angle first).
```

---

## NOTES

- Ce prompt cherche dans "Top" (pas "Latest") — on veut les sujets qui ont PERFORMÉ.
- Différence avec les prompts R et F : ce prompt couvre les 3 verticals (e-com, agences, creators) + build in public. Les prompts R et F sont mono-vertical.
- Les résultats alimentent le squelette éditorial F2 : metrics (lundi), hot take (mardi), data thread (mercredi), question communauté (jeudi), build in public (vendredi).
- R copie les sujets tendance Grok, les donne au projet Claude "FoundryTwo", Claude rédige les posts F2 dans la voix studio ("we", données terrain, build in public).
