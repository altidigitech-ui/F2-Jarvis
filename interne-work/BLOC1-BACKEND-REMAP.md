# BLOC 1 — BACKEND / CODE : TABLE DE REMAP & REFONTE

> Cartographie d'exécution du Bloc 1 (corps vivant de Jarvis). Lecture fine de `action-executor.ts`, `context.ts`, `chat.ts`, `jarvis-tools.ts`, `markdown.ts` + format réel de `progress-semaines.md`.
> Établi le 23/05/2026. **Aucune modif sans validation R.** Ce doc = base des prompts chirurgicaux Bloc 1.

---

## A. CE QUE CONTIENT LE BLOC 1 (3 natures de travail)

1. **Remap de paths** — le backend lit/écrit sur l'ancienne arbo (mécanique).
2. **Changements structurels** — retirer `f2` (persona+mode, D6), archiver le cross-engagement (D10), élargir les plateformes cold (TikTok/Insta), nettoyer les allowed-paths.
3. **Refonte du modèle de compteurs** — `context.ts` + labels `progress-semaines.md` + helpers `markdown.ts` + side-effects (D8/D9). C'est une **réécriture**, pas un remap.

> Bloc 1 est trop gros pour un seul prompt Claude Code. Découpage proposé en §F.

---

## B. REMAP DE PATHS (exact, ancien → nouveau)

Nouvelle arbo opérationnelle confirmée : `{persona}/planning/`, `{persona}/cold/cold-log-{plateforme}.md`, `{persona}/engagement/{ph,reddit}/engagement-log.md`, `{persona}/tracking/progress-semaines.md`.

### `backend/jarvis/src/lib/action-executor.ts` — `resolveFilePath()` (write targets)

| action_type | Path actuel | Path cible |
|-------------|-------------|-----------|
| `mark_published` | `{persona}/plan-hebdo.md` | `{persona}/planning/plan-hebdo.md` |
| `log_cold` / `batch_cold` / `queue_cold_targets` / `update_cold_reply` | `{persona}/cold/cold-outreach-log.md` (fichier unique) | `{persona}/cold/cold-log-{platformSlug}.md` (par plateforme) |
| `log_engagement` | `{persona}/engagement/engagement-log.md` | `{persona}/engagement/{platformSlug}/engagement-log.md` |
| `log_interaction` / `resolve_alert` | `{persona}/progress-semaine.md` | `{persona}/tracking/progress-semaines.md` |
| `log_analytics` | `{persona}/progress-semaine.md` | `{persona}/tracking/progress-semaines.md` |
| `mark_cross_published` | `{persona}/engagement/cross-execution-log.md` | **SUPPRIMÉ** (archivé, D10) |
| `log_decision` | `tracking/decisions-log.md` | inchangé ✅ |

### `action-executor.ts` — side-effects (`applySideEffects`)
Tous les `ghUpdate(\`${persona}/progress-semaine.md\`...)` → `{persona}/tracking/progress-semaines.md`. Labels d'incrément (`incrementCurrentCounter`) à aligner sur les nouveaux labels (§D).

### `action-executor.ts` — `CREATE_FILE_ALLOWED_PREFIXES`
Retirer : `f2/`, `saas/`, `distribution/`, `growth-marketing/` (arbos mortes). Garder : `produits/`, `marketing/`, `strategie/`, `patterns/`, `tracking/`, `archives/`, `la-toile/`, `ops/`, `fabrice/`, `romain/`, `brain/jarvis-workspace/`, `brain/context-cognitif/`, `.claude/agents/`.

### `backend/jarvis/src/routes/context.ts` — reads
| Read actuel | Cible |
|-------------|-------|
| `{prefix}/plan-hebdo.md` | `{persona}/planning/plan-hebdo.md` |
| `{prefix}/cold/cold-outreach-log.md` | `{persona}/cold/cold-log-*.md` (agrégation multi-fichiers) |
| `{prefix}/engagement/engagement-log.md` | `{persona}/engagement/{ph,reddit}/engagement-log.md` |
| `{prefix}/progress-semaine.md` | `{persona}/tracking/progress-semaines.md` |
| `{prefix}/cross-engagement-tracker.md` | **SUPPRIMÉ** (D10) |
| `{prefix}/engagement/cross-execution-log.md` | **SUPPRIMÉ** (D10) |
| `f2/plan-hebdo.md` | **SUPPRIMÉ** (mode F2, D6) |
| `fabrice/pipeline-conversion.md` | à vérifier (le path a pu bouger sous `marketing/saas-app-shopify/`) |

### `backend/jarvis/src/routes/chat.ts` — `contextPaths` + `opsFiles`
- `{persona}/plan-hebdo.md` → `{persona}/planning/plan-hebdo.md`
- mode `f2` → contextes `f2/context.md` + `f2/plan-hebdo.md` : **SUPPRIMÉS** (D6)
- `opsFiles` : `cold-outreach-log.md` → `cold/cold-log-*.md` ; `engagement-log.md` → `engagement/{ph,reddit}/` ; `cross-execution-log.md` + `cross-engagement-tracker.md` → **retirés** ; `progress-semaine.md` → `tracking/progress-semaines.md`

### `backend/jarvis/src/lib/jarvis-tools.ts`
- `repo_search` scope enum : retirer `f2`, `growth-marketing` → ajouter `produits`, `marketing` (+ garder `fabrice`, `romain`, `patterns`, `strategie`, `all`)
- `recent_history` reads : `progress-semaine.md` → `tracking/progress-semaines.md` ; `cold/cold-outreach-log.md` → `cold/cold-log-*.md` ; `engagement/engagement-log.md` → `engagement/{ph,reddit}/`
- strings `F2-Jarvis` ×8 + `OWNER/REPO` hardcodés (`altidigitech-ui` / `F2-Jarvis`) : **garder** le nom physique GitHub `F2-Jarvis` (D5/O5 parqué), mais aligner les strings descriptives "repo F2-Jarvis" → "repo Jarvis"

---

## C. CHANGEMENTS STRUCTURELS

| # | Changement | Fichiers |
|---|-----------|----------|
| S1 | **Retirer `f2`** du type `Persona` + mode `f2` + toute branche `isF2` | `action-executor.ts` (type ligne 17, `effectivePersona` 538), `chat.ts` (type `Mode`, branches), `context.ts` (isF2/activePrefix/parseF2Planning/etc.) |
| S2 | **Archiver le cross-engagement (D10)** : extraire vers `archives/jarvis/` un `.md` documentant le système, puis retirer du code actif | `action-executor.ts` (case `mark_cross_published` 189-193 + transform 303-348 + side-effect 444-462), `context.ts` (5 fonctions cross + counters), `chat.ts` (patterns "cross fait sur B6", réflexes), `markdown.ts` (`markCrossPublished`) |
| S3 | **Élargir les plateformes cold** : `appendColdLog` typé `"TWITTER"\|"LINKEDIN"` → ajouter `FACEBOOK`, `TIKTOK`, `INSTAGRAM` ; idem `Platform` type | `markdown.ts` (63), `action-executor.ts` (238, 247-249, 265-267, type 18) |
| S4 | **Créer les cold-logs manquants** : `{persona}/cold/cold-log-tiktok.md` + `cold-log-instagram.md` (R et F) — n'existent pas, alors que TK+IG = 20/41 du volume | fichiers `.md` (poussés par R, pas Claude Code) |
| S5 | **Nettoyer strings** FoundryTwo/F2-Jarvis (hors hub/IH légitimes) | `chat.ts` (system prompt "co-fondateur de FoundryTwo"), `jarvis-memory.ts`, `ouroboros-cycle.ts`, `mempalace.ts`, `github.ts`, `graph.ts`, `batch.ts`, `action.ts` |

---

## D. REFONTE DU MODÈLE DE COMPTEURS (D8/D9)

### Modèle cible (décision R finale)
- **Par persona, scopé à l'interface** (R ne voit pas F) : 6 compteurs → `cold TK 10` · `cold IG 10` · `cold X 5` · `cold LKD 5` · `cold FB 5` · `PH 6` = **41/persona**.
- **Général mutualisé** = somme des actions R + F, **identique sur les 2 interfaces** = **82**. → `context.ts` doit lire les DEUX personas et sommer.
- **IH** = posts, **aucun compteur** (D11). N'entre pas dans le 82.
- Plus de modèle "engagement 30 interactions" ni cross.

### Impact `context.ts`
Réécrire `counters` : sortir `twEng/liCom/reddit/facebook/ihPh/cross`. Entrée : 6 compteurs perso (par plateforme cold + PH) + `general` (somme R+F). Supprimer `parseObjectiveItems` version "30 interactions", `countCross*`, `parseCross*`, `parseF2Planning`.

### Impact `progress-semaines.md` (CONTRADICTION À TRANCHER — voir §E1)
Le fichier actuel a déjà `## COMPTEURS COURANTS` mais étiquette `Cold StoreMD TikTok (partagé)` / `Instagram (partagé)` → **contredit** le modèle par-persona. Labels cibles proposés (par persona) : `Cold TikTok`, `Cold Instagram`, `Cold Twitter`, `Cold LinkedIn`, `Cold Facebook`, `PH`.

### Impact `markdown.ts` + side-effects
`incrementCurrentCounter` appelé avec `"Cold envoyés"` générique → doit cibler le label de plateforme exact (`"Cold TikTok"`, etc.). Aligner les labels entre le helper, les side-effects et le fichier.

---

## E. POINTS À CONFIRMER AVANT PROMPTS (décisions internes Bloc 1)

| # | Point | Recommandation |
|---|-------|----------------|
| **E1** | **Contradiction "(partagé)".** Le repo dit TikTok/Insta partagés ; ta dernière décision dit par-persona. Lequel gagne ? | Ta dernière décision (par-persona, général = somme). → on aligne `progress-semaines.md` en retirant "(partagé)". **Confirme.** |
| **E2** | **Destination de l'archivage cross (D10 vs archives figées).** Nouveau dossier `archives/jarvis/` OU intégrer dans une catégorie existante (`archives/2026/07-tech-legacy/`) pour respecter la convention figée ? | `archives/2026/07-tech-legacy/` (respecte le système figé, pas de nouveau top-level). **À trancher.** |
| **E3** | **Cold-logs TikTok/Insta (S4).** Je te fournis les templates `.md` (tu pousses), structure identique aux cold-logs existants ? | Oui, copier le format de `cold-log-twitter.md`. **Confirme.** |
| **E4** | **`pipeline-conversion.md`** (lu par context.ts pour Fabrice) : path actuel introuvable tel quel — il a dû bouger sous `marketing/saas-app-shopify/`. | Je localise le vrai path en début de Bloc 1. Pas bloquant. |

---

## F. DÉCOUPAGE D'EXÉCUTION PROPOSÉ (sous-prompts Bloc 1)

Ordre logique, du plus structurant au cosmétique. Chaque étape = audit fin → recap → validation → 1 prompt chirurgical → vérif ZIP.

1. **B1.1 — Archiver le cross-engagement** (D10/S2/E2) : produire le `.md` d'archive + prompt de retrait du code cross (action-executor, context.ts, chat.ts, markdown.ts).
2. **B1.2 — Retirer le mode/persona `f2`** (D6/S1) : nettoyer action-executor, chat.ts, context.ts.
3. **B1.3 — Remap de tous les paths** (§B) : action-executor + context.ts + chat.ts + jarvis-tools.ts, en un passage cohérent.
4. **B1.4 — Élargir plateformes cold + créer cold-logs TK/IG** (S3/S4/E3) : markdown.ts + action-executor + fichiers `.md`.
5. **B1.5 — Refonte compteurs** (§D) : context.ts (modèle + somme R+F) + labels progress-semaines.md + incréments markdown.ts/side-effects.
6. **B1.6 — Nettoyage strings** (S5) : FoundryTwo/F2-Jarvis dans les .ts backend.
7. **B1.7 — Réécriture du system prompt hardcodé `chat.ts`** : identité Jarvis (plus "co-fondateur FoundryTwo"), 22 réflexes & patterns à jour (sans cross), compteurs à jour. (Le plus délicat → en dernier, une fois la structure stable.)

Note : chaque prompt touchant un `.ts` finit par `npx tsc --noEmit` en vérification post-exécution (le backend a déjà un guard tsc sur les patch_file).

---

## G. STATUT

Cartographie Bloc 1 : ✅. Lecture fine faite (`action-executor`, `context`, `chat`, `jarvis-tools`, `markdown`, `progress-semaines`). En attente : validation du découpage §F + tranche des points §E. Aucune modif repo.

---

*Compagnon de `PLAN-BRANCHEMENT-JARVIS.md`.*
