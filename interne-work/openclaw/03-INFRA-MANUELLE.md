# 03 — INFRA MANUELLE — Runbook de lancement (à deux)

> Le seul fichier d'actions **manuelles**. On l'exécute **à deux, ensemble**.
> Mis à jour le 15/06/2026 avec les vraies variables d'env tirées du code (`backend/jarvis/src/lib/cold/`).

---

## RÈGLE DU JEU — à lire d'abord, ensemble

- On fait **tout ensemble**. Personne n'exécute une tâche seul dans son coin.
- La division en 2 lots **organise** le travail dans le temps — elle ne sépare pas les personnes. Les deux sont présents et comprennent chaque étape.
- **Chaque tâche a un POURQUOI.** Si l'un des deux ne comprend pas le pourquoi → on s'arrête et on clarifie avant de cocher. C'est ça qui évite le flou.
- On coche **au fur et à mesure**. Tant qu'une case n'est pas cochée, la tâche n'est pas faite — jamais de « je crois que l'autre l'a fait ».
- **Secrets** (clés, mots de passe) : uniquement dans Railway. Jamais dans le repo, jamais dans un chat, jamais dans une capture d'écran.

---

## ÉTAT ACTUEL — pour zéro flou (ce qui est DÉJÀ fait)

- ✅ OpenClaw installé sur le VPS Hostinger, connecté au repo GitHub
- ✅ Endpoint interne StoreMD `POST /api/v1/internal/preview-scan` live + testé (gymshark → 61/100, renvoie les findings détaillés)
- ✅ `storemd.ts` **corrigé** — contrat scan aligné (X-Internal-Key, shop_domain, preview_score, sévérités critical/major/minor) — PR #332, commit 7c1e739, typecheck OK
- ✅ Les 6 PRs **mergées** dans `main` (#328 → #337) — le code cold est en prod
- ✅ Migration `003_cold_targets.sql` **appliquée** dans la base Jarvis (`hcgtxgnvqkalpbcroihx`) — tables `cold_targets` + `cold_suppression` prêtes
- ⏳ Reste : `004_social_posts.sql` (Lot 2, pas encore appliquée) + l'infra des 2 lots ci-dessous

**Architecture à avoir en tête (les deux) :** Jarvis tourne sur **Railway**, OpenClaw sur le **VPS Hostinger** (couche navigateur), ils se parlent en HTTP. Toutes les variables d'env vont dans **Railway → Jarvis**.

---

## ✅ PRÉREQUIS — levés

- [x] **Fix `storemd.ts`** — contrat scan aligné (header `X-Internal-Key`, body `shop_domain`, lecture `preview_score`, sévérités `critical/major/minor/info`). PR #332, commit 7c1e739, typecheck OK.
  - *Le vrai bug caché corrigé : `major` tombait dans `undefined` et coulait dans le classement → maintenant `major→medium`.*
- [x] **Merge des 6 PRs** (#328 → #337) dans `main` — le code cold est en prod.

→ Les prérequis sont levés. **On attaque directement le Lot 1, à deux.**

---

## 🟢 LOT 1 — Cold email (on le fait en premier, ensemble)

À la fin de ce lot, la machine peut envoyer. Aucune dépendance externe ici.

### 1.1 — Boîtes d'envoi (Maildoso)
- [ ] Souscrire **Maildoso**, créer **~10 boîtes** sur `leakdetector.tech`
  - *Pourquoi Maildoso et pas une boîte normale : Zoho/Gmail interdisent le cold et suspendent le compte. Maildoso est fait pour ça (IP + warmup + DNS gérés).*
- [ ] Laisser Maildoso poser **SPF/DKIM/DMARC + warmup** (automatique)
  - *Pourquoi : sans authentification DNS, tout part en spam. Maildoso le fait à notre place.*
- [ ] Exporter le **CSV des creds** (SMTP host/port/user/pass + IMAP host/port pour chaque boîte)

### 1.2 — Relier OpenClaw
- [ ] Récupérer l'**URL du Gateway OpenClaw** (sur le VPS) + son **token API**
- [ ] Vérifier que le Gateway est **joignable de l'extérieur** (pas seulement localhost)
  - *Pourquoi : Jarvis (sur Railway) appelle OpenClaw en HTTP pour le scraping. S'il n'est joignable qu'en local, Jarvis ne peut pas l'atteindre.*

### 1.3 — Variables d'env dans **Railway → Jarvis** (noms exacts attendus par le code)
- [ ] **Boîtes** (depuis le CSV Maildoso), pour chaque boîte `N` de 1 à ~10 :
  `MAILBOX_N_SMTP_HOST`, `MAILBOX_N_SMTP_PORT` (def 587), `MAILBOX_N_SMTP_USER`, `MAILBOX_N_SMTP_PASS`, `MAILBOX_N_IMAP_HOST`, `MAILBOX_N_IMAP_PORT` (def 993), `MAILBOX_N_FROM`
- [ ] `STOREMD_PREVIEW_SCAN_URL` = `https://storemd-api-production.up.railway.app/api/v1/internal/preview-scan`
- [ ] `STOREMD_PREVIEW_SCAN_KEY` = la clé `INTERNAL_SCAN_KEY` (celle régénérée après le screenshot)
  - *Pourquoi : c'est ce que Jarvis envoie en header `X-Internal-Key` pour appeler le scan. Doit être identique à celle posée côté StoreMD.*
- [ ] `ANTHROPIC_API_KEY` = la **clé API** `sk-ant-…` (PAS le login Claude Code)
  - *Pourquoi : c'est la machine qui écrit les emails (modèle Haiku). C'est une clé API facturée à l'usage, différente du login de Claude Code.*
- [ ] `OPENCLAW_GATEWAY_URL` + `OPENCLAW_API_KEY`
- [ ] *(optionnel — défauts OK)* `COLD_DAILY_CAP_PER_INBOX` → mettre **10-15** pour démarrer ; `COLD_SMTP_PROBE_FROM` → une adresse `@leakdetector.tech` ; `COLD_BOUNCE_MAX`, `COLD_COMPLAINT_MAX`, `COLD_GUARD_MIN_SAMPLE`
  - *Pourquoi le cap bas : on démarre doucement et on monte au signal, pour ne pas brûler la réputation des boîtes neuves.*

### 1.4 — Légal
- [ ] Rédiger la **LIA** (1 page, prospection B2B US/UK/AU)
  - *Pourquoi : couverture légale du cold. Ciblage US/UK/AU uniquement (le code filtre déjà, pas d'EU/FR).*

### ✅ Fin du Lot 1
- [ ] **Test bout-en-bout sur 1 boutique** → on demande à Claude/Supabase de vérifier que le prospect traverse les statuts `sourced → … → scanned` avec un vrai `scan_score` + `scan_findings`.

---

## 🔵 LOT 2 — Réseaux (après le Lot 1, ensemble aussi)

Dépend d'approbations longues. **À lancer en parallèle** (les demandes prennent des semaines), mais livré plus tard.

### 2.1 — Demandes d'accès API (à déclencher dès maintenant)
- [ ] **Meta** (Instagram/Facebook — content publishing)
- [ ] **TikTok** (Content Posting API + audit)
- [ ] **LinkedIn** (Posts API — viser le **profil perso**, pas la page entreprise)
  - *Pourquoi maintenant : ces approbations prennent des semaines. On les lance tôt pour ne pas attendre plus tard. Elles ne bloquent PAS le cold email.*

### 2.2 — X (le seul activable tout de suite)
- [ ] Créer le compte développeur X → générer les **tokens** → les mettre dans Railway Jarvis
  - *(noms exacts des variables à confirmer dans `backend/jarvis/src/lib/social/`)*

### 2.3 — Activation du social (quand on est prêts)
- [ ] Demander l'application de la migration `004_social_posts.sql` (base Jarvis) — **pas encore faite, elle attend**
- [ ] Pipeline médias (visuels/vidéos via Higgsfield/Canva, hors backend)

---

## À COMPRENDRE ENSEMBLE — le minimum pour que personne ne soit perdu

- **Pourquoi Maildoso et pas Zoho/Gmail** → ces derniers interdisent le cold (suspension). Maildoso est conçu pour, avec warmup/DNS inclus.
- **Pourquoi jamais l'IP du VPS pour envoyer** → IP datacenter = blacklist = spam. On envoie via les boîtes du fournisseur (réputation propre).
- **Pourquoi `X-Internal-Key`** → c'est le mot de passe de l'endpoint scan interne de StoreMD. Sans la bonne clé : 401.
- **Pourquoi les logs sont agrégés** → on ne met jamais d'email de prospect ni d'envoi brut dans Git (volume + RGPD). Le détail nominatif vit dans Supabase (`cold_targets`), le repo ne garde que des résumés.
- **Pourquoi X seul en réseaux au départ** → les autres plateformes exigent une approbation longue ; on les branche au fil de l'eau. L'humain valide toujours avant publication.
- **Pourquoi un cap d'envoi bas au début** → réputation. On monte le volume seulement si bounce/plaintes restent verts.

---

## RÉPARTITION (rappel)

La division en 2 lots est **temporelle** (Lot 1 maintenant, Lot 2 après), pas personnelle. **On exécute chaque tâche à deux**, on coche ensemble, on clarifie tout pourquoi qui n'est pas clair. Objectif : à la fin, **les deux** comprennent toute la machine — pas la moitié chacun.
