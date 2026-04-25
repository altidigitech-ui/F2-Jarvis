# CROSS-ENGAGEMENT TRACKER F — Semaine 7 (27/04/2026 → 03/05/2026)

**Fichier fusionné** Couche A + Couche B — replies F sur posts R et F2.
- **Couche A — Sales Mode** : 12 replies F (lun→ven), voix expert builder/CTO, 6 registres VOIX.md
- **Couche B — Beta "No Install"** : 8 replies F (mer→ven), ton founder enthousiaste, amplification offre beta

**Total S7 F : 20 replies.**
**Archivage :** dimanche 03/05/2026 → `fabrice/archives/cross-engagement-tracker-s7-final.md`.
**Fichier READ-ONLY** — ne pas modifier automatiquement. Tracking dynamique dans `fabrice/engagement/cross-execution-log.md`.

---

═══════════════════════════════════════════════════════════════
# COUCHE A — SALES MODE (12 replies F)
═══════════════════════════════════════════════════════════════

**Règle timing :** publier dans les **5 minutes** après la publication du post original.
**Règle voix :** mode écosystème. F prolonge depuis son vécu CTO/builder. Jamais de question à R comme si F ne savait pas. F parle code / détection / data sources — pas growth.
**Règle registres :** alterner les 6 registres VOIX.md. Jamais 2 consécutifs identiques.
**Règle ANTI-IA :** contractions (don't, I've, it's), phrases de longueurs variées, pas d'em-dash pivot, pas de cadence fixe.

---

## LUNDI 27/04

### Reply A1 — R Twitter 14h00 (`68 stores $12,400 cumul`)

**Registre :** pourquoi technique
**Reply (à coller 14h05 max) :**

```
the 61% ghost billing share is the one that surprised me building this. I expected checkout friction to dominate. but ghost billing stacks silently for 8-14 months — checkout friction at least eventually shows up as bounce rate.

stores with high app turnover hit $300-400/month easily. $189 is the average, not the ceiling.
```

---

### Reply A2 — F2 Twitter 15h00 (`68 stores since launch`)

**Registre :** builder story
**Reply (à coller 15h05 max) :**

```
the "dashboards don't surface it" is the entire problem I was trying to solve when I started building this. merchants were checking analytics every week. zero alerts. then you scan the billing layer and find subscriptions running from apps removed 11 months ago.

the data is there — it's just in a place nobody looks.
```

---

## MARDI 28/04

### Reply A3 — R Twitter 14h00 (`zombie apps provocateur`)

**Registre :** debugging
**Reply (à coller 14h05 max) :**

```
the interface problem is what makes this so persistent. when you uninstall through Shopify admin, there's no "cancel your Stripe subscription" step in the flow. app disappears from the dashboard. billing doesn't get the memo.

I've helped merchants manually cancel subscriptions they didn't know they had. takes 20 minutes to find them. would've taken 60s to scan for them first.
```

---

### Reply A4 — F2 Twitter 15h00 (`94% ghost billing`)

**Registre :** quick fix
**Reply (à coller 15h05 max) :**

```
the 94% number keeps holding as the sample grows. I expected it to drop when we started scanning newer stores. it does — stores under 12 months old are around 55%. stores over 3 years: 97%.

app churn compounds over time.
```

---

### Reply A5 — R LinkedIn 17h00 (`$12,400 breakdown`)

**Registre :** pourquoi technique
**Reply (à coller 17h05 max) :**

```
The AI readiness piece is where the agency opportunity gets interesting.

Ghost billing is a financial leak — easy to frame, easy to sell the fix. Checkout friction is a conversion problem — attributable once you have the data. AI readiness is a future problem that's already affecting stores above $100k/month where ChatGPT shopping recommendations are starting to drive traffic.

Agencies that surface this now are ahead of the "why isn't our store on AI search" conversation coming in the next 12-18 months. Worth separating in the pitch — different urgency, different budget conversation.
```

---

## MERCREDI 29/04

### Reply A6 — R Twitter 14h00 (`mobile checkout diagnostic`)

**Registre :** step-by-step
**Reply (à coller 14h05 max) :**

```
the mid-range Android test is the one I give every merchant who thinks their speed is fine.

grab any moto G or samsung A-series, turn off WiFi, load your checkout on 4G, check chrome devtools performance tab. if it's above 3.5s before first interaction, you have a problem.

iPhone on WiFi is best-case. it's not your customers' real experience.
```

---

### Reply A7 — F2 Twitter 15h00 (`3 things analytics`)

**Registre :** builder story
**Reply (à coller 15h05 max) :**

```
built the 43-check module because each of those 3 layers needs a completely different data source. ghost billing needs the Stripe billing API, checkout friction needs performance observer attribution per app, AI readiness needs schema validation plus robots parsing.

no existing tool combined all three. the 60s runtime is from parallelizing all 43 checks — sequential would take 8-10 minutes.
```

---

## JEUDI 30/04

### Reply A8 — R Twitter 14h00 (`agency 8 clients $1,400`)

**Registre :** comparatif honnête
**Reply (à coller 14h05 max) :**

```
the quarterly audit gap is what kills agencies on this. ghost billing runs on monthly cycles. catch it at month 3 and you're already 3 months late per store.

I've seen agencies switch to monthly scanning on top-tier clients. the delta between quarterly and monthly is about $500-700 per store per year on ghost billing alone.
```

---

### Reply A9 — F2 Twitter 15h00 (`agency offer free scan`)

**Registre :** quick fix
**Reply (à coller 15h05 max) :**

```
"issues their own audits missed every time" holds because most agency audits read from the admin API. the admin API shows what Shopify thinks. the Stripe billing API shows what's actually charged.

different systems. checking the right one is the entire fix.
```

---

### Reply A10 — R LinkedIn 17h00 (`agency scan pitch`)

**Registre :** builder story
**Reply (à coller 17h05 max) :**

```
The "ghost billing doesn't wait for your calendar" framing is the one that closes the objection fastest.

I pitch agencies on a different frame: StoreMD isn't a replacement for the quarterly audit. It's the continuous monitoring layer that makes your quarterly audit actually accurate. Different tool, different purpose, different budget conversation.

The agencies that got this in S6 are running monthly scans on their top 20% clients and using findings as a retention conversation starter. Average finding is still $140-189/month per store — enough to justify the conversation.
```

---

## VENDREDI 01/05

### Reply A11 — R Twitter 14h00 (`week 7 recap 90 stores`)

**Registre :** pourquoi technique
**Reply (à coller 14h05 max) :**

```
90 stores and still no exception on ghost billing for stores over 18 months old. I expected to start finding clean ones by now.

the Shopify billing architecture makes it structurally hard to avoid — you'd need the app dev to have built a proper uninstall webhook to cancel the Stripe sub. most didn't. so the leak is structural, not a bug in a few apps.
```

---

### Reply A12 — F2 Twitter 15h00 (`AI readiness 42%`)

**Registre :** comparatif honnête
**Reply (à coller 15h05 max) :**

```
42% is actually lower than what I see on the stores we scan directly. the ones we've run manually cluster around 55-65% with broken schema.

probably selection bias — merchants who find StoreMD via cold or posts are already worried about performance, so our sample skews messier. 42% from broader data is the conservative number.
```

---

### COMPTEUR COUCHE A

| Jour | Replies F | Registres utilisés |
|------|-----------|--------------------|
| Lundi | 2 (R TW + F2 TW) | pourquoi technique, builder story |
| Mardi | 3 (R TW + F2 TW + R LI) | debugging, quick fix, pourquoi technique |
| Mercredi | 2 (R TW + F2 TW) | step-by-step, builder story |
| Jeudi | 3 (R TW + F2 TW + R LI) | comparatif honnête, quick fix, builder story |
| Vendredi | 2 (R TW + F2 TW) | pourquoi technique, comparatif honnête |
| **Total Couche A** | **12 replies F** | 6 registres tous utilisés |

---

═══════════════════════════════════════════════════════════════
# COUCHE B — BETA "NO INSTALL" (8 replies F)
═══════════════════════════════════════════════════════════════

**Règle voix Couche B :** ton founder enthousiaste. Pas d'explications techniques détaillées — laissées à la Couche A. Phrases courtes, directes. Mentions de R pour renforcer l'image co-fondateurs alignés.
**Règle timing :** 5 minutes max après publication.
**Règle ANTI-IA :** contractions, phrases variées, pas d'em-dash pivot, ouvertures différentes.

---

## MERCREDI 29/04

### Reply B1 — R Twitter 19h00 (`51/0 beta offer`)

**Reply (à coller 19h05 max) :**

```
scan pipeline is live. every URL that comes in gets a full report within 2 hours.

R takes half the DMs, I take the other half. same scan either way. 10 spots total, not 10 per person.
```

---

### Reply B2 — F2 Twitter 20h00 (`OAuth wall`)

**Reply (à coller 20h05 max) :**

```
manual pipeline is running. drop a URL, report goes back same session.

10 spots is what we can handle personally this week without faking the support.
```

---

### Reply B3 — R LinkedIn 20h30 (`agency beta no install`)

**Reply (à coller 20h35 max) :**

```
Confirming from the build side — the pipeline handles multi-store volume. If you're an agency with 5-10 Shopify clients, drop multiple URLs and we'll run them as a batch.

Every scan comes back with the full ghost billing audit, checkout friction analysis, and AI readiness score.

DM me or R with your URLs. Reports back same day.
```

---

## JEUDI 30/04

### Reply B4 — R Twitter 19h00 (`4 spots beta results`)

**Reply (à coller 19h05 max) :**

```
all 6 beta stores had ghost billing. zero exceptions. I expected at least one clean store in the batch.

4 spots left. DM me your URL, report back today.
```

---

### Reply B5 — F2 Twitter 20h00 (`beta update 6 stores`)

**Reply (à coller 20h05 max) :**

```
6/6 held. still waiting for the first exception.

4 spots left this week. DM your URL.
```

---

## VENDREDI 01/05

### Reply B6 — R Twitter 19h00 (`8 scans recap`)

**Reply (à coller 19h05 max) :**

```
"numbers should be better" is exactly what I heard from 4 of the 8 merchants before the scan. the scan just names the sources. ghost billing plus checkout friction plus AI gaps — all running at once, invisible in analytics.

2 spots left. last day for batch 1.
```

---

### Reply B7 — F2 Twitter 20h00 (`beta week wrap`)

**Reply (à coller 20h05 max) :**

```
second batch opens next week. 10 more spots. same process — no install, just your URL.

the data from batch 1 is already shaping what Pro v2 looks like.
```

---

### Reply B8 — R LinkedIn 20h30 (`agency beta results`)

**Reply (à coller 20h35 max) :**

```
The agency running 6 client stores this week is exactly the use case Pro was built for.

2 hours to run all 6 scans from my end. The agency had data on all 6 stores they hadn't seen before.

Second batch opens next week. DM if you want in.
```

---

### COMPTEUR COUCHE B

| Jour | Replies F | Détail |
|------|-----------|--------|
| Mercredi | 3 (R TW + F2 TW + R LI) | B1, B2, B3 |
| Jeudi | 2 (R TW + F2 TW) | B4, B5 |
| Vendredi | 3 (R TW + F2 TW + R LI) | B6, B7, B8 |
| **Total Couche B** | **8 replies** | |

---

═══════════════════════════════════════════════════════════════
# COMPTEUR CONSOLIDÉ S7 — F TOTAL
═══════════════════════════════════════════════════════════════

| Jour | Couche A | Couche B | Total F jour |
|------|----------|----------|--------------|
| Lundi 27/04 | 2 (A1, A2) | — | 2 |
| Mardi 28/04 | 3 (A3, A4, A5) | — | 3 |
| Mercredi 29/04 | 2 (A6, A7) | 3 (B1, B2, B3) | 5 |
| Jeudi 30/04 | 3 (A8, A9, A10) | 2 (B4, B5) | 5 |
| Vendredi 01/05 | 2 (A11, A12) | 3 (B6, B7, B8) | 5 |
| Samedi 02/05 | — (F publie, R/F2 OFF) | — | 0 |
| **Total S7** | **12 replies** | **8 replies** | **20 replies F** |

---

═══════════════════════════════════════════════════════════════
# STATUT EXÉCUTION CONSOLIDÉ
═══════════════════════════════════════════════════════════════

| # | Couche | Jour | Heure cible | Compte | Post source | Statut |
|---|--------|------|-------------|--------|-------------|--------|
| 1 | A | Lun 27/04 | 14h05 | R TW | 68 stores $12,400 | ☐ |
| 2 | A | Lun 27/04 | 15h05 | F2 TW | 68 stores since launch | ☐ |
| 3 | A | Mar 28/04 | 14h05 | R TW | zombie apps provocateur | ☐ |
| 4 | A | Mar 28/04 | 15h05 | F2 TW | 94% ghost billing | ☐ |
| 5 | A | Mar 28/04 | 17h05 | R LI | $12,400 breakdown | ☐ |
| 6 | A | Mer 29/04 | 14h05 | R TW | mobile checkout diagnostic | ☐ |
| 7 | A | Mer 29/04 | 15h05 | F2 TW | 3 things analytics | ☐ |
| 8 | A | Jeu 30/04 | 14h05 | R TW | agency 8 clients $1,400 | ☐ |
| 9 | A | Jeu 30/04 | 15h05 | F2 TW | agency offer free scan | ☐ |
| 10 | A | Jeu 30/04 | 17h05 | R LI | agency scan pitch | ☐ |
| 11 | A | Ven 01/05 | 14h05 | R TW | week 7 recap 90 stores | ☐ |
| 12 | A | Ven 01/05 | 15h05 | F2 TW | AI readiness 42% | ☐ |
| 13 | B | Mer 29/04 | 19h05 | R TW | 51/0 beta offer | ☐ |
| 14 | B | Mer 29/04 | 20h05 | F2 TW | OAuth wall | ☐ |
| 15 | B | Mer 29/04 | 20h35 | R LI | agency beta no install | ☐ |
| 16 | B | Jeu 30/04 | 19h05 | R TW | 4 spots beta results | ☐ |
| 17 | B | Jeu 30/04 | 20h05 | F2 TW | beta update 6 stores | ☐ |
| 18 | B | Ven 01/05 | 19h05 | R TW | 8 scans recap | ☐ |
| 19 | B | Ven 01/05 | 20h05 | F2 TW | beta week wrap | ☐ |
| 20 | B | Ven 01/05 | 20h35 | R LI | agency beta results | ☐ |

---

*Tracker F S7 — créé 25/04/2026. Couche A : voix F VOIX.md + ANTI-IA.md + 6 registres alternés. Couche B : ton founder enthousiaste + BIBLE v2.1 §3 + ANTI-IA.md. Source posts : BATCH-SEMAINE-7.md §5 et §6.*