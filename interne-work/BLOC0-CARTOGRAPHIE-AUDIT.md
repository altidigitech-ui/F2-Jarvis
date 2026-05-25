# BLOC 0 — CARTOGRAPHIE & AUDIT DE RÉFÉRENCE

> Vérité de référence du branchement Jarvis. Recense **où** intervenir et **quoi** est obsolète, par surface et par bloc.
> Établi le 23/05/2026 sur le ZIP du repo. Exclusions de scope : `archives/` (mémoire historique de l'ère FoundryTwo, on ne réécrit pas l'histoire), `brain/mempalace/wings/` (mémoire, intouchable), `node_modules`, `graphify-out/` (régénéré).
> Compagnon de `PLAN-BRANCHEMENT-JARVIS.md`. Ne déclenche aucune modification.

---

## A. CONSTATS STRUCTURELS (les 4 qui comptent)

1. **3 surfaces Jarvis, pas une.** (A) Jarvis-CLI = `CLAUDE.md` + `.claude/`. (B) Jarvis-conversationnel = system prompt **hardcodé dans `chat.ts`** + contextes chargés + tools. (C) Ouroboros = `ouroboros-cycle.ts`. La config `.claude/` (agents/skills) ne pilote QUE la surface A ; le daily-driver (B) a sa propre cervelle dans le code.

2. **Bugs de paths LIVE sur la surface B.** Le backend charge/écrit sur l'ancienne arbo → actions de write cassées ou mal rangées **dès maintenant** :
   - `chat.ts` charge `{persona}/plan-hebdo.md` (→ `{persona}/planning/plan-hebdo.md`) et `f2/context.md` + `f2/plan-hebdo.md` (dossier `f2/` **supprimé**).
   - `action-executor.ts` écrit sur `{persona}/plan-hebdo.md`, `cold/cold-outreach-log.md`, `engagement/engagement-log.md`, `progress-semaine.md`, `cross-execution-log.md` → tous ont changé de path ou disparu.
   - `jarvis-tools.ts` : scope `repo_search` et reads pointent sur `f2/`, `saas/`, `growth-marketing/` (arbos mortes).

3. **Routage modèle = asymétrique.** Surface A (`settings.json`) : `default haiku-4-5`, `planMode sonnet-4-6`, escalade explicite → conforme BIBLE §12. Surface B (`chat.ts` `query()`) et C (`ouroboros-cycle.ts`) : **aucun `model` passé** → modèle par défaut du binaire. Seuls `web_search` (tool) et la compression (`jarvis-memory.ts`) tapent l'API en Haiku. **Per D2 : on ne touche rien de ça maintenant.**

4. **`settings.json` charge `f2-brand-voice` en always-load** → le rename du skill (Bloc 2) doit mettre à jour `skills.alwaysLoad` simultanément, sinon le skill always-on casse.

---

## B. À GARDER tel quel (FoundryTwo légitime = hub + IH, D4/D11)

| Fichier | Raison |
|---------|--------|
| `tracking/utm/foundrytwo/UTM_FOUNDRYTWO_LINKS.md` | UTM de la page hub `foundrytwo.com` — légitime |
| `tracking/metrics/ih/foundrytwo.md` | Métriques IH sous le nom FoundryTwo — légitime |
| `tracking/utm/foundrytwo/` (dossier) | Hub tracking |

Tout autre `FoundryTwo` actif = à corriger (ne doit refléter que "page hub + IH").

---

## C. INTERPRÉTATIONS À CONFIRMER (non bloquantes)

| # | Point | Lecture proposée |
|---|-------|------------------|
| C1 | `archives/` contiennent 600+ occurrences FoundryTwo/F2-Jarvis | **On ne les touche pas.** Les archives SONT la forme archivée de l'histoire FoundryTwo. D5 "archivée et corrigée" = corriger les fichiers **actifs** ; l'historique reste en l'état. |
| C2 | `brain/ouroboros/proposals/pending/` : 2 proposals citent FoundryTwo/IH | À traiter via `/review-proposals` (accept/reject), **pas en édition manuelle**. |
| C3 | `brain/context-cognitif/*` + `patterns/*` : refs `F2-Jarvis` éparses | Probablement métaphoriques/exemples. Priorité basse (Bloc 7D-équiv). |
| C4 | `systeme cognitif/` (dossier avec espace) : `.sh` + `WAVE-*` avec F2-Jarvis | Aligner refs + renommer `systeme cognitif/` → `systeme-cognitif/` (convention notée). Priorité basse. |
| C5 | `la-toile/` : refs FoundryTwo | À vérifier au moment du bloc — la toile reste invisible en public ; les refs internes sont peut-être légitimes. |

---

## D. INVENTAIRE ACTIONNABLE PAR BLOC

> Compteurs = nb d'occurrences obsolètes détectées (FoundryTwo / F2-Jarvis / f2- / anciens paths / vieux volumes). Indicatif, pas exhaustif au mot près.

### BLOC 1 — Backend / code (surface B + C) — PRIORITÉ

| Fichier | Signaux obsolètes |
|---------|-------------------|
| `backend/jarvis/src/routes/chat.ts` | system prompt "co-fondateur de FoundryTwo", mode `f2`, paths `f2/`, `{persona}/plan-hebdo.md`, compteur `/30`, patterns cross |
| `backend/jarvis/src/lib/action-executor.ts` | write paths : `plan-hebdo.md`, `cold-outreach-log.md`, `engagement-log.md`, `progress-semaine.md`, `cross-execution-log.md` ; allowed-paths `saas/ f2/ growth-marketing/ distribution/` |
| `backend/jarvis/src/lib/jarvis-tools.ts` | `F2-Jarvis` ×8, scope `repo_search` enum (`f2`, `growth-marketing`), reads `progress-semaine.md`/`cold-outreach-log.md`/`engagement-log.md`, allowed-paths `saas/` |
| `backend/jarvis/src/routes/context.ts` | refs `f2/`, modèle de compteurs (à refondre D8/D9) |
| `backend/jarvis/src/lib/ouroboros-cycle.ts` | `FoundryTwo`, `F2-Jarvis`, `plan-hebdo.md` |
| `backend/jarvis/src/lib/jarvis-memory.ts` | `FoundryTwo`, `F2-Jarvis` (strings) |
| `backend/jarvis/src/routes/{graph,batch,action}.ts`, `lib/{mempalace,github}.ts` | refs `F2-Jarvis`/`f2/` (strings/paths isolés) |
| **Archivage cross-engagement (D10)** | créer `archives/jarvis/` + y documenter `mark_cross_published`, IDs A/B, side-effects, patterns ; retirer de l'actif |

### BLOC 2 — Config `.claude/` (surface A)

| Fichier | Action |
|---------|--------|
| `.claude/agents/f2-*.md` (×8) | rename `f2-X.md`→`X.md` + champ `name: f2-X`→`X` (tous confirmés préfixés) + contenu (multi-business, paths, stratégie). `f2-marketer` (7 signaux) et `f2-architect`/`f2-accountant` (6) = les plus chargés |
| `.claude/skills/f2-brand-voice/SKILL.md` | rename → `brand-voice` + réécriture + maj `settings.json` `alwaysLoad` |
| `.claude/skills/{graphify,brain-3d-renderer,saas-launch-checklist,context-md-generator,jarvis-upgrade,stripe-integration,handoff-writer}/SKILL.md` | refs `saas/`/`F2-Jarvis`/`f2-` à aligner (audit ciblé) |
| `.claude/skills/marketing-fr` (4) / `marketing-en` | audit voix R/F (ancien mapping) |
| `.claude/commands/*` (think 8, status 7, jarvis 6, morning 5, launch/graphify-all/debrief/budget 4) | aligner paths `produits/saas/*`, refs `f2-X`→`X`, vieux portfolio, vieux volumes |
| `.claude/commands/` (à créer) | `/batch` + `/archivage` (rôles dans la roadmap) |
| `.claude/hooks/*.sh` (1 signal chacun) | refs path/nom isolées à vérifier |
| `.claude/settings.json` | `alwaysLoad: f2-brand-voice`→`brand-voice` |
| `.claude/README.md` (10) | navigation `.claude/` à réécrire |
| `ops/monitoring/model-tier-rules.yaml` | retirer `F2`, aligner refs agents `f2-X`→`X` **sans toucher le routing** (O4) |

### BLOC 3 — Docs charnières (racine)

| Fichier | Signaux |
|---------|---------|
| `CLAUDE.md` | FoundryTwo ×6, F2-Jarvis ×11, `saas/`, `f2/`, `growth-marketing/`, vieux volumes/portfolio — réécriture lourde (DERNIER) |
| `README.md` | FoundryTwo ×4, F2-Jarvis ×6, `f2/`, `saas/`, `growth-marketing/` (DERNIER) |
| `ARCH.md` | refs `plan-hebdo` racine + FoundryTwo (régénéré en fin) |
| `CLAUDE-JARVIS.md` | F2-Jarvis ×2 — **chargé live** → prioritaire dans ce bloc |
| `ENTRYPOINT.md` | FoundryTwo, F2-Jarvis ×5, `f2/`, `saas/`, `growth-marketing/` — ~90% obsolète |
| `JARVIS.md`, `JARVIS-ARCHITECTURE-COMPLETE.md`, `JARVIS-UPGRADE-PLAN.md`, `HANDOFF.md` | FoundryTwo/F2-Jarvis/`f2/`/`plan-hebdo` |
| `BIBLE.md` | 1 FoundryTwo (changelog) + 1 `plan-hebdo` + §4 volumes cold à réécrire (D9) |
| `ANTI-IA.md` (3), `VISUELS.md` (1) | refs F2 mineures |
| `romain/system-prompt.md`, `fabrice/system-prompt.md` | FoundryTwo ×4-5, `saas/`, `f2/`, `growth-marketing/`, vieux volumes "30 interactions", vieux portfolio, vieux mapping voix |

### BLOC 4 — Frontend (UI) — DERNIER

| Fichier | Signaux |
|---------|---------|
| `ui/jarvis/app/page.tsx` | FoundryTwo ×3 |
| `ui/jarvis/components/PersonaLayout.tsx` | FoundryTwo ×2, `f2/`, `plan-hebdo`, **mode F2 à supprimer (D6)** |
| `ui/jarvis/app/{layout,login/page,romain/page,fabrice/page}.tsx` | FoundryTwo / F2-Jarvis |
| `ui/jarvis/components/{MemPalaceView,GraphifyView,GraphifyFullscreen,FileViewerModal}.tsx` | FoundryTwo / F2-Jarvis (strings affichées) |
| `ui/jarvis/lib/{github-writer,markdown-writer}.ts` | F2-Jarvis / `plan-hebdo` |
| `ui/web/app/layout.tsx` | FoundryTwo |
| Affichage compteurs (D8/D9) | 6 compteurs perso scopés persona + 1 général 82 mutualisé, sans vue croisée ; IH = posts sans compteur |

---

## E. RÉFÉRENCES SOURCES DE VÉRITÉ (à consulter pendant l'exécution)

- **Comptes & handles** : `tracking/suivi-comptes.md` (central) + `romain/tracking/comptes-groupes.md`. Tous les comptes existent (O3). Sert au remap des fichiers cold/comptes (D9).
- **Nouvelle arbo opérationnelle persona** : `{persona}/planning/plan-hebdo.md`, `{persona}/cold/cold-log-{twitter,linkedin,facebook}.md`, `{persona}/engagement/{ph,reddit}/engagement-log.md`, `{persona}/tracking/progress-semaines.md`, `{persona}/publication/batch-semaine.md`.
- **Produits** : `produits/saas/` (+ `context.md`, `roadmap.md`). **Distribution** : `marketing/` (+ `saas-app-shopify/`, `canaux/`, `contenu/`, `jarvis/`).

---

## F. STATUT BLOC 0

| Sous-item | Statut |
|-----------|--------|
| Audit backend (paths/modes/compteurs/side-effects) | ✅ |
| Audit budget / SDK / routage modèle | ✅ |
| Cartographie exhaustive occurrences F2/FoundryTwo/anciens paths | ✅ |
| Sweep `.claude/` (agents/skills/commands/hooks/settings) | ✅ |
| Lecture fine du contenu de chaque agent/skill/command/doc (pour rédiger les correctifs) | ⬜ à faire **au moment de chaque bloc** (pas nécessaire pour la cartographie) |
| Lecture `tracking/suivi-comptes.md` (détail comptes/canaux) | ⬜ à faire en Bloc 1 (refonte compteurs) |
| Audit `brain/ouroboros/identity.md` + `bible.md` (surface C) | ⬜ à faire en Bloc 1 |

**Conclusion Bloc 0 :** la vérité de référence est posée. On sait où tout est et ce qui est obsolète. Le détail "quoi réécrire exactement" se fait dans le recap de chaque bloc, juste avant son prompt.

---

*Compagnon de `PLAN-BRANCHEMENT-JARVIS.md`. Mis à jour si de nouveaux constats émergent.*
