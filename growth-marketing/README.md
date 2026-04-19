# GROWTH MARKETING — Guide de Navigation

**Dernière mise à jour :** 04 avril 2026

Ce dossier contient tout ce qui concerne l'engagement, le contenu, la construction de communauté et les lancements de FoundryTwo sur les réseaux sociaux et plateformes de découverte. Il ne couvre PAS le marketing macro (pipeline SaaS, funnel, cold outreach process, cadence journalière R/F) — ça c'est dans `../marketing/context.md` et `../marketing/roadmap.md`. La distribution terrain Reddit/Facebook est dans `../distribution/` + `../romain/{reddit,facebook}/` + `../fabrice/{reddit,facebook}/`.

---

## 1. CONVENTION DE NOMMAGE

Chaque plateforme suit la même structure de fichiers :

| Fichier | Rôle |
|---------|------|
| **algo.md** | Comment l'algorithme de la plateforme fonctionne. Données factuelles, pas de stratégie. Sources citées. |
| **context.md** | Stratégie et règles opérationnelles sur la plateforme. Hérite du context.md parent. |
| **roadmap.md** | Planning par phases avec milestones, checkpoints, métriques. Hérite du context.md de la même plateforme. |

Chaque plateforme a des sous-dossiers par compte :

| Dossier | Contenu |
|---------|---------|
| **romain/** | Context + roadmap spécifiques au compte personnel de R sur cette plateforme. |
| **fabrice/** | Context + roadmap spécifiques au compte personnel de F sur cette plateforme. |
| **f2/** | Context + roadmap spécifiques au compte studio @foundrytwo sur cette plateforme. |

Toutes les plateformes n'ont pas les 3 sous-dossiers. IH et PH n'ont que f2/ (un seul compte @foundrytwo). Twitter et LinkedIn ont les 3.

Grok prompts : 1 prompt par vertical (ECOM, AGENCY, CREATOR) dans les sous-dossiers grok/.

---

## 2. HIÉRARCHIE D'HÉRITAGE

```
marketing/context.md (source de vérité : funnel, comptes, pipeline 6 SaaS, cold outreach)
    │
    └── growth-marketing/context.md (stratégie engagement, piliers contenu, 
        │                             Build My Community, matrice cross-plateforme,
        │                             4 personas : merchants, agences, creators, builders)
        │
        ├── growth-marketing/roadmap.md (coordination cross-plateforme, 
        │                                 allocation temps consolidée R+F)
        │
        ├── twitter/
        │   ├── algo.md (algorithme Twitter, données factuelles)
        │   ├── context.md (règles communes Twitter R/F/F2)
        │   │   ├── romain/context.md → romain/roadmap.md
        │   │   ├── fabrice/context.md → fabrice/roadmap.md
        │   │   └── f2/context.md → f2/roadmap.md
        │
        ├── linkedin/
        │   ├── algo.md (algorithme LinkedIn, données factuelles)
        │   ├── context.md (règles communes LinkedIn R/F/F2)
        │   │   ├── romain/context.md → romain/roadmap.md
        │   │   ├── fabrice/context.md → fabrice/roadmap.md
        │   │   └── f2/context.md → f2/roadmap.md
        │
        ├── ih/
        │   ├── algo.md (algorithme IndieHackers, données factuelles)
        │   ├── context.md (règles IH, voix, engagement communautaire)
        │   │   └── f2/context.md → f2/roadmap.md
        │
        ├── ph/
        │   ├── algo.md (algorithme Product Hunt, données factuelles)
        │   ├── context.md (stratégie PH, pre-launch, launch day, karma)
        │   │   └── f2/context.md → f2/roadmap.md
        │
        └── tiktok/ (⏳ TODO)
            ├── algo.md
            ├── context.md
            └── f2/context.md → f2/roadmap.md
```

**Règle d'héritage :** chaque fichier enfant hérite de son parent et ne duplique JAMAIS le contenu du parent. Si une règle est dans `growth-marketing/context.md`, elle n'est pas répétée dans `twitter/context.md`. Si une stratégie est dans `twitter/context.md`, elle n'est pas répétée dans `twitter/romain/context.md`.

---

## 3. INDEX COMPLET

### 3.1 Fichiers racine

| Fichier | Rôle | Statut |
|---------|------|--------|
| context.md | Stratégie globale : piliers de contenu, Build My Community, frameworks engagement/provocation/réponse, 4 segments persona (merchants, agences, creators, builders), matrice cross-plateforme, allocation temps R+F, anti-patterns, phases par vertical, UTM tracking, revue hebdomadaire. | ✅ |
| roadmap.md | Coordination cross-plateforme : vue consolidée phases × plateformes × verticals, impact des lancements SaaS sur chaque canal, allocation temps totale R+F, milestones cross-plateforme. | ✅ |
| README.md | Ce fichier. | ✅ |

### 3.2 Twitter (3 comptes : R, F, F2 + comptes produits au fur et à mesure)

| Fichier | Rôle | Statut |
|---------|------|--------|
| twitter/algo.md | Algorithme Twitter/X 2026. Reply author 150x, golden window, signaux de ranking. | ✅ |
| twitter/context.md | Règles communes Twitter : rôle de chaque compte, protocole cross-engagement, règles de publication, timing, routine pré-post, formats, Tweep Cred, métriques, Premium, anti-patterns. | ✅ |
| twitter/romain/context.md | Compte @delgado_ro72224 : identité, voix, bio, squelette éditorial, cold outreach angle growth e-com & agences, qui gère. | ✅ |
| twitter/romain/roadmap.md | Roadmap Twitter R : 3 phases (avril → juin+), milestones, checkpoints, métriques. | ✅ |
| twitter/fabrice/context.md | Compte @FabGangi : identité, voix, bio, squelette éditorial, cold outreach angle technique e-com & creators, qui gère. | ✅ |
| twitter/fabrice/roadmap.md | Roadmap Twitter F : 3 phases, mêmes volumes que R. | ✅ |
| twitter/f2/context.md | Compte @foundrytwo : identité studio, squelette éditorial 5j/sem portfolio, cross-engagement, qui gère. | ✅ |
| twitter/f2/roadmap.md | Roadmap Twitter F2 : 3 phases, cadence multi-produit multi-vertical. | ✅ |

### 3.3 LinkedIn (3 comptes : R, F, page F2)

| Fichier | Rôle | Statut |
|---------|------|--------|
| linkedin/algo.md | Algorithme LinkedIn 2026. Depth Score, dwell time, commentaires 15+ mots, saves/sends, golden hour. | ✅ |
| linkedin/context.md | Règles communes LinkedIn : rôle de chaque compte, langue anglaise, engagement à valeur (méthode complète), timing, formats, profil optimisé, anti-patterns. | ✅ |
| linkedin/romain/context.md | Profil Romain Delgado : identité, Topic DNA growth multi-vertical, headline, About, squelette éditorial, qui gère. | ✅ |
| linkedin/romain/roadmap.md | Roadmap LinkedIn R : 3 phases, cadence multi-produit multi-vertical. | ✅ |
| linkedin/fabrice/context.md | Profil Fabrice Gangitano : identité, Topic DNA technique multi-vertical, headline, About, squelette éditorial, qui gère. | ✅ |
| linkedin/fabrice/roadmap.md | Roadmap LinkedIn F : 3 phases, mêmes volumes que R. | ✅ |
| linkedin/f2/context.md | Page company FoundryTwo : vitrine crédibilité uniquement, 0 contenu original, 0-1 repost/sem. | ✅ |
| linkedin/f2/roadmap.md | Roadmap LinkedIn F2 : milestones par événement (pas par phase), < 15 min/mois. | ✅ |

### 3.4 IndieHackers (1 compte : @foundrytwo)

| Fichier | Rôle | Statut |
|---------|------|--------|
| ih/algo.md | Algorithme IH 2026. Commentaires = signal #1, meilleur jour jeudi, formats, taux de conversion 23.1%. | ✅ |
| ih/context.md | Stratégie IH : voix, contenu, engagement communautaire, profil, allocation temps, anti-patterns. | ✅ |
| ih/f2/context.md | Compte @foundrytwo IH : identité, squelette éditorial portfolio, qui gère. | ✅ |
| ih/f2/roadmap.md | Roadmap IH F2 : 3 phases, cadence multi-produit multi-vertical (Show IH par SaaS, updates portefeuille). | ✅ |

### 3.5 Product Hunt (1 compte : @foundrytwo + profils perso R/F pour karma)

| Fichier | Rôle | Statut |
|---------|------|--------|
| ph/algo.md | Algorithme PH 2026. Système de points ≠ upvotes, featuring (10%), karma, 4 premières heures, timing, badges. | ✅ |
| ph/context.md | Stratégie PH : karma farming, pre-launch (4-8 sem), protocole launch day 24h, post-launch, cadence multi-produit, anti-patterns. | ✅ |
| ph/f2/context.md | Compte @foundrytwo PH : identité, configuration listing par produit, qui gère, milestones. | ✅ |
| ph/f2/roadmap.md | Roadmap PH F2 : par lancement (pas par phase), karma farming continu, checkpoints par lancement. | ✅ |

### 3.6 TikTok (⏳ TODO — reporté)

| Fichier | Rôle | Statut |
|---------|------|--------|
| tiktok/algo.md | — | ⏳ TODO |
| tiktok/context.md | — | ⏳ TODO |
| tiktok/f2/context.md | — | ⏳ TODO |
| tiktok/f2/roadmap.md | — | ⏳ TODO |

TikTok est reporté. Il sera activé quand la routine des canaux principaux (Twitter, LinkedIn, IH, PH) sera intégrée et que de la social proof + des données réelles seront disponibles.

---

## 4. PAR OÙ COMMENCER

### Première lecture (comprendre la stratégie)

1. `context.md` — Le playbook. Piliers de contenu, Build My Community, frameworks, 4 personas (merchants, agences, creators, builders), matrice cross-plateforme.
2. `roadmap.md` — La coordination. Vue consolidée de ce qui se passe où et quand sur les 3 verticals.

### Comprendre une plateforme spécifique

1. `[plateforme]/algo.md` — Comment l'algorithme fonctionne.
2. `[plateforme]/context.md` — La stratégie sur cette plateforme.
3. `[plateforme]/[compte]/context.md` — Les spécificités du compte.
4. `[plateforme]/[compte]/roadmap.md` — Le planning du compte.

### Préparer un lancement SaaS

1. `roadmap.md` §2.2 — Coordination cross-plateforme d'un lancement (process générique).
2. `ph/context.md` §3 et §4 — Pre-launch et launch day PH.
3. `ph/f2/roadmap.md` — Checklist par lancement.
4. `ih/f2/roadmap.md` — Show IH pour le nouveau produit.

---

## 5. DOCUMENTS PARENTS (HORS DE CE DOSSIER)

| Document | Emplacement | Ce qu'il contient |
|----------|-------------|-------------------|
| marketing/context.md | marketing/ | Source de vérité : funnel, inventaire comptes, pipeline 6 SaaS, cold outreach process par vertical, rôles par compte. |
| marketing/roadmap.md | marketing/ | Plan macro : vision semestre/trimestre/mois, cadence journalière R/F (horaires), tous canaux. |
| la-toile/context.md | la-toile/ | Architecture de visibilité de l'écosystème. |
| FOUNDRYTWO-BRAND-BIBLE.md | asset-brand/ | Identité visuelle, storytelling, voix du studio. |
| `produits/` | Racine | **Source de vérité produits** (STATUS, NOUVEAUX, MUTATIONS). |
| `distribution/` + `romain/{reddit,facebook}/` + `fabrice/{reddit,facebook}/` | Racine | Distribution terrain Reddit/Facebook. |
