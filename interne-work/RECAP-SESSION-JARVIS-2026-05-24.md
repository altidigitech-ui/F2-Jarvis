# RECAP SESSION — Branchement Jarvis sur le repo refondu

> **Démarré le :** 24/05/2026 · **Dernière maj :** 24/05/2026
> **Nature :** fichier VIVANT — mis à jour à chaque étape (pas un recap jetable). Sert de point de reprise unique.
> **Statut global :** **🎯 BLOC 1 BACKEND CLOS** (B1.1 → B1.8 ✅). Écriture + lecture + system prompt + ouroboros réalignés. **B1.6 sauté.** Seul différé : `targets.ts` (post-Bloc 2). **Prochaine étape : Bloc 2 (`.claude/`) — en attente de validation R.** Baseline : repo12.

---

## 1. OBJECTIF DE LA SESSION

Rebrancher **Jarvis** (système AI agentique) sur le repo **F2-Jarvis** entièrement refondu, pour qu'il soit pleinement opérationnel sur les workflows récurrents de R : batch hebdo, archivage, recap de session, réponse aux commentaires, logging cold/engagement, compteurs. **PAS un MVP** — StoreMD est live sur le Shopify App Store.

---

## 2. MÉTHODE DE TRAVAIL (à respecter à chaque étape)

- **Boucle :** audit exhaustif → recap → **validation explicite de R** → prompt Claude Code chirurgical (1 bloc copier/coller, dans la conversation) → R exécute → **Claude vérifie le ZIP** (diffs exacts + équilibre accolades/parenthèses + greps ciblés) → recap.
- R pousse les fichiers sur GitHub et exécute les prompts lui-même. **R n'a pas de terminal** → c'est Claude qui vérifie tout dans le ZIP (le vrai `tsc` reste côté R / côté Claude Code à l'exécution ; le ZIP n'embarque pas `node_modules`).
- **Prompts = dans la conversation**, jamais en fichier. `outputs/` = uniquement les livrables `.md` demandés.
- **Zéro invention.** On lit les fichiers à jour **exhaustivement** avant de raisonner. (Leçon de session : 4h perdues à raisonner sur une vue partielle — toujours auditer d'abord.)
- Fichiers-nœuds (`context.ts`, `chat.ts`, `ouroboros-cycle.ts`) = **réécrits une seule fois** chacun, jamais patchés piecemeal.

---

## 3. DÉCISIONS VERROUILLÉES

- **D1** Rebranchement total sur repo refondu.
- **D2** SDK conservé tel quel (Agent SDK, binaire `claude`). Migration API + multi-LLM = chantier ultérieur.
- **D5** Système nommé "Jarvis" partout dans la doc/contenu ; repo GitHub physique reste "F2-Jarvis" ; archives jamais réécrites.
- **D6** Plus d'interface/persona `f2`. 2 interfaces : Romain, Fabrice. F2 existe uniquement comme page hub HTML + nom IH.
- **D8/D9** Compteurs **par persona**, scopés à l'interface (pas de vue croisée) : 6 compteurs (cold TK, IG, X, LKD, FB + PH) + 1 général. IH = publish-only, aucun compteur.
- **D10** Cross-engagement obsolète → archivé + retiré du code actif (réactivable plus tard).
- **D11** IH opéré par Romain, voix FoundryTwo, aucun compteur.
- **Option A (mode f2)** : déprécier (couper vers l'avant) mais **conserver tout l'historique** (conversations Supabase `mode=f2`, mémoire `wings/f2/`, contrainte CHECK inchangée). Aucune migration DB.
- **Modèle cold/engagement VERROUILLÉ :**
  - **Cold = 5 plateformes.** Perso (R/F) : twitter/linkedin/facebook → `{persona}/cold/cold-log-{plateforme}.md` (opérateur implicite). StoreMD partagé : tiktok/instagram → `marketing/saas-app-shopify/storemd/cold/cold-log-{plateforme}.md` (colonne **Envoyé par R/F**).
  - **Formats cold non uniformes** : Twitter/LinkedIn 6 col ; Facebook 7 col (+Groupe source) ; TikTok/Insta 7 col (+Envoyé par). `vertical`+`insight` → colonne **Notes** (Option 2).
  - **Engagement = PH + Reddit uniquement** → `{persona}/engagement/{ph,reddit}/engagement-log.md`.
  - Organisation **par compte** (le repo est bon/scalable). Extension future : désambiguïsation **par compte** si 2 produits partagent une plateforme (`cold-log-tiktok-storemd.md` / `-hokuno.md`), jamais par produit.

---

## 4. FICHIERS DE RÉFÉRENCE (repo F2-Jarvis)

**Code backend (surface cold/engagement/compteurs) :**
- `backend/jarvis/src/lib/markdown.ts` — helpers d'écriture (appendColdLog, appendEngagementLog, appendColdQueue, updateColdReply, appendTableRow, appendRowToTable)
- `backend/jarvis/src/lib/action-executor.ts` — resolveFilePath + applyTransform + applySideEffects (flux conversationnel)
- `backend/jarvis/src/routes/action.ts` — route directe `/action`
- `backend/jarvis/src/routes/batch.ts` — route `/batch`
- `backend/jarvis/src/routes/context.ts` — **compteurs + lecture** (cible B1.5, pas encore touché)
- `backend/jarvis/src/routes/chat.ts` — **system prompt hardcodé** (cible B1.7, pas encore touché)
- `backend/jarvis/src/lib/jarvis-tools.ts` — tools (propose_action, repo_search, recent_history…)
- `backend/jarvis/src/lib/ouroboros-cycle.ts` — cycle nuit (réécriture ultérieure)
- `supabase-migrations/001_jarvis_memory.sql` — contrainte CHECK `mode in ('normal','f2')` (NE PAS migrer)

**Données / structure (sources de vérité opérationnelles) :**
- `tracking/suivi-comptes.md` — tous les comptes (perso R/F + business StoreMD) avec handles/URL
- `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` — UTMs StoreMD
- `romain/` · `fabrice/` — buckets perso (cold tw/li/fb, engagement ph/reddit, planning, tracking)
- `marketing/saas-app-shopify/storemd/cold/` — cold StoreMD (tiktok/insta) ; `…/recherche/` — recherche cibles mutualisée
- `archives/jarvis/2026/cross-engagement-archive.md` — archive du système cross (poussée par R)

**Docs de cadrage (uploadés par R) :**
- `ROADMAP-IMPLEMENTATION.md` · `PROMPT-REPRISE-BRANCHEMENT-JARVIS.md`

---

## 5. FICHIERS CRÉÉS (pointeurs — dans `outputs/`)

> Ce sont les livrables produits cette session. Pointeurs uniquement, contenu dans les fichiers eux-mêmes.

- **`PLAN-BRANCHEMENT-JARVIS.md`** — tracker maître (décisions D1-D11, table des blocs avec statuts, journal détaillé "où on en est"). **C'est le document de suivi principal.**
- `BLOC0-CARTOGRAPHIE-AUDIT.md` — cartographie de référence (occurrences F2/FoundryTwo/paths, `.claude/`, budget).
- `BLOC1-BACKEND-REMAP.md` — table de remap + découpage Bloc 1 en sous-étapes.
- **`BLOC2-CLAUDE-CONFIG-PLAN.md`** — fichier-plan détaillé du Bloc 2 (`.claude/`) : cartographie, constats obsolètes (7 fichiers), décisions D-A→D-G, découpage B2.1→B2.8.
- `B1.1/cross-engagement-ARCHIVE.md` — doc d'archive du cross (poussée par R dans `archives/jarvis/2026/cross-engagement-archive.md`).
- `B1.1/PROMPT-B1.1-retrait-cross.md` — prompt B1.1 (historique ; depuis, les prompts sont livrés dans la conversation).
- **`RECAP-SESSION-JARVIS-2026-05-24.md`** — ce fichier (vivant).

---

## 6. TRAVAIL ACCOMPLI

| Étape | Objet | Statut |
|-------|-------|--------|
| Bloc 0 | Cartographie/audit exhaustif (occurrences, `.claude/`, budget, 3 surfaces Jarvis) | ✅ |
| B1.1 | Retrait workflow cross-engagement (5 fichiers) + archivage | ✅ vérifié |
| B1.2 | Dépréciation mode f2 — option A (5 fichiers, historique conservé) | ✅ vérifié |
| B1.3 | Remap paths simples (plan-hebdo→planning, progress-semaine→tracking/progress-semaines) + nettoyage dossiers morts | ✅ vérifié |
| B1.4a | Cold — routage bucket + 5 formats + opérateur auto + Notes (4 fichiers) | ✅ vérifié |
| B1.4b | Engagement — routage PH/Reddit + format + log_interaction event-only (4 fichiers) | ✅ vérifié |
| B1.5 | Compteurs + lecture — réécriture `context.ts` + `context-types.ts` (nouveau `CounterData` par persona + général, cibles figées, retrait cross/f2, lecture multi-fichiers, filtre opérateur StoreMD) | ✅ vérifié |
| B1.5b | recent_history (`jarvis-tools.ts`) — lecture multi-fichiers cold/engagement + filtre opérateur StoreMD + tail (entrées récentes) | ✅ vérifié |
| B1.6 | Strings FoundryTwo/F2-Jarvis | ⏭️ sauté (rien de légitime à renommer) |
| B1.7a | `chat.ts` `buildSystemPrompt` — mort persona f2 + paths corrigés + retrait param `mode` (9 edits) | ✅ vérifié |
| B1.7b | `chat.ts` `chatRoute` — contextPaths sans f2 + counterLine nouveaux champs (/41, /82) | ✅ vérifié |
| B1.8 | `ouroboros-cycle.ts` (7 edits prompts : cross mort, paths, 2 personas) + micro-fix `jarvis-tools.ts:385` | ✅ vérifié |

---

## 7. 👉 OÙ REPRENDRE

**🎯 BLOC 1 BACKEND CLOS (B1.1 → B1.8 vérifiés). Baseline : `repo12`.** Écriture (cold/engagement), lecture (compteurs `context.ts` + historique `recent_history`), system prompt `chat.ts` (persona f2 morte, paths, compteurs 41/82), et `ouroboros-cycle.ts` (prompts nettoyés) — tout est réaligné. `targets.ts` = seul différé (post-Bloc 2, voir registre §8).

**Prochaine étape : BLOC 2 — `.claude/` — EN ATTENTE DE VALIDATION R (ne pas enchaîner sans go).**
Contenu prévu (à cadrer par audit exhaustif d'abord) :
- Agents `f2-*` → renommage/réalignement.
- Skill `f2-brand-voice` → `brand-voice`.
- Commandes : revue de l'existant + **créer `/batch` et `/archivage`**.
- Hooks éventuels.
- **Figer le format `BATCH-SEMAINE-N.md`** (prérequis du futur rework `targets.ts`).
- Combler le workflow « recap de session » (≠ `/debrief` post-mortem).

Méthode inchangée : audit exhaustif → recap → validation → prompts chirurgicaux → vérif ZIP.

**Ensuite : Bloc 2** (`.claude/` : agents f2-*→X, skill f2-brand-voice→brand-voice, créer `/batch` et `/archivage`, hooks), **Bloc 3** (docs), **Bloc 4** (frontend : 2 interfaces, suppression interface f2, affichage nouveaux compteurs, clarifier route `/action`).

---

## 8. REGISTRE DES REPORTS (rien ne doit se perdre)

> Tout ce qu'on a sciemment « réorienté plus tard » est consigné ici, avec le **bloc cible** et la **raison**. À relire avant d'attaquer chaque nouveau bloc.

### Reste du Bloc 1 (backend)
- ✅ **`ouroboros-cycle.ts`** — FAIT (B1.8) : prompts nettoyés (cross mort, paths planning//tracking, "2 personas").
- ✅ **`jarvis-tools.ts:385`** — FAIT (B1.8) : "cross-engagement" retiré de la description `today_timeline`.
- **→ Bloc 1 backend CLOS.**

### Rework dédié `targets.ts` — APRÈS Bloc 2, en pack avec Bloc 4
- **Un seul passage** couvrant : (a) tuer persona **f2** (DEFAULTS.f2, TargetsResponse.f2, sections 7-8 du parseBatch) ; (b) tuer **cross** (section 2 + section 9 cascade) ; (c) migrer `DEFAULTS`/`PersonaTargets` de l'ancien modèle (twEng/liCom/reddit/facebook/ih/ihPh/engTarget 30-48) vers le **modèle 41/82** ; (d) réécrire `parseBatch` pour le **nouveau format `BATCH-SEMAINE-N.md`**.
- **Pourquoi pas maintenant** : le parsing dépend à 100% du format du batch, **figé seulement au Bloc 2** (`/batch`). Et l'affichage est dans le frontend `ui/jarvis` PersonaLayout (Bloc 4). Calcul = backend (dynamique, gardé) ; affichage = frontend. État actuel : **rien de cassé** (type indépendant de CounterData, compile, renvoie l'ancien modèle avec fallback frontend).

### Bloc 2 — `.claude/`
- Agents `f2-*` → X · skill `f2-brand-voice` → `brand-voice` · commandes + **créer `/batch` et `/archivage`** · hooks.
- **Combler le workflow « recap de session »** : `/debrief` existant = post-mortem ≠ recap session (le besoin que ce fichier-ci incarne).
- C'est ici qu'on **fige le format `BATCH-SEMAINE-N.md`** (prérequis du rework `targets.ts`).

### Bloc 3 — docs
- `CLAUDE-JARVIS.md`, `JARVIS.md`, `BIBLE`, `README`, `ARCH`… (identité Jarvis, structure).

### Bloc 4 — frontend (`ui/web` + `ui/jarvis`)
- **Supprimer l'interface f2**, 2 interfaces (Romain, Fabrice).
- **Rebrancher l'affichage des compteurs** sur le nouveau `CounterData` (coldTiktok/Instagram/Facebook/Twitter/Linkedin, ph, reddit, totalPersona /41, general /82). Les pages `ui/web/app/*.tsx` lisent encore les anciens champs.
- **PersonaLayout (`ui/jarvis`)** : aligner l'interface `PersonaTargets` + `TARGETS_FALLBACK` sur le rework `targets.ts` (les deux bougent ensemble).
- **Clarifier la route `/action`** : est-elle appelée par des boutons du frontend, et pour quelles actions ?

### Décisions actées / dette
- **Plomberie data-layer f2 laissée tolérante (Option A)** : `resolvedMode`, `mempalaceWing="f2"`, conversations Supabase `mode=f2`, mémoire `wings/f2/`, contrainte CHECK `mode in ('normal','f2')` (non migrée). Historique conservé, jamais servi en live (plus d'interface f2). À ne toucher QUE si un nettoyage data Supabase/mempalace est un jour décidé.
- **`daily-checklist.md` est FAUX** (« 10 partout ») : à corriger vers le modèle réel (TikTok 10 · Insta 10 · FB 5 · Twitter 5 · LinkedIn 5 · PH 6 = 41/persona, 82 général). Fichier de contenu → push manuel R.
- **Dette cold multi-produits** : désambiguïsation **par compte** (`cold-log-tiktok-storemd.md` / `-hokuno.md`) le jour où un 2ᵉ produit fait du cold sur une plateforme déjà utilisée.

---

*Fichier vivant. Mettre à jour la section 6 (accompli), la section 7 (où reprendre), ce registre (section 8) et la date en tête à chaque étape franchie.*
