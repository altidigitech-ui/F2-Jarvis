# PLAN DE BRANCHEMENT JARVIS

> Document-traqueur maître du rebranchement de Jarvis sur le repo refondu.
> Sert à figer **les choix faits**, **ce qu'on doit faire**, et **où on en est**.
> **Créé :** 23/05/2026 · **Dernière maj :** 03/06/2026
> **Règle absolue :** aucune opération sur le repo sans validation explicite de R ("go" / "validé" / "ok"). Ce document recense ; il ne déclenche rien.

---

## 0. OBJECTIF

Le repo a subi une refonte structurelle complète. Jarvis avait des bases solides mais sa configuration et son code pointent encore vers l'ancienne arborescence. **Objectif unique : réaligner Jarvis intégralement sur le repo neuf pour qu'il soit pleinement opérationnel** — pas un MVP, pas un test (StoreMD est live sur le Shopify App Store).

Principe directeur : **on ne supprime aucun système Jarvis en place, on le ré-adapte.** Chaque fichier est conservé et corrigé si nécessaire. Seules exceptions : ce que R a explicitement décidé de supprimer ou d'archiver (cf. décisions verrouillées).

---

## 1. LES 3 SURFACES DE JARVIS (ne jamais confondre)

Brancher Jarvis = aligner trois surfaces distinctes qui partagent le repo comme corps :

| # | Surface | Pilotée par | Rôle |
|---|---------|-------------|------|
| **A** | **Jarvis-CLI** (Claude Code en terminal) | `CLAUDE.md` + `BIBLE.md` + `.claude/` (agents, skills, commands, hooks) | Travail infra/dev en terminal |
| **B** | **Jarvis-conversationnel** (app web Vercel + backend Railway) | system prompt **hardcodé dans `backend/jarvis/src/routes/chat.ts`** + contextes chargés (`CLAUDE-JARVIS.md`, `BIBLE.md`, `ANTI-IA.md`, `{persona}/VOIX.md`, `{persona}/plan-hebdo.md`) + tools `jarvis-tools.ts` | **Le daily-driver.** C'est lui qu'on utilise au quotidien |
| **C** | **Ouroboros** (cycle de nuit) | `ouroboros-cycle.ts` + `brain/ouroboros/identity.md` + `bible.md` | Conscience de fond, propose dans `proposals/` |

Les trois tournent via l'**Agent SDK** (`@anthropic-ai/claude-agent-sdk`, binaire `claude`), authentifiés sur l'abonnement.

---

## 2. DÉCISIONS VERROUILLÉES (23/05/2026)

| # | Décision |
|---|----------|
| **D1** | Rebranchement total de Jarvis sur le repo refondu. On **aligne au repo**, on ne reconstruit pas. |
| **D2** | **SDK conservé tel quel.** On ne touche **rien** côté modèle / API maintenant (pas de `options.model`, pas de migration API, pas de multi-LLM). Le passage API + changement de modèles = **chantier ultérieur, après recherche dédiée**. |
| **D3** | Budget : plafond **cible 90€** (l'abonnement utilisé). Extensible jusqu'à **180€** si réel besoin. Objectif = rester sous 90€. `ops/budget/limits.yaml` (Max 5x ≈ 90€) est cohérent ; ajouter la note "extensible 180€". |
| **D4** | **FoundryTwo / F2 = mort en tant qu'entité active.** Subsiste UNIQUEMENT comme : (a) **page HTML hub** `foundrytwo.com` (rassemble les business + tracking sortant), (b) **le nom sur IH**. Aucune autre citation active autorisée nulle part. |
| **D5** | Le système est nommé **"Jarvis"** dans toute la doc et tout le contenu (plus "F2-Jarvis", plus aucun "context F2"). **Nom physique du repo GitHub = reste "F2-Jarvis" pour l'instant** (pas de rename, raisons infra — cf. journal). Toute autre mention `F2` / `FoundryTwo` doit être **archivée et corrigée** : le repo ne doit refléter FoundryTwo que comme **page HTML hub + nom IH**, rien d'autre. |
| **D6** | **Interface/mode F2 SUPPRIMÉ entièrement** (backend `mode:"f2"` + UI). Désormais **2 interfaces : Romain et Fabrice.** *(Seule suppression de code explicitement autorisée.)* |
| **D7** | **Frontend = dernier bloc.** On le branche/ajuste une fois tout le backend carré. |
| **D8** | **Modèle de compteurs à 2 niveaux.** *Partie perso* = **6 compteurs** (cold TK, cold IG, cold X, cold LKD, cold FB, + PH) **scopés au persona de l'interface, sans vue croisée** (Romain ne voit pas ceux de Fabrice et inversement — montrer ceux de l'autre ne sert à rien). *Partie commune* = **1 compteur "général" mutualisé** = somme des actions R + F, **valeur identique sur les deux interfaces** (ex. F 20 + R 15 → 35 affiché des deux côtés). |
| **D9** | **Cibles par persona (identiques R et F)** : cold TK 10 · cold IG 10 · cold X 5 · cold LKD 5 · cold FB 5 = **35**, + **PH 6** (5 upvotes + 1 commentaire) = **41/jour/persona**. **Compteur général = 82** (41 + 41). "Si on a le temps, on fait plus." → BIBLE §4 + fichiers cold + fichiers comptes à mettre à jour. |
| **D10** | **Cross-engagement = obsolète → archivé proprement.** Création du dossier **`archives/jarvis/`**. On y archive le système cross (handlers `mark_cross_published`, IDs A1-A14/B1-B8, side-effects, patterns du system prompt) **+ un `.md` qui documente ce qu'il faisait**, pour réactivation future (ex. automatisation type open-claw). Retiré de l'**actif (code)**, **pas détruit**. Même traitement pour toute structure cold obsolète révélée par l'audit. |
| **D11** | **IH = opéré par Romain, voix FoundryTwo, posts uniquement.** **Aucun compteur** pour IH, zéro engagement proactif. IH ≠ PH ; IH n'entre **pas** dans le compteur général de 82. |

---

## 3. POINTS OUVERTS

Aucun point ouvert à ce stade. Les 6 points initiaux (O1–O6) ont tous été tranchés le 23/05/2026 — voir journal §6 et décisions §2.

---

## 4. LES BLOCS DE BRANCHEMENT

Statuts : ⬜ à faire · 🔄 en cours · ✅ fait · 🔒 intouchable

### BLOC 0 — Vérité de référence (audit poussé)

> Exhaustif avant de toucher quoi que ce soit. Plusieurs items déjà entamés dans la conversation d'audit du 23/05.

| Item | Statut |
|------|--------|
| Audit backend — paths, modes, compteurs, side-effects (`chat.ts`, `action-executor.ts`, `jarvis-tools.ts`) | 🔄 partiel (constats clés posés) |
| Audit budget / SDK (auth, hybride API déjà en place : `web_search` + compression Haiku) | ✅ |
| Audit des 8 agents `.claude/agents/` | ⬜ |
| Audit des 18 skills `.claude/skills/` | ⬜ |
| Audit des 11 commands + cadrage `/batch` et `/archivage` | ⬜ |
| Audit des 8 hooks + `hooks-config.json` + `settings.json` | ⬜ |
| Audit docs racine (`CLAUDE-JARVIS`, `JARVIS`, `JARVIS-ARCHITECTURE-COMPLETE`, `JARVIS-UPGRADE-PLAN`, `ENTRYPOINT`, `HANDOFF`) | ⬜ |
| Audit comptes & canaux — **tous les comptes existent déjà** ; source de vérité = doc suivi-comptes du repo (handles + URLs de tout l'écosystème). Pas de création, on localise et on lit. | ⬜ |
| Audit `brain/` (ouroboros `identity.md`/`bible.md`, `context-cognitif` refs) — **hors `mempalace/wings/f2/`** | ⬜ |
| Audit frontend (structure UI, mode F2 à retirer, perso/commun) — informe Bloc 4 | ⬜ |
| Cartographie exhaustive des occurrences `F2` / `FoundryTwo` / `F2-Jarvis` / anciens paths (`saas/`, `f2/`, `growth-marketing/`, `distribution/`, `plan-hebdo.md` racine persona, etc.) | ⬜ |

### BLOC 1 — Corps vivant (backend / code) → rend Jarvis opérationnel

> **Priorité réelle.** Tant que les paths du backend sont faux, toute action de write de Jarvis échoue ou pollue le repo.

| Item | Statut |
|------|--------|
| Remap paths `chat.ts` (contextes chargés + `opsFiles`) → nouvelle arbo (`{persona}/planning/plan-hebdo.md`, etc.) | ⬜ |
| Remap paths `action-executor.ts` (cibles d'écriture + side-effects + allowed-paths : `cold/cold-log-{plateforme}.md`, `engagement/{ph,reddit}/engagement-log.md`, `tracking/progress-semaines.md`, `produits/saas/`) | ⬜ |
| Remap paths/scopes `jarvis-tools.ts` (`repo_search` enum, `recent_history` reads, dossiers autorisés) | ⬜ |
| Supprimer mode `"f2"` backend (type `Mode`, `personaBlock`, branches, contextes `f2/...`) — D6 | B1.2 ✅ (routage actif retiré, option A — 5 fichiers ; historique f2 conservé ; context.ts/chat.ts → B1.5/B1.7) |
| Refondre le modèle de compteurs (route `context.ts`) selon D8/D9 : 6 compteurs perso scopés persona + 1 général mutualisé = 82 | ⬜ |
| Archiver le cross-engagement (D10) : créer `archives/jarvis/` + y déplacer/documenter le système cross (`mark_cross_published`, IDs A/B, side-effects, patterns) + `.md` de doc, puis le retirer de l'actif (code) | B1.1 ✅ (workflow retiré + archivé ; compteurs cross context.ts → B1.5) |
| Réécrire le system prompt hardcodé de `chat.ts` ("troisième co-fondateur de FoundryTwo" → Jarvis, strings F2/F2-Jarvis, 22 réflexes & patterns à jour, compteurs à jour) | ⬜ |
| Aligner strings dans `jarvis-memory.ts`, `ouroboros-cycle.ts` (FoundryTwo, F2-Jarvis, identité) | ⬜ |
| **Ne pas toucher** : logique modèle/API · `brain/mempalace/wings/f2/` (mémoire historique) | 🔒 |

### BLOC 2 — Config `.claude/`

| Item | Statut |
|------|--------|
| Agents : `f2-X.md` → `X.md` (rename + champ `name` + contenu multi-business, nouveaux paths, stratégie) ×8 | ⬜ |
| Skill `f2-brand-voice` → `brand-voice` (rename + réécriture complète) | ⬜ |
| Skills `context-md-generator` (paths), `marketing-en`/`marketing-fr` (audit), `jarvis-upgrade` (audit) | ⬜ |
| 13 skills techniques (audit rapide — probablement OK) | ⬜ |
| Commands : aligner les 11 (paths `produits/saas/*`, refs `f2-X`→`X`, strings FoundryTwo, vieux portfolio) | ⬜ |
| Créer `/batch` (process validé à chaque étape) + `/archivage` (fin de semaine, scope repo entier) | ⬜ |
| Hooks (8) + `hooks-config.json` + `settings.json` : refs paths/noms | ⬜ |
| `ops/monitoring/model-tier-rules.yaml` : retirer les occurrences `F2` / aligner les refs agents `f2-X`→`X`, **sans toucher la logique de routing** (respecte D2) | ⬜ |
| **Cohérence transverse** : les commands doivent écrire aux **mêmes paths** que `action-executor.ts` (Bloc 1) | ⬜ |

### BLOC 3 — Docs charnières

| Item | Statut |
|------|--------|
| `CLAUDE-JARVIS.md` (chargé live à chaque message → prioritaire dans ce bloc) | ⬜ |
| `JARVIS.md`, `JARVIS-ARCHITECTURE-COMPLETE.md`, `JARVIS-UPGRADE-PLAN.md`, `ENTRYPOINT.md`, `HANDOFF.md` | ⬜ |
| System-prompts `romain/system-prompt.md` + `fabrice/system-prompt.md` | ⬜ |
| `BIBLE.md` §4 (volumes cold) — maj selon D9 ; réconcilier le statut "comptes produit TK/IG partagés" de l'ancienne BIBLE avec le nouveau modèle de compteurs | ⬜ |
| `CLAUDE.md`, `README.md`, `ARCH.md` — **tout à la fin** (documentent l'état final) | ⬜ |

### BLOC 4 — Frontend (après backend carré)

| Item | Statut |
|------|--------|
| Supprimer interface/mode F2 (pages, `PersonaLayout`, `login`, routing) — D6 | ⬜ |
| 2 interfaces Romain / Fabrice | ⬜ |
| Affichage : **6 compteurs perso scopés persona** (pas de vue croisée) + **1 compteur général 82 mutualisé** identique des deux côtés (D8/D9) | ⬜ |
| IH = canal de **posts** sur l'interface Romain, **sans compteur** (D11) | ⬜ |
| Strings FoundryTwo / F2-Jarvis dans `layout.tsx`, `page.tsx`, etc. | ⬜ |
| Ajustement post-branchement backend | ⬜ |

---

## 5. MÉTHODE & RÈGLES

- **Cycle par item** : audit → recap/plan → **validation R** → prompt Claude Code chirurgical (mécanique uniquement : `git mv`, `str_replace`, `sed`) **ou** fichier `.md` produit dans `outputs/` et poussé manuellement par R → vérification du ZIP renvoyé → recap.
- **R pousse et exécute lui-même.** Je produis, je ne touche jamais le repo directement.
- **Prompts chirurgicaux** : périmètre strict, un seul bloc copiable, vérifications post-exécution incluses, section "Ne PAS faire". README et fichiers de contenu = `.md` poussés à la main, jamais via Claude Code.
- **On ré-adapte, on ne supprime pas** (sauf D6 = interface F2, et D10 = archivage cross). Archiver ≠ détruire.
- **Zéro invention de données** (BIBLE §3).
- **Intouchable** : logique modèle/API (D2) · `brain/mempalace/wings/f2/`.
- **Une question à la fois.** Confirmer la compréhension avant de produire un prompt.

---

## 6. OÙ ON EN EST

- **23/05/2026** — Recadrage validé par R (backend/paths prioritaire, SDK conservé, API repoussée, frontend en dernier). Décisions D1-D9 verrouillées. Audit initial fait (backend + budget/SDK). Plan établi.
- **23/05/2026 (suite)** — Les 6 points ouverts tranchés : **O1** compteurs (modèle D8/D9, 41/persona, général 82, perso scopé sans vue croisée) ; **O2** IH → Romain, posts sans compteur (D11) ; **O3** comptes → tous existants, source = doc suivi-comptes ; **O4** model-tier-rules → retirer F2 / aligner refs agents sans toucher le routing (Bloc 2) ; **O5** rename repo GitHub → parqué, on garde "F2-Jarvis" physiquement, mais la doc ne reflète que la page hub foundrytwo (D5) ; **O6** cross-engagement → archivé dans `archives/jarvis/` (D10). Décisions D5 ajustée, D8/D9 réécrites, D10/D11 ajoutées. Section 3 vidée.
- **24/05/2026** — Bloc 0 cartographie terminée (occurrences `F2`/`FoundryTwo`/paths + `.claude/` + budget/SDK). Bloc 1 cartographié (`BLOC1-BACKEND-REMAP.md`) et découpé en 7 sous-étapes B1.1→B1.7. Constat structurel : `context.ts` et `chat.ts` sont des nœuds (cross + f2 + paths + compteurs entremêlés) → réécrits **une seule fois** chacun (context.ts en B1.5, chat.ts en B1.7) ; les sous-étapes intermédiaires ne les touchent pas.
- **24/05/2026 — B1.1 ✅** : retrait du workflow cross-engagement (5 fichiers backend : `markdown.ts`, `action.ts`, `action-executor.ts`, `jarvis-tools.ts`, `chat.ts` réflexes) ; archivé dans `archives/jarvis/2026/cross-engagement-archive.md` ; compteurs cross de `context.ts` reportés en B1.5. Vérifié (diffs exacts, accolades équilibrées, grep=0).
- **24/05/2026 — B1.2 ✅** : dépréciation du mode `f2` (option A — retrait du routage actif, historique conservé). 5 fichiers : `action.ts`, `action-executor.ts`, `jarvis-tools.ts`, `batch.ts`, `action-execute-batch.ts` (5ᵉ ajouté suite à une cascade de type détectée par Claude Code). Couche données/mémoire f2 intacte (worker, mempalace-ingest, jarvis-memory, chat-history, graph, targets, ouroboros + contrainte Supabase). `context.ts`/`chat.ts` f2 reportés en B1.5/B1.7. Vérifié.
- **24/05/2026 — B1.3 ✅** : remap des paths simples + nettoyage dossiers morts (5 fichiers : `action.ts`, `action-executor.ts`, `batch.ts`, `jarvis-tools.ts`, `markdown.ts`). `plan-hebdo.md` → `planning/plan-hebdo.md` ; `progress-semaine.md` → `tracking/progress-semaines.md` ; retrait de `distribution/`, `growth-marketing/`, `saas/` des allowed-paths + scope `repo_search`. Paths cold/engagement laissés intacts (B1.4). Vérifié (diffs exacts, accolades OK, greps OK).
- **24/05/2026 — Modèle cold/engagement VERROUILLÉ (audit exhaustif des 3 buckets) :**
  - Le repo est organisé **par compte**, et il est bon/scalable. Le problème était le **routage** (code), pas le repo.
  - **Cold = 5 plateformes.** Comptes perso (R/F) : twitter, linkedin, facebook → `{persona}/cold/cold-log-{plateforme}.md` (opérateur implicite). Comptes StoreMD partagés : tiktok, instagram → `marketing/saas-app-shopify/storemd/cold/cold-log-{plateforme}.md` (colonne **Envoyé par R/F** déjà dans le fichier).
  - **Formats cold non uniformes** : Twitter/LinkedIn 6 col ; Facebook 7 col (+Groupe source) ; TikTok/Insta 7 col (+Envoyé par). `vertical`+`insight` → colonne **Notes** (Option 2 validée).
  - **Engagement = PH + Reddit uniquement** → `{persona}/engagement/{ph,reddit}/engagement-log.md`.
  - **Aucun fichier à créer** : tous les cold/engagement-logs existent déjà dans le repo.
  - Extension future (dette documentée) : si un 2ᵉ produit a son **propre compte** sur une plateforme déjà utilisée, désambiguïser **par compte** (`cold-log-tiktok-storemd.md` / `-hokuno.md`), pas par produit.
- **25/05/2026 — B1.4a ✅ (cold, écriture)** : routage bucket + 5 formats + opérateur auto + Notes. 4 fichiers (`markdown.ts`, `action.ts`, `action-executor.ts`, `jarvis-tools.ts`). Vérifié.
- **25/05/2026 — B1.4b ✅ (engagement, écriture)** : `appendEngagementLog` réécrit (PH|REDDIT), routage `{persona}/engagement/{ph,reddit}/`, `log_interaction` passé en event-only, orphelins (`type Platform` ×2, import) retirés. Vérifié. **→ B1.4 entièrement bouclé (cold + engagement, écriture).**
- **25/05/2026 — Modèle de compteurs VERROUILLÉ (source = R, le `daily-checklist.md` du repo est FAUX, "10 partout") :** par persona/jour — Cold TikTok 10 (StoreMD), Cold Instagram 10 (StoreMD), Cold Facebook 5 (perso), Cold Twitter 5 (perso), Cold LinkedIn 5 (perso), PH 6 (perso) = **41/persona** (35 cold + 6 PH). **Général = 82** (R+F : 70 cold + 12 PH). Reddit = logué, pas de cible dure. TikTok/Insta = compte business StoreMD → lecture filtrée par colonne `Envoyé par` (R/F) ; le reste = comptes perso (dossier persona). `daily-checklist.md` à corriger (fichier de contenu, push R) ; cibles **figées dans le code** côté context.ts.
- **25/05/2026 — B1.5 ✅ (compteurs + lecture, `context.ts`)** : réécriture complète de `context.ts` + `context-types.ts`. Nouveau `CounterData` (coldTiktok/Instagram/Facebook/Twitter/Linkedin, ph, reddit, totalPersona, general, pipeline*). Cibles figées `COLD_TARGETS={tiktok:10,instagram:10,facebook:5,twitter:5,linkedin:5}`, PH 6. Retrait total cross + f2. Lecture multi-fichiers ; helper `countTodayByOperator` (col `Envoyé par`) pour StoreMD ; général = somme R+F (StoreMD compté en entier). Vérifié (2 fichiers, accolades OK, 0 résidu, logique conforme, **pas de cascade tsc**).
  - **Périmé noté → B1.7** : `chat.ts:329` (ligne compteurs injectée, vieux champs `twEng/cross/30` → affichera 0 ; `c` typé `Record<string,number>` donc compile).
  - **À revoir (passage dédié, ~B1.7)** : `targets.ts` a son propre modèle `PersonaTargets` (ancien schéma engagement) — indépendant de CounterData, rien de cassé.
- **25/05/2026 — B1.5b ✅ (recent_history, `jarvis-tools.ts`)** : handler aligné sur la lecture multi-fichiers (3 cold persona + 2 StoreMD filtré opérateur + ph + reddit + progress-semaines), helpers `recentTail` (fin de fichier = entrées récentes) + `filterByOperator` (col `Envoyé par`). Vieux fichiers uniques supprimés. Vérifié. **→ Lecture entièrement alignée (compteurs B1.5 + historique B1.5b).**
- **Reporté à la réécriture ouroboros** : refs cold/engagement + ancien modèle dans `ouroboros-cycle.ts`.
- **À clarifier au Bloc 4 (frontend)** : la route directe `/action` (`action.ts`) est-elle appelée par des boutons du frontend, et pour quelles actions ? (non bloquant pour le backend.)
- **25/05/2026 — B1.6 SAUTÉ (audit exhaustif fait)** : occurrences `FoundryTwo`/`F2-Jarvis`/`F2` = soit nom physique du repo (`const REPO="F2-Jarvis"`, gardé), soit persona f2 (meurt en B1.7 dans le system prompt), soit refs studio légitimes. Rien à nettoyer séparément. Décision R : on s'en fout du nom repo tant que ça marche ; ce qui doit mourir = la persona f2.
- **25/05/2026 — B1.7 scindé en B1.7a + B1.7b (chirurgical)** :
  - **B1.7a** ✅ vérifié (24/05) : `buildSystemPrompt` — persona f2 morte (isF2/MODE F2/modeLabel/opsFiles f2/(sauf F2)/"SELON LE MODE"), paths corrigés, param `mode` retiré + appel ajusté. 9 edits exacts, 1 fichier, pas de cascade tsc (type `Mode` toujours utilisé par resolvedMode).
  - **B1.7b** (à suivre) : `chatRoute` — ligne compteurs `chat.ts:329` (nouveaux champs, /41, /82) + `contextPaths` (retrait branche f2 + `planning/plan-hebdo.md`).
  - Plomberie data-layer f2 (`resolvedMode`, `mempalaceWing`) = laissée tolérante (Option A).
- **25/05/2026 — B1.7b ✅ vérifié** : `chatRoute` — `contextPaths` débarrassé du f2 + path `planning/plan-hebdo.md` ; `counterLine` réécrite (nouveaux champs CounterData, /41 persona, /82 général). 2 edits exacts, 1 fichier. **→ B1.7 entièrement bouclé : system prompt propre (persona f2 morte, paths à jour, compteurs au bon modèle).** Baseline vérif courante : **repo11**.
- **Reste pour clôturer le Bloc 1** : réécriture `ouroboros-cycle.ts` (paths cold/engagement + strings f2 + ancien modèle dans son prompt). **C'est le seul morceau backend restant.**
- **25/05/2026 — `targets.ts` SORTI du Bloc 1 → rework dédié post-Bloc 2** : `/targets` est vivant (fetch frontend `ui/jarvis` PersonaLayout). Un seul passage couvrira f2 + cross + migration modèle 41/82 + réécriture `parseBatch` sur le nouveau format batch. Dépend du format `BATCH-SEMAINE-N.md` figé au Bloc 2 + couplé au frontend (Bloc 4). Rien de cassé entre-temps (type indépendant de CounterData). Consigné au registre du recap.
- **25/05/2026 — B1.8 ✅ vérifié (ouroboros-cycle.ts + jarvis-tools.ts)** : 7 edits texte dans les prompts d'ouroboros (cross mort retiré ×3, paths planning//tracking/progress-semaines/cold-log/engagement ph-reddit, "3 modes/F2"→"2 personas") + micro-fix `today_timeline` (retrait "cross-engagement"). Zéro ligne de code touchée, zéro résidu, accolades OK (l'écart parenthèses -2 est de la prose préexistante, identique avant/après).
- **🎯 25/05/2026 — BLOC 1 BACKEND CLOS.** Écriture + lecture + system prompt + ouroboros tous réalignés sur le repo refondu. Baseline finale : **repo12**. Seul reste différé : `targets.ts` (post-Bloc 2). Prochaine étape : **Bloc 2 (`.claude/`) — EN ATTENTE DE VALIDATION R.**

---

*Source de vérité : repo Jarvis + `ROADMAP-IMPLEMENTATION.md` (22/05) + ce plan. Ce document est mis à jour à chaque étape franchie.*

- **29/05/2026 — B2.1 + B2.2 ✅ (brand-voice)** : conception du nouveau `brand-voice/SKILL.md` (garde-fou universel + aiguillage R/F/produit, anti-duplication, purge studio/build-in-public) validée ; exécution = ancien `f2-brand-voice` archivé (deprecated 2026-05-25), dossier scaffoldé, SKILL.md poussé par R, 7 refs ref-only renommées, `settings.json` JSON valide (alwaysLoad=[graphify, brand-voice, handoff-writer]). Reste 3 refs = fichiers B2.3. Baseline : **repo14**.
- **29/05/2026 — B2.X ✅ (canon IH)** : IH = compte FoundryTwo / voix du SaaS promu (5 fichiers : canaux/ih/context, brand-voice, romain+fabrice VOIX, storemd VOIX). Baseline **repo18**.
- **29/05/2026 — B2.3a ✅ (nettoyage mécanique)** : 5 fichiers (jarvis-upgrade CounterData+préfixes, f2-librarian/graphify-all/morning paths, launch leak-detector+paths). Baseline **repo17**.
- **29/05/2026 — B2.3b ✅ (refonte skills voix)** : découpage par langue abandonné → skills **par entité** `marketing/{romain,fabrice,storemd}` (tout en anglais, build-in-public mort), archivage marketing-fr/en, correction `f2-marketer`. Détail : note de suivi B2.3b dans `BLOC2-CLAUDE-CONFIG-PLAN.md`. Baseline **repo19→22**.
- **29/05/2026 — B2.4 ✅ (`/batch`)** : `commands/batch.md` orchestrateur (→ batch-template + dernier batch S11, S[N] via charte, 7 blocs + validation R, dispatch, archivage). Baseline **repo23**.
- **29/05/2026 — B2.5 ✅ (`/archivage`)** : `commands/archivage.md` orchestrateur (→ charte `archives/README.md` §2.2-2.4, gate validation R, bascule annuelle exclue). Baseline **repo24** (vérifié ✅).
- **01/06/2026 — B2.6 ✅ (`/recap`)** : `commands/recap.md` orchestrateur (→ README local de `tracking/recap-sessions/`, format adaptable + MAJ index, frontière ≠ `/handoff` ≠ `/debrief`), corrigé après audit puis vérifié. Baseline **repo25**.
- **03/06/2026 — B2.7 ✅ (hooks)** : audit des 6 hooks non-cognitifs + `hooks-config.json`. Aucune ref morte (f2/paths/budget), paths valides, budget aligné (config == limits.yaml), JSON OK. **Rien à nettoyer** (comme B1.6). Baseline **repo25** (aucun changement).
- **03/06/2026 — B2.8 ✅ (cognition)** : audit des 6 fichiers cognition (`f2-thinker`, `/think`, `/cognition`, `cognitive-loader`, 2 hooks cognitifs). Refs valides, hooks cognitifs câblés (`settings.json`), aucune ref morte. **Rien à nettoyer.** Constat transverse noté au RECAP §8 : `settings.json` = source réelle des hooks, `hooks-config.json` doc-only, `mempalace-save` non câblé (cron futur, impact nul). Baseline **repo25**.
- **04/06/2026 — B2.9 ✅ (README .claude)** : refresh complet du `.claude/README.md` (comptes faux 16/7/9/6 → réels 19/8/14/8 ; voix marketing par entité ; +`/batch` `/archivage` `/recap` `/think` `/cognition` ; +`f2-thinker` ; +2 hooks cognitifs ; budget vérifié vs limits.yaml ; date 04/06). Poussé + vérifié identique. **→ 🎯 BLOC 2 CLOS (B2.1→B2.9). Baseline repo26.**
- **04/06/2026 — Bloc 3 démarré (docs/cleanup).** Plan : `BLOC3-DOCS-REMAP-PLAN.md` (découpage par fichier B3.1→B3.10). **B3.1 ✅ `README.md`** : refs mortes `f2/`/@foundrytwo retirées (arbre, section « gérez @foundrytwo » → section IH `marketing/canaux/ih/`, tableau), marque FoundryTwo intacte. Vérifié **repo27**. **B3.2 ✅ `ARCH.md`** : repoint `marketing`, bloc f2/ (40 l.) supprimé, section « État 26/04 » périmée supprimée. Vérifié **repo28** (diff = 3 zones). **B3.3 ✅ `CLAUDE.md`** : 9 zones (refs f2//@foundrytwo mortes ; section FoundryTwo = hub `foundrytwo.com` + IH ; repoint `marketing/` ; +3 commandes `/batch` `/archivage` `/recap` ; compteurs skills 16→19, commands 11→14). Vérifié **repo29**. **B3.4 ✅ `marketing/contenu/formats.md`** : 7 corrections (persona @foundrytwo Twitter/LinkedIn mort retiré ; tableau voix §9.1 = voix du SaaS promu ; PH = maker R/F perso ; chemin mort f2/system-prompt ; branding §10 préservé). Vérifié **repo30**. **B3.5 ✅ `marketing/README.md`** : 4 corrections (page LinkedIn company FoundryTwo ABANDONNÉE ; @foundrytwo Twitter retiré ; ligne tableau → FoundryTwo IH voix du SaaS promu ; « Profils perso = SEUL canal » conservé). Vérifié **repo31**. **B3.6 ✅ `marketing/jarvis/prompts.md`** : 7 corrections (fichier entier — persona F2 retiré ; toggle Mode F2 retiré [rapatrié du Bloc 4] ; batch = 1 post IH FoundryTwo voix SaaS promu [décision b] ; prompts tweet/thread/plan-hebdo ; cross-reply F↔R préservé). Vérifié **repo32**. **B3.7 ✅ `la-toile/la-toile.md` + `la-toile/README.md`** : 6 changements (§3.4 FoundryTwo = hub + IH studio-free ; bio Twitter F → lien foundrytwo.com ; marque FoundryTwo en complet ; fil cassé supprimé ; nœud README). Vérifié **repo33**. **B3.8 ✅ `patterns/dual-llm-sonnet-haiku.md` + `.claude/skills/brand-voice/SKILL.md`** : 3 repoints `marketing-fr`→`marketing/romain`, `marketing-en`→`marketing/fabrice`. Vérifié **repo34**. → **LOT RACINE / repoint marketing-fr/en = TERMINÉ** (tous les fichiers vivants repointés). **B3.9 ✅ archivage system-prompts** : `romain/` + `fabrice/system-prompt.md` archivés (git mv → `archives/2026/05-dossiers-deprecated/system-prompts-projets-claude-2026-06-07/`) + 2 refs mortes corrigées (ARCH.md, prompts.md). Vérifié **repo35**. **B3.10 ✅ `CLAUDE-JARVIS.md`** : audit exhaustif des 3 artefacts → architecture déjà saine (buildSystemPrompt = system-prompt Jarvis canonique ; CLAUDE.md = manuel Claude Code ; CLAUDE-JARVIS.md = contexte runtime). Réalignement §2bis sur CLAUDE.md. Vérifié **repo36**.

## 🔒 BLOC 3 CLÔTURÉ (B3.1 → B3.10) — baseline repo36
Tous les docs/cleanup faits : README, ARCH, CLAUDE, formats, marketing/README, prompts, la-toile, repoint marketing-fr/en, archivage system-prompts, identité Jarvis. **Prochaine étape : BLOC 4** — plan chirurgical créé le 08/06 : `BLOC4-FRONTEND-PLAN.md` (B4.1 targets.ts [retrait f2 + canon 41/82] → B4.2 retrait toggle → B4.3 démêlage mode f2 ~12 composants → B4.4 labels F2 → B4.5 archivage ui/web → B4.6 scalabilité multi-business [STATUS.md en contextPaths + design sélecteur entité] → B4.7 docs Mode F2). Audit de cadrage fait sur repo36 : suite `/api/action/*` + 2 interfaces R/F + CounterTile DÉJÀ construits (hors scope) ; le vrai chantier = mode f2 tissé dans ~12 composants + targets.ts encore f2. Décisions actées : ui/web ARCHIVÉ ; wings mémoire f2 = affichage CONSERVÉ ; business = propriété du contenu, pas un mode UI. **08/06 — 3 décisions du plan toutes tranchées** : canon compteurs = ligne chat.ts l.318 (Cold TikTok/10 · Insta/10 · FB/5 · TW/5 · LI/5 + PH/6 = 41/persona, 82 général) ; items F2 historiques affichés sur les 2 cockpits (timeline commune), attribution F2→Romain gardée, seul le toggle retiré ; sélecteur business à la sortie d'Hokuno ; dette daily-checklist rayée (fichier absent). Plan sans question ouverte.
