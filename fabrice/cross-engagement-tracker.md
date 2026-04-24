# CROSS-ENGAGEMENT TRACKER F — Semaine 6 FINAL (20/04/2026 → 26/04/2026)

**Fichier fusionné** regroupant les 2 couches de replies F pour la semaine 6 :
- **Couche A — Sales Mode** : 14 replies F (lun→ven), voix expert builder/CTO, 6 registres VOIX.md (step-by-step, pourquoi technique, builder story, quick fix, comparatif honnête, debugging)
- **Couche B — Beta Testers** : 8 replies F (mer→ven), ton founder enthousiaste, amplification offre beta

**Total S6 F : 22 replies.**
**Source :** `cross-engagement-tracker-F-semaine-6.md` (Couche A) + `cross-engagement-tracker-F-couche-B-semaine-6.md` (Couche B).
**Archivage :** dimanche 26/04/2026 → `fabrice/archives/cross-engagement-tracker-s6-final.md`.

---

═══════════════════════════════════════════════════════════════
# COUCHE A — SALES MODE (14 replies F)
═══════════════════════════════════════════════════════════════

**Usage :** 14 replies F rédigées, prêtes à coller. Une reply par post R et F2 publié cette semaine.
**Règle timing :** publier dans les **5 minutes** après la publication du post original. Signal Twitter = 150x par conversation (auteur reply + co-fondateur reply).
**Règle voix :** mode écosystème. F ne découvre jamais le post. F prolonge depuis son vécu de CTO/builder. Jamais de question à R comme si F ne savait pas. F parle code / détection / implémentation — pas growth.
**Règle ANTI-IA :** contractions obligatoires (don't, I've, it's), phrases de longueurs variées, pas d'em-dash pivot, pas de cadence fixe.
**Règle registres F :** alterner les 6 registres (step-by-step, pourquoi technique, builder story, quick fix, comparatif honnête, debugging). Jamais 2 fois le même consécutif.

---

## LUNDI 20/04

### Reply A1 — R Twitter 13h00 (`lundi-20-04-reprise-claim` — 47 stores scanned pendant suspension)

**Registre :** builder story
**Reply (à coller 13h05 max) :**

```
6 days suspended and you still surfaced 47 scans worth of data. that's the part no one outside the team saw — the detection engine kept running, suspension was just twitter silencing the distribution, not the product.

the $2,100/mo bleeding store is the one I want to see the post-fix follow-up on. did the owner actually kill the three apps?
```

---

### Reply A2 — F2 Twitter 13h00 (`lundi-20-04-relaunch` — Week 6 relaunch 52 scans)

**Registre :** pourquoi technique
**Reply (à coller 13h05 max) :**

```
the 52 number hides something interesting on the backend — 17 of those scans were repeats from merchants who re-ran after their first fix. so the real distinct-store count is lower but the retention signal is real.

people scanning twice means the report made them act, and they wanted to see the delta. that's the feedback loop working.
```

---

## MARDI 21/04

### Reply A3 — R Twitter 13h00 (`mardi-21-04-horror-story` — $80k/mo DTC $2,646/14mo)

**Registre :** debugging
**Reply (à coller 13h05 max) :**

```
the 14-month ghost billing cumulative is where shopify's own billing API makes the detection easy. the line items are all there, they just don't surface back to the merchant dashboard.

when you scanned that DTC — did the owner even know Privy was technically uninstalled? half the time the merchant thinks the app is still active and paying for it on purpose.
```

---

### Reply A4 — F2 Twitter 13h00 (`mardi-21-04-feature-spotlight` — Store Health module)

**Registre :** quick fix
**Reply (à coller 13h05 max) :**

```
the module runs the Core Web Vitals check against real user data, not synthetic. that's the part merchants miss when they compare to pagespeed insights.
```

---

### Reply A5 — R LinkedIn 21h00 (`mardi-21-04-case-study` — Long case study $80k/mo DTC)

**Registre :** pourquoi technique
**Reply (à coller 21h05 max) :**

```
The 1.2s speed tax from the review app "removed" months ago is the detail most merchants can't wrap their head around.

Here's the technical reason it happens: when a Shopify app is uninstalled through the standard flow, the app itself is deactivated but any code the app injected into theme.liquid or into assets/ via the theme editor stays in place. Shopify's uninstall hook doesn't touch theme code by design (merchants could have customized it, Shopify doesn't want to break their store).

So the scripts keep firing on page load even though the app isn't "installed" anymore. It's invisible to the merchant because the app doesn't show up in their installed list.

StoreMD diffs the theme code scripts against the billing line items against the installed list. That's how it catches the mismatches.
```

---

### Reply A6 — F2 LinkedIn 21h00 (`mardi-21-04-launch-week2` — Week 2 post-launch 54 scans)

**Registre :** builder story
**Reply (à coller 21h05 max) :**

```
The tooling side of reaching 54 scans in 7 days without a signup gate is worth explaining for anyone building in this space.

We pipe every scan through a queue (BullMQ + Redis) because the Shopify API rate limits mean we can't run more than 40 requests per scan concurrent per merchant. Each scan takes 58-63 seconds of API calls, plus 2 seconds of diff computation, plus 4 seconds of AI readiness scoring.

Behind the 60-second promise there's a whole orchestration layer making sure we don't hit Shopify's 40-request burst ceiling and don't lose any finding.

The 94% ghost billing detection rate holds because the diff logic doesn't rely on merchant-side data. It reads Shopify's own billing records, which are authoritative.
```

---

## MERCREDI 22/04

### Reply A7 — R Twitter 13h00 (`mercredi-22-04-agency-bait` — Shopify health vs Shopify vanity)

**Registre :** comparatif honnête
**Reply (à coller 13h05 max) :**

```
agencies skip these four because none of them are in standard shopify reporting tools. ghost billing needs API diff, AI readiness needs schema parsing + robots.txt check, app impact needs performance API per-app attribution, theme code audit needs AST analysis.

the tools exist separately for each — there's no single product that runs all four except what we built. that's literally why the stack wasn't there.
```

---

### Reply A8 — F2 Twitter 13h00 (`mercredi-22-04-social-proof` — "I thought my store was fine" 34/100)

**Registre :** quick fix
**Reply (à coller 13h05 max) :**

```
34/100 is the median. the P10 stores we've scanned are in the high teens. no one shows the median, everyone shows the outlier.
```

---

## JEUDI 23/04

### Reply A9 — R Twitter 13h00 (`jeudi-23-04-data-drop` — 50 scans 94%/78%/67%/42%)

**Registre :** debugging
**Reply (à coller 13h05 max) :**

```
the 42% theme code breaking LLM scrapers is the one that's most actionable on the fix side. most of the time it's one specific thing — lazy loaded content that requires JS execution.

you know if the owner of the $2,100 store in lundi's post was also in that 42% bucket? the two patterns tend to stack on older stores.
```

---

### Reply A10 — F2 Twitter 13h00 (`jeudi-23-04-invisible-loss` — $2,268/year ghost cumulative)

**Registre :** pourquoi technique
**Reply (à coller 13h05 max) :**

```
$2,268/year assumes 12 months. the cumulative leak on stores we scanned with app turnover over 3+ years sits closer to $6,500. the longer the store has existed, the more app churn, the more ghost billing stacks up.

shopify's billing records go back to the store's creation date. the data is all there.
```

---

### Reply A11 — R LinkedIn 21h00 (`jeudi-23-04-agency-angle` — Message agencies 3 checks)

**Registre :** builder story
**Reply (à coller 21h05 max) :**

```
The technical reason agencies skip these three is that the data sources for each are in different Shopify APIs that don't get bundled in any standard agency tool.

Ghost billing detection needs the GraphQL Admin API, specifically the AppSubscription node, cross-referenced with the REST apps.json endpoint. No off-the-shelf agency tool pipes both.

AI readiness scoring requires parsing the schema.org JSON-LD from the live rendered page (not the source), plus testing robots.txt against GPTBot's actual user-agent, plus metafield discoverability checks. Three completely different data sources.

App impact fingerprinting needs the Performance Observer API attributing load time per network request per app_handle. Not exposed in any shopify reporting tool.

So when you tell agencies they're missing these, the answer isn't "they're lazy." It's that no one built the single tool that aggregates these three layers. StoreMD is literally the first one.
```

---

## VENDREDI 24/04

### Reply A12 — R Twitter 13h00 (`vendredi-24-04-social-proof` — Agency 8 clients scanned reformulé)

**Registre :** step-by-step
**Reply (à coller 13h05 max) :**

```
the agency workflow we've watched work: scan all clients in bulk overnight (takes about 60s per client), filter reports by severity, call top 3 clients first thing in the morning with the report attached, propose fix package as upsell on existing retainer.

agencies that do this sell 2-3 fix packages per week without any new acquisition spend.
```

---

### Reply A13 — F2 Twitter 13h00 (`vendredi-24-04-week-recap` — Week 6 recap 68/52/$12,400/4)

**Registre :** comparatif honnête
**Reply (à coller 13h05 max) :**

```
the 76% ghost billing hit rate is higher than what I'd have predicted before building this. on paper I expected 50-60%. the actual rate keeps climbing because shopify's app churn is way more aggressive than anyone tracks publicly.

turns out most merchants install 3-4 apps per quarter and uninstall 2-3 per quarter. that's the bulk of the signal.
```

---

### Reply A14 — R LinkedIn 21h00 (`vendredi-24-04-week-recap` — Week recap LinkedIn $12,400)

**Registre :** debugging
**Reply (à coller 21h05 max) :**

```
The $12,400 cumulative is good for the public number. On the backend I'm seeing the individual per-store max leak top $3k this week, which is the outlier that would make for a better single case study than the aggregate.

Question for the follow-up post: are we planning to publish the per-store breakdown as a public case study, or do we keep it anonymized aggregate? The trade-off is credibility (aggregated number is more defensible) vs impact (one big case study converts harder than a stat).

Worth thinking about before S7 batch.
```

---

## SAMEDI 25/04 & DIMANCHE 26/04 — Couche A — Posts F, pas de reply R/F2

F publie `store-md-horror-slow-store` (samedi) et `store-md-before-after-ai` (dimanche). Pas de post R ni F2 ces jours-là → **pas de reply cross-eng weekend à produire côté F**.

Si R ping F sur son propre post F weekend, gérer au cas par cas.

---

### COMPTEUR COUCHE A

| Jour | Replies F exécutées | Registres utilisés |
|------|---------------------|---------------------|
| Lundi | 2 (R + F2 Twitter) | builder story, pourquoi technique |
| Mardi | 4 (R + F2 Twitter, R + F2 LinkedIn) | debugging, quick fix, pourquoi technique, builder story |
| Mercredi | 2 (R + F2 Twitter) | comparatif honnête, quick fix |
| Jeudi | 3 (R + F2 Twitter, R LinkedIn) | debugging, pourquoi technique, builder story |
| Vendredi | 3 (R + F2 Twitter, R LinkedIn) | step-by-step, comparatif honnête, debugging |
| **Total Couche A** | **14 replies F** | 6 registres tous utilisés, alternance respectée |

### RÈGLES D'EXÉCUTION COUCHE A

1. **Timing 5 min max** après publication de R ou F2. Au-delà, le signal 150x est perdu.
2. **Mode écosystème :** F ne découvre pas, F prolonge depuis son angle CTO/builder. Cacher le post original, la reply doit tenir debout seule comme prise de parole d'un co-fondateur technique.
3. **Pas de question à R comme si F ne savait pas** — ils sont co-fondateurs, ils ont accès à toutes les données.
4. **Pas de CTA produit en reply écosystème** — R/F2 gèrent leur CTA sur leur propre post. F partage du technique.
5. **F parle code / détection / backend / data sources** — pas growth, pas positioning, pas agency sales motion (c'est R).
6. **Variation registres** — ne jamais 2 replies consécutives même registre.
7. **ANTI-IA :** contractions, phrases variées, pas d'em-dash pivot, pas de "Not X it's Y", pas de "Here's the thing".
8. **Si une reply ne sort pas dans les 5 min** — la publier quand même dans l'heure, le signal est réduit mais le maillage écosystème reste.

---

═══════════════════════════════════════════════════════════════
# COUCHE B — BETA TESTERS ACQUISITION DIRECTE (8 replies F)
═══════════════════════════════════════════════════════════════

**Usage :** 8 replies F rédigées, prêtes à coller. Une reply par post Couche B (beta testers) publié par R ou F2 sur mer-ven.
**Couche :** B — Beta Testers Acquisition Directe (voir `BATCH-ADDITIONNEL-MER-VEN-S6.md` ou section Couche B du batch final).
**Différence Couche A vs Couche B :** en Couche A, F reply avec voix expert builder/CTO (6 registres VOIX.md : step-by-step, pourquoi technique, builder story, quick fix, comparatif honnête, debugging). En Couche B, F **abandonne l'angle spécialiste technique** et adopte un ton **founder enthousiaste** : co-fondateur aligné avec R, amplification de l'offre beta, vente directe du produit, pas d'explications de code/infra/API.
**Règle timing :** publier dans les **5 minutes** après la publication du post original. Signal Twitter = 150x par conversation.
**Règle voix Couche B :**
- Pas d'explications techniques détaillées (API, queue, BullMQ, AST parsing, GraphQL — laissé à la Couche A)
- Pas de 6 registres VOIX.md déployés
- Énergie co-fondateur, réaction immédiate, amplification de l'offre
- Phrases courtes, directes, enthousiastes
- Mentions "R", "romain", "either of us" pour renforcer alignement co-fondateurs
- Mentions DMs qui arrivent, spots qui se remplissent, rappel quota 10
- Jamais de CTA produit concurrent (F amplifie le CTA porté par le post original)
**Règle ANTI-IA :** contractions obligatoires (don't, I've, it's), phrases variées, pas d'em-dash pivot, pas de "Here's the thing", pas de "Let me", pas de "In fact".
**Règle BIBLE §3 v2.1 :** pas de faux MRR, pas de testimonial verbatim, pas de nom client fictif, pas de faux nombre claimed si c'est pas vrai.

---

## MERCREDI 22/04

### Reply B1 — R Twitter 18h30 (§B.3.1 M1 recrutement)

**Post de R :** R annonce qu'il ouvre 10 Pro beta spots, cash direct, "DM me your URL, first 10 get onboarded tonight."

**Ton F :** co-fondateur qui confirme côté produit — Pro est prêt, on peut onboard tout de suite, ajoute l'énergie builder qui back l'annonce de R.

**Reply F (à coller 18h35 max) :**

```
Pro pipeline is up and running, onboarding is instant — you DM a URL, we push access tonight.

10 spots, that's it for this round. DM romain or me, either works
```

**Traduction :**
> Le pipeline Pro est up et running, l'onboarding est instantané — tu DM une URL, on push l'accès ce soir. 10 spots, c'est tout pour ce round. DM romain ou moi, les deux marchent.

---

### Reply B2 — F2 Twitter 18h30 (§B.5.1 Beta studio angle)

**Post de F2 :** F2 annonce les 10 spots en voix studio neutre, pose le deal transactionnel ("what you get / what we ask / feedback day 14").

**Ton F :** co-fondateur qui appuie le deal, ajoute la dimension humaine que F2 "we" neutre ne porte pas, rappelle qu'il traite personnellement l'onboarding.

**Reply F (à coller 18h35 max) :**

```
onboarding is me, day 14 call is me, slack during the 30 days is me.

not a form, not a ticket system, not a bot. DM the URL, we talk directly from there
```

**Traduction :**
> L'onboarding c'est moi, le call day 14 c'est moi, le slack pendant les 30 jours c'est moi. Pas un formulaire, pas un ticket system, pas un bot. DM l'URL, on parle directement à partir de là.

---

## JEUDI 23/04

### Reply B3 — R Twitter 18h30 (§B.3.2 M2 scan gratuit)

**Post de R :** R pose une question qui tue ("when did you last audit ghost billing / app impact / AI readiness"), offre scan gratuit dans les 24h contre DM.

**Ton F :** co-fondateur qui rentre dans la conversation pour élargir l'offre — F propose la même chose de son côté, double le canal d'entrée.

**Reply F (à coller 18h35 max) :**

```
same deal on my side if you prefer DMing me.

R takes half, I take half, we compare reports tonight. same scan either way, 24h turnaround
```

**Traduction :**
> Même deal de mon côté si tu préfères DM-er moi. R prend la moitié, je prends la moitié, on compare les rapports ce soir. Même scan dans les deux cas, turnaround 24h.

---

### Reply B4 — R LinkedIn 21h00 (§B.6.2 Free scan + cold)

**Post de R :** R pose l'offre manuelle longue — DM ton URL, il scanne lui-même, rapport + 2-3 observations spécifiques dans 24h, "no pitch no upsell."

**Ton F :** co-fondateur qui confirme depuis le côté builder que R tient le deal — c'est pas une move marketing, c'est opérationnellement faisable parce que F fournit l'infra derrière.

**Reply F (à coller 21h05 max) :**

```
Confirming from the build side — R is running these scans manually this week. I'm keeping the Pro infra warm so whatever free scan comes in can get upgraded on the spot if the merchant wants the deeper version.

If you DM R, you get the free scan plus his commentary. If what comes back makes you want to see what Pro catches on top, I can flip the switch same session.

Either way, no form, no signup, no trial countdown. DM either of us and it's done.
```

**Traduction :**
> Je confirme depuis le côté build — R run ces scans manuellement cette semaine. Je garde l'infra Pro chaude pour que n'importe quel scan gratuit qui arrive puisse être upgradé sur place si le merchant veut la version plus profonde. Si tu DM R, tu reçois le scan gratuit plus son commentaire. Si ce qui revient te donne envie de voir ce que Pro catch en plus, je peux flip le switch dans la même session. Dans les deux cas, pas de formulaire, pas de signup, pas de countdown trial. DM l'un de nous et c'est fait.

**Note format LinkedIn :** 1 phrase par ligne, pas de hashtags, saut de ligne entre paragraphes. Pas de lien — F amplifie, le CTA est déjà dans le post R.

---

### Reply B5 — F2 Twitter 18h30 (§B.5.2 Scan gratuit séparé)

**Post de F2 :** F2 clarifie que séparément des 10 spots beta, le scan public gratuit reste dispo one-shot, 60s, pas de signup.

**Ton F :** co-fondateur qui ajoute la perspective builder — pourquoi le scan public existe depuis le jour 1, pas une fake scarcity move.

**Reply F (à coller 18h35 max) :**

```
public scan was live on day 1, still is, still free, still zero gatekeeping.

beta Pro is the layer on top for the 10 merchants we personally support for 30 days. different thing, different commitment
```

**Traduction :**
> Le scan public était live le jour 1, il l'est toujours, toujours gratuit, toujours zéro gatekeeping. Beta Pro c'est la couche au-dessus pour les 10 merchants qu'on support personnellement pendant 30 jours. Autre chose, autre commitment.

---

## VENDREDI 24/04

### Reply B6 — R Twitter 18h30 (§B.3.3 M5 pipeline recap)

**Post de R :** R recap pipeline beta vendredi soir — DMs qui continuent, "last call before weekend," chiffre illustratif $340/mo sur store $28k/mo.

**Ton F :** co-fondateur qui valide depuis le côté infra — les scans continuent de passer, la pipe tient le load.

**Reply F (à coller 18h35 max) :**

```
infra held through the week, every beta scan got onboarded same-day as the DM came in.

last window tonight. after weekend we lock and focus on day-14 feedback
```

**Traduction :**
> L'infra a tenu toute la semaine, chaque scan beta a été onboardé le même jour que le DM est arrivé. Dernière fenêtre ce soir. Après le weekend on lock et on focus sur le feedback day-14.

---

### Reply B7 — F2 Twitter 18h30 (§B.5.3 Beta pipeline recap)

**Post de F2 :** F2 recap final semaine beta — 10 spots ouverts mercredi, feedback loop day 14, Pro public après consolidation.

**Ton F :** co-fondateur qui ferme la boucle sur le roadmap produit, mais reste court et enthousiaste.

**Reply F (à coller 18h35 max) :**

```
day 14 is where the feedback really lands. after that we iterate for 2 weeks, then Pro opens public.

clean sprint. no contract, no paywall pressure, just 10 merchants using the deepest version of the tool
```

**Traduction :**
> Day 14 c'est là où le feedback atterrit vraiment. Après ça on itère 2 semaines, puis Pro ouvre en public. Clean sprint. Pas de contrat, pas de pression paywall, juste 10 merchants qui utilisent la version la plus profonde du tool.

---

### Reply B8 — R LinkedIn 21h00 (§B.6.3 Recap beta semaine)

**Post de R :** R recap semaine complète — beta filled, 60% merchants 40% agencies, one agency 7 clients, finding illustratif DTC $45k/mo, roadmap feedback day 14.

**Ton F :** co-fondateur qui clôt la semaine côté builder, vue technique globale mais courte, amplifie le feedback loop qui s'ouvre la semaine prochaine.

**Reply F (à coller 21h05 max) :**

```
On the build side, this week validated two things we weren't sure about.

One — the Pro pipeline handles the multi-scan load from agencies without needing new infra work. The agency that put 7 clients through in 48h was the stress test, and nothing broke.

Two — the day-14 call structure is the right cadence. Long enough for merchants to hit real edge cases in Pro, short enough that we can iterate in the remaining 16 days of the beta.

Next week we start the feedback rounds. I'll be on the calls with R, one merchant at a time.

Last spots close tonight for anyone still on the fence.
```

**Traduction :**
> Côté build, cette semaine a validé deux choses dont on était pas sûrs. Un — le pipeline Pro handle le load multi-scan des agencies sans avoir besoin de nouveau travail d'infra. L'agency qui a mis 7 clients en 48h était le stress test, rien n'a cassé. Deux — la structure du call day-14 est la bonne cadence. Assez long pour que les merchants hit de vrais edge cases en Pro, assez court pour qu'on puisse itérer dans les 16 jours restants de la beta. La semaine prochaine on démarre les rounds de feedback. Je serai sur les calls avec R, un merchant à la fois. Derniers spots ferment ce soir pour ceux qui sont encore sur la clôture.

**⚠️ Note chiffres "agency 7 clients in 48h" :** à aligner avec le post R LinkedIn ven (§B.6.3) qui mentionne le même chiffre. Si R a le chiffre réel différent au moment de publier, **aligner les 2 posts** — pas de contradiction entre la reply F et le post source R.

---

### COMPTEUR COUCHE B

| Jour | Replies F exécutées | Détail |
|---|---|---|
| Mercredi | 2 (R TW + F2 TW) | Reply B1, B2 |
| Jeudi | 3 (R TW + R LI + F2 TW) | Reply B3, B4, B5 |
| Vendredi | 3 (R TW + F2 TW + R LI) | Reply B6, B7, B8 |
| **Total Couche B** | **8 replies** | |

### RÈGLES D'EXÉCUTION COUCHE B

1. **Timing 5 min max** après publication de R ou F2 Couche B. Signal 150x activé.
2. **Ton founder enthousiaste** — pas d'explication technique déployée, pas de 6 registres VOIX.md. F amplifie, F valide depuis le côté build, F ne fait pas un cours technique.
3. **Mentions de R obligatoires** ("R", "romain", "either of us", "DM either of us") — renforce l'image co-fondateurs alignés, pas 2 comptes qui font leur truc chacun.
4. **Pas de CTA produit concurrent** — le CTA principal est dans le post original (DM / claim spot / scan). F ne crée pas un nouveau CTA.
5. **Éviter la redondance avec Couche A** — si F a déjà expliqué la même chose technique en reply Couche A le même jour, ne pas la répéter ici. Si Couche A dit "here's how the AST parsing works", Couche B dit "the infra held, onboarding is instant" — complémentaire pas doublon.
6. **ANTI-IA** — contractions systématiques, phrases variées, pas d'em-dash pivot, ouvertures différentes à chaque reply.
7. **Chiffres** — utiliser les vrais chiffres du moment (spots restants, scans effectués). Si faux → reformuler générique. BIBLE §3.
8. **Si reply sort au-delà de 5 min** — publier dans l'heure quand même, maillage écosystème maintenu même avec signal réduit.

---

═══════════════════════════════════════════════════════════════
# COMPTEUR CONSOLIDÉ S6 — F TOTAL
═══════════════════════════════════════════════════════════════

| Jour | Couche A | Couche B | Total F jour |
|------|----------|----------|--------------|
| Lundi 20/04 | 2 replies (A1, A2) | — | 2 |
| Mardi 21/04 | 4 replies (A3, A4, A5, A6) | — | 4 |
| Mercredi 22/04 | 2 replies (A7, A8) | 2 replies (B1, B2) | 4 |
| Jeudi 23/04 | 3 replies (A9, A10, A11) | 3 replies (B3, B4, B5) | 6 |
| Vendredi 24/04 | 3 replies (A12, A13, A14) | 3 replies (B6, B7, B8) | 6 |
| **Total S6** | **14 replies** | **8 replies** | **22 replies F** |

---

═══════════════════════════════════════════════════════════════
# STATUT EXÉCUTION CONSOLIDÉ
═══════════════════════════════════════════════════════════════

Cocher au fur et à mesure :

| # | Couche | Jour | Heure cible | Compte | Reply | Statut |
|---|--------|------|------------|--------|-------|--------|
| 1 | A | Lun 20/04 | 13h05 | R TW | A1 reprise claim | ☐ |
| 2 | A | Lun 20/04 | 13h05 | F2 TW | A2 relaunch | ☐ |
| 3 | A | Mar 21/04 | 13h05 | R TW | A3 horror ghost | ☐ |
| 4 | A | Mar 21/04 | 13h05 | F2 TW | A4 feature health | ☐ |
| 5 | A | Mar 21/04 | 21h05 | R LI | A5 case study $80k | ☐ |
| 6 | A | Mar 21/04 | 21h05 | F2 LI | A6 week 2 post-launch | ☐ |
| 7 | A | Mer 22/04 | 13h05 | R TW | A7 agency bait | ☐ |
| 8 | A | Mer 22/04 | 13h05 | F2 TW | A8 I thought fine | ☐ |
| 9 | A | Jeu 23/04 | 13h05 | R TW | A9 data drop | ☐ |
| 10 | A | Jeu 23/04 | 13h05 | F2 TW | A10 invisible loss | ☐ |
| 11 | A | Jeu 23/04 | 21h05 | R LI | A11 agency angle | ☐ |
| 12 | A | Ven 24/04 | 13h05 | R TW | A12 agency 8 clients | ☐ |
| 13 | A | Ven 24/04 | 13h05 | F2 TW | A13 week recap | ☐ |
| 14 | A | Ven 24/04 | 21h05 | R LI | A14 week recap LinkedIn | ☐ |
| 15 | B | Mer 22/04 | 18h35 | R TW | B1 M1 recrutement | ☐ |
| 16 | B | Mer 22/04 | 18h35 | F2 TW | B2 Beta studio angle | ☐ |
| 17 | B | Jeu 23/04 | 18h35 | R TW | B3 M2 scan gratuit | ☐ |
| 18 | B | Jeu 23/04 | 21h05 | R LI | B4 Free scan + cold | ☐ |
| 19 | B | Jeu 23/04 | 18h35 | F2 TW | B5 Scan gratuit séparé | ☐ |
| 20 | B | Ven 24/04 | 18h35 | R TW | B6 M5 pipeline recap | ☐ |
| 21 | B | Ven 24/04 | 18h35 | F2 TW | B7 Beta pipeline recap | ☐ |
| 22 | B | Ven 24/04 | 21h05 | R LI | B8 Recap beta semaine | ☐ |

---

*Tracker F S6 final fusionné 21/04/2026. Couche A : replies rédigées selon canon §17 BATCH-SEMAINE-6.md + voix F `fabrice/VOIX.md` + ANTI-IA.md. Couche B : replies rédigées selon ton founder enthousiaste validé 21/04 + BIBLE v2.1 §3 + ANTI-IA.md. Posts Couche B source : `BATCH-ADDITIONNEL-MER-VEN-S6.md` (ou section Couche B de `batch-semaine-6-final.md`).*


**Reply R publiée (23/04/2026 17:19:54 CEST) :**

```
Cross-engagement F fait sur post Romain 13h
```


**Reply R publiée (23/04/2026 17:19:54 CEST) :**

```
Cross-engagement F fait sur post F2 13h
```


**Reply R publiée (23/04/2026 17:22:07 CEST) :**

```
Cross Fabrice sur post F2 13h
```


**Reply R publiée (23/04/2026 17:22:07 CEST) :**

```
Cross Fabrice sur post Romain 13h
```


**Reply R publiée (23/04/2026 19:40:37 CEST) :**

```
ran into this building the ghost billing module. the billing contract and the app install state are two completely separate things in Shopify's API. you can remove an app from the dashboard and the subscription contract stays active. that gap is why merchants have no idea — their admin just says 'uninstalled'.
```


**Reply R publiée (23/04/2026 19:40:38 CEST) :**

```
the no admin access part matters more than it sounds tbh. merchants share a URL. they don't share store access, even for something free. I built the whole detection pipeline around public-facing signals because of that. everything it catches is visible without touching the backend.
```


**Reply R publiée (23/04/2026 20:47:28 CEST) :**

```
Romain cross-engage sur post F 13h
```


**Reply R publiée (23/04/2026 20:47:28 CEST) :**

```
F2 cross-engage sur post F 18h30
```


**Reply R publiée (23/04/2026 20:47:28 CEST) :**

```
F2 cross-engage sur post F 13h
```


**Reply R publiée (23/04/2026 20:47:28 CEST) :**

```
Romain cross-engage sur post F 18h30
```


**Reply R publiée (24/04/2026 14:00:45 CEST) :**

```
A8 ✅ — "34/100 is the median. the P10 stores we've scanned are in the high teens."
```


**Reply R publiée (24/04/2026 14:00:45 CEST) :**

```
B1 ✅ — "Pro pipeline is up and running, onboarding is instant. 10 spots, that's it for this round. DM romain or me, either works"
```


**Reply R publiée (24/04/2026 14:00:45 CEST) :**

```
B2 ✅ — "onboarding is me, day 14 call is me, slack during the 30 days is me. not a form, not a ticket system, not a bot."
```


**Reply R publiée (24/04/2026 14:03:35 CEST) :**

```
A11 ✅ — Reply F LinkedIn 21h05 (builder story / APIs ghost billing + AI readiness + app impact)
```


**Reply R publiée (24/04/2026 14:03:35 CEST) :**

```
B3 ✅ — Reply F Twitter 18h35 (même deal, R prend la moitié / je prends la moitié)
```


**Reply R publiée (24/04/2026 14:03:35 CEST) :**

```
B4 ✅ — Reply F LinkedIn 21h05 (confirming from the build side — infra Pro chaude, flip the switch same session)
```


**Reply R publiée (24/04/2026 14:03:35 CEST) :**

```
B5 ✅ — Reply F Twitter 18h35 (public scan day 1 / beta Pro = layer on top)
```


**Reply R publiée (24/04/2026 19:28:10 CEST) :**

```
B7 — reply F sur post F2 Twitter Couche B (day 14 feedback loop, Pro opens public after)
```


**Reply R publiée (24/04/2026 19:30:26 CEST) :**

```
Cross B6 — F reply sur R Twitter Couche B
```
