# BLOC 2 — `.claude/` (config Claude Code) — PLAN DÉTAILLÉ

> **Baseline :** repo12 (post-Bloc 1 backend clos). **Date plan :** 24/05/2026.
> **Méthode (inchangée depuis Bloc 0/1) :** ce fichier = cartographie + découpage. Ensuite, pour CHAQUE sous-étape : audit ciblé → recap → **validation R** → 1 prompt Claude Code chirurgical (dans la conversation) → R pushe/exécute → vérif ZIP (diff + greps) → maj trackers.
> **Périmètre :** uniquement `.claude/` (config Claude Code que **Fabrice** utilise en terminal). C'est **distinct** de l'app web (`ui/jarvis/` + `backend/jarvis/`, déjà traités au Bloc 1 / à venir au Bloc 4).

---

## 1. CARTOGRAPHIE `.claude/` (état réel repo12)

### Agents (`.claude/agents/`, **8**)
| Fichier | Rôle | Modèle | Invoqué par |
|---|---|---|---|
| `f2-architect.md` | décisions techniques, trade-offs | Sonnet | — |
| `f2-dev.md` | code production-ready | Sonnet | — |
| `f2-designer.md` | UI/UX (charge 4 skills design) | Sonnet | — |
| `f2-marketer.md` | posts, UTM, voix R/F | Sonnet | `/think` |
| `f2-auditor.md` | post-mortem | Sonnet | `/debrief` |
| `f2-librarian.md` | retrieval repo | Haiku | — |
| `f2-accountant.md` | budget/tokens | Haiku | `/budget`, `/graphify-all` |
| `f2-thinker.md` | analyse métacognitive | Sonnet | `/think` |

→ **Les agents sont invoqués PAR NOM dans les commandes** : tout rename est couplé (fichier + toutes les refs).

### Commandes (`.claude/commands/`, **11**)
`budget`, `cognition`, `debrief`, `graphify-all`, `handoff`, `jarvis`, `launch`, `morning`, `review-proposals`, `status`, `think`.
→ Le README n'en liste que 9 (manquent `cognition` + `think`).

### Skills (`.claude/skills/`, **17**)
- **Always-on** (settings.json) : `graphify`, `f2-brand-voice`, `handoff-writer`.
- **On-demand** : `ui-ux-pro-max`, `frontend-design`, `shadcn-ui`, `web-interface-guidelines`, `web-accessibility`, `brain-3d-renderer`, `shopify-gql`, `supabase-rls`, `stripe-integration`, `marketing-fr` (voix Romain), `marketing-en` (voix Fabrice), `saas-launch-checklist`, `context-md-generator`, `cognitive-loader`, `jarvis-upgrade`.
→ Le README dit "16" et ne mentionne pas `cognitive-loader` ni `jarvis-upgrade`.

### Hooks (`.claude/hooks/`, **8**) + `hooks-config.json` + `settings.json`
`budget-check.sh`, `mempalace-save.sh`, `post-commit-graphify.sh`, `pre-tool-use-graphify.sh`, `precompact-save.sh`, `precompact-save-cognitive.sh`, `session-stop-handoff.sh`, `session-stop-cognitive.sh`.
→ README dit "6" (manquent les 2 `*-cognitive`).

### Sous-système COGNITION (non documenté au README)
`f2-thinker` + `/think` + `/cognition` + skill `cognitive-loader` + hooks `*-cognitive`. Plus récent que le README (21/04). **À ne pas casser.**

---

## 2. CONSTATS (ce qui est obsolète / couplé / manquant)

**A. Contenus obsolètes (corrigés en QA — 7 fichiers, 3 catégories) :**

*Anciens paths repo (StoreMD a bougé : `saas/storemd/` → `produits/saas/storemd/` ; `f2/engagement/` mort) :*
- `agents/f2-marketer.md:91-99` — toute la section "Engagement IH" : `f2/engagement/chrome/IH-prompt-*.md` + `f2/engagement/engagement-log.md` (dossier f2 mort). → voir **D-G** (où logger l'IH).
- `agents/f2-librarian.md:50` — `saas/storemd/CONTEXT.md` → `produits/saas/storemd/...`.
- `commands/graphify-all.md:60-61` — `saas/storemd/` → `produits/saas/storemd/`.
- `commands/morning.md:35` — exemple `saas/storemd` → `produits/saas/storemd`.
- `skills/jarvis-upgrade/SKILL.md:372` — liste de préfixes avec `distribution/`, `growth-marketing/`, `saas/` (supprimés/déplacés en B1.3). → liste à jour.

*Ancien modèle compteurs :*
- `skills/jarvis-upgrade/SKILL.md:424-430` — ancien `CounterData` (`repliesIn/twEng/liCom/cross/ihPh`). → modèle 41/82.

*Produits morts (référencés alors qu'archivés/retirés) :*
- `skills/marketing-fr/SKILL.md:77` — **PayloadDiff** (`payloaddiff.com`, "on le lance fin avril") → retiré du roadmap.
- `commands/launch.md:8` — exemple `/launch leak-detector` → **Leak Detector** archivé.

> Sweep confirmé : **0 cross**, **0 MODE F2 persona**, **0 plan-hebdo sans planning/** dans `.claude/`. Inventaire complet — `settings.local.json.example` = fichier exemple (tokens), aucun contenu obsolète, rien à changer.

**B. Renames couplés (décision requise) :**
- 8 agents `f2-*` + toutes leurs refs dans les commandes.
- skill `f2-brand-voice` → `brand-voice` : référencé dans `settings.json` (alwaysLoad), `f2-marketer.md`, `README.md`. ⚠️ Le **contenu** (voix FoundryTwo) reste **valide** (FoundryTwo publie toujours sur IH — D11). Rename = cosmétique, contenu conservé.

**C. Manquants (à créer) :**
- Commande `/batch` (workflow batch hebdo : template + demande d'angle + recherche data + voix).
- Commande `/archivage` (archivage hebdo automatisé — Phase 6C historique).
- Workflow « recap de session » : `/handoff` (HANDOFF.md) existe ; à décider s'il couvre le besoin ou s'il faut un `/recap` dédié (≠ `/debrief` qui est un post-mortem).

**D. Documentation périmée :**
- `README.md` : compte faux (16 skills/7 agents/9 commandes vs 17/8/11), daté 21/04, ne mentionne pas cognition. À régénérer en fin de bloc.

**E. Dépendance externe :**
- **Figer le format `BATCH-SEMAINE-N.md`** : prérequis du rework `targets.ts` (différé post-Bloc 2). Le `/batch` (point C) doit produire ce format → c'est ici qu'on le verrouille.

---

## 3. DÉCISIONS À TRANCHER AVEC R (avant exécution)

> Zéro invention : ces points attendent ta décision. Je ne crée/renomme rien sans ça.

- **D-A — Rename des agents `f2-*` ?**
  - Option *garder* : `f2-*` = identifiants internes du studio (comme le nom de repo `F2-Jarvis` qu'on a décidé de garder). Ce ne sont PAS la persona de publication f2 (morte). Zéro rename, zéro couplage.
  - Option *renommer* (`jarvis-*` p.ex.) : cohérence de marque, mais touche les 8 fichiers + toutes les refs dans commandes.
  - *Ma reco* : **garder** (cohérent avec ta règle "le nom on s'en fout tant que ça marche ; ce qui meurt = la persona"). À confirmer.

- **D-B — skill `f2-brand-voice` → `brand-voice` ?** Rename cosmétique (contenu voix FoundryTwo conservé, vivant pour IH). Si oui : maj `settings.json`, `f2-marketer.md`, `README.md`. À confirmer.

- **D-C — Spec `/batch`** : que doit-il faire exactement ? (ex : lire le template + demander l'angle à R + chercher la data + produire les posts à la voix de la persona, sans publier). **Tes mots / tes règles.**

- **D-D — Spec `/archivage`** : périmètre exact de l'archivage hebdo automatisé (quels dossiers, convention `semaine-NN-...`, archives annuelles `archives/2026/`). **Tes mots / tes règles.**

- **D-E — Format `BATCH-SEMAINE-N.md`** : on le fige ici (sections, colonnes). Base = format actuel parsé par `targets.ts` ou nouveau format ? **À cadrer.**

- **D-F — Workflow recap de session** : `/handoff` suffit-il, ou `/recap` dédié (synthèse sans invention, type ce qu'on fait dans ce projet) ?

- **D-G — Structure IH (engagement FoundryTwo)** : la section IH de `f2-marketer.md` pointe vers `f2/engagement/chrome/IH-prompt-*.md` + `f2/engagement/engagement-log.md` (dossier f2 mort). IH = opéré par Romain, voix FoundryTwo, publish-only (pas de compteur). **Où vivent désormais** : (a) les prompts de scan Chrome IH, et (b) le log d'engagement IH ? (ex : sous `romain/` ? un dossier IH dédié ? `marketing/` ?). **Décision structurelle — tes règles.** Conditionne la correction de `f2-marketer.md`.

---

## 4. DÉCOUPAGE EN SOUS-ÉTAPES (proposition)

> Ordre logique ; chaque étape = audit ciblé → recap → validation → prompt chirurgical → vérif.

| Étape | Objet | Fichiers (pressentis) | Dépend de |
|---|---|---|---|
| **B2.1** | Nettoyage contenus obsolètes (7 fichiers) : vieux paths `saas/storemd`→`produits/saas/storemd` (`f2-librarian`, `graphify-all`, `morning`), liste préfixes + ancien CounterData (`jarvis-upgrade`), section IH/paths f2 (`f2-marketer`), produits morts PayloadDiff (`marketing-fr`) + Leak Detector (`launch`) | `agents/f2-marketer.md`, `agents/f2-librarian.md`, `commands/graphify-all.md`, `commands/morning.md`, `commands/launch.md`, `skills/jarvis-upgrade/SKILL.md`, `skills/marketing-fr/SKILL.md` | D-G (pour la partie IH de f2-marketer) |
| **B2.2** | Rename agents `f2-*` (SI D-A = renommer) + maj refs commandes | `agents/*.md`, `commands/*.md`, `settings.json`, `README.md` | D-A |
| **B2.3** | Rename skill `f2-brand-voice` → `brand-voice` (SI D-B) | `skills/f2-brand-voice/`, `settings.json`, `agents/f2-marketer.md`, `README.md` | D-B |
| **B2.4** | Créer `/batch` + figer format `BATCH-SEMAINE-N.md` | `commands/batch.md` (+ template batch) | D-C, D-E |
| **B2.5** | Créer `/archivage` | `commands/archivage.md` | D-D |
| **B2.6** | Workflow recap de session (SI D-F = dédié) | `commands/recap.md` ou ajustement `/handoff` | D-F |
| **B2.7** | Audit + nettoyage hooks (refs f2/paths/budget) | `hooks/*.sh`, `hooks-config.json` | — |
| **B2.8** | Régénérer `README.md` (.claude overview à jour) | `README.md` | toutes les précédentes |

**Notes de dépendance :**
- B2.4 verrouille le format batch → débloque le futur rework `targets.ts` (post-Bloc 2).
- B2.8 en dernier (il doit refléter l'état final).
- B2.2/B2.3 conditionnés par D-A/D-B (peuvent devenir no-op si "garder").

---

## 5. CE QU'ON NE TOUCHE PAS (hors scope Bloc 2)

- L'app web (`ui/jarvis/`, `backend/jarvis/`) — Bloc 1 (fait) / Bloc 4.
- `targets.ts` — rework dédié post-Bloc 2.
- Le contenu de la voix FoundryTwo (vivante pour IH) — seul le nom du skill peut changer (D-B).
- Les skills techniques non concernés (shopify-gql, supabase-rls, stripe-integration, design, etc.) sauf refs obsolètes ponctuelles.
- La logique du sous-système cognition — on ne le casse pas (au plus, rename `f2-thinker` si D-A).

---

## 6. PROCHAINE ACTION

Valider : (1) le découpage B2.1→B2.8, (2) les décisions D-A à D-F. Dès que tranché, on exécute **point par point** comme au Bloc 1, en commençant par **B2.1** (nettoyage obsolète, le plus sûr, sans dépendance).

*Fichier de cadrage Bloc 2. Source de vérité d'exécution : ce plan + `PLAN-BRANCHEMENT-JARVIS.md` + `RECAP-SESSION-JARVIS-2026-05-24.md`.*
