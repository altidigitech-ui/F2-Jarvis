# STRATÉGIE MID-S6 — Pivot Beta Testers + Cold Scan Actif

**Période d'application :** mercredi 22/04/2026 → vendredi 24/04/2026 (3 jours)
**Créé le :** mardi 21/04/2026
**Statut :** en validation R
**Ne remplace pas :** le batch S6 existant (posts lun 20/04 et mar 21/04 déjà publiés / en cours)
**S'ajoute / modifie :** les posts mer-jeu-ven S6 + les posts F2 IH mercredi + LinkedIn F2 (si encore à publier)

---

## 1. POURQUOI CE PIVOT MAINTENANT

### 1.1 Constat mi-S6

La bascule S5 → S6 en **sales agressif claim + social proof** (batch original BATCH-SEMAINE-6.md) repose sur une mécanique narrative : **montrer ce que StoreMD détecte sur les stores qu'on présente comme "scannés"**, avec stats agrégées pour pousser vers `https://storemd.vercel.app/`.

Le problème : cette mécanique produit du contenu one-way (nous → merchants) qui convertit difficilement en conversation active. Les posts lundi 20/04 et mardi 21/04 génèrent de l'engagement de vanité (likes, impressions) mais peu de DMs entrants, peu de URLs merchants à scanner, peu de conversations agency-ready.

On a un funnel théorique. On n'a pas de **pipeline de conversations actives**.

### 1.2 Décision

Le mode sales agressif reste **exactement le même** en intention : on veut vendre, on pousse fort, on force la conversation, on ne s'excuse pas. Ce qui change c'est le **mécanisme de conversion** : on ajoute une porte d'entrée haute-intensité en plus des stats agrégées.

Sur les 3 jours restants (mer-ven), on superpose une **couche acquisition directe agressive** qui exploite la même énergie sales mode via 3 leviers :
- On demande explicitement des URLs merchants à scanner (pas de "maybe DM me", c'est "DM me your URL now")
- On ouvre **10 accès Pro beta** à des merchants réels — quota serré, urgence réelle, sélection aggressive
- On choisit proactivement des boutiques Shopify et on envoie les rapports en DM non-sollicité (pure push sales)

Le batch sales principal reste actif en parallèle (posts F samedi-dimanche + replies cold F Twitter + cold LinkedIn). La couche beta ajoute un canal conversion mid-funnel avec la même agressivité.

### 1.3 Pourquoi le mécanisme beta renforce le sales mode

| Aspect sales mode | Batch principal (stats agrégées) | Couche beta (acquisition directe) |
|---|---|---|
| Agressivité | Claims chiffrés, ton tranchant | Quota serré, cold scan non-sollicité, deadline implicite |
| Direction conversation | Asymétrique (nous → audience) | Bidirectionnelle forcée (DM inbound + push outbound) |
| Proof | Chiffres agrégés, crédibles à l'échelle | Rapports personnalisés, preuve par la démo individuelle |
| Prospect | Passif (consomme le contenu) | Activé (demande le tool ou reçoit un scan surprise) |
| Pipeline | Opaque (vanity metrics) | Mesurable (N URLs → N scans → N conversations) |
| Closing | Différé (on attend le signup) | Immédiat (beta Pro = onboarding day 0) |

Les deux couches exécutent la même stratégie "sales agressif sans excuses". Le batch principal attaque l'attention, la couche beta attaque la conversion. Même ADN, deux angles de fire.

---

## 2. LES 5 MÉCANIQUES DE LA COUCHE BETA

### 2.1 Recrutement beta testers — accès Pro ouverts

**Principe :** on ouvre **10 accès beta gratuits** à la version Pro de StoreMD. Les bénéficiaires testent le tool à pleine puissance sur leur vraie boutique Shopify pendant une période définie, en échange de feedback direct.

**Quota :** 10 places pour S6. Révisable à la hausse en S7 selon la traction.

**Offre :** accès complet features Pro (au-delà du scan public gratuit) sur leur vraie boutique. Durée à déterminer avec F côté produit — suggestion : 30 jours Pro, avec option de passer en payant ensuite.

**Canal d'acquisition :**
- Post Twitter direct qui annonce l'ouverture (R + F + F2)
- Post LinkedIn parallèle
- Cold DM ciblé sur agencies et merchants Shopify identifiés
- Call-to-action : "DM me your Shopify store URL to claim one of 10 Pro beta spots"

**Critère de sélection :** premier arrivé, premier servi jusqu'à 10. Si le volume de demandes dépasse 10 → liste d'attente + message transparent "on ouvre plus de spots en S7".

**Pourquoi ça convertit :**
- Urgence réelle (10 places, pas 1000) sans fake scarcity
- Valeur tangible (accès Pro, pas juste "try our free tool")
- Qualification naturelle : un merchant qui DM son URL pour claim un spot est acheteur beaucoup plus chaud qu'un scroll-liker
- Input direct pour le produit (feedback béta = itération rapide)

### 2.2 Analyses gratuites sur demande

**Principe :** sur chaque post de la couche beta, un CTA secondaire "DM me your URL or comment below, I'll scan it and send the full report back within 24h."

**Différence avec la mécanique 2.1 :** pas de quota, pas d'accès Pro. Juste le scan public + rapport commenté par R/F.

**Volume cible :** 5-15 scans reçus mer-ven. Réalisable manuellement par R ou F.

**Pourquoi on garde ça en parallèle du beta :**
- Beaucoup de merchants ne veulent pas "se lancer" dans un beta = engagement trop fort pour un premier contact
- Un scan gratuit avec rapport retour = engagement léger, R/F créent la conversation
- Pipeline d'upsell naturel : scan gratuit → propose accès beta Pro ensuite

### 2.3 Cold scan proactif — on analyse sans qu'ils demandent

**Principe :** R et F choisissent chacun manuellement **5 boutiques Shopify par jour** sur 3 jours, les scannent avec StoreMD, et envoient le rapport en DM directement au merchant (Twitter, LinkedIn, ou email depuis le site de la boutique).

**Volume cible :** 5 scans × 2 personnes × 3 jours = **30 cold scans** envoyés mer-ven.

**Message d'accompagnement type (à personnaliser à chaque envoi, pas templater identique) :**
> "Hey [name], saw your Shopify store. Ran a quick 60s scan — found [X] ghost billing apps + [Y] leak patterns. Attached the full report. No pitch, I'm just sending these to a handful of stores this week. If you want the fix list or to discuss what showed up, ping me."

**Pourquoi ça fonctionne :**
- Valeur apportée avant demande → réciprocité Cialdini
- Preuve que le tool existe et fonctionne → bypass du "vaporware" risk
- Ouvre la conversation sur un terrain technique factuel (leur store réel, pas un pitch générique)
- Qualifie instantanément le prospect (ceux qui répondent sont intéressés, les autres sortent du pipe)

**Contrainte éthique/BIBLE §3 v2.1 :**
- Les chiffres envoyés dans le DM sont **les vrais chiffres du scan réel** — pas de canon §17 fictif, pas d'inflation.
- Si un scan remonte "0 ghost billing" sur ce store → on l'écrit tel quel, on ne ment pas au merchant.
- Le rapport envoyé doit matcher le produit réel (vérifiable sur vercel.app).

### 2.4 Test en Pro sur boutique ciblée — démo de valeur

**Principe :** pour **2-3 boutiques choisies** (les plus grosses/les plus stratégiques du cold scan), on pousse plus loin : on active l'accès Pro temporairement, on lance un scan **complet Pro** (tous modules, analyse profonde), et on envoie un rapport Pro-grade au merchant.

**Différence avec 2.3 :** le scan public gratuit fait remonter les patterns basiques. Le scan Pro va plus loin (analyse concurrence, benchmarking vertical, recommandations de fix priorisées par ROI).

**Volume cible :** 3 scans Pro sur 3 jours (1 par jour R ou F à tour de rôle).

**Critère de sélection** : store avec revenue apparent $50k+/mo, ou agency managing multiple stores, ou merchant avec présence publique (Twitter/LinkedIn actif = relais potentiel).

**Usage dual :**
1. Conversion directe : le merchant voit la valeur Pro, devient client ou beta testeur
2. Content backup : avec accord du merchant, screenshot du scan Pro devient un post S7 (case study réel, pas fabriqué)

### 2.5 Prospection conversion beta → client

**Principe :** pour chaque beta testeur recruté (mécanique 2.1) ou scan gratuit envoyé (2.2), R ou F suit personnellement pendant les 30 jours de beta.

**Action concrète :**
- J0 : merchant reçoit accès Pro + premier scan
- J7 : R/F relance "comment ça s'est passé, des questions ?"
- J14 : proposition de call 15 min pour walkthrough
- J30 : proposition de transition Pro payant avec offre early-adopter

**Objectif :** faire de chaque beta testeur un **cas d'usage documenté** et potentiellement un client payant ou un relais de bouche-à-oreille.

**Métrique :** taux de conversion beta → client payant (target S6 indicatif : 2 conversions sur 10 betas = 20%).

---

## 3. PLANNING DE DÉPLOIEMENT

### 3.1 Publications additionnelles

**Twitter — 9 posts en plus (3 par compte sur 3 jours) :**

| Jour | R Twitter | F Twitter | F2 Twitter |
|---|---|---|---|
| Mercredi 22/04 | 1 post beta annonce | 1 post beta annonce (angle builder) | 1 post beta annonce (studio) |
| Jeudi 23/04 | 1 post scan gratuit CTA | 1 post scan gratuit CTA (technique) | 1 post progress beta (N claimed / 10) |
| Vendredi 24/04 | 1 post teaser insights beta | 1 post teaser insights beta | 1 post final call beta |

Ces 9 posts s'ajoutent à ceux déjà schedulés dans le batch S6. Horaires à décider selon le slot optimal mais pas en conflit avec les posts principaux 13h00 existants (suggestion : 18h30 ou 19h00).

**LinkedIn — 6 posts en plus (3 R + 2 F + 1 F2 refait) :**

| Jour | R LinkedIn | F LinkedIn | F2 LinkedIn |
|---|---|---|---|
| Mercredi 22/04 | 1 post beta | 1 post beta (technique deep dive) | — |
| Jeudi 23/04 | 1 post beta | — | — |
| Vendredi 24/04 | 1 post beta | 1 post beta | — |

Les 3 posts LinkedIn R existants dans le batch (mar + jeu + ven) sont **refaits** avec l'angle beta testers. R passe à **3 posts LinkedIn totaux mer-ven** au lieu du batch original 3 (mar + jeu + ven).

Les 2 posts LinkedIn F additionnels (mer + ven) s'ajoutent au batch F existant (qui avait déjà mar + mer + jeu), donc **F passe à 4 posts LinkedIn semaine**. Le post F mercredi existant est **refait** avec l'angle beta.

**IH F2 + LinkedIn F2 mercredi 22/04 :**

Les deux publications F2 mercredi (IH retro + post LinkedIn F2 si encore à publier) sont **refaites** avec l'angle beta testers : "we're opening 10 Pro beta spots, here's why, here's how to claim".

### 3.2 Vidéos Remotion additionnelles

Pour chaque nouveau post avec vidéo attachée, F produit une vidéo Remotion courte (10-30s) qui incarne l'angle beta.

**Briefs vidéo à préparer (ordre d'importance) :**
1. `store-md-beta-10-spots` — annonce ouverture 10 accès beta (usable par R + F + F2)
2. `store-md-scan-demo-agency` — démo 60s d'un scan Pro, résultats qui apparaissent à l'écran
3. `store-md-beta-progress` — compteur "N / 10 beta spots claimed" animé
4. `store-md-scan-cta` — texte animé CTA "DM your URL, 24h report"

Option fallback : si vidéos pas prêtes à temps, les posts beta sortent en text-only. Règle §18 batch principal s'applique aussi ici : URL `https://storemd.vercel.app/` dans la vidéo, pas `storemd.com`.

### 3.3 Volume cold outreach maintenu

Le volume cold outreach existant (R LinkedIn DM, F LinkedIn DM, F Twitter replies) reste actif mer-ven. La couche beta s'**ajoute** aux canaux existants — elle ne les remplace pas.

Les **30 cold scans proactifs** (mécanique 2.3) sont comptés séparément du cold outreach DM classique. Ils sont un canal distinct dans le pipeline.

---

## 4. RÈGLES D'ÉCRITURE DES POSTS BETA

Toutes les règles existantes restent (ANTI-IA, BIBLE §3 v2.1 lignes rouges, format 2-blocs Twitter, hashtags interdits). En plus :

### 4.1 Ce qui doit apparaître dans les posts beta

- Le **chiffre 10** (quota clair)
- **"Pro access"** ou **"full scan"** (différenciation vs free scan public)
- **Call-to-action double** : beta access principal + scan gratuit secondaire pour ceux qui ne veulent pas s'engager
- **Verb d'action directe** : "DM me", "comment below", "send your URL"
- **Pas de timeline fake** (pas de "only today" ou "closes in 24h" si c'est pas vrai)

### 4.2 Ce qui doit disparaître pour les posts beta

- Les stats agrégées type "94% / 78%" du batch principal — elles appartiennent à la mécanique "claims + stats" qui occupe déjà un couloir. Un post beta opère sur un couloir différent : quota + urgence + offre Pro. Mélanger les deux dilue les deux messages. L'agressivité du post beta vient du quota serré et de l'offre directe, pas de la répétition des stats.
- Les claims "I scanned 47 stores" — l'angle beta est différent : "on ouvre 10 accès", pas "on a déjà scanné X". Même intensité sales, levier différent.
- Les scenarios illustratifs "$80k/mo DTC brand" — réservés à la mécanique stats du batch principal. Le post beta montre la valeur par l'offre directe, pas par des cas illustratifs.

### 4.3 Ton à adopter

| Compte | Ton posts beta |
|---|---|
| R | Direct, invitant, "I'm personally picking the 10". Voix R garde son edge mais se ramollit légèrement car il invite. Moins provocateur que le batch principal, plus généreux. |
| F | Builder transparent. "we built this Pro tier, we want 10 real merchants on it before opening it wide, here's what you get". Voix F reste technique mais pragmatique. |
| F2 | Studio neutre. "FoundryTwo is opening 10 Pro beta spots on StoreMD". Voix F2 garde son "we" et son tempo pro. |

### 4.4 Règles BIBLE §3 v2.1 appliquées

- **Pas de faux "X merchants already claimed"** pendant la phase d'ouverture. Si on n'a pas encore de claims, on dit "beta opens today" pas "already 3 claimed overnight".
- **Les messages de cold scan proactif (2.3) contiennent les vrais chiffres du vrai scan** — pas de canon fictif imposé dans des DMs individuels.
- **Pas de faux quota scaling** : si on ouvre 10 places puis 15, on le dit transparent "we expand because demand is real".
- **Rapports Pro envoyés (2.4) reflètent le produit réel** — si le Pro n'a pas encore feature X, on ne la mentionne pas dans le rapport.

---

## 5. MÉTRIQUES À TRACKER

**Pendant S6 mer-ven :**

| Métrique | Source | Target indicatif |
|---|---|---|
| Beta spots claimed | DM reçus + validation | 10/10 avant vendredi soir |
| Scans gratuits demandés (URLs reçues) | DMs + comments | 15-25 sur 3 jours |
| Cold scans envoyés (proactif) | Log manuel R + F | 30 (10/jour × 3j) |
| Taux de réponse cold scan | DMs retour | >20% (6+ retours sur 30) |
| Conversations actives générées | Pipeline DM | 15+ conversations en cours fin de semaine |
| Scans Pro envoyés | Log manuel | 3 (1/jour) |

**Distinction claire** : ces métriques sont **vraies**, trackées en interne. Elles ne sont pas à confondre avec le canon §17 du batch principal (qui reste marketing agrégé).

À la fin S6, on a **deux sets de données** :
- Canon marketing (batch principal) : 68 scans / $12,400 / 4 agencies, publiés
- Pipeline réel (couche beta) : N betas recrutés, N scans cold envoyés, N conversations actives, gardé en interne + utilisé pour S7

---

## 6. RISQUES ET MITIGATIONS

| Risque | Probabilité | Mitigation |
|---|---|---|
| Les 10 beta ne sont pas claimed en 3 jours | Moyenne | Si <5 claimed vendredi : on prolonge en S7 avec post "still X spots left". Pas d'escalade agressive, on assume le timing réel. |
| Les 10 beta claimed en 6 heures → saturation | Faible | Si ça arrive, on ouvre 5 spots supplémentaires transparent. Pipeline validated. |
| Cold scan proactif perçu comme spam / stalking | Moyenne | Ton messages = valeur apportée + opt-out explicite. Pas de relance si 0 réponse. Ne pas envoyer à des boutiques visiblement inactives ou closed. |
| Merchant challenge un chiffre du rapport cold scan | Haute sur 30 envois | Les chiffres sont vrais (scan réel). Si le merchant pousse un point technique, R/F peuvent défendre. |
| Beta testeurs demandent des features pas encore dev | Haute | F priorise selon feedback. Communiquer roadmap transparente. Option : beta feedback loop structuré via Notion/Linear public. |
| Conflit narratif avec batch sales agressif | Faible si exécuté correctement | Les deux couches cohabitent : sales agressif = acquisition top-of-funnel, beta = conversion mid-funnel. Pas de contradiction si messages restent dans leur couloir. |

---

## 7. CHECKLIST VALIDATION AVANT EXÉCUTION

Avant de produire les posts beta, valider que :

- [x] BIBLE §3 v2.1 respectée (pas de faux MRR, pas de testimonial verbatim, pas de faux quota claim)
- [x] URL produit = `https://storemd.vercel.app/` partout (règle RULES-BATCH identique)
- [x] Format 2-blocs Twitter appliqué aux posts avec lien CTA
- [x] Zéro hashtag LinkedIn
- [x] Mode écosystème pour tout cross-engagement des posts beta (R/F/F2 prolongent, ne commentent pas en externe)
- [x] Volume cold outreach BIBLE §4 maintenu (30 interactions/j + 10 cold/j chacun)
- [ ] Accès Pro temporaire opérationnel côté produit (à confirmer avec F)
- [ ] Briefs vidéos Remotion beta priorisés (à confirmer capacité F sur 3 jours)
- [ ] Mécanique de tracking beta claim (formulaire ? DM log manuel ? Notion ?) définie
- [ ] Décision sur durée accès Pro beta (30 jours ? 14 jours ? illimité ?)

Les points non-cochés sont des dépendances à lever avec F avant lancement mercredi.

---

## 8. ARTICULATION AVEC LE BATCH S6 EXISTANT

Cette stratégie **ne remplace pas** le batch principal. Elle **ajoute une couche parallèle** pour les 3 derniers jours.

**Ce qui continue** (batch principal) :
- Post R Twitter mer-jeu-ven (agency bait, data drop, social proof reformulé)
- Post F Twitter mer-jeu-ven-sam-dim (thread + posts)
- Post F2 Twitter mer-jeu-ven
- Cold outreach R LinkedIn (50/sem)
- Cold replies F Twitter (70/sem)
- Cross-engagement trackers R + F (14 replies chacun)

**Ce qui se superpose** (couche beta) :
- 9 tweets additionnels (3 par compte mer-ven)
- 6 posts LinkedIn refaits/additionnels
- Post IH F2 mercredi refait angle beta
- 30 cold scans proactifs manuels (10/jour × 3j R+F)
- Tracking pipeline beta séparé

**Règle de non-interférence :** les posts beta ne se publient pas en même slot horaire que les posts principaux. Suggestion créneau beta = 18h30-19h00 (complémentaire du 13h00 principal).

---

## 9. SUITE — CE QUE CE FICHIER DÉCLENCHE

Si ce fichier est validé par R :

1. **Prochain livrable** : `BATCH-ADDITIONNEL-MER-VEN-S6.md` contenant les 15 posts rédigés (9 Twitter + 6 LinkedIn) + mini-brief vidéos Remotion + adaptation posts F2 IH/LinkedIn mercredi
2. **Après le batch additionnel** : prompt Claude Code pour dispatcher dans le repo
3. **Intégration RULES-BATCH.md** : ajouter une section "Couches d'activation parallèles" qui documente le pattern "couche sales + couche beta" pour réutilisation S7+

Si ce fichier nécessite des ajustements : R indique précisément quoi, je reviens dessus avant de produire le batch additionnel.

---

*Fichier stratégique créé le 21/04/2026 — en attente validation R pour enchaîner sur le batch additionnel mer-ven S6.*
