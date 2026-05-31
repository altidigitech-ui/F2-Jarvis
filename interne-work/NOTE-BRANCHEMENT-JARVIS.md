# NOTE BRANCHEMENT JARVIS — incohérences à corriger (couche doc)

> Note de travail vivante. On y consigne tout ce qui doit potentiellement être corrigé pour que **Jarvis exécute correctement les commandes et comprenne le repo**.
> **Cette note RECENSE, elle ne déclenche rien.** Aucune correction exécutée sans validation R.
> Distincte de `PLAN-BRANCHEMENT-JARVIS.md` (tracker maître, décisions) et de `BLOC0-CARTOGRAPHIE-AUDIT.md` (couche code). Ici = **couche documentaire** : les `.md` que les agents lisent.
> **Créée :** 31/05/2026 (pendant le batch S12). **À auditer par R en fin de batch** pour trier ce qui est d'actualité.
> Emplacement repo cible : `interne-work/NOTE-BRANCHEMENT-JARVIS.md`.

---

## Comment l'utiliser

- Chaque point : `[ ]` à corriger · `[x]` corrigé.
- On ajoute un point dès qu'il surgit, on continue le batch.
- R audite en fin de batch : garde / jette / repriorise.

---

## DÉCISION DE CONVENTION EN SUSPENS (bloque les fixes de chemins catégorie A)

Faut trancher la convention d'écriture des chemins dans les docs :
- **Option 1 — root-relative partout** (`marketing/saas-app-shopify/...`) : sans ambiguïté pour Claude Code qui tourne depuis la racine du repo. (reco)
- **Option 2 — relatif-au-dossier** dans `marketing/` (`saas-app-shopify/...` lu comme relatif à `marketing/`).

Tout le fix de catégorie A en dépend.
- [ ] Convention tranchée par R : `______________`

---

## GARDE-FOU — NE PAS TOUCHER

- `saas/` dans `.claude/skills/` (graphify, brain-3d-renderer, saas-launch-checklist, context-md-generator) et `.claude/commands/` (jarvis.md, morning.md) = **submodules de CODE** (SaaS en prod), PAS `produits/saas/`. Les "corriger" casserait la logique des agents. **Laisser tel quel.**

---

## POINTS À CORRIGER

### A. `saas-app-shopify/` sans préfixe → `marketing/saas-app-shopify/`
Le dossier a été déplacé dans `marketing/`. ~60 refs dans des fichiers vivants pointent encore vers `saas-app-shopify/...`.

- [ ] `marketing/contenu/batch-semaine/batch-template.md` — lignes 40, 91, 92, 104, 110, 111, 236, 251, 348, 406, 462, 471, 579, 633 — **⚠ PRIORITÉ : lu par `/batch` en §2 pour collecter les données**
- [ ] `romain/planning/plan-30-jours.md`, `romain/planning/daily-checklist.md`, `romain/planning/plan-hebdo.md`
- [ ] `romain/context.md`, `romain/angles-et-templates.md`, `romain/VOIX.md`
- [ ] `fabrice/planning/plan-30-jours.md`, `fabrice/planning/daily-checklist.md`, `fabrice/planning/plan-hebdo.md`
- [ ] `fabrice/context.md`, `fabrice/angles-et-templates.md`, `fabrice/VOIX.md`
- [ ] `marketing/contenu/formats.md`
- [ ] `marketing/canaux/tiktok/context.md` (+ vérifier les autres canaux : linkedin, twitter, reddit, facebook, ih, ph, instagram)
- [ ] `marketing/README.md` — ⚠ écrit en relatif EXPRÈS le 22/05 (validé R). À ne corriger QUE si convention root-relative tranchée.

Cible : préfixer `marketing/` (si Option 1 retenue).

### B. `growth-marketing/` → `marketing/canaux/`
Ancien chemin. 14 fichiers vivants.

- [ ] `CLAUDE.md`, `README.md`, `ENTRYPOINT.md`, `JARVIS-ARCHITECTURE-COMPLETE.md`
- [ ] `romain/context.md`, `romain/system-prompt.md`
- [ ] `fabrice/context.md`, `fabrice/system-prompt.md`
- [ ] `interne-work/PLAN-BRANCHEMENT-JARVIS.md`, `interne-work/BLOC0-CARTOGRAPHIE-AUDIT.md`, `interne-work/BLOC1-BACKEND-REMAP.md`, `interne-work/BLOC2-CLAUDE-CONFIG-PLAN.md`
- (recaps `tracking/recap-sessions/2026-05-18_20.md` et `2026-05-21_22.md` = historique, laisser)

### C. `saas/` nu → `produits/saas/` (DOCS uniquement, PAS les skills/commands — cf. garde-fou)
- [ ] `romain/planning/plan-30-jours.md:137`, `romain/system-prompt.md:446`
- [ ] `fabrice/planning/plan-30-jours.md:137`, `fabrice/system-prompt.md:408`

### D. `TEMPLATE-BATCH-DOUBLE-COUCHE` (archivé) → `strategie.md §2`
13 fichiers vivants référencent un template désormais archivé.

- [ ] `ARCH.md`, `CLAUDE.md`, `ENTRYPOINT.md`
- [ ] `la-toile/la-toile.md`
- [ ] `marketing/contenu/pipeline-video.md`, `marketing/contenu/formats.md`, `marketing/objectifs.md`, `marketing/jarvis/prompts.md`
- [ ] `systeme cognitif/WAVE-2-METACOG-MEMOIRE-FIXED.md`, `brain/context-cognitif/memoire/procedurale.md`
- (emplacement réel de l'archive : `archives/2026/05-dossiers-deprecated/2026-04-21_template-batch-double-couche.md`)

### E. `launch-days.md` (splitté) → `canaux/ih/` + `canaux/ph/`
- [ ] `marketing/contenu/formats.md`

---

## AUTRES INCOHÉRENCES REPÉRÉES (à confirmer en audit)

- [ ] `tracking/metrics/storemd-admin/storemd-admin.md` : dernier snapshot S9 (11-17/05). S10 admin non capturé (dashboard cumulatif) ; S11 rattrapé par le snapshot du 31/05.
- [ ] Handle TikTok StoreMD divergent : `@storeemd` (README métriques) vs `@StoreMd_off` (mapping vidéos V1). À unifier sur le vrai compte.
- [ ] **Dashboard admin StoreMD — incohérence d'agrégation** : dans le Funnel (last 30 days), `Install completes` (33) > `Install starts` (3). Logiquement impossible (on ne peut pas compléter plus d'installs qu'on en démarre). Bug côté dashboard/analytics à investiguer (chiffres loggés bruts dans `storemd-admin.md` S11, non corrigés).
- [ ] **Template `tracking/metrics/storemd-admin/storemd-admin-TEMPLATE.md` à mettre à jour** : le dashboard affiche désormais une colonne `UTM Source` dans Recent Merchants, absente du squelette du template. Ajouter la colonne au squelette pour les prochaines collectes.
- [ ] FAUX POSITIF (ne PAS corriger) : `batch-template.md §2` → `romain/cold/cold-log-*.md` et `fabrice/cold/cold-log-*.md` = **valides, ces chemins existent**.

---

*Note vivante. Remplissage au fil du batch. Audit R en fin de batch.*
