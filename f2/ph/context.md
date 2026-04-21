# CONTEXT PH F2 — @foundrytwo

**Dernière mise à jour :** 21 avril 2026
**Hérite de :** `ph/context.md` (stratégie PH, pre-launch, launch day, post-launch, karma, multi-produit)
**S'appuie sur :** `ph/algo.md` (mécanique plateforme, système de points, featuring, timing)
**Ce fichier contient :** les spécificités opérationnelles du compte @foundrytwo sur Product Hunt. La stratégie, le protocole launch day, le karma farming, et la cadence multi-produit sont définis dans le parent `ph/context.md` — ce fichier ne les duplique pas.

---

## 1. IDENTITÉ DU COMPTE

| Champ | Valeur |
|-------|--------|
| **Handle** | @foundrytwo |
| **Nom** | FoundryTwo |
| **Avatar** | Logo F2 sur enclume (brand bible §3) |
| **Tagline profil** | SaaS studio. 6 AI agents for Shopify merchants, agencies, creators. Currently live: StoreMD. |
| **Website** | foundrytwo.com |
| **Twitter** | @foundrytwo |
| **Makers associés** | R (Romain Delgado) + F (Fabrice Gangitano) — listés comme makers sur chaque listing |

### 1.1 Règle d'évolution du profil

| Élément | Permanent | Évolue |
|---------|-----------|--------|
| **Nom** | FoundryTwo | ❌ Ne change jamais |
| **Avatar** | Logo F2 sur enclume | ❌ Ne change que si le branding évolue |
| **Tagline** | "SaaS studio. 6 AI agents for Shopify merchants, agencies, creators." | ✅ Mettre à jour le compteur quand pertinent ("[X] AI agents shipped") |
| **Products** | — | ✅ Chaque SaaS ajouté après son lancement |
| **Website** | foundrytwo.com | ❌ Permanent |

---

## 2. QUI GÈRE LE COMPTE

| Action | Qui | Détail |
|--------|-----|--------|
| Création et configuration du profil @foundrytwo | R | Une seule fois |
| Création de chaque listing (ship page + listing final) | R | 1x par produit, 4 semaines avant le lancement |
| Rédaction de la tagline, description, maker comment | R | Au pre-launch (cf. ph/context.md §3) |
| Production des assets (gallery, GIFs, vidéo démo) | R (Canva Pro + Loom) | Au pre-launch |
| Publication du listing le jour J | R | 09:01 CET |
| Réponses aux commentaires business/growth/pricing | R | Launch day, toute la journée |
| Réponses aux commentaires techniques/stack | F | Launch day, quand disponible |
| Post-launch (export contacts, onboarding, retour d'expérience) | R | J+1 à J+7 |

**F ne publie rien sur @foundrytwo.** F intervient uniquement pour répondre aux questions techniques le jour du lancement, depuis son profil perso PH (listé comme maker). R gère tout le reste.

---

## 3. CONFIGURATION D'UN LISTING (PAR PRODUIT)

Chaque SaaS du portfolio a son propre listing sur PH sous le compte @foundrytwo. Voici la checklist de configuration pour chaque listing.

### 3.1 Ship page (pré-lancement)

| Champ | Valeur | Quand |
|-------|--------|-------|
| **Nom du produit** | StoreMD / ProfitPilot / StoreMD module Listings / ClientPulse / etc. | S-4 |
| **Tagline** | 60 caractères max. Claire, spécifique. | S-4 |
| **Logo** | Logo du produit (pas logo F2) | S-4 |
| **Description courte** | 1-2 phrases. Ce que le produit fait, pour qui. | S-4 |

La ship page collecte les "Notify me" — chaque personne inscrite reçoit une notification le jour du lancement.

### 3.2 Listing final (jour J)

| Champ | Valeur | Spécifications |
|-------|--------|---------------|
| **Tagline** | Spécifique au produit | 60 caractères max |
| **Description** | Complémente la tagline | 260 caractères max |
| **Gallery** | 3-5 GIFs/images montrant le produit en action | Hero + features + social proof + pricing. 2400x1200px, PNG < 500KB, GIFs < 3MB |
| **Vidéo démo** | Loom 3-5 min, authentique | Problème (15s) → solution (2-3 min) → features (1-2 min) |
| **Maker comment** | Structure cf. ph/context.md §4.2 | Posté dans les 60 secondes après go live |
| **Topics/tags** | Catégories PH pertinentes | 3-5 tags |
| **Liens** | Site du produit + Twitter + LinkedIn | — |
| **Makers** | R + F listés comme makers | — |

### 3.3 Taglines par produit (exemples)

| Produit | Tagline exemple |
|---------|----------------|
| StoreMD | "AI that diagnoses your Shopify store health in 60 seconds" |
| ProfitPilot | "Automated chargeback defense for Shopify merchants" |
| StoreMD module Listings | "AI rewrites your product listings based on what converts" |
| ClientPulse | "Client reporting that writes itself — for agencies" |
| ProfitPilot | "Know your real profit margin — not just revenue" |
| AdAudit | "Find out which campaign actually drove the last sale" |
| CreatorSuite | "One video → 5 platforms in 15 minutes" |
| LeadQuiz | "Interactive quizzes that qualify leads — AI-generated" |

**Règle :** La tagline parle du PRODUIT, pas du studio. Le studio est mentionné dans le maker comment, pas dans la tagline.

---

## 4. CE QUE CE FICHIER NE COUVRE PAS

Tout ce qui suit est défini dans le parent `ph/context.md` et ne doit pas être dupliqué ici :

| Sujet | Référence |
|-------|-----------|
| Stratégie karma farming (R + F) | ph/context.md §2 |
| Checklist pre-launch complète | ph/context.md §3 |
| Historique lancement #1 (LD) | ph/context.md §3.0 |
| Protocole launch day (timeline heure par heure) | ph/context.md §4 |
| Structure maker comment (template générique) | ph/context.md §4.2 |
| Communication externe (ce qu'on dit vs ne dit pas) | ph/context.md §4.3 |
| Post-launch (48h à 1 semaine) | ph/context.md §5 |
| Cadence multi-produit | ph/context.md §6 |
| Anti-patterns | ph/context.md §8 |
| Allocation du temps | ph/context.md §9 |

---

## 5. MISES À JOUR DU PROFIL ET DES LISTINGS PAR MILESTONE

| Milestone | Action | Temps |
|-----------|--------|-------|
| **Création du compte** | Setup complet : avatar, tagline, website, liens sociaux | 10 min |
| **Chaque nouveau SaaS lancé** | Nouveau listing sous @foundrytwo. Tagline profil : "[X] AI agents shipped." | Cf. launch day |
| **Badge PH obtenu** | Afficher le badge sur la landing page du produit | 5 min |
| **foundrytwo.com hub live** | Vérifier que le lien website profil pointe vers foundrytwo.com | 1 min |
| **Changement de branding** | Mettre à jour avatar profil | 2 min |

---

## 6. DOCUMENTS DE RÉFÉRENCE

| Document | Emplacement | Rôle | Statut |
|----------|-------------|------|--------|
| ph/context.md | growth-marketing/ph/ | Stratégie PH, pre-launch, launch day, post-launch, karma, multi-produit | ✅ |
| ph/algo.md | growth-marketing/ph/ | Mécanique plateforme, points, featuring, timing | ✅ |
| growth-marketing/context.md | growth-marketing/ | Stratégie globale, matrice cross-plateforme, Build My Community | ✅ |
| marketing/context.md | marketing/ | Inventaire comptes (R + F PH perso), planning R/F | ✅ |
| FOUNDRYTWO-BRAND-BIBLE.md | asset-brand/ | Identité, storytelling | ✅ |
| f2/roadmap.md | f2/ph/ | Planning PH par lancement | ✅ |
