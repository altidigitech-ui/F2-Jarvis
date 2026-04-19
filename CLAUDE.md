# FoundryTwo — Repo opérationnel unifié

> Instructions permanentes pour Claude Code. Fusion des anciens repos FT (brand building) et CDV (distribution terrain) en un repo unique.
> Dernière mise à jour : 19 avril 2026

---

## §0 — RÈGLE CRITIQUE : ANTI-DÉTECTION IA

**PRIME SUR TOUT LE RESTE.** Voir `ANTI-IA.md` à la racine — source de vérité complète.

Résumé applicable à tout contenu généré par Claude (R, F, F2) :

1. Em-dash (—) interdit dans les posts/replies/commentaires.
2. Structure "Not X — it's Y" interdite (et toutes ses variantes).
3. Pas de listes numérotées ni de markdown dans les commentaires publics.
4. Varier la structure de phrase (longueurs, ouvertures, registre).
5. Self-check obligatoire avant publication : si un passage pourrait sortir d'un détecteur IA (GPTZero, ZeroGPT, Originality), le réécrire.

Un ban Reddit/LinkedIn/Facebook = compte grillé = semaines de travail perdues.

---

## §1 — Ce repo

**FoundryTwo** est le repo opérationnel unifié du studio. Il fusionne l'ancien repo brand building (Twitter, LinkedIn, IndieHackers, Product Hunt) et l'ancien repo distribution terrain (Reddit, Facebook, specs produits). Le pivot stratégique du 03/04/2026 a aligné les deux sur une méthode **distribution-first**. Ils vivent maintenant dans un seul repo.

**Utilisateurs :** R (Romain, Growth, full-time), F (Fabrice, CTO/builder, full-time), Claude Code (assistant). Le studio produit 3–4 SaaS/mois répartis sur 3 verticals (e-commerce, agences/freelancers, content creators).

**Contenu :** documentation opérationnelle en .md — pas de code. Navigation complète dans `README.md`. Arborescence ASCII dans `ARCH.md`.

---

## §2 — Méthode

```
COMMUNAUTÉ → DOULEUR → VALIDATION (10 signups/48h) → BUILD → DISTRIBUTION (VOLUME × CONSTANCE) → REPEAT
```

---

## §3 — Principes fondamentaux

1. **Complexité = moat.** Ne JAMAIS filtrer par complexité technique.
2. **Distribution-first.** Jamais de build sans validation communauté (10+ signups en 48h).
3. **Volume × Constance non-négociable.** R : 30 interactions/jour. F : 30/jour.
4. **Problèmes à 10K$/an minimum.** Le pricing reflète la douleur, pas la feature.
5. **Cible NON-dev uniquement.** Jamais de produit pour des codeurs.
6. **Chaque SaaS = un AGENT**, pas un outil. LLM + webhooks + notifications push. PWA sur tout.

---

## §4 — Structure du repo

```
FoundryTwo/
├── CLAUDE.md                 ← CE FICHIER
├── README.md                 ← Navigation
├── ARCH.md                   ← Arbre ASCII généré
├── ANTI-IA.md                ← Règle #0 (prime sur tout)
├── VISUELS.md                ← Algo visuel
│
├── strategie/                ← Source de vérité stratégique (CONTEXT, PLAYBOOK-DISTRIBUTION, WARMING-FARMING, verticals/)
├── produits/                 ← Source de vérité produits (STATUS, MUTATIONS, NOUVEAUX, PRINCIPES-ANTI-CONCURRENTS)
├── marketing/                ← Marketing macro (funnel, pipeline)
├── growth-marketing/         ← Algos + context par plateforme (twitter, linkedin, ih, ph, tiktok) — pas de sous-dossier par compte
├── distribution/             ← Règles communes de distribution terrain + PLAYBOOK_DISTRI_3_VERTICAL
│
├── f2/                       ← Compte studio @foundrytwo (R le gère) — {twitter,linkedin,ih,ph,tiktok,engagement,publication,archives}
├── romain/                   ← R — {twitter,linkedin,reddit,facebook,ph,cold,engagement,publication,tracking,archives,semaine-*}
├── fabrice/                  ← F — {twitter,linkedin,reddit,facebook,ph,cold,engagement,publication,tracking,archives,semaine-*}
│
├── saas/                     ← Contexte produit par SaaS (référence produits/ pour les détails)
├── la-toile/                 ← Architecture de visibilité (Altistone INVISIBLE en public)
├── asset-brand/              ← Identité de marque
├── tracking/                 ← Dashboard hebdo, decisions-log, UTM, Growth-Tracker.xlsx
└── archives/                 ← Plan-hebdo et progress-semaine archivés
```

---

## §5 — Sources de vérité

| Fichier | Rôle |
|---------|------|
| `strategie/CONTEXT.md` | Stratégie globale |
| `produits/STATUS.md` | Portefeuille produits (features, mutations, pricing) |
| `ANTI-IA.md` | Règle #0 anti-détection |
| `VISUELS.md` | Algorithme visuel |
| `f2/context.md`, `romain/VOIX.md`, `fabrice/VOIX.md` | Identité par compte |

---

## §6 — Règles transversales

1. **Héritage strict (no-duplication).** Chaque fichier hérite de son parent. Ne JAMAIS dupliquer le contenu du parent dans l'enfant. En-tête obligatoire : `Hérite de : [parent]/context.md` + `Ce fichier contient : [ajouts uniquement]`.
2. **Langue.** Documents internes en français. Rédaction publique (posts, replies, cold outreach) en anglais. Marché cible US/EU.
3. **Validation obligatoire.** Aucun fichier créé/modifié/supprimé sans "validé", "go", ou "ok" explicite.
4. **Volume × Constance.** R : 30 interactions/jour + 10 cold outreach/jour + 7 posts/sem. F : 30 interactions/jour + 10 cold outreach/jour + 5 posts/sem. Non-négociable.
5. **Cible NON-dev.** Aucun produit pour codeurs. Le build in public peut exposer le code (angle F), mais le produit cible un non-dev.
6. **Zéro donnée inventée.** Pas de "many users", "great results", "impressive growth". Exemples marqués, templates avec placeholders.
7. **Voix séparées.** R, F, F2 et Produits ont chacun leur vocabulaire exclusif — ne jamais mélanger. Détails dans `romain/VOIX.md`, `fabrice/VOIX.md`, `f2/context.md`.
8. **Règle TOILE.** Altistone/la toile restent invisibles en public. Aucune mention dans les posts, replies, cold, ou docs publics.
9. **Synchronisation canaux.** Brand (Twitter, LinkedIn, IH, PH) et distribution (Reddit, Facebook) doivent rester cohérents pour une même personne — même ton, mêmes angles, seuls les formats changent.

---

## §7 — Quand R ou F ouvre ce repo

1. Regarder la date du jour.
2. Calculer le jour du plan (J1 = 06/04/2026).
3. Ouvrir `romain/` ou `fabrice/` selon qui parle.
4. Lire `plan-30-jours.md` + le tracking de la veille.
5. Choisir le canal (twitter / linkedin / reddit / facebook / ph) selon la journée.
6. Dire exactement quoi faire MAINTENANT.

---

## §8 — Interdictions

1. Pas de duplication parent-enfant.
2. Pas de modification sans validation explicite.
3. Pas de données inventées.
4. Pas de mélange de voix (R ≠ F ≠ F2 ≠ Produits).
5. Pas de cible dev dans le contenu produit.
6. Pas de contenu qui échoue le check `ANTI-IA.md`.
7. Pas de référence à "l'autre repo", "repo FT", "repo CDV", "ce repo fonctionne en tandem" — le repo est unifié.
8. Pas de mention d'Altistone ou de la toile en public.

---

## §9 — Owner

- **Studio :** FoundryTwo
- **Repo :** github.com/altidigitech-ui/FoundryTwo (à confirmer)
- **Fondateurs :** Romain Delgado (R) + Fabrice Gangi (F)
