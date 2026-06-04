# Formats de contenu — référence transverse

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Bibliothèque de formats
> Hérite de : `../strategie.md` + `../canaux/*.md` + `pipeline-video.md`

---

## 1. Pourquoi ce fichier

Ce fichier est la **référence rapide des formats** utilisés à travers toute la stratégie marketing. Pas une stratégie. Pas un canal. Une bibliothèque pour que F+R (et JARVIS) sachent immédiatement quel format choisir pour quelle situation, quelle voix utiliser, quelles règles s'appliquent.

**Comment l'utiliser** : tu hésites sur un format ? Tu cherches la voix de @storemd vs F vs R ? Tu veux savoir où prendre un chiffre ? C'est ici.

**Ce que ce fichier ne fait PAS** : il ne re-explique pas les algos plateforme (cf. `../canaux/*.md`), ni la stratégie (cf. `../strategie.md`), ni le pipeline vidéo (cf. `pipeline-video.md`). Il référence.

---

## 2. Matrice formats × canaux

| Format | TikTok | Insta | FB Page | FB Groupes | Reddit | Twitter | LinkedIn | PH/IH |
|---|---|---|---|---|---|---|---|---|
| Vidéo courte 15-45s | ✅ Source | ✅ Reel recyclé | ✅ Reel recyclé | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vidéo longue 60-90s | ⚠️ Démo détaillée seul | ⚠️ idem | ⚠️ idem | ❌ | ❌ | ❌ | ⚠️ rare | ❌ |
| Story 24h | ❌ | ✅ Couche B urgence | ⚠️ optionnel | ❌ | ❌ | ❌ | ❌ | ❌ |
| Carousel | ❌ | ✅ saves élevés | ❌ | ❌ | ❌ | ❌ | ⚠️ PDF documents | ❌ |
| Post photo + lien | ❌ | ⚠️ rare | ✅ recyclage | ❌ | ❌ | ❌ | ⚠️ rare | ❌ |
| Tweet simple | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ format 2-blocs | ❌ | ❌ |
| Thread Twitter | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Post texte long (800-1300 char) | ❌ | ❌ | ⚠️ acceptable | ⚠️ acceptable | ✅ post original | ❌ | ✅ format dominant | ❌ |
| Article long format | ❌ | ❌ | ❌ | ❌ | ⚠️ rare | ❌ | ✅ LinkedIn Article | ❌ |
| Commentaire de valeur (15+ mots) | ❌ | ❌ | ⚠️ secondaire | ✅ engagement | ✅ engagement | ✅ cross-engage | ✅ cross-engage | ⚠️ post-launch |
| DM cold outreach | ❌ | ⚠️ DM merchant | ❌ | ✅ Messenger | ✅ DM Reddit | ⚠️ DM Twitter | ✅ DM LinkedIn | ❌ |
| Show IH / Show HN | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ launch days |
| Maker comment PH | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ launch days |

Légende : ✅ = format prioritaire / ⚠️ = format optionnel ou rare / ❌ = format non-utilisé

---

## 3. Format vidéo courte (15-45s)

**Référence détaillée** : `pipeline-video.md` §2.3 (script type) + `../canaux/tiktok.md` §5 (format complet).

**Structure obligatoire** :
```
[0-3s : HOOK] — Affirmation choc, problème évident, ou résultat surprenant
[3-10s : MISE EN CONTEXTE] — De quoi on parle, sur quelle boutique
[10-30s : DÉMO/RÉSULTATS] — On scanne, on montre, en chiffres
[30-45s : CTA] — "Lien en bio" ou "Beta dispo, lien en bio"
```

**Règles** :
- Sous-titres OBLIGATOIRES (80% TikTok son OFF)
- Hashtags : ZÉRO
- Voix off neutre, anonyme (pas d'identité fondateur)
- Branding palette FoundryTwo (cf. §10)
- Re-export sans watermark TikTok pour Insta/FB

**Production** : JARVIS script → Claude Design visuels → Remotion montage. Cf. `pipeline-video.md`.

---

## 4. Formats texte courts

### 4.1 Tweet simple (Twitter)

**Référence détaillée** : `../canaux/twitter.md` §7.1.

```
[Affirmation choc en 1 ligne]

[Développement 2-3 lignes : pourquoi, données, expérience]

[Question ouverte ou statement provoquant]
```

**Format 2-blocs OBLIGATOIRE si CTA lien** : tweet sans URL + reply manuelle avec URL UTM. Lien dans le corps = -1700% reach. Cf. `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §2.

**Longueur** : 280 caractères max (limite plateforme). Sweet spot 200-280.

### 4.2 Commentaire de valeur (LinkedIn / Reddit / Facebook groupes)

**Règle universelle** : 15+ mots minimum (signal substantif sur LinkedIn) + apport de valeur réel (pas "great post 🔥").

```
[Reformulation du problème pour montrer qu'on a lu]

[Observation basée sur expérience / data terrain]

[2-3 actions concrètes que le merchant peut tester]

[Question ouverte pour relancer la discussion]
```

**Si mention StoreMD pertinente (20% des commentaires)** : valeur en haut, mention en P.S. ou dernière phrase + lien UTM.

**Cf. spécifique** :
- LinkedIn : `../canaux/linkedin.md` §12 (signal thread 5.2× si conversation)
- Reddit : `../canaux/reddit.md` §6.1 (80/20 rule)
- Facebook groupes : `../canaux/facebook.md` §4.3 (80/20 rule)

### 4.3 Cross-engage F↔R (Twitter / LinkedIn)

Commentaire de l'autre fondateur sur un post pour amplifier.

**Règle 30 min Twitter / 60 min LinkedIn** (golden hour). Reply substantive (15+ mots), angle complémentaire.

**Pattern type** :
- F poste sur tech → R reply avec angle GROWTH/business
- R poste sur growth → F reply avec angle TECHNIQUE

Cf. `../../romain/reddit/cross-replies.md`, `../../romain/facebook/cross-replies.md`, `../../fabrice/reddit/cross-replies.md`, `../../fabrice/facebook/cross-replies.md` (cross-replies formalisés uniquement pour Reddit et Facebook ; Twitter et LinkedIn voir patterns dans canaux/twitter.md §8 et canaux/linkedin.md §7).

---

## 5. Formats texte longs

### 5.1 Thread Twitter

**Référence** : `../canaux/twitter.md` §7.2.

```
Tweet 1 : Hook + promesse (lis ce thread parce que…)
Tweet 2-6 : 1 idée par tweet, données concrètes, observations
Tweet 7 : Conclusion / takeaway
Tweet 8 : Reply automatique avec lien UTM (lien dans dernier tweet, pas le premier)
```

**Longueur** : 5-8 tweets typique. Plus long = drop-off lecture.

**Compte prioritaire** : @FabGangi > @delgado_ro72224.

### 5.2 Post LinkedIn long (800-1300 caractères)

**Référence** : `../canaux/linkedin.md` §6.

```
[Hook accrocheur 1-2 lignes — contre-intuitif ou claim chiffré]

[Saut de ligne]

[Développement 5-10 lignes : contexte, observations, données, exemples]

[Saut de ligne]

[3-5 bullets ou listes courtes — utiliser tirets simples, pas markdown 1. 2. 3.]

[Saut de ligne]

[Conclusion ou question ouverte qui provoque les commentaires]

[Saut de ligne]

[CTA optionnel + lien UTM]
```

**Lien dans le corps** : OK (différent de Twitter, pas de pénalité).

### 5.3 Article LinkedIn (long format)

**Référence** : `../canaux/linkedin.md` §5.1.

Format dédié aux deep-dives data-driven. 1 500-3 000 mots typique. CTA en fin avec lien UTM article.

**Cadence** : rare. 1 par mois max si sujet justifié.

### 5.4 Post Reddit storytelling

**Référence** : `../canaux/reddit.md` §6.3.

```
Titre : [Question ou claim qui pique la curiosité, pas clickbait]

[Premier paragraphe : pourquoi je poste, qu'est-ce qui m'a amené là]

[2-4 observations chiffrées, listées avec contexte]

[Soit conclusion soit question ouverte]

[Optionnel : "Happy to take a look at your store URL if you want a 2nd opinion"]
```

**Voix obligatoire** : first-person ("I've been auditing..."). Pas de "we", pas de compte-marque.

**Cadence** : 2-3 posts/sem par personne max.

---

## 6. Formats visuels statiques

### 6.1 Carousel Instagram (PDF-like, 2-20 slides)

**Référence** : `../canaux/instagram.md` §7.

Excellent pour saves (signal valeur durable). Formats à utiliser :
- **Comparison** : avant/après StoreMD
- **Checklist** : "10 leaks que StoreMD trouve sur 90% des stores"
- **Tear-down visuel** : screenshots commentés
- **Data infographie** : chiffres avec sources

**Production** : Claude Design pour les slides + export PNG/JPG. Pas de Remotion (statique).

**Branding** : palette FoundryTwo (cf. §10).

### 6.2 Carousel LinkedIn (PDF document)

**Référence** : `../canaux/linkedin.md` §6.4.

Format LinkedIn équivalent (PDF de 8-12 slides typique). Saves élevés.

### 6.3 Post photo Facebook page

Visuels data ou résultats scan ponctuels, hors recyclage TikTok. 0-1/sem.

### 6.4 Story Instagram (Couche B urgence)

**Référence** : `../canaux/instagram.md` §6.

```
Story 1 (visuel) : "BETA STOREMD — X places dispo cette semaine"
                   [Sticker link → UTM Couche B]
Story 2 (chiffre) : "[X] places restantes" + sticker compte à rebours
Story 3 (résultat) : "Une boutique scannée hier : $X/mois en leaks"
                     [Sticker link]
```

**Cadence** : 3-5/sem en push beta. Disparition 24h = scarcity naturelle.

---

## 7. Formats DM cold outreach

### 7.1 DM avec scan boutique (le levier le plus convertissant)

**Référence** : `../strategie.md` §4 levier 3 + tous les fichiers canaux §"Cold outreach".

**Workflow** :
1. Scan boutique externe (URL trouvée dans le profil ou post du merchant)
2. Récup des findings concrets (chiffres + impact $)
3. DM avec les vrais résultats sur SA boutique

**Format type** :
```
Hey [prénom], saw your post about [problème].

Ran a quick scan on [boutique URL] using a tool I'm building.
Found these 3 things that might be the cause :
- [Finding 1 chiffré]
- [Finding 2 chiffré]
- [Finding 3 chiffré]

Happy to share the full report (free) if useful. Lmk : [lien UTM]
```

**Règles** :
- Scan AVANT le DM (pas de pitch générique)
- 3 findings max (pas une liste de 10)
- Lien UTM tagué (variant DM par canal — cf. UTM_TRACKING_LINKS.md)
- J+3 sans réponse = on lâche, pas de relance
- Plateformes : Messenger (FB), DM Reddit, DM Insta, DM LinkedIn (cf. §2 matrice)

### 7.2 DM outreach 1-to-1 LinkedIn (cible très qualifiée)

**Référence** : `../canaux/linkedin.md` §10.

Format plus poli (LinkedIn = pro), avec connexion request d'abord, attendre 3-7 jours, puis DM avec valeur.

---

## 8. Formats launch days

### 8.1 Maker comment Product Hunt

**Référence** : `../canaux/launch-days.md` §3.3.

Premier commentaire du fil PH posté par le maker (compte perso R ou F) le jour du launch (00:05 PT). Doit contenir :
- Pourquoi on a buildé ça
- Ce que ça fait concrètement
- Lien UTM F29

### 8.2 Show IH (IndieHackers)

**Référence** : `../canaux/launch-days.md` §4.2.

Format Show IH le même jour que le PH launch (ou +1 jour si saturé).

```
Titre : "I built [product] for [audience] — [unique angle]"

Corps :
- Pourquoi je l'ai construit
- Le problème que je résous (avec données)
- Ce que ça fait concrètement
- Ce que j'ai appris en construisant
- Lien UTM F30
- Question ouverte à la communauté
```

### 8.3 Milestone post IH

**Référence** : `../canaux/launch-days.md` §4.3.

```
Titre : "Hit [milestone] with [product]"

Corps :
- Le chiffre + ce que ça représente
- 2-3 leçons apprises
- Ce qu'on prévoit ensuite
- Lien UTM milestone
```

**Cadence** : 1 post tous les 2-4 sem si milestone réel atteint. Pas de fake milestones.

---

## 9. Voix par persona

### 9.1 Vue d'ensemble

| Persona | Plateformes | Ton | Vocabulaire | Exemple |
|---|---|---|---|---|
| **@storemd** (compte produit) | TikTok, Insta, FB Page | Neutre, factuel, axé résultats | "scan", "findings", "$X saved", pas de "I", pas de "we" | "This Shopify store loses $4,200/month — and the owner has no idea" |
| **F (@FabGangi, Fabrice Gangitano)** | Twitter, LinkedIn, Reddit, FB Groupes (compte perso) | Technique, analytique, builder | "code", "infra", "I scanned", "the data shows" | "Most Shopify 'speed apps' make your store slower." |
| **R (@delgado_ro72224, Romain Delgado)** | Twitter, LinkedIn, Reddit, FB Groupes (compte perso) | Business, growth, conversion | "merchants", "conversion rate", "ROI", observations terrain | "71% of Shopify chargebacks are friendly fraud." |
| **FoundryTwo (IH)** | IndieHackers | Voix du SaaS promu (actuellement StoreMD), pas de persona studio séparé | identique au SaaS promu (cf. @storemd) | cf. ligne @storemd |

### 9.2 Sources de référence détaillées

- F : `../../fabrice/VOIX.md` §RÈGLE #0 (filtre anti-IA)
- R : `../../romain/VOIX.md` §RÈGLE #0
- FoundryTwo (IH) : voix du SaaS promu (pas de voix studio séparée) → cf. @storemd ci-dessous ; branding studio : `../../asset-brand/FOUNDRYTWO-BRAND-BIBLE.md` §1.3
- @storemd : voix compte produit → `saas-app-shopify/storemd/VOIX.md`

### 9.3 Règle absolue

Tout draft généré par JARVIS DOIT passer par le filtre anti-IA `../../ANTI-IA.md` + voix persona avant publication. **JAMAIS publier le draft brut.**

---

## 10. Branding cohérence

### 10.1 Palette FoundryTwo (à utiliser dans tous les visuels)

Source : `../../asset-brand/FOUNDRYTWO-BRAND-BIBLE.md`.

| Rôle | Hex | Usage |
|---|---|---|
| Background primaire | `#0A0A0F` (Obsidian) | Fonds, headers |
| Background secondaire | `#1A1A2E` (Graphite) | Cards, sections |
| Accent chaud | `#F59E0B` (Forge Amber) | CTA, highlights |
| Accent froid | `#3B82F6` (Steel Blue) | Liens, accents data |
| Texte principal | `#F5F5F5` (Ash White) | Texte sur dark |
| Texte secondaire | `#9CA3AF` (Smoke) | Sous-titres, meta |
| Spark / glow | `#FBBF24` (Ember) | Particules, effets |
| Danger / alerte | `#EF4444` (Molten Red) | Erreurs, warnings |
| Succès | `#22C55E` (Circuit Green) | Validations |

### 10.2 Logos

- **Logo FoundryTwo** : F2 sur enclume avec sparks (Ash White F + Forge Amber 2). Cf. `../../asset-brand/FOUNDRYTWO-LOGO-GUIDELINES.md`.
- **Logo @storemd** : icône produit `storemd_icon_1200x1200.png` (repo StoreMD).
- **Sur les vidéos compte produit @storemd** : logo @storemd discret (bas-droite ou haut-droite). PAS de logo F2.
- **Sur les visuels FoundryTwo** : logo F2.

### 10.3 Briefer Claude Design

Tout brief Claude Design DOIT inclure :
- La palette ci-dessus (hex codes)
- Le logo cible (StoreMD ou F2 selon contexte)
- Le format de sortie (SVG, React component, image)
- Les dimensions cibles (selon plateforme : 1080×1920 vidéo / 1080×1080 carrousel / 1080×1350 portrait Insta)

---

## 11. Sources de chiffres autorisées

**Règle BIBLE §3 (lignes rouges intégrité données)** : tous les chiffres mentionnés en public DOIVENT venir d'une source vérifiable.

### 11.1 Sources autorisées

| Source | Usage |
|---|---|
| `../../produits/MUTATIONS.md` §StoreMD (12 threads, 600+ commentaires terrain) | Claims chiffrés sur les problèmes Shopify |
| Scans réels de boutiques (anonymisés) | Démos vidéo, exemples concrets, cold outreach |
| Mastercard chargeback reports | Stats friendly fraud |
| WPP retail reports | Stats e-commerce |
| Shopify Merchant Reports | Stats Shopify natives |
| Études tierces vérifiables (avec lien) | Data marché |
| Dashboard admin StoreMD (chiffres internes) | **Uniquement si on a vraiment ces chiffres** — pas inventés |

### 11.2 Sources INTERDITES

- **Inventer un MRR / nombre de clients / testimonials**. Ligne rouge BIBLE §3.
- **Recycler un chiffre sans source** ("on dit que..."). Si pas de source vérifiable → ne pas utiliser.
- **Citer un concurrent sans donnée publique**. Risque légal + éthique.
- **Mentionner Altistone, La Toile, ou la structure corporate** dans le contenu public.

---

## 12. Anti-patterns transverses

### 12.1 Anti-patterns IA (filtre obligatoire avant publication)

**Patterns IA à bannir** (cf. `../../ANTI-IA.md`) :
- Em-dash "—" comme pivot de phrase
- Structure "Not X, it's Y"
- "Here's the thing"
- "At the end of the day"
- "Which means"
- "However,"
- "Furthermore,"
- "It's worth noting"
- Phrases trop "balancées" / parfaites
- Listes numérotées format markdown `1. 2. 3.` (préférer tirets)

**Workflow filtre** :
1. JARVIS génère le draft
2. F ou R relit + applique le filtre anti-IA
3. Casse la structure (varier longueur de phrases, ajouter imperfections)
4. Publie

### 12.2 Anti-patterns plateforme

| Plateforme | À bannir |
|---|---|
| Twitter | Lien dans corps (-1700% reach) — toujours format 2-blocs |
| LinkedIn | Hashtags (LLM embeddings 2026) |
| TikTok/Insta/FB | Watermark TikTok sur réuploads (Originality Score) |
| Reddit | Mention StoreMD avant 4-6 sem karma building |
| FB Groupes | Pitch direct (ban garanti) — règle 80/20 |
| Toutes | Hashtags (zéro partout) |

### 12.3 Anti-patterns voix

- Compte produit `@storemd` qui parle en "I" ou "we" (compte produit = neutre)
- F ou R qui pivote son angle (F sur growth, R sur tech) — Knowledge Graph LinkedIn pénalise
- Voix off identifiable F ou R sur compte produit (anonymat obligatoire)

---

## 13. Documents liés

- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons
- `pipeline-video.md` — pipeline production vidéo (Claude Design + Remotion)
- `../canaux/tiktok.md` — format vidéo détaillé
- `../canaux/instagram.md` — Stories + Reels + carrousels
- `../canaux/facebook.md` — page produit + groupes Shopify
- `../canaux/reddit.md` — posts + commentaires + Show IH
- `../canaux/twitter.md` — format 2-blocs + threads
- `../canaux/linkedin.md` — posts long + articles + Depth Score
- `../canaux/launch-days.md` — Maker comment PH + Show IH + milestones
- `../jarvis/prompts.md` — prompts JARVIS pour génération
- `../jarvis/reponses-commentaires.md` — protocole réponses
- `../jarvis/engagement-reddit-fb.md` — protocole engagement
- `../../asset-brand/FOUNDRYTWO-BRAND-BIBLE.md` — palette + identité visuelle
- `../../asset-brand/FOUNDRYTWO-LOGO-GUIDELINES.md` — logos
- `../../produits/MUTATIONS.md` — sources chiffrées StoreMD
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — UTM officiels
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — règles batch + format 2-blocs
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- `../../romain/VOIX.md` + `../../fabrice/VOIX.md` — voix de chaque persona
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
