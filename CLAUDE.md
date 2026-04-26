# F2-Jarvis : OS du studio FoundryTwo

> Instructions permanentes pour Claude Code. Ce fichier est lu à chaque session.
> `BIBLE.md` contient les principes non-négociables (lecture obligatoire aussi).
> Dernière mise à jour : 21 avril 2026.

---

## §0 : RÈGLE CRITIQUE : ANTI-DÉTECTION IA

**PRIME SUR TOUT LE RESTE.** Voir `ANTI-IA.md` à la racine : source de vérité complète.

Résumé applicable à tout contenu généré par Claude (R, F, F2) :

1. Em-dash ( : ) interdit dans les posts/replies/commentaires.
2. Structure "Not X : it's Y" interdite (et toutes ses variantes).
3. Pas de listes numérotées ni de markdown dans les commentaires publics.
4. Varier la structure de phrase (longueurs, ouvertures, registre).
5. Self-check obligatoire avant publication : si un passage pourrait sortir d'un détecteur IA (GPTZero, ZeroGPT, Originality), le réécrire.

Un ban Reddit/LinkedIn/Facebook = compte grillé = semaines de travail perdues.

---

## §1 : Ce repo : F2-Jarvis

Ce repo s'appelle **F2-Jarvis**. C'est l'OS du studio **FoundryTwo**.

- **F2-Jarvis** = repo GitHub. Il contient l'infrastructure AI (`.claude/`, `brain/`, `ops/`, `patterns/`, `raw/`, `ui/`) ET le contenu opérationnel (`strategie/`, `produits/`, `marketing/`, `f2/`, `romain/`, `fabrice/`, `saas/`, etc.).
- **FoundryTwo** = identité publique du studio, ses SaaS, ses comptes sociaux.

**Utilisateurs du repo :**
- **R** : Romain Delgado, Growth, full-time. Ouvre `romain/`.
- **F** : Fabrice Gangi, CTO/builder, full-time. Ouvre `fabrice/` et utilise Claude Code pour l'infra.
- **Claude Code** : assistant interactif que F utilise en terminal (plan Max 5x). Il lit ce CLAUDE.md et BIBLE.md à chaque session, charge les skills always-on, et exécute les slash commands.
- **Ouroboros** : conscience de fond bridée, 1 cycle/nuit, read-only repo, propose dans `brain/ouroboros/proposals/`.
- **8 agents spécialisés** : f2-architect, f2-dev, f2-designer, f2-marketer, f2-auditor, f2-librarian, f2-accountant, f2-thinker.

**Stratégie :** 2 SaaS/mois sur 3 verticals (e-commerce, agences/freelancers, content creators). Méthode distribution-first. Pivot stratégique du 03/04/2026 a unifié les anciens repos FT (brand) + CDV (distri) + F2-Jarvis (infra).

**Contenu :** documentation opérationnelle en .md (les SaaS vivent en submodules, pas de code applicatif ici). Arbre ASCII dans `ARCH.md`. Navigation dans `README.md`.

---

## §2 : Méthode & Principes fondamentaux

### Méthode

```
COMMUNAUTÉ → DOULEUR → VALIDATION (10 signups/48h) → BUILD → DISTRIBUTION (VOLUME × CONSTANCE) → REPEAT
```

### Principes

1. **Complexité = moat.** Ne jamais filtrer par complexité technique. Un problème dur = barrière à l'entrée.
2. **Distribution-first.** Jamais de build sans validation communauté (10+ signups en 48h).
3. **Volume × Constance non-négociable.** R : 30 interactions/jour. F : 30/jour. Zéro exception.
4. **Problèmes à 10K$/an minimum.** Pricing reflète la douleur, pas la feature.
5. **Cible NON-dev uniquement.** Jamais de produit pour codeurs.
6. **Chaque SaaS = un AGENT.** LLM + webhooks + notifications push. PWA sur tout.

---

## §2bis : Qui gère quoi

### Romain (R)
- Compte studio `@foundrytwo` (publication F2)
- Ses comptes perso : Twitter, LinkedIn, Reddit, Facebook, ProductHunt
- Positionnement : Growth/CRO, e-commerce + agences/freelancers

### Fabrice (F)
- Ses comptes perso : Twitter, LinkedIn, Reddit, Facebook, ProductHunt
- Infra technique (code SaaS, F2-Jarvis infra)
- Positionnement : Builder technique, e-commerce + content creators

### Compte studio @foundrytwo (F2)
- Géré par R
- Canaux : Twitter, LinkedIn, IndieHackers, ProductHunt, TikTok (différé)
- Rôle : hub central, sales-mode dominant, Friday Studio Update (build-in-public format réservé, règle stricte BIBLE.md §3), milestones

---

## §3 : Structure du repo

```
F2-Jarvis/
├── CLAUDE.md                 ← CE FICHIER
├── BIBLE.md                  ← Principes non-négociables
├── README.md                 ← Navigation
├── ARCH.md                   ← Arbre ASCII généré
├── ANTI-IA.md                ← Règle #0
├── VISUELS.md                ← Algo visuel
├── AUDIT.md                  ← Audit du repo
├── TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md  ← Rules batch + template double-couche
│
│  ─── INFRASTRUCTURE AI (F2-Jarvis) ───
├── .claude/                  ← Config Claude Code : skills/ (17), agents/ (8), commands/ (11), hooks/ (8)
├── brain/                    ← Mémoire persistante : ouroboros/ (bridé), mempalace/ (verbatim), mem0/ (facts)
├── ops/                      ← Discipline : budget/, monitoring/, kill-switches/
├── patterns/                 ← Patterns techniques décisionnels (7 entrées)
├── raw/                      ← Inbox brute (transcripts, screenshots) : non-versionné par défaut
├── ui/                       ← Frontends internes : jarvis/ (app Vercel), brain-3d/, web/
├── backend/                  ← Backends : jarvis/ (Express Railway, vrai cerveau Jarvis)
│
│  ─── CONTENU OPÉRATIONNEL (FoundryTwo) ───
├── strategie/                ← Source de vérité stratégique (CONTEXT, PLAYBOOK-DISTRIBUTION, WARMING-FARMING, STRATEGIE-BETA-TESTERS, verticals/)
├── produits/                 ← Source de vérité produits (STATUS, MUTATIONS, NOUVEAUX, PRINCIPES-ANTI-CONCURRENTS)
├── marketing/                ← Marketing macro (funnel, pipeline)
├── growth-marketing/         ← Algos + context par plateforme (twitter, linkedin, ih, ph, tiktok)
├── distribution/             ← Règles communes + PLAYBOOK_DISTRI_3_VERTICAL
│
├── f2/                       ← Compte studio @foundrytwo (R le gère)
├── romain/                   ← R : {twitter, linkedin, reddit, facebook, ph, cold, engagement, publication, tracking, archives, semaine-*}
├── fabrice/                  ← F : {twitter, linkedin, reddit, facebook, ph, cold, engagement, publication, tracking, archives, semaine-*}
│
├── saas/                     ← Contexte par SaaS (référence produits/ pour détails)
├── la-toile/                 ← Architecture de visibilité (Altistone INVISIBLE en public)
├── asset-brand/              ← Identité de marque, logos
├── tracking/                 ← Dashboard hebdo, decisions-log, UTM, Growth-Tracker.xlsx
└── archives/                 ← Plan-hebdo et progress-semaine archivés racine
```

---

## §4 : Sources de vérité

| Fichier | Rôle |
|---------|------|
| `BIBLE.md` | Principes non-négociables (intouchable, Fabrice seul édite) |
| `ANTI-IA.md` | Règle #0 anti-détection |
| `strategie/CONTEXT.md` | Stratégie globale + TOILE |
| `produits/STATUS.md` | Portefeuille produits (features, mutations, pricing) |
| `produits/MUTATIONS.md` | Décisions de mutation SaaS (fusions, kills, pivots) |
| `VISUELS.md` | Algorithme visuel |
| `f2/context.md`, `romain/VOIX.md`, `fabrice/VOIX.md` | Identité et voix par compte |
| `brain/ouroboros/identity.md` + `bible.md` | Constitution Ouroboros |
| `ops/budget/limits.yaml` | Caps et alertes budget |
| `ops/monitoring/model-tier-rules.yaml` | Routage Haiku/Sonnet/Opus |
| `AUDIT.md` | Checklist des résidus du merge (à supprimer après validation finale) |
| `ARCH.md` | Arbre ASCII actuel du repo |
| `README.md` | Navigation complète du repo |
| `TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` | Rules obligatoires pour tout batch + template structure double-couche |
| `strategie/STRATEGIE-MID-S6-BETA-TESTERS.md` | Mécaniques conversion mid-funnel (beta, cold scan proactif, Pro ciblé) |

---

## §5 : Infrastructure AI F2-Jarvis

> **Pour une doc détaillée, voir :**
> - `ui/jarvis/README.md` : Frontend web
> - `backend/jarvis/README.md` : Backend Railway
> - `brain/README.md` : Couche mémoire
> - `.claude/README.md` : Config Claude Code
> - `ops/README.md` : Budget & kill-switches

### Skills (`.claude/skills/`, 16 total)

**Always-on** (chargés à chaque session) : `graphify` (knowledge graph du repo), `handoff-writer` (HANDOFF.md auto), `f2-brand-voice` (voix F2).

**On-demand** (activés par contexte ou slash command) :
- Design : `ui-ux-pro-max`, `frontend-design`, `shadcn-ui`, `web-interface-guidelines`, `web-accessibility`, `brain-3d-renderer`
- Stack : `shopify-gql`, `supabase-rls`, `stripe-integration`
- Marketing : `marketing-fr` (voix Romain), `marketing-en` (voix Fabrice)
- Ops : `saas-launch-checklist`, `context-md-generator`

Quand F demande du UI : activer dans l'ordre `ui-ux-pro-max` → `frontend-design` → `shadcn-ui` → `web-interface-guidelines` + `web-accessibility`.

### Agents spécialisés (`.claude/agents/`, 8 total)

À déléguer via la Task tool pour isoler le contexte.

| Agent | Rôle | Modèle |
|-------|------|--------|
| `f2-architect` | Décisions techniques, trade-offs | Sonnet |
| `f2-dev` | Implémentation code production-ready | Sonnet |
| `f2-designer` | UI/UX (charge les 4 skills design) | Sonnet |
| `f2-marketer` | Posts, UTM, voix R/F | Sonnet |
| `f2-auditor` | Post-mortem, audit fin de cycle | Sonnet |
| `f2-librarian` | Retrieval dans le repo | Haiku |
| `f2-accountant` | Budget, tokens, coûts | Haiku |
| `f2-thinker` | Analyse profonde, décisions stratégiques (profil deep) | Sonnet |

### Slash commands (`.claude/commands/`, 11 total)

- `/morning` : brief du jour (état SaaS, décisions en attente, posts à publier, 3 priorités)
- `/status` : état complet F2 (plus long que /morning)
- `/launch <saas>` : checklist de lancement
- `/debrief` : post-mortem structuré via f2-auditor
- `/graphify-all` : réindexation Graphify (`--force` pour full rebuild)
- `/budget` : dépenses tokens par service
- `/review-proposals` : valide/rejette les propositions Ouroboros
- `/jarvis` : meta-commandes (status système, reload skills)
- `/handoff` : écrit HANDOFF.md pour session suivante
- `/cognition` : gestion du contexte cognitif (load, status, reset)
- `/think <question>` : analyse profonde via f2-thinker (profil deep)

### Hooks (`.claude/hooks/`, 8 total)

`budget-check.sh`, `mempalace-save.sh` (session save auto), `post-commit-graphify.sh`, `pre-tool-use-graphify.sh`, `precompact-save.sh`, `precompact-save-cognitive.sh` (état cognitif pré-compaction), `session-stop-handoff.sh`, `session-stop-cognitive.sh` (état cognitif fin de session).

### Brain : mémoire persistante (`brain/`)

- **Ouroboros** (`brain/ouroboros/`) : conscience de fond BRIDÉE. Lit le repo en R/O, écrit UNIQUEMENT dans `proposals/`, `diary/`, `state/`. 1 cycle/nuit (2h-5h CEST, Haiku, 10-30 min, ~0,30 €/cycle). Kill-switch `ops/kill-switches/ouroboros.flag`. Fabrice valide via `/review-proposals`.
- **MemPalace** (`brain/mempalace/`) : archive verbatim. Wings (SaaS/personnes) → Rooms (jour/session) → Drawers (contenu). Semantic search local (ChromaDB), 0 API/query.
- **Mem0** (`brain/mem0/`) : extraction faits structurés (JSONL). Optionnel V1.

### Budget & model tiering (`ops/`)

- **Plan** : Anthropic Max 5x (100 $/mois ≈ 90 €). Budget incrémental hors plan : **30 €/mois** max.
- **Caps par service** : ouroboros 10 €, graphify 5 €, mempalace 2 €, mcp_external 8 €, buffer 5 €.
- **Model tiering** : **Haiku par défaut** (retrieval, résumé, classification, tagging). **Sonnet** pour code, archi, créatif. **Opus** UNIQUEMENT si le prompt contient "opus", "ultrathink", "critical decision", ou `--model opus`. Jamais d'auto-escalade.
- **Cache** : TTL 1h pour CLAUDE.md, BIBLE.md, skills always-on. TTL 5min pour skills on-demand. Détails `ops/monitoring/cache-policy.md`.

### Kill-switches (`ops/kill-switches/`)

`ouroboros.flag`, `graphify.flag`, `mempalace.flag`, `global.flag`. Auto-activés par `f2-accountant` si budget dérive (90 % → ouroboros, 100 % → global).

### Context Cognitif : `brain/context-cognitif/`

77 primitives cognitives organisées en 10 couches concentriques. Elles définissent COMMENT l'agent pense, pas CE QU'IL fait.

- **Chargement :** skill `cognitive-loader` (on-demand). Budget : 5000 tokens/session, 5 fichiers max.
- **Profils :** `technical`, `creative`, `social`, `strategic`, `debug`, `deep`.
- **Commandes :** `/cognition` (gestion du contexte cognitif), `/think` (analyse profonde via f2-thinker).
- **Subagent :** `f2-thinker` : moteur de réflexion profonde (Sonnet, mémoire projet, profil deep).
- **Cartographie :** `brain/context-cognitif/ARCH.md`
- **Hooks :** PreCompact + Stop sauvegardent l'état cognitif dans `.usage-logs/`.
- **Règle :** les cognitifs informent le raisonnement. Ils ne remplacent jamais `BIBLE.md`, `CLAUDE.md` ou `ANTI-IA.md`. En cas de contradiction → les fichiers supérieurs priment.

---

## §6 : Règles transversales

1. **Héritage strict (no-duplication).** Chaque fichier hérite de son parent. Ne jamais dupliquer le contenu du parent dans l'enfant. En-tête obligatoire : `Hérite de : [parent]/context.md` + `Ce fichier contient : [ajouts uniquement]`.
2. **Langue.** Documents internes en français. Rédaction publique (posts, replies, cold outreach) en anglais. Marché cible US/EU.
3. **Validation obligatoire pour le contenu opérationnel.** Aucun post, décision, plan hebdo, modif de structure créé/modifié/supprimé sans "validé", "go", ou "ok" explicite. L'infra AI (skills, hooks, debug read-only) ne requiert pas cette validation.
4. **Volume × Constance.** R : 30 interactions/jour + 10 cold outreach/jour + 7 posts/sem. F : 30 interactions/jour + 10 cold outreach/jour + 5 posts/sem. Non-négociable.
5. **Cible NON-dev.** Aucun produit pour codeurs. Build in public peut exposer le code (angle F), mais le produit cible un non-dev.
6. **Zéro donnée inventée.** Pas de "many users", "great results", "impressive growth". Exemples marqués, templates avec placeholders.
7. **Voix séparées.** R, F, F2, Produits ont chacun leur vocabulaire exclusif. Jamais de mélange. Voir `romain/VOIX.md`, `fabrice/VOIX.md`, `f2/context.md`.
8. **Règle TOILE.** Altistone et la toile restent invisibles en public. Aucune mention dans posts, replies, cold, ou docs publics.
9. **Synchronisation canaux.** Brand (Twitter, LinkedIn, IH, PH) et distribution (Reddit, Facebook) restent cohérents pour une même personne : même ton, mêmes angles, seuls les formats changent.
10. **Discipline budget.** Haiku par défaut. Escalade Sonnet justifiée. Opus sur demande explicite seulement. Vérifier `ops/budget/history.csv` si doute.

---

## §7 : Workflow quotidien

### Pour R ou F qui ouvre le repo

1. Regarder la date du jour.
2. Calculer le jour du plan (J1 = 06/04/2026).
3. Ouvrir `romain/` ou `fabrice/` selon qui parle.
4. Lire `plan-30-jours.md` + le tracking de la veille.
5. Choisir le canal (twitter / linkedin / reddit / facebook / ph) selon la journée.
6. Dire exactement quoi faire MAINTENANT.

### Pour F qui utilise Claude Code

- **Démarrage session** : `/morning` → brief du jour (SaaS, décisions en attente, posts à publier, 3 priorités).
- **État détaillé** : `/status` → vue complète F2 (métriques, roadmap, décisions récentes).
- **Review Ouroboros** : `/review-proposals` → accepter / rejeter / ignorer les propositions.
- **Budget check** : `/budget` → dépenses par service, alerte si dérive.
- **Lancement SaaS** : `/launch <saas>` → checklist personnalisée.
- **Post-mortem** : `/debrief` → f2-auditor produit un rapport structuré.
- **Avant `/clear` ou `/compact`** : `/handoff` → écrit HANDOFF.md pour la session suivante.

### Pour déléguer du travail lourd

Utiliser les agents via la Task tool (contexte isolé). Exemple : audit archi → `f2-architect`, code prod-ready → `f2-dev`, UI → `f2-designer`, exploration repo → `f2-librarian`.

---

## §8 : Interdictions

1. Pas de duplication parent-enfant.
2. Pas de modification de contenu opérationnel sans validation explicite.
3. Pas de données inventées (stats, testimonials, metrics).
4. Pas de mélange de voix (R ≠ F ≠ F2 ≠ Produits).
5. Pas de cible dev dans le contenu produit.
6. Pas de contenu qui échoue le check `ANTI-IA.md`.
7. Pas de référence à "l'autre repo", "repo FT", "repo CDV" : le repo est unifié.
8. Pas de mention d'Altistone ou de la toile en public.
9. Pas d'auto-escalade vers Opus. Opus UNIQUEMENT sur demande explicite.
10. Pas d'écriture Ouroboros hors de son sandbox (`brain/ouroboros/proposals|diary|state`). Jamais de commit, push, ou API externe en write depuis Ouroboros.

---

## §9 : Owner

- **Studio :** FoundryTwo
- **Repo :** github.com/altidigitech-ui/F2-Jarvis
- **Fondateurs :** Romain Delgado (R) + Fabrice Gangi (F)
- **F2-Jarvis = OS interne. FoundryTwo = identité publique.**
