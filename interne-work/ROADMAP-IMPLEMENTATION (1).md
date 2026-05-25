# ROADMAP IMPLÉMENTATION — Repo Jarvis + Hokuno

> Document de reprise consolidant `plan-implementation-final.md` + `prompt-reprise-phase5c.md` + `prompt-reprise-session7.md`, avec ajout du Chantier Implémentation Hokuno.
>
> **Dernière mise à jour :** 22/05/2026
> **Statut :** source de vérité pour l'exécution. Rangement structurel du repo terminé ; focus actuel = branchement Jarvis.
> **Règle :** aucune opération sur le repo sans validation R.

---

## CONTEXTE

Refonte complète du repo F2-Jarvis (le repo opérationnel de Jarvis — système AI qui gère la présence réseaux sociaux des business de R et F). Phases 1 à 5B terminées : `marketing/canaux/` (8 plateformes), `strategie/` (CONTEXT, PLAYBOOK, WARMING, ECOMMERCE, verticals), `romain/` et `fabrice/` (planning, tracking, cold, engagement, publication), `saas-app-shopify/` (26 fichiers + context + pipeline-conversion), `tracking/` (context, suivi-comptes, dashboard-hebdo, decisions-log), BIBLE v3.1, VISUELS.md, archivage complet.

**Le rangement structurel du repo est désormais terminé** (Phase 5C + Phase 5C-bis actions 1-2, voir `tracking/recap-sessions/2026-05-22.md`). Le repo est neuf et propre, structuré ainsi : `produits/` = ce qu'on construit (le QUOI), `marketing/` = comment on vend (le COMMENT), `strategie/` = couche parent vision/verticals, `archives/` = système d'archivage figé (2 niveaux, 7 catégories). Le repo est conçu **scalable** : chaque nouveau business = nouveau dossier + quelques lignes ajoutées.

---

## VIRAGE STRATÉGIQUE

- FoundryTwo est MORT. Plus de studio, plus de communauté dev.
- Multi-business : StoreMD (SaaS Shopify, en attente validation App Store), Hokuno (boutique Shopify streetwear, lancement reporté — voir Chantier 2), ProfitPilot (SaaS, backlog).
- Cold 80 DMs/jour (pas d'engagement proactif).
- Agents business-agnostic (BIBLE §13).
- Jarvis défini dans BIBLE §0.
- S10 (18–24/05) = StoreMD teasing attente validation Shopify + préparation lancement Hokuno.
- S11 (25–31/05) = lancement Hokuno + StoreMD continue teasing subtil.

---

## MISE À JOUR 22/05/2026 — NOUVEAU FOCUS

Le contexte a évolué depuis le 17/05. Enrichissement (le contenu des phases ne change pas, seuls l'ordre et le contexte sont adaptés) :

- **Le rangement structurel du repo est terminé.** Le repo est neuf — c'est le bon moment pour brancher Jarvis dessus pendant qu'il est propre.
- **Le focus passe au branchement de Jarvis** (ex-Chantier 2). Il y a beaucoup à faire et c'est le plus important : adapter Jarvis au repo actuel.
- **Hokuno est reporté après Jarvis.** La date du 25/05 ne sera pas respectée. Hokuno reste pleinement dans la roadmap, mais en Chantier 2 : on le créera et on l'adaptera au repo (conçu scalable) une fois que Jarvis sera fonctionnel et que Hokuno sera totalement prêt. Le branchement de Jarvis sur Hokuno se fera à ce moment-là.
- **Conséquence structurelle :** il n'y a plus 3 chantiers mais 2 — (1) Branchement Jarvis + rangement repo, (2) Hokuno. L'ancien Chantier 3 (adaptation finale post-Hokuno) est regroupé sous le Chantier 2 Hokuno (son intégration au repo scalable + branchement Jarvis se fait au moment de Hokuno).
- **Exigence de scalabilité :** Jarvis doit pouvoir incorporer Hokuno (et les futurs business) facilement. La création du squelette `marketing/boutiques/` (Phase 5C-bis Action 3) est conservée dans le Chantier 1 pour rendre le repo scalable dès maintenant, sans attendre Hokuno.

---

## ÉTAT AU 22/05/2026

### Ce qui est fait

| Phase | Statut | Note |
|-------|--------|------|
| Phase 1 — `marketing/canaux/` restructurés (8 plateformes) | ✅ Fait | Twitter, LinkedIn, Reddit, TikTok, Instagram, Facebook, IH, PH chacun avec `algo.md` + `context.md` |
| Phase 2 — Modifications en place (M05–M08, M18–M21) | ✅ Fait | plans-30-jours, plans-hebdo, playbooks-semaine, daily-checklists R+F, strategie/ |
| Phase 3 — Remplacement VOIX + context R/F | ✅ Fait | M01-M03 R, M48-M50 F |
| Phase 4 — `saas-app-shopify/` créé | ✅ Fait | 26 fichiers + context + pipeline-conversion StoreMD |
| Phase 4B — Suivi-comptes central + ménage tracking/ | ✅ Fait | `tracking/suivi-comptes.md` créé, audit fichiers racine `tracking/` |
| Phase 5A/5B — Archivage + déplacements | ✅ Fait | `archives/`, `asset-brand/storemd/` |
| BIBLE v3.1 + VISUELS.md | ✅ Fait | Jarvis défini en §0, multi-business, agents business-agnostic |
| Batch S10 StoreMD + archivage S9 | ✅ Fait | Traité hors roadmap (17–24/05) |
| **Phase 5C — Données que Jarvis lit** | ✅ Fait | Alignement des fichiers que Jarvis lit (produits/, marketing/, jarvis/). Détail : `tracking/recap-sessions/2026-05-22.md` |
| **Phase 5C-bis Actions 1-2 — Déplacements structurels** | ✅ Fait | `saas/` → `produits/saas/` (+ leak-detector archivé, context.md/roadmap.md alignés, `produits/README.md` créé) ; `saas-app-shopify/` → `marketing/saas-app-shopify/` (+ context.md dossier et storemd/context.md alignés, `marketing/README.md` réfectionné). Détail : recaps 21/05 + 22/05 |

### Ce qui reste

| Phase | Chantier | Statut |
|-------|----------|--------|
| Phase 5C-bis Action 3 — création `marketing/boutiques/` | Chantier 1 | ⏳ À faire (squelette scalable, voir Chantier 1) |
| Phase 6A — Agents (.claude/agents/) | Chantier 1 | ⏳ À faire — 8 agents toujours préfixés `f2-` |
| Phase 6B — Skills (.claude/skills/) | Chantier 1 | ⏳ À faire — `f2-brand-voice/` toujours préfixé |
| Phase 6C — Commands (.claude/commands/) | Chantier 1 | ⏳ À faire — `/batch` et `/archivage` absents, 11 commands à aligner |
| Phase 7A — Docs Jarvis racine | Chantier 1 | ⏳ À faire — `CLAUDE-JARVIS.md` prêt dans `outputs/`, autres à auditer |
| Phase 7B — System-prompts R et F | Chantier 1 | ⏳ À faire — 450L + 410L, "FoundryTwo", "6 AI agents", vieux portfolio |
| Phase 7C — Infra (strings FoundryTwo) | Chantier 1 | ⏳ À faire — `backend/jarvis/`, `ui/jarvis/`, `ui/web/`, `brain/` |
| Phase 7D — Vérification rapide | Chantier 1 | ⏳ À faire — `ops/`, `patterns/`, `la-toile/`, `systeme cognitif/` |
| Phase 8 — Fichiers charnières | Chantier 1 | ⏳ À faire — `CLAUDE.md`, `README.md`, `ARCH.md` (tout le reste terminé d'abord) |
| Implémentation Hokuno + adaptation finale | Chantier 2 | ⏳ Après Jarvis fonctionnel + Hokuno prêt |

---

## ORDRE D'EXÉCUTION

| # | Chantier | Quand | Prérequis |
|---|----------|-------|-----------|
| 1 | **Branchement Jarvis + rangement repo** (Phase 5C-bis Action 3 → Phase 8) | Maintenant (repo neuf) | Rangement structurel fait (Phase 5C + 5C-bis actions 1-2) |
| 2 | **Implémentation Hokuno + adaptation finale** | Après Chantier 1 (Jarvis fonctionnel) et Hokuno totalement prêt | Chantier 1 terminé |

---

## CHANTIER 1 — BRANCHEMENT JARVIS + RANGEMENT REPO

> Retranscription fidèle des phases non exécutées du `plan-implementation-final.md` (05/05/2026). Le rangement structurel (Phase 5C + 5C-bis actions 1-2) est terminé ; reste l'Action 3 de la Phase 5C-bis (création `boutiques/`) puis le branchement Jarvis (Phases 6A → 8).

### Rangement repo — déjà fait (✅, conservé pour trace)

Les deux phases ci-dessous sont **terminées**. Leur contenu est conservé pour mémoire ; le détail d'exécution est consigné dans les recaps de session (`tracking/recap-sessions/2026-05-21.md` et `2026-05-22.md`).

#### Phase 5C — Données que Jarvis LIT ✅

Aligner avant de toucher les exécutants.

| Fichier | Lignes | Problème identifié | Action |
|---------|--------|--------------------|--------|
| `produits/STATUS.md` | 27L | Portfolio peut-être obsolète | Vérifier alignement avec BIBLE §7 |
| `produits/MUTATIONS.md` | 222L | Historique mutations | Vérifier cohérence |
| `produits/NOUVEAUX.md` | 420L | Nouveaux SaaS | Vérifier alignement |
| `produits/PRINCIPES-ANTI-CONCURRENTS.md` | 123L | Ref FoundryTwo possible | Vérifier |
| `saas/` (21 fichiers) | — | Ancien dossier produits, overlap avec `saas-app-shopify/` | Clarifier rôle : `saas/` = specs techniques, `saas-app-shopify/` = distribution. Ou fusionner. |
| `marketing/strategie.md` | — | Ancienne stratégie marketing | Aligner avec `strategie/CONTEXT.md` |
| `marketing/objectifs.md` | — | Anciens objectifs | Aligner |
| `marketing/README.md` | — | Navigation obsolète | Réécrire |
| `marketing/contenu/formats.md` | — | Formats de contenu | Vérifier |
| `marketing/contenu/pipeline-video.md` | — | Pipeline vidéo (Remotion, Higgsfield) | Vérifier |
| `marketing/jarvis/engagement-reddit-fb.md` | — | Engagement proactif = 0 | Aligner (0 engagement proactif, réponses uniquement) |
| `marketing/jarvis/prompts.md` | — | Prompts batch/engagement | Aligner |
| `marketing/jarvis/reponses-commentaires.md` | — | Réponses aux commentaires | Vérifier (on répond toujours aux commentaires sur nos posts) |

#### Phase 5C-bis Actions 1-2 — Déplacements structurels majeurs ✅

Concrétise les "problèmes à clarifier" de la Phase 5C en actions concrètes. Prérequis pour Phases 6, 7 qui pointent vers ces dossiers.

| # | Action | Source | Destination | Justification | Statut |
|---|--------|--------|-------------|---------------|--------|
| 1 | Déplacement | `saas/` (21 fichiers) | `produits/` | `saas/` est un ancien dossier qui contient des stubs SaaS datés (StoreMD, ProfitPilot, ClientPulse, AdAudit, CreatorSuite, LeadQuiz, leak-detector). `produits/` est la source de vérité portfolio (STATUS, MUTATIONS, NOUVEAUX, PRINCIPES-ANTI-CONCURRENTS). Fusion = un seul endroit pour les specs produits. La logique "produits/ = ce qu'on produit" inclut aussi les futurs business boutique (Hokuno). | ✅ Fait (→ `produits/saas/`) |
| 2 | Déplacement | `saas-app-shopify/` | `marketing/saas-shopify/` | `saas-app-shopify/` contient `cold/`, `publication/`, `recherche/`, `pipeline-conversion.md` = c'est du marketing/distribution, pas de la spec produit. Logique stricte : `produits/` = ce qu'on produit (le QUOI), `marketing/` = comment on vend (le COMMENT). Le vertical Shopify devient une sous-section de marketing/. | ✅ Fait (→ `marketing/saas-app-shopify/`, nom complet conservé) |

**Conséquence (rappel) :** toute la documentation et tout le code qui référence `saas/` ou `saas-app-shopify/` devait être mis à jour. Cela concerne notamment :
- Phase 6 (agents, skills, commands qui lisent ces paths)
- Phase 7A (docs Jarvis racine — `CLAUDE-JARVIS.md`, `JARVIS.md`, etc.)
- Phase 7B (system-prompts R et F qui référencent ces dossiers)
- Phase 7C (infra — `backend/jarvis/jarvis-tools.ts`, `repo_read(path)` hardcodés)
- Phase 8 (CLAUDE.md, README.md, ARCH.md — documentent l'état final)

### Phase 5C-bis Action 3 — Création `marketing/boutiques/` (RESTE — à faire)

| # | Action | Source | Destination | Justification |
|---|--------|--------|-------------|---------------|
| 3 | Création (structure vide) | — | `marketing/boutiques/` | Vertical Boutique POD (différent de SaaS). Préparation infrastructure pour Hokuno (Chantier 2). Stratégie de vente boutique ≠ stratégie SaaS : pas de cold, présentation produit, partenaires/influenceurs. Pattern scalable pour futures boutiques. |

**Note :** créé maintenant (option validée R) pour rendre le repo scalable dès le branchement Jarvis, sans attendre Hokuno. Structure exacte à définir avec R avant exécution.

### Phase 6A — Agents (.claude/agents/)

**Prérequis :** Phase 5C terminée (les données que les agents lisent sont à jour). ✅

8 agents, TOUS ont le préfixe `f2-` à renommer + contenu à aligner.

| Agent actuel | Nouveau nom | Lignes | Problème clé |
|--------------|-------------|--------|--------------|
| `f2-marketer.md` | `marketer.md` | 99L | "build-in-public", "F2", "marketing-fr = Romain", "marketing/posts/draft/", "@foundrytwo IH", old voice mapping |
| `f2-accountant.md` | `accountant.md` | 115L | "F2-JARVIS", vérifier paths budget |
| `f2-architect.md` | `architect.md` | 93L | "F2", vérifier refs |
| `f2-auditor.md` | `auditor.md` | 104L | "F2", path `tracking/decisions-log.md` OK |
| `f2-designer.md` | `designer.md` | 100L | "F2", vérifier refs |
| `f2-dev.md` | `dev.md` | 95L | "F2", "Stack F2 fixe", vérifier |
| `f2-librarian.md` | `librarian.md` | 63L | "F2", vérifier refs |
| `f2-thinker.md` | `thinker.md` | 79L | Vérifier refs |

**Action par agent :** renommer le fichier + mettre à jour le champ `name` + réécrire le contenu pour multi-business, nouveaux paths, nouvelle stratégie. Les agents doivent être business-agnostic (BIBLE §13).

### Phase 6B — Skills (.claude/skills/)

| Skill actuel | Nouveau nom | Lignes | Problème | Action |
|--------------|-------------|--------|----------|--------|
| `f2-brand-voice` | `brand-voice` | 63L | "FoundryTwo = studio SaaS", "build-in-public", "Financial independence August 2026" | Renommer + réécrire complet |
| `context-md-generator` | (garder nom) | 89L | "SaaS F2 (submodule dans `saas/`)" | Aligner paths + refs |
| `marketing-en` | (garder nom) | 84L | À vérifier | Auditer |
| `marketing-fr` | (garder nom) | 85L | À vérifier | Auditer |
| `jarvis-upgrade` | (garder nom) | 520L | Plan upgrade, vérifier si appliqué | Auditer |
| 13 autres skills techniques | (garder noms) | — | Techniques (shopify-gql, stripe, supabase, UI, etc.) | Audit rapide — probablement OK |

### Phase 6C — Commands (.claude/commands/)

#### Commands existants à aligner

| Command | Lignes | Problème | Action |
|---------|--------|----------|--------|
| `morning.md` | 76L | Lit `saas/*/CONTEXT.md` (ancien path), `marketing/posts/draft/` (n'existe plus), template "F2-JARVIS", liste "6 SaaS" | Aligner paths + template |
| `status.md` | 102L | "Studio SaaS indie", "1 SaaS/mois", "PayloadDiff", "ContentForge", vieux MRR, old roadmap | Aligner |
| `launch.md` | 82L | Lit `saas/<saas>/` uniquement | Ajouter `saas-app-shopify/` |
| `debrief.md` | 47L | Ref `f2-auditor` | Renommer ref → `auditor` |
| `cognition.md` | 95L | À vérifier | Auditer |
| `jarvis.md` | 90L | À vérifier | Auditer |
| `budget.md` | 61L | À vérifier | Auditer |
| `graphify-all.md` | 74L | À vérifier | Auditer |
| `handoff.md` | 34L | À vérifier | Auditer |
| `review-proposals.md` | 64L | À vérifier | Auditer |
| `think.md` | 93L | À vérifier | Auditer |

#### Commands à créer

| Command | Rôle |
|---------|------|
| `/batch` | Process avec validation à chaque étape : 1) collecte données (métriques, progress, douleurs, prompts vidéo, ressentis R+F) → présente → attend validation. 2) Production batch central → présente → attend validation. 3) Dispatch dans les dossiers spécifiques (`romain/publication/`, `fabrice/publication/`, `saas-app-shopify/storemd/publication/`). Jamais d'action sans "go" explicite. |
| `/archivage` | Fin de semaine : archive TOUT ce qui est archivable — batch central → `archives/`, fichiers dispatch vidés, progress → archivé + template vide semaine suivante, cold-logs → archivés, métriques → archivées. Scope = tout le repo, pas juste le batch. |

### Phase 7A — Docs Jarvis racine

| Fichier | Lignes | Action |
|---------|--------|--------|
| `CLAUDE-JARVIS.md` | 86L | Placer version mise à jour (prête dans `outputs/`) |
| `ANTI-IA.md` | 132L | Vérifier (probablement bon) |
| `JARVIS.md` | 496L | Aligner avec BIBLE §0 (Jarvis défini, multi-business) |
| `JARVIS-ARCHITECTURE-COMPLETE.md` | 925L | Mettre à jour archi complète |
| `JARVIS-UPGRADE-PLAN.md` | 1049L | Vérifier si changements déjà appliqués ou encore à faire |
| `ENTRYPOINT.md` | 201L | Réécrire (90% obsolète — FoundryTwo, old strategy, old paths) |
| `HANDOFF.md` | 130L | Aligner avec nouvelle stratégie |
| `VISUELS.md` | 184L | ✅ DÉJÀ FAIT |

### Phase 7B — System-prompts R et F

| Fichier | Lignes | Problème |
|---------|--------|----------|
| `romain/system-prompt.md` | 450L | "FoundryTwo studio SaaS", "6 AI agents", "30 interactions + 10 cold", old portfolio, old verticals, old voice mapping |
| `fabrice/system-prompt.md` | 410L | Idem — "FoundryTwo", "6 AI agents", "content creators angle", old volumes |

**Prérequis :** Phases 6 et 7A terminées — les agents, commands et docs racine doivent être à jour AVANT de réécrire les system-prompts.

### Phase 7C — Infra (strings FoundryTwo dans le code)

| Dossier | Fichiers concernés | Action |
|---------|---------------------|--------|
| `backend/jarvis/` | `jarvis-memory.ts`, `jarvis-tools.ts`, `ouroboros-cycle.ts`, `chat.ts` | Changer les strings FoundryTwo |
| `ui/jarvis/` | `layout.tsx`, `page.tsx`, `PersonaLayout.tsx`, `FileViewerModal.tsx`, `GraphifyView.tsx` | Changer les strings FoundryTwo |
| `ui/web/` | `layout.tsx` | Changer les strings |
| `brain/context-cognitif/` | `ARCH.md`, `claude.md` | Aligner refs |
| `brain/ouroboros/` | `identity.md`, `bible.md` | Aligner avec BIBLE v3.1 |
| `brain/mempalace/wings/f2/` | 9 drawers | **NE PAS TOUCHER** — mémoire historique |

### Phase 7D — Vérification rapide (probablement OK)

| Dossier | Action |
|---------|--------|
| `ops/` (budget, monitoring, kill-switches) | Audit rapide — vérifier que les paths et refs sont corrects |
| `patterns/` (8 patterns techniques) | Audit rapide — 1 fichier a ref FoundryTwo (`bitwarden`) |
| `la-toile/` (Altistone) | Audit rapide — probablement OK |
| `supabase-migrations/` | OK — SQL, pas de stratégie |
| `graphify-out/` | OK — output de graph |
| `systeme cognitif/` | Audit rapide — specs outils/skills liées à `brain/` |
| `raw/` | OK — analytics bruts |

### Phase 8 — Fichiers charnières (DERNIER)

| Fichier | Lignes | Prérequis |
|---------|--------|-----------|
| `CLAUDE.md` | 294L | TOUT le reste terminé — ce fichier est l'OS du repo, il documente l'état final |
| `README.md` | 178L | Idem — navigation complète du repo final |
| `ARCH.md` | 448L | Généré par `tree` sur le repo final |

---

## CHANTIER 2 — IMPLÉMENTATION HOKUNO + ADAPTATION FINALE

> Hokuno est reporté après le branchement de Jarvis. Il reste pleinement dans la roadmap. On l'implémente une fois que Jarvis est fonctionnel (Chantier 1 terminé) et que Hokuno est totalement prêt. Le squelette `marketing/boutiques/` (Phase 5C-bis Action 3) aura déjà été créé en Chantier 1 pour accueillir Hokuno dans un repo scalable.

### Implémentation Hokuno

**Note :** détails fournis en temps voulu par R. Pas de placeholder, pas de spéculation sur la structure tant que les détails ne sont pas fournis.

### Adaptation finale (ex-Chantier 3)

Une fois Hokuno implémenté dans le repo et Jarvis branché, une phase finale d'adaptation vient réconcilier les deux : ajustements de paths, références croisées, et intégration du business Hokuno dans les agents/skills/commands business-agnostic. Le branchement de Jarvis sur Hokuno se fait à ce moment-là.

Détails fournis en temps voulu.

---

## NOTES IMPORTANTES

### Note 1 — Recyclage du domaine `foundrytwo.com`

Le virage "FoundryTwo killed" reste **toujours validé** : plus de studio actif, plus de communauté dev, plus de compte social sous le nom FoundryTwo, plus de communication FoundryTwo.

**MAIS** le nom de domaine `foundrytwo.com` a été **recyclé** comme page HTML hub :

- La page regroupe tous nos business actifs (StoreMD + Hokuno, et les suivants à venir).
- La page fait du **tracking** sur les clics sortants vers chaque business.
- Fonctionne comme un **Linktree maison gratuit avec tracking** (hébergé en interne, pas de coût récurrent, contrôle total des données).
- **Lien supplémentaire à mettre dans la bio** de chacun de nos comptes sociaux (R, F, StoreMD, Hokuno, et les suivants).
- **En commentaire :** on peut laisser les 2 liens — le lien du business mis en avant + le lien `foundrytwo.com` qui présente l'ensemble du portfolio.
- **En pub pour 1 business** (ex : on pousse StoreMD sur Reddit) : on glisse aussi le lien `foundrytwo.com` qui présente l'écosystème complet — utile pour merchants qui ont plusieurs besoins ou pour faire connaître Hokuno via le trafic StoreMD (et inversement).

**Conséquence pour le repo :** FoundryTwo n'a plus de compte social mais n'est pas totalement effacé du repo — la page hub existe comme asset distribution. À prendre en compte lors des phases 5C, 7B, 7C : on aligne le contenu pour qu'il reflète "FoundryTwo = page hub + tracking" et pas "FoundryTwo = studio actif".

### Note 2 — IH (Indie Hackers) repasse sous FoundryTwo

IH cible exclusivement les **devs**. Pour des raisons de simplicité (notamment gestion mails), la présence IH repasse sous le compte FoundryTwo.

- **Seule présence FoundryTwo qui communique = IH.** Tous les autres canaux restent sur R, F, StoreMD, Hokuno (et les comptes business à venir).
- Implications pour la stratégie : posts IH = voix FoundryTwo (ton studio dev, plus la voix R personnelle ni la voix produit StoreMD). À cadrer dans la VOIX du compte FoundryTwo IH au moment de la phase d'alignement.

**Conséquence pour le repo :**

| Phase | Impact |
|-------|--------|
| Phase 5C | `marketing/canaux/ih/context.md` doit refléter "FoundryTwo IH = présence dev" (à valider lors de l'alignement) |
| Phase 7B | Les system-prompts R et F doivent indiquer que IH n'est PAS un canal R/F mais un canal FoundryTwo |
| Phase 7C | Les strings FoundryTwo dans `backend/jarvis/`, `ui/jarvis/`, `brain/ouroboros/identity.md` ne doivent **pas être supprimées aveuglement** — FoundryTwo reste une entité limitée (page hub + IH) |

---

## FICHIERS PRÊTS DANS `/mnt/user-data/outputs/`

- `claude-jarvis-updated.md` → à placer en racine sous `CLAUDE-JARVIS.md`

---

## RÈGLES D'EXÉCUTION

- Aucune opération sur le repo sans validation explicite de R.
- Auditer avant de modifier.
- Recap avant validation.
- Pas d'invention de données.
- Jarvis doit fonctionner : les fichiers font partie du système, on aligne, on ne supprime pas.
- FoundryTwo est MORT — ne jamais le mentionner dans le contenu mis à jour (sauf entité limitée : page hub + IH, cf. Notes 1 et 2).
- Le repo est scalable : chaque nouveau business = nouveau dossier + quelques lignes ajoutées.
- Prompts chirurgicaux (1 action précise par prompt Claude Code).
- Toujours confirmer la compréhension AVANT de produire un prompt.

---

*Fin du document. Source de vérité : ce fichier consolide `plan-implementation-final.md` (05/05/2026), `prompt-reprise-phase5c.md` et `prompt-reprise-session7.md`. Mise à jour 22/05/2026 : rangement repo terminé, réorganisation en 2 chantiers (Jarvis focus, Hokuno après), contenu des phases conservé intégralement.*
