# 02 — SETUP & DÉPENDANCES EXTERNES (hors-code)

> Ce que Claude Code ne peut pas faire seul (achats, comptes, approbations) et ce qui a un **délai** → à lancer en parallèle du build, certaines demandes **dès J0**.

---

## A. VPS (héberge tout)

1. Provisionner Ubuntu 22.04, **4 GB RAM min** (8 GB si browser OpenClaw lourd), NVMe.
2. Installer : Docker, Node 22+, Redis.
3. Déployer Jarvis (`server` + `worker`) + OpenClaw (Docker).
4. Process manager + redémarrage auto + sauvegardes.
5. Migrer l'hébergement de Jarvis ici (remplace Railway, pas en plus).

**Délai :** court (heures).

---

## B. Boîtes d'envoi — fournisseur d'infra cold

> **Pas de boîte mail grand public** : ce type d'email interdit le cold et suspend les comptes (vérifié). On prend un fournisseur dédié au cold.

1. Souscrire **Maildoso** (ou Mailforge/Zapmail), créer **~10 boîtes** sur `leakdetector.tech` (+ domaines du provider si besoin), noms humains réels.
2. Le provider configure **SPF + DKIM + DMARC + warmup** automatiquement (rien à faire à la main sur le DNS si domaine géré par lui ; sinon coller les records fournis dans Porkbun).
3. Récupérer les **creds SMTP + IMAP** de chaque boîte.
4. Cap d'envoi/jour par boîte confirmé en Phase Reco (Tâche C).

**Délai :** court (minutes à heures, setup quasi automatique).

---

## C. API réseaux — LEAD TIME LONG → demander MAINTENANT

Ce ne sont **pas** de simples clés : il y a une **approbation développeur** (jours à semaines). À lancer en parallèle du build, sinon le moteur réseaux attend.

| Plateforme | Ce qu'il faut | Délai typique |
|---|---|---|
| **Meta (IG/FB)** | App Meta + vérification business + permission *content publishing* → review | semaines |
| **TikTok** | Compte dev + app + review Content Posting API | jours-semaines |
| **LinkedIn** | App + accès Marketing/Posts API (approbation) | jours-semaines |
| **X/Twitter** | Compte dev free tier (écriture ~1 500/mois) | rapide (heures-jours) |

**Conséquence :** le moteur réseaux (plan.md Phase 6) ne peut pas démarrer avant ces approbations. **Le cold email (Phases 1-5) n'en dépend pas** → on construit et on lance l'email en premier, les réseaux suivent quand les accès tombent.

---

## D. Clés à rassembler

Toutes les variables listées dans `plan.md` (§ENV) : creds des boîtes du fournisseur (SMTP+IMAP, ~10), `ANTHROPIC_API_KEY`, `STOREMD_PREVIEW_SCAN_URL`, tokens réseaux. Stockées dans l'env du VPS (jamais en dur dans le code).

---

## ORDRE DE LANCEMENT (par lead-time)

1. **Dès J0 (en parallèle) :** demandes d'accès API Meta / TikTok / LinkedIn (les plus lentes).
2. **J0 :** VPS + fournisseur cold (boîtes + DNS + warmup auto).
3. Build cold email pendant ce temps.
4. Moteur réseaux activé quand les approbations arrivent.
