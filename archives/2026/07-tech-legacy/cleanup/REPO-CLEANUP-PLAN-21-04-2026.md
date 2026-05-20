# REPO-CLEANUP-PLAN.md

**Date de création :** mardi 21 avril 2026
**Exécuteur :** Claude Code (local, F)
**Validateur humain :** Fabrice Gangi
**Durée estimée :** 4-5h en une session
**Objectif :** rendre le repo F2-Jarvis 100% cohérent et lisible par n'importe quelle IA neuve en 10 minutes.

---

## PRÉAMBULE — LECTURE OBLIGATOIRE AVANT D'EXÉCUTER

### Objectif final

Le repo F2-Jarvis contient DEUX systèmes distincts partageant la même racine :

1. **F2-Jarvis (automatisation / infra)** : app web cockpit (`ui/jarvis/` + `backend/jarvis/`), Claude Code setup (`.claude/`), couche cognitive (`brain/`), budget/kill-switches (`ops/`), patterns techniques, graphify, tracking Jarvis, raw inbox.

2. **FoundryTwo (contenu opérationnel marketing/distribution)** : stratégie (`strategie/`), produits (`produits/`), marketing macro (`marketing/`), algos plateforme (`growth-marketing/`), distribution terrain (`distribution/`), comptes persos et studio (`romain/`, `fabrice/`, `f2/`), contextes SaaS (`saas/`), architecture réseau (`la-toile/`), brand (`asset-brand/`).

Après ce nettoyage, toute IA qui ouvre le repo doit :
- Comprendre l'existence des deux systèmes dès `README.md` racine
- Savoir quels fichiers sont source de vérité (`strategie/CONTEXT.md`, `produits/STATUS.md`, `BIBLE.md`, `ANTI-IA.md`)
- Trouver un portfolio produits cohérent partout (6 SaaS, 3 verticales)
- Ne jamais tomber sur une référence de chemin cassée
- Ne jamais tomber sur du "build-in-public ton journey" dans les bios/squelettes (remplacé par sales-mode results-first)
- Lire `ENTRYPOINT.md` en tout premier si elle débarque à froid

### Garde-fous NON-NÉGOCIABLES

**Claude Code ne doit JAMAIS :**
1. Modifier `BIBLE.md` (intouchable, Fabrice seul édite)
2. Modifier le code source dans `ui/jarvis/app/`, `ui/jarvis/components/`, `ui/jarvis/lib/`, `backend/jarvis/src/` (on documente, on ne recode pas)
3. Supprimer du contenu sans archivage préalable. Règle : un fichier/dossier qui contient du contenu unique doit d'abord être déplacé/fusionné vers `archives/` ou `{persona}/archives/`. Seul le dossier/fichier source VIDÉ (après déplacement de son contenu) peut être supprimé au `rm`. Jamais de suppression brutale.
4. Commiter avant que Fabrice ait validé la session
5. Push sans confirmation humaine explicite
6. Continuer au commit suivant si un commit a échoué ou produit un résultat inattendu

**Claude Code DOIT :**
1. Lire ce plan en entier AVANT la première action
2. Lire aussi `BIBLE.md`, `ANTI-IA.md` et ce CLAUDE.md racine actuel pour contexte
3. Exécuter les 8 commits dans l'ordre strict (1 → 8)
4. Arrêter et demander à Fabrice si une ambiguïté apparaît
5. Après chaque commit : faire un résumé court de ce qui a été modifié avant de passer au suivant
6. Utiliser git pour chaque étape (pas de tout écraser en bloc)

### Portfolio officiel unique (VALABLE POUR TOUT LE REPO)

Toute mention de portfolio doit être alignée sur cette source :

| # | Produit | Vertical | Mois | Statut (21/04/2026) |
|---|---------|----------|------|---------------------|
| 1 | StoreMD | E-commerce | M1 (avril) | ✅ Live (depuis 14/04/2026) |
| 2 | ProfitPilot | E-commerce | M1 (avril) | ⏳ Backlog |
| 3 | ClientPulse | Agences/Freelancers | M2 (mai) | ⏳ Backlog |
| 4 | AdAudit | Agences | M2 (mai) | ⏳ Backlog |
| 5 | CreatorSuite | Creators | M3 (juin) | ⏳ Backlog |
| 6 | LeadQuiz | E-com + Coaches | M3 (juin) | ⏳ Backlog |

**Les 9 anciens produits (Leak Detector, ChargebackDefender, PriceRadar, ReviewPulse, AdWatcher, BriefForge, ContentFlow, InvoiceGuard, DataMerge) sont OBSOLÈTES.** Aucune mention dans le contenu actuel sauf mention historique explicite ("Leak Detector a été muté en StoreMD le 14/04").

**Les 9 produits inventés dans `strategie-linkedin.md` §2.3 (SpeedAudit, InventoryPulse, AdScoreAI, EmailCleanup, ReportFlash, ClipEngine, ThumbnailRank, CaptionDraft) N'EXISTENT PAS.** À supprimer partout.

### Règle "build-in-public" (Option B validée)

Le **sales-mode produit est dominant** partout (bios, taglines, squelettes éditoriaux, cold outreach, replies). Les métriques affichées sont les **résultats StoreMD** (scans, leaks trouvés, data pain), pas le journey studio.

**MAIS** le build-in-public reste **possible sur format dédié et jamais avec faux chiffres** :
- Squelette F2 Vendredi = "Build in Public / Studio Update" : autorisé avec règle stricte BIBLE.md §3
- MRR honest (même $0) affiché sur profils IH/PH studio : OK
- Format "Show IH" pour lancements : OK
- Recap semaine studio factuel : OK

**À SUPPRIMER partout (sauf cas ci-dessus) :**
- "Real numbers, real failures" dans les bios
- "Everything is public: real numbers, real failures, no bullshit"
- "Honest builder journey" comme positionnement principal
- "We're building in public" comme ligne narrative principale des bios

**À REMPLACER par sales-mode + distribution :**
- "6 AI agents for Shopify merchants, agencies, creators. Results in minutes."
- "Finding revenue leaks in Shopify stores. 60-second scans."
- "Distribution-first SaaS studio. 6 AI agents across 3 verticals."

### Ordre d'exécution : 8 COMMITS

Chaque commit est ATOMIQUE. Si un commit échoue ou produit un résultat bizarre, STOP et signaler.

```
Commit 1 → Portfolio unifié (6 SaaS partout)
Commit 2 → Build-in-public → sales-mode dominant
Commit 3 → Références chemins cassés (growth-marketing/{plateforme}/{compte}/...)
Commit 4 → Source de vérité parent unique (strategie/CONTEXT.md)
Commit 5 → TikTok statut clair (suspendu, pipeline vidéo)
Commit 6 → Archives regroupées (semaines 1/2/5 qui traînent → archives/)
Commit 7 → Documentation F2-Jarvis (READMEs ui/jarvis, backend/jarvis, brain, .claude)
Commit 8 → README racine + ENTRYPOINT.md (en DERNIER, pas avant)
```

### Format des directives dans ce plan

Chaque modification suit ce format :

```
FICHIER : chemin/vers/fichier.md
TYPE : [REMPLACE-FICHIER | EDIT-SECTION | DEPLACE | CREE]
RAISON : explication en 1 ligne
-----
[Si EDIT-SECTION]
CHERCHER :
<texte exact à trouver>

REMPLACER PAR :
<texte exact de remplacement>
-----
[Si REMPLACE-FICHIER ou CREE]
CONTENU FINAL :
<contenu complet>
```

---

## DOSSIERS ET FICHIERS INTOUCHABLES (ne jamais modifier dans ce nettoyage)

- `BIBLE.md` (Fabrice seul)
- Tout le code dans `ui/jarvis/app/`, `ui/jarvis/components/`, `ui/jarvis/lib/`, `backend/jarvis/src/`
- Tout dans `brain/ouroboros/` (sandbox Ouroboros)
- Tout dans `brain/mempalace/wings/` et `brain/mempalace/drawers/` (données)
- `ops/budget/history.csv` (données)
- `supabase-migrations/` (migrations DB)
- `graphify-out/` (généré)
- `raw/` (inbox brute)
- `patterns/*.md` SAUF `patterns/README.md` (décisions techniques existantes en lecture seule ici ; le README d'index du dossier sera créé au Commit 7)
- `.claude/hooks/*.sh` (scripts bash)
- `archives/` (déjà archivé, on ajoute mais on ne touche pas à l'existant)
- Tous les fichiers `semaine-*` dans archives existantes

---

# COMMIT 1 — PORTFOLIO UNIFIÉ (6 SaaS partout)

**Objectif :** éradiquer les 3 versions contradictoires du portfolio. Aligner tous les fichiers sur les 6 SaaS officiels (cf. préambule § Portfolio officiel unique).

**Commit message :**
```
cleanup: unify portfolio to 6 SaaS official list across all docs

- Remove 9 legacy products (Leak Detector + 8 others) from f2/twitter/*
- Remove 9 invented products from growth-marketing/strategie/strategie-linkedin.md §2.3
- Remove 8 variants from growth-marketing/strategie/strategie-ih.md §10
- Update produits/STATUS.md: StoreMD ✅ Live (14/04/2026)
- Update all bios/taglines to reference 6 AI agents
- Align asset-brand/ refs
- Update ALL "Dernière mise à jour" to 21/04/2026 in touched files
```

## 1.1 — `produits/STATUS.md`

TYPE : REMPLACE-FICHIER
RAISON : StoreMD est live, update statuts réels.

CONTENU FINAL :
```markdown
# STATUS PRODUITS

Dernière mise à jour : 21/04/2026
Quand F finit un build → mettre à jour ce fichier → R commence la distribution.

| # | Produit | Statut | Mois | Vertical | Features | Modules | Distribué dans |
|---|---------|--------|------|----------|----------|---------|----------------|
| 1 | StoreMD | ✅ Live (14/04/2026) | Mois 1 | E-commerce | 43 | 5 (Health+Listings+Agentic+Compliance+Browser) | r/shopify, Shopify Entrepreneurs FB |
| 2 | ProfitPilot | ⏳ Backlog | Mois 1 | E-commerce | 41 | 4 (Profit+Anti-Fraude+Intelligence+Tarifs) | r/shopify, Shopify Entrepreneurs FB |
| 3 | ClientPulse | ⏳ Backlog | Mois 2 | Agences/Freelancers | 6 modules | 6 | r/digital_marketing, r/freelance |
| 4 | AdAudit | ⏳ Backlog | Mois 2 | Agences | 10 | — | r/digital_marketing, r/PPC |
| 5 | CreatorSuite | ⏳ Backlog | Mois 3 | Creators | 14 | — | r/NewTubers, r/youtubers |
| 6 | LeadQuiz | ⏳ Backlog | Mois 3 | E-com + Coaches | 12 | 2 (Core+Concurrence) | r/shopify |
| - | [Wildcard] | ⏳ Backlog | Mois 3 | À déterminer | ? | ? | Douleurs communautés |

Statuts : ⏳ Backlog | 🔨 En cours | ✅ Live | 🔴 Killed

**Décisions fusion (08/04/2026) :**
- ListingLab (14 features) → Module Listings de StoreMD
- ChargebackShield (18 features) → Module Anti-Fraude de ProfitPilot
- Raison : anti-app-bloat (3 apps Shopify au lieu de 5), plus de valeur par produit, cross-sell plus clair

**Décisions mutation (14/04/2026) :**
- Leak Detector (site leakdetector.tech) → muté intégralement en StoreMD (storemd.vercel.app). Module Health Check = héritage direct LD. Compte Twitter @LeakDetectorF2 archivé.

Specs détaillées : voir MUTATIONS.md et NOUVEAUX.md dans ce dossier.
Total features Shopify : 96 (StoreMD 43 + ProfitPilot 41 + LeadQuiz 12)
```

## 1.2 — `f2/twitter/context.md`

TYPE : EDIT-SECTION
RAISON : le §1.1 liste 9 anciens produits obsolètes.

Rechercher dans le fichier la section "Les 9 SaaS" ou équivalent listant Leak Detector, ChargebackDefender, PriceRadar, etc. et la remplacer par :

```markdown
## 1.1 Portfolio F2 — 6 AI agents sur 3 verticales

FoundryTwo ship 6 AI agents répartis sur 3 verticales. Chaque agent résout un problème opérationnel concret d'une cible non-dev.

| # | Agent | Vertical | Cible | One-liner |
|---|-------|----------|-------|-----------|
| 1 | StoreMD | E-commerce | Shopify merchants | AI that diagnoses your Shopify store health in 60 seconds |
| 2 | ProfitPilot | E-commerce | Shopify merchants | Know your real profit margin, not just revenue |
| 3 | ClientPulse | Agences | Agency owners | Client reporting that writes itself |
| 4 | AdAudit | Agences | Agency owners | Find out which campaign actually drove the last sale |
| 5 | CreatorSuite | Creators | Content creators | One video → 5 platforms in 15 minutes |
| 6 | LeadQuiz | E-com + Coaches | Merchants + coaches | Interactive quizzes that qualify leads, AI-generated |

Source de vérité détails : `produits/STATUS.md` (racine).

Le compte @foundrytwo parle des 6 agents. Jamais nominé de produit qui n'est pas dans cette liste.
```

Remplacer aussi partout dans ce fichier "9 SaaS" par "6 AI agents" et "Leak Detector" par "StoreMD" (sauf dans une mention historique explicite).

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.3 — `f2/twitter/roadmap.md`

TYPE : EDIT-SECTION
RAISON : liste des 9 anciens produits obsolète, roadmap incohérente.

Chercher toute section listant les 9 anciens SaaS et la remplacer par référence vers la source de vérité :

```markdown
## Portfolio & roadmap produits

Source de vérité : `produits/STATUS.md` (racine).

**Actif sur Twitter compte produit (14/04/2026+) :**
- @StoreMD (remplace @LeakDetectorF2 depuis la mutation 14/04)

**À venir (comptes Twitter à créer à J-14 de chaque launch) :**
- @ProfitPilot (M1 fin avril / mai)
- @ClientPulse (M2 mai)
- @AdAudit (M2 mai-juin)
- @CreatorSuite (M3 juin)
- @LeadQuiz (M3 juin-juillet)

Règle : chaque compte produit est une VITRINE du produit uniquement. Publication assurée par R (angle marketing) + F (angle technique). Pas de cold, pas de DM, pas d'engagement proactif depuis ces comptes.
```

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.4 — `f2/system-prompt.md`

TYPE : EDIT-SECTION
RAISON : mentionne les anciens produits et "building in public" comme positionnement.

Chercher toute mention "9 SaaS" ou les noms des 9 anciens produits → remplacer par référence au portfolio 6 agents.

Chercher "Real numbers, real failures" / "Everything is public, real numbers" dans la bio/positionnement → remplacer par :

> "Positionnement F2 : distribution-first SaaS studio. 6 AI agents across 3 verticals: e-commerce, agencies, creators. Results-first content, anchored in real product outcomes. Build in public format reserved for Friday Studio Updates with strict data integrity (BIBLE.md §3)."

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.5 — `f2/publication/context.md`

TYPE : EDIT-SECTION
RAISON : contient d'anciens noms de produits dans les exemples de posts.

Chercher toute référence aux 9 anciens produits dans les exemples. Les remplacer par les 6 agents officiels. Si l'exemple devient inapplicable, le remplacer par un exemple StoreMD équivalent.

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.6 — `f2/publication/prompt.md`

TYPE : EDIT-SECTION
RAISON : mentionne ancien portfolio.

Même traitement que 1.5 — aligner toutes les mentions produit sur les 6 agents.

## 1.7 — `f2/publication/grok/context.md` et `f2/publication/grok/STUDIO-prompt.md`

TYPE : EDIT-SECTION
RAISON : prompts Grok citent peut-être anciens produits dans exemples.

Aligner sur les 6 agents. Mettre à jour date.

## 1.8 — `f2/publication/posts-valides.md`

TYPE : PRÉSERVATION HISTORIQUE + REMPLACEMENT FUTUR

Règle : les posts **déjà validés et publiés** conservent leurs noms d'époque (mention historique). Les posts **préparés mais non publiés** sont à nettoyer/aligner.

Marquer chaque post d'une balise : `[Historique / publié Xdate]` ou `[À nettoyer — portfolio obsolète]`. Si un post avec "Leak Detector" a été publié avant le 14/04, le laisser tel quel. Si prévu après, le mettre à jour en StoreMD.

## 1.9 — `f2/ph/roadmap.md`

TYPE : EDIT-SECTION
RAISON : roadmap PH référence anciens produits.

Aligner le séquençage PH sur les 6 agents officiels. Utiliser le séquençage déjà défini dans `growth-marketing/strategie/strategie-ph.md` §7.1 comme référence.

## 1.10 — `f2/ih/context.md` et `f2/ih/roadmap.md`

TYPE : EDIT-SECTION
RAISON : mentions anciens produits dans plan IH.

Aligner sur 6 agents. Marquer StoreMD comme "Show IH en cours / à poster".

## 1.11 — `growth-marketing/strategie/strategie-twitter.md`

TYPE : EDIT-SECTION
RAISON : mentions "Leak Detector", "LD" comme compte actif, et anciens produits.

Remplacer toute mention de "Leak Detector" / "LD" / "@LeakDetectorF2" comme compte Twitter actif par "StoreMD" / "@StoreMD". Conserver 1-2 mentions historiques ("@LeakDetectorF2 a été muté en @StoreMD le 14/04/2026") dans une note en entête.

Dans les tableaux de "comptes actifs", remplacer LD par StoreMD comme premier compte produit actif.

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.12 — `growth-marketing/strategie/strategie-linkedin.md`

TYPE : EDIT-SECTION
RAISON : §2.3 Products liste 9 produits inventés.

**CHERCHER** (la table Products actuelle) :
```
| Produit | Description | Vertical | Statut |
|---------|-------------|----------|--------|
| ProfitPilot | AI-powered chargeback defense for Shopify merchants | E-commerce | A ajouter |
| SpeedAudit | Store speed diagnostics — finds app bloat killing conversions | E-commerce | A ajouter |
| InventoryPulse | Predictive inventory alerts before stockouts | E-commerce | A ajouter |
| AdScoreAI | Ad creative scoring before you spend | Marketing | A ajouter |
| EmailCleanup | List hygiene automation for better deliverability | Marketing | A ajouter |
| ReportFlash | Client reports generated in 3 minutes, not 15 hours | Marketing | A ajouter |
| ClipEngine | Long-form to short-form content repurposing | Content | A ajouter |
| ThumbnailRank | AI thumbnail A/B testing for creators | Content | A ajouter |
| CaptionDraft | Platform-native caption generation | Content | A ajouter |
```

**REMPLACER PAR :**
```
| Produit | Description | Vertical | Statut |
|---------|-------------|----------|--------|
| StoreMD | AI that diagnoses your Shopify store health in 60 seconds | E-commerce | ✅ Live (depuis 14/04/2026) |
| ProfitPilot | Know your real profit margin, not just revenue | E-commerce | À ajouter au launch |
| ClientPulse | Client reporting that writes itself, for agencies | Agences | À ajouter au launch |
| AdAudit | Find out which campaign actually drove the last sale | Agences | À ajouter au launch |
| CreatorSuite | One video → 5 platforms in 15 minutes | Creators | À ajouter au launch |
| LeadQuiz | Interactive quizzes that qualify leads, AI-generated | E-com + Coaches | À ajouter au launch |

Chaque nouveau agent = 1 nouvelle entrée dans Products au moment du launch PH.
Source de vérité : produits/STATUS.md (racine).
```

Dans §13 Multi-produit : remplacer toutes les mentions "9 agents" par "6 agents". Remplacer les noms inventés par les 6 officiels.

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.13 — `growth-marketing/strategie/strategie-ih.md`

TYPE : EDIT-SECTION
RAISON : §10 liste portfolio IH avec doublons (ProfitPilot deux fois) et "StoreMD module Listings" comme produit séparé.

Remplacer toute la section §10.1 "Évolution du contenu par phase" par :

```markdown
### 10.1 Évolution du contenu par phase

| Phase | Produits live (prévus) | Format des updates | Angle |
|-------|----------------------|-------------------|-------|
| M1 (avril) | StoreMD (✅ live 14/04), ProfitPilot (upcoming) | Update verticale : données merchants + learnings StoreMD | "We're building AI tools for Shopify merchants" |
| M2 (mai) | + ClientPulse, AdAudit | Update multi-vertical : dashboard 2 verticales + learning croisé | "We're a SaaS studio covering e-com and agencies" |
| M3+ (juin) | + CreatorSuite, LeadQuiz | Update portefeuille complet : 6 agents sur 3 verticales + échec du mois + vision | "6 AI SaaS across 3 verticals: here's what we've learned" |
```

Et §10.3 (Cold outreach multi-produit) remplacer la table par :

```markdown
| Post trouvé | Produit à mentionner | Template |
|------------|---------------------|----------|
| "My Shopify store is slow / no sales" | StoreMD | Diagnostic store + patterns terrain |
| "Chargebacks are killing my margins" | ProfitPilot | Données terrain + solution |
| "My product listings don't convert" | StoreMD (module Listings) | Patterns listings + insights |
| "Agency reporting takes forever" | ClientPulse | Automation angle + insights |
| "Can't figure out my real profit margin" | ProfitPilot | Données merchants + solution |
| "Which ad campaign actually works?" | AdAudit | Attribution patterns + solution |
| "Content creation takes too long" | CreatorSuite | Repurposing workflow + solution |
| "Need better lead qualification" | LeadQuiz | Quiz conversion patterns + solution |
```

Et §10.2 (Show IH) aligner les hooks sur les 6 agents (supprimer doublon ProfitPilot).

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.14 — `growth-marketing/strategie/strategie-ph.md`

TYPE : EDIT-SECTION
RAISON : §7 séquençage PH mentionne "StoreMD module Listings, ProfitPilot" sur M1 comme si 3 lancements, mais M1 n'a que 2 SaaS (StoreMD + ProfitPilot).

Chercher le bloc séquentiel dans §7.1 et remplacer par :

```
VERTICAL 1 — E-COM (avril-mai) — 2 lancements :
  ~Fin avril / début mai :
    - Ship page StoreMD créée (S-3)
    - Pre-launch compressé StoreMD (3 semaines)
    - LAUNCH PH StoreMD (le module Listings est intégré, pas de lancement séparé)
    - Post-launch (1 semaine)
  ~2-3 semaines après :
    - LAUNCH PH ProfitPilot

VERTICAL 2 — AGENCES (mai-juin) :
  ~2-3 semaines après ProfitPilot :
    - LAUNCH PH ClientPulse
  ~2-3 semaines après :
    - LAUNCH PH AdAudit

VERTICAL 3 — CREATORS (juin-juillet) :
  ~2-3 semaines après AdAudit :
    - LAUNCH PH CreatorSuite
  ~2-3 semaines après :
    - LAUNCH PH LeadQuiz
```

Et §4.4 Taglines par produit : garder uniquement les 6 officiels (supprimer toute autre).

Aligner §1 statuts : @foundrytwo, R, F profils **existent** (pas "⏳ Profil à créer") puisque LD a été lancé sur PH le 16/03/2026 — ces comptes existent. Remplacer "⏳ Profil à créer" par "✅ Profils actifs, karma faible à construire".

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.15 — `growth-marketing/strategie/strategie-expansion-generale.md`

TYPE : EDIT-SECTION
RAISON : §2.1 probablement liste ProfitPilot en M1 ET M2 + §12.2 mentionne 9 SaaS.

Aligner §2.1 et toute section portfolio sur les 6 SaaS officiels avec les 3 verticales. ProfitPilot appartient à M1 E-commerce uniquement. Si §12.2 parle de "12 comptes Twitter" avec 9 SaaS, ramener à "9 comptes Twitter actifs à terme" : R + F + F2 + 6 comptes produits = 9 comptes.

Chercher toute mention "9 SaaS" sans contexte historique → remplacer par "6 AI agents".

§18 "Fichiers à créer" avec les 4 strategies marquées "⏳ À créer" → supprimer le bloc "À créer" car les 4 fichiers existent.

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.16 — `growth-marketing/ph/context.md`

TYPE : EDIT-SECTION
RAISON : template maker comment dit "Product #[X] out of 9 planned SaaS".

CHERCHER : `out of 9` / `9 planned SaaS`
REMPLACER PAR : `out of 6` / `6 planned AI agents`

Mettre à jour date.

## 1.17 — `asset-brand/FOUNDRYTWO-BRAND-BIBLE.md`

TYPE : EDIT-SECTION
RAISON : brand bible peut référencer anciens produits dans exemples taglines/bios.

Aligner toutes les bios, taglines d'exemple, slogans sur le portfolio 6 agents. Mettre à jour toute mention "9 SaaS" ou "9 agents" en "6 AI agents".

Ne pas toucher à l'identité visuelle (logo, palette, typo).

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.18 — `asset-brand/FOUNDRYTWO-LOGO-GUIDELINES.md`

TYPE : EDIT-SECTION si nécessaire
RAISON : peut référencer anciens produits.

Vérifier et aligner si mentions de produits. Sinon, ne pas modifier (c'est un doc visuel).

## 1.19 — `marketing/context.md`

TYPE : EDIT-SECTION
RAISON : peut mentionner portfolio obsolète.

Aligner sur 6 agents. Mettre à jour date.

## 1.20 — `strategie/CONTEXT.md`

TYPE : EDIT-SECTION
RAISON : déjà proche de la bonne version, mais vérifier cohérence avec produits/STATUS.md.

Vérifier que §1.2 / §1.3 portfolio liste exactement les 6 agents. Si oui, pas de modif. Si non, aligner.

Ajouter en tête une mention : `Source de vérité portfolio : produits/STATUS.md (racine).`

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 1.21 — `strategie/verticals/RECHERCHE-SCORING.md` et `strategie/verticals/MARKETING-FREELANCERS.md`

TYPE : EDIT-SECTION
RAISON : peuvent mentionner anciens produits (résultats de recherche pré-pivot).

Aligner toute mention de produit final sur les 6 officiels. Si le doc discute d'explorations passées avec noms obsolètes, garder en mention historique explicite ("Exploration initiale de Leak Detector → muté en StoreMD / module Health").

## 1.22 — `romain/suivi-comptes.md`, `romain/roadmap.md`, `fabrice/roadmap.md`

TYPE : EDIT-SECTION
RAISON : peuvent mentionner anciens produits dans planning.

Aligner mentions produit sur 6 agents. Mettre à jour dates.

## 1.23 — `romain/semaine-5/cross-engagement-tracker.md` et `fabrice/semaine-5/cross-engagement-tracker.md`

TYPE : NE PAS MODIFIER LE CONTENU (historique semaine déjà passée)
RAISON : historique, sera archivé au Commit 6.

Pas de modif. Ces fichiers seront déplacés vers archives au commit 6.

## 1.24 — `brain/README.md` et `brain/mempalace/README.md`

TYPE : EDIT-SECTION
RAISON : mentionnent peut-être anciens produits dans exemples.

Aligner. Mettre à jour date. Ne pas toucher aux mécanismes Ouroboros/MemPalace.

## 1.25 — `.claude/agents/f2-designer.md`, `.claude/agents/f2-auditor.md`, `.claude/commands/*.md`, `.claude/skills/marketing-en/SKILL.md`

TYPE : EDIT-SECTION
RAISON : peuvent mentionner anciens produits dans exemples.

Aligner toute mention de produit (exemples, checklists) sur les 6 agents officiels. Si un exemple devient obsolète, le réécrire autour de StoreMD.

Ne pas toucher à la LOGIQUE des agents/commandes/skills — uniquement les références produit dans les exemples.

## 1.26 — Vérification finale Commit 1

Avant de commiter, Claude Code lance :
```bash
grep -r "Leak Detector\|LeakDetectorF2\|ChargebackDefender\|PriceRadar\|ReviewPulse\|AdWatcher\|BriefForge\|ContentFlow\|InvoiceGuard\|DataMerge\|SpeedAudit\|InventoryPulse\|AdScoreAI\|EmailCleanup\|ReportFlash\|ClipEngine\|ThumbnailRank\|CaptionDraft" F2-Jarvis-main/ --include="*.md" | grep -v archives | grep -v "historique" | grep -v "muté"
```

Seuls résultats acceptables : mentions historiques explicites (dans archives, ou phrases type "Leak Detector muté en StoreMD 14/04/2026").

Si d'autres mentions subsistent → les traiter avant de commiter.

Git commit avec le message défini en entête de ce Commit 1.

---

# COMMIT 2 — BUILD-IN-PUBLIC → SALES-MODE DOMINANT

**Objectif :** déplacer le positionnement principal de "build-in-public journey" vers "sales-mode results-first" partout, tout en respectant BIBLE.md §3 qui autorise le format "Build in Public" pour studio update Vendredi + Show IH + recap factuel.

**Commit message :**
```
cleanup: shift positioning from build-in-public to sales-mode dominant

- Bios R/F/F2: replace "Real numbers, real failures" / "building in public"
  with "6 AI agents for Shopify merchants, agencies, creators"
- Friday F2 slot: keep "Build in Public / Studio Update" format with BIBLE.md §3 strict data rules
- IH Show format: preserved as launch format
- Update voix R/F/F2 docs to reflect sales-mode posture
- README.md racine: remove "Build in public, no fake stats" from intro
- All touched files get "Dernière mise à jour: 21 avril 2026"
```

## 2.1 — `README.md` racine

TYPE : EDIT-SECTION
RAISON : l'intro dit "Build in public, no fake stats" + "3-4 SaaS/mois" (incohérent avec CLAUDE.md 2 SaaS/mois).

CHERCHER :
```
# FoundryTwo

Studio SaaS indie. Distribution-first. 3–4 SaaS/mois.
R (Growth) + F (CTO). Build in public, no fake stats.
Repo opérationnel unifié — documentation .md, pas de code.
```

REMPLACER PAR :
```
# F2-Jarvis

Repo unifié du studio FoundryTwo. Contient DEUX systèmes :
1. **F2-Jarvis (infra)** — cockpit web agentique + Claude Code setup + couche mémoire
2. **FoundryTwo (contenu opé)** — stratégie, produits, marketing, distribution

Studio SaaS indie. Distribution-first. 2 SaaS/mois sur 3 verticales (e-com, agences, creators).
R (Growth) + F (CTO). Sales-mode dominant, integrity strict (BIBLE.md §3).
```

Note : la section "Chemins de lecture", "Index par dossier", "Statut" sera entièrement réécrite au Commit 8. Pour ce commit 2, on ne touche qu'à l'intro.

## 2.2 — `f2/context.md` (bio F2)

TYPE : EDIT-SECTION
RAISON : bio F2 positionne sur "build in public journey" comme ligne narrative principale.

Chercher les formulations type :
- "Everything is public: real numbers, real failures"
- "Real numbers, real failures"
- "Two self-taught builders shipping in public"
- "Honest builder journey"
- "Building in public" comme ligne narrative principale

Les remplacer par :
- Tagline F2 principale : "SaaS studio. 6 AI agents for Shopify merchants, agencies, creators. Results in minutes."
- Positionnement : "Distribution-first. Sales-mode dominant. Real product data, not studio journey. Friday slot reserved for honest studio updates (strict data integrity per BIBLE.md §3)."

Dans la section "Voix F2" ou équivalente :
- Conserver le pronom `we`
- Conserver le ton data-driven neutre
- SUPPRIMER "valorise la vulnérabilité studio" / "ship in public comme identité"
- AJOUTER "sales-mode par défaut, data de produit > data studio, build-in-public strictement réservé au Friday Studio Update format"

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 2.3 — `f2/twitter/context.md`

TYPE : EDIT-SECTION
RAISON : squelette éditorial probablement dit "Vendredi = Build in Public / metrics journey".

Chercher la section squelette hebdo (type tableau "Jour | Type de post"). Modifier le vendredi :

CHERCHER (exemple de formulation probable) :
```
| Vendredi | Build in Public | Metrics studio + learnings semaine |
```

REMPLACER PAR :
```
| Vendredi | Studio Update / Build in Public (format réservé) | Metrics studio factuels, data produit (scans, users, installs), respect strict BIBLE.md §3 — jamais de faux MRR, jamais de testimonial inventé |
```

Chercher toute phrase "F2 valorise la transparence radicale / build in public" comme positionnement → remplacer par "F2 valorise la data produit vérifiable. Le format Build in Public existe mais se limite au Friday Studio Update."

Mettre à jour date.

## 2.4 — `f2/linkedin/context.md`

TYPE : EDIT-SECTION

Même traitement que 2.3 pour LinkedIn. La page company F2 publie 3 posts/semaine (lun, mer, ven). Le vendredi reste "Studio Update / Build in Public (format réservé)". Lun et mer doivent être sales-mode produit (data, results, features agents).

Mettre à jour date.

## 2.5 — `f2/ih/context.md` et `f2/ih/roadmap.md`

TYPE : EDIT-SECTION
RAISON : IH est la plateforme où le build-in-public est le plus ancré.

IMPORTANT : sur IH, le build-in-public est toléré au format "Show IH" (lancement) et "Weekly update" (mercredi). La règle sales-mode dominant s'applique autrement. Sur IH la règle stricte BIBLE.md §3 prévaut.

Chercher formulations type :
- "Two self-taught builders shipping in public. Real numbers, real failures."
- "Everything is public: real numbers, real failures, no bullshit"

Remplacer par (bio IH F2) :
- "SaaS studio. 6 AI agents for e-com, agencies, creators. Currently live: StoreMD. Honest product data, strict integrity (no fake MRR, no fake testimonials)."

Dans les formats de post :
- Show IH : format préservé (story + learnings + product + question)
- Weekly update : remplacer "metrics studio transparents" en premier lieu par "data produit + patterns marchés + 1 learning studio"
- Hot takes / provocations : toujours interdits (cohérent avec existant)

Mettre à jour date.

## 2.6 — `f2/ph/context.md` (si existe) et `f2/ph/roadmap.md`

TYPE : EDIT-SECTION

Profil @foundrytwo PH bio : aligner sur sales-mode dominant.

Maker comment template : conserver la structure (c'est bon) mais vérifier qu'il ne dit pas "We're building in public — every number, every failure. This is product #X of 6 planned AI SaaS".

Si cette phrase est là, la remplacer par :
```
We ship AI agents that solve real problems. This is product #X from our portfolio of 6 across 3 verticals. Friday studio updates when we have meaningful product data to share.
```

## 2.7 — `f2/publication/context.md` et `f2/publication/prompt.md`

TYPE : EDIT-SECTION

Aligner les prompts de génération de posts F2 sur le sales-mode dominant. Les prompts doivent dire :
- "Post F2 par défaut = sales-mode / results-first / product data"
- "Format build-in-public = autorisé UNIQUEMENT pour slot vendredi Studio Update"
- "Respect BIBLE.md §3 : pas de faux MRR, pas de testimonials inventés, pas de noms clients fictifs"

## 2.8 — `romain/VOIX.md`

TYPE : EDIT-SECTION
RAISON : voix R probablement décrit "partage la journey F2 build in public".

Chercher formulations type :
- "R partage la journey build in public"
- "R raconte les échecs studio"

Remplacer :
- "R est le visage growth distribution-first. Pronom 'I'. R parle des problèmes merchants/agencies/creators avec data terrain (50+ merchants). Ne raconte pas la journey studio. Mentionne FoundryTwo/les agents naturellement, sans hype."

Mettre à jour date.

## 2.9 — `fabrice/VOIX.md`

TYPE : EDIT-SECTION

Même logique. F est builder technique accessible. Pas "F raconte la journey" mais "F raconte les solutions tech concrètes qui résolvent un problème business. Angle : sous le capot d'un agent qui tourne, patterns techniques qui sauvent de l'argent/du temps."

## 2.10 — `romain/context.md` et `fabrice/context.md`

TYPE : EDIT-SECTION

Aligner le positionnement sur sales-mode dominant. Les bios Twitter/LinkedIn de R et F doivent parler de :
- Le(s) produit(s) actifs
- L'angle growth (R) ou tech (F)
- La mention FoundryTwo comme studio

Ne pas mettre "building in public" comme positionnement principal dans les bios.

## 2.11 — Tous les fichiers `{persona}/{plateforme}/context.md`

TYPE : EDIT-SECTION ciblée

Chercher dans chaque context par plateforme : `build in public`, `building in public`, `Build in Public`, `ship in public`.

Règle :
- Si le terme apparaît comme **position narrative principale** → remplacer par sales-mode
- Si le terme apparaît comme **format occasionnel** (ex: "1 post/semaine build in public") → le garder mais préciser "format réservé, règle stricte BIBLE.md §3"
- Si le terme apparaît dans un **squelette éditorial vendredi** → garder comme format éditorial (pas touché, c'est autorisé)

Pour chaque fichier modifié, mettre à jour date.

Fichiers concernés (liste probable, à vérifier par grep) :
- `romain/twitter/context.md`
- `romain/linkedin/context.md`
- `romain/reddit/context.md`
- `romain/facebook/context.md`
- `romain/ph/context.md`
- `fabrice/twitter/context.md`
- `fabrice/linkedin/context.md`
- `fabrice/reddit/context.md`
- `fabrice/facebook/context.md`
- `fabrice/ph/context.md`

## 2.12 — `growth-marketing/context.md` et `growth-marketing/roadmap.md`

TYPE : EDIT-SECTION

Toute mention de "build in public journey" comme stratégie dominante → remplacer par "sales-mode dominant / build-in-public format réservé vendredi studio update + Show IH + weekly update IH".

Mettre à jour dates.

## 2.13 — `growth-marketing/strategie/strategie-*.md` (les 4 fichiers plateforme)

TYPE : EDIT-SECTION

Dans chacun des 4 :
- `strategie-twitter.md`
- `strategie-linkedin.md`
- `strategie-ih.md`
- `strategie-ph.md`

Chercher les formulations "build in public comme ligne narrative principale" et remplacer par sales-mode.

Conserver les mentions de "Show IH" et "Friday Studio Update F2" comme formats acceptés.

Dans les squelettes éditoriaux, garder "Build in Public" comme case du vendredi F2 mais référencer BIBLE.md §3 : "Format Build in Public — réservé, respect strict BIBLE.md §3 (pas de faux MRR, pas de testimonials inventés)".

Mettre à jour dates.

## 2.14 — `growth-marketing/ih/context.md` et `growth-marketing/ih/algo.md`

TYPE : EDIT-SECTION

Sur IH, le build-in-public est **toléré** car c'est la culture de la plateforme. Ici on ne supprime PAS le format. On précise :
- Build in public update (mercredi) = format préservé, règle stricte BIBLE.md §3
- Show IH (lancement) = format préservé
- Weekly update = format préservé

Chercher toute mention "Real numbers, real failures. No bullshit" dans les bios/positionnements → remplacer par "Real product data. Strict integrity (no fake MRR, no fake testimonials)."

Mettre à jour dates.

## 2.15 — `romain/daily-checklist.md`, `fabrice/daily-checklist.md`

TYPE : EDIT-SECTION

Si les checklists mentionnent "post build-in-public quotidien" → le retirer. Poster en sales-mode par défaut.

## 2.16 — `f2/playbook-semaine.md`, `romain/playbook-semaine.md`, `fabrice/playbook-semaine.md`

TYPE : EDIT-SECTION

Le squelette éditorial hebdo doit refléter la nouvelle hiérarchie :
- Lundi-Jeudi = sales-mode (data produit, results, features, patterns marché)
- Vendredi F2 = Build in Public / Studio Update (format autorisé, règle stricte)
- Vendredi R et F = libre (data terrain, hot takes, etc.)

Mettre à jour dates.

## 2.17 — `f2/engagement/chrome/LINKEDIN-prompt.md`

TYPE : EDIT-SECTION si mention explicite

Vérifier et aligner si build-in-public y est référencé comme positionnement.

## 2.18 — `growth-marketing/strategie/audit-explosion-marketing-v2.md` et `growth-marketing/strategie/recherche-comptes-produit-studio-FR.md`

TYPE : NE PAS MODIFIER (documents de recherche / audit historiques)
RAISON : ces documents sont des analyses passées. Ils documentent un état antérieur.

Si on touche, on détruit l'historique analytique. On les laisse.

## 2.19 — Vérification finale Commit 2

Avant commit, Claude Code lance :
```bash
grep -rni "build in public\|building in public" F2-Jarvis-main/ --include="*.md" | grep -v archives | grep -v "Friday" | grep -v "BIBLE.md §3" | grep -v "Show IH" | grep -v "Weekly update" | grep -v "Studio Update"
```

Résultats acceptables : mentions dans contextes précis (vendredi F2, Show IH, weekly update IH).

Résultats inacceptables : mentions en **positionnement narratif principal** de R/F/F2 bios, voix, ou squelettes hors vendredi.

Git commit avec message du Commit 2.

---

# COMMIT 3 — RÉFÉRENCES CHEMINS CASSÉS

**Objectif :** toutes les références vers `growth-marketing/{plateforme}/{compte}/...` sont cassées car l'arborescence n'existe pas. Les vrais fichiers sont dans `{personne}/{plateforme}/`. On corrige toutes les références.

**Commit message :**
```
cleanup: fix broken path references (growth-marketing phantom subdirs)

- Replace growth-marketing/{platform}/{account}/{file} with real paths
- Real structure: {person}/{platform}/context.md pattern
- Update "Hérite de:" headers to point to existing files
- Align Documents de référence sections across all strategy files
- Update all "Dernière mise à jour" to 21 avril 2026 in touched files
```

## 3.1 — Règle de transformation

Règle de substitution globale (à appliquer à tous les fichiers `.md` concernés) :

| Chemin cassé (à chercher) | Chemin réel (à remplacer par) |
|---------------------------|-------------------------------|
| `growth-marketing/twitter/f2/context.md` | `f2/twitter/context.md` |
| `growth-marketing/twitter/f2/roadmap.md` | `f2/twitter/roadmap.md` |
| `growth-marketing/twitter/romain/context.md` | `romain/twitter/context.md` |
| `growth-marketing/twitter/romain/roadmap.md` | `romain/twitter/roadmap.md` |
| `growth-marketing/twitter/fabrice/context.md` | `fabrice/twitter/context.md` |
| `growth-marketing/twitter/fabrice/roadmap.md` | `fabrice/twitter/roadmap.md` |
| `growth-marketing/linkedin/f2/context.md` | `f2/linkedin/context.md` |
| `growth-marketing/linkedin/f2/roadmap.md` | `f2/linkedin/roadmap.md` |
| `growth-marketing/linkedin/romain/context.md` | `romain/linkedin/context.md` |
| `growth-marketing/linkedin/romain/roadmap.md` | `romain/linkedin/roadmap.md` |
| `growth-marketing/linkedin/fabrice/context.md` | `fabrice/linkedin/context.md` |
| `growth-marketing/linkedin/fabrice/roadmap.md` | `fabrice/linkedin/roadmap.md` |
| `growth-marketing/ih/f2/context.md` | `f2/ih/context.md` |
| `growth-marketing/ih/f2/roadmap.md` | `f2/ih/roadmap.md` |
| `growth-marketing/ih/romain/context.md` | `f2/ih/context.md` (pas de compte R sur IH — voir 3.3) |
| `growth-marketing/ih/fabrice/context.md` | `f2/ih/context.md` (pas de compte F sur IH — voir 3.3) |
| `growth-marketing/ph/f2/context.md` | `f2/ph/context.md` |
| `growth-marketing/ph/f2/roadmap.md` | `f2/ph/roadmap.md` |
| `growth-marketing/ph/romain/context.md` | `romain/ph/context.md` (fichier peut être vide, OK de pointer dessus) |
| `growth-marketing/ph/fabrice/context.md` | `fabrice/ph/context.md` (fichier peut être vide, OK de pointer dessus) |
| `growth-marketing/tiktok/f2/context.md` | `f2/tiktok/context.md` |

**Règle complémentaire : en-têtes "Hérite de :".**

Tout fichier qui commence par `Hérite de : growth-marketing/{plateforme}/{compte}/context.md` doit pointer vers le vrai parent :

- Si un fichier est dans `f2/twitter/`, son vrai parent est `growth-marketing/twitter/context.md` (le context plateforme générique) puis `f2/context.md` (le context studio).
- Si un fichier est dans `romain/linkedin/`, son vrai parent est `growth-marketing/linkedin/context.md` puis `romain/context.md`.

Nouvelle norme d'en-tête pour les context.md par (personne × plateforme) :
```
Hérite de :
- growth-marketing/{plateforme}/context.md (règles plateforme)
- {personne}/context.md (positionnement persona)

Ce fichier contient : règles spécifiques {personne} × {plateforme}.
```

## 3.2 — Fichiers à parcourir (33 fichiers touchés)

Claude Code exécute le grep suivant pour identifier tous les fichiers contenant des références à corriger :
```bash
grep -rl "growth-marketing/twitter/\|growth-marketing/linkedin/\|growth-marketing/ih/\|growth-marketing/ph/\|growth-marketing/tiktok/" F2-Jarvis-main/ --include="*.md" | grep -v archives
```

Pour chaque fichier, lire + appliquer la règle de substitution 3.1 + mettre à jour la date.

Liste indicative (à compléter dynamiquement via le grep) :
- `growth-marketing/twitter/context.md`
- `growth-marketing/strategie/strategie-twitter.md`
- `growth-marketing/strategie/strategie-linkedin.md`
- `growth-marketing/strategie/strategie-ih.md`
- `growth-marketing/strategie/strategie-ph.md`
- `growth-marketing/strategie/strategie-expansion-generale.md`
- `growth-marketing/strategie/audit-explosion-marketing-v2.md`
- `growth-marketing/context.md`
- `growth-marketing/roadmap.md`
- `growth-marketing/ih/context.md`
- `growth-marketing/ph/context.md`
- `f2/twitter/context.md`
- `f2/twitter/roadmap.md`
- `f2/context.md`
- `f2/roadmap.md`
- `f2/system-prompt.md`
- `f2/linkedin/context.md`
- `f2/linkedin/roadmap.md`
- `f2/ih/context.md`
- `f2/ih/roadmap.md`
- `f2/ph/context.md` (si existe)
- `f2/ph/roadmap.md`
- `f2/tiktok/context.md`
- `f2/tiktok/roadmap.md`
- `fabrice/twitter/context.md`
- `fabrice/twitter/roadmap.md`
- `fabrice/linkedin/context.md`
- `fabrice/linkedin/roadmap.md`
- `fabrice/system-prompt.md`
- `fabrice/roadmap.md`
- `romain/twitter/context.md`
- `romain/twitter/roadmap.md`
- `romain/linkedin/context.md`
- `romain/linkedin/roadmap.md`
- `romain/system-prompt.md`
- `romain/roadmap.md`

## 3.3 — IH et PH : règles spéciales

**IH** est géré UNIQUEMENT par @foundrytwo (cf. `growth-marketing/strategie/strategie-ih.md` §1). Pas de compte perso R ou F sur IH.

**Règle :** toute référence cassée vers `growth-marketing/ih/romain/...` ou `growth-marketing/ih/fabrice/...` doit être redirigée vers `f2/ih/context.md` ou `f2/ih/roadmap.md`. NE PAS créer de fichier `romain/ih/context.md` ou `fabrice/ih/context.md`.

**PH** est géré par @foundrytwo + R + F (3 comptes actifs). Les dossiers `romain/ph/` et `fabrice/ph/` existent (même vides). OK de pointer dessus même si le fichier `context.md` est minimal ou vide.

Si un fichier référence `romain/ph/context.md` ou `fabrice/ph/context.md` et que le fichier existe bien (même vide) : c'est OK, la référence est correcte. Si le fichier n'existe pas du tout, alors rediriger vers `f2/ph/context.md`.

## 3.4 — Sections "Documents de référence"

Dans chaque fichier `strategie-*.md` de `growth-marketing/strategie/`, la section finale "Documents de référence" liste des chemins. Les corriger :

Exemple pour `strategie-linkedin.md` §16 :

CHERCHER :
```
| growth-marketing/linkedin/romain/context.md | growth-marketing/linkedin/romain/ | Voix R, contenu, routine — aligner sur §3.1, §4.1, §14.5 |
| growth-marketing/linkedin/fabrice/context.md | growth-marketing/linkedin/fabrice/ | Voix F, contenu, routine — aligner sur §3.2, §4.3, §14.4 |
| growth-marketing/linkedin/f2/context.md | growth-marketing/linkedin/f2/ | Page F2, 3 posts/sem, 5 commentaires signés — aligner sur §2.3, §4.5, §10.6 |
| growth-marketing/linkedin/romain/roadmap.md | growth-marketing/linkedin/romain/ | Planning LinkedIn R par phase — aligner sur ce fichier |
| growth-marketing/linkedin/fabrice/roadmap.md | growth-marketing/linkedin/fabrice/ | Planning LinkedIn F par phase — aligner sur ce fichier |
| growth-marketing/linkedin/f2/roadmap.md | growth-marketing/linkedin/f2/ | Planning page F2 — aligner sur ce fichier |
```

REMPLACER PAR :
```
| romain/linkedin/context.md | romain/linkedin/ | Voix R LinkedIn, contenu, routine — aligner sur §3.1, §4.1, §14.5 |
| fabrice/linkedin/context.md | fabrice/linkedin/ | Voix F LinkedIn, contenu, routine — aligner sur §3.2, §4.3, §14.4 |
| f2/linkedin/context.md | f2/linkedin/ | Page F2 LinkedIn, 3 posts/sem, 5 commentaires signés — aligner sur §2.3, §4.5, §10.6 |
| romain/linkedin/roadmap.md | romain/linkedin/ | Planning LinkedIn R par phase — aligner sur ce fichier |
| fabrice/linkedin/roadmap.md | fabrice/linkedin/ | Planning LinkedIn F par phase — aligner sur ce fichier |
| f2/linkedin/roadmap.md | f2/linkedin/ | Planning page F2 LinkedIn — aligner sur ce fichier |
```

Même traitement pour `strategie-twitter.md` §16, `strategie-ih.md` §15 (avec règle 3.3 : supprimer les refs romain/ih et fabrice/ih qui n'existent pas, pointer vers `f2/ih/`), et `strategie-ph.md` §15.

## 3.5 — Vérification finale Commit 3

Avant commit, Claude Code lance :
```bash
grep -rn "growth-marketing/twitter/\(f2\|romain\|fabrice\)/\|growth-marketing/linkedin/\(f2\|romain\|fabrice\)/\|growth-marketing/ih/\(f2\|romain\|fabrice\)/\|growth-marketing/ph/\(f2\|romain\|fabrice\)/\|growth-marketing/tiktok/\(f2\|romain\|fabrice\)/" F2-Jarvis-main/ --include="*.md" | grep -v archives
```

Résultats attendus : 0 (ou uniquement dans archives).

Si résultats subsistent hors archives, les traiter avant commit.

Git commit avec message du Commit 3.

---

# COMMIT 4 — SOURCE DE VÉRITÉ PARENT UNIQUE

**Objectif :** un seul document "source de vérité parent" — `strategie/CONTEXT.md`. Les 5 documents de stratégie dans `growth-marketing/strategie/` deviennent des docs plateforme de référence, pas parent.

**Commit message :**
```
cleanup: single source of truth — strategie/CONTEXT.md

- strategie/CONTEXT.md becomes unique parent doc
- growth-marketing/strategie/strategie-expansion-generale.md demoted to "platform reference"
- Remove "this file is PARENT and primes on all others" claim
- Add parent banner header to all strategy subfiles
- Keep strategie-{twitter,linkedin,ih,ph}.md as platform-specific references
```

## 4.1 — `growth-marketing/strategie/strategie-expansion-generale.md`

TYPE : EDIT-SECTION
RAISON : ce fichier se déclare "parent qui prime sur tout autre document". Contradiction avec `strategie/CONTEXT.md` qui est le vrai parent.

Chercher et remplacer l'en-tête :

CHERCHER (formulation probable ligne 7 ou alentours) :
```
**Ce fichier est le PARENT. Il prime sur tout autre document en cas de contradiction.**
```
OU toute variante type "parent qui prime" / "source de vérité" / "prime sur les autres documents".

REMPLACER PAR :
```
**Source de vérité parent du repo : `strategie/CONTEXT.md` (racine).**
Ce fichier est une **référence plateforme multi-canal** — il détaille les règles globales de distribution cross-plateforme. En cas de contradiction avec `strategie/CONTEXT.md`, ce dernier prime.
```

Dans la suite du fichier, chercher toute phrase type "ce document parent", "source de vérité" appliquée à ce fichier → la reformuler en "ce document de référence cross-plateforme".

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 4.2 — Bandeau parent dans les 5 fichiers de `growth-marketing/strategie/`

TYPE : EDIT-SECTION (ajout en tête)

Dans chacun de ces 5 fichiers :
- `strategie-twitter.md`
- `strategie-linkedin.md`
- `strategie-ih.md`
- `strategie-ph.md`
- `strategie-expansion-generale.md`

Ajouter en tout début de fichier (juste après le titre H1), ce bandeau :

```markdown
> **Source de vérité parent : `strategie/CONTEXT.md` (racine).**
> Ce fichier est une référence plateforme. En cas de contradiction avec le parent, le parent prime.
> Hérite aussi de `BIBLE.md` (principes non-négociables) et `ANTI-IA.md` (règle #0).
```

Si un bandeau similaire existe déjà mais avec une autre formulation, le remplacer par celui-ci.

Mettre à jour "Dernière mise à jour" → `21 avril 2026` dans chaque fichier.

## 4.3 — `strategie/CONTEXT.md`

TYPE : EDIT-SECTION (affirmer le statut parent)

Ajouter en tête (sous le H1) un bandeau explicite :

```markdown
> **SOURCE DE VÉRITÉ PARENT DU REPO** — `strategie/CONTEXT.md`.
> Tous les autres documents de stratégie, marketing, growth héritent de celui-ci.
> En cas de contradiction entre ce fichier et un autre, CE FICHIER PRIME.
> Principes non-négociables : voir `BIBLE.md` (racine). Règle #0 anti-IA : voir `ANTI-IA.md` (racine).
```

Si un bandeau existe déjà, le remplacer par celui-ci.

Mettre à jour "Dernière mise à jour" → `21 avril 2026`.

## 4.4 — `marketing/context.md`

TYPE : EDIT-SECTION

Ajouter en tête le bandeau :

```markdown
> Hérite de `strategie/CONTEXT.md` (source de vérité parent racine).
> Ce fichier contient : marketing macro (funnel, pipeline, comptes).
```

Si déjà présent, vérifier cohérence. Sinon ajouter.

## 4.5 — `distribution/README.md`

TYPE : EDIT-SECTION

Ajouter en tête :

```markdown
> Hérite de `strategie/CONTEXT.md` (source de vérité parent racine).
> Ce fichier contient : règles de distribution terrain (Reddit + Facebook).
```

## 4.6 — `la-toile/context.md`

TYPE : EDIT-SECTION

Ajouter en tête :

```markdown
> Hérite de `strategie/CONTEXT.md` (source de vérité parent racine).
> Ce fichier contient : architecture de visibilité multi-nœuds. Altistone INVISIBLE en public.
```

## 4.7 — Vérification finale Commit 4

Avant commit, Claude Code vérifie :
```bash
grep -rn "Ce fichier est le PARENT\|Il prime sur tout autre document" F2-Jarvis-main/ --include="*.md" | grep -v archives
```

Résultats attendus : 0 (aucun fichier ne se revendique plus "PARENT qui prime").

**Note :** les bannières ajoutées au commit 4 contiennent bien l'expression "source de vérité parent" mais en tant qu'HÉRITAGE (`> Hérite de strategie/CONTEXT.md (source de vérité parent racine)`) — ce n'est PAS une revendication. C'est pourquoi le grep ci-dessus cherche uniquement les formulations de REVENDICATION (`Ce fichier est le PARENT`, `Il prime sur tout autre document`).

Le seul fichier qui peut contenir "SOURCE DE VÉRITÉ PARENT DU REPO" (en revendication) est `strategie/CONTEXT.md`. Vérifier manuellement avec :
```bash
grep -n "SOURCE DE VÉRITÉ PARENT" F2-Jarvis-main/strategie/CONTEXT.md
```

Si d'autres fichiers se revendiquent parent, les rétrograder.

Git commit avec message du Commit 4.

---

# COMMIT 5 — TIKTOK STATUT CLAIR

**Objectif :** TikTok est **suspendu** jusqu'à ce que le pipeline vidéo soit prêt (F le construit). Les fichiers TikTok existent mais sont vides ou contradictoires. On les marque proprement.

**Commit message :**
```
cleanup: TikTok suspended status — pipeline vidéo in progress

- f2/tiktok/context.md: replace TODO placeholder with clear suspended status
- f2/tiktok/roadmap.md: replace TODO with activation criteria
- growth-marketing/tiktok/context.md: same treatment
- Update coordination docs: TikTok is suspended, not "scheduled 3x/week"
- All mentions of TikTok in schedules get "suspended" flag
```

## 5.1 — `f2/tiktok/context.md`

TYPE : REMPLACE-FICHIER
RAISON : contient juste `<!-- TODO -->` actuellement.

CONTENU FINAL :
```markdown
# f2/tiktok/context.md

**Statut : ⏸ SUSPENDU (21/04/2026)**

## Pourquoi suspendu

TikTok n'est pas activé sur F2 actuellement. Fabrice construit un **pipeline vidéo** (génération + montage automatisé) nécessaire pour produire du contenu TikTok à cadence suffisante sans effort humain à chaque vidéo.

Le passage TikTok (et ensuite Instagram Reels) aura lieu **quand le pipeline est opérationnel**. Date cible indicative : M3 (juin 2026), à aligner avec le vertical Creators.

## Critères de réactivation

- Pipeline vidéo F opérationnel (génération → montage → sous-titres → upload)
- Cadence cible : 3 vidéos/semaine sur TikTok + 3 Reels Instagram
- Avatar F2 visuel défini (brand-bible §3)
- Angles éditoriaux testés sur pipeline en mode interne
- Décision explicite Fabrice + Romain en revue hebdo

## En attendant

- Ne PAS créer de contenu TikTok manuel (ROI insuffisant sans pipeline)
- Ne PAS référencer TikTok comme canal actif dans les playbooks, squelettes, coordination
- Le dossier TikTok existe (ce fichier + roadmap) pour marquer la place future
- Voir `growth-marketing/tiktok/algo.md` pour la mécanique plateforme (déjà documenté)

## Hérite de

- `strategie/CONTEXT.md` (parent racine)
- `f2/context.md` (positionnement studio)
- `growth-marketing/tiktok/algo.md` (mécanique plateforme)

---

**Dernière mise à jour : 21 avril 2026**
```

## 5.2 — `f2/tiktok/roadmap.md`

TYPE : REMPLACE-FICHIER

CONTENU FINAL :
```markdown
# f2/tiktok/roadmap.md

**Statut : ⏸ SUSPENDU — réactivation conditionnelle (cf. context.md)**

## Roadmap d'activation (séquence prévue quand pipeline prêt)

### Phase 0 — Pré-activation (en cours, côté F)
- Pipeline vidéo (génération, montage, sous-titres auto)
- Test interne avec 5-10 vidéos non-publiées
- Validation qualité visuelle et ton F2

### Phase 1 — Soft launch (1 mois après pipeline prêt)
- 1 vidéo/semaine
- Angles : StoreMD results (scans, leaks), data pain merchants
- Objectif : tester rétention / feedback, pas la viralité

### Phase 2 — Cadence normale (M+2 après pipeline prêt)
- 3 vidéos/semaine (mardi, jeudi, samedi 18h-19h CEST)
- 3 Reels Instagram en parallèle (repurpose du même contenu)
- Intégration dans la Toile (cross-post Twitter vidéo, LinkedIn natif)

### Phase 3 — Scale (M+3)
- Si traction : 5 vidéos/semaine TikTok + Reels
- Live TikTok pour lancements SaaS
- Intégration dans maker comment PH

## Hérite de

- `strategie/CONTEXT.md`
- `f2/tiktok/context.md` (statut)
- `growth-marketing/tiktok/algo.md`

---

**Dernière mise à jour : 21 avril 2026**
```

## 5.3 — `growth-marketing/tiktok/context.md`

TYPE : REMPLACE-FICHIER

CONTENU FINAL :
```markdown
# growth-marketing/tiktok/context.md

**Statut : ⏸ SUSPENDU — pipeline vidéo en construction (F)**

## Pourquoi suspendu

Cf. `f2/tiktok/context.md` pour le détail opérationnel.

TikTok demande une cadence vidéo impossible à soutenir sans pipeline de génération/montage automatisé. F construit ce pipeline. Réactivation quand opérationnel.

## Règles plateforme (préservées, prêtes à l'emploi)

Voir `growth-marketing/tiktok/algo.md` pour la mécanique TikTok 2026 (déjà documenté).

## Pas de compte par persona

TikTok sera géré par @foundrytwo uniquement (comme IH). Pas de compte perso R ou F.

## Instagram Reels (activation couplée)

Le passage TikTok est couplé à Instagram Reels (repurpose vidéo). À activer en même temps.

## Hérite de

- `strategie/CONTEXT.md`
- `growth-marketing/tiktok/algo.md`

---

**Dernière mise à jour : 21 avril 2026**
```

## 5.4 — `growth-marketing/tiktok/algo.md`

TYPE : NE PAS MODIFIER
RAISON : ce fichier documente la mécanique TikTok 2026. Il reste valide indépendamment du statut actif/suspendu.

Vérifier juste la présence du bandeau parent (Commit 4). Si pas présent, l'ajouter.

## 5.5 — `la-toile/coordination.md`

TYPE : EDIT-SECTION
RAISON : mentionne TikTok dans la coordination hebdo ("3 posts TikTok/semaine mardi, jeudi, samedi 18h-19h").

Chercher le bloc TikTok dans la coordination → ajouter un flag :

CHERCHER (formulation probable) :
```
| TikTok | F2 | 3/sem (mardi, jeudi, samedi) | 18h-19h CET |
```

REMPLACER PAR :
```
| TikTok | F2 | ⏸ SUSPENDU — pipeline vidéo en construction | Réactivation conditionnelle (cf. f2/tiktok/context.md) |
```

Mettre à jour date.

## 5.6 — `f2/playbook-semaine.md` et `f2/plan-hebdo.md`

TYPE : EDIT-SECTION

Si TikTok apparaît dans le squelette hebdo ou le plan hebdo en cours, marquer `⏸ SUSPENDU` avec note "réactivation quand pipeline prêt — voir f2/tiktok/context.md".

Ne pas supprimer les entrées TikTok (elles servent de place tenue pour la future réactivation). Juste les marquer suspendues.

## 5.7 — `marketing/context.md`

TYPE : EDIT-SECTION

Si TikTok apparaît dans une table de canaux, marquer `⏸ SUSPENDU (pipeline vidéo en construction)`.

## 5.8 — `growth-marketing/README.md`

TYPE : EDIT-SECTION

Si le README indexe TikTok comme `⏳ TODO`, changer en `⏸ SUSPENDU — pipeline vidéo en construction (cf. f2/tiktok/context.md)`.

## 5.9 — Vérification finale Commit 5

Grep de vérification :
```bash
grep -rn "TikTok\|tiktok" F2-Jarvis-main/ --include="*.md" | grep -v archives | grep -v "algo.md" | grep -i "todo\|à faire\|à venir\|planned"
```

Résultats attendus : 0, ou tous les résultats sont déjà remplacés par "suspendu / pipeline vidéo".

Git commit avec message du Commit 5.

---

# COMMIT 6 — ARCHIVES REGROUPÉES

**Objectif :** aucun dossier "semaine-X" ne traîne dans les dossiers `{persona}/` racine. Tous les dossiers semaines passées (1, 2, 5) sont déplacés dans les `{persona}/archives/` existants. Le `BATCH-SEMAINE-6.md` reste à la racine tant que S6 est active (jusqu'au dimanche 26/04).

**Commit message :**
```
cleanup: move stray semaine-X folders into archives/ subdirs

- romain/semaine-{1,2,5}/ → romain/archives/semaine-{N}-{dates}/
- fabrice/semaine-{1,2,5}/ → fabrice/archives/semaine-{N}-{dates}/
- f2/semaine-5-13-19-avril-2026/ → f2/archives/semaine-5-13-19-avril-2026/ (si pas déjà présent)
- Option B: keep persona-level archives/ (already clean)
- BATCH-SEMAINE-6.md stays at root until S6 ends (26/04)
```

## 6.1 — Déplacements à effectuer

Ordre :

1. Vérifier que `f2/archives/semaine-5-13-19-avril-2026/` existe déjà (via `ls f2/archives/`). Il semble exister selon l'exploration.
   Si `f2/semaine-5-13-19-avril-2026/` à la racine persona existe encore ET contient du contenu pas présent dans l'archive → fusionner le contenu. Sinon déplacer directement.

2. Pour `romain/semaine-1/` :
   - Destination : `romain/archives/semaine-1-16-22-mars-2026/`
   - Vérifier que la destination existe déjà dans archives (d'après exploration oui).
   - Si la destination existe déjà avec du contenu différent : examiner fichier par fichier, fusionner les contenus uniques.
   - Si la destination existe avec les mêmes fichiers : supprimer le dossier source (`romain/semaine-1/`).

3. Pour `romain/semaine-2/` : même logique. Destination : `romain/archives/semaine-2-23-29-mars-2026/`.

4. Pour `romain/semaine-5/` : **destination à créer** : `romain/archives/semaine-5-13-19-avril-2026/`. Déplacer le contenu complet.

5. Pour `fabrice/semaine-1/`, `fabrice/semaine-2/`, `fabrice/semaine-5/` : idem traitement que romain/.

6. Pour `f2/semaine-5-13-19-avril-2026/` : déplacer vers `f2/archives/semaine-5-13-19-avril-2026/` (si la destination n'existe pas).

## 6.2 — Commandes git recommandées

Pour chaque déplacement :
```bash
git mv romain/semaine-5 romain/archives/semaine-5-13-19-avril-2026
```

Si le dossier destination existe déjà et qu'on doit fusionner :
```bash
# Comparer le contenu
diff -r romain/semaine-5 romain/archives/semaine-5-13-19-avril-2026
# Copier les fichiers uniques
cp -rn romain/semaine-5/* romain/archives/semaine-5-13-19-avril-2026/
# Vérifier que rien n'a été écrasé
# Supprimer le source
rm -rf romain/semaine-5
```

## 6.3 — Fichiers à NE PAS déplacer

Ces fichiers/dossiers RESTENT à la racine persona car ils représentent l'état courant :
- `{persona}/plan-hebdo.md` (plan de la semaine courante)
- `{persona}/progress-semaine.md` (progress courante)
- `{persona}/cross-engagement-tracker.md` (tracker courant)
- `{persona}/playbook-semaine.md` (playbook stable, pas hebdo)
- `{persona}/daily-checklist.md`
- `{persona}/system-prompt.md`
- `{persona}/VOIX.md`
- `{persona}/context.md`
- `{persona}/roadmap.md`
- Tous les sous-dossiers canal (`{persona}/twitter/`, etc.)
- `{persona}/cold/`, `{persona}/engagement/`, `{persona}/publication/`, `{persona}/tracking/`

## 6.4 — Racine du repo : `BATCH-SEMAINE-6.md`

TYPE : NE PAS DÉPLACER

Le BATCH S6 est ACTIF jusqu'au dimanche 26/04/2026 inclus. Il reste à la racine. Il sera archivé à la fin de la semaine (commit ultérieur, pas dans ce plan).

Règle future à ajouter quelque part (documenté au commit 8 dans ENTRYPOINT.md ou CLAUDE.md) : **dimanche soir de chaque fin de semaine, déplacer le BATCH-SEMAINE-N.md vers `archives/batches/` racine**.

## 6.5 — Création `archives/batches/` (préparation)

TYPE : CREE (dossier vide avec README)

Créer `archives/batches/` à la racine avec un petit README :

`archives/batches/README.md` :
```markdown
# Archives des batches hebdomadaires

Chaque dimanche soir de fin de semaine, le `BATCH-SEMAINE-N.md` actif à la racine est déplacé ici.

Format : `BATCH-SEMAINE-N.md` → `archives/batches/BATCH-SEMAINE-N.md`

Permet de garder l'historique des batches tout en gardant la racine propre.

**Dernière mise à jour : 21 avril 2026**
```

## 6.6 — Vérification finale Commit 6

Avant commit, Claude Code lance :
```bash
ls F2-Jarvis-main/romain/ | grep -E "^semaine-"
ls F2-Jarvis-main/fabrice/ | grep -E "^semaine-"
ls F2-Jarvis-main/f2/ | grep -E "^semaine-"
```

Résultats attendus : rien (ou que des dossiers de semaine courante, mais a priori aucun).

Les dossiers `{persona}/archives/semaine-N-dates/` contiennent maintenant tout l'historique.

Git commit avec message du Commit 6.

---

# COMMIT 7 — DOCUMENTATION F2-JARVIS (AUTOMATISATION)

**Objectif :** documenter proprement le système F2-Jarvis (app web + Claude Code setup + couche mémoire) pour qu'une IA neuve comprenne l'infrastructure sans lire le code.

**Commit message :**
```
docs: comprehensive F2-Jarvis automation documentation

- ui/jarvis/README.md: replace default Next.js README with full app doc
- backend/jarvis/README.md: create (currently missing)
- brain/README.md: enhance existing
- .claude/README.md: create (currently missing)
- ops/README.md: create (budget/kill-switches overview)
- patterns/README.md: create (technical decisions catalog)
```

## 7.1 — `ui/jarvis/README.md`

TYPE : REMPLACE-FICHIER
RAISON : le README actuel est celui par défaut de create-next-app, ZÉRO info métier.

CONTENU FINAL :
```markdown
# F2-Jarvis — Interface Web (Frontend)

**Statut :** ✅ En production
**URL :** https://f2-jarvis.vercel.app
**Stack :** Next.js 14 + TypeScript + Tailwind + Supabase Auth
**Rôle :** cockpit web agentique pour R et F — tableau de bord réseaux + chat Claude personnel.

---

## Vue d'ensemble

F2-Jarvis UI est l'interface web que Romain et Fabrice utilisent au quotidien depuis leur navigateur pour :

1. Tracker leurs publications, cold outreach, engagement, cross-engagement en temps réel
2. Chatter avec un Claude Agent personnalisé (persona Romain ou Fabrice)
3. Visualiser la timeline du jour, les compteurs vs targets, les alertes à résoudre
4. Lancer des actions de commit dans le repo via pattern Propose → Validate → Execute

Le frontend est un **proxy léger** vers le backend Railway. Le vrai cerveau (Claude Agent SDK, tools, écriture GitHub API) est côté `backend/jarvis/`.

---

## Architecture

```
Utilisateur (navigateur) → f2-jarvis.vercel.app (Next.js)
                                  ↓
                          API routes proxy (app/api/*)
                                  ↓
                          Backend Railway (backend/jarvis/)
                                  ↓
                    ┌─────────────┴──────────────┐
                    ↓                            ↓
            Claude Agent SDK            GitHub API (read/write repo)
                    ↓
            9 tools Jarvis
```

### Flux typique

1. User ouvre `/romain` ou `/fabrice`
2. Frontend charge contexte via `/api/context?persona=romain&mode=normal`
3. Backend retourne timeline + compteurs + alertes depuis le repo
4. User tape un message dans le chat (ex: "j'ai posté le post F2 de 14h")
5. Frontend POST vers `/api/chat` → backend → Claude Agent SDK
6. Claude reconnait le pattern (sur 33), propose une action `mark_published`
7. Action encodée dans un marker `[ACTION_PENDING:uuid]` dans la réponse
8. UI affiche un bouton "Valider" sur ce marker
9. User clique → `/api/action/execute` → backend commit sur GitHub
10. Timeline + compteurs mis à jour

---

## Pages

| Route | Rôle |
|-------|------|
| `/` | Écran d'accueil "Qui êtes-vous ? Romain / Fabrice" |
| `/login` | Auth Supabase (email magic link) |
| `/romain` | Dashboard Romain + toggle F2 mode + chat Claude persona Romain |
| `/fabrice` | Dashboard Fabrice + chat Claude persona Fabrice |

---

## Composants clés (`components/`)

| Composant | Rôle |
|-----------|------|
| `PersonaLayout.tsx` | Layout principal dashboard persona (timeline, compteurs, alertes, chat, toggle F2) |
| `Chat.tsx` | Chat Claude Agent streaming + rendering des `[ACTION_PENDING:uuid]` en boutons valider |
| `TimelineColumn.tsx` | Affichage timeline du jour (publications, cold, engagement) |
| `CounterTile.tsx` | Tuile compteur avec progress bar vs target |
| `OuroborosPanel.tsx` | Panneau Ouroboros (diary, proposals, kill-switches) |
| `OuroborosProposalsModal.tsx` | Modale review proposals Ouroboros |
| `MemPalaceView.tsx` | Explorateur wings/drawers/rooms MemPalace |
| `GraphifyView.tsx` + `RepoGraph3D.tsx` | Visualisation knowledge graph du repo |
| `FileViewerModal.tsx` | Modale viewer .md du repo |

---

## API Routes (`app/api/`)

Toutes les routes sont des proxys authentifiés vers le backend Railway avec header `X-JARVIS-AUTH`.

| Route | Méthode | Proxy vers | Rôle |
|-------|---------|-----------|------|
| `/api/chat` | POST | `$BACKEND/chat` | Stream Claude Agent response |
| `/api/chat/history` | GET | `$BACKEND/chat/history` | Historique conversation |
| `/api/context` | GET | `$BACKEND/context` | Timeline + compteurs + alertes |
| `/api/action/propose` | POST | `$BACKEND/action/propose` | Crée action pending |
| `/api/action/execute` | POST | `$BACKEND/action/execute` | Exécute action validée |
| `/api/action/reject` | POST | `$BACKEND/action/reject` | Rejette action pending |
| `/api/graph` | GET | `$BACKEND/graph` | Repo knowledge graph nodes |
| `/api/graphify/*` | GET | `$BACKEND/graphify/*` | Graphify search/related/node |
| `/api/mempalace/*` | GET | `$BACKEND/mempalace/*` | MemPalace wings/drawers/stats |
| `/api/ouroboros/*` | GET/POST | `$BACKEND/ouroboros/*` | Ouroboros status/proposals/diary/kill-switch |
| `/api/file` | GET | `$BACKEND/file` | Lit un fichier du repo |
| `/api/search` | POST | `$BACKEND/search` | Recherche full-text repo |
| `/api/commit-batch` | POST | (direct) | Commit batch fichiers vers GitHub |
| `/api/auth/me` + `/api/auth/logout` | GET/POST | Supabase | Auth |

---

## Variables d'environnement (Vercel)

```
RAILWAY_BACKEND_URL         # URL du backend Express Railway
BACKEND_SHARED_SECRET       # Secret partagé avec backend (header X-JARVIS-AUTH)
NEXT_PUBLIC_SUPABASE_URL    # Projet Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Développement local

```bash
cd ui/jarvis
npm install
npm run dev
# http://localhost:3000
```

## Déploiement

Auto-deploy Vercel sur push `main`. Pas de CI séparée. Logs dans Vercel dashboard.

---

## Pattern Propose → Validate → Execute

C'est le cœur de Jarvis : **Claude ne commit JAMAIS dans le repo tout seul**.

1. Claude détecte un pattern (ex: user dit "j'ai posté X") parmi 33 patterns
2. Claude appelle `propose_action(action_type, params, preview)` via son tool
3. Backend crée une row `pending_action` en DB, retourne un UUID
4. Claude inclut `[ACTION_PENDING:uuid]` dans sa réponse textuelle
5. Frontend parse le marker, affiche un bouton "Valider"
6. User clique Valider → `POST /api/action/execute` avec l'UUID
7. Backend exécute (écrit sur GitHub API via `lib/github.ts`)
8. Timeline/compteurs rafraîchis

Avantage : contrôle humain final, zéro action "magique" non validée, audit trail complet.

---

## Références cross-repo

- Backend : `backend/jarvis/` (Express Railway, vrai cerveau)
- Couche mémoire : `brain/` (MemPalace + Ouroboros + mem0)
- Config Claude Code : `.claude/` (agents, commands, skills pour le terminal F)
- Principes : `BIBLE.md` (racine)
- Parent stratégique : `strategie/CONTEXT.md`

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.2 — `backend/jarvis/README.md`

TYPE : CREE
RAISON : n'existe pas actuellement.

CONTENU FINAL :
```markdown
# F2-Jarvis — Backend Railway

**Statut :** ✅ En production
**Stack :** Node.js + Express + TypeScript + Claude Agent SDK + GitHub API + Supabase
**Rôle :** vrai cerveau de Jarvis — exécute les agents Claude, commit dans le repo, gère MemPalace et Ouroboros.

---

## Vue d'ensemble

Le backend est un serveur Express déployé sur Railway. C'est lui qui :

1. Fait tourner le Claude Agent SDK avec le system prompt persona (Romain, Fabrice, F2)
2. Expose 9 tools à Claude (`repo_read`, `repo_search`, `timeline_today`, `counters_today`, `propose_action`, `repo_search_voice_examples`, etc.)
3. Écrit dans le repo GitHub via l'API (pattern Propose → Validate → Execute)
4. Gère la mémoire persistante (MemPalace = verbatim, mem0 = facts, Ouroboros = proposals)
5. Génère le knowledge graph du repo (Graphify)

Le frontend Vercel (`ui/jarvis/`) est juste un proxy léger vers ce backend.

---

## Endpoints principaux

### Chat

- `POST /chat` — Stream response du Claude Agent. Body : `{ persona, mode, message, image? }`
- `GET /chat/history` — Historique conversation par persona

### Contexte

- `GET /context?persona=romain&mode=normal` — Timeline + compteurs + alertes + planning F2

### Actions (pattern Propose → Validate → Execute)

- `POST /action/propose` — Crée une action pending (avant validation user)
- `POST /action/execute` — Exécute une action validée (écrit sur GitHub)
- `POST /action/reject` — Rejette une action pending

### Repo exploration

- `GET /file?path=...` — Lit un fichier du repo
- `POST /search` — Recherche full-text
- `GET /graph` — Nœuds du knowledge graph

### Graphify

- `GET /graphify` — Graphe complet
- `GET /graphify/node/:id` — Détail nœud
- `GET /graphify/search?q=...` — Recherche sémantique
- `GET /graphify/related?node=...` — Nœuds reliés

### MemPalace

- `GET /mempalace/wings` — Liste wings (personnes, SaaS, projets)
- `GET /mempalace/wing/:id` — Détail wing
- `GET /mempalace/drawer/:wing/:filename` — Contenu drawer
- `GET /mempalace/stats` — Stats globales

### Ouroboros

- `GET /ouroboros/status` — État (actif / kill-switch / cycle en cours)
- `GET /ouroboros/proposals` — Liste proposals Ouroboros en attente
- `GET /ouroboros/proposal/:id` — Détail proposal
- `POST /ouroboros/action` — Accepte/rejette une proposal
- `POST /ouroboros/trigger` — Déclenche un cycle manuel (normalement nocturne)
- `POST /ouroboros/kill-switch` — Active/désactive le kill-switch
- `GET /ouroboros/diary` — Journal Ouroboros
- `POST /ouroboros/initialize` — Init après premier déploiement

---

## Structure code (`src/`)

```
src/
├── server.ts                   # Express app, routing, auth middleware
├── routes/                     # Handlers par endpoint
│   ├── chat.ts                 # Le plus important — builds system prompt, streams Claude Agent
│   ├── chat-history.ts
│   ├── context.ts              # Agrège timeline + compteurs + alertes depuis le repo
│   ├── action.ts, action-propose.ts, action-execute.ts, action-reject.ts
│   ├── graph.ts, graphify.ts
│   ├── file.ts, search.ts
│   ├── mempalace.ts
│   └── ouroboros.ts
└── lib/
    ├── jarvis-tools.ts         # Les 9 tools exposés à Claude Agent (mcp server)
    ├── jarvis-memory.ts        # Conversation storage (Supabase)
    ├── action-executor.ts      # Logique d'exécution des actions validées
    ├── github.ts               # Wrapper GitHub API (read/write repo)
    ├── markdown.ts             # Parsing .md (frontmatter, sections)
    ├── mempalace.ts            # Logique MemPalace
    ├── cache.ts                # Cache en mémoire
    ├── supabase.ts             # Client Supabase server
    └── context-types.ts        # Types partagés avec le frontend
```

---

## Les 9 tools exposés à Claude Agent

Définis dans `lib/jarvis-tools.ts` et enregistrés comme MCP server à la conf du Claude Agent SDK.

1. `repo_read(path)` — lit un fichier
2. `repo_search(query)` — recherche full-text
3. `repo_search_voice_examples(persona, angle)` — retrouve des extraits de posts passés pour calibrer un output
4. `timeline_today(persona)` — activités du jour
5. `counters_today(persona)` — compteurs vs targets
6. `alerts_today(persona)` — alertes en attente
7. `propose_action(action_type, params, preview)` — propose une modification du repo (avec validation humaine)
8. `recent_history(persona, limit)` — historique conversation récent
9. `mempalace_query(wing, query)` — query sémantique dans MemPalace

Liste complète des `action_type` acceptés : voir `lib/action-executor.ts`.

---

## Les 33 patterns de reconnaissance

Encodés dans le system prompt du chat (`routes/chat.ts`). Exemples :

- "j'ai posté/publié X" → `mark_published`
- "grok m'a sorti liste" → parse + `queue_cold_targets`
- "@X a répondu" → `update_cold_reply`
- Screenshot reply Twitter → génère 2 variants en voix persona
- "résumé / bilan" → synthèse timeline + compteurs + history
- etc.

Liste complète : section "33 PATTERNS DE RECONNAISSANCE" dans le system prompt.

---

## Variables d'environnement (Railway)

```
PORT=3001
ALLOWED_ORIGIN=https://f2-jarvis.vercel.app
BACKEND_SHARED_SECRET=...             # Partagé avec le frontend
ANTHROPIC_API_KEY=...                 # Pour Claude Agent SDK
GITHUB_TOKEN=...                      # PAT avec scope repo
GITHUB_REPO_OWNER=altidigitech-ui
GITHUB_REPO_NAME=F2-Jarvis
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...              # Server-side only
CLAUDE_CODE_EXECUTABLE=/app/node_modules/...  # Binaire Claude pour SDK
```

## Déploiement

Railway auto-deploy sur push. `railway.toml` à la racine du backend. Dockerfile inclus.

Healthcheck : `GET /health` renvoie `{status: "ok"}`.

---

## Sécurité

- Middleware `X-JARVIS-AUTH` sur toutes les routes sauf `/health` (secret partagé)
- CORS restreint à `ALLOWED_ORIGIN` (le frontend Vercel)
- `X-USER-ID` transmis depuis le frontend après auth Supabase
- GitHub token limité au scope `repo` sur `altidigitech-ui/F2-Jarvis` uniquement

---

## Références cross-repo

- Frontend : `ui/jarvis/`
- Couche mémoire : `brain/`
- Config Claude Code : `.claude/` (utilisée par F dans le terminal, séparée de ce backend)
- Patterns techniques : `patterns/`
- Monitoring & budget : `ops/`

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.3 — `brain/README.md`

TYPE : EDIT-SECTION ou REMPLACE-FICHIER selon existant

Le fichier existe déjà (mentionné dans grep). Vérifier son contenu et l'améliorer pour qu'il explique clairement les 3 composants (Ouroboros, MemPalace, mem0) et leur rôle.

**ATTENTION À LA NESTING MARKDOWN :** le contenu du README contient un bloc ASCII tree à l'intérieur d'un contexte déjà encadré. Dans le fichier final, utiliser des blocs ``` standard pour l'ASCII tree (pas de nesting). Voici le contenu final exact à écrire dans `brain/README.md` :

~~~markdown
# brain/ — Couche cognitive F2-Jarvis

**Rôle :** mémoire persistante et système de proposition autonome de Jarvis.

---

## 3 composants

### Ouroboros — `brain/ouroboros/`

Conscience de fond BRIDÉE. Lit le repo en read-only. Écrit UNIQUEMENT dans son sandbox.

**Ce qu'il fait :**
- 1 cycle par nuit (2h-5h CEST, Haiku, 10-30 min, ~0,30€/cycle)
- Analyse le repo, détecte patterns, génère des proposals dans `proposals/`
- Fabrice valide/rejette via `/review-proposals` en Claude Code terminal

**Ce qu'il ne fait pas :**
- Jamais de commit, push, API externe en write
- Jamais d'action hors de `brain/ouroboros/{proposals,diary,state}/`
- Kill-switch disponible : `ops/kill-switches/ouroboros.flag`

Constitution : `brain/ouroboros/identity.md` + `brain/ouroboros/bible.md`.

### MemPalace — `brain/mempalace/`

Archive verbatim. Organisée en wings (personnes, SaaS, projets) → rooms (jour/session) → drawers (contenu).

**Ce qu'il fait :**
- Sauvegarde chaque conversation Jarvis en contenu verbatim
- Semantic search local via ChromaDB (zéro API par query)
- Explorable depuis l'UI (`/romain` ou `/fabrice` → bouton MemPalace)

**Structure :**

```
mempalace/
├── wings/            # Personnes, SaaS, projets
│   ├── romain/
│   ├── fabrice/
│   ├── storemd/
│   └── ...
├── drawers/          # Contenus détaillés
└── rooms/            # Sessions datées
```

### mem0 — `brain/mem0/`

Extraction de faits structurés (JSONL). Optionnel V1.

Permet d'extraire des triplets (sujet, prédicat, objet) des conversations pour queries rapides.

---

## Kill-switches

Chaque système a son kill-switch dans `ops/kill-switches/` :
- `ouroboros.flag`
- `mempalace.flag`
- `global.flag` (cut tout)

Auto-activés par `f2-accountant` si budget dérive (90% → ouroboros, 100% → global).

---

## Références

- Backend qui gère tout : `backend/jarvis/`
- Frontend qui explore : `ui/jarvis/components/MemPalaceView.tsx`, `OuroborosPanel.tsx`
- Config budget : `ops/budget/limits.yaml`

---

**Dernière mise à jour : 21 avril 2026**
~~~

Si le fichier actuel est déjà proche, juste ajouter la bannière de date et harmoniser.

## 7.4 — `.claude/README.md`

TYPE : CREE
RAISON : n'existe pas.

CONTENU FINAL :
```markdown
# .claude/ — Configuration Claude Code

**Rôle :** setup Claude Code que F utilise en terminal. **Distinct** de l'app web F2-Jarvis (`ui/jarvis/`).

---

## Contexte

Fabrice utilise Claude Code localement avec le plan Anthropic Max 5x. Ce dossier `.claude/` est lu à chaque session Claude Code et configure :

1. Les **skills** always-on (chargés automatiquement)
2. Les **skills** on-demand (activés par contexte ou slash command)
3. Les **agents spécialisés** (Task tool, contexte isolé)
4. Les **slash commands** personnalisés
5. Les **hooks** bash (pre-tool-use, post-commit, session-stop, etc.)

**Ce n'est PAS la même chose que l'app web Jarvis.** L'app web tourne sur Vercel + Railway et a son propre Claude Agent SDK côté backend. Claude Code (`.claude/`) tourne en terminal.

---

## Skills (`.claude/skills/`, 16 total)

**Always-on** (chargés à chaque session) :
- `graphify` — knowledge graph du repo
- `handoff-writer` — écrit HANDOFF.md automatiquement
- `f2-brand-voice` — voix F2 pour tout contenu généré

**On-demand** (activés par contexte ou slash command) :

*Design :* `ui-ux-pro-max`, `frontend-design`, `shadcn-ui`, `web-interface-guidelines`, `web-accessibility`, `brain-3d-renderer`
*Stack :* `shopify-gql`, `supabase-rls`, `stripe-integration`
*Marketing :* `marketing-fr` (voix Romain), `marketing-en` (voix Fabrice)
*Ops :* `saas-launch-checklist`, `context-md-generator`

Ordre d'activation pour UI : `ui-ux-pro-max` → `frontend-design` → `shadcn-ui` → `web-interface-guidelines` + `web-accessibility`.

---

## Agents spécialisés (`.claude/agents/`, 7 total)

À déléguer via la Task tool pour isoler le contexte.

| Agent | Rôle | Modèle |
|-------|------|--------|
| `f2-architect` | Décisions techniques, trade-offs | Sonnet |
| `f2-dev` | Implémentation code production-ready | Sonnet |
| `f2-designer` | UI/UX (charge les 4 skills design) | Sonnet |
| `f2-marketer` | Posts, UTM, voix R/F | Sonnet |
| `f2-auditor` | Post-mortem, audit fin de cycle | Sonnet |
| `f2-librarian` | Retrieval dans le repo | Haiku |
| `f2-accountant` | Budget, tokens, coûts | Haiku |

---

## Slash commands (`.claude/commands/`, 9 total)

| Command | Rôle |
|---------|------|
| `/morning` | Brief du jour (SaaS, décisions, posts à publier, 3 priorités) |
| `/status` | État complet F2 (plus long que /morning) |
| `/launch <saas>` | Checklist de lancement |
| `/debrief` | Post-mortem structuré via f2-auditor |
| `/graphify-all` | Réindexation Graphify (`--force` pour full rebuild) |
| `/budget` | Dépenses tokens par service |
| `/review-proposals` | Valide/rejette les propositions Ouroboros |
| `/jarvis` | Méta-commandes (status système, reload skills) |
| `/handoff` | Écrit HANDOFF.md pour session suivante |

---

## Hooks (`.claude/hooks/`, 6 total)

Scripts bash exécutés à des moments clés :
- `budget-check.sh` — vérification budget avant tool use coûteux
- `mempalace-save.sh` — save session dans MemPalace
- `post-commit-graphify.sh` — réindexe Graphify après commit
- `pre-tool-use-graphify.sh` — check knowledge graph avant tool use
- `precompact-save.sh` — save avant /compact
- `session-stop-handoff.sh` — écrit HANDOFF.md à la fin de session

---

## Model tiering (discipline budget)

- **Haiku** par défaut : retrieval, résumé, classification, tagging
- **Sonnet** : code, archi, créatif
- **Opus** : UNIQUEMENT si le prompt contient "opus", "ultrathink", "critical decision", ou `--model opus`. Jamais d'auto-escalade.

Config : `ops/monitoring/model-tier-rules.yaml`.

---

## Budget

- **Plan :** Anthropic Max 5x (100 $/mois ≈ 90 €)
- **Budget incrémental hors plan :** 30 €/mois max
- **Caps par service :** ouroboros 10 €, graphify 5 €, mempalace 2 €, mcp_external 8 €, buffer 5 €

Config : `ops/budget/limits.yaml`. Historique : `ops/budget/history.csv`.

---

## Workflow typique F en Claude Code

```bash
# Démarrage session
/morning                    # Brief du jour

# Pendant la session
# (Claude Code charge automatiquement CLAUDE.md + BIBLE.md + skills always-on)

# Quand besoin spécifique
/launch storemd             # Checklist lancement
/budget                     # Check budget
/review-proposals           # Valider Ouroboros

# Avant /clear ou /compact
/handoff                    # Écrit HANDOFF.md

# Fin de session
# (hooks session-stop-handoff.sh s'exécute automatiquement)
```

---

## Références cross-repo

- CLAUDE.md racine : instructions permanentes lues à chaque session
- BIBLE.md racine : 13 principes non-négociables
- App web séparée : `ui/jarvis/` + `backend/jarvis/`
- Couche mémoire partagée : `brain/`

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.5 — `ops/README.md`

TYPE : CREE si n'existe pas, sinon EDIT-SECTION

CONTENU FINAL :
```markdown
# ops/ — Discipline budget et kill-switches

**Rôle :** garde-fous financiers et opérationnels de F2-Jarvis.

---

## Contenu

### `ops/budget/`

- `limits.yaml` — caps mensuels par service (ouroboros 10€, graphify 5€, mempalace 2€, mcp_external 8€, buffer 5€). Total budget incrémental hors plan : 30 €/mois.
- `history.csv` — historique des dépenses tokens/jour/service. **NE PAS MODIFIER MANUELLEMENT.** Rempli automatiquement par `f2-accountant`.

### `ops/kill-switches/`

- `ouroboros.flag` — si présent, Ouroboros ne tourne pas
- `mempalace.flag` — si présent, MemPalace ne save rien
- `graphify.flag` — si présent, Graphify ne réindexe pas
- `global.flag` — si présent, cut tout (nucléaire)

Auto-activés par `f2-accountant` si budget dérive :
- 90% du budget → `ouroboros.flag`
- 100% du budget → `global.flag`

### `ops/monitoring/`

- `model-tier-rules.yaml` — règles de routage Haiku/Sonnet/Opus
- `cache-policy.md` — TTL du cache des fichiers (CLAUDE.md 1h, skills on-demand 5min, etc.)

---

## Références

- Check budget : `/budget` slash command
- Config BIBLE.md §11 : budget incrémental plafonné 30 €/mois
- Agent responsable : `.claude/agents/f2-accountant.md`

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.6 — `patterns/README.md`

TYPE : CREE si n'existe pas, sinon EDIT-SECTION

CONTENU FINAL :
```markdown
# patterns/ — Patterns techniques décisionnels

**Rôle :** catalogue des décisions techniques prises par F, durcies en patterns réutilisables pour éviter de refaire les mêmes recherches/erreurs.

---

## Patterns actifs

Lister dynamiquement via `ls patterns/*.md`. Chaque fichier = 1 pattern. Exemples :

- `bitwarden-secrets-management.md` — gestion des secrets via Bitwarden CLI
- `shopify-rest-is-dead.md` — migrer tout vers GraphQL (REST déprécié 2024)
- (etc. selon contenu réel)

---

## Convention

Chaque pattern .md contient :
- **Contexte** — problème rencontré
- **Décision** — ce qu'on a choisi
- **Raison** — pourquoi
- **Alternatives rejetées** — et pourquoi
- **Conséquences** — ce que ça implique pour le futur

---

## Quand créer un nouveau pattern

- Décision technique qui a pris > 2h de recherche
- Erreur qu'on a déjà faite et qu'on ne veut plus refaire
- Convention qui doit être respectée dans tous les futurs SaaS

---

## Références

- Cette doc sert aux agents `.claude/agents/f2-architect.md` et `f2-dev.md`
- CLAUDE.md §5 mentionne ce dossier

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.7 — `tracking/README.md`

TYPE : CREE ou EDIT-SECTION

CONTENU FINAL :
```markdown
# tracking/ — Tracking hebdo & décisions Jarvis

**Rôle :** données opérationnelles Jarvis — dashboard hebdo, decisions-log, UTM, growth tracker.

---

## Contenu

- `dashboard-hebdo.md` — métriques hebdo consolidées (publications, cold, engagement, conversions)
- `decisions-log.md` — log des décisions prises via pattern Propose/Validate/Execute
- `UTM-tracking.md` (ou équivalent) — tracking UTM par produit / campagne
- `Growth-Tracker.xlsx` (si présent) — tracking global

---

## Lecture / écriture

- Alimenté automatiquement par le backend Jarvis (via GitHub API, pattern Propose → Validate → Execute)
- Lu par `f2-accountant`, `f2-auditor`, et l'app web Jarvis
- **NE PAS MODIFIER MANUELLEMENT** les fichiers auto-alimentés

---

## Références

- Backend qui écrit : `backend/jarvis/src/lib/action-executor.ts`
- App web qui affiche : `ui/jarvis/components/PersonaLayout.tsx`

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.8 — `raw/README.md`

TYPE : CREE ou EDIT-SECTION

CONTENU FINAL :
```markdown
# raw/ — Inbox brute Jarvis

**Rôle :** zone de dépôt pour contenus bruts non traités (transcripts, screenshots, notes dictées).

---

## Convention

- Contenu non versionné par défaut (voir `.gitignore`)
- Utilisé comme zone de transit : Jarvis / MemPalace consomment, extraient les insights, puis classent dans `brain/mempalace/wings/...`
- Ne JAMAIS référencer un fichier de `raw/` dans un document publié ou dans une stratégie — c'est éphémère

---

## Format typique

- Transcripts audio (conversations client, brainstorms)
- Screenshots de résultats Grok, threads Twitter, DMs intéressants
- Notes Markdown brutes à digérer

---

## Références

- MemPalace consomme : `brain/mempalace/`
- Skill responsable : `.claude/skills/context-md-generator/`

---

**Dernière mise à jour : 21 avril 2026**
```

## 7.9 — Vérification finale Commit 7

Après création des READMEs, Claude Code vérifie :
```bash
ls F2-Jarvis-main/ui/jarvis/README.md F2-Jarvis-main/backend/jarvis/README.md F2-Jarvis-main/brain/README.md F2-Jarvis-main/.claude/README.md F2-Jarvis-main/ops/README.md F2-Jarvis-main/patterns/README.md F2-Jarvis-main/tracking/README.md F2-Jarvis-main/raw/README.md
```

Tous doivent exister.

Git commit avec message du Commit 7.

---

# COMMIT 8 — README RACINE + CLAUDE.md AJUSTÉ + ENTRYPOINT.md

**Objectif :** la porte d'entrée du repo. Tout nouveau lecteur (humain ou IA) doit comprendre le repo en 10 min max.

**Commit message :**
```
docs: root navigation — README + CLAUDE + ENTRYPOINT for zero-context onboarding

- README.md: complete rewrite covering BOTH F2-Jarvis (infra) AND FoundryTwo (content)
- CLAUDE.md: minor adjustments (date, portfolio aligned, BIP posture updated)
- ENTRYPOINT.md: new file — 10-min onboarding for any AI or human joining fresh
- Remove AUDIT.md if no longer relevant (residus du merge initial)
```

## 8.1 — `README.md` racine (RÉÉCRITURE COMPLÈTE)

TYPE : REMPLACE-FICHIER

CONTENU FINAL :
```markdown
# F2-Jarvis

Repo unifié du studio **FoundryTwo**. Contient DEUX systèmes partageant la même racine :

1. **F2-Jarvis (infra)** — cockpit web agentique, Claude Code setup, couche mémoire, budget & kill-switches
2. **FoundryTwo (contenu opérationnel)** — stratégie, produits, marketing, distribution, comptes persos et studio

---

## Démarrage rapide

**Vous débarquez à zéro ? Lisez d'abord `ENTRYPOINT.md`.**

Il vous guide en 10 minutes vers une compréhension globale.

---

## Les fichiers source de vérité

| Fichier | Rôle |
|---------|------|
| `ENTRYPOINT.md` | **Porte d'entrée** — lisez ce fichier en premier |
| `BIBLE.md` | Principes non-négociables. Fabrice seul l'édite |
| `ANTI-IA.md` | Règle #0 : anti-détection IA. Prime sur tout contenu généré |
| `strategie/CONTEXT.md` | Source de vérité stratégique parent |
| `produits/STATUS.md` | Source de vérité portfolio produits |
| `CLAUDE.md` | Instructions permanentes pour Claude Code (terminal F) |

---

## Arborescence (vue macro)

```
F2-Jarvis/
│
│  ─── PORTE D'ENTRÉE ───
├── ENTRYPOINT.md          ← LISEZ CE FICHIER EN PREMIER
├── README.md              ← Vous êtes ici
├── CLAUDE.md              ← Instructions Claude Code (terminal)
├── BIBLE.md               ← 13 principes non-négociables
├── ANTI-IA.md             ← Règle #0 anti-détection
├── VISUELS.md             ← Algo visuel
├── ARCH.md                ← Arbre ASCII généré
├── AUDIT.md               ← Checklist résidus merge (à supprimer après cleanup 21/04)
├── HANDOFF.md             ← Passage de relais entre sessions Claude Code
├── BATCH-SEMAINE-N.md     ← Batch hebdo en cours (archivé dimanche soir)
│
│  ─── F2-JARVIS (AUTOMATISATION / INFRA) ───
├── ui/                    ← Frontends : jarvis/ (app web principale), brain-3d/, web/
│   └── jarvis/            ← ✅ App Next.js Vercel (f2-jarvis.vercel.app)
├── backend/               ← Backends Jarvis
│   └── jarvis/            ← ✅ Express Railway (vrai cerveau)
├── brain/                 ← Couche cognitive : ouroboros/, mempalace/, mem0/
├── .claude/               ← Config Claude Code : skills/ (16), agents/ (7), commands/ (9), hooks/ (6)
├── ops/                   ← Discipline : budget/, monitoring/, kill-switches/
├── patterns/              ← Décisions techniques durcies
├── tracking/              ← Dashboard hebdo, decisions-log, UTM
├── raw/                   ← Inbox brute (non versionné par défaut)
├── graphify-out/          ← Output Graphify (généré)
├── supabase-migrations/   ← Migrations DB
│
│  ─── FOUNDRYTWO (CONTENU OPÉRATIONNEL) ───
├── strategie/             ← Source de vérité stratégique (CONTEXT, PLAYBOOK, WARMING-FARMING, verticals/)
├── produits/              ← Source de vérité portfolio (STATUS, MUTATIONS, NOUVEAUX, PRINCIPES-ANTI-CONCURRENTS)
├── marketing/             ← Marketing macro (funnel, pipeline)
├── growth-marketing/      ← Algos + context par plateforme (twitter, linkedin, ih, ph, tiktok)
├── distribution/          ← Règles Reddit + Facebook
│
├── f2/                    ← Compte studio @foundrytwo (R gère)
├── romain/                ← R — full-time, angle growth
├── fabrice/               ← F — full-time, angle technique
│
├── saas/                  ← Contexte par SaaS
├── la-toile/              ← Architecture réseau (Altistone INVISIBLE)
├── asset-brand/           ← Identité de marque (brand bible, logo, guidelines)
│
└── archives/              ← Archives globales (batches, vieilles semaines)
```

---

## Chemins de lecture

### Vous êtes une IA qui débarque à zéro

1. `ENTRYPOINT.md` (10 min)
2. `BIBLE.md` (5 min)
3. `strategie/CONTEXT.md` (15 min)
4. `produits/STATUS.md` (2 min)

→ Vous comprenez 90% du système.

### Vous voulez comprendre l'infra F2-Jarvis

1. `ui/jarvis/README.md`
2. `backend/jarvis/README.md`
3. `brain/README.md`
4. `.claude/README.md`
5. `ops/README.md`

### Vous êtes R ou F et ouvrez votre journée

1. `{vous}/plan-hebdo.md`
2. `{vous}/playbook-semaine.md`
3. `{vous}/daily-checklist.md`
4. `{vous}/{canal}/` selon la journée
5. `{vous}/tracking/` pour logger

### Vous gérez @foundrytwo (R)

1. `f2/context.md`
2. `f2/plan-hebdo.md`
3. `f2/{canal}/` pour le canal du jour
4. `BATCH-SEMAINE-N.md` pour le batch en cours

### Vous êtes Claude Code (terminal F)

1. `CLAUDE.md` (lu automatiquement)
2. `BIBLE.md` (lu automatiquement)
3. Skills always-on chargés : graphify, handoff-writer, f2-brand-voice
4. Slash commands disponibles : `/morning`, `/status`, `/launch`, `/debrief`, `/handoff`, etc.

---

## Conventions

- **Héritage strict** : chaque fichier hérite d'un parent. Bannière `> Hérite de : X` obligatoire.
- **Langue** : docs internes en FR, contenu publié en EN (marché US/EU).
- **Validation** : aucune modif opérationnelle sans `validé`, `go`, ou `ok` explicite de F.
- **Voix séparées** : R ≠ F ≠ F2 ≠ Produits. Vocabulaire exclusif par voix.
- **Zéro donnée inventée** : pas de faux MRR, pas de testimonials inventés (BIBLE.md §3).
- **Sales-mode dominant** : build-in-public réservé au format vendredi F2 Studio Update.

---

## État au 21/04/2026

| Dossier | État | Note |
|---------|------|------|
| `strategie/` | ✅ complet, parent |  |
| `produits/` | ✅ complet | StoreMD ✅ Live depuis 14/04 |
| `distribution/` | 🔨 minimal | À enrichir |
| `marketing/` | 🔨 léger | À enrichir |
| `growth-marketing/` | ✅ complet | Algos + stratégies par plateforme |
| `f2/` | ✅ complet |  |
| `romain/` | ✅ complet |  |
| `fabrice/` | ✅ complet |  |
| `saas/` | ✅ complet |  |
| `la-toile/` | ✅ complet |  |
| `asset-brand/` | ✅ complet |  |
| `ui/jarvis/` | ✅ En prod (Vercel) |  |
| `backend/jarvis/` | ✅ En prod (Railway) |  |
| `brain/` | ✅ Opérationnel | Ouroboros nocturne, MemPalace actif |
| `.claude/` | ✅ Configuré | 16 skills, 7 agents, 9 commands, 6 hooks |
| `archives/` | ✅ propre | Cleanup 21/04 exécuté |
| TikTok (f2/tiktok/, growth-marketing/tiktok/) | ⏸ SUSPENDU | Pipeline vidéo en construction |

---

## Phase actuelle

**Semaine 6 (20-26 avril 2026).** StoreMD en scale sales-mode agressif. BATCH hebdo actif : `BATCH-SEMAINE-6.md` (racine).

**Prochain lancement produit :** ProfitPilot (fin avril / mai).

**Objectif août 2026 :** 6 SaaS live, liberté financière atteinte.

---

## Support

- **Studio :** FoundryTwo
- **Repo :** github.com/altidigitech-ui/F2-Jarvis
- **Fondateurs :** Romain Delgado (R) + Fabrice Gangi (F)
- **Contact Fabrice :** CTO/Builder
- **Contact Romain :** CEO/Growth

**F2-Jarvis = OS interne. FoundryTwo = identité publique.**
```

## 8.2 — `CLAUDE.md` racine (AJUSTEMENTS)

TYPE : EDIT-SECTION
RAISON : le fichier est déjà bien structuré (268 lignes). On ajuste juste ce qui a changé.

### 8.2.1 — Mise à jour date

CHERCHER : `> Dernière mise à jour : 19 avril 2026.`
REMPLACER PAR : `> Dernière mise à jour : 21 avril 2026.`

### 8.2.2 — §2bis retrait "build in public"

CHERCHER (dans §2bis Fabrice ou F2) :
```
- Rôle : hub central, build in public, milestones
```

REMPLACER PAR :
```
- Rôle : hub central, sales-mode dominant, Friday Studio Update (build-in-public format réservé, règle stricte BIBLE.md §3), milestones
```

### 8.2.3 — §3 Structure du repo

Vérifier que le §3 mentionne `backend/` et `ui/jarvis/`. Actuellement, CLAUDE.md §3 mentionne `ui/` générique. Ajouter une ligne pour `backend/` :

CHERCHER :
```
├── ui/                       ← Frontends internes (web/, brain-3d/)
```

REMPLACER PAR :
```
├── ui/                       ← Frontends internes : jarvis/ (app Vercel), brain-3d/, web/
├── backend/                  ← Backends : jarvis/ (Express Railway, vrai cerveau Jarvis)
```

### 8.2.4 — §4 Sources de vérité

Vérifier que `produits/STATUS.md` est bien listé. Ajouter au besoin.

### 8.2.5 — §5 Infrastructure AI — ajouter lien vers les READMEs

Ajouter en tête de §5 :

```markdown
## §5 — Infrastructure AI F2-Jarvis

> **Pour une doc détaillée, voir :**
> - `ui/jarvis/README.md` — Frontend web
> - `backend/jarvis/README.md` — Backend Railway
> - `brain/README.md` — Couche mémoire
> - `.claude/README.md` — Config Claude Code
> - `ops/README.md` — Budget & kill-switches
```

(Garder le reste du §5 tel quel.)

### 8.2.6 — Vérifier alignement portfolio

Vérifier que CLAUDE.md ne mentionne pas les anciens produits. Si oui, corriger. Préserver la mention "Pivot stratégique du 03/04/2026" (historique).

## 8.3 — `ENTRYPOINT.md` (NOUVEAU FICHIER)

TYPE : CREE

CONTENU FINAL :
```markdown
# ENTRYPOINT.md

> **Porte d'entrée du repo F2-Jarvis.**
> Si vous débarquez à zéro (humain ou IA), LISEZ CE FICHIER EN PREMIER.
> Temps de lecture : 10 minutes. Après ça, vous comprenez 90% du système.

**Dernière mise à jour : 21 avril 2026**

---

## En 30 secondes

Ce repo contient :

1. **F2-Jarvis** — infrastructure automatisation d'un studio SaaS indie (app web agentique + Claude Code setup + couche mémoire)
2. **FoundryTwo** — le contenu opérationnel dudit studio : stratégie, produits, marketing, distribution

Deux co-fondateurs full-time : **Romain (R, Growth)** et **Fabrice (F, CTO/Builder)**. Objectif : 6 SaaS en 3 verticales d'ici juin 2026, liberté financière août 2026.

---

## Les 4 vérités à retenir

### 1. Il y a UNE source de vérité stratégique : `strategie/CONTEXT.md`

Tous les autres documents (marketing, growth, per-compte, per-plateforme) en héritent. En cas de contradiction, **`strategie/CONTEXT.md` prime.**

### 2. Il y a UNE source de vérité produits : `produits/STATUS.md`

Portfolio officiel : **6 SaaS sur 3 verticales**.

| # | SaaS | Vertical | Mois | Statut |
|---|------|----------|------|--------|
| 1 | **StoreMD** | E-commerce | M1 avril | ✅ Live (14/04/2026) |
| 2 | ProfitPilot | E-commerce | M1 avril | ⏳ Backlog |
| 3 | ClientPulse | Agences | M2 mai | ⏳ Backlog |
| 4 | AdAudit | Agences | M2 mai | ⏳ Backlog |
| 5 | CreatorSuite | Creators | M3 juin | ⏳ Backlog |
| 6 | LeadQuiz | E-com + Coaches | M3 juin | ⏳ Backlog |

**Ignorer toute autre mention de produits dans d'anciens documents** (si un doc parle de Leak Detector, SpeedAudit, InventoryPulse, ChargebackDefender, etc. — ce sont des traces d'itérations passées, pas le portfolio actif).

### 3. Il y a UN principe qui prime sur tout : `ANTI-IA.md` (règle #0)

Aucun contenu publié ne doit échouer un détecteur IA (GPTZero, ZeroGPT, Originality). Ban Reddit/LinkedIn/Facebook = compte grillé = semaines de travail perdues.

Résumé :
- Pas d'em-dash (—) comme pivot de phrase
- Pas de "Not X — it's Y"
- Pas de listes numérotées dans les commentaires publics
- Varier la structure de phrase
- Contractions obligatoires en anglais

### 4. Il y a UN document non-négociable : `BIBLE.md`

13 principes. Fabrice seul l'édite. Claude Code ne la modifie JAMAIS sans demande explicite.

Points essentiels :
- ANTI-IA règle #0
- Altistone + la toile INVISIBLES en public
- Intégrité données stricte : pas de faux MRR, pas de testimonials inventés, pas de noms clients fictifs
- Volume × Constance : R et F font 30 interactions/jour + 10 cold/jour chacun
- Cadence : 2 SaaS/mois sur 3 verticales
- Validation explicite avant toute modif de contenu opérationnel

---

## Architecture du repo en 2 minutes

```
F2-JARVIS (repo)
│
├── INFRA AUTOMATISATION (dossiers techniques)
│   ├── ui/jarvis/        → Frontend Next.js (Vercel) — app web R et F
│   ├── backend/jarvis/   → Backend Express (Railway) — Claude Agent SDK + écritures GitHub
│   ├── brain/            → Mémoire : Ouroboros (nocturne), MemPalace (verbatim), mem0 (facts)
│   ├── .claude/          → Config Claude Code terminal : 16 skills, 7 agents, 9 commands
│   ├── ops/              → Budget, kill-switches, monitoring
│   ├── patterns/         → Décisions techniques durcies
│   ├── tracking/         → Dashboard hebdo (alimenté par Jarvis)
│   └── raw/              → Inbox brute (non versionné)
│
└── CONTENU OPÉRATIONNEL (dossiers stratégie/marketing)
    ├── strategie/        → SOURCE DE VÉRITÉ stratégique (CONTEXT, PLAYBOOK, WARMING-FARMING)
    ├── produits/         → SOURCE DE VÉRITÉ produits (STATUS, MUTATIONS, NOUVEAUX)
    ├── marketing/        → Marketing macro
    ├── growth-marketing/ → Algos par plateforme (twitter, linkedin, ih, ph, tiktok)
    ├── distribution/     → Reddit + Facebook
    ├── f2/               → Compte studio @foundrytwo (R gère)
    ├── romain/           → R — full-time growth
    ├── fabrice/          → F — full-time tech
    ├── saas/             → Contextes par SaaS
    ├── la-toile/         → Architecture réseau (Altistone INVISIBLE)
    ├── asset-brand/      → Brand bible, logo, guidelines
    └── archives/         → Historique
```

---

## Les 2 systèmes distincts sous le même repo

### Système 1 : F2-Jarvis (l'infra / l'automatisation)

**Ce que c'est :** une app web agentique que R et F utilisent en navigateur pour tracker leurs activités réseaux et chatter avec un Claude personnalisé.

**URL :** https://f2-jarvis.vercel.app

**Comment ça marche :**
- Écran d'accueil : "Qui êtes-vous ? Romain / Fabrice"
- Chaque persona a son dashboard : timeline du jour, compteurs (cold, engagement, cross), alertes, chat
- Le chat utilise Claude Agent SDK avec 9 tools (lecture repo, écriture repo, recherche, timeline, counters, propose_action, etc.)
- Pattern **Propose → Validate → Execute** : Claude ne commit jamais seul. Il propose une action, user valide via bouton, backend exécute.

**Dossiers :** `ui/jarvis/` (frontend), `backend/jarvis/` (backend), `brain/` (mémoire), `ops/` (budget).

**Documentation détaillée :** `ui/jarvis/README.md`, `backend/jarvis/README.md`.

### Système 2 : FoundryTwo (le contenu opérationnel)

**Ce que c'est :** la documentation stratégique et les plans d'exécution du studio SaaS.

**Objectifs :**
- 6 SaaS en 3 verticales (e-com, agences, creators) d'ici juin 2026
- Distribution-first, sales-mode dominant
- Volume × constance : 30 interactions/jour + 10 cold/jour par personne
- Intégrité stricte : pas de faux MRR, pas de testimonials inventés

**Dossiers :** `strategie/`, `produits/`, `marketing/`, `growth-marketing/`, `f2/`, `romain/`, `fabrice/`, `distribution/`, `la-toile/`, `asset-brand/`, `saas/`.

**Documentation détaillée :** `strategie/CONTEXT.md` + `produits/STATUS.md`.

---

## Workflow hebdo

```
Vendredi soir    → Revue semaine + début batch
Samedi 18h-21h   → Batch complet (R + F ensemble) : tous les posts, visuels, UTM, newsletter prête
Dimanche         → Archivage, réinitialisation
Lundi-Vendredi   → Exécution zéro rédaction (copier-coller depuis batch)
                 → 30 interactions/jour + 10 cold/jour chacun
                 → Cross-engagement <5 min après chaque publication
```

BATCH actif : `BATCH-SEMAINE-N.md` à la racine du repo. Archivé dimanche soir dans `archives/batches/`.

---

## Ce qu'il faut IGNORER

Si vous tombez sur ces éléments en lisant d'anciens documents, ils sont **obsolètes** :

- Toute mention de **Leak Detector, ChargebackDefender, PriceRadar, ReviewPulse, AdWatcher, BriefForge, ContentFlow, InvoiceGuard, DataMerge, SpeedAudit, InventoryPulse, AdScoreAI, EmailCleanup, ReportFlash, ClipEngine, ThumbnailRank, CaptionDraft** — ce sont des anciens portfolios. Le vrai portfolio = 6 SaaS listés plus haut.
- Toute référence à `growth-marketing/{plateforme}/{compte}/...` — arborescence fantôme. Les vrais fichiers sont dans `{personne}/{plateforme}/`.
- Toute mention de **"Real numbers, real failures"** ou **"Building in public"** comme positionnement principal. Depuis avril 2026, on est en **sales-mode dominant**. Build-in-public réservé au format vendredi F2 Studio Update.
- Toute mention de **TikTok actif** comme canal — il est **suspendu** jusqu'à ce que F finisse le pipeline vidéo.

---

## Par où commencer concrètement

**Si vous êtes une IA qui doit aider R ou F sur une tâche :**
1. Lire `BIBLE.md` + `ANTI-IA.md` (principes)
2. Lire `strategie/CONTEXT.md` (où on va)
3. Lire `produits/STATUS.md` (ce qu'on a)
4. Lire `{persona}/VOIX.md` + `{persona}/context.md` selon qui vous aidez
5. Consulter `BATCH-SEMAINE-N.md` pour savoir ce qui se joue cette semaine

**Si vous êtes R ou F ouvrant votre journée :**
1. Ouvrir l'app web F2-Jarvis → dashboard persona
2. Lire `/morning` (si Claude Code terminal) ou le chat Jarvis
3. Exécuter les publications du jour (déjà préparées au batch samedi)
4. 30 interactions + 10 cold + cross-engagement

**Si vous voulez faire évoluer l'infra F2-Jarvis :**
1. Lire `ui/jarvis/README.md` + `backend/jarvis/README.md`
2. Respecter BIBLE.md §13 (Ouroboros bridé)
3. Respecter BIBLE.md §11 (budget 30€/mois max hors plan)

---

## Notes finales

- Le repo est **opérationnel et vivant**. Il évolue chaque semaine.
- **Principe d'intégrité BIBLE.md §3** : zéro tolérance sur faux MRR, testimonials inventés, noms clients fictifs.
- Les archives (`archives/`, `{persona}/archives/`) contiennent l'historique. Ne pas les modifier.
- Pour toute ambiguïté, **demander à Fabrice** avant d'agir.

Bienvenue. Maintenant vous pouvez naviguer le repo sans vous perdre.
```

## 8.4 — Gestion de `AUDIT.md`

TYPE : DEPLACE vers archives OU EDIT-SECTION

`AUDIT.md` a été créé pour lister les résidus du merge initial des 3 repos (FT + CDV + F2-Jarvis). Si Fabrice considère que le cleanup 21/04 rend ce fichier obsolète → le déplacer vers `archives/AUDIT-merge-initial.md`.

Si encore utile comme référence → le laisser mais ajouter en tête : `> Résidus merge initial (03/04/2026). Le cleanup complet du 21/04/2026 a traité ces points. Conservé pour historique.`

**Décision par défaut :** garder en place mais avec bannière de résolution. Fabrice peut décider de supprimer après validation.

## 8.5 — Vérification finale Commit 8

Vérifications :

```bash
# README racine mentionne bien les deux systèmes
grep -c "F2-Jarvis (infra)\|FoundryTwo (contenu" F2-Jarvis-main/README.md  # ≥ 2

# ENTRYPOINT.md existe et est lisible
cat F2-Jarvis-main/ENTRYPOINT.md | wc -l  # ~200+ lignes

# CLAUDE.md est à jour
grep "21 avril 2026" F2-Jarvis-main/CLAUDE.md  # trouvé
```

Git commit avec message du Commit 8.

---

# CHECKLIST FINALE (après les 8 commits)

Claude Code exécute cette checklist complète et signale à Fabrice tout point non validé :

- [ ] `produits/STATUS.md` contient 6 SaaS, StoreMD ✅ Live
- [ ] Aucune mention des 9 anciens produits obsolètes hors archives/historique
- [ ] Aucune mention des 9 produits inventés (SpeedAudit, etc.)
- [ ] `strategie/CONTEXT.md` se revendique source de vérité parent
- [ ] Aucun autre fichier ne se revendique "parent qui prime"
- [ ] Zéro référence à `growth-marketing/{twitter,linkedin,ih,ph,tiktok}/{f2,romain,fabrice}/` (sauf archives)
- [ ] TikTok marqué SUSPENDU dans tous les contexts/coordination/playbooks
- [ ] Pas de `{persona}/semaine-N/` qui traîne à la racine persona
- [ ] `archives/batches/README.md` existe
- [ ] READMEs créés : `ui/jarvis/`, `backend/jarvis/`, `brain/`, `.claude/`, `ops/`, `patterns/`, `tracking/`, `raw/`
- [ ] `README.md` racine couvre les 2 systèmes
- [ ] `ENTRYPOINT.md` existe et est lisible
- [ ] `CLAUDE.md` à jour (date 21/04/2026, build-in-public ajusté)
- [ ] `BIBLE.md` NON modifié
- [ ] Aucun code dans `ui/jarvis/app/`, `ui/jarvis/components/`, `backend/jarvis/src/` modifié
- [ ] Toutes les dates "Dernière mise à jour" des fichiers touchés sont à 21 avril 2026

---

## Fichier à demander à Fabrice avant push

Après les 8 commits, **ne pas push**. Demander à Fabrice :

> "Les 8 commits sont faits en local. Voici le récap :
> - Commit 1 : portfolio unifié (X fichiers touchés)
> - Commit 2 : build-in-public → sales-mode (X fichiers)
> - Commit 3 : références cassées corrigées (X fichiers)
> - Commit 4 : source de vérité parent unique (X fichiers)
> - Commit 5 : TikTok suspendu clairement (X fichiers)
> - Commit 6 : archives regroupées (X déplacements)
> - Commit 7 : documentation F2-Jarvis (X READMEs créés)
> - Commit 8 : README racine + CLAUDE.md + ENTRYPOINT.md
>
> Tu veux :
> A) Push direct sur main
> B) Push sur une branche `cleanup/21-04-2026` pour PR review
> C) Review des diffs avant push
> D) Revert tout et on discute"

Attendre sa réponse explicite.

---

## En cas de problème

Si un commit échoue ou produit un résultat inattendu :

1. **Arrêter immédiatement** — ne pas passer au commit suivant
2. Signaler à Fabrice le fichier/section précis qui pose problème
3. Montrer le diff proposé vs le contenu actuel
4. Attendre décision humaine

Ne JAMAIS :
- Forcer un commit qui a échoué
- Écraser l'historique git
- Push sans validation
- Modifier `BIBLE.md` ou du code source applicatif

---

**Fin du plan. Exécuter dans l'ordre strict 1 → 8.**
