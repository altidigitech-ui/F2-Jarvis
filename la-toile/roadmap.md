# TOILE-ROADMAP.md — Roadmap Chronologique

> Dernière mise à jour : 05 avril 2026
> Version : 4.0 — Pivot distribution-first
> Dépend de : TOILE-CONTEXT.md + TOILE-COORDINATION.md + TOILE-ASSOCIES.md
> Ce fichier répond à : QUAND faire quoi, DANS QUEL ORDRE, et POURQUOI dans cet ordre.

---

## PRINCIPES DE SÉQUENCEMENT

1. On ne crée pas un compte sans que ses liens croisés soient prêts.
2. On ne lance pas de contenu sans que le tracking soit en place.
3. On ne lance pas de produit sans que la capture email soit configurée.
4. On ne publie rien sans que le protocole d'amplification soit en place.
5. Les dépendances sont strictes. On ne saute pas d'étape.

---

## CONTEXTE POST-PIVOT

F et R sont full-time FoundryTwo. Pas de contrainte CDI/intérim. Le planning est flexible et aligné sur les volumes cibles (30 interactions + 10 outreach/jour par personne).

Pipeline : 6 SaaS × 3 verticals. 2 SaaS par mois.

---

## PHASE 0 — FONDATIONS (déjà complétée pour LD, à dupliquer par SaaS)

**Objectif** : tout ce qui doit exister AVANT de créer le moindre compte social pour un nouveau SaaS.

### Checklist par nouveau SaaS (template)

| # | Tâche | Responsable | Durée | Prérequis |
|---|---|---|---|---|
| 0.01 | Acheter le domaine (Porkbun) | F | 10 min | — |
| 0.02 | Configurer DNS → Vercel | F | 15 min | 0.01 |
| 0.03 | Créer landing page | F (deploy) + R (copy + visuels) | 2-4h | 0.02 |
| 0.04 | Installer Plausible/Umami | F | 15 min | 0.03 |
| 0.05 | Configurer Stripe (prix, webhooks) | F | 30 min | — |
| 0.06 | Configurer Brevo (séquence email) | F | 1h | — |
| 0.07 | Connecter signup → Brevo (API/webhook) | F | 30 min | 0.06 |
| 0.08 | Créer liens UTM dans le Google Sheet | F | 30 min | 0.03 |
| 0.09 | Ajouter cross-sell sur les produits existants | F | 30 min | 0.03 |
| 0.10 | Pages /legal (mentions légales, CGV, confidentialité) | F | 30 min | Template existant |
| 0.11 | Bandeau cookies | F | 15 min | — |
| 0.12 | Ajouter formulaire newsletter | F | 15 min | 0.06 |

**R pendant ce temps** : crée le branding (logo, palette, visuels profil), prépare les textes de bio, rédige le copywriting landing page.

---

**CHECKPOINT PHASE 0** (par SaaS) ✅

| Validation | OK ? |
|---|---|
| Landing page live avec analytics + newsletter + legal | ☐ |
| Produit fonctionnel (signup → utilisation → paiement → email Brevo) | ☐ |
| Plausible/Umami actif | ☐ |
| Google Sheet UTM complété | ☐ |
| Brevo : séquence configurée et testée end-to-end | ☐ |
| Cross-sell ajouté sur les produits existants | ☐ |
| Mentions légales + CGV + RGPD + cookies | ☐ |

**Si une case n'est pas cochée → on ne passe pas à la Phase 1.**

---

## PHASE 1A — CRÉATION DES COMPTES SOCIAUX (par SaaS)

### Template par nouveau SaaS

| # | Tâche | Responsable | Durée |
|---|---|---|---|
| 1.01 | Créer Twitter @[produit] | R | 15 min |
| 1.02 | Remplir bio Twitter (bio + avatar + banner + lien UTM) | R | 15 min |
| 1.03 | Premier tweet + épingler ("Built by @foundrytwo") | R | 15 min |
| 1.04 | Créer LinkedIn Company [produit] | R | 30 min |
| 1.05 | Préparer page Product Hunt (ne PAS publier) | R | 30 min |
| 1.06 | 2FA sur les nouveaux comptes | F | 10 min |
| 1.07 | Ajouter logins dans Bitwarden | F | 10 min |
| 1.08 | **VÉRIFICATION CROISÉE** : ouvrir CHAQUE profil, cliquer CHAQUE lien | F + R | 15 min |

---

## PHASE 1B — TEASING PRÉ-LANCEMENT (par SaaS, 3-5 jours)

**Objectif** : personne ne découvre le produit le jour J — ils en ont déjà entendu parler.

**Chacun rédige et publie ses propres posts.** R rédige F2 + R perso. F rédige F perso.

### Template teasing 5 jours

| Jour | F2 (R rédige + publie) | F perso (F rédige + publie) | R perso (R rédige + publie) |
|---|---|---|---|
| J-5 | F2 Twitter teasing #1 : "We've been building something for [cible]. Almost ready." | F LinkedIn : angle technique perso | R LinkedIn : angle marché/problème |
| J-4 | F2 TikTok short teasing (screencast flouté) | F engage sur F2 | R engage sur F |
| J-3 | F2 Twitter teasing #2 : "[problème]. [stat]. We have a fix." + screenshot partiel | F Twitter : tweet technique | R engage sur F2 |
| J-2 | F2 LinkedIn long format storytelling | F LinkedIn : post technique teasing | R LinkedIn : post growth teasing |
| J-1 | F2 Twitter : "Tomorrow." | F : "Demain on lance." | R : "Tomorrow is launch day." |

**Le batch du jour J est CRITIQUE.** Tout doit être prêt : les 10+ posts du jour J, les visuels, les liens UTM, les commentaires #1. Le jour J, on ne rédige RIEN. On exécute.

---

## PHASE 2 — LANCEMENT (template générique par SaaS)

### Jour J — Protocole 24h

| Heure | # | Action | Branche | Qui |
|---|---|---|---|---|
| 7h00 | 2.01 | Vérifier produit live, Stripe, Brevo | — | F |
| 7h30 | 2.02 | F2 Twitter : POST DE LANCEMENT PRINCIPAL | F2 | R |
| | | "[Produit] is live. [Proposition de valeur en 1 phrase]. Try it free." + screenshot + visuel | | |
| 7h35 | 2.03 | F2 Twitter reply : lien UTM | F2 | R |
| 8h00 | 2.04 | F2 LinkedIn : POST LANCEMENT LONG FORMAT | F2 | R |
| 8h01 | 2.05 | F2 LinkedIn commentaire #1 : lien UTM | F2 | R |
| 8h15 | 2.06 | R LinkedIn : "Launch day. [Angle growth/marché]." | R perso | R |
| ~9h-10h | 2.07 | F engage sur TOUT ce qui a été posté le matin | F | F |
| ~10h | 2.08 | F LinkedIn : POST PERSO TECHNIQUE (rédigé par F) | F perso | F |
| ~10h30 | 2.09 | F Twitter : tweet technique | F perso | F |
| ~11h | 2.10 | Produit Twitter : "We're live. [CTA]" | Produit | F ou R |
| ~12h | 2.11 | F + R répondent à TOUS les commentaires | Tous | F + R |
| ~14h | 2.12 | ALTI LinkedIn : repost F2 LinkedIn | ALTI | R |
| ~15h | 2.13 | F2 Twitter : résultats mi-journée ("[X] signups in the first hours") | F2 | R |
| ~17h | 2.14 | F2 TikTok : SHORT DÉMO 30s | F2 | R |
| ~18h | 2.15 | F2 Twitter : THREAD "HOW WE BUILT IT" (5-7 tweets) | F2 | R |
| ~18h15 | 2.16 | F engage sur le thread | F | F |
| ~19h | 2.17 | Product Hunt launch (si prêt) | F2 | R |
| ~21h | 2.18 | F2 Twitter : récap jour 1 | F2 | R |
| ~21h30 | 2.19 | **DEBRIEF F + R** (15-30 min) | — | F + R |
| | | Qu'est-ce qui a marché ? D'où vient le trafic (UTM) ? Top posts ? Ajuster la suite. | | |

**Note** : les horaires sont indicatifs. Full-time = flexibilité. L'important : la séquence est respectée et les volumes sont atteints.

---

## PHASE 3 — POST-LANCEMENT SEMAINE 1 (par SaaS)

### Template semaine post-lancement

| Jour | F2 (R) | F perso (F) | R perso (R) | Produit |
|---|---|---|---|---|
| J+1 | Premiers retours users | "J+1, under the hood — [X] [unité], voici ce que j'observe." | "Ce qu'on a appris en 24h de lancement" | Tips d'utilisation |
| J+2 | Engage/hot take | F engage | Newsletter Forge Log (récap lancement) | — |
| J+3 | Insight marché | Post technique | — | Changelog |
| J+4 | Social proof (user feedback) | Post technique | Growth angle | User testimonial |
| J+5 | Récap "Week 1" + tease prochain SaaS | Récap technique | Récap growth | — |

### Première réunion hebdomadaire post-lancement

| Activité | Durée |
|---|---|
| Revue semaine 1 complète (métriques, UTM, top contenu, support) | 45 min |
| Décisions | 30 min |
| Planning semaine 2 | 15 min |
| Début batch semaine 2 | 1h+ |

---

## PHASE 4 — INSTALLATION DE LA CADENCE (par vertical, 2-4 semaines)

### Chaque vendredi soir sans exception

1. Revue hebdomadaire (template COORDINATION §12)
2. Décisions
3. Début batch

### Chaque samedi soir sans exception

1. Finaliser le batch
2. Visuels + UTM
3. Newsletter
4. Validation → dossier batch prêt pour la semaine

### Milestones par vertical

| Milestone | Si atteint | Si pas atteint |
|---|---|---|
| 100 signups (3 SaaS combinés) | R rédige post "100 users" pour F2. F rédige son angle. | Analyser UTM. Quel nœud sous-performe ? Ajuster. |
| 5 clients payants (vertical) | R rédige "First revenue" pour F2 | Revoir séquence email upgrade + CTA + pricing. |
| Cadence 100% respectée (tous les posts publiés) | Le système tourne | Identifier les goulots. Qu'est-ce qui prend trop de temps ? Ajuster. |
| Newsletter 50 inscrits | Continuer | Plus de CTA newsletter dans les posts. Lead magnet ? |
| Le dossier batch prend < 3h à produire (ven+sam) | Le système est rodé | Optimiser le workflow. Templates ? IA ? |

---

## PHASE 5 — EXPANSION (vertical par vertical)

**Condition d'entrée** : cadence 100% respectée pendant 2 semaines + le système batch ven/sam est rodé. Si la cadence n'est pas stable → on n'ajoute PAS de canaux. On stabilise.

### Avril — Vertical M1 (E-commerce)

| # | Tâche | Responsable |
|---|---|---|
| 5.01 | Lancer StoreMD (mutation LD) | R (lancement) + F (technique) |
| 5.02 | Lancer ProfitPilot | R (lancement) + F (code) |
| 5.03 | Cross-sell M1 (StoreMD ↔ ProfitPilot) | F |
| 5.05 | Engagement Reddit (r/ecommerce, r/shopify) | R |
| 5.06 | Product Hunt launch StoreMD | R |

### Mai — Vertical M2 (Agencies)

| # | Tâche | Responsable |
|---|---|---|
| 5.07 | Lancer ClientPulse | R (lancement) + F (code) |
| 5.08 | Lancer ProfitPilot | R (lancement) + F (code) |
| 5.09 | Lancer AdAudit | R (lancement) + F (code) |
| 5.10 | Cross-sell M2 | F |
| 5.11 | Engagement Reddit (r/marketing, r/agencies) + IH | R |

### Juin — Vertical M3 (Creators)

| # | Tâche | Responsable |
|---|---|---|
| 5.12 | Lancer CreatorSuite | R (lancement) + F (code) |
| 5.13 | Lancer LeadQuiz | R (lancement) + F (code) |
| 5.14 | Lancer Wildcard | R (lancement) + F (code) |
| 5.15 | Cross-sell M3 | F |
| 5.16 | Engagement Reddit (r/creators, r/contentcreation) | R |

### En parallèle (avril-juin)

| # | Tâche | Responsable |
|---|---|---|
| 5.17 | Lancer YouTube F2 (première vidéo longue, 8-15 min) | R (lead) + F (input) |
| 5.18 | Cadence YouTube : 1 vidéo/semaine | R rédige script + produit |
| 5.19 | Recycler TikTok → YouTube Shorts | R |
| 5.20 | Programme referral v1 | F (code) + R (communication) |
| 5.21 | Lead magnet automatisé | F |
| 5.22 | Créer compte IndieHackers foundrytwo | R |
| 5.23 | Évaluer résultats YouTube + Reddit + IH | F + R (vendredi) |

---

## PHASE 6 — DOMINATION (juillet+)

**Condition d'entrée** : MRR > 1000€ ET cadence stable ET 6 SaaS en prod.

| # | Tâche | Pourquoi |
|---|---|---|
| 6.01 | VSL evergreen (Video Sales Letter) par vertical | Vente automatisée 24/7 |
| 6.02 | Tester ads payantes sur top contenu organique | Budget 50-100€/semaine, ROI mesuré via UTM |
| 6.03 | Programme referral v2 avec dashboard | Gamification, top referrers |
| 6.04 | Évaluer embauche content manager freelance | Si MRR > 5000€ |
| 6.05 | Réexaminer toute la toile (pruner branches mortes) | 3-6 mois de données |
| 6.06 | Préparer le BIG SaaS #1 | Communauté en place, audience prête |
| 6.07 | Cross-sell inter-verticals | StoreMD users → ClientPulse, etc. |

---

## RÉSUMÉ TIMELINE

| Période | Phase | Focus |
|---|---|---|
| Avril S1-S2 | Phase 0-2 — M1 E-com | StoreMD + ProfitPilot |
| Avril S3-S4 | Phase 3-4 — M1 Cadence | Momentum M1 + prépa M2 |
| Mai S1-S2 | Phase 0-2 — M2 Agencies | ClientPulse + ProfitPilot + AdAudit |
| Mai S3-S4 | Phase 3-4 — M2 Cadence | Momentum M2 + prépa M3 |
| Juin S1-S2 | Phase 0-2 — M3 Creators | CreatorSuite + LeadQuiz + Wildcard |
| Juin S3-S4 | Phase 3-4 — M3 Cadence | Momentum M3 |
| Juillet+ | Phase 5-6 — Expansion/Domination | YouTube, ads, BIG SaaS, scaling |

---

## DÉPENDANCES CRITIQUES

| Si ceci n'est pas fait... | ...alors ceci est impossible |
|---|---|
| Landing page live | Profils produit pointent vers un 404 |
| Analytics installé | Pilotage à l'aveugle |
| Google Sheet UTM rempli | Pas de tracking |
| Brevo configuré | Signups sans email = activation morte |
| Profils avec liens | Pas de trafic social → produits |
| Juridique (CGV, RGPD, legal) | Risque légal dès le premier signup |
| Batch contenu fait (ven/sam) | Lundi matin = improvisation = incohérence |
| F a rédigé ses posts perso | F n'a rien à publier en semaine |
| R a rédigé les posts F2 | F2 est silencieux |
| Cross-sell configuré | Chaque produit est une île isolée |
| Le dossier batch est complet samedi soir | Lundi matin = improvisation = incohérence |
| Bitwarden partagé | L'autre n'a pas accès aux comptes |

---

## RÈGLE D'OR

**Ne jamais commencer une phase sans que le checkpoint soit 100% validé.**

**Ne jamais publier un post qui n'a pas été batché et validé.**

**2 SaaS par mois. Pas de pause. Le modèle usine tourne.**

Le premier mois sera plus lent. C'est le prix à payer pour que les 5 mois suivants tournent comme une montre suisse.
