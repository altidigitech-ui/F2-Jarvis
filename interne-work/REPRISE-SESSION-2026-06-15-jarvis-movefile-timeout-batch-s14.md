# FICHIER DE REPRISE — Session du 15/06/2026 (soir)
## Bug move_file résolu · 5 fix timeout · Batch S14 généré · Dispatch en cours

> **But de ce document.** Permettre de reprendre le travail dans une conversation NEUVE sans rien reperdre. Écrit de façon factuelle, sans interprétation ni invention. Tout ce qui n'a pas pu être vérifié de première main est marqué comme tel.
>
> **Date de rédaction :** 16/06/2026 (lendemain de la session du 15/06 soir).
> **Auteur :** Claude, associé senior conversationnel de Romain (R) sur FoundryTwo.
> **Contexte de production :** ce fichier est écrit à partir (a) du transcript horodaté de la session, (b) des livrables `/mnt/user-data/outputs/`, (c) d'un ZIP du repo daté du 15/06 19:50, et (d) du contenu collé en chat par R.
>
> ⚠️ **LIMITE FACTUELLE IMPORTANTE :** le ZIP de référence (`F2-Jarvis-main.zip`) a été pris **à 19:50 le 15/06, AVANT** que Jarvis crée le fichier `batch-semaine-S14.md` et AVANT les actions de dispatch. Donc le contenu du batch S14 décrit ici provient de **ce que R a collé en chat** (audité ensemble), pas d'une lecture du repo à jour. C'est signalé à chaque endroit concerné.

---

## 0. À LIRE EN PREMIER (ordre de priorité)

Pour une instance qui reprend, lire dans cet ordre :

1. **CE FICHIER** en entier (état complet de la session + ce qui reste à faire).
2. **`BIBLE.md`** (racine repo) — les 13 principes non-négociables. Surtout §3 (zéro donnée inventée), §10 (validation explicite avant toute action).
3. **`ANTI-IA.md`** (racine repo) — filtre obligatoire sur tout contenu public.
4. **`CLAUDE.md`** (racine repo) — OS du repo, structure, règles transversales.
5. **`marketing/contenu/batch-semaine/batch-semaine-S14.md`** — le batch de la semaine en cours (créé par Jarvis le 15/06 soir).
6. **`marketing/contenu/batch-semaine/batch-template.md`** — le format de référence d'un batch (modifié ce soir : note PERF anti-repo_search ajoutée).
7. Les 3 fichiers de dispatch (voir §6) si on travaille sur la publication.
8. **`/mnt/user-data/outputs/RECAP-SESSION-JARVIS-2026-05-24.md`** — recap vivant du projet de branchement (historique blocs 1→4 + audit). Pour le contexte long.
9. **`/mnt/user-data/outputs/AUDIT-FINAL-BRANCHEMENT.md`** — l'audit A1→A5 du branchement (anomalies documentées, lot correctif en attente).

---

## 1. CONTEXTE GÉNÉRAL (qui, quoi, où)

- **R = Romain Delgado** (alias « Alti »), co-fondateur **growth** de **FoundryTwo** (société, R + Fabrice associés). R code le backend AUTANT que Fabrice via Claude Code. **Ne jamais présenter Fabrice comme le seul dev** — c'est juste l'image « pro » sur les réseaux.
- **F = Fabrice Gangitano**, CTO / co-fondateur.
- **Langue de travail : français exclusivement.** Contenu public rédigé en anglais (marché US/EU).
- **Repo : `github.com/altidigitech-ui/F2-Jarvis`**, branche **`main`**, root Railway = `/backend/jarvis`.
- **Jarvis** = cockpit AI de présence sociale basé sur Claude Agent SDK. Stack : FastAPI/LangChain/Celery/Redis (Railway, backend) + Next.js 14/TS/Tailwind (Vercel, frontend) + Supabase PG.
- **Posture de Claude dans ce projet :** associé senior conversationnel (war room stratégique + suivi écosystème + rédaction ponctuelle). **PAS** l'atelier de production batch — ça c'est Jarvis dans le repo.
- **Règle absolue transversale : AUCUNE action / fichier / prompt sans validation explicite de R** (« go », « validé », « ok »). BIBLE §10.
- **Méthode prompts Claude Code :** un prompt = une opération chirurgicale, testé en sandbox (diff + `npx tsc --noEmit` exit 0) AVANT livraison à R. Chaque ancre vérifiée unique (`assert count==1`).
- **Style de R :** direct, dense, anti-fluff. S'agace et insulte fort quand il ne comprend pas ou qu'on tourne en rond. Rester factuel, stable, non-soumis. Expliquer ultra-simplement quand il bloque sur une manip (gestes concrets pas-à-pas).

---

## 2. ÉTAT DES PRODUITS (au 15/06/2026)

- **StoreMD** — agent AI de scan santé Shopify, **live sur le Shopify App Store**. Offre de lancement active : **« Pro's free through June 22, no card »** + prix bloqué à vie si abonnement d'ici le **22/06**. Deadline = **lundi 22 juin à minuit** (confirmé par R cette session : le 22 est un jour VALIDE, l'offre expire à la fin du 22).
  - Pricing canon : Free $0 / Starter $29 / Pro $79 / Agency $199. Annuel = 2 mois offerts (Pro annuel ≈ $65.83/mo, économie $158/an).
  - Produit : 5 modules, 43 checks, ~60 secondes par scan (health, listings, agentic readiness, compliance, browser test). **R a confirmé que 43 checks / 5 modules est exact.**
  - Landing / free scan : **`storemd.vercel.app`** (R a confirmé que c'est toujours la bonne URL).
  - Install : `apps.shopify.com/storemd-1`.
- **Hokuno** — boutique streetwear Shopify (launch reporté).
- **ProfitPilot** — SaaS en backlog.

---

## 3. CE QUI A ÉTÉ FAIT CETTE SESSION (15/06 soir) — RÉCAP COMPLET

La soirée a couvert 4 chantiers. Tous terminés sauf le dispatch (en cours au moment de l'arrêt).

### 3.1 — Audit final du branchement : passe A5 ✅ ÉCRITE
- La passe A5 a été ajoutée à `/mnt/user-data/outputs/AUDIT-FINAL-BRANCHEMENT.md` (fichier complet A1→A5).
- **Verdict A5 :** trackers FIABLES, tous les ✅ déclarés vérifiés.
- **Verdict global de l'audit :** branchement Jarvis **SAIN et FONCTIONNEL**. Anomalies restantes = documentaires / non-bloquantes → un **LOT CORRECTIF FINAL** reste en attente de validation R ligne par ligne (voir §7).

### 3.2 — Bug `move_file` ✅ RÉSOLU (le gros morceau, ~4h de debug)

**Symptôme initial :** R validait une action `move_file` dans Jarvis (archiver `batch-semaine-S13.md` vers `marketing/archives/`) → rien ne se passait, pas de commit GitHub, pas d'erreur visible.

**Diagnostic — chaîne d'éliminations :**
- SQL Supabase sur la table `jarvis_pending_actions` : l'action `move_file` (id `99ccb5b0-9c6d-47a2-a272-eded46e9d195`) était en `status=failed`, `error="Unknown action_type: move_file"`.
- **FAUSSE PISTE (~2h perdues, Claude responsable) :** on a cru que Railway déployait une image Docker périmée (cache de build). Vérifié que `move_file` ÉTAIT bien présent sur `main` (lignes 208 et 556 de `action-executor.ts`). On a même poussé un cache-bust Dockerfile temporaire (`ARG CACHE_BUST`) qui a forcé une vraie recompilation — et le serveur répondait TOUJOURS « Unknown action_type ». **Preuve que ce n'était PAS le cache.**

**CAUSE RACINE RÉELLE (trouvée en lisant le code de routage) :**
- Le bug était dans **`backend/jarvis/src/routes/action-execute-batch.ts`**.
- Cette route triait les actions : **seules les `create_file`** passaient par `executeAction()` (la fonction qui sait faire move_file/delete_file via chemins dédiés). TOUT le reste (dont `move_file`) partait dans `normalActions` → `applyTransform()` + `ghUpdate()`.
- Or **`applyTransform` n'a aucun `case "move_file"`** (seulement create_file/patch_file/log_*) → tombe dans `default` → `throw "Unknown action_type: move_file"`.
- Donc le bouton « Valider » routait `move_file` vers la mauvaise fonction. Rien à voir avec Railway/cache/déploiement.

**LE FIX (poussé sur main, typecheck backend = 0) :**
- Dans `action-execute-batch.ts`, ajout d'une constante :
  ```
  const STANDALONE_TYPES = ["create_file", "move_file", "delete_file"];
  ```
- Le filtre `createFileActions` utilise `STANDALONE_TYPES.includes(a.action_type)` (passent par `executeAction`).
- `normalActions` utilise `!STANDALONE_TYPES.includes(...)`.
- Commit : `fix(actions): execute-batch route move_file/delete_file via executeAction` (SHA `0eb238a`).

**RÉSULTAT — GAGNÉ :** test console navigateur retourné `{"ok":true,"results":[{"id":"99ccb5b0...","ok":true}]}`. Le S13 a été archivé sur GitHub PAR JARVIS (commit owner `d5cbf15` = déplacement de `batch-semaine-S13.md` vers `marketing/archives/batch-semaine/`). Le bug est corrigé à la source — tous les futurs move_file/delete_file de Jarvis fonctionneront.

**Nettoyage :** le cache-bust Dockerfile a été retiré ensuite (commit `chore(docker): retrait du cache-bust ARG`, SHA `1b4f0f7`). La variable `CACHE_BUST` sur Railway a été utilisée une dernière fois (valeur 4) pour forcer le déploiement du fix, **puis supprimée**.

> **NOTE pour reprise :** il reste **9 actions `move_file` en statut `pending`** dans `jarvis_pending_actions` (la plupart datent de fin avril : archivage de proposals ouroboros vers `rejected/`, + une vieille de fin avril). Maintenant que move_file fonctionne, ces actions se rejoueront correctement si validées. À surveiller — Jarvis pourrait les reproposer. Ce ne sont PAS des bugs, juste des actions anciennes jamais exécutées (à cause du bug move_file qui les bloquait).

### 3.3 — Les 5 fix « timeout » (faux blocage « JARVIS bloqué 90s ») ✅ TOUS POUSSÉS + DÉPLOYÉS

Problème : l'interface Jarvis affiche « ⏱️ JARVIS bloqué depuis 90s » alors que Jarvis **travaille réellement** en arrière-plan (côté serveur Railway). 5 correctifs poussés sur main, tous testés en sandbox (typecheck 0), tous déployés (Railway backend + Vercel frontend vérifiés verts) :

| # | Fix | Fichier | Commit (SHA) | Effet |
|---|-----|---------|--------------|-------|
| **P1** | Watchdog Chat | `ui/jarvis/components/Chat.tsx` | `2c8b461` | Le watchdog « réponse » se reset aussi sur `tool_result` et `error` (un outil qui finit = progrès réel), et le seuil passe de **90_000 → 180_000 ms**. Le watchdog ping (25s) reste intact. |
| **P2** | Anti-repo_search vidéos | `marketing/contenu/batch-semaine/batch-template.md` | `2d3facc` | Note PERF : interdiction d'utiliser `repo_search` pour trouver les vidéos (le catalogue est inline + `MAPPING_VIDEOS_V1.md`). `repo_search` est lent et rate-limité, il fait timeout le batch. |
| **P3** | Timeout repo_search | `backend/jarvis/src/lib/jarvis-tools.ts` | `8f82790` | `AbortSignal.timeout(20_000)` ajouté aux 2 fetch GitHub Code Search (variantes per_page=10 et per_page=5). |
| **P4** | Timeout lectures GitHub | `backend/jarvis/src/lib/github.ts` | `ac7bf26` | Helper `ghReadFetch` (timeout 20s) appliqué aux **5 fonctions de LECTURE** (ghRead, ghList, ghReadExternal, ghListExternal, ghReadRaw). **Les 19 écritures/commits restent volontairement NON bornés** (couper un commit en vol = état incertain). |
| **P5** | Resync index archives | `marketing/archives/README.md` | `0fa8f04` | Index §6 mis à jour : ajout S10→S13 + note semaine courante → S14, date → 15/06. |

> **IMPORTANT sur P1 et le problème d'interface :** P1 corrige le watchdog côté code, MAIS le problème « 90s » a persisté pendant la session car **le navigateur de R tournait encore sur l'ancien front en cache**. Le contournement = **Cmd+Shift+R (rechargement forcé)** charge le front Vercel à jour. **CE PROBLÈME N'EST PAS PLEINEMENT RÉSOLU** — voir §5 (bugs ouverts).

### 3.4 — Batch S14 ✅ CRÉÉ PAR JARVIS + audité

- Fichier `marketing/contenu/batch-semaine/batch-semaine-S14.md` créé par Jarvis via `create_file` (le type d'action qui marchait déjà). Confirmé par Jarvis : **1425 lignes, ~52 255 chars** sur le repo.
- ⚠️ **Le contenu décrit ci-dessous a été audité depuis ce que R a collé en chat, pas depuis le repo à jour (ZIP antérieur).**

**Structure du batch S14 (15/06 → 21/06) :** 41 publications, 7 jours, TikTok-first (1 vidéo source/jour recyclée par compte).

| Jour | Angle | Vidéo | Hashtags | Offre |
|------|-------|-------|----------|-------|
| Lun 15 | Ghost billing (Privy, $232 après uninstall) | V1-11 | Set B | standard |
| Mar 16 | Régression silencieuse (47j, score 78→52) | V1-17 | Set C | standard |
| Mer 17 | Preuve produit (scan réel, IH ce jour) | V1-13 | Set A | standard |
| Jeu 18 | Pertes invisibles (counter $) | V1-15 | Set B | standard |
| Ven 19 | Browser automation | V1-19 | Set C | « 3 days left » |
| Sam 20 | Les chiffres (pricing transparent) | V1-30 | Set A | « last weekend » |
| Dim 21 | Lock price for life | V1-29 | Set B | « ends tomorrow » |

- Rotation hashtags : B→C→A→B→C→A→B (suite directe du Set A de Dim 14, S13).
- Compte des pubs : 6+7+8+7+7+3+3 = **41** ✅
- Comptes : TikTok @StoreMd_off, Twitter @StoreMd_off (SM), Twitter @delgado_ro72224 (R), Twitter @FabGangi (F), LinkedIn Romain Delgado (LI-R mar+jeu), LinkedIn Fabrice Gangitano (LI-F mer+ven), Instagram, Facebook, IndieHackers FoundryTwo (mercredi).

**Audit réalisé — 2 corrections demandées et appliquées par Jarvis :**
1. **Dimanche 21 :** « Last day to lock your price for life » était FAUX (deadline = lundi 22, donc dimanche n'est pas le dernier jour). Corrigé en **« Last call to lock your price for life »** (+ trad FR « Dernier appel »). « Pro's free through June 22. That's tomorrow. » conservé (exact).
2. **Mardi LI-R :** incohérence temporelle « 30 days ago » vs « six weeks » dans le même post. Corrigé → tout aligné sur **« six weeks ago »** (Jarvis a même réécrit l'ouverture en « I scanned a store six weeks ago »).

**Points vérifiés conformes :** UTM (lowercase_snake_case, 6 canaux), liens (Twitter en reply / LinkedIn en commentaire / IH in-text / TikTok-IG-FB en bio), voix (R = « I », F = « I », StoreMD = neutre/« we », IH = FoundryTwo « we »), offre (« through June 22 » partout, jamais « extended » ni %), ANTI-IA respecté.

**Micro-point non corrigé (non bloquant) :** le « $232 » du lundi est cité dans le hook comme un chiffre réel, alors que la red-line de Jarvis dit que les montants des vidéos sont des animations démo (BIBLE §3). **R a tranché : le lundi 15 ne sera PAS publié** (on était déjà mardi 16), donc le point tombe de lui-même.

---

## 4. CE QUI EST EN COURS / À FINIR IMMÉDIATEMENT — LE DISPATCH

**État au moment de l'arrêt de la conversation :** le batch central S14 est créé. Il faut maintenant **dispatcher** son contenu dans les 3 fichiers de publication. **C'est l'action en cours, NON terminée.**

### Les 3 fichiers de dispatch (vérifiés sur le repo, tous en S13, à passer en S14)

| Fichier | Périmètre | Contenu à dispatcher |
|---------|-----------|----------------------|
| `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` | Comptes StoreMD (brand) | TK + TW-SM + IH (mer) + IG + FB = **27 posts** |
| `romain/publication/batch-semaine.md` | Compte R perso | TW-R (7) + LI-R (mardi + jeudi) |
| `fabrice/publication/batch-semaine.md` | Compte F perso | TW-F (7) + LI-F (mercredi + vendredi) |

> Les 3 fichiers ont la même structure (header « BATCH PUBLICATION — Compte X — S[N] » + source = batch central + périmètre + « Ne JAMAIS rédiger ici »). Le dispatch = écraser le contenu S13 par le contenu S14 correspondant au périmètre du fichier.

### ⚠️ POINT CRITIQUE relevé par R (à ne pas oublier)
Au moment de l'arrêt, **Jarvis n'avait préparé QUE le dispatch StoreMD** et avait laissé de côté les dispatch **Romain** et **Fabrice**. R l'a remarqué. **Le dispatch complet d'une semaine = 3 actions** (StoreMD + R + F), pas 1. R a indiqué qu'il allait re-cadrer Jarvis lui-même sur les 3 dispatch.

**Question ouverte à clarifier avec Jarvis avant de dispatcher R et F :** est-ce que les dispatch R et F contiennent le contenu intégral des posts (comme StoreMD) ou juste un planning/référence ? → faire lire à Jarvis la structure actuelle de `romain/publication/batch-semaine.md` (en S13) pour calquer le format exact.

### Détail sur le dispatch StoreMD (préparé par Jarvis, structure validée par R)
- Lun 15 : TK-01 · TW-SM-01 · IG-01 · FB-01
- Mar 16 : TK-02 · TW-SM-02 · IG-02 · FB-02
- Mer 17 : TK-03 · TW-SM-03 · IH-03 · IG-03 · FB-03
- Jeu 18 : TK-04 · TW-SM-04 · IG-04 · FB-04
- Ven 19 : TK-05 · TW-SM-05 · IG-05 · FB-05
- Sam 20 : TK-06 · IG-06 · FB-06 (pas de TW-SM ni LI le week-end)
- Dim 21 : TK-07 · IG-07 · FB-07
- Décision R : laisser le lundi 15 dans le dispatch (miroir fidèle du batch), il sera juste sauté à la publication réelle.

---

## 5. BUGS / PROBLÈMES OUVERTS (identifiés cette session, NON résolus)

### 5.1 — 🔴 Interface « JARVIS bloqué depuis 90s » (le plus rongeant pour R)
- **Symptôme :** l'UI affiche « ⏱️ JARVIS bloqué depuis 90s. Renvoyez le message. » alors que Jarvis travaille réellement (les tool calls défilent en dessous). En rafraîchissant la page, le contenu réel apparaît.
- **État :** le fix P1 (watchdog 180s + reset sur tool_result/error) est poussé et déployé sur Vercel. MAIS le problème a continué d'apparaître pendant la session.
- **Hypothèse non confirmée :** soit (a) le navigateur de R tournait sur l'ancien front en cache (le Cmd+Shift+R débloque → pointe vers du cache), soit (b) il reste un 2e endroit dans `Chat.tsx` qui affiche « bloqué » que P1 n'a pas couvert.
- **À FAIRE pour trancher :** après un Cmd+Shift+R propre (front Vercel à jour garanti), tester si le message « 90s » réapparaît. Si OUI → rouvrir `Chat.tsx` pour chercher le vrai chemin du message d'affichage (P1 ne couvrirait pas tout). Si NON → c'était juste du cache, problème réglé.
- **R a dit explicitement vouloir régler ce problème d'interface APRÈS le batch.** C'est un chantier à part entière à reprendre.

### 5.2 — 🟡 Commits JARVIS « Unverified » sur GitHub
- Les commits directs de Jarvis (auteur `altidigitech@gmail.com`, ex : `d5cbf15`, `4ff49ed`, `7c1e739`) apparaissent **« Unverified »** sur GitHub (non signés).
- **Cosmétique, non bloquant.** Le correctif propre = dans le pipeline JARVIS (signer au moment du commit/push avec une clé enregistrée, ou pousser via l'API GitHub qui signe). **PAS** une réécriture de l'historique (Claude Code a refusé à juste titre de réécrire/réattribuer ces commits + force-push).
- À traiter plus tard, non urgent.

---

## 6. RÈGLES DE CONTENU À RESPECTER (rappel pour la production / l'audit)

- **BIBLE §3 :** zéro donnée inventée. Jamais un score/%/nombre/« many users »/« great results » non sourcé. Donnée manquante = « — ».
- **BIBLE §10 :** validation explicite avant toute action/fichier/prompt.
- **Voix :** R = « I », F = « I », StoreMD = neutre/brand « we », IH = FoundryTwo « we ». **Ne jamais mélanger.** Le pronom est un tell instantané.
- **Règles liens par plateforme :**
  - **Twitter :** lien en **reply** (jamais dans le corps). 2 blocs distincts (bloc 1 = texte, bloc 2 = lien à poster en reply).
  - **LinkedIn :** lien en **1er commentaire** (jamais dans le corps — algo, -60% reach si lien dans le post).
  - **IndieHackers :** lien **in-text** (long-form transparent, voix FoundryTwo « we », sans emoji).
  - **TikTok / Instagram / Facebook :** CTA verbal + free scan **en bio**.
- **ANTI-IA :** pas d'em-dash pivot, pas de « Not X it's Y », contractions obligatoires en contenu oral, longueurs de phrases variées, pas de liste numérotée dans le corps Reddit/Twitter/FB, pas d'ouverture « Here's the thing / The reality is / At the end of the day / So, / Look, / Honestly, ».
- **Offre StoreMD canon :** « Pro's free through June 22, no card ». Jamais « promo », jamais de % affiché, jamais « extended/prolongé ». Le 22 juin est un jour VALIDE (expire le 22 à minuit).
- **Format batch §3.2 :** lignes courtes, lignes blanches entre blocs, 1-3 emojis en fin de ligne, CTA isolé, zéro paragraphe prose.
- **Source de vérité vidéos :** `asset-brand/storemd/videos/V1/MAPPING_VIDEOS_V1.md`.
- **Source de vérité UTM :** `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md` (lowercase_snake_case).
- **Hashtags :** `marketing/saas-app-shopify/hashtags.md`. Sets A/B/C par plateforme. `#StoreMD` brandé sur chaque post.

---

## 7. CE QUI RESTE À FAIRE (TODO priorisé)

### Immédiat (suite directe de la session)
1. **Terminer le dispatch S14** — les 3 fichiers (StoreMD préparé / R et F à faire). Re-cadrer Jarvis sur les 3, valider un par un. (Voir §4.)
2. **Vérifier après dispatch** que les 3 fichiers `publication/batch-semaine.md` sont bien passés en S14 et que le contenu correspond au batch central (mêmes posts, liens, UTM).
3. **Publication mardi 16 :** ne pas oublier que le lundi 15 ne se publie pas (passé). Premier post mardi calé à 13h00 (TW-F). Démarrer le tracking à partir de mardi 16.

### Chantier à part (R veut le faire après le batch)
4. **Régler le problème d'interface « 90s »** (§5.1) — trancher cache vs Chat.tsx après un rechargement forcé propre.

### Plus tard (non urgent)
5. **Supprimer la variable `CACHE_BUST` sur Railway** si pas déjà fait (le Dockerfile est nettoyé, la variable est devenue inutile). À VÉRIFIER : R devait la supprimer après confirmation du fix.
6. **LOT CORRECTIF FINAL de l'audit A1→A5** (`AUDIT-FINAL-BRANCHEMENT.md`) — validation R ligne par ligne. Points en attente : fichiers fantômes A4-08 (`AUDIT.md` + `TEMPLATE-BATCH-...` cités dans CLAUDE.md mais inexistants), purge terminologique « studio » (~69 .md), couleur `#97C459` (A5-02), incohérences chiffrées CLAUDE.md (A4-06 skills 17 pas 19, A4-07 commands 14 pas 11).
7. **Signatures commits JARVIS « Unverified »** (§5.2) — correctif dans le pipeline JARVIS.
8. **Commits JARVIS « Unverified »** : non urgent, cosmétique.

---

## 8. RÉPONSE À LA QUESTION DE R : « repo + ce fichier suffisent-ils ? »

**Réponse : OUI, à 95%, avec un complément recommandé.**

### Ce qui suffit
- **Le repo F2-Jarvis** (joint comme fichiers de connaissance du projet) contient toute la source de vérité : code, BIBLE, ANTI-IA, CLAUDE.md, voix, batchs, dispatch, vidéos, UTM, hashtags. C'est la base.
- **CE FICHIER** apporte ce que le repo ne contient pas : l'état de la session du 15/06 (ce qui a été fait/poussé/déployé ce soir), les bugs ouverts identifiés, le contexte du dispatch en cours, et le TODO priorisé.

### Le complément recommandé (les 5% manquants)
Le repo joint au projet est probablement une version **antérieure** aux modifications de ce soir (sauf si R re-uploade un ZIP frais). Donc :

**Fichiers à joindre à la nouvelle conversation :**
1. **CE FICHIER** (`REPRISE-SESSION-2026-06-15-...md`) — indispensable.
2. **Un ZIP frais du repo F2-Jarvis** pris APRÈS la création du S14 et APRÈS le dispatch (pour que le batch S14 + les 3 dispatch à jour soient lisibles). Le ZIP du projet/connaissance doit être à jour, sinon la nouvelle instance ne verra ni le batch S14 ni les fix de ce soir dans le code.
3. (Optionnel mais utile) **`AUDIT-FINAL-BRANCHEMENT.md`** si on doit reprendre le lot correctif.

> **En résumé :** repo À JOUR + ce fichier = suffisant. Repo PÉRIMÉ + ce fichier = il manquera le contenu réel du batch S14 et des dispatch (mais ce fichier en décrit la structure et le plan, donc on peut quand même travailler). **Le mieux : re-uploader un ZIP frais du repo dans la nouvelle conversation.**

---

## 9. PHRASE DE DÉMARRAGE SUGGÉRÉE POUR LA NOUVELLE CONVERSATION

Pour amorcer proprement la reprise, R peut écrire quelque chose comme :

> « Lis le fichier REPRISE-SESSION-2026-06-15 en entier, puis confirme-moi l'état du dispatch S14 et ce qu'il reste à faire. On reprend là où on s'est arrêté : [terminer le dispatch R+F] OU [régler le bug interface 90s]. »

---

*Fin du fichier de reprise. Source de vérité permanente : le repo F2-Jarvis. Ce document est un instantané daté de l'état au 15/06/2026 soir, écrit sans interprétation ni invention — tout élément non vérifié de première main y est signalé comme tel.*
