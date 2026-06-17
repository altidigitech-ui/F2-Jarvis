# 04 — API RÉSEAUX (publication auto) — vérifié 2026

> Faisable en auto sur les 4 plateformes via **API officielles**. Le coût n'est pas l'argent (les API sont gratuites, sauf X en pennies) — c'est le **délai d'approbation**, différent par plateforme.
> ⚠️ Les endpoints/versions exacts changent souvent → **à reconfirmer au build** contre la doc officielle. Ce fichier donne la faisabilité, les prérequis et les pièges, pas le code figé.

---

## Vue d'ensemble (du plus simple au plus dur)

| Plateforme | Auto possible | Délai d'approbation | Piège principal |
|---|---|---|---|
| **X/Twitter** | ✅ oui | rapide (heures-jours) | quasi aucun |
| **Instagram / Facebook** | ✅ oui | **2-4 sem** (app review) | compte Business obligatoire ; Creator non supporté pour publier |
| **TikTok** | ✅ oui | **2-6 sem** (audit) | **sans audit, tous les posts restent en PRIVÉ** + AI-labeling obligatoire |
| **LinkedIn** | ✅ profil perso / ❌ page dure | jours (perso) à lourd (page) | la page entreprise exige le statut Partenaire LinkedIn |

**Conséquence :** lancer **toutes** les demandes en J0 (elles tournent en parallèle), **démarrer par X** (rapide), brancher les autres au fil des approbations.

---

## X / Twitter — le plus simple

- Compte développeur. Free tier en **écriture ~1 500 posts/mois** (largement assez pour 1/jour) ; au-delà, pay-per-use ~**$0,01/post**.
- Setup rapide (heures-jours), pas d'audit lourd.
- **Verdict :** commence ici. C'est le premier canal à brancher.

---

## Instagram / Facebook (Meta Graph API)

- Publication **gratuite** (Meta ne facture pas l'API), mais prérequis stricts : compte Facebook Business + Page FB liée + compte Instagram Professionnel + app développeur Meta + permission `instagram_content_publish` approuvée ; publication en 2 étapes (créer un container média, puis publier).
- L'app review prend 2-4 semaines par soumission (process complet souvent 4-6 semaines, review incluse).
- Avant approbation, l'accès est limité à 25 utilisateurs de test (dev mode).
- **Piège :** la publication de Reels via API ne marche qu'avec un compte Business ; les comptes Creator ne sont pas supportés pour la publication de contenu via l'API.
- Limite : 25 posts publiés par 24 h par compte ; Reels et Stories comptent dans le même quota (assez pour 1/jour).
- **Verdict :** faisable, gratuit, mais compte **Business** (pas Creator) + review 2-4 sem.

---

## TikTok (Content Posting API)

- API officielle, seul chemin auto supporté. Mode **Direct Post** (publie directement) ou Draft. Flow : query creator info → `POST /v2/post/publish/video/init/` → poll `/status/fetch/` jusqu'à `PUBLISH_COMPLETE`.
- **Le gros piège :** pour utiliser Direct Post, l'app doit être autorisée pour le scope `video.publish` ; tout contenu posté par un client non audité est restreint en visibilité privée ; il faut passer un audit pour lever cette restriction. Tant que l'audit n'est pas passé, chaque post créé par l'app est en privé.
- La review prend typiquement 2-6 semaines ; TikTok est strict, les apps sans cas d'usage clair et documenté sont rejetées.
- ⚠️ **2026 :** l'API supporte la vidéo native 1080p, les carrousels photo, et impose le label AI pour le contenu synthétique → **tes vidéos générées par IA doivent être déclarées** (AI-labeling), sinon non-conformité.
- **Verdict :** faisable mais le plus contraignant : audit obligatoire avant tout post public + AI-label.

---

## LinkedIn

Deux chemins très différents :
- **Profil perso** (le faisable) : scope `w_member_social`, app vérifiée avec le produit "Share on LinkedIn", ~100 appels/jour/membre ; tokens expirent à 60 j (refresh 365 j). Accessible à un solo founder qui poste en son nom.
- **Page entreprise** (le dur) : le Community Management API (qui inclut la publication) est un produit restreint nécessitant une candidature via le portail développeur et une approbation. L'accès officiel exige d'être approuvé Partenaire LinkedIn ; sans ce statut, pas d'accès API légitime — c'est réservé aux entreprises bâtissant des intégrations, pas un outil self-serve. Deux paliers : Development Tier (volume limité), puis Standard Tier nécessitant un screencast démontrant chaque cas d'usage.
- Pas de scheduling natif → à construire via cron.
- **Verdict :** viser le **profil perso** au départ. La page entreprise = approbation lourde, à reporter.

---

## ALTERNATIVE si les délais d'audit bloquent (à noter, pas imposé)

Des API unifiées tierces (Postproxy, Zernio, PostPeer) ont **déjà passé les audits** (notamment celui de TikTok) et exposent **un seul endpoint multi-plateformes**. Tu sautes les délais d'audit contre un **coût mensuel**. C'est le trade-off : faire les approbations toi-même (gratuit, lent) **vs** API unifiée (payant, rapide). À évaluer si l'audit TikTok ou l'approbation Meta deviennent bloquants.

---

## À FAIRE AU BUILD (Phase 6)

- Reconfirmer les endpoints/versions du jour (Meta change de version ~v21 ; header `LinkedIn-Version` en YYYYMM ; endpoints TikTok). **Ne pas coder sur ce fichier sans revérifier la doc officielle.**
- Implémenter le **refresh de tokens** (Meta, LinkedIn 60j, TikTok).
- Respecter l'**AI-labeling** (TikTok + Meta) sur le contenu généré.

## RÉCAP COÛT

Les API sont **gratuites** (X en pennies). Le coût réel = **temps d'approbation**, pas argent. Budget machine inchangé (~$30-40/mois) **sauf** si tu choisis une API unifiée pour sauter les audits → +coût mensuel à ce moment-là.
