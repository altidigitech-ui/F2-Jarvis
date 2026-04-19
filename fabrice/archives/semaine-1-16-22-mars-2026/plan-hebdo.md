# PLAN HEBDO F — Semaine du 16/03/2026 au 22/03/2026

**Rempli au batch :** 16/03/2026 (Jour J — lancement Leak Detector)
**Archivé le :** dimanche 22/03/2026
**Référence :** `fabrice/playbook-semaine.md` (process d'exécution)

---

## 1. POSTS TWITTER F — SEMAINE

| Jour | Type de post | Post prévu | Statut |
|------|-------------|-----------|--------|
| **Lundi 16/03** | Behind the build | Post de lancement : architecture LD, scoring pipeline, 8 catégories, Celery async | ✅ Publié 13h |
| **Mardi 17/03** | Hot take tech | "You don't need Kubernetes for your indie SaaS" — angle : ship first, scale later. Railway single deployment. | ✅ Publié 13h |
| **Mercredi 18/03** | Hot take tech | "Everyone thinks building an AI product is about the AI. It's not. 80% is plumbing." | ✅ Publié 13h |
| **Jeudi 19/03** | Stack decision | "Why I picked FastAPI over Django" — async native, Pydantic built-in, tradeoff no ORM, Supabase handles data layer. | ✅ Publié 13h |
| **Vendredi 20/03** | Build in public tech | "Week 1 of Leak Detector in the wild" — recap technique : ce qui a tenu, ce qui a cassé, ce qui a surpris. À rédiger vendredi avec les données réelles de la semaine. | ✅ Rédigé — à publier 13h |

Types utilisés cette semaine : Behind the build (40%), Hot take tech (30%), Bug story (20% — si notes dispo), Stack decision (10%). Conforme au mix Phase 1.

---

## 2. POSTS LINKEDIN F — SEMAINE

| Jour | Type de post | Sujet | Statut |
|------|-------------|-------|--------|
| **Lundi 16/03 (21h)** | Architecture deep dive | Post de lancement technique : comment LD audite une page en 60 secondes. Pipeline complète. 800-1300 car. | ✅ Publié 21h |
| **Jeudi 19/03 (21h)** | Stack decision argumentée | Adaptation du tweet stack decision → version LinkedIn développée. Tradeoffs FastAPI vs Django argumentés. | ✅ Publié 21h |

---

## 3. COLD OUTREACH — OBJECTIFS SEMAINE

| Donnée | Objectif |
|--------|----------|
| Outreachs/jour minimum | 2-3 |
| Produit(s) utilisé(s) cette semaine | Leak Detector |
| Cibles identifiées vendredi soir (Grok) | Pas de pré-identification (lancement #1). Grok en live chaque matin. |
| Focus particulier cette semaine | Devs et builders qui viennent de shipper (#buildinpublic, "just launched", "mvp is live"). Angle dev-to-dev. |

| Plateforme | Volume/jour | Détail |
|-----------|------------|--------|
| Twitter (canal #1) | 2-3 outreachs | Grok → LD → Claude → reply publique dev-to-dev |
| Reddit (rare) | 0-1 outreach | Uniquement si cible pertinente sur r/SaaS, r/webdev, r/Python |
| IH | Géré par R via @foundrytwo | F ne fait pas de cold IH |
| LinkedIn | PAS de cold | L'acquisition LinkedIn passe par l'engagement à valeur |

---

## 4. ENGAGEMENT — OBJECTIFS SEMAINE

| Plateforme | Action | Volume/jour |
|-----------|--------|------------|
| Twitter (canal #1) | Replies techniques + Likes | 2-3 replies, 0-1 QRT, 5-8 likes |
| LinkedIn (canal #2) | Commentaires de valeur techniques (15+ mots, zéro lien) | 1-2 commentaires |
| PH | Karma farming (upvotes + commentaires) | 2-3 min |

Comptes Tier techniques à cibler en priorité cette semaine :
- **Tier 1 :** @levelsio, @marclouvion, @simonhoiberg, @dannypostmaa — surveiller les posts techniques
- **Tier 2 :** @pbteja1998, @transitive_bs — indie hackers techniques actifs
- **Tier 3 :** Se construit au fil des interactions cette semaine

---

## 5. NOTES TECHNIQUES DE LA SEMAINE ÉCOULÉE (inputs pour le batch)

| Donnée | Valeur |
|--------|--------|
| Features shippées cette semaine | Lancement LD — produit complet (scoring pipeline, 8 catégories, PDF export, email reports, Stripe integration) |
| Bugs résolus (war stories) | À REMPLIR par F — premier bug production |
| Décisions d'architecture prises | FastAPI + Celery + Redis background jobs, Playwright headless browser, Claude API Sonnet (1 appel structuré, 8 catégories), JSON parsing 3 fallbacks, Supabase PostgreSQL, Next.js 14 frontend |
| Surprises en production | À REMPLIR par F au fil de la semaine |
| Cold outreachs builder réalisés | Première semaine — baseline |
| Taux de réponse cold | Première semaine — baseline |
| Meilleur post F semaine passée (Twitter) | Première semaine |
| Meilleur post F semaine passée (LinkedIn) | Première semaine |
| Sujets tendance techniques identifiés par Grok (publication) | À lancer cette semaine |

---

## 6. VISUELS À PRÉPARER

| Visuel | Pour quel post | Statut |
|--------|---------------|--------|
| Aucun visuel semaine 1 | Phase 1 = texte uniquement | — |

---

## 7. CROSS-ENGAGEMENT — REPLIES PRÉPARÉES AU BROUILLON

| Post R ou F2 du jour | Reply F prévue (brouillon, angle technique) |
|---------------------|---------------------------------------------|
| Lundi | F doit donner les posts R et F2 du jour → Claude rédige la reply angle technique |
| Mardi | Idem |
| Mercredi | Idem |
| Jeudi | Idem |
| Vendredi | Idem |

---

## 8. OBJECTIFS DE LA SEMAINE

| Objectif | Métrique visée |
|----------|---------------|
| Cross-engagement complété sur 100% des posts R et F2 | Chaque jour sans exception |
| 10+ cold outreachs builder cumulés | 2-3/jour × 5 jours |
| Installer le workflow Grok → LD → Claude → reply | Fluide d'ici vendredi |
| Le temps Twitter reste ≤ 30 min/jour | Non négociable |
| Publier 1 post LinkedIn (minimum) | Lundi soir 21h |

---

## 9. NOTES

Semaine de lancement #1. Tout est from scratch. Les premiers posts seront imparfaits — la voix technique se rode. L'engagement sera quasi-invisible (0 followers = 0 visibilité). Le cross-engagement pendant le CDI est un bonus, pas une obligation. Le batch prendra plus de temps que prévu. C'est normal et accepté.

---
---

# PLAN HEBDO F — SEMAINE 2 — 23/03/2026 au 29/03/2026

---

## POSTS TWITTER F — SEMAINE 2

| Jour | Type de post | Post prévu | Statut |
|------|-------------|-----------|--------|
| **Lundi 23/03** | Behind the build | JSON parsing : Claude retourne du JSON cassé 5% du temps, 3 stratégies de fallback | ⏳ À scheduler |
| **Mardi 24/03** | Hot take | "Your landing page doesn't need more traffic. It needs fewer leaks." Data 40+ audits. | ⏳ À scheduler |
| **Mercredi 25/03** | Story technique | Un dev a implémenté mon conseil timeout+retry en production le même jour | ⏳ À scheduler |
| **Jeudi 26/03** | Data post | 9 cold outreach, 3 conversations. Pattern : pires scores = meilleures réactions | ⏳ À scheduler |
| **Vendredi 27/03** | Build in public | Week 2 recap — à rédiger vendredi avec données réelles | ⏳ |

---

## POSTS LINKEDIN F — SEMAINE 2

| Jour | Type de post | Sujet | Statut |
|------|-------------|-------|--------|
| **Lundi 23/03 (21h)** | Behind the build long | JSON parsing deep dive — 3 stratégies fallback, 99%+ completion rate | ⏳ À scheduler |
| **Jeudi 26/03 (21h)** | Data post long | Cold outreach as product validation — 9 audits, pattern worst scores = best conversations | ⏳ À scheduler |
