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

## 3. DÉCISIONS — RÉSOLUES (24/05, via repo)

- **D-A ✅ GARDER les noms `f2-*`.** Identifiants internes (comme le nom de repo). Zéro dette, zéro rename, on n'y revient plus.

- **D-B ✅ RÉSOLU — rename + réécriture (pas suppression), scindé en B2.1 (conception) + B2.2 (exécution).** Investigation faite : `f2-brand-voice` est la **couche voix/intégrité always-on** (settings.json alwaysLoad), référencée à **10 endroits** (settings, f2-marketer, marketing-fr:84, jarvis-upgrade:516, jarvis.md:29, .claude/README, README racine, ARCH.md, CLAUDE.md, cache-policy.md). Contenu = moitié mort (identité studio, build-in-public MRR — contredit BIBLE v3.1 §8), moitié vital/universel (zéro fake stats/testimonials, direct, pas de hype AI, TOILE, anti-patterns). **Décision :** renommer → `brand-voice` + **réécrire** en garde-fou universel (intégrité + style + TOILE + carte d'aiguillage vers R/F/produit per BIBLE §8), **archiver** l'ancienne version, **maj les 10 refs**. *Raison de ne pas supprimer : l'intégrité doit s'appliquer à TOUT contenu en permanence, pas seulement quand le marketer tourne.*

- **D-C ✅ `/batch` = codifier `marketing/contenu/batch-semaine/batch-template.md`** (à jour 18/05). Workflow complet déjà documenté : §2 collecte data → validation R → §3-4 format/voix/UTM/ANTI-IA → §10 rédaction en 7 blocs jour-par-jour → §5 dispatch → §6 archivage, convention FENCE §11. Rien à inventer.

- **D-D ✅ `/archivage` = automatiser `archives/README.md`** (charte : 2 niveaux, set hebdo §2.2, nommage `semaine-NN-DD-DD-mois-YYYY/` padding zéro dès S09, 7 catégories `archives/2026/`) + §6 batch-template. Rien à inventer.

- **D-E ✅ Format figé = `marketing/contenu/batch-semaine/batch-semaine-S[N].md`** (header §3 du template). ⚠️ `targets.ts` (différé) lit `BATCH-SEMAINE-N.md` à la **racine** = mauvais chemin → son rework devra pointer ici.

- **D-F ✅ `/handoff` ≠ recap.** `/handoff` = `HANDOFF.md` éphémère (continuité next session Claude Code, <1500 car, écrasé). Le repo a DÉJÀ `tracking/recap-sessions/` (recaps datés persistants + README). **Décision : ajouter `/recap`** léger qui génère `tracking/recap-sessions/YYYY-MM-DD.md` (symétrique à `/handoff`). Validé.

- **D-G ✅ Résolu — pas de nouvelle structure.** `marketing/canaux/ih/context.md` : "Pas de compte @foundrytwo, F2 voix séparée n'existe plus, IH = compte StoreMD, R-géré, publish-only". → la section "Engagement IH @foundrytwo" de `f2-marketer` est **morte → à retirer** (B2.1).

---

## 4. DÉCOUPAGE EN SOUS-ÉTAPES — 9 POINTS, DANS L'ORDRE D'EXÉCUTION

> Chaque étape = audit ciblé → recap → validation R → prompt chirurgical → vérif ZIP → maj trackers.
> Ordre conçu pour qu'aucun fichier ne soit touché deux fois (voir notes).

| # | Objet | Type | Fichiers (pressentis) |
|---|---|---|---|
| **B2.1** ✅ | **Brand-voice — CONCEPTION.** Audit des sources de voix (`romain/VOIX.md`, `fabrice/VOIX.md`, `marketing/saas-app-shopify/storemd/VOIX.md`, BIBLE §2/§3/§8, `marketing-fr`/`marketing-en`) → produire le nouveau `brand-voice/SKILL.md` (garde-fou universel : intégrité + style + anti-hype + TOILE + aiguillage R/F/produit). Nom figé. Contenu validé par R. | conception, **0 mod repo** | sortie `.md` (pas de write repo) |
| **B2.2** ✅ | **Brand-voice — EXÉCUTION** (faite : archive+scaffold via Claude Code, SKILL.md poussé par R, 7 refs ref-only renommées, settings.json JSON valide). Baseline repo14. Créer `skills/brand-voice/SKILL.md`, archiver l'ancien `f2-brand-voice`, maj des refs **ref-only** | mécanique | `skills/brand-voice/` (création), `skills/f2-brand-voice/` (→archive), `settings.json`, `commands/jarvis.md`, `.claude/README.md`, + docs racine `README.md`, `ARCH.md`, `CLAUDE.md`, `ops/monitoring/cache-policy.md` |
| **B2.3** ✅ | **Nettoyage obsolète (7 fichiers).** Vieux paths `saas/storemd` → chemin StoreMD actuel (`produits/saas/storemd/` specs **ou** `marketing/saas-app-shopify/storemd/` marketing — à trancher par fichier à l'audit B2.3) dans `f2-librarian`, `graphify-all`, `morning` ; liste préfixes + ancien CounterData (`jarvis-upgrade`), section IH morte (`f2-marketer`), produits morts PayloadDiff (`marketing-fr`) + Leak Detector (`launch`). **+ on fond le rename brand-voice** dans `f2-marketer`/`marketing-fr`/`jarvis-upgrade` (mêmes edits) | surgical | `agents/f2-marketer.md`, `agents/f2-librarian.md`, `commands/graphify-all.md`, `commands/morning.md`, `commands/launch.md`, `skills/jarvis-upgrade/SKILL.md`, `skills/marketing-fr/SKILL.md` |
| **B2.4** ✅ | `/batch` — codifie `marketing/contenu/batch-semaine/batch-template.md` + fige le format `batch-semaine-S[N].md` | dédié | `commands/batch.md` |
| **B2.5** ✅ | `/archivage` — automatise la charte `archives/README.md` (2 niveaux, set hebdo §2.2, nommage) | dédié | `commands/archivage.md` |
| **B2.6** ✅ | `/recap` — génère `tracking/recap-sessions/YYYY-MM-DD.md` (persistant, ≠ HANDOFF.md éphémère) | léger | `commands/recap.md` |
| **B2.7** ✅ | Audit + nettoyage **hooks** (6 non-cognitive) : refs f2/paths/budget | audit | `hooks/{budget-check,mempalace-save,post-commit-graphify,pre-tool-use-graphify,precompact-save,session-stop-handoff}.sh`, `hooks-config.json` |
| **B2.8** ✅ | Audit **sous-système cognition** : cohérence + refs obsolètes | audit | `agents/f2-thinker.md`, `commands/think.md`, `commands/cognition.md`, `skills/cognitive-loader/`, `hooks/precompact-save-cognitive.sh`, `hooks/session-stop-cognitive.sh` |
| **B2.9** ✅ | Régénérer **`.claude/README.md`** (overview à jour : 8 agents, 14 commandes, skills, hooks, cognition) | dernier | `.claude/README.md` |

**Notes de dépendance (anti-double-travail) :**
- **B2.1 → B2.2 → B2.3** : brand-voice est **conçu puis créé AVANT le nettoyage**, pour que B2.3 puisse **fondre le rename de ref** dans les 3 fichiers communs (`f2-marketer`, `marketing-fr`, `jarvis-upgrade`) → chacun touché **une seule fois**. Les refs des fichiers *ref-only* sont faites en B2.2.
- **Les 2 hooks `*-cognitive`** sont rattachés à **B2.8** (cognition), pas à B2.7, pour ne pas les re-toucher.
- **B2.9 (README) en dernier** : il compte agents/commandes/skills/hooks et doit refléter l'état final (dont les 3 nouvelles commandes `/batch`, `/archivage`, `/recap` → 11→14).
- B2.4 fige le format batch → débloque le futur rework `targets.ts` (post-Bloc 2).
- Ancien « rename agents `f2-*` » = **supprimé** (D-A = garder, zéro dette).

---

## 5. CE QU'ON NE TOUCHE PAS (hors scope Bloc 2)

- L'app web (`ui/jarvis/`, `backend/jarvis/`) — Bloc 1 (fait) / Bloc 4.
- `targets.ts` — rework dédié post-Bloc 2.
- Le **fond intégrité/style** de la voix (zéro fake, anti-hype, TOILE) — conservé, mais migré dans `brand-voice` réécrit (B2.3) ; la voix studio "we" morte est purgée.
- Les skills techniques non concernés (shopify-gql, supabase-rls, stripe-integration, design, etc.) sauf refs obsolètes ponctuelles.
- La logique du sous-système cognition — on ne le casse pas (D-A = on garde `f2-thinker`).

---

## 6. PROCHAINE ACTION

**Toutes les décisions (D-A → D-G) sont résolues.** Découpage figé en **9 points** dans l'ordre d'exécution (§4).

On démarre par **B2.1 — conception de `brand-voice`** : audit exhaustif des sources de voix (`romain/VOIX.md`, `fabrice/VOIX.md`, `marketing/saas-app-shopify/storemd/VOIX.md`, BIBLE §2/§3/§8, `marketing-fr`/`marketing-en`) → production du nouveau `SKILL.md` validé par R, **sans aucune modif repo** (sortie `.md`). Puis B2.2 (exécution) et la suite, point par point comme au Bloc 1.

*Fichier de cadrage Bloc 2. Source de vérité d'exécution : ce plan + `PLAN-BRANCHEMENT-JARVIS.md` + `RECAP-SESSION-JARVIS-2026-05-24.md`.*

---

## NOTE DE SUIVI — B2.3 (29/05, mise à jour au fil de l'exécution)

B2.3 scindé en 3 lots :
- **B2.3a ✅** mécanique (5 fichiers : jarvis-upgrade CounterData+préfixes+ref, f2-librarian/graphify-all/morning paths, launch leak-detector+paths). Baseline repo17.
- **B2.X ✅** canon IH = compte FoundryTwo, voix du SaaS promu (5 fichiers : canaux/ih/context, brand-voice, fabrice/VOIX, romain/VOIX, storemd/VOIX). Baseline repo18.
- **B2.3b ⏳ — REFONTE (architecture skills voix figée 29/05, remplace l'approche par langue jetée).**

### Décisions B2.3b verrouillées (29/05)
- Voix = par ENTITÉ, pas par langue. **Tous les posts en anglais** (le FR = langue maternelle R/F, jamais pour publier).
- Architecture skills figée :
  ```
  .claude/skills/marketing/
  ├── romain/SKILL.md      ← skill détaillé voix Romain (anglais)
  ├── fabrice/SKILL.md     ← skill détaillé voix Fabrice (anglais)
  ├── storemd/SKILL.md     ← skill détaillé voix StoreMD
  └── (1 nouveau par business futur, ex profitpilot/SKILL.md)
  ```
- 1 skill DÉTAILLÉ et AUTONOME par voix (pas un pointeur vide). Sources = `romain/VOIX.md`, `fabrice/VOIX.md`, `marketing/saas-app-shopify/storemd/VOIX.md` (jamais touchées, servent de base).
- Si beaucoup de skills → 1 `README.md` dans `.claude/skills/marketing/`.
- Build-in-public MORT partout (R+F). Tout oriente vente produit + recherche client. Chiffres réels seulement. Bios « Co-fondateur F2 » / « CTO F2 » gardées.
- Faisabilité sous-dossier vérifiée (web, 29/05) : Claude Code n'auto-découvre QU'À 1 niveau (`.claude/skills/<nom>/SKILL.md`). Un nesting 2 niveaux n'est PAS auto-découvert → OK ici car ces skills sont `on-demand`, chargés PAR CHEMIN via brand-voice/f2-marketer (pas par autoDiscover).
- `marketing-fr` / `marketing-en` (découpage par langue) = à SUPPRIMER, remplacés par les 3 skills ci-dessus. Les fichiers que j'avais produits (f2-marketer.md, marketing-fr/en) = PÉRIMÉS, ne pas pousser.

### Avancement B2.3b (maj 29/05, baseline repo21)
- ✅ Archivage `marketing-fr`/`marketing-en` → `archives/2026/05-dossiers-deprecated/marketing-{fr,en}-2026-05-29/` (SKILL.md + README).
- ✅ Scaffold `.claude/skills/marketing/{romain,fabrice,storemd}/`.
- ✅ 3 skills voix créés, poussés, **YAML corrigé** (le `: ` décoratif dans `description` cassait le frontmatter → reformulé "pour ses comptes …"). Parse OK.
- ✅ point 4 — `f2-marketer.md` corrigé (skills par entité, aiguillage par compte, tout en anglais), poussé, YAML OK, 0 ref marketing-fr/en. **B2.3 ENTIÈREMENT CLOS.** Baseline repo22.

### Ordre d'exécution B2.3b
1. Skill `marketing/romain/SKILL.md` → validation R
2. Skill `marketing/fabrice/SKILL.md` → validation R
3. Skill `marketing/storemd/SKILL.md` → validation R
4. Corriger `f2-marketer.md` (chemins skills + voix par entité + tout en anglais + build-in-public out + IH publish-only + multi-business/hub) → validation R
   → tout reste dans `.claude/`, push manuel R, vérif ZIP entre chaque.

### REPORTÉ À LA FIN (lot racine unique, en pack avec Bloc 3) — repointage des refs `marketing-fr/en` → nouveaux skills
- `.claude/skills/brand-voice/SKILL.md` l.29-30 (lignes router R et F)
- `.claude/README.md` l.32
- `ARCH.md` l.73-74
- `CLAUDE.md` l.163
- `patterns/dual-llm-sonnet-haiku.md` l.119
- Faux positifs à NE PAS toucher : `brain/context-cognitif/social/communication.md:26` + `systeme cognitif/WAVE-6...:446` (= « marketing-friendly »).
- Note : `settings.json` ne référence PAS marketing-fr/en (rien à changer).

### Avancement Bloc 2 — commandes
- ✅ **B2.4 `/batch`** : `.claude/commands/batch.md` créé (orchestrateur → batch-template.md + dernier batch S11, S[N] via charte, 7 blocs + validation R, dispatch, archivage). Poussé, YAML OK. Baseline repo23.
- ✅ **B2.5 `/archivage`** : `.claude/commands/archivage.md` créé (orchestrateur → charte `archives/README.md` §2.2-2.4, gate validation R, bascule annuelle exclue). Poussé, YAML OK. Baseline repo24.
- ✅ **B2.6 `/recap`** : `.claude/commands/recap.md` créé (orchestrateur → README local de `tracking/recap-sessions/`, format adaptable + MAJ index, frontière ≠ `/handoff` ≠ `/debrief`). Corrigé après audit (format assoupli), poussé, YAML OK. Baseline repo25. **B2.1→B2.6 faits.**
- ✅ **B2.7 hooks** : audit des 6 hooks non-cognitifs + `hooks-config.json`. Aucune ref morte (f2/paths/budget), paths valides, budget aligné, JSON valide. **Rien à nettoyer** (comme B1.6). Baseline repo25. **B2.1→B2.7 faits.**
- ✅ **B2.8 cognition** : audit des 6 fichiers (`f2-thinker`, `/think`, `/cognition`, `cognitive-loader`, 2 hooks cognitifs). Refs valides, hooks cognitifs câblés (`settings.json`), aucune ref morte. **Rien à nettoyer.** Note cohérence hooks (settings.json = source réelle vs hooks-config.json doc-only ; `mempalace-save` non câblé) consignée au RECAP §8. **B2.1→B2.8 faits.**
- ✅ **B2.9 README .claude** : refresh complet (19 skills / 8 agents / 14 commands / 8 hooks recomptés, voix marketing par entité, +5 commandes, +f2-thinker, +2 hooks cognitifs, budget vérifié vs limits.yaml, date 04/06). Poussé + vérifié identique. **🎯 BLOC 2 CLOS (B2.1→B2.9). Baseline repo26.**
