# reco-findings.md — Phase RECO (audit, aucun build)

> Rempli par Claude Code le 2026-06-15. Lecture seule : aucun code écrit.
> Condition de sortie (cf. `00-RECO.md`) : ce fichier validé par Alti AVANT toute Phase 1+ de `plan.md`.
> **Verdict global : GO pour la Phase 1.** Tâche B confirmée via Supabase (scan OK sur URL arbitraire) ; seule la livraison de l'endpoint interne StoreMD (findings détaillés) reste en cours côté StoreMD avant de câbler la Phase 4. A, C, D : GO sous réserves notées.

---

## TÂCHE A — Conventions Jarvis à suivre

Audit de `backend/jarvis/src/`. Le nouveau code (pipeline cold) doit coller à ces patterns, pas en inventer.

### Jobs / queues (BullMQ)
- Déclaration : `backend/jarvis/src/lib/queues.ts` — `new Queue("nom", { connection: getRedis(), defaultJobOptions: { removeOnComplete, removeOnFail, attempts, backoff } })`. 2 queues existent (`ouroboros-cycle`, `mempalace-ingest`). **Convention : déclarer les queues cold ici** (ex. `coldQueue`).
- Connexion Redis : `lib/redis.ts` → `getRedis()`. Toujours passer par lui.
- Enqueue : `queue.add("nomJob", dataObj, opts?)` — ex. `chat.ts:524` (`mempalaceQueue.add("ingest", {...})`), `ouroboros.ts:347` (`add("manual", {}, { priority: 1 })`).
- Récurrent / cron : `queue.upsertJobScheduler("id", { every: ms }, { name })` — `server.ts:118` (ouroboros toutes les 2h). **C'est le mécanisme à réutiliser pour le cron des touches dues (J0/J3/J7/J15), pas un cron parallèle.**
- Worker : `lib/worker.ts` (process Railway séparé). Pattern = `new Worker("nomQueue", async (job) => {...}, { connection: getRedis(), concurrency: 1 })`, un Worker par queue, `job.data` typé inline. concurrency:1 partout → garder pour l'envoi cold (rotation/cap maîtrisés).

### Routes (Express)
- Handler = fonction exportée `(req: Request, res: Response): Promise<void>` dans `src/routes/*.ts`, enregistrée dans `server.ts` (`app.post/get(path, handler)`). Seuls GET/POST sont autorisés (CORS `server.ts:47-51`).
- **Auth : middleware global** (`server.ts:55-64`) — vérifie le header `x-jarvis-auth` == `BACKEND_SHARED_SECRET`. `/health` exempté. **Le webhook/listener réponses : soit on poll en IMAP depuis un job (pas de route entrante nécessaire), soit toute route entrante doit porter le secret.** Le plan part sur poll IMAP → pas de route entrante exposée, c'est le plus simple et conforme.
- Headers autorisés : `Content-Type`, `X-JARVIS-AUTH`, `X-USER-ID`.

### Supabase
- `lib/supabase.ts` → `getSupabase()` : client **service-role** singleton, bypass RLS (le code filtre lui-même). Env requis : `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.
- Accès : `sb.from("table").select/insert/update().eq(...)` (ex. `jarvis-memory.ts:141`, `:177`). C'est le pattern pour lire/écrire `cold_targets`.

### Migrations
- Dossier : **`supabase-migrations/` à la RACINE du repo** (pas sous `backend/jarvis/`). Existant : `001_jarvis_memory.sql`, `002_drop_duplicate_pending_actions_index.sql`.
- Convention : `NNN_description.sql`, SQL pur, en-tête commenté, `create extension if not exists "pgcrypto"`, `create table if not exists`, `gen_random_uuid()`. Appliqué via Supabase SQL editor / CLI (manuel).
- **→ La migration cold sera `003_cold_targets.sql`** (+ `cold_suppression`). Finir par `NOTIFY pgrst, 'reload schema';` (déjà dans le plan).

### Client Claude (compose)
Deux patterns coexistent — **pour COMPOSE, réutiliser le pattern REST direct**, pas l'Agent SDK :
- **REST direct (à réutiliser)** : `fetch("https://api.anthropic.com/v1/messages")`, headers `x-api-key: process.env.ANTHROPIC_API_KEY` + `anthropic-version: 2023-06-01`, `model: "claude-haiku-4-5"`. Exemples : `jarvis-memory.ts:154`, `jarvis-tools.ts:1229`. C'est la convention maison pour la génération one-shot bon marché → parfait pour COMPOSE.
- Agent SDK (`@anthropic-ai/claude-agent-sdk`, `query()`) : `chat.ts`, `ouroboros-cycle.ts` + résolution binaire `lib/claude-binary.ts`. Réservé à l'agentique interactif. **Pas nécessaire pour le compose.**

### Bonus repéré
- `lib/action-executor.ts:281` + `lib/markdown.ts:137` (`appendColdQueue`) : il existe déjà un mécanisme d'écriture de file cold en markdown. À regarder avant de coder la Phase 8 (logging) pour ne pas dupliquer.

---

## TÂCHE B — Contrat scan StoreMD : 🟡 PARTIELLEMENT CONFIRMÉ (via Supabase)

> Mise à jour 2026-06-15 : vérifié directement sur la base StoreMD via Supabase. Le code backend StoreMD reste hors de ce repo, mais le comportement est confirmé en base.

Confirmé :
1. **Appelable sur une `store_url` arbitraire → OUI.** Le scan tourne sur n'importe quelle boutique (testé sur **gymshark**, hors clientèle StoreMD). Pas besoin d'un shop Shopify installé/session pour scanner. ✅ — c'était la question bloquante du RECO, elle est levée.
2. **`preview_scans` ne stocke que `score` + compteurs.** La table ne contient PAS les findings détaillés — juste le score global et des compteurs agrégés.
3. **Les findings détaillés viennent de la RÉPONSE de l'endpoint interne StoreMD** (le payload de l'appel), pas de la table. Cet endpoint interne est **en cours de construction côté StoreMD**.

Conséquences pour le plan :
- La phase SCAN (`plan.md` Phase 4) appelle l'**endpoint interne StoreMD** et lit `{ score, findings[] }` **dans la réponse**. On ne lit PAS les findings depuis `preview_scans` (qui n'en a pas). Le polling de `preview_scans` ne sert au mieux qu'à récupérer le score si l'appel est async.
- `cold_targets.scan_score` ← score (dispo en base + réponse). `cold_targets.scan_findings` (jsonb) ← findings de la **réponse** de l'endpoint interne.

Reste à finaliser (côté StoreMD, non bloquant pour Phase 1) :
- Livraison de l'endpoint interne (URL, auth par clé partagée, sync vs async, schéma exact de `findings[]`). À renseigner dans `STOREMD_PREVIEW_SCAN_URL` + le format attendu, au moment de câbler la Phase 4.

**Verdict : GO pour avancer le data model et le pipeline. La Phase 4 (COMPOSE à partir des findings) attend la livraison de l'endpoint interne StoreMD**, mais le scan de base (score, URL arbitraire) est confirmé fonctionnel.

---

## TÂCHE C — Fournisseur d'envoi cold

**Recommandation : Maildoso (primaire), Mailforge (option budget). Zapmail écarté pour ce design.**

Critère décisif = creds **SMTP + IMAP bruts**, utilisables par du code custom (nodemailer/imapflow), **pas verrouillés** derrière Smartlead/Instantly.

| Provider | SMTP/IMAP exploitable par code | DNS+warmup inclus | Prix/boîte (indicatif) | Verdict |
|---|---|---|---|---|
| **Maildoso** | ✅ boîtes SMTP, creds SMTP+IMAP **exportables en CSV** → directement branchables nodemailer/imapflow | ✅ (SPF/DKIM/DMARC + warmup auto) | ~2-3$ | **Choisi.** Correspond au plan, creds bruts confirmés. |
| **Mailforge** | ✅ custom SMTP sur IP partagée, DNS/SSL auto | ✅ | ~2-3$/mo (2$ annuel) | Option budget valable. IP partagée = risque délivrabilité légèrement supérieur. |
| **Zapmail** | ⚠️ boîtes **Google Workspace**, setup OAuth, **API derrière le tier Pro 299$/mo** | ✅ | ~2,50-6$ + 39$/mo base | **Écarté** : orienté OAuth + outils tiers, pas le SMTP/IMAP custom round-robin du plan. |

**À confirmer au moment de la souscription (action humaine, Phase 0) :**
- Cap d'envoi/jour **par boîte** exact (non documenté publiquement ; norme cold = ~10-30/boîte/jour ; le plan démarre prudemment à 10-15/boîte → cohérent).
- Que les creds livrés sont bien SMTP **et** IMAP (réception) — Maildoso fournit les deux via export CSV.
- Domaine : `leakdetector.tech` (déjà possédé) à pointer/déléguer + domaines provider si besoin.

> Note d'honnêteté : prix/specs issus de recherche web (juin 2026), susceptibles d'évoluer. À reconfirmer sur le compte au moment d'acheter. Pas de creds réels en main aujourd'hui (souscription = action humaine).

---

## TÂCHE D — À lancer en parallèle dès J0 (lead-time long)

Source : `02-SETUP-DEPS.md §C`. Ce sont des **approbations développeur**, pas de simples clés.

| À demander dès J0 | Ce qu'il faut | Délai | Bloque quoi |
|---|---|---|---|
| **Meta (IG/FB)** | App Meta + vérif business + permission *content publishing* → review | **semaines** (le plus lent) | Moteur réseaux IG/FB |
| **TikTok** | Compte dev + app + review Content Posting API (sinon posts privés + AI-label forcé) | jours-semaines | Moteur réseaux TikTok |
| **LinkedIn** | App + accès Posts/Marketing API (page = partenaire requis → viser profil perso) | jours-semaines | Moteur réseaux LinkedIn |
| **X / Twitter** | Compte dev free tier (~1 500 écritures/mois) | rapide (heures-jours) | **Démarrer par X** |

**Découplage clé :** le **cold email (Phases 1-5) ne dépend d'AUCUNE de ces approbations.** On construit et lance le cold en premier ; le moteur réseaux (Phase 6) s'active quand les accès tombent.

Autres dépendances externes (humain, délai court) :
- VPS Ubuntu 22.04, 4-8 GB RAM (J0, heures).
- Souscription provider cold + 10 boîtes (J0, minutes-heures).
- `ANTHROPIC_API_KEY` (déjà utilisé dans Jarvis — réutilisable).
- `STOREMD_PREVIEW_SCAN_URL` → **dépend de la levée du flag Tâche B.**

---

## RÉCAP DÉCISIONS / BLOCAGES

- **A — GO.** Conventions claires, le code cold se greffe sans réinventer (queues, service-role Supabase, migration `003_`, REST Haiku pour compose, poll IMAP plutôt qu'une route entrante).
- **B — 🟡 PARTIELLEMENT CONFIRMÉ (via Supabase).** Scan OK sur URL arbitraire (gymshark testé) ; `preview_scans` = score + compteurs seulement ; findings détaillés = réponse de l'endpoint interne StoreMD (en cours côté StoreMD). Phase 4 attend la livraison de cet endpoint, le reste avance.
- **C — GO sous réserve.** Maildoso retenu ; cap/jour et nature des creds à confirmer à la souscription.
- **D — Action immédiate.** Lancer les demandes Meta/TikTok/LinkedIn dès J0 ; démarrer réseaux par X.

**Aucun build tant que ce fichier n'est pas validé par Alti, et tant que le flag B n'est pas levé pour la Phase SCAN.**

---

### Sources (Tâche C)
- [Maildoso — Outbound Mailboxes for Cold Email](https://maildoso.ai/)
- [Maildoso FAQ : Mailboxes, Domains, Pricing & Setup](https://maildoso.ai/resources/faq)
- [Zapmail vs Mailforge (2026) — InboxKit](https://www.inboxkit.com/learn/zapmail-vs-mailforge)
- [Zapmail Pricing 2026 — ColdEmailKit](https://coldemailkit.com/tools/zapmail)
