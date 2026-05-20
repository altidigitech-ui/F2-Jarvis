# Canal TikTok — `@storemd`

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Canal acquisition #1
> Hérite de : `../strategie.md` + `../objectifs.md` + `../../la-toile/la-toile.md`

---

## 1. Rôle dans la toile

TikTok est le **canal acquisition principal** de StoreMD. Tous les autres canaux périphériques (Instagram, Facebook page, Twitter façade, LinkedIn façade) reçoivent du contenu recyclé ou complémentaire — TikTok est la source.

**Compte** : `@storemd` (compte produit, pas compte perso). F et R n'apparaissent pas dans les vidéos. On montre l'app, les résultats, les dollars sauvés.

**Cible** : merchants Shopify qui scrollent leur téléphone pendant la pause. Pas des devs. Pas des indie hackers.

**Avantage TikTok pour démarrer à zéro** : 70-80% du For You Page vient de comptes que l'utilisateur ne suit pas. Le follower count n'est pas un facteur direct de ranking. Une vidéo bien faite peut faire 50K vues sans audience préalable.

---

## 2. Algorithme TikTok 2026 — ce qui rank

Source : recherche web avril 2026 (Sprout Social, Buffer, PostEverywhere, ToolsBear, Darkroom Agency, TikTok Transparency Center).

### 2.1 Hiérarchie des signaux (par poids)

| Signal | Poids | Implication concrète |
|---|---|---|
| **Watch time + completion rate** | ~40-50% | Vidéo regardée à 70%+ = viralité possible. La barre est passée à 70% en 2025-2026 (vs ~50% en 2024). |
| **Shares (notamment via DM)** | Très fort | Plus fort que likes. Un share DM = "je veux que mon ami voit ça". |
| **Saves** | Très fort | Signal de valeur durable. À provoquer avec du contenu "à garder" (checklists, données chiffrées, fixes). |
| **Comments (qualité + profondeur)** | Fort | Commentaires longs > commentaires "🔥". Conversations de plusieurs replies > likes. |
| **Likes** | Faible | Signal de surface. Compte mais loin derrière watch time/shares/saves. |
| **Audio original** | Bonus | Vs sound trending recyclé. TikTok 2026 favorise l'originalité. |
| **Search keywords** | Bonus | Captions, on-screen text, et words spoken sont indexés. TikTok = search engine pour 40% Gen Z. |
| **Follower count** | Pas un facteur direct | Compte à zéro abonné peut percer si le contenu performe au test follower. |

### 2.2 Mécaniques de distribution 2026

- **Follower-first testing** (déployé fin 2025) : la vidéo est d'abord montrée à un échantillon de tes followers. Si le watch time tient, push broader.
- **Originality Score** : TikTok pénalise les vidéos avec watermark TikTok ré-uploadées d'un autre compte, ou les recycles évidents d'autres plateformes. **Ne JAMAIS upload depuis Insta avec watermark.**
- **3-second drop-off** : 50% des viewers swipe avant 3 secondes si le hook ne marche pas. Le hook est tout.
- **"Qualified Views"** = views > 5 secondes. C'est la métrique réelle, pas le compteur de vues brut.
- **Engagement bait pénalisé** : "Comment 'yes' if you agree" et autres tactiques sont down-rankés en 2026.

### 2.3 Cadence optimale

**3 à 5 vidéos par semaine, pas plus**. Daily posting est dépassé en 2026 — quality > quantity. La cadence StoreMD (6 vidéos/semaine) est proche de la borne haute, à surveiller : si la qualité baisse → reculer à 4-5/sem.

---

## 3. Cadence StoreMD

| Quoi | Combien | Quand |
|---|---|---|
| Vidéos publiées | **1/jour sauf dimanche = 6/sem** | Lundi à samedi |
| Heure de publication | Selon stats `@storemd` (à calibrer après 4 sem) | À définir avec données |
| Production | Vendredi/samedi soir : brainstorm + scripts. Dimanche : batch JARVIS. Lundi-samedi : production + publication. | Cycle hebdo cf. `../strategie.md` §6 |

**Recyclage immédiat (le même jour ou jour suivant)** :
- Vidéo TikTok → Instagram Reels (caption recyclée, lien dans caption ou bio)
- Vidéo TikTok → Facebook page (post avec vidéo + lien)

**Important** : pas d'upload direct du fichier TikTok avec watermark sur Instagram/Facebook. Re-export depuis Remotion ou retirer le watermark. Originality Score Insta pénalise les watermarks TikTok aussi.

---

## 4. Couche A et Couche B sur TikTok

Cf. `../objectifs.md` §2 + `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`.

| Couche | Angle vidéo | UTM caption | Fréquence sur 6 vidéos/sem |
|---|---|---|---|
| **Couche A — Vente directe** | "Voici ce que StoreMD trouve sur cette boutique en 60s." Démo, résultats chiffrés. | F1 — `utm_source=tiktok&utm_medium=organic&utm_campaign=video&utm_content=video_cta` | 4 vidéos/sem |
| **Couche B — Recrutement beta** | "Beta dispo via lien spécial — install hors store." Urgence + scarcity (10 places). | `utm_source=tiktok&utm_medium=organic&utm_campaign=couche_b_beta&utm_content=video_cta` | 2 vidéos/sem (jusqu'à 10 betas atteints) |

**Bio TikTok `@storemd`** : F2 — `utm_source=tiktok&utm_medium=bio&utm_campaign=profile&utm_content=bio_link`. Ce lien est permanent dans la bio.

---

## 5. Format vidéo

### 5.1 Durée

- **15-45 secondes** = sweet spot pour StoreMD (assez pour montrer un scan, assez court pour completion rate ≥ 70%).
- Plus long (60-90s) acceptable pour démos détaillées ou tear-downs publics. Au-delà : le risque de drop-off est trop élevé.

### 5.2 Structure

```
[0-3s : HOOK] — Affirmation choc, problème évident, ou résultat surprenant
[3-10s : MISE EN CONTEXTE] — De quoi on parle, sur quelle boutique
[10-30s : DÉMO/RÉSULTATS] — On scanne, on montre ce qu'on trouve, en chiffres
[30-45s : CTA] — "Lien en bio pour scanner ta boutique" ou "Beta dispo, lien en bio"
```

### 5.3 Hooks qui marchent (à tester, à mesurer)

- "Cette boutique Shopify perd $4 200/mois sans le savoir"
- "94% des stores Shopify ont des apps zombies qui leur coûtent de l'argent"
- "J'ai scanné 50 boutiques Shopify cette semaine — voici ce que j'ai trouvé"
- "3 millions de hits bots en 30 jours sur cette boutique. Le merchant n'a rien vu."
- "Cette app a SUPPRIMÉ les collections de 200 boutiques. Voici comment"

Sources de hooks réels : `../../produits/MUTATIONS.md` §StoreMD (12 threads validés terrain, 600+ commentaires).

### 5.4 On-screen text

TikTok lit le texte affiché et l'utilise pour le ranking search. Toujours afficher le hook en gros au début. Et le CTA visuel ("Link in bio") à la fin.

### 5.5 Captions

- 80-150 caractères max
- Mot-clé principal au début (ex: "Shopify chargebacks", "Shopify speed", "store losing money")
- Fin de caption = CTA bref + lien UTM si placement caption (ou "link in bio")
- Pas d'em-dash, pas de "Here's the thing", pas de "At the end of the day" (cf. `../../ANTI-IA.md`)

### 5.6 Audio

- **Audio original > sound trending** en 2026
- Voix off + montage Remotion = audio original
- Si on utilise un sound trending, l'utiliser en background discret, pas comme moteur principal de la vidéo

### 5.7 Hashtags

**ZÉRO hashtag**. Aucune exception. Cf. `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` §3 et `../../BIBLE.md` §8. Le ranking 2026 passe par les keywords dans la caption/audio/text overlay, pas par les hashtags.

---

## 6. Pipeline de production vidéo

Détail dans `../contenu/pipeline-video.md`. Synthèse :

### Phase 1 — actuel (avril-mai 2026)
- Production : Remotion + Claude design (scripts générés par JARVIS, montage Remotion par F)
- Scripts hebdo : générés par JARVIS le dimanche dans le batch
- Voix off : à définir (TTS ou enregistrement R/F voix neutre — voix doit rester anonyme, pas d'identité fondateur)

### Phase 2 — pipeline AI vidéo (en construction par F)
- Pipeline génération + montage automatisé fin-en-fin
- Si fonctionnel : devient un SaaS à part entière
- Réduit le temps de production à quasi-zéro

---

## 7. Réponses commentaires (via JARVIS)

Workflow standard :
1. F ou R reçoit notification commentaire sur une vidéo `@storemd`
2. Screenshot du commentaire envoyé à JARVIS dans le chat
3. JARVIS analyse + propose 2 variantes de réponse dans la voix `@storemd` (compte produit, pas perso)
4. F ou R choisit une variante, ajuste si besoin, publie
5. JARVIS log automatiquement (pattern "engagement fait sur [post]")

**Voix `@storemd`** : neutre, factuelle, axée résultats. Pas de "we", pas de "I". Format compte produit. Concise.

**Cas particuliers** :
- Commentaire critique sur l'app → réponse honnête + invitation à essayer (lien bio)
- Commentaire question technique → réponse précise, pas de pitch
- Commentaire "interested" / "DM me" → on bascule en DM avec scan boutique sur mesure

---

## 8. Métriques à suivre

### 8.1 Stats natives TikTok (à récupérer hebdo)

| Métrique | Pourquoi |
|---|---|
| Vues totales | Reach |
| Watch time moyen + completion rate | Indicateur #1 algo. Cible : ≥70% completion sur les meilleures. |
| Shares (notamment DM) | Signal le plus fort de valeur perçue |
| Saves | Signal de valeur durable |
| Comments + leur longueur | Qualité conversation |
| Profile visits | Funnel : combien de viewers vont voir le profil |
| Bio link clicks | Funnel : combien cliquent vers le site |
| Followers gagnés | Audience accumulée |

### 8.2 Conversions (dashboard admin StoreMD)

| Métrique | Source |
|---|---|
| Visites depuis TikTok | Dashboard admin → Traffic by Source → `tiktok` |
| Visites par campagne (vidéo vs bio vs couche A vs couche B) | Dashboard admin → Traffic by Campaign |
| Installs depuis TikTok | Dashboard admin → Recent Merchants → `utm_source=tiktok` |
| Conversion rate TikTok-spécifique | Calcul : installs TikTok / visites TikTok |

### 8.3 Top et flop hebdo

JARVIS sort chaque vendredi :
- Top 3 vidéos TikTok (par installs, secondaire = engagement)
- Flop 3 vidéos TikTok (à analyser : pourquoi)
- Hooks qui ont marché (pour répliquer)

---

## 9. Anti-patterns

À ne jamais faire sur TikTok `@storemd` :

- **Personal branding** (F ou R en avant). Compte produit, pas de visage fondateur.
- **Build in public** ("voici comment on a buildé"). Le merchant s'en fout.
- **Hashtags**. Zéro, jamais.
- **Em-dash, "Here's the thing", structure "Not X, it's Y"**. Détecté IA. Cf. `../../ANTI-IA.md`.
- **Engagement bait** ("comment 'yes' si tu es d'accord"). Pénalisé par l'algo 2026.
- **Re-upload avec watermark** d'autre plateforme.
- **Sounds trending utilisés comme moteur principal**. Audio original > recycled trending sound.
- **Vidéos > 90 secondes** sauf format démo détaillé exceptionnel. Drop-off explose au-delà.
- **Engagement avec bots / fake comments**. Détecté et pénalisé.
- **Réponses commentaires en mode pitch agressif**. Concise, factuelle, utile.
- **Inventer des chiffres**. Tous les chiffres viennent de `../../produits/MUTATIONS.md` ou de scans réels. Cf. `../../BIBLE.md` §3.

---

## 10. Documents liés

- `../strategie.md` — stratégie marketing globale
- `../objectifs.md` — KPIs, jalons, seuils de pivot
- `../contenu/pipeline-video.md` — pipeline production vidéo
- `../jarvis/reponses-commentaires.md` — protocole réponses JARVIS
- `../../la-toile/la-toile.md` — schéma global, fils F1 (vidéo) et F2 (bio)
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source UTM officielle
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — couches A + B
- `../../ANTI-IA.md` — règles anti-detection IA
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
