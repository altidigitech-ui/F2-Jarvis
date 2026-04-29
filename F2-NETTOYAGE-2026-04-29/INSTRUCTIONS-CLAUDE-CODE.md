# INSTRUCTIONS POUR CLAUDE CODE

> Date : 29 avril 2026
> Auteur : Fabrice (via Claude conversationnel)
> Cible : Claude Code dans le repo `F2-Jarvis-main`

---

## 🎯 Mission

Ce dossier contient **18 fichiers** issus d'un grand nettoyage de la stratégie marketing FoundryTwo (29 avril 2026). Tu dois :

1. **Copier les 18 fichiers** dans le repo `F2-Jarvis-main` aux chemins indiqués ci-dessous
2. **Archiver les anciens fichiers** (~8 098 lignes obsolètes) selon la procédure §3
3. **Vérifier la cohérence** post-migration (§4)
4. **Commit avec message structuré** (§5)

---

## 1. Contexte du nettoyage

Avant le 29 avril 2026, la stratégie marketing était produite par un comité d'IA (Claude × Grok × GPT) et empilait des cadres conceptuels obsolètes (~11 000 lignes, 3 sources de vérité contradictoires, "12 commandements" inutilisables, cible mal définie indie hackers/freelancers/creators).

F+R ont décidé de tout repartir à zéro :
- **Cible unique** : merchants Shopify
- **Canaux** : compte produit `@storemd` (TikTok/Insta/FB) + comptes perso F+R (Reddit + groupes FB Shopify) + façade fondateurs (Twitter/LinkedIn) + launch days (PH/IH ponctuels)
- **Tracking** : dashboard admin StoreMD existant + UTM officiels `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`
- **JARVIS** comme nœud cognitif central

La nouvelle structure tient en 18 fichiers (~3 800 lignes). 54% de réduction.

**Détail complet** : voir `archives/2026-04-29_grand-nettoyage/README.md` (déjà inclus dans ce livrable).

---

## 2. Mapping des 18 fichiers à dispatcher

**Source** = chemin relatif dans CE dossier de livraison.
**Destination** = chemin relatif depuis la racine du repo `F2-Jarvis-main`.

Préserver l'arborescence à l'identique :

| # | Source (ce dossier) | Destination (repo) |
|---|---|---|
| 1 | `marketing/strategie.md` | `marketing/strategie.md` |
| 2 | `marketing/objectifs.md` | `marketing/objectifs.md` |
| 3 | `la-toile/la-toile.md` | `la-toile/la-toile.md` |
| 4 | `marketing/canaux/tiktok.md` | `marketing/canaux/tiktok.md` |
| 5 | `marketing/canaux/instagram.md` | `marketing/canaux/instagram.md` |
| 6 | `marketing/canaux/facebook.md` | `marketing/canaux/facebook.md` |
| 7 | `marketing/canaux/reddit.md` | `marketing/canaux/reddit.md` |
| 8 | `marketing/canaux/twitter.md` | `marketing/canaux/twitter.md` |
| 9 | `marketing/canaux/linkedin.md` | `marketing/canaux/linkedin.md` |
| 10 | `marketing/canaux/launch-days.md` | `marketing/canaux/launch-days.md` |
| 11 | `marketing/contenu/pipeline-video.md` | `marketing/contenu/pipeline-video.md` |
| 12 | `marketing/contenu/formats.md` | `marketing/contenu/formats.md` |
| 13 | `marketing/jarvis/reponses-commentaires.md` | `marketing/jarvis/reponses-commentaires.md` |
| 14 | `marketing/jarvis/engagement-reddit-fb.md` | `marketing/jarvis/engagement-reddit-fb.md` |
| 15 | `marketing/jarvis/prompts.md` | `marketing/jarvis/prompts.md` |
| 16 | `archives/2026-04-29_grand-nettoyage/README.md` | `archives/2026-04-29_grand-nettoyage/README.md` |
| 17 | `marketing/README.md` | `marketing/README.md` (REMPLACE l'ancien) |
| 18 | `la-toile/README.md` | `la-toile/README.md` (REMPLACE l'ancien) |

**Important** : les fichiers #17 et #18 (les README) **remplacent** des fichiers existants dans le repo. Les anciens README sont à archiver (cf. §3).

### Commandes shell pour le dispatch

```bash
# Depuis la racine du repo F2-Jarvis-main, en supposant que ce dossier de livraison
# se trouve à <PATH>/F2-NETTOYAGE-2026-04-29/

LIVR=<PATH>/F2-NETTOYAGE-2026-04-29

# 1. Créer les dossiers cibles si pas existants
mkdir -p marketing/canaux marketing/contenu marketing/jarvis
mkdir -p archives/2026-04-29_grand-nettoyage

# 2. Copier les 18 fichiers (préserve l'arborescence)
cp $LIVR/marketing/strategie.md                          marketing/strategie.md
cp $LIVR/marketing/objectifs.md                          marketing/objectifs.md
cp $LIVR/marketing/README.md                             marketing/README.md
cp $LIVR/marketing/canaux/tiktok.md                      marketing/canaux/tiktok.md
cp $LIVR/marketing/canaux/instagram.md                   marketing/canaux/instagram.md
cp $LIVR/marketing/canaux/facebook.md                    marketing/canaux/facebook.md
cp $LIVR/marketing/canaux/reddit.md                      marketing/canaux/reddit.md
cp $LIVR/marketing/canaux/twitter.md                     marketing/canaux/twitter.md
cp $LIVR/marketing/canaux/linkedin.md                    marketing/canaux/linkedin.md
cp $LIVR/marketing/canaux/launch-days.md                 marketing/canaux/launch-days.md
cp $LIVR/marketing/contenu/pipeline-video.md             marketing/contenu/pipeline-video.md
cp $LIVR/marketing/contenu/formats.md                    marketing/contenu/formats.md
cp $LIVR/marketing/jarvis/reponses-commentaires.md       marketing/jarvis/reponses-commentaires.md
cp $LIVR/marketing/jarvis/engagement-reddit-fb.md        marketing/jarvis/engagement-reddit-fb.md
cp $LIVR/marketing/jarvis/prompts.md                     marketing/jarvis/prompts.md
cp $LIVR/la-toile/la-toile.md                            la-toile/la-toile.md
cp $LIVR/la-toile/README.md                              la-toile/README.md
cp $LIVR/archives/2026-04-29_grand-nettoyage/README.md   archives/2026-04-29_grand-nettoyage/README.md

# 3. git add les nouveaux fichiers (pas encore commit, on enchaîne sur l'archivage)
git add marketing/ la-toile/ archives/
```

---

## 3. Procédure d'archivage des anciens fichiers

Les fichiers ci-dessous sont **obsolètes** et doivent être déplacés vers `archives/2026-04-29_grand-nettoyage/` (en préservant leur structure d'origine pour traçabilité).

### Liste exhaustive des fichiers à archiver

| Fichier obsolète | Lignes |
|---|---|
| `la-toile/TOILE-ASSOCI#U00c9S.md` | 711 |
| `la-toile/context.md` | 383 |
| `la-toile/coordination.md` | 570 |
| `la-toile/roadmap.md` | 293 |
| `la-toile/LA-TOILE-v3.1-Complete.docx` | binaire |
| `la-toile/toile-schema-v3.1.png` | binaire |
| `marketing/context.md` | 310 |
| `marketing/roadmap.md` | 265 |
| `growth-marketing/strategie/audit-explosion-marketing-v2.md` | 709 |
| `growth-marketing/strategie/recherche-comptes-produit-studio-FR.md` | 93 |
| `growth-marketing/strategie/strategie-expansion-generale.md` | 759 |
| `growth-marketing/strategie/strategie-ih.md` | 505 |
| `growth-marketing/strategie/strategie-linkedin.md` | 1 277 |
| `growth-marketing/strategie/strategie-ph.md` | 531 |
| `growth-marketing/strategie/strategie-twitter.md` | 647 |
| `growth-marketing/README.md` | 177 |
| `growth-marketing/context.md` | 470 |
| `growth-marketing/roadmap.md` | 244 |
| `growth-marketing/tiktok/context.md` | 30 |
| **Total** | **~8 098 lignes** + 2 binaires |

### Commandes git mv

```bash
# Depuis la racine du repo F2-Jarvis-main

# Créer la structure miroir dans archives/
mkdir -p archives/2026-04-29_grand-nettoyage/la-toile
mkdir -p archives/2026-04-29_grand-nettoyage/marketing
mkdir -p archives/2026-04-29_grand-nettoyage/growth-marketing/strategie
mkdir -p archives/2026-04-29_grand-nettoyage/growth-marketing/tiktok

# A. la-toile/ (les 6 fichiers anciens — la-toile.md et README.md ont déjà été remplacés)
git mv la-toile/TOILE-ASSOCI#U00c9S.md             archives/2026-04-29_grand-nettoyage/la-toile/
git mv la-toile/context.md                         archives/2026-04-29_grand-nettoyage/la-toile/
git mv la-toile/coordination.md                    archives/2026-04-29_grand-nettoyage/la-toile/
git mv la-toile/roadmap.md                         archives/2026-04-29_grand-nettoyage/la-toile/
git mv la-toile/LA-TOILE-v3.1-Complete.docx        archives/2026-04-29_grand-nettoyage/la-toile/
git mv la-toile/toile-schema-v3.1.png              archives/2026-04-29_grand-nettoyage/la-toile/

# Note pour les anciens README la-toile/ et marketing/ : ils ont été ÉCRASÉS par les
# nouveaux à l'étape §2 cp. Leur ancienne version est perdue (mais récupérable via git history).
# Si tu veux explicitement les archiver depuis git history :
# git show HEAD:la-toile/README.md > archives/2026-04-29_grand-nettoyage/la-toile/README-OLD.md
# git show HEAD:marketing/README.md > archives/2026-04-29_grand-nettoyage/marketing/README-OLD.md

# B. marketing/ (les 2 fichiers anciens — README.md déjà remplacé)
git mv marketing/context.md                        archives/2026-04-29_grand-nettoyage/marketing/
git mv marketing/roadmap.md                        archives/2026-04-29_grand-nettoyage/marketing/

# C. growth-marketing/strategie/ (entier — 7 fichiers)
git mv growth-marketing/strategie/                 archives/2026-04-29_grand-nettoyage/growth-marketing/

# D. growth-marketing/ racine + tiktok/context.md
git mv growth-marketing/README.md                  archives/2026-04-29_grand-nettoyage/growth-marketing/
git mv growth-marketing/context.md                 archives/2026-04-29_grand-nettoyage/growth-marketing/
git mv growth-marketing/roadmap.md                 archives/2026-04-29_grand-nettoyage/growth-marketing/
git mv growth-marketing/tiktok/context.md          archives/2026-04-29_grand-nettoyage/growth-marketing/tiktok/
```

---

## 4. Vérifications post-migration

### 4.1 Structure attendue

```bash
# Vérifier que la nouvelle structure marketing/ est en place
ls marketing/
# Attendu : README.md, strategie.md, objectifs.md, canaux/, contenu/, jarvis/

ls marketing/canaux/
# Attendu : 7 fichiers (tiktok, instagram, facebook, reddit, twitter, linkedin, launch-days)

ls marketing/contenu/
# Attendu : 2 fichiers (pipeline-video, formats)

ls marketing/jarvis/
# Attendu : 3 fichiers (reponses-commentaires, engagement-reddit-fb, prompts)

# Vérifier que la-toile/ contient seulement les 2 nouveaux fichiers
ls la-toile/
# Attendu : README.md, la-toile.md

# Vérifier que growth-marketing/ a été vidé partiellement
ls growth-marketing/
# Attendu : seulement les sous-dossiers tiktok/, linkedin/, twitter/, ih/, ph/
# (sans README.md, context.md, roadmap.md, strategie/)

ls growth-marketing/tiktok/
# Attendu : algo.md (uniquement — context.md a été archivé)

ls growth-marketing/linkedin/ growth-marketing/twitter/ growth-marketing/ih/ growth-marketing/ph/
# Attendu : algo.md + context.md (les context.md de ces dossiers sont GARDÉS,
# référencés depuis les nouveaux fichiers canaux)

# Vérifier l'archive
ls archives/2026-04-29_grand-nettoyage/
# Attendu : README.md + la-toile/ + marketing/ + growth-marketing/
```

### 4.2 Vérifier qu'aucun lien des nouveaux fichiers ne pointe vers du contenu archivé

```bash
# Les nouveaux fichiers référencent uniquement :
# - growth-marketing/{tiktok,linkedin,ih,ph,twitter}/algo.md (gardé)
# - growth-marketing/linkedin/context.md (gardé)
# - growth-marketing/twitter/context.md (gardé)
# - growth-marketing/ih/context.md (gardé)
# - growth-marketing/ph/context.md (gardé)
# - tracking/utm/StoreMD/UTM_TRACKING_LINKS.md (inchangé)
# - JARVIS.md, BIBLE.md, ANTI-IA.md (inchangés)
# - asset-brand/, produits/, romain/, fabrice/, f2/ (inchangés)

# Vérification grep : aucune référence aux fichiers archivés
grep -r "growth-marketing/strategie/" marketing/ la-toile/  # devrait être vide
grep -r "la-toile/coordination" marketing/ la-toile/         # devrait être vide
grep -r "la-toile/TOILE-ASSOCI" marketing/ la-toile/        # devrait être vide
grep -r "marketing/context.md" marketing/ la-toile/          # devrait être vide
grep -r "marketing/roadmap.md" marketing/ la-toile/          # devrait être vide
```

### 4.3 Vérifier l'absence de NFLIX et PayloadDiff (produits abandonnés)

```bash
# NFLIX = projet abandonné, ne doit plus être référencé nulle part dans la nouvelle structure
grep -ri "nflix" marketing/ la-toile/
# Attendu : aucun résultat

# PayloadDiff = abandonné aussi
grep -ri "payloaddiff\|payload diff" marketing/ la-toile/
# Attendu : aucun résultat (sauf éventuellement dans NOUVEAUX.md référencé, à vérifier au cas par cas)
```

### 4.4 Vérifier la cohérence des UTM

Tous les UTM mentionnés dans la nouvelle structure doivent venir de `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` (source officielle). Si tu trouves des UTM inventés, signale-les.

```bash
# Lister les UTM mentionnés dans les nouveaux fichiers
grep -ohr "utm_source=[a-z_]*" marketing/ la-toile/ | sort -u

# Comparer avec les valeurs canoniques du fichier UTM officiel
grep "utm_source=" tracking/utm/StoreMD/UTM_TRACKING_LINKS.md | grep -oh "utm_source=[a-z_]*" | sort -u

# Les deux listes doivent correspondre (sauf les "à ajouter" mentionnés explicitement
# dans les nouveaux fichiers comme placements à intégrer au fichier UTM officiel)
```

---

## 5. Commit suggéré

Une fois tout vérifié :

```bash
# Add tout (nouveaux + déplacés)
git add -A

# Status pour vérifier
git status

# Commit avec message structuré
git commit -m "refactor(marketing): grand nettoyage 2026-04-29 — 8 098 lignes obsolètes archivées

NOUVELLE STRUCTURE (18 fichiers, ~3 800 lignes) :
- marketing/strategie.md, objectifs.md, README.md
- marketing/canaux/ (7 fichiers : tiktok, instagram, facebook, reddit, twitter, linkedin, launch-days)
- marketing/contenu/ (pipeline-video, formats)
- marketing/jarvis/ (reponses-commentaires, engagement-reddit-fb, prompts)
- la-toile/la-toile.md (192 lignes, métaphore toile d'araignée + 33 fils UTM)
- la-toile/README.md
- archives/2026-04-29_grand-nettoyage/README.md (manifeste de l'archivage)

ARCHIVÉ (~8 098 lignes) :
- la-toile/ ancien (6 fichiers + .docx + .png)
- marketing/ ancien (context.md, roadmap.md)
- growth-marketing/strategie/ entier (7 fichiers)
- growth-marketing/{README,context,roadmap}.md
- growth-marketing/tiktok/context.md (statut suspendu)

GARDÉ INCHANGÉ :
- growth-marketing/{tiktok,linkedin,ih,ph,twitter}/algo.md (référence algorithmes plateforme)
- growth-marketing/{linkedin,ih,ph,twitter}/context.md (à reviewer plus tard)
- Tout le reste du repo (produits/, tracking/, asset-brand/, BIBLE, ANTI-IA, JARVIS, romain/, fabrice/, f2/, brain/, distribution/, strategie/)

CONTEXTE :
- Cible recentrée : merchants Shopify (vs ancienne mosaïque indie hackers/freelancers/creators)
- Tracking branché sur l'existant : UTM_TRACKING_LINKS.md officiel + dashboard admin StoreMD
- TikTok = canal #1 acquisition (compte produit @storemd) — était marqué 'suspendu' avant
- Stratégie en 2 couches parallèles (A vente directe + B recrutement beta avec lien spécial install hors store Shopify)
- JARVIS = nœud cognitif central (logging + batch + rapport hebdo)

Voir archives/2026-04-29_grand-nettoyage/README.md pour le détail complet."
```

---

## 6. Si tu trouves un problème pendant le dispatch

| Problème | Action |
|---|---|
| Un fichier source manque dans le livraison | Signaler à F+R, ne pas inventer le contenu |
| Un fichier de destination existe déjà avec un contenu différent (autre que les README à remplacer) | Stop, signaler à F+R avant de écraser |
| Un lien dans les nouveaux fichiers pointe vers un fichier inexistant | Signaler à F+R + corriger ou flag pour review |
| Un UTM mentionné n'est pas dans `UTM_TRACKING_LINKS.md` | C'est intentionnel pour les placements marqués "à ajouter au fichier UTM officiel" — ne pas alarm. Sinon signaler. |
| Conflit git lors d'un git mv (fichier source modifié) | Stop, demander à F+R. Probable que le fichier ait été modifié récemment. |

---

## 7. Validation finale après commit

Après le commit :

1. **Vérifier que JARVIS peut accéder à la nouvelle structure** :
   - Ouvrir https://f2-jarvis.vercel.app
   - Demander à JARVIS : "Lis marketing/strategie.md et résume les 3 leviers"
   - Si JARVIS répond correctement → migration OK

2. **Vérifier que les liens markdown rendent correctement** :
   - Ouvrir `marketing/README.md` dans un viewer markdown (ex: GitHub web)
   - Cliquer sur quelques liens internes (`./strategie.md`, `./canaux/tiktok.md`, etc.)
   - Tous doivent fonctionner

3. **Notifier F+R** :
   - Migration terminée, X commits poussés
   - Lien vers le commit principal
   - Confirmer : "vous pouvez maintenant tenir le brainstorm vendredi/samedi sur la nouvelle structure"

---

## 8. Stats finales attendues

| Avant | Après |
|---|---|
| ~11 000 lignes marketing | ~3 800 lignes marketing (-65%) |
| 3 sources de vérité | 1 source de vérité par sujet |
| Cible mosaïque (5+ profils différents) | Cible unique (merchants Shopify) |
| Tracking inventé (Sheet Google) | Tracking branché (dashboard admin + UTM officiels) |
| TikTok "suspendu" | TikTok canal #1 acquisition |
| 0 source de vérité visuelle pour la toile | 1 fichier (33 fils UTM tagués) |

---

## 9. Documents de référence (inchangés)

À ne pas toucher pendant la migration :

- `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — source de vérité UTM
- `BIBLE.md` — lignes rouges intégrité données
- `ANTI-IA.md` — règles anti-detection IA
- `JARVIS.md` — manuel JARVIS (35 patterns)
- `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` — règles batch + format 2-blocs
- `produits/MUTATIONS.md` — specs StoreMD
- `produits/NOUVEAUX.md` — pipeline produits 2026
- `asset-brand/FOUNDRYTWO-BRAND-BIBLE.md` — brand bible
- `asset-brand/FOUNDRYTWO-LOGO-GUIDELINES.md` — logos
- `romain/`, `fabrice/`, `f2/` — personas et leurs fichiers (VOIX.md, etc.)
- `brain/` — MemPalace + cognitive systems
- `strategie/`, `distribution/` — recherche verticals + playbooks

---

**Tu as tout ce qu'il te faut. Vas-y avec précaution. Si doute → demande à F+R avant d'écraser quoi que ce soit.**
