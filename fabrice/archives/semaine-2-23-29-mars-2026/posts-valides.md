# POSTS VALIDÉS F — Semaine du 23/03/2026 au 29/03/2026

**Usage :** Textes finaux prêts à copier-coller dans le scheduler. Séparé du plan-hebdo (qui contient la stratégie et les objectifs). Ici c'est UNIQUEMENT le texte. Archivé le dimanche avec plan-hebdo et progress-semaine.

---

## TWITTER

### LUNDI 23/03 — 13h — ✅ PUBLIÉ 13h

```
Claude API returns clean JSON 95% of the time.

The other 5% will break your entire pipeline at 2am.

Here's how we handle it in Leak Detector:

Strategy 1 — Direct json.loads(). Works 95% of the time.
Strategy 2 — Regex extraction. Finds the JSON object inside markdown or extra text.
Strategy 3 — Smart quote cleanup. Curly quotes, control characters, encoding garbage. Clean it, then parse.

All three run in sequence. First one that works wins.

Without this, 1 in 20 analyses would crash silently and the user would stare at "processing..." forever.

The AI part of your AI product is 20%. The "make it not break" part is 80%.

What's your worst production parsing story?
```

### MARDI 24/03 — 13h — ✅ PUBLIÉ 13h

```
Your landing page doesn't need more traffic.

It needs fewer leaks.

I audited 40+ pages this week. The pattern:
→ Most founders blame traffic for low conversions
→ The real problem is almost always on the page itself
→ Social proof missing or buried. CTA invisible. Forms with too much friction.

The average score across every page I analyzed: 67/100.

That means the average page is losing ~1/3 of its conversion potential before a single visitor even leaves.

Fix the page first. Then buy the traffic.

What's the one thing on your page you've never tested?
```

### MERCREDI 25/03 — 13h — ✅ PUBLIÉ 13h

```
Last week I told a developer to add timeout + retry logic on her AI API calls.

She shipped it the same day.

Hard 15s timeout. 2 retries. Wrapped every OpenAI call in a retry function. Pushed to production. Tagged me in the commit tweet.

This is what building in public actually looks like.

Not metrics dashboards. Not follower counts.

One specific technical insight → implemented in production → shipped in hours.

That interaction taught me more about product-market fit than any signup number.

If your advice is specific enough that someone can implement it today, you're doing it right.
```

### JEUDI 26/03 — 13h — ✅ PUBLIÉ 13h

```
I sent 9 cold outreach audits in my first week.

3 turned into real conversations.
2 implemented fixes the same day.
0 asked me to stop.

The pattern nobody talks about:

The pages with the WORST scores generated the BEST engagement.

A 45/100 turned into a multi-day conversation.
A 77/100 got a polite "thanks."

Why? Low scores = high perceived value. When someone sees 6 specific problems they didn't know about, they listen.

Cold outreach that works isn't about selling. It's about showing someone something they can't see themselves.

What's your cold outreach strategy?
```

### BONUS 2 — VENDREDI 27/03 — Tweet 13h — ✅ PUBLIÉ 13h

```
Shipped 3 features in one evening.

F0 — Score consistency: added temperature:0 to Claude API calls + content hashing. Same page, same content = same score. An audit tool with random scores isn't an audit tool.

F1 — Re-analysis: re-run any URL and track your score over time. Built with a score_history table + Recharts graph. The feature that justifies a subscription.

F2 — Benchmark: "Your page scores better than 73% of pages analyzed." Percentile calculation from our growing dataset. Abstract score → concrete position.

The AI part of each feature: ~20 minutes.
The plumbing (DB migrations, cache invalidation, frontend components): ~3 hours.

80% plumbing. Every. Single. Time.
```

---

## LINKEDIN

### LUNDI 23/03 — 21h — ✅ SCHEDULÉ 21h

```
Claude API returns clean JSON 95% of the time.

The other 5% nearly killed our product.

Leak Detector sends a structured prompt to Claude that evaluates landing pages across 8 conversion categories. The response is supposed to be pure JSON — scores, issues, recommendations, all structured.

It usually is. But "usually" doesn't cut it in production.

Here's what goes wrong:

Sometimes Claude wraps the JSON in markdown code blocks.
Sometimes it adds a sentence before the JSON starts.
Sometimes it uses curly quotes instead of straight quotes.
Sometimes control characters sneak into the output.

Any one of these breaks json.loads() instantly.

Our fix: three parsing strategies that run in sequence.

Strategy 1 — Direct parse. json.loads() on the raw response. Works 95% of the time. When it doesn't, we move to:

Strategy 2 — Regex extraction. Search for the first { and last } in the response. Extract everything between them. Try parsing again. This catches markdown wrappers and preamble text.

Strategy 3 — Character cleanup. Replace curly quotes with straight quotes. Strip control characters except newlines and tabs. Then parse one more time.

If all three fail, we log the raw response, mark the analysis as failed, and the Celery worker retries the entire job with a 5-second delay. Max 2 retries before we give up gracefully.

The result: 99%+ successful analysis completion rate.

The lesson for anyone building with LLM APIs: never trust the output format. Always build fallback parsing. And always log the failures — they teach you more about the model's behavior than the successes.

What's your worst LLM output parsing story?
```

### JEUDI 26/03 — 21h — ✅ PUBLIÉ 21h

```
I sent 9 cold outreach messages in my first week.

Not DMs. Not templates. Not automated sequences.

Public replies to developers who just shipped a product, with a free audit of their landing page attached.

Here's what happened:

9 audits sent.
3 turned into genuine technical conversations.
2 builders implemented fixes the same day.
1 developer shipped timeout + retry logic on all her API calls within hours of my suggestion.
0 people asked me to stop.

The insight that surprised me most:

The pages with the worst scores generated the best conversations.

A 45/100 audit turned into a multi-day exchange about async pipeline architecture.
A 77/100 got a polite "thanks, will check it out."

Why?

When someone sees 3 critical issues they had no idea about, the audit feels like a gift. When someone sees mostly "info" level suggestions, there's nothing urgent to discuss.

Low scores = high perceived value.

This changes how I think about cold outreach entirely.

The traditional approach: find qualified leads, personalize the message, pitch the product.

What actually worked: find builders who just shipped, show them something they can't see themselves, start a conversation about the technical problem.

The product sells itself when the value is visible before anyone clicks a signup link.

Week 2 starts with 8 new features planned and the same outreach approach.

For founders doing cold outreach: what's your conversion rate, and what format works best for you?
```

---

## POSTS BONUS

### BONUS 1 — JEUDI 26/03 — Tweet landing page before/after — ✅ PUBLIÉ ~16h30

```
Shipped the new landing page last night.

The irony of building a tool that audits landing pages — and realizing your own page didn't look the part.

Before → After

Same product. Same scoring engine. Completely new front door.

Warmer design, cleaner hero, glassmorphism card showing a real Stripe.com audit result, streamlined navigation.

If your product judges other people's pages, yours better hold up to the standard.
```

(Posté avec 2 screenshots before/after)
