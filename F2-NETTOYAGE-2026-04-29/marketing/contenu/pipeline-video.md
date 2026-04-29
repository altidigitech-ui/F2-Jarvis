# Pipeline vidéo — production TikTok / Insta / Facebook

> Dernière mise à jour : 29 avril 2026
> Statut : ACTIF — Phase 1 (JARVIS + Claude Design + Remotion) | Phase 2 (AI vidéo) en construction par F
> Hérite de : `../canaux/tiktok.md` + `../canaux/instagram.md` + `../canaux/facebook.md` + `../strategie.md`

---

## 1. Le goulot d'étranglement

**6 vidéos/semaine sur compte produit `@storemd`** (1/jour sauf dimanche), recyclées sur Insta + FB = 18 publications/semaine au total.

Sans pipeline automatisé, ça représente plusieurs heures de production par jour. Donc deux phases :

| Phase | Tooling | Charge F | Cadence soutenable |
|---|---|---|---|
| **Phase 1 — Actuelle (avril-mai 2026)** | JARVIS (scripts) + Claude Design (visuels) + Remotion (montage) | ~2-3h/jour | 4-6 vidéos/sem possible. À surveiller : si charge trop forte → reculer à 4/sem. |
| **Phase 2 — AI vidéo (en construction par F)** | Pipeline génération + montage end-to-end automatisé | ~30 min/jour | 6-10 vidéos/sem confortable. Pipeline peut devenir un SaaS à part. |

**Honnêteté du calibrage** : la cadence cible (6/sem) est calculée pour Phase 2. En Phase 1, on vise 4-6/sem selon la charge réelle. Mieux vaut 4 vidéos de qualité par semaine que 6 bâclées.

---

## 2. Phase 1 — workflow actuel

### 2.1 Vue d'ensemble (cycle hebdo)

```
Vendredi soir / Samedi soir
    ↓
Brainstorm F+R : angles vidéo de la semaine, hooks à tester
    ↓
Dimanche
    ↓
[ÉTAPE 1] JARVIS génère le batch hebdo (6 scripts vidéo)
    ↓
F + R relisent, valident, ajustent les scripts
    ↓
Lundi-Samedi
    ↓
[ÉTAPE 2] Claude Design génère les visuels custom (1 vidéo/jour)
    ↓
[ÉTAPE 3] F intègre les visuels dans Remotion + finalise le montage
    ↓
[ÉTAPE 4] Export sans watermark
    ↓
Publication TikTok @storemd
    ↓
Re-export adapté Insta Reels + Facebook page (même jour ou +1)
    ↓
JARVIS log automatique des publications
```

### 2.2 ÉTAPE 1 — JARVIS génère les scripts (dimanche)

À partir de :
- Inputs F+R du brainstorm vendredi/samedi (angles validés, hooks à tester, sujets prioritaires)
- Logs hebdo JARVIS (top/flop vidéos précédentes, patterns qui marchent, conversations privées en cours)
- Specs produits StoreMD (`../../produits/MUTATIONS.md` §StoreMD : 12 threads validés terrain, 600+ commentaires de référence, claims chiffrés vérifiables)
- Couches A et B actives (cf. `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md`)

JARVIS sort un fichier `BATCH-SX-VIDEOS.md` qui contient pour chaque vidéo :
- Type (Couche A vente / Couche B beta)
- Hook proposé (avec alternatives à tester)
- Script complet timing 15-45s
- Visuels nécessaires (briefs précis pour Claude Design)
- Voix off ou texte on-screen prévu
- Caption TikTok + Insta + Facebook (UTM tagué)
- Durée cible

### 2.3 Format type d'un script vidéo (sortie JARVIS)

Référence : `../canaux/tiktok.md` §5.

```
SCRIPT VIDEO — VID-S6-01 — [TYPE: Couche A vente]

Durée cible : 30 secondes
Hook (0-3s) : "This Shopify store loses $4,200/month — and the owner has no idea"
Mise en contexte (3-10s) : "I scanned 30 stores last week. The pattern keeps showing up."
Démo / résultats (10-25s) :
  - Screen scan en cours sur boutique réelle (anonymisée)
  - Findings affichés : 47 apps installed, 12 dormant subs, $340/month wasted
  - 14 ghost charges détectés sur 90 derniers jours
  - 3M bot hits sans détection
CTA (25-30s) : "Free scan, link in bio"

Briefs Claude Design (visuels à générer) :
  - Visuel 1 : Animated dashboard StoreMD scan en cours (palette Obsidian + Forge Amber)
  - Visuel 2 : Findings panel — chiffres qui apparaissent un par un, animation count-up
  - Visuel 3 : Bot hits graph timeline (Steel Blue accent)
  - Visuel 4 : CTA card "Free scan" avec sparks Ember

Voix off : oui, voix neutre (TTS ou enregistrement)
Sous-titres : OUI, obligatoire (80% TikTok son OFF)

Caption TikTok : "I scan Shopify stores for living. Here's what I find. [link in bio]"
UTM TikTok caption : utm_source=tiktok&utm_medium=organic&utm_campaign=video&utm_content=video_cta
Caption Insta : [adaptée + plus narrative — 100-300 chars]
Caption FB : [adaptée + plus longue OK — 200-500 chars]
```

### 2.4 ÉTAPE 2 — Claude Design génère les visuels custom

Claude Design est utilisé pour générer les **éléments visuels** de chaque vidéo : graphiques data animés, layouts custom, mises en scène stylisées, dashboards stylisés, animations SVG, panels findings, transitions.

**Workflow Claude Design** :
1. F prend le brief visuel du script JARVIS (cf. §2.3)
2. Demande à Claude Design de générer chaque élément visuel selon les specs
3. Itère jusqu'à obtenir le visuel cohérent (palette FoundryTwo, brand `@storemd`)
4. Récupère les éléments (SVG, composants React, images, animations)
5. Les passe à Remotion

**Avantages Claude Design vs design manuel** :
- Itération rapide (15-30 min par visuel vs 1-2h Figma + animations manuelles)
- Cohérence brand automatique si bien briefé
- Génération de variantes facile pour A/B test

**Limite Phase 1** : Claude Design ne fait pas le montage final ni l'animation timing. Remotion reste nécessaire pour l'assemblage.

**Cohérence brand obligatoire** (cf. `../../asset-brand/FOUNDRYTWO-BRAND-BIBLE.md`) à briefer dans chaque demande Claude Design :
- Background : Obsidian #0A0A0F
- Accents chauds (CTA, highlights) : Forge Amber #F59E0B
- Accents froids (data, links) : Steel Blue #3B82F6
- Texte principal : Ash White #F5F5F5
- Texte secondaire : Smoke #9CA3AF
- Sparks / glow : Ember #FBBF24
- Danger / alerte : Molten Red #EF4444
- Succès : Circuit Green #22C55E

**Logo @storemd** vs logo FoundryTwo : compte produit `@storemd` a son propre branding (icône StoreMD `storemd_icon_1200x1200.png` du repo StoreMD). Pas de F2 visible sur les vidéos compte produit. Cohérence palette générale OK.

### 2.5 ÉTAPE 3 — Remotion : montage final

[Remotion](https://www.remotion.dev) = framework React pour générer des vidéos programmatiquement. F maintient les templates StoreMD.

| Template Remotion | Usage |
|---|---|
| `scan-walkthrough.tsx` | Démo scan boutique avec findings affichés (intègre les visuels Claude Design) |
| `data-claim.tsx` | Claim chiffré + source visible (ex: Mastercard 2025 chargeback data) |
| `before-after.tsx` | Comparaison avant/après StoreMD sur une boutique |
| `tear-down.tsx` | Tear-down public d'une boutique avec annotations |
| `beta-call.tsx` | Recrutement beta (Couche B) avec urgence visuelle |

**Rôle Remotion** :
- Importer les visuels Claude Design (SVG, composants React, images)
- Animer le timing (apparition, disparition, transitions)
- Synchroniser avec voix off / musique
- Ajouter sous-titres
- Exporter en MP4

**Templates = composants React paramétrables** : F passe les visuels Claude Design + le script JARVIS comme props, le template gère le timing.

### 2.6 ÉTAPE 4 — Sous-titres (OBLIGATOIRE)

| Pourquoi | Stat |
|---|---|
| TikTok consommé son OFF par défaut | ~80% des viewers regardent muet |
| Insta Reels consommé son OFF | ~70% muet |
| Algo TikTok favorise les vidéos avec sous-titres | Bonus completion rate |
| Search keywords TikTok + Insta | Sous-titres = on-screen text indexé |

**Workflow sous-titres** :
- Phase 1 : auto-generation via Remotion + correction manuelle (CapCut auto-captioning + correction OK aussi)
- Phase 2 : intégré dans le pipeline AI

**Style sous-titres StoreMD** :
- Police : sans-serif lisible (Inter ou similaire)
- Couleur principale : Ash White
- Mots-clés highlightés : Forge Amber
- Position : centre-bas, 2/3 de la hauteur d'écran (pas trop bas, sinon mangé par l'UI TikTok)
- Taille : grande (lisibilité smartphone)

### 2.7 Voix off

Trois options à tester en Phase 1 :

| Option | Avantages | Inconvénients |
|---|---|---|
| **TTS (ElevenLabs ou similaire)** | Cadence soutenable, voix neutre | Risque "AI voice" perçu, qualité variable |
| **Enregistrement R ou F voix neutre** | Plus authentique | Charge supplémentaire, doit rester voix anonyme (pas d'identité fondateur) |
| **No voice + texte on-screen + musique** | Plus simple à produire | Moins percutant pour les démos |

**Décision pour Phase 1** : à tester sur les 4 premières semaines. JARVIS log les performances par option. La meilleure devient le standard.

**Règle absolue** : la voix doit rester **anonyme et neutre**. Pas de "je suis Fabrice", pas de "we at FoundryTwo". Compte produit @storemd = identité produit, pas fondateur.

### 2.8 Export et publication

| Plateforme | Format | Notes |
|---|---|---|
| TikTok | 9:16, 1080×1920, MP4 H.264, max 287 MB | Export direct depuis Remotion |
| Instagram Reels | 9:16, 1080×1920, MP4 H.264, max 100 MB, max 90 sec | Re-export sans watermark TikTok |
| Facebook page | 9:16 OK, 1:1 ou 16:9 acceptable, max 4 GB | Re-export sans watermark |

**Anti-watermark absolu** : aucun export depuis l'app TikTok ne doit être réuploadé sur Insta ou Facebook. Originality Score 2026 (Insta + Facebook) pénalise les Reels avec watermark TikTok. Toujours re-exporter depuis Remotion ou re-encoder.

---

## 3. Phase 2 — pipeline AI vidéo (en construction par F)

### 3.1 Objectif

Pipeline end-to-end automatisé qui prend en entrée un script JARVIS et sort une vidéo finale prête à publier.

```
Script JARVIS
    ↓
[Pipeline AI]
    ↓
Génération visuels (Claude Design programmatique ou modèles vidéo Replicate FLUX)
    ↓
Génération voix off (ElevenLabs ou modèle interne)
    ↓
Montage automatique Remotion (timing, transitions, sous-titres)
    ↓
Branding StoreMD appliqué
    ↓
Vidéo finale MP4
    ↓
Auto-upload TikTok + Insta + Facebook avec captions UTM tagués
```

### 3.2 Stack potentielle (à confirmer par F)

- Génération visuels : Claude Design en API (si dispo) ou Replicate (FLUX, modèles vidéo récents)
- Voix off : ElevenLabs ou TTS interne
- Montage : Remotion programmatique ou ffmpeg pipeline
- Sous-titres : Whisper + alignement Remotion
- Upload : APIs natives TikTok / Insta Graph / Facebook Graph (si disponibles) ou tooling tiers

### 3.3 Critères d'opérationnalité (validation par F+R)

Le pipeline est considéré opérationnel quand :
- 5 vidéos générées en interne sans intervention manuelle (test interne)
- Qualité visuelle validée par F+R en revue hebdo
- Branding @storemd cohérent et constant
- Cadence de production : 1 vidéo générée en < 30 minutes (vs 2-3h en Phase 1)

### 3.4 Pipeline = SaaS potentiel

Si le pipeline fonctionne pour StoreMD + ProfitPilot + futurs SaaS, il devient un produit autonome (potentiel "Wildcard SaaS" du pipeline M3 — cf. `../../produits/NOUVEAUX.md`).

**Décision pivot pipeline → SaaS** : à reviewer en revue hebdo F+R une fois Phase 2 opérationnelle.

---

## 4. Sources de contenu — où on prend les sujets vidéo

### 4.1 Specs produit StoreMD

Source de vérité : `../../produits/MUTATIONS.md` §StoreMD.

12 threads validés terrain, 600+ commentaires de référence. Chaque thread = un angle vidéo possible :
- Speed / page load
- App bloat / dormant subscriptions
- Chargeback friendly fraud
- Ghost charges / hidden billing
- Bot traffic / fake conversions
- Trust signals / conversion psychology
- Mobile UX / checkout friction
- Image optimization
- Inventory leaks
- Email / abandoned cart inefficiencies
- Customer service overload patterns
- Fraud filter false positives

Chaque thread a des données chiffrées vérifiables. **Tous les chiffres viennent d'ici** ou de scans réels. Pas d'invention. Cf. `../../BIBLE.md` §3.

### 4.2 Scans réels de boutiques

F+R scannent des boutiques externes pour les cold outreach. Ces scans peuvent être anonymisés et utilisés en démo vidéo (avec autorisation du merchant si scan partagé publiquement, ou sans identifiable info si pas autorisation).

Workflow :
1. Scan boutique réelle pour cold DM
2. Si finding particulièrement intéressant → JARVIS suggère un script vidéo basé sur le finding
3. Anonymisation du nom de la boutique avant la vidéo
4. Validation F+R avant production

### 4.3 Conversations terrain (Reddit / Facebook groupes / DM)

Threads merchants où les problèmes sont décrits = sources d'angles. JARVIS log ces conversations dans MemPalace, peut les ressortir au brainstorm.

### 4.4 Veille pricing / actualité

- Évolutions Shopify (nouvelles features, changements TOS, App Store changements)
- Sources data (Mastercard chargeback reports, WPP retail reports, etc.)
- Concurrents (mentions négatives = opportunités)

---

## 5. Métriques pour piloter le pipeline

### 5.1 Performance par vidéo (stats natives + dashboard admin)

Cf. `../canaux/tiktok.md` §8 + `../canaux/instagram.md` §10 + `../canaux/facebook.md` §8.

Pour chaque vidéo, JARVIS croise :
- Stats natives (vues, watch time, completion, shares, saves, comments)
- Conversions dashboard admin StoreMD (visites + installs UTM tagués)

### 5.2 Top et flop hebdo

JARVIS sort chaque vendredi :
- **Top 3 vidéos** par installs (depuis dashboard admin) — pas par vues
- **Flop 3 vidéos** par drop-off précoce (< 50% completion sur les 3 premières secondes)
- **Hooks gagnants** à répliquer (les 3 premières secondes les plus efficaces)
- **Templates Remotion gagnants** (scan-walkthrough vs data-claim vs before-after etc.)
- **Visuels Claude Design qui ont déclenché le plus d'engagement** (saves, shares)
- **Heures de publication** les plus performantes
- **Variations TikTok vs Insta vs FB** (si écart, analyser pourquoi)

### 5.3 Charge de production

Métrique honnête à suivre :
- Heures réelles de production par vidéo (Phase 1 cible < 2h, Phase 2 cible < 30 min)
- Temps Claude Design (visuels) vs temps Remotion (montage) — pour identifier le goulot
- Si > 3h en Phase 1 sur 2 semaines de suite → reculer à 4-5 vidéos/sem
- Si Phase 2 stagne > 1h → ne pas augmenter la cadence

---

## 6. Anti-patterns

### 6.1 Anti-patterns production

- **Watermark TikTok sur réuploads Insta/FB**. Originality Score = pénalité reach significative. RE-EXPORT obligatoire.
- **Vidéos sans sous-titres**. 80% TikTok son OFF, vidéo muette = drop-off immédiat.
- **Voix off identifiable F ou R**. Compte produit, pas perso.
- **Vidéos > 90 secondes** sauf format démo détaillé exceptionnel.
- **Hooks faibles (intro générique 5 secondes)**. 50% drop avant 3 secondes si hook ne marche pas.
- **Mention Altistone, La Toile, ou comptes corporate**. Ligne rouge `../../BIBLE.md` §3.
- **Visuels Claude Design sans brand cohérence** (palette aléatoire). Tout brief Claude Design DOIT inclure la palette FoundryTwo.

### 6.2 Anti-patterns contenu

- **Inventer chiffres / résultats**. Tout vient de `../../produits/MUTATIONS.md` ou de scans réels.
- **Personnaliser avec F ou R**. Compte produit pur.
- **Build in public sur compte @storemd**. Le merchant s'en fout.
- **Em-dash, "Here's the thing", "At the end of the day"**. Pattern IA. Cf. `../../ANTI-IA.md`.
- **Hashtags**. ZÉRO sur TikTok / Insta / FB.

### 6.3 Anti-patterns cadence

- **Pousser à 6/sem si Phase 1 sature à 4/sem**. Mieux vaut moins et meilleur.
- **Re-publier la même vidéo verbatim 3 plateformes** (mêmes captions identiques). Adapter caption par plateforme.
- **Publier sans logging JARVIS**. Pas de trace = pas de top/flop = pas de pilotage.

---

## 7. Roadmap pipeline (à reviewer en revue hebdo F+R)

| Étape | Statut | Owner | Cible |
|---|---|---|---|
| Templates Remotion StoreMD (5 templates) | À construire / itérer | F | Phase 1 active |
| Bibliothèque de visuels Claude Design réutilisables | À construire au fil des vidéos | F | Phase 1 active |
| Voix off : test 3 options (TTS / R / F muet) | À tester | F+R en brainstorm | 4 sem post-démarrage |
| Sous-titres auto + correction | À mettre en place | F | Phase 1 |
| Pipeline AI vidéo end-to-end | En construction | F | Cible : juillet 2026 |
| Auto-upload multi-plateformes (TikTok/Insta/FB API) | Phase 2+ | F | Cible : août 2026 |
| Décision pivot Pipeline → SaaS Wildcard | Reviewer post-Phase 2 opérationnelle | F+R | Cf. `../../produits/NOUVEAUX.md` |

---

## 8. Documents liés

- `../canaux/tiktok.md` — canal source TikTok (algo, format, cadence)
- `../canaux/instagram.md` — recyclage Reels
- `../canaux/facebook.md` — recyclage page produit
- `formats.md` — formats de contenu (vidéos, posts, threads, articles)
- `../jarvis/prompts.md` — prompts JARVIS pour génération scripts vidéo
- `../../produits/MUTATIONS.md` — spec StoreMD + 12 threads validés terrain (sources de contenu)
- `../../produits/NOUVEAUX.md` — pipeline produits + Wildcard potentiel
- `../../asset-brand/FOUNDRYTWO-BRAND-BIBLE.md` — palette + identité visuelle (à briefer Claude Design)
- `../../asset-brand/FOUNDRYTWO-LOGO-GUIDELINES.md` — logo guidelines
- `../../la-toile/la-toile.md` — schéma global, fils F1-F7 (compte produit)
- `../../tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — UTM officiels
- `../../TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — couches A + B
- `../../ANTI-IA.md` — règles anti-detection IA
- `../../BIBLE.md` §3 — lignes rouges intégrité données
- Dashboard admin StoreMD : `https://storemd.vercel.app/dashboard/admin`
- Repo StoreMD : icône produit `storemd_icon_1200x1200.png`
