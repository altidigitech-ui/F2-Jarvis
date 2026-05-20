# Canal Instagram — `@storemd`

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Canal recyclage + visuel
> Hérite de : `../strategie.md` + `../objectifs.md` + `../../la-toile/la-toile.md` + `tiktok.md`

---

## 1. Rôle dans la toile

Instagram est un **canal de recyclage** : les Reels viennent des vidéos TikTok produites le même jour. Pas de production séparée.

**Pourquoi recycler** : économie de temps, cohérence du message, et l'audience Instagram chevauche partiellement l'audience TikTok mais pas complètement (skew légèrement plus âgé, plus visuel, plus "save"-orienté).

**Compte** : `@storemd` (compte produit). Pas de personal branding. F et R n'apparaissent pas.

**Cible** : merchants Shopify qui scrollent Instagram. Public légèrement plus âgé que TikTok, plus orienté "inspiration visuelle" et "save pour plus tard".

---

## 2. Algorithme Instagram 2026 — ce qui rank

Sources : recherche web avril 2026 (Buffer, Later, Hootsuite, Sprout Social, EarnifyHub, TrueFutureMedia, Mosseri statements janvier 2025).

### 2.1 Plusieurs algorithmes, pas un seul

Instagram exploite **4 systèmes distincts** :

| Surface | Signal principal | Implication StoreMD |
|---|---|---|
| **Reels** | Watch time + shares (DM) + saves | Notre format principal |
| **Feed** | Affinité (qui tu suis, avec qui tu interagis) + relevance | Secondaire pour `@storemd` |
| **Stories** | Closeness (relation forte) + viewing history | Utilisé pour Couche B (urgence beta) |
| **Explore** | Topic clusters + niche authority | Là où les non-followers découvrent le compte |

### 2.2 Hiérarchie des signaux Reels (notre priorité)

| Signal | Poids | Implication concrète |
|---|---|---|
| **Watch time** | #1 ranking factor confirmé Mosseri | Vidéo regardée à 80%+ = format qui marche |
| **Sends DM (shares en privé)** | Top 3 confirmé Mosseri | Le signal le plus puissant pour atteindre de nouvelles audiences |
| **Saves** | Très fort | Signal de valeur durable |
| **Comments (qualité)** | Fort | Conversations > réactions courtes |
| **Likes** | Faible | Vanity metric en 2026 |

### 2.3 Mécaniques 2026

- **94% de la distribution = AI recommendations** (vs followers existants). Donc compte zéro = pas un blocage.
- **3-second retention threshold** : si l'utilisateur skip avant 3 secondes, l'algo ne pousse pas plus loin.
- **Originality Score** : Instagram pénalise les Reels avec watermark TikTok, ou les reposts non-transformés. **Re-export depuis Remotion ou retirer le watermark TikTok avant upload.**
- **Trial Reels** : possibilité de tester un Reel auprès de non-followers uniquement avant de le publier officiellement. À utiliser pour les vidéos incertaines.
- **Reels < 90 secondes** pour la discovery. Au-delà, ineligible aux recommandations.
- **Sweet spot pour discovery** : 30-90 secondes. Aligne avec notre cadence TikTok 15-45s.
- **Carousels** : peuvent atteindre jusqu'à 20 slides, format engagement fort (saves élevés). Option pour des contenus "checklist", "before/after", "tear-down" si pertinent.

### 2.4 Cadence optimale

3-5 Reels/semaine + Stories régulières + carousels occasionnels. La cadence StoreMD (6 Reels/sem recyclés depuis TikTok) est dans la borne haute. À surveiller : si watch time des Reels baisse → réduire à 4-5/sem.

---

## 3. Cadence StoreMD

| Quoi | Combien | Quand |
|---|---|---|
| Reels publiés | **6/sem** (recyclés depuis TikTok) | Lundi à samedi, même jour ou jour suivant la TikTok |
| Stories | **3-5/sem** | Annonces Couche B (urgence beta), résultats de la semaine, tease d'une Reel à venir |
| Carousels | **0-1/sem** | Optionnel — uniquement si format pertinent (checklist, comparison, before/after) |
| Posts photo statiques | **0-1/sem** | Optionnel — visuels graphiques (citations data, infographies) |

**Recyclage TikTok → Insta** :
1. Vidéo TikTok produite et publiée
2. Re-export depuis Remotion (PAS download depuis TikTok avec watermark)
3. Caption adaptée Instagram (hashtag = ZÉRO, mais on peut être plus visuel/émotionnel sur Insta)
4. Publication Reel sur `@storemd` le même jour ou jour suivant

---

## 4. Couche A et Couche B sur Instagram

| Couche | Format Insta | UTM tagué | Fréquence |
|---|---|---|---|
| **Couche A — Vente directe** | Reel (recyclé TikTok) + caption avec lien | F3 — `utm_source=instagram&utm_medium=organic&utm_campaign=reels&utm_content=caption_cta` | 4 Reels/sem |
| **Couche B — Recrutement beta** | Reel + Stories sticker urgence | Reel : F3 (variante : `utm_campaign=couche_b_beta`). Story : F4 — `utm_source=instagram&utm_medium=organic&utm_campaign=story&utm_content=story_sticker` | 2 Reels/sem + 2-3 Stories/sem |

**Bio Instagram `@storemd`** : F5 — `utm_source=instagram&utm_medium=bio&utm_campaign=profile&utm_content=bio_link`. Lien permanent dans le link-in-bio.

**Stories couche B** : format idéal pour l'urgence ("X places beta, 24h pour t'inscrire"). Sticker link → site directement. Disparaît après 24h, donc pas de pollution permanente du feed.

---

## 5. Format Reels

### 5.1 Durée et structure

Identique à TikTok (cf. `tiktok.md` §5) puisqu'on recycle :
- 15-45 secondes (sweet spot)
- Hook 0-3s critique (3-second retention threshold Insta)
- Démo 10-30s
- CTA final

### 5.2 Captions Instagram (différence vs TikTok)

| Aspect | TikTok | Instagram Reel |
|---|---|---|
| Longueur | 80-150 caractères | 100-300 caractères (Insta tolère plus long) |
| Ton | Direct, factuel | Légèrement plus narratif autorisé |
| Lien | "Link in bio" ou caption avec UTM | Lien dans caption ou "link in bio" |
| Hashtags | ZÉRO | ZÉRO (cf. `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §3) |
| Mots-clés | Au début | Au début (Instagram indexe aussi) |

**Format type caption Insta** :
```
[Hook reformulé en 1 phrase]

[2-3 phrases de contexte ou storytelling court]

[Stat ou résultat clé]

[CTA + lien UTM si placement caption, sinon "link in bio"]
```

### 5.3 On-screen text et audio

- **On-screen text** : identique TikTok (Insta indexe aussi le texte affiché pour le ranking search)
- **Audio original > sounds trending** : règle 2026 sur Insta aussi
- **Pas de watermark TikTok** : Originality Score Insta pénalise

---

## 6. Stories — usage tactique

Les Stories ne sont pas faites pour la discovery (algo Stories = closeness, pas relevance). Mais elles servent la **Couche B (urgence beta)** parce qu'elles disparaissent en 24h = scarcity naturelle.

### Format type Story Couche B

```
Story 1 (visuel) : "BETA STOREMD"
                   "10 places dispo cette semaine"
                   "Lien sticker pour t'inscrire"
                   [Sticker link → F4 UTM beta]

Story 2 (chiffre) : "8 places restantes"
                    "[Sticker compte à rebours]"
                    
Story 3 (résultat) : "Une boutique scannée hier :
                     $4 200/mois en leaks détectés
                     Lien en bio pour scanner la tienne"
                     [Sticker link]
```

**Cadence Stories** : 3-5/semaine. Peut monter à 1-2/jour si on est en phase "push beta intensif" (avant atteinte des 10 betas).

---

## 7. Carousels (occasionnel)

Format engagement fort (saves élevés, dwell time élevé). À utiliser pour :

- **Comparison** : "Avant StoreMD vs Après StoreMD" sur une boutique scannée
- **Checklist** : "10 leaks que StoreMD trouve sur 90% des boutiques Shopify"
- **Tear-down visuel** : screenshots commentés d'une boutique scannée
- **Data infographie** : "$33 milliards drainés des merchants en chargebacks (Mastercard 2025)"

**Cadence** : 0-1 carousel/semaine. Pas obligatoire. Si on a un format qui se prête.

---

## 8. UTM tagging — récap

| Placement | UTM exact |
|---|---|
| Bio (link-in-bio) | `utm_source=instagram&utm_medium=bio&utm_campaign=profile&utm_content=bio_link` |
| Reel — caption (Couche A vente) | `utm_source=instagram&utm_medium=organic&utm_campaign=reels&utm_content=caption_cta` |
| Reel — caption (Couche B beta) | `utm_source=instagram&utm_medium=organic&utm_campaign=couche_b_beta&utm_content=caption_cta` |
| Story — sticker link | `utm_source=instagram&utm_medium=organic&utm_campaign=story&utm_content=story_sticker` |
| DM Instagram | `utm_source=instagram&utm_medium=dm&utm_campaign=outreach&utm_content=dm_share` |

**Règle** : pour tout placement non listé dans `UTM_TRACKING_LINKS.md`, F l'ajoute d'abord au fichier officiel puis on utilise. Pas d'invention.

---

## 9. Réponses commentaires + DM (via JARVIS)

Workflow identique TikTok (cf. `tiktok.md` §7) :
1. Screenshot du commentaire/DM envoyé à JARVIS
2. JARVIS propose 2 variantes de réponse dans la voix `@storemd` (compte produit)
3. F ou R valide, ajuste, publie
4. JARVIS log automatique

**Cas DM Instagram** : si un merchant DM en demandant une démo ou en posant une question → on bascule sur le levier "scan + résultats" (cf. `../strategie.md` §4 levier 3). On scanne sa boutique, on lui envoie les vrais chiffres, on inclut le lien UTM.

---

## 10. Métriques à suivre

### 10.1 Stats natives Instagram (à récupérer hebdo)

| Métrique | Source | Pourquoi |
|---|---|---|
| Reach (Reel) | Insights Insta | Combien de comptes uniques ont vu |
| Watch time + completion rate | Insights Insta | Indicateur algo #1 |
| Sends DM | Insights Insta | Signal le plus fort 2026 |
| Saves | Insights Insta | Signal valeur durable |
| Comments | Insights Insta | Engagement qualitatif |
| Profile visits | Insights Insta | Funnel : Reel → profil |
| Bio link clicks | Insights Insta | Funnel : profil → site |
| Followers gagnés | Insights Insta | Audience accumulée |
| Stories — taps forward, taps back, exits | Insights Insta | Quels Stories tiennent l'attention |
| Stories — sticker link clicks | Insights Insta | Conversions directes Couche B |

### 10.2 Conversions (dashboard admin StoreMD)

| Métrique | Source |
|---|---|
| Visites depuis Instagram | Dashboard admin → Traffic by Source → `instagram` |
| Visites par campagne (reels vs bio vs story vs couche A vs couche B) | Dashboard admin → Traffic by Campaign |
| Installs depuis Instagram | Dashboard admin → Recent Merchants → `utm_source=instagram` |

### 10.3 Comparaison TikTok vs Instagram

JARVIS sort chaque vendredi un comparatif :
- Reels qui ont mieux marché sur Insta que sur TikTok (et inverse)
- Format gagnant par plateforme (durée, hook, on-screen text)
- Conversion rate par plateforme (installs/visites)

Permet de calibrer si on doit produire spécifiquement pour Insta ou si le recyclage suffit.

---

## 11. Anti-patterns

À ne jamais faire sur Instagram `@storemd` :

- **Personal branding** (F ou R en avant). Compte produit, pas de visage fondateur.
- **Build in public**. Le merchant s'en fout.
- **Hashtags**. ZÉRO, jamais, aucune exception.
- **Em-dash, "Here's the thing", "At the end of the day"**. Détecté IA. Cf. `../../ANTI-IA.md`.
- **Watermark TikTok** sur les Reels. Originality Score 2026 = pénalité reach significative.
- **Reposting brut** d'autres comptes. Idem Originality Score.
- **Stories sans lien sticker** quand pertinent. Trou dans la toile (cf. `../../la-toile/la-toile.md` §7).
- **Carousels statiques de citations marketing**. Sans valeur, faible engagement.
- **Tagger des comptes au hasard pour reach**. Signal spam.
- **Engagement bait** dans captions. Pénalisé.
- **DM bots / mass outreach Insta**. Compte banni ou shadow-ban garanti.
- **Réponses commentaires mode pitch agressif**. Concise, factuelle, utile.

---

## 12. Documents liés

- `tiktok.md` — canal source (Reels Insta = recyclage TikTok)
- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons
- `../contenu/pipeline-video.md` — pipeline production vidéo
- `../jarvis/reponses-commentaires.md` — protocole réponses JARVIS
- `../../la-toile/la-toile.md` — schéma global, fils F3 (Reels), F4 (Story), F5 (bio)
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source UTM officielle
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — couches A + B
- `../../ANTI-IA.md` — règles anti-detection IA
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
