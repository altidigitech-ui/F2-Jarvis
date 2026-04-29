# La Toile FoundryTwo

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Schéma global de l'écosystème
> Hérite de : `../marketing/strategie.md` + `../marketing/objectifs.md`

---

## 1. Le concept — toile d'araignée

Une toile d'araignée a un centre, des fils qui rayonnent depuis le centre, et une règle : peu importe où l'insecte se pose, **un fil le ramène vers le centre**. Aucun cul-de-sac. Aucun fil orphelin. Les fils se renforcent mutuellement — quand on en touche un, la toile entière vibre.

La Toile FoundryTwo applique exactement ce principe au marketing StoreMD :

- **Le centre public** : `storemd.vercel.app` — le site du produit. C'est où on veut que tout prospect arrive.
- **Le centre interne** : le dashboard admin StoreMD (`/dashboard/admin`) — c'est où on voit, en temps réel, qui est arrivé au centre, par quel fil, et qui a converti.
- **Les nœuds périphériques** : les comptes (TikTok produit, Instagram produit, Facebook produit, comptes perso F+R, comptes façade LinkedIn/Twitter, communautés Reddit, groupes FB Shopify).
- **Les fils** : chaque chemin concret par lequel un merchant peut entrer dans la toile et arriver au centre. **Chaque fil porte un UTM tagué** (depuis `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`) qui permet au dashboard admin de savoir par où le merchant est arrivé.

**Règle non-négociable** : aucun fil cassé. Compte inactif = trou dans la toile. Lien sans UTM = trou dans la toile. Bio sans lien vers le site = trou dans la toile. Post produit qui ne tisse pas vers les autres comptes = fil orphelin. Tout ce qui rompt la connexion entre un nœud et le centre = prospects perdus.

---

## 2. Le centre

### 2.1 Centre public — `storemd.vercel.app`

Tous les fils convergent ici. C'est la page que voit le merchant après avoir cliqué un lien depuis n'importe quel nœud.

Une fois le merchant sur le site, le tracker JS capture l'UTM de l'URL et le pousse à `/tracking/pageview`. Si le merchant install, l'UTM est copié dans `merchants.utm_*` au callback OAuth.

### 2.2 Centre interne — Dashboard admin StoreMD

URL : `https://storemd.vercel.app/dashboard/admin` (visible uniquement par altidigitech@gmail.com).

C'est là qu'on voit la toile **fonctionner en temps réel** :
- Quel fil amène le plus de visites (Traffic by Source)
- Quel fil amène le plus d'installs (Traffic by Campaign)
- Quel funnel : landing visits → cta clicks → install starts → install completes → **paid conversions**
- Quels merchants ont signé, par quel UTM source

JARVIS lit ces données pour le rapport hebdo vendredi. F+R décident quels fils renforcer, quels fils couper.

---

## 3. Les nœuds périphériques

### 3.1 Compte produit `@storemd` — vente directe

| Plateforme | Rôle dans la toile | Cible |
|---|---|---|
| TikTok `@storemd` | Acquisition principale, vidéos quotidiennes | Merchants Shopify scrollent |
| Instagram `@storemd` | Recyclage TikTok + visuel | Merchants Shopify |
| Facebook page `@storemd` | Recyclage + page de référence | Merchants Shopify + groupes FB |

**Pas de personal branding ici.** F et R sont invisibles. On vend l'app.

### 3.2 Comptes façade fondateurs — Twitter + LinkedIn

| Compte | Plateforme | Image |
|---|---|---|
| F (Fabrice Gangitano) | LinkedIn FR + Twitter EN (`@FabGangi`) | Le builder |
| R (Romain Delgado) | LinkedIn FR + Twitter EN (`@delgado_ro72224`) | Le growth marketeur |

**Capacités réelles** : F et R ont les mêmes capacités techniques. La façade builder/growth est une image publique sur LinkedIn/Twitter, pas une vraie séparation.

### 3.3 Comptes engagement perso — Reddit + groupes Facebook Shopify

F et R utilisent leurs comptes perso pour engager dans :
- Subreddits : r/shopify, r/ecommerce, r/entrepreneur, r/smallbusiness
- Groupes Facebook Shopify merchants

**Action** : on répond aux merchants qui décrivent un problème StoreMD résout. Lien UTM tagué quand pertinent. JARVIS aide à proposer la réponse.

### 3.4 Compte F2 / FoundryTwo — vitrine minimale

`@foundrytwo` (Twitter EN, LinkedIn Company, IH, PH) — minimal hors launch days. Pas de personal branding studio. Sert essentiellement aux launches IH/PH ponctuels.

### 3.5 Comptes corporate — statiques

Alti DigiTech LinkedIn Company : vitrine corporate, pas de contenu créé.

---

## 4. Les fils — chaque chemin concret vers le centre

Chaque fil = un point d'entrée pour le merchant + une trajectoire dans la toile + un UTM tagué qui remonte au dashboard admin.

Tous les liens UTM sont issus de `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`. Ne pas inventer.

### 4.1 Fils Compte produit (acquisition vente directe)

| # | Point d'entrée | Trajectoire | UTM tagué |
|---|---|---|---|
| F1 | Vidéo TikTok `@storemd` | Vidéo → caption avec lien → site | `utm_source=tiktok&utm_medium=organic&utm_campaign=video&utm_content=video_cta` |
| F2 | Bio TikTok `@storemd` | Profil → bio → site | `utm_source=tiktok&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| F3 | Reels Instagram `@storemd` | Reels → caption → site | `utm_source=instagram&utm_medium=organic&utm_campaign=reels&utm_content=caption_cta` |
| F4 | Story Instagram `@storemd` | Story → sticker link → site | `utm_source=instagram&utm_medium=organic&utm_campaign=story&utm_content=story_sticker` |
| F5 | Bio Instagram `@storemd` | Profil → link-in-bio → site | `utm_source=instagram&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| F6 | Post Facebook page `@storemd` | Post → CTA lien → site | `utm_source=facebook&utm_medium=organic&utm_campaign=post&utm_content=post_cta` |
| F7 | Page about Facebook `@storemd` | Page → about → lien → site | `utm_source=facebook&utm_medium=bio&utm_campaign=page&utm_content=about_link` |

### 4.2 Fils engagement communauté (Reddit + groupes FB Shopify, comptes perso F+R)

| # | Point d'entrée | Trajectoire | UTM tagué |
|---|---|---|---|
| F8 | Comment dans groupe Facebook Shopify merchants | Comment perso F ou R → lien dans réponse → site | `utm_source=facebook&utm_medium=organic&utm_campaign=group_shopify&utm_content=group_post` |
| F9 | Comment dans groupe Facebook ecommerce | Idem F8 sur groupe ecommerce | `utm_source=facebook&utm_medium=organic&utm_campaign=group_ecommerce&utm_content=group_post` |
| F10 | Post dans r/shopify | Post perso F ou R sur problème + solution → site | `utm_source=reddit&utm_medium=organic&utm_campaign=r_shopify&utm_content=post` |
| F11 | Commentaire dans r/shopify | Comment sur thread d'un merchant → mention solution → lien → site | `utm_source=reddit&utm_medium=organic&utm_campaign=r_shopify&utm_content=comment` |
| F12 | Post dans r/ecommerce | Idem F10 pour r/ecommerce | `utm_source=reddit&utm_medium=organic&utm_campaign=r_ecommerce&utm_content=post` |
| F13 | Commentaire dans r/ecommerce | Idem F11 pour r/ecommerce | `utm_source=reddit&utm_medium=organic&utm_campaign=r_ecommerce&utm_content=comment` |
| F14 | Post dans r/entrepreneur | Idem F10 pour r/entrepreneur | `utm_source=reddit&utm_medium=organic&utm_campaign=r_entrepreneur&utm_content=post` |
| F15 | Commentaire dans r/entrepreneur | Idem F11 pour r/entrepreneur | `utm_source=reddit&utm_medium=organic&utm_campaign=r_entrepreneur&utm_content=comment` |

### 4.3 Fils façade fondateurs (Twitter + LinkedIn)

| # | Point d'entrée | Trajectoire | UTM tagué |
|---|---|---|---|
| F16 | Post organique Twitter F ou R | Post sans lien → reply de l'auteur avec lien (format 2-blocs) → site | `utm_source=twitter&utm_medium=organic&utm_campaign=reply&utm_content=reply_cta` |
| F17 | Bio Twitter F ou R | Profil → bio → site | `utm_source=twitter&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| F18 | Thread Twitter F ou R | Thread → CTA dans dernier tweet (format 2-blocs) → site | `utm_source=twitter&utm_medium=organic&utm_campaign=thread&utm_content=thread_cta` |
| F19 | Post LinkedIn F ou R | Post avec lien dans corps → site | `utm_source=linkedin&utm_medium=organic&utm_campaign=post&utm_content=cta_post` |
| F20 | Commentaire LinkedIn (sur post d'un merchant ou thread) | Comment avec lien → site | `utm_source=linkedin&utm_medium=organic&utm_campaign=comment&utm_content=comment_cta` |
| F21 | Bio LinkedIn F ou R (Featured link) | Profil → featured link → site | `utm_source=linkedin&utm_medium=bio&utm_campaign=profile&utm_content=featured` |
| F22 | DM LinkedIn outreach | DM 1-to-1 ciblé → lien → site | `utm_source=linkedin&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |
| F23 | Article LinkedIn (publication longue) | Article → CTA en fin → site | `utm_source=linkedin&utm_medium=organic&utm_campaign=article&utm_content=article_cta` |

### 4.4 Fils cold outreach scan boutique (le levier le plus convertissant)

| # | Point d'entrée | Trajectoire | UTM tagué |
|---|---|---|---|
| F24 | Cold email merchant outreach | Email avec scan + résultats → CTA lien → site | `utm_source=email&utm_medium=cold&utm_campaign=merchant_outreach&utm_content=cta_main` |
| F25 | DM Instagram à un merchant identifié | Scan + résultats partagés → lien → site | `utm_source=instagram&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |
| F26 | DM Twitter à un merchant identifié | Scan + résultats partagés → lien → site | `utm_source=twitter&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |
| F27 | Comment public sur post merchant avec problème | Comment avec mention de la solution + lien → site | Selon plateforme — voir F11/F13/F15 (Reddit) ou F20 (LinkedIn) |

**Note** : si un placement n'est pas listé dans `UTM_TRACKING_LINKS.md`, F l'ajoute d'abord au fichier officiel, puis on utilise. Pas d'invention de UTM en dehors.

### 4.5 Fils launch days (ponctuels)

| # | Point d'entrée | Trajectoire | UTM tagué |
|---|---|---|---|
| F28 | Page Product Hunt jour de lancement | Listing PH → site | `utm_source=producthunt&utm_medium=referral&utm_campaign=launch_day&utm_content=ph_listing` |
| F29 | Maker comment Product Hunt | First comment maker (avec lien) → site | `utm_source=producthunt&utm_medium=referral&utm_campaign=launch_day&utm_content=ph_maker_comment` |
| F30 | Post Show IndieHackers | Post de lancement IH → CTA → site | `utm_source=indiehackers&utm_medium=organic&utm_campaign=post&utm_content=post_cta` |

### 4.6 Fils annexes

| # | Point d'entrée | Trajectoire | UTM tagué |
|---|---|---|---|
| F31 | Signature email founder F ou R | Email pro → signature → site | `utm_source=signature&utm_medium=email&utm_campaign=founder_signature&utm_content=signature_link` |
| F32 | Newsletter (si activée plus tard) | Newsletter → header CTA → site | `utm_source=email&utm_medium=newsletter&utm_campaign=weekly_digest&utm_content=header_cta` |
| F33 | QR code event/sticker | Scan QR → site | `utm_source=qrcode&utm_medium=offline&utm_campaign=event_meetup&utm_content=qr_flyer` |

---

## 5. Les fils internes — comment les nœuds se renforcent entre eux

Une toile d'araignée tient parce que les fils sont reliés entre eux, pas seulement au centre. Pareil ici. Les nœuds se renforcent mutuellement :

| Fil interne | Effet |
|---|---|
| F engage chaque post de R sur Twitter < 30 min, et vice versa | L'algo Twitter détecte une conversation engagée par l'auteur (signal × 150). Boost de visibilité pour les deux. |
| F engage chaque post LinkedIn de R, et vice versa | Idem LinkedIn — golden hour (60 premières minutes critiques). |
| Bio Twitter F → mention de @foundrytwo et lien storemd | Le visiteur du profil F découvre le studio + le produit |
| Bio LinkedIn F+R → Featured link vers storemd.vercel.app | Idem LinkedIn |
| Bio TikTok `@storemd` → mention F2 / lien éventuel | Reverse : le visiteur du compte produit voit qu'il y a un studio derrière |
| Vidéo TikTok recyclée → Instagram Reels → Facebook page (même jour) | Une seule production, trois canaux. Économie d'effort. |
| Comment perso F sur thread Reddit qui mentionne discrètement Romain ou foundrytwo | Cross-référence subtile, jamais spammeuse |
| Posts façade fondateurs qui mentionnent le produit (sans pitcher) | Le merchant qui suit F ou R pour leur expertise apprend que StoreMD existe |
| Page Facebook `@storemd` qui partage occasionnellement les posts F2 | Renforce la cohérence brand |

**Règle** : aucun nœud isolé. Chaque profil contient au minimum un lien vers le centre (storemd.vercel.app) ou vers un autre nœud de la toile (qui mène lui-même au centre).

---

## 6. JARVIS — la veille permanente de la toile

JARVIS observe tous les fils en continu. C'est le système nerveux de la toile.

| Fonction | Effet sur la toile |
|---|---|
| **Scribe** (35 patterns auto) | Log chaque action sur chaque fil : cold outreach envoyé, comment Reddit posté, vidéo publiée, DM reçu, etc. |
| **Mémoire (MemPalace)** | Archive verbatim toutes les conversations qui se déroulent sur les fils. Wings : romain, fabrice, storemd, marketing, etc. |
| **Conscience de fond (Ouroboros)** | Détecte les fils morts (compte inactif, lien cassé, UTM oublié), les fils qui se contredisent, les opportunités non exploitées. Propose des actions hebdo à reviewer. |
| **Générateur de batch hebdo** | Le dimanche, à partir des inputs F+R du brainstorm + ses logs : génère scripts vidéo, posts, cold outreach pour la semaine. |
| **Aide opérationnelle** | Propose réponses commentaires (validées par F ou R), suggère messages cold outreach contextualisés, fournit liens UTM exacts depuis le fichier officiel à la demande. |

**URL** : `https://f2-jarvis.vercel.app` — accès email + flag `f2_authorized`. Personas : Romain (vert) ou Fabrice (violet). Référence complète : `../JARVIS.md`.

---

## 7. La règle d'or — zéro fil cassé

| Symptôme | Conséquence | Action |
|---|---|---|
| Compte inactif (pas de post depuis 2 sem) | Trou dans la toile | Le réactiver ou le retirer du schéma |
| Bio sans lien vers le centre | Trou dans la toile | Ajouter le lien UTM correspondant |
| Lien posté sans UTM | Visite non trackée, perdue dans le funnel | Toujours utiliser le lien UTM exact depuis `UTM_TRACKING_LINKS.md` |
| Post produit qui ne mentionne pas l'app ou le centre | Fil orphelin | Tout post produit doit avoir un CTA vers le centre |
| Comment d'engagement sans valeur ajoutée | Fil parasite (l'algo le pénalise) | Engager seulement quand on apporte quelque chose |
| Cross-engage F↔R oublié | L'algo voit un post solo, signal faible | Cross-engage < 30 min systématique sur Twitter/LinkedIn |
| Source UTM avec 0 visits 4 sem | Fil mort, gaspille du temps | L'abandonner (cf. `objectifs.md` §8) |
| Couche A et Couche B se cannibalisent | Les fils se contredisent | Réduire l'intensité de la couche non-prioritaire |

---

## 8. Structure corporate (invariant — invisible publiquement)

```
Altistone (Holding — invisible publiquement)
└── Alti DigiTech SASU (entité opérationnelle, encaissement, facturation)
    └── FoundryTwo (marque publique, studio, identité visuelle)
        ├── StoreMD (✅ Code complet, en attente acceptation Shopify App Store)
        ├── ProfitPilot (Code en cours, soumission Shopify en parallèle)
        ├── ClientPulse, AdAudit (M2 — mai 2026, agences/freelancers)
        └── CreatorSuite, LeadQuiz, Wildcard (M3 — juin 2026, creators/coachs)
```

Le client interagit avec le produit ou avec les comptes fondateurs F/R. Il ne voit jamais Altistone ni Alti DigiTech.

---

## 9. Modèle usine — chaîne de production

Pendant que F code le produit suivant, R lance le produit actuel. Cycles parallèles. F+R = mêmes capacités techniques, répartition pratique.

```
Avril 2026  : F code finitions StoreMD       | R lance @storemd (TikTok/Insta/FB, beta, vidéos)
Mai 2026    : F code ClientPulse/AdAudit     | R lance ProfitPilot + continue StoreMD
Juin 2026   : F code CreatorSuite/LeadQuiz   | R lance ClientPulse/AdAudit
Juillet+    : F code BIG SaaS / Wildcard     | R lance CreatorSuite/LeadQuiz/Wildcard
```

Cycle hebdo (cf. `../marketing/strategie.md` §6) : vendredi/samedi brainstorm + dimanche batch JARVIS + lundi-samedi exécution + dimanche repos.

---

## 10. Pipeline produits 2026

Source de vérité : `../produits/MUTATIONS.md` + `../produits/NOUVEAUX.md`.

| # | Produit | Vertical | Cible | Lancement | Adaptation toile |
|---|---|---|---|---|---|
| 1 | **StoreMD** | E-commerce | Merchants Shopify | En attente acceptation Shopify | Toile actuelle (F1-F33) |
| 2 | **ProfitPilot** | E-commerce | Merchants Shopify | Soumission Shopify en parallèle (~3 sem) | Mêmes fils que StoreMD, compte produit dédié |
| 3 | ClientPulse | Agences/freelancers marketing | Marketing freelancers, agences | Mai 2026 | À adapter au lancement (canaux à confirmer) |
| 4 | AdAudit | Agences marketing + merchants D2C | Agences, freelance growth | Mai 2026 | À adapter au lancement |
| 5 | CreatorSuite | Creators | YouTubers, podcasters, content creators | Juin 2026 | À adapter au lancement |
| 6 | LeadQuiz | E-com + coachs | Merchants Shopify + coachs/infopreneurs | Juin 2026 | À adapter au lancement |
| 7 | Wildcard | Creators (à définir) | Communauté creators | Juin 2026 | À adapter au lancement |

**Cohérence canal** : tous les SaaS post-StoreMD ciblent des audiences présentes sur TikTok/Insta/Facebook. Le playbook reste le même : compte produit, fils tagués UTM, dashboard admin.

**Pas de stratégie marketing détaillée par SaaS futur avant son lancement.** Pas de teasing prématuré.

---

## 11. Cohérence stratégie — règles non-négociables

1. **Compte produit ≠ compte perso.** TikTok/Insta/FB = `@storemd` (pas de F, pas de R en avant). LinkedIn/Twitter = comptes F+R (façade builder/growth). Reddit/groupes FB = comptes perso F+R.
2. **Tout fil porte un UTM tagué**, sans exception, depuis `UTM_TRACKING_LINKS.md`.
3. **Tracking centralisé** : dashboard admin StoreMD = source de vérité conversions. Stats natives plateformes = source de vérité reach/engagement.
4. **Cold outreach ciblé uniquement** (boutique identifiée + problème réel + résultats concrets). Jamais à l'aveugle.
5. **JARVIS log tout.** Pas de tracking parallèle dans des Sheets ou Notion.
6. **Le payeur passe avant le beta.** Si Couche B cannibalise Couche A, on coupe Couche B.
7. **Acceptation Shopify > MRR > 10 betas** dans cet ordre.
8. **Stratégie adaptative chaque semaine.** Pas de plan figé sur 6 mois. Brainstorm vendredi/samedi → décisions.
9. **Zéro fil cassé.** Compte inactif, lien sans UTM, bio orpheline = à corriger immédiatement.

---

## 12. Documents liés

- `../marketing/strategie.md` — la stratégie qui produit ce schéma
- `../marketing/objectifs.md` — KPIs, jalons, seuils de pivot
- `../marketing/canaux/*.md` — détail opérationnel par canal (algo, cadence, format)
- `../marketing/contenu/pipeline-video.md` — production vidéo
- `../marketing/jarvis/*.md` — utilisation JARVIS au quotidien
- `../JARVIS.md` — manuel d'utilisation JARVIS complet
- `../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — **source de vérité UTM (officiel)** — TOUS les liens viennent de là
- `../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — système couche A + couche B
- `../produits/MUTATIONS.md` + `../produits/NOUVEAUX.md` — specs produits du pipeline
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin` (altidigitech@gmail.com)
- JARVIS : `https://f2-jarvis.vercel.app`
