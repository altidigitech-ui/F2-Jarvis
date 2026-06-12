# BLOC 4 — FRONTEND `ui/` + targets.ts + scalabilité business — PLAN CHIRURGICAL

> Créé le 08/06/2026. Baseline de départ : **repo36** (Bloc 3 clos).
> Méthode identique Blocs 1-3 : audit ciblé → AVANT/APRÈS + décisions → **validation R** → test sandbox (diff) → prompt Claude Code (1 bloc) → R pousse → vérif ZIP → maj trackers.
> ⚠️ Bloc 4 = du CODE FONCTIONNEL (pas de la doc). Chaque sous-bloc doit être testable et réversible (Git = backup, pas de .bak).

---

## §1 — Décisions actées (ne pas re-trancher)

| Décision | Valeur |
|---|---|
| Interfaces | 2 seulement : Romain + Fabrice (canon D6). Pas d'interface/mode f2. |
| Toggle Mode F2 | SUPPRIMÉ (cockpit Romain, `showF2Toggle`) |
| Wings mémoire `f2/` | **CONSERVÉES + affichage gardé** (mémoire verbatim Option A = intouchable ; c'est de l'historique) |
| `ui/web/` | **ARCHIVÉ** (brouillon v1 du dashboard, jamais câblé, données portfolio mortes ; supplanté par `ui/jarvis`) |
| Business ≠ mode UI | Le business = propriété du CONTENU/de la donnée, pas de l'interface. Interface = QUI opère (R/F). Pas de toggle par business. |
| Connaissance écosystème | `produits/STATUS.md` ajouté aux contextPaths de Jarvis (carte du portfolio à chaque message) |
| **Canon compteurs (B4.1)** | La ligne compteurs de `chat.ts` l.318 (validée B1.7), références ère StoreMD : Cold TikTok /10 · Insta /10 · FB /5 · TW /5 · LI /5 + PH /6 = **41/persona, 82 général**. Reddit sans cible chiffrée. |
| **Vieux items F2 timeline (B4.3)** | Affichés sur **LES DEUX cockpits** (timeline commune, aucune info cachée entre les 2 associés — déjà l'archi en place) ; attribution F2→Romain GARDÉE (sert uniquement à l'étiquette d'action) ; seul le mode/toggle retiré ; mémoire/repo intacts (Ouroboros voit tout). |
| Sélecteur entité business (compteurs + data par business) | Design validé sur papier en B4.6 ; **implémentation À LA SORTIE D'HOKUNO** (décidé 08/06) |

## §2 — Zones interdites (transversal)

- `brain/mempalace/`, `brain/ouroboros/` (mémoire verbatim) — y compris wings `f2/`
- `asset-brand/storemd/videos/`
- `BIBLE.md`
- Backend `backend/` : **clos depuis Bloc 1**, SAUF les 2 exceptions explicitement différées vers Bloc 4 : `backend/jarvis/src/routes/targets.ts` (B4.1) et l'ajout d'1 ligne contextPaths dans `backend/jarvis/src/routes/chat.ts` (B4.6a)
- La suite `/api/action/*` du front (déjà construite et fonctionnelle — propose/execute/reject/execute-batch)
- `interne-work/` (historique, peut être désync — source de vérité = livrables conversation)

## §3 — Sous-blocs

### B4.1 — `targets.ts` backend + modèle compteurs (dette différée Bloc 1)
**Fichiers** : `backend/jarvis/src/routes/targets.ts` (252 l.) ; front consommateur : `ui/jarvis/components/PersonaLayout.tsx` (TARGETS_FALLBACK l.60, fetch l.393) ; dettes liées : `romain/daily-checklist.md`, `batch-template.md` §6.
**Constat audit (repo36)** : `TargetsResponse` expose encore `f2: PersonaTargets` ; `DEFAULTS.f2` (IH 10/j) vivant ; `parseBatch` mappe sections 7-8 = F2 ; valeurs DEFAULTS (R engTarget=48, F=30) à confronter au modèle canon 41/82.
**Canon LOCALISÉ (décidé 08/06)** : ligne compteurs `chat.ts` l.318 — Cold TikTok /10 · Insta /10 · FB /5 · TW /5 · LI /5 + PH /6 = 41/persona, 82 général. **Actions** : (a) retirer le persona f2 de l'interface/DEFAULTS/parseBatch/réponse ; (b) aligner DEFAULTS sur le canon 41/82 ; (c) aligner TARGETS_FALLBACK front + CounterTiles ; (d) batch-template §6 si faux. ~~daily-checklist~~ : fichier ABSENT du repo → dette morte, rien à corriger.
**Risque** : parseBatch lit les BATCH-SEMAINE-N.md réels → vérifier le format batch courant avant de toucher le parsing.

### B4.2 — Retrait du toggle f2 (cockpit Romain)
**Fichiers** : `ui/jarvis/components/PersonaLayout.tsx` (prop `showF2Toggle` l.316/319, état `f2Mode`, dérivation `mode` l.413, bouton l.573) ; `ui/jarvis/app/romain/page.tsx` (`showF2Toggle={true}`).
**Action** : supprimer le toggle + l'état + le prop ; `mode` devient inutile côté layout.

### B4.3 — Démêlage du prop `mode: "normal" | "f2"` (~12 composants)
**Fichiers identifiés (repo36)** : Chat.tsx (type Mode l.13), Brain3D.tsx, Brain3DFullscreen.tsx, RepoGraph3D.tsx, RepoGraph3DFullscreen.tsx, BatchCard.tsx (uploadPersona l.61), TimelineColumn.tsx (publishedByMap F2 l.53, filtre l.73), FileViewerModal.tsx, + tout consommateur de `mode` passé par PersonaLayout.
**Action** : retirer le prop `mode` et les branches `mode === "f2"` (couleurs, uploadPersona, filtres). **TimelineColumn (décidé 08/06)** : GARDER `publishedByMap` + l'attribution F2→Romain (étiquette d'action sur items historiques, visibles sur les 2 cockpits) ; retirer uniquement le prop `mode`.
**Garde-fou** : ne PAS toucher les clés/couleurs de wings mémoire (`f2-core`, `f2-compte`…) dans MemPalaceView/RepoGraph3D = affichage de données conservé (§1).

### B4.4 — Labels « F2 » résiduels UI
**Exemples repérés** : GraphifyView.tsx l.290 (« contexte F2/FoundryTwo ») + l.313 (« graph sémantique F2 »), GraphifyFullscreen.tsx l.30 (« Concepts sémantiques F2 · FoundryTwo »), brain-3d/zones.ts l.24.
**Action** : reformulation cosmétique (F2 → FoundryTwo quand ça désigne la marque/l'écosystème). Audit exhaustif au moment du sous-bloc.

### B4.5 — Archivage `ui/web/`
**Action** : `git mv ui/web archives/2026/05-dossiers-deprecated/ui-web-dashboard-YYYY-MM-DD/` + correction des refs vivantes (repérées : `JARVIS-ARCHITECTURE-COMPLETE.md` §3.10, `.claude/agents/f2-designer.md` l.71, `ARCH.md` si listé).
**Note** : les idées uniques de ui/web (page /budget, vue Overview business) = futurs panneaux de ui/jarvis si besoin un jour. Rien à construire maintenant.

### B4.6 — Scalabilité multi-business
**(a) Connaissance — à faire dans ce bloc** : ajouter `"produits/STATUS.md"` aux contextPaths (`backend/jarvis/src/routes/chat.ts` l.~294). 1 ligne. Jarvis a toujours la carte du portfolio.
**(b) Design sélecteur entité — papier, à valider** : compteurs par ENTITÉ (R, F, storemd, hokuno…) ; sélecteur d'entité business dans le cockpit (affiche + remplit les compteurs du bon business) ; champ « produit » sur uploads/batchs (défaut StoreMD). L'interface reste R/F.
**(c) Implémentation du sélecteur** : ⚠️ DÉCISION TIMING EN ATTENTE (maintenant vs arrivée Hokuno).
**Pattern existant qui scale déjà** : nouveau business = `saas/<nom>/context.md` + ligne STATUS.md + wing mémoire `<nom>/` → zéro code.

### B4.7 — Docs : refs Mode F2/toggle + dettes doc isolées
**Fichiers** : `JARVIS.md` (§ Mode F2 + l.31 + l.317), `JARVIS-ARCHITECTURE-COMPLETE.md`, `JARVIS-UPGRADE-PLAN.md`, `.claude/skills/jarvis-upgrade/SKILL.md` (l.494). À faire EN DERNIER (refléter le code réellement modifié, pas l'inverse).

**Ordre d'exécution : B4.1 → B4.2 → B4.3 → B4.4 → B4.5 → B4.6 → B4.7.**

## §4 — Décisions à trancher en cours de bloc

**AUCUNE — toutes tranchées le 08/06 :**
1. ✅ (B4.1) Canon = ligne compteurs chat.ts l.318 (41/persona, 82 général — réfs ère StoreMD).
2. ✅ (B4.3) Items F2 historiques : affichage conservé sur les 2 cockpits, attribution F2→Romain gardée, seul le mode retiré.
3. ✅ (B4.6c) Sélecteur business : à la sortie d'Hokuno.

## §5 — Avancement

- ✅ **B4.1** : vérifié **repo37** (compteurs OK à l'écran confirmé par R). 4 fichiers : `targets.ts` réécrit 252→54 l. (cibles canon FIXES 10/10/5/5/5/6 = 41/82, f2 retiré, parsing batch supprimé) ; `ui/jarvis/lib/context-types.ts` CounterData canon ; `CounterTile.tsx` cible optionnelle (Reddit sans cible) ; `PersonaLayout.tsx` 7 zones (interface, fallback sans f2, EMPTY_CONTEXT, targetKey→persona, totalTarget=41, grilles mobile+desktop → TikTok/Insta/FB/TW/LI/PH/Reddit/Total persona x41/Général R+F x82). Typecheck backend+front 0 erreur. Bug tuiles-à-0 corrigé. Batchs/bouton batch/context.ts/toggle intouchés.
- ✅ **B4.2** : vérifié **repo38** (toggle disparu à l'écran, confirmé R). 3 fichiers : `PersonaLayout.tsx` 16 zones (bouton ROMAIN/F2, fonction F2Banner, état f2Mode + localStorage, accentColor fixe, URL /api/context sans mode [ignoré backend], rawTimeline, filePaths branche normale seule, 9 props enfants → mode="normal" en dur, 4 conditions fabrice simplifiées, weekPlanningF2 mort retiré) ; `lib/context-types.ts` (champ weekPlanningF2 retiré) ; `app/romain/page.tsx` (prop retiré). Coches du jour préservées (clé localStorage figée _normal_). Typecheck 0 erreur.
- ✅ **B4.3** : vérifié **repo39**. 9 fichiers démêlés du prop `mode` f2 : Chat (type Mode, ActionForm, URL historique [défaut backend=normal → historique préservé], payloads), BatchCard (uploadPersona=persona), TimelineColumn (prop seul ; publishedByMap + attribution F2→Romain GARDÉS), FileViewerModal (+ fonction morte filterBatchByPersona supprimée), Brain3D/Brain3DFullscreen (couleur du MODE f2 retirée ; wings mémoire intactes), RepoGraph3D/Fullscreen (accentColor persona), PersonaLayout (AlertRow + 9 câbles mode="normal"). Résidus voulus : attribution timeline + wings f2-core/f2-compte (4 fichiers). Typecheck 0 erreur.
- ✅ **B4.4** : vérifié **repo40** (3 fichiers, 4 labels) : GraphifyView l.290 « contexte FoundryTwo » + l.313 « graph sémantique FoundryTwo » ; GraphifyFullscreen l.30 « Concepts sémantiques · FoundryTwo » ; brain-3d zones.ts l.24 « Décisions stratégiques FoundryTwo (DDR) ». Plus aucun « F2 » affiché hors nom système/wings mémoire/attribution timeline. ui/web non touché (archivé en B4.5).
- ✅ **B4.5** : vérifié **repo41**. `git mv ui/web → archives/2026/07-tech-legacy/ui-web-dashboard-2026-06-11/` (14 fichiers ; catégorie 07 choisie par R [code legacy] au lieu du 05 du plan). 3 corrections doc : JARVIS-ARCHITECTURE-COMPLETE §3.10 marqué ARCHIVÉ ; f2-designer.md contexte « Dashboard ui/web » → « Cockpit Jarvis (ui/jarvis) » ; archives/2026/README section 07 indexée. Seule réf restante = le marqueur ARCHIVÉ (voulu). Idées uniques (page /budget, Overview business) notées comme futurs panneaux ui/jarvis.
- ✅ **B4.6a** : vérifié **repo42** (12/06). `produits/STATUS.md` RÉÉCRIT (validé R mot à mot) : tableau canon 4 business (StoreMD SaaS ✅ Live App Store 22/05 · ProfitPilot SaaS backlog · Hokuno boutique marque streetwear, lancement après Jarvis, AUCUN cold · Otaku-Store boutique « délire » caricatures mangas [dissociation Hokuno↔Otaku-Store actée 12/06]) + vivier 5 anciens SaaS gardés en trace + trace du planning d'origine par mois. Câblage : `produits/STATUS.md` = 6e fichier des contextPaths chat.ts (~+500 tokens/message). Typecheck 0 erreur. Effectif au redéploiement Railway.
- ✅ **B4.6b** (12/06) : design sélecteur business FIGÉ (maquette HTML validée R + insights intégrés : voix par business pour la rédaction, compteurs spécifiques [Hokuno sans cold], conscience persona×business, ligne de contexte injectée au chat, pas de f2-bis). Détail canon : RECAP §8. Implémentation à la sortie d'Hokuno ; impacts backend = chantier post-Bloc 4.
- ✅ **B4.7** : vérifié **repo43** (12/06). 5 fichiers, 9 corrections + 2 micro README : JARVIS.md (point connexion l.31 retiré + §Mode F2 → pierre tombale datée 11/06) ; JARVIS-ARCHITECTURE (showF2Toggle retiré de l'exemple de code, ligne toggle supprimée, couleur F2 retirée, §Mode F2 → 1 ligne tombale) ; JARVIS-UPGRADE-PLAN (2 annotations « Obsolète » datées, historique non réécrit) ; SKILL jarvis-upgrade (ligne couleur F2 retirée du tableau — priorité, pilote Claude Code) ; ui/jarvis/README (2 retraits toggle F2). Faux positifs préservés (toggle FR, kill-switch, ✓/✗, prix annuel, tracking/).

**🎯 CONSTRUCTION BLOC 4 TERMINÉE : B4.1 → B4.7 ✅ (repo37 → repo43).**

**⚡ CHECK BRANCHEMENTS ✅ CLOS (12/06 soir)** : fils code ✅ repo44 (batch + pipeline, 6 retouches/5 fichiers) · cognitive_load = faux positif (sain) · **cause runtime CONFIRMÉE et RÉPARÉE : token GitHub `jARVIS` expiré le 20/05/2026** (= date du dernier cycle Ouroboros, cohérence parfaite ; vu sur github.com/settings/tokens). R a généré un nouveau token classic scope `repo`, no expiration, remplacé dans Railway Variables → redéploiement → **confirmation visuelle R : tout connecté** (graphe affiché, Ouroboros vivant, cockpit sain). R a aussi purgé volontairement les 45 proposals Ouroboros pending périmées (11→20/05, ère S9/S10) — récupérables via Git.

# 🔒 BLOC 4 — CLOS (12/06/2026)

B4.1→B4.7 construits et vérifiés (repo37→repo43) + CHECK BRANCHEMENTS réparé (repo44 + token Railway). Baseline finale : **repo45**. Restes consignés au RECAP : §8 points ouverts (sélecteur business à Hokuno · cartes d'accueil texte avril · 2e token GitHub expiré à inventorier) · §9 dettes.

## §6 — Dettes héritées rattachées au Bloc 4 (rappel)

- `CLAUDE-JARVIS.md` ↔ `CLAUDE.md` duplication drift-prone (passe backend possible ici ou plus tard).
- Mot « studio » ~156 fichiers (hors Bloc 4, différé).
- `brand-voice/SKILL.md` « LinkedIn FR/EN » vs D13 all-English (hors Bloc 4, différé).
