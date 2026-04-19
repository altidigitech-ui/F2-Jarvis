# POSTS VALIDÉS F — Semaine du 16/03/2026 au 22/03/2026

**Usage :** Textes finaux prêts à copier-coller dans le scheduler. Séparé du plan-hebdo (qui contient la stratégie et les objectifs). Ici c'est UNIQUEMENT le texte. Archivé le dimanche avec plan-hebdo et progress-semaine.

---

## TWITTER

### LUNDI 16/03 — 13h — ✅ PUBLIÉ

(Déjà posté)

### MARDI 17/03 — 13h — ✅ PUBLIÉ 13h

```
Unpopular opinion: You don't need Kubernetes for your indie SaaS.

A single Railway deployment handles 10K+ requests/day.

Save the infrastructure complexity for when you actually have the traffic problem.

Ship first. Scale later.

What's your production setup? 👇
```

### MERCREDI 18/03 — 13h — ✅ PUBLIÉ 13h

```
Everyone thinks building an AI product is about the AI.

It's not.

The prompts took 2 weeks. The infrastructure — async pipelines, timeout handling, silent failures — took 2 months.

80% of your AI product is plumbing.

What took you longer: the AI or the infra? 👇
```

### JEUDI 19/03 — 13h — ✅ PUBLIÉ 13h

```
Why I picked FastAPI over Django for an AI SaaS:  → Async native — Celery workers process analysis jobs in background → Pydantic validation built-in — every API schema validated automatically → Lightweight — no ORM overhead I don't need  Tradeoff: wired auth through Supabase GoTrue API instead of Django's built-in auth.  Would I choose it again? 100%.  What's your stack?
```

### VENDREDI 20/03 — 13h — ⏳ À PUBLIER 13h

```
Week 1 of building in public at @foundrytwo.  What I shipped: Leak Detector — an AI engine that audits landing pages in under 60 seconds.  What happened: → 7 signups, $0 MRR. Day 5. The numbers aren't sexy yet. → 5 cold outreach audits sent. 3 turned into real dev-to-dev conversations. → One builder implemented my timeout + retry advice in production the same day. → Started with 7 followers. Now 14. Small but real.  What surprised me: The pages with the worst scores generated the best conversations. A 45/100 got more engagement than a 77/100.  What I learned: The product works. The pipeline is stable. Now it's about getting it in front of more builders.  Week 2 starts tomorrow with 8 new features planned.  What was your first week like when you launched?
```

---

## LINKEDIN

### LUNDI 16/03 — 21h — ✅ PUBLIÉ 21h

```
I just launched an AI engine that audits landing pages in under 60 seconds.  Here's what happens when you paste a URL into Leak Detector:  Step 1 — Fetch the page with a headless browser. Not just the HTML. Playwright renders the full page like a real visitor would see it. JavaScript, dynamic content, everything.  Step 2 — Send the scraped content to Claude API with a structured prompt that evaluates 8 conversion categories: headline clarity, CTA placement, social proof, forms, visual hierarchy, trust signals, mobile experience, speed.  Step 3 — Parse the AI response into a scored report. Each category gets a weighted score, specific issues flagged, and actionable fixes. Three fallback parsing strategies handle edge cases when the model output isn't clean JSON.  Step 4 — Celery background worker manages the whole pipeline. Retry logic, timeout handling, Retry logic with graceful failure handling for failed jobs.  Total processing time: under 60 seconds.  The hard part wasn't the AI. It was making the full pipeline — scraping, analysis, parsing, storage, email notification — reliable and fast enough that users don't leave before the report loads.  If you're building AI-powered tools, budget 80% of your time for the plumbing around the model call.  What was the hardest infrastructure problem you solved in your last project? 👇
```

### JEUDI 19/03 — 21h — ✅ PUBLIÉ 21h

```
Why I picked FastAPI over Django to build an AI SaaS.  Leak Detector runs a full analysis pipeline for every URL: headless browser scraping, AI evaluation across 8 categories, JSON parsing with fallback strategies, score calculation, PDF generation, and email notification.  All of this runs in a Celery background worker so the user isn't waiting on a blocking request.  Django could handle this — but not natively. Its sync-first architecture means you're bolting on async support with workarounds. It works, but you're fighting the framework instead of using it.  FastAPI gave us async-native request handling out of the box. The Celery worker runs the heavy pipeline in background. Clean separation.  Second reason: Pydantic validation is built-in. Every API request and response schema is validated automatically. When you're processing structured data from multiple sources, this saves hours of debugging malformed payloads.  The tradeoff: FastAPI has no built-in ORM or auth. Django gives you migrations, admin panel, auth — out of the box. With FastAPI, I wired auth through Supabase GoTrue API and use Supabase PostgreSQL for the data layer.  More integration work upfront. But the codebase stays lightweight. No unused middleware. No ORM overhead.  What stack are you building on, and what tradeoffs did you accept?
```

---

# POSTS VALIDÉS F — SEMAINE 2 — 23/03/2026 au 29/03/2026

---

## TWITTER

### LUNDI 23/03 — 13h — ⏳ À SCHEDULER

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

### MARDI 24/03 — 13h — ⏳ À SCHEDULER

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

### MERCREDI 25/03 — 13h — ⏳ À SCHEDULER

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

### JEUDI 26/03 — 13h — ⏳ À SCHEDULER

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

### VENDREDI 27/03 — 13h — ⏳ À RÉDIGER VENDREDI

Données nécessaires : ce qui a tenu, ce qui a cassé, ce qui a surpris, chiffres semaine 2, nouvelles features shippées.

---

## LINKEDIN

### LUNDI 23/03 — 21h — ⏳ À SCHEDULER

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

### JEUDI 26/03 — 21h — ⏳ À SCHEDULER

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
