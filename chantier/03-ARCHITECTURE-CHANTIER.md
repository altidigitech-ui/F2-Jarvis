# CHANTIER F2-JARVIS — DOCUMENT 3 : ARCHITECTURE CIBLE

> La nouvelle structure du repo après le chantier : les fichiers à créer, à modifier, à supprimer,
> et l'arbre des zones concernées. Cet arbre se précisera étape par étape (certains noms exacts seront
> arrêtés au moment de construire). Légende : [NEW] à créer · [MOD] à modifier · [DEL] à supprimer · [KEEP] inchangé.

---

## 1. PRINCIPE DE RANGEMENT

On garde la logique existante du repo :
- `backend/jarvis/src/` = le code (le vrai cerveau de Jarvis).
- `marketing/` = le quoi et le comment de la distribution (templates, recherche, publication).
- `tracking/` = le suivi (logs, métriques, décisions, et désormais le suivi du chantier).
- `romain/` et `fabrice/` = les fichiers propres à chaque persona (cold, engagement, publication).
- `brain/` et `archives/` = la mémoire. INTOUCHABLE.

On ajoute un seul nouveau dossier de pilotage du chantier : `chantier/` (peut aussi vivre sous `tracking/`,
à trancher — voir note en bas).

---

## 2. FICHIERS À CRÉER [NEW]

### Pilotage du chantier
- `tracking/CHANTIER.md` — fichier de suivi unique (contexte verrouillé, plan, questions ouvertes, journal horodaté).

### Cold mail (étape 2)
Décision : PAS de templates figés (un mail générique = corbeille). Les 4 mails sont GÉNÉRÉS et personnalisés par boutique via le SDK (extension du J0 actuel). À faire :
- **[MOD, repo Jarvis]** backend/jarvis/src/lib/cold/jobs.ts — jobSequenceTick : remplacer la string de relance générique par une génération personnalisée par touche (J3/J7/J15) avec injection du code ; composeBody (J0) reste génératif, on y ajoute l'offre.
- **[NEW, repo Jarvis]** migration supabase-migrations/00X_cold_targets_offers.sql — colonne jsonb offers sur cold_targets (code J0/J3/J7 + code J15 + dates d'expiration).
- **[NEW, repo Jarvis]** client coupon dans backend/jarvis/src/lib/cold/ (calqué sur storemd.ts) appelant la route StoreMD.
- **[NEW, repo StoreMD — HORS PÉRIMÈTRE]** POST /api/v1/internal/create-coupon dans backend/app/api/routes/internal.py (auth X-Internal-Key via require_internal_key, à ajouter dans PUBLIC_PATHS de api/middleware/auth.py). Crée coupon Stripe percent_off/once + promotion code max_redemptions:1 + expires_at via services/stripe_billing.py. Renvoie { code, expires_at }. Réutilise INTERNAL_SCAN_KEY.

### Cold DM (étapes 3 et 4)
- Fichier(s) de DM prêts générés automatiquement à J23 — chemin exact à arrêter à l'étape 3
  (probablement sous `marketing/saas-app-shopify/storemd/cold/dm-prets/` ou par persona).
  Contenu : pour chaque boutique, un message par réseau, prêt à copier-coller, avec le store, le site, les réseaux.

### Batch mensuel (étape 4)
- `marketing/contenu/batch-mois/batch-template-mensuel.md` — le mode d'emploi du batch mensuel
  (équivalent du template hebdo actuel, adapté au mois).
- Le batch mensuel produit ira dans `marketing/contenu/batch-mois/batch-mois-{AAAA-MM}.md` (nommage par mois, à confirmer).

### Documentation (étape 7)
- Mises à jour, pas de création nouvelle obligatoire ici (voir section 3).

---

## 3. FICHIERS À MODIFIER [MOD]

### Code backend — cold
- `backend/jarvis/src/lib/cold/scraper.ts` — récupérer les réseaux (en plus de l'email) et les enregistrer.
- `backend/jarvis/src/lib/cold/apify.ts` — lire les contacts réseaux dans la réponse Apify (aujourd'hui seul l'email est lu).
- `backend/jarvis/src/lib/cold/types.ts` — ajouter les champs réseaux dans la fiche d'une boutique.
- `backend/jarvis/src/lib/cold/jobs.ts` — relances avec vrais templates par étape (au lieu de la string générique).
- `backend/jarvis/src/lib/cold/sequence.ts` — base de calcul du déclencheur cold DM à J23.
- `backend/jarvis/src/server.ts` — crons : 2 passages de scan/jour aux bonnes heures + cron cold DM (J23) + cron batch mensuel + alerte métriques.

### Code backend — batch et métriques
- `backend/jarvis/src/lib/batch/` (types, jobs, sources, dispatch) — adapter du hebdo au mensuel.
- `backend/jarvis/src/lib/batch-number.ts` — passer de la logique "numéro de semaine" à "mois".
- `backend/jarvis/src/routes/batch.ts` — critères et statut adaptés au mensuel.
- `backend/jarvis/src/routes/context.ts` — compteurs et planning du jour adaptés (nouveau modèle cold DM + mensuel).

### Code backend — Chrome et logs
- `backend/jarvis/src/routes/prompts.ts` — retirer "chrome" de la liste des outils.
- `backend/jarvis/src/lib/markdown.ts` — passer les logs de date-seule à date+heure (chantier 10).
- `backend/jarvis/src/lib/cold/cold-log.ts` — date+heure dans les logs cold.

### Code backend — outils Jarvis
- `backend/jarvis/src/lib/jarvis-tools.ts` — nouveaux outils si besoin (ex. voir les DM prêts, fournir les métriques).
- `backend/jarvis/src/routes/chat.ts` — adapter les patterns et le système de commandes.

### Frontend
- `ui/jarvis/components/PersonaLayout.tsx` — compteurs, planning, boutons adaptés.
- `ui/jarvis/components/BatchCard.tsx` — passage mensuel + alerte 2 jours avant.
- `ui/jarvis/components/PromptsModal.tsx` — retirer Chrome.
- `ui/jarvis/components/` (nouveau composant) — barre de commandes + affichage des DM prêts.

### Documentation et règles
- `BIBLE.md` — §1 (batch) et §4 (volume cold) réécrits pour le nouveau modèle.
- `CLAUDE.md` — structure et workflow à jour.
- `README.md` — navigation à jour.
- `strategie/CONTEXT.md` — volumes cold et cadence batch à jour.
- `marketing/saas-app-shopify/storemd/context.md` — volumes cold et règles à jour.
- `.claude/commands/batch.md` — commande batch adaptée au mensuel.
- Les fichiers de contexte qui mentionnent Chrome (à lister précisément par l'audit de l'étape 1).

---

## 4. FICHIERS / DOSSIERS À SUPPRIMER [DEL]

> Liste de départ. L'audit de l'étape 1 produira la liste exacte et exhaustive avant toute suppression.

- `marketing/saas-app-shopify/recherche/cold/chrome/` (tout le sous-dossier : facebook, instagram, linkedin, tiktok).
- `marketing/saas-app-shopify/recherche/engagement/ph/prompt-chrome.md`.
- `marketing/saas-app-shopify/recherche/capacite-recherche-claude-chrome.md`.
- `marketing/saas-app-shopify/recherche/strategie-recherche-social.md` (entièrement basé sur Claude Chrome — à confirmer à l'audit).

À NE PAS supprimer : `marketing/saas-app-shopify/recherche/cold/grok/` (Grok conservé).

---

## 5. ZONES INTOUCHABLES [KEEP]

- `brain/mempalace/`, `brain/ouroboros/`, `brain/mem0/` — mémoire de Jarvis.
- `archives/` — historique.
- Tout ce qui concerne Grok.
- Le module produit "Browser Automation" de StoreMD (c'est une feature de l'app, pas de la recherche Chrome).

---

## 6. ARBRE DES ZONES CONCERNÉES (cible)

```
F2-Jarvis/
├── BIBLE.md                                  [MOD] §1 batch mensuel, §4 volume cold
├── CLAUDE.md                                 [MOD] structure + workflow
├── README.md                                 [MOD] navigation
├── ARCH.md                                   [MOD] arbre régénéré en fin de chantier
│
├── backend/jarvis/src/
│   ├── server.ts                             [MOD] crons : scan x2/j, cold DM J23, batch mensuel, alerte métriques
│   ├── routes/
│   │   ├── batch.ts                          [MOD] statut/critères mensuels
│   │   ├── context.ts                        [MOD] compteurs + planning adaptés
│   │   ├── chat.ts                           [MOD] commandes + patterns
│   │   └── prompts.ts                        [MOD] retrait "chrome"
│   └── lib/
│       ├── batch/                            [MOD] hebdo → mensuel
│       ├── batch-number.ts                   [MOD] semaine → mois
│       ├── markdown.ts                       [MOD] date → date+heure
│       ├── jarvis-tools.ts                   [MOD] nouveaux outils (DM prêts, métriques)
│       └── cold/
│           ├── apify.ts                      [MOD] lire les réseaux
│           ├── scraper.ts                    [MOD] enregistrer email+site+réseaux
│           ├── types.ts                      [MOD] champs réseaux
│           ├── jobs.ts                       [MOD] relances templatées
│           ├── sequence.ts                   [MOD] base déclencheur J23
│           └── cold-log.ts                   [MOD] date+heure
│
├── ui/jarvis/components/
│   ├── PersonaLayout.tsx                     [MOD] compteurs/planning/boutons
│   ├── BatchCard.tsx                         [MOD] mensuel + alerte J-2
│   ├── PromptsModal.tsx                      [MOD] retrait Chrome
│   └── CommandBar.tsx                        [NEW] barre de commandes + DM prêts (nom à confirmer)
│
├── marketing/
│   ├── contenu/
│   │   ├── batch-semaine/                    [KEEP] (archivé en fin de chantier)
│   │   └── batch-mois/                       [NEW] template + batchs mensuels
│   │       ├── batch-template-mensuel.md     [NEW]
│   │       └── batch-mois-AAAA-MM.md         [NEW] (généré par cron)
│   └── saas-app-shopify/
│       ├── recherche/
│       │   ├── cold/
│       │   │   ├── chrome/                   [DEL] tout le sous-dossier
│       │   │   └── grok/                     [KEEP]
│       │   ├── engagement/ph/prompt-chrome.md            [DEL]
│       │   ├── capacite-recherche-claude-chrome.md       [DEL]
│       │   └── strategie-recherche-social.md             [DEL] (à confirmer)
│       └── storemd/cold/
│           ├── email-templates.md            [NEW] J0/J3/J7/J15 + offre
│           ├── cold-templates.md             [KEEP] (DM sociaux, déjà existant)
│           └── dm-prets/                     [NEW] DM générés à J23 (structure à confirmer étape 3)
│
├── tracking/
│   ├── CHANTIER.md                           [NEW] suivi unique du chantier
│   └── metrics/                              [MOD] récupération mensuelle (admin StoreMD, foundry-two, réseaux)
│
├── brain/                                    [KEEP] INTOUCHABLE (mémoire)
└── archives/                                 [KEEP] INTOUCHABLE (historique)
```

---

## 7. NOTE À TRANCHER

- **Emplacement du fichier de suivi** : `tracking/CHANTIER.md` (proposé, cohérent avec le dossier de suivi existant).
  Si tu préfères un dossier dédié `chantier/`, on le met là. À décider avant l'étape 1.
- **Nommage du batch mensuel** : `batch-mois-AAAA-MM.md` (ex. `batch-mois-2026-07.md`). À confirmer.
- **Chemin exact des DM prêts** : arrêté à l'étape 3, une fois l'audit fait.

Ces points ne bloquent pas le démarrage (étape 1 = suppression Chrome). On les fige au fil de l'eau.
