# La Machine F2 — Acquisition Autonome StoreMD — CONTEXT

> **Le POURQUOI.** Claude Code + OpenClaw lisent ce fichier avant d'exécuter `plan.md`.
> **Version :** lean, auto-hébergée sur 1 VPS, sending via infra cold dédiée. Coût ~30-40$/mois.
> **Emplacement repo cible :** `marketing/saas-app-shopify/storemd/machine/`

---

## OBJECTIF

Une machine **autonome** qui vend StoreMD aux merchants Shopify, hébergée sur **un seul VPS**. Deux moteurs :

1. **Cold email** — trouve des boutiques Shopify, StoreMD les scanne, envoie le score + 3 problèmes, relance.
2. **Publication réseaux** — génère et publie le contenu quotidien (TikTok/IG/FB/X/LinkedIn).

Humain = **valide**, ne fait pas. Le build est fait par Claude Code + OpenClaw.

---

## PRINCIPE DE COÛT : on paie l'identité d'envoi, pas le logiciel

Le logiciel (séquenceur, scraper, orchestration) = open-source / code maison, **0$**. La seule chose qu'on paie : des **boîtes d'envoi conformes au cold**.

**Point vérifié et non négociable :** on n'envoie PAS via une boîte mail grand public. Ce type d'email **interdit le cold** et suspend les comptes (vérifié). On n'envoie PAS non plus depuis l'IP du VPS (datacenter, blacklist). On envoie via un **fournisseur d'infra cold dédiée** (Maildoso / Mailforge / Zapmail) : ~2-3$/boîte, IP + warmup + monitoring + DNS configurés pour le cold. C'est ça qui atterrit en inbox sans se faire bannir.

---

## LE MOAT — scan-first

L'email ne pitche pas. Il ouvre sur le **score réel** de la boutique :
> Objet : `yourstore.com — 64/100`
> Corps : 3 findings concrets + 1 proposition.

C'est StoreMD qui génère la perso, à l'échelle. Reply rate ~3% (générique) → 5-8% (scan-first).

---

## DÉCISIONS STRUCTURANTES

1. **Tout sur 1 VPS** (~5-8$) : Jarvis + OpenClaw + scraper + séquenceur. Remplace Railway.
2. **Boîtes d'envoi = fournisseur d'infra cold** (Maildoso ~2-3$/boîte, ~10 boîtes, warmup + DNS + monitoring inclus). Sur `leakdetector.tech` (déjà possédé) + domaines fournis par le provider si besoin. **Pas de boîte mail grand public** (cold interdit).
3. **Séquenceur = Jarvis lui-même.** Pas de SaaS d'envoi. Jarvis envoie via **SMTP** (nodemailer) à travers les boîtes du provider et lit les réponses via **IMAP** (imapflow). Rotation + séquence dans Jarvis ; warmup géré par le provider. 0$ de logiciel.
4. **Scraping = OpenClaw** (browser) pour trouver boutiques + emails. 0$. Remplace StoreCensus/Hunter.
5. **Compose = Claude API Haiku** (~2$/mois).
6. **Marché US/UK/AU** (légal opt-out + marché primaire). EU/FR exclu au départ.
7. **Publication réseaux via API officielles** (faisabilité + pièges par plateforme vérifiés → `04-RESEAUX-API.md` ; endpoints exacts à reconfirmer au build). Gratuit, pas de ban à 1/jour. Généré + validé par toi avant publication.

---

## LES DEUX PIPELINES (conceptuel)

**Cold email :** SOURCE (OpenClaw) → QUALIFY (Jarvis) → ENRICH (email finder + verify) → SCAN (StoreMD) → COMPOSE (Claude Haiku) → PUSH (Jarvis envoie via les boîtes du provider) → LISTEN (réponse classée → funnel).

**Réseaux :** PLAN (calendrier) → GENERATE (Claude + Higgsfield/Canva) → VALIDATE (toi) → PUBLISH (API officielles).

Détail technique → `plan.md`. Maillon faible (scraping) → `01-SCRAPING.md`.

---

## CE QU'ON RÉUTILISE / CONSTRUIT / PAIE

**Réutilise :** StoreMD (scan, `preview_scans`) ; Jarvis (BullMQ + Supabase + Claude) ; OpenClaw ; `pipeline-conversion.md` ; Higgsfield/Canva.

**Construit (Claude Code + OpenClaw) :** table `cold_targets`, les jobs des 2 pipelines, le séquenceur intégré (nodemailer/imapflow), le scraper, le webhook réponses, les garde-fous.

**Paie :** VPS (~5-8$) + boîtes infra cold (~20-30$ pour ~10 boîtes) + Claude Haiku (~2$). **Total ~30-40$/mois.**

---

## CONTRAINTES NON NÉGOCIABLES

- **Jamais d'envoi depuis l'IP du VPS**, ni via une boîte mail grand public (cold interdit → suspension).
- **Suppression list permanente** (désinscriptions + bounces), jamais recontactée.
- **Garde-fous :** bounce < 2%, plaintes < 0,3% → pause auto + stop sourcing.
- **Dédup** : jamais cibler une boutique déjà dans `cold_targets`, le funnel, ou cliente StoreMD.
- **Drop** des adresses role (info@/support@) à l'enrichissement.
- **Réseaux :** publication validée par l'humain. Pas de DM auto en masse (ban). 1 post/jour/canal max.

---

## DÉFINITION DU SUCCÈS

- Machine autonome, ~$30-40/mois, 50 emails/jour + publication quotidienne, humain valide seulement.
- Reply rate cold ≥ 5%.
- Scale : si reply rate tient ≥ 5% sur 4 semaines, on ajoute des boîtes (coût marginal ~2-3$/boîte). La dépense suit la preuve.
