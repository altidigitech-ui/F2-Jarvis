# La Machine F2 — Acquisition Autonome StoreMD — CONTEXT

> **Le POURQUOI.** Claude Code + OpenClaw lisent ce fichier avant d'exécuter `plan.md`.
> **Version :** ultra-lean, 100% open-source, auto-hébergée sur 1 VPS. Coût ~10-12$/mois.
> **Emplacement repo cible :** `marketing/saas-app-shopify/storemd/machine/`

---

## OBJECTIF

Une machine **autonome** qui vend StoreMD aux merchants Shopify, hébergée sur **un seul VPS**, presque entièrement en **open-source**. Deux moteurs :

1. **Cold email** — trouve des boutiques Shopify, StoreMD les scanne, envoie le score + 3 problèmes, relance.
2. **Publication réseaux** — génère et publie le contenu quotidien (TikTok/IG/FB/X/LinkedIn).

Humain = **valide**, ne fait pas. Tout le build est fait par Claude Code + OpenClaw, pas à la main.

---

## PRINCIPE DE COÛT : on ne paie QUE l'identité d'envoi

Le logiciel, ça se code et ça s'open-source. **La seule chose qu'on paie, c'est les boîtes mail** — pas un abonnement SaaS, une *identité d'envoi* que Gmail/Outlook acceptent. C'est le seul coût irréductible, et on le prend au moins cher (Zoho ~1$/boîte).

Ce qu'on **NE paie PAS** (open-source, sur le VPS) :
- séquenceur cold, scraper boutiques, email finder, warmup, orchestration.

Ce qu'on **ne fait JAMAIS** : envoyer depuis l'IP du VPS (serveur mail maison) → IP datacenter neuve, blacklist, spam, 0 vente. Le séquenceur open-source envoie **à travers** les boîtes Zoho (SMTP), c'est ça qui atterrit en inbox.

---

## LE MOAT — scan-first

L'email ne pitche pas. Il ouvre sur le **score réel** de la boutique :
> Objet : `yourstore.com — 64/100`
> Corps : 3 findings concrets + 1 proposition.

C'est StoreMD qui génère la perso, à l'échelle. Reply rate ~3% (générique) → 5-8% (scan-first). Personne d'autre ne peut envoyer ça.

---

## DÉCISIONS STRUCTURANTES

1. **Tout sur 1 VPS** (~5-8$/mois) : Jarvis + OpenClaw + séquenceur open-source + scraper. Remplace Railway, ne s'ajoute pas.
2. **Boîtes d'envoi = Zoho Mail (~1$/boîte) sur `leakdetector.tech`** (domaine âgé que tu possèdes déjà). 2 boîtes pour démarrer. Pas Google ($7), pas de domaine neuf à acheter.
3. **Séquenceur = open-source** (PaulleDemon/Email-automation ou FreeColdMail), auto-hébergé, connecte les boîtes Zoho en SMTP, gère séquences + rotation + détection de réponse. 0$.
4. **Scraping = OpenClaw** (browser automation) pour trouver les boutiques + emails. 0$. Remplace StoreCensus/Hunter.
5. **Compose = Claude API Haiku** (~2$/mois). Modèle léger, suffisant pour des emails courts.
6. **Marché US/UK/AU** (légal opt-out + marché primaire). EU/FR exclu au départ.
7. **Publication réseaux via API officielles** (IG/FB/TikTok/X/LinkedIn) → gratuit, pas de ban à cadence 1/jour. Le contenu est généré + validé par toi avant publication.
8. **Pas d'attente de warmup.** `leakdetector.tech` est âgé (avantage). Boîtes Zoho neuves → on démarre bas (10-15/jour), montée pilotée par les signaux (bounce/plaintes), warmup open-source en fond.

---

## LES DEUX PIPELINES (conceptuel)

**Cold email :** SOURCE (OpenClaw scrape) → QUALIFY (Jarvis) → ENRICH (email finder open-source + verify) → SCAN (StoreMD) → COMPOSE (Claude Haiku) → PUSH (séquenceur open-source via Zoho) → LISTEN (réponse classée → funnel).

**Réseaux :** PLAN (calendrier) → GENERATE (Claude : scripts/captions ; vidéos via Higgsfield/Canva déjà connectés) → VALIDATE (toi, file d'attente) → PUBLISH (API officielles).

Détail technique → `plan.md`.

---

## CE QU'ON RÉUTILISE / CONSTRUIT / PAIE

**Réutilise (déjà là) :** StoreMD (scan, `preview_scans`) ; Jarvis (orchestrateur BullMQ + Supabase + Claude) ; OpenClaw (browser) ; `pipeline-conversion.md` (funnel) ; Higgsfield/Canva (vidéo).

**Construit (Claude Code + OpenClaw, dans Jarvis/VPS) :** table `cold_targets`, les jobs des 2 pipelines, l'intégration du séquenceur open-source, le scraper, le webhook réponses, les garde-fous.

**Paie :** VPS (~5-8$) + 2 boîtes Zoho (~2$) + Claude Haiku (~2$). **Total ~10-12$/mois.**

---

## CONTRAINTES NON NÉGOCIABLES

- **Jamais d'envoi depuis l'IP du VPS.** Toujours via les boîtes Zoho (SMTP).
- **Suppression list permanente** (désinscriptions + bounces), jamais recontactée.
- **Garde-fous :** bounce < 2%, plaintes < 0,3% → pause auto + stop sourcing.
- **Dédup** : jamais cibler une boutique déjà dans `cold_targets`, dans le funnel, ou déjà cliente StoreMD.
- **Drop** des adresses role (info@/support@) à l'enrichissement.
- **Réseaux :** publication validée par l'humain avant envoi. Pas de DM auto en masse (ban). 1 post/jour max par canal.

---

## DÉFINITION DU SUCCÈS

- Machine autonome, ~$11/mois, 50 emails/jour + publication quotidienne, humain valide seulement.
- Reply rate cold ≥ 5%.
- Critère de scale : si reply rate tient ≥ 5% sur 4 semaines, on ajoute des boîtes Zoho (coût marginal ~1$/boîte). La dépense suit la preuve.
