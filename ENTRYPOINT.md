# ENTRYPOINT.md

> **Porte d'entrée du repo F2-Jarvis.**
> Si vous débarquez à zéro (humain ou IA), LISEZ CE FICHIER EN PREMIER.
> Temps de lecture : 10 minutes. Après ça, vous comprenez 90% du système.

**Dernière mise à jour : 21 avril 2026**

---

## En 30 secondes

Ce repo contient :

1. **F2-Jarvis** — infrastructure automatisation d'un studio SaaS indie (app web agentique + Claude Code setup + couche mémoire)
2. **FoundryTwo** — le contenu opérationnel dudit studio : stratégie, produits, marketing, distribution

Deux co-fondateurs full-time : **Romain (R, Growth)** et **Fabrice (F, CTO/Builder)**. Objectif : 6 SaaS en 3 verticales d'ici juin 2026, liberté financière août 2026.

---

## Les 4 vérités à retenir

### 1. Il y a UNE source de vérité stratégique : `strategie/CONTEXT.md`

Tous les autres documents (marketing, growth, per-compte, per-plateforme) en héritent. En cas de contradiction, **`strategie/CONTEXT.md` prime.**

### 2. Il y a UNE source de vérité produits : `produits/STATUS.md`

Portfolio officiel : **6 SaaS sur 3 verticales**.

| # | SaaS | Vertical | Mois | Statut |
|---|------|----------|------|--------|
| 1 | **StoreMD** | E-commerce | M1 avril | Live (14/04/2026) |
| 2 | ProfitPilot | E-commerce | M1 avril | Backlog |
| 3 | ClientPulse | Agences | M2 mai | Backlog |
| 4 | AdAudit | Agences | M2 mai | Backlog |
| 5 | CreatorSuite | Creators | M3 juin | Backlog |
| 6 | LeadQuiz | E-com + Coaches | M3 juin | Backlog |

**Ignorer toute autre mention de produits dans d'anciens documents.** Si un doc parle de Leak Detector, SpeedAudit, InventoryPulse, ChargebackDefender, etc. — ce sont des traces d'itérations passées, pas le portfolio actif.

### 3. Il y a UN principe qui prime sur tout : `ANTI-IA.md` (règle #0)

Aucun contenu publié ne doit échouer un détecteur IA (GPTZero, ZeroGPT, Originality). Ban Reddit/LinkedIn/Facebook = compte grillé = semaines de travail perdues.

Résumé :
- Pas d'em-dash (—) comme pivot de phrase
- Pas de "Not X — it's Y"
- Pas de listes numérotées dans les commentaires publics
- Varier la structure de phrase
- Contractions obligatoires en anglais

### 4. Il y a UN document non-négociable : `BIBLE.md`

13 principes. Fabrice seul l'édite. Claude Code ne la modifie JAMAIS sans demande explicite.

Points essentiels :
- ANTI-IA règle #0
- Altistone + la toile INVISIBLES en public
- Intégrité données stricte : pas de faux MRR, pas de testimonials inventés, pas de noms clients fictifs
- Volume × Constance : R et F font 30 interactions/jour + 10 cold/jour chacun
- Cadence : 2 SaaS/mois sur 3 verticales
- Validation explicite avant toute modif de contenu opérationnel

---

## Architecture du repo en 2 minutes

```
F2-JARVIS (repo)
│
├── INFRA AUTOMATISATION (dossiers techniques)
│   ├── ui/jarvis/        → Frontend Next.js (Vercel) — app web R et F
│   ├── backend/jarvis/   → Backend Express (Railway) — Claude Agent SDK + écritures GitHub
│   ├── brain/            → Mémoire : Ouroboros (nocturne), MemPalace (verbatim), mem0 (facts)
│   ├── .claude/          → Config Claude Code terminal : 16 skills, 7 agents, 9 commands
│   ├── ops/              → Budget, kill-switches, monitoring
│   ├── patterns/         → Décisions techniques durcies
│   ├── tracking/         → Dashboard hebdo (alimenté par Jarvis)
│   └── raw/              → Inbox brute (non versionné)
│
└── CONTENU OPÉRATIONNEL (dossiers stratégie/marketing)
    ├── strategie/        → SOURCE DE VÉRITÉ stratégique (CONTEXT, PLAYBOOK, WARMING-FARMING)
    ├── produits/         → SOURCE DE VÉRITÉ produits (STATUS, MUTATIONS, NOUVEAUX)
    ├── marketing/        → Marketing macro
    ├── growth-marketing/ → Algos par plateforme (twitter, linkedin, ih, ph, tiktok)
    ├── distribution/     → Reddit + Facebook
    ├── f2/               → Compte studio @foundrytwo (R gère)
    ├── romain/           → R — full-time growth
    ├── fabrice/          → F — full-time tech
    ├── saas/             → Contextes par SaaS
    ├── la-toile/         → Architecture réseau (Altistone INVISIBLE)
    ├── asset-brand/      → Brand bible, logo, guidelines
    └── archives/         → Historique
```

---

## Les 2 systèmes distincts sous le même repo

### Système 1 : F2-Jarvis (l'infra / l'automatisation)

**Ce que c'est :** une app web agentique que R et F utilisent en navigateur pour tracker leurs activités réseaux et chatter avec un Claude personnalisé.

**Comment ça marche :**
- Écran d'accueil : "Qui êtes-vous ? Romain / Fabrice"
- Chaque persona a son dashboard : timeline du jour, compteurs (cold, engagement, cross), alertes, chat
- Le chat utilise Claude Agent SDK avec 9 tools (lecture repo, écriture repo, recherche, timeline, counters, propose_action, etc.)
- Pattern **Propose → Validate → Execute** : Claude ne commit jamais seul. Il propose une action, user valide via bouton, backend exécute.

**Dossiers :** `ui/jarvis/` (frontend), `backend/jarvis/` (backend), `brain/` (mémoire), `ops/` (budget).

**Documentation détaillée :** `ui/jarvis/README.md`, `backend/jarvis/README.md`.

### Système 2 : FoundryTwo (le contenu opérationnel)

**Ce que c'est :** la documentation stratégique et les plans d'exécution du studio SaaS.

**Objectifs :**
- 6 SaaS en 3 verticales (e-com, agences, creators) d'ici juin 2026
- Distribution-first, sales-mode dominant
- Volume × constance : 30 interactions/jour + 10 cold/jour par personne
- Intégrité stricte : pas de faux MRR, pas de testimonials inventés

**Dossiers :** `strategie/`, `produits/`, `marketing/`, `growth-marketing/`, `f2/`, `romain/`, `fabrice/`, `distribution/`, `la-toile/`, `asset-brand/`, `saas/`.

**Documentation détaillée :** `strategie/CONTEXT.md` + `produits/STATUS.md`.

---

## Workflow hebdo

```
Vendredi soir    → Revue semaine + début batch
Samedi 18h-21h   → Batch complet (R + F ensemble) : tous les posts, visuels, UTM, newsletter prête
Dimanche         → Archivage, réinitialisation
Lundi-Vendredi   → Exécution zéro rédaction (copier-coller depuis batch)
                 → 30 interactions/jour + 10 cold/jour chacun
                 → Cross-engagement <5 min après chaque publication
```

BATCH actif : `BATCH-SEMAINE-N.md` à la racine du repo. Archivé dimanche soir dans `archives/batches/`.

---

## Ce qu'il faut IGNORER

Si vous tombez sur ces éléments en lisant d'anciens documents, ils sont **obsolètes** :

- Toute mention de **Leak Detector, ChargebackDefender, PriceRadar, ReviewPulse, AdWatcher, BriefForge, ContentFlow, InvoiceGuard, DataMerge, SpeedAudit, InventoryPulse, AdScoreAI, EmailCleanup, ReportFlash, ClipEngine, ThumbnailRank, CaptionDraft** — anciens portfolios. Le vrai portfolio = 6 SaaS listés plus haut.
- Toute référence à `growth-marketing/{plateforme}/{compte}/...` — arborescence fantôme. Les vrais fichiers sont dans `{personne}/{plateforme}/`.
- Toute mention de **"Real numbers, real failures"** ou **"Building in public"** comme positionnement principal. Depuis avril 2026, on est en **sales-mode dominant**. Build-in-public réservé au format vendredi F2 Studio Update.
- Toute mention de **TikTok actif** comme canal — il est **suspendu** jusqu'à ce que F finisse le pipeline vidéo.

---

## Par où commencer concrètement

**Si vous êtes une IA qui doit aider R ou F sur une tâche :**
1. Lire `BIBLE.md` + `ANTI-IA.md` (principes)
2. Lire `strategie/CONTEXT.md` (où on va)
3. Lire `produits/STATUS.md` (ce qu'on a)
4. Lire `{persona}/VOIX.md` + `{persona}/context.md` selon qui vous aidez
5. Consulter `BATCH-SEMAINE-N.md` pour savoir ce qui se joue cette semaine

**Si vous êtes R ou F ouvrant votre journée :**
1. Ouvrir l'app web F2-Jarvis → dashboard persona
2. Lire `/morning` (si Claude Code terminal) ou le chat Jarvis
3. Exécuter les publications du jour (déjà préparées au batch samedi)
4. 30 interactions + 10 cold + cross-engagement

**Si vous voulez faire évoluer l'infra F2-Jarvis :**
1. Lire `ui/jarvis/README.md` + `backend/jarvis/README.md`
2. Respecter BIBLE.md §13 (Ouroboros bridé)
3. Respecter BIBLE.md §11 (budget 30€/mois max hors plan)

---

## Notes finales

- Le repo est **opérationnel et vivant**. Il évolue chaque semaine.
- **Principe d'intégrité BIBLE.md §3** : zéro tolérance sur faux MRR, testimonials inventés, noms clients fictifs.
- Les archives (`archives/`, `{persona}/archives/`) contiennent l'historique. Ne pas les modifier.
- Pour toute ambiguïté, **demander à Fabrice** avant d'agir.

Bienvenue. Maintenant vous pouvez naviguer le repo sans vous perdre.
