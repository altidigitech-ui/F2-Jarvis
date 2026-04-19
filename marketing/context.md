# CONTEXT MARKETING — Source de vérité

**Dernière mise à jour : 04 avril 2026**

**Hérite de :** `context.md` (racine — source de vérité repo, architecture, rôles, règles transversales)
**Ce fichier contient :** structure corporate, pipeline SaaS, modèle funnel, rôles par compte, comptes, taglines, audience, stratégie d'acquisition cold outreach, règles opérationnelles, décisions stratégiques.

---

## 1. STRUCTURE CORPORATE — VISIBILITÉ PUBLIQUE

```
Altistone (Holding — personne morale)
└── Alti DigiTech (SASU — société opérationnelle, production digitale)
    └── FoundryTwo (Studio / marque publique — image de marque, storytelling)
        ├── Leak Detector (SaaS #0 — LIVE 16/03/2026, en mutation vers StoreMD)
        ├── StoreMD, ProfitPilot (Mois 1 — E-commerce)
        ├── ClientPulse, AdAudit (Mois 2 — Agences + E-com)
        └── CreatorSuite, LeadQuiz, Wildcard (Mois 3 — Creators + E-com)
```

| Entité | Rôle | Visibilité publique |
|--------|------|---------------------|
| Altistone | Holding, détient Alti DigiTech | Invisible — back-office uniquement |
| Alti DigiTech | SASU opérationnelle, domaines, contrats, facturation | Invisible — entité juridique uniquement |
| FoundryTwo | Studio public, image de marque, communauté, storytelling | **Visible** — toute communication passe par FoundryTwo |
| Leak Detector | Premier SaaS, en mutation vers StoreMD | **Visible** — produit avec sa propre identité |

**Règle fondamentale :** le public interagit avec FoundryTwo (le studio) et les produits. Il ne voit jamais Altistone ni Alti DigiTech. La propriété juridique reste invisible.

---

## 2. PIPELINE SaaS

| # | Produit | Vertical | Mois | Statut |
|---|---------|----------|------|--------|
| 0 | Leak Detector | (en mutation vers StoreMD) | Actif | LIVE 16/03/2026 (~8 signups, 0€ MRR) |
| 1 | StoreMD | E-commerce | Mois 1 (avril) | En développement |
| 2 | ProfitPilot | E-commerce | Mois 1 | Planifié |
| 3 | ClientPulse | Agences/Freelancers | Mois 2 (mai) | Planifié |
| 4 | AdAudit | Agences | Mois 2 | Planifié |
| 5 | CreatorSuite | Creators | Mois 3 (juin) | Planifié |
| 6 | LeadQuiz | E-com + Coaches | Mois 3 | Planifié |

**Cadence cible :** 2 SaaS/mois. F code avec Claude Code. R distribue sur Twitter/LinkedIn et gère les lancements IH/PH. Distribution terrain Reddit/Facebook gérée dans `../romain/reddit/`, `../romain/facebook/`, `../fabrice/reddit/`, `../fabrice/facebook/`.

**Détails produits** (features, pricing, concurrents, données marché) = voir `../produits/`. Ne JAMAIS dupliquer ici.

---

## 3. MODÈLE FUNNEL

R perso + F perso = **PORTES D'ENTRÉE** — engagement communautés e-com, agences, creators + insights basés sur les données terrain (530+ reviews concurrents, données Mastercard, threads Reddit — collectées via la distribution Reddit/Facebook). Les gens suivent R ou F parce qu'ils apportent de la valeur dans leurs replies. Transfert organique vers F2 via mentions naturelles (2-3x/semaine).

F2 = **HUB CENTRAL** — publication, build in public, milestones, annonces. Alimenté par le cross-engagement de R et F. NE fait PAS de cold outreach ni d'engagement proactif.

Ce fichier couvre le funnel Twitter/LinkedIn/IH/PH. Le funnel Reddit/Facebook est dans `../distribution/` + `../romain/{reddit,facebook}/` + `../fabrice/{reddit,facebook}/`.

---

## 4. RÔLES PAR COMPTE

| Compte | Cold outreach | Engagement proactif | Publication | Cross-engagement |
|--------|:---:|:---:|:---:|:---:|
| R perso | ✅ 10/jour, angle growth e-com & agences | ✅ 30 interactions/jour | ✅ 1 post/jour (7/sem) | ✅ Sur posts F et F2 |
| F perso | ✅ 10/jour, angle technique e-com & creators | ✅ 30 interactions/jour | ✅ 1 post/jour (5/sem) | ✅ Sur posts R et F2 |
| F2 studio | ❌ Jamais | ❌ Jamais | ✅ (squelette fixe 5j/semaine) | Reçoit de R et F |

---

## 5. COMPTES — INVENTAIRE COMPLET

### 5.1 Comptes studio

| Plateforme | Handle/URL | Statut | Rôle |
|------------|-----------|--------|------|
| Twitter/X | `@foundrytwo` | ✅ Actif | Hub — publie contenu studio, reçoit cross-engagement |
| Product Hunt | `@foundrytwo` | ✅ Actif | Launch day + farming |
| LinkedIn | `/company/foundrytwo` | ✅ Actif | Annonces, contenu B2B long terme |
| IndieHackers | `@foundrytwo` | ✅ Actif | Engagement organique |
| Reddit | `u/FoundryTwo` | ✅ Actif | Engagement organique |
| GitHub org | `FoundryTwo` | ✅ Actif | Namespace réservé |
| TikTok | `@foundrytwo` | ⏸️ Suspendu — date de reprise non définie | Reprend quand social proof et données réelles disponibles |

### 5.2 Comptes personnels

| Plateforme | Qui | Handle | Statut | Rôle |
|------------|-----|--------|--------|------|
| Twitter/X | F | `@FabGangi` | ✅ Actif | Engagement + cold outreach angle technique e-com & creators |
| Twitter/X | R | `@delgado_ro72224` | ✅ Actif | Engagement + cold outreach angle growth e-com & agences |
| LinkedIn | F | Fabrice Gangitano | ✅ Configuré | Posts technique + automatisation pour merchants et creators |
| LinkedIn | R | Romain Delgado | ✅ Configuré | Posts growth + conversion pour merchants et freelancers |
| Product Hunt | R | Profil PH personnel | ⏳ À créer | Karma farming + support launch day F2 (pas de publication) |
| Product Hunt | F | Profil PH personnel | ⏳ À créer | Karma farming + support launch day F2 (pas de publication) |

### 5.3 Comptes produits

| Plateforme | Produit | Handle | Statut |
|------------|---------|--------|--------|
| Twitter/X | Leak Detector | `@leakdetector` | ✅ Créé |
| LinkedIn | Leak Detector | Company page | ⏳ À créer |

Comptes produits pour les 6 SaaS à créer au fur et à mesure des lancements.

### 5.4 Compte corporate

| Plateforme | Handle | Statut |
|------------|--------|--------|
| LinkedIn | `/company/altidigitech` | ⏳ À créer |

### 5.5 Comptes Reddit/Facebook

Détails dans `../romain/reddit/`, `../romain/facebook/`, `../fabrice/reddit/`, `../fabrice/facebook/`.

---

## 6. TAGLINES

| Usage | Tagline |
|-------|---------|
| Primary | "We build what's next." |
| Secondary | "Two builders. One forge. SaaS after SaaS." |
| Hook promesse | "We build AI agents that work while you sleep." |

---

## 7. AUDIENCE STUDIO

| Segment | Intérêt | Où ils sont |
|---------|---------|-------------|
| Merchants Shopify (e-com) | Résoudre chargebacks, vitesse, conversion, listings | Twitter, LinkedIn, Reddit |
| Agences/Freelancers marketing | Reporting, ROI, workflow client, pricing | Twitter, LinkedIn, Reddit |
| Content Creators | Repurposing, editing, multi-plateforme, burnout | Twitter, LinkedIn, Reddit |
| Build in public community | Suivre le parcours, apprendre, inspiration | Twitter, IH, PH |

---

## 8. STRATÉGIE D'ACQUISITION — COLD VALUE OUTREACH

### 8.1 Principe

Le cold value outreach est la priorité #1. C'est la seule tactique à coût zéro qui convertit en quelques heures, pas en quelques semaines. Le branding, les posts, le contenu paieront dans 2-3 mois. Le cold outreach paie maintenant.

**Le process :** trouver des gens qui ont un PROBLÈME dans nos 3 verticals → partager un insight basé sur les données terrain (530+ reviews concurrents, données Mastercard, threads Reddit — collectées via la distribution Reddit/Facebook) → ils voient de la valeur immédiate → ils suivent R ou F → ils découvrent les produits FoundryTwo.

### 8.2 Planning quotidien

R et F sont full-time. Le cold outreach se fait aux heures optimales pour les algos Twitter/LinkedIn (voir algo.md de chaque plateforme). Minimum 10 cold outreach/jour par personne.

### 8.3 Process — par vertical

**E-commerce (R+F) :**
- Twitter : "shopify chargeback", "shopify slow store", "losing money shopify", "conversion rate shopify", "shopify app problems"
- LinkedIn : merchants Shopify, e-com founders, Shopify partners

**Agences/Freelancers (R lead) :**
- Twitter : "client reporting nightmare", "agency reporting tool", "prove ROI client", "freelance burnout"
- LinkedIn : digital marketing consultants, freelance marketers, agency owners

**Content Creators (F lead) :**
- Twitter : "youtube burnout", "repurpose content", "too many tools creator", "editing takes too long"
- LinkedIn : YouTubers, podcasters, content strategists

### 8.4 Templates de réponse

**Template E-com :**
```
Your store is probably losing $800/month to chargebacks — that's the Shopify average.
3 things I've seen work for stores your size:
→ [Insight 1 basé sur données terrain]
→ [Insight 2]
→ [Insight 3]
Working on a tool that automates this. Want early access?
```

**Template Agence :**
```
I talked to 50+ agency owners this month. The #1 pain: proving ROI to clients.
Most spend 15h/month building reports manually.
Here's what the top ones do differently:
→ [Insight terrain]
```

**Template Creator :**
```
Every creator I talk to says the same thing: editing one video takes 8 hours, but repurposing it to 5 platforms takes another 8.
What if that second part took 15 minutes?
→ [Insight technique]
```

**Suivi si pas de réponse après 24h (Twitter DM) :**
```
Hey — shared some insights on [vertical problem] yesterday.
Lmk if that was useful or if you have questions.
```

### 8.5 Règles absolues du cold outreach

1. **Zéro faux témoignage.** Les données sont vraies. Les insights sont basés sur la recherche terrain (distribution Reddit/Facebook).
2. **Toujours en réponse publique d'abord.** DM uniquement en suivi.
3. **UTM obligatoire sur chaque lien.** Format : `[produit].tech?utm_source=twitter&utm_medium=coldoutreach&utm_campaign=[vertical]`
4. **Ne jamais pitcher le prix dans le premier message.** La valeur d'abord, la conversion vient du produit.
5. **Répondre dans les 2 heures** à chaque personne qui répond à ton outreach. La réactivité est un facteur de conversion majeur.
6. **10 outreachs minimum par jour par personne.** Pas 5, pas 8. 10.

### 8.6 Suivi et métriques

Suivi dans le Growth Tracker (tracking/FoundryTwo-Growth-Tracker.xlsx) avec les colonnes : Date, Plateforme, Vertical, Cible, Lien du post/tweet, Réponse envoyée, Réaction, Signup, Client payant.

Revue chaque vendredi soir avec F : combien d'outreachs par vertical, combien de clics, combien de signups, combien de clients.

### 8.7 Objectifs chiffrés

**Semaine 1 post-warming (mi-mai) :**
- 70 outreachs/semaine (R+F)
- 30+ clics
- 15+ signups early access

**Fin juin :**
- 300+ outreachs cumulés
- Premières conversions payantes sur les SaaS live

### 8.8 Cold outreach = contenu

Chaque outreach est du matériel pour les posts. Après 50 conversations, contenu type :
```
We talked to 50+ Shopify merchants this month.
Average chargeback loss: $800/month.
71% of it is friendly fraud — not real fraud.
Most don't know.
We're building an AI agent to fix this.
```

C'est du vrai contenu basé sur de vraies données terrain (Reddit/Facebook). Bien plus puissant que du teasing vague.

---

## 9. RÈGLES OPÉRATIONNELLES

### 9.1 Langue

Toute communication publique en anglais. Marché cible : US/EU/international.

### 9.2 Batch content

- Vendredi soir : réunion F+R, review de la semaine, préparation contenu semaine suivante
- Samedi : finalisation des posts. R rédige R+F2. F rédige F. Parallèle.
- En semaine : copy-paste et publication uniquement

### 9.3 Horaires de publication (CET)

7h30 / 8h00 / 8h15 / 13h30 / 17h / 18h-19h

### 9.4 Amplification croisée

Engagement F+R dans les 30 minutes après chaque post F2. Like, reply, retweet. Systématique, pas optionnel.

### 9.5 UTM obligatoire

Chaque lien publié est tagué UTM. Analyse chaque vendredi. Données dans tracking/utm/ par produit.

### 9.6 Dimanche = rythme réduit

Publication et engagement maintenus mais à rythme allégé. Pas de jour off tant que la communauté n'est pas établie.

---

## 10. DOCUMENTS DE RÉFÉRENCE

| Document | Contenu | Emplacement dans le repo |
|----------|---------|--------------------------|
| FOUNDRYTWO-BRAND-BIBLE.md | Identité de marque, palette, typo, logo, personnages, storytelling, bios, rules | asset-brand/ |
| FOUNDRYTWO-LOGO-GUIDELINES.md | Règles logo, déclinaisons, inventaire assets | asset-brand/ |
| LA-TOILE-v3.1-Complete.docx | Coordination stratégique complète | la-toile/ |
| TOILE-ASSOCIÉS.md | Rôles F+R, modèle usine, flux de revenus | la-toile/ |
| toile-schema-v3.1.png | Schéma visuel de La Toile | la-toile/ |
| FoundryTwo-Growth-Tracker.xlsx | Suivi cold outreach et métriques | tracking/ |
| UTM-Tracking-FoundryTwo.xlsx | Liens UTM par produit | tracking/utm/ |
| `produits/` | **Source de vérité produits** (features, pricing, concurrents, données marché) | Racine du repo |
| `distribution/` + `romain/{reddit,facebook}/` + `fabrice/{reddit,facebook}/` | Distribution terrain Reddit/Facebook | Racine du repo |

---

## 11. DÉCISIONS STRATÉGIQUES PRISES

| Date | Décision | Rationale |
|------|----------|-----------|
| 10/02/2026 | Nom "FoundryTwo" choisi | Terrain vierge (0 résultat Google/socials), évoque forge/création, "Two" = le duo, pro et mémorable |
| 10/02/2026 | Personal branding au service du studio | F perso et R perso publient du contenu qui amplifie le studio. Les individus sont visibles mais le studio reste la marque principale |
| 10/02/2026 | Ton "Mailchimp pas WoW" | Pro d'abord, identité mémorable, storytelling de fond pas de premier plan |
| 10/02/2026 | Full anglais | Marché cible international (US/EU) |
| 13/02/2026 | Domaine foundrytwo.com acheté | Namespace sécurisé, email professionnel, futur hub studio |
| 13/02/2026 | Email forwarding (pas mailbox) | Suffisant pour les vérifications, pas de newsletter studio prévue pour l'instant |
| 13/02/2026 | Alti DigiTech = back-office, FoundryTwo = front-office | Le public ne voit que la marque, pas l'entité juridique |
| 14/02/2026 | Parcours non-conventionnel = montré, pas dit | Jamais dans les bios. Se révèle dans le contenu au fil du temps |
| 16/02/2026 | Repos séparés : marketing (studio) + /marketing/ dans chaque SaaS | Le repo studio est le socle, chaque produit porte son propre marketing adapté |
| 25/02/2026 | Cold outreach = priorité #1 d'acquisition | Seule tactique à coût zéro qui convertit en heures. Le branding paie dans 2-3 mois, le cold outreach paie maintenant |
| 25/02/2026 | TikTok suspendu | Zéro abonnés = zéro impact. Le temps libéré va dans le cold outreach. Reprend quand social proof disponible |
| 01/03/2026 | Bio Twitter v3 validée | Voir Brand Bible section 7.1 — transparence, authenticité, format évolutif avec revenue |
| 01/03/2026 | Brand Bible v2.0 et Logo Guidelines v1.0 validés | Documents de référence consolidés dans le nouveau repo FoundryTwo |
| 03/04/2026 | Pivot distribution-first | LD = ~8 signups, 0€ MRR après 3 semaines. Cible dev = mauvaise. Pivot vers non-dev (e-com, agences, creators). |
| 03/04/2026 | 6 SaaS définis | StoreMD, ProfitPilot, ClientPulse, AdAudit, CreatorSuite, LeadQuiz |
| 03/04/2026 | 3 verticals non-dev | E-commerce Shopify, Agences/Freelancers marketing, Content Creators |
| 03/04/2026 | Cadence 2 SaaS/mois | Avec Claude Code, la complexité technique est un moat, pas un frein |
| 04/04/2026 | Full-time R + F | Les deux au chômage = 100% dédiés FoundryTwo |
| 04/04/2026 | Chacun rédige son contenu | R rédige R+F2. F rédige F. "R rédige TOUT" supprimé. |
| 04/04/2026 | Volumes non-négociables | 30 interactions/jour, 10 cold outreach/jour, 1 post/jour par personne |
| 19/04/2026 | Repo unifié | Brand building (Twitter/LinkedIn/IH/PH) + distribution terrain (Reddit/Facebook) + produits dans un seul repo. |
