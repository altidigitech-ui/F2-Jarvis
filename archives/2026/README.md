# Archives 2026

> Carte de l'année 2026 dans le système d'archivage du repo F2-Jarvis.
> **Charte globale :** voir `archives/README.md` (source de vérité, patterns figés)
> **Dernière mise à jour :** 19/05/2026
> **Statut :** année en cours

---

## Vue d'ensemble

Cette année regroupe :

- Les **virages stratégiques majeurs** opérés en 2026 (grand nettoyage post-FoundryTwo, pivots)
- Les **dossiers entiers deprecated** au cours de l'année 2026 (f2/, growth-marketing/, distribution/, pre-refonte personas)
- Les **anciens contextes plateformes** remplacés par `marketing/canaux/`
- Les **assets et tech legacy** archivés en 2026 (ancien brand, code Python legacy, XLSX abandonnés)
- Les **archives vivantes** qui basculeront en fin d'année (catégories 02, 03, 04 — actuellement vides, se rempliront le 04/01/2027 via le script de bascule annuelle)

---

## Détail des 7 catégories

### 01 — `01-virages-strategiques/`

**Rôle :** pivots stratégie majeurs, grands nettoyages structurels, décisions structurantes pour le repo et l'écosystème.

**Contenu actuel (19/05/2026) :**
- `2026-04-29_grand-nettoyage/` — refonte complète repo post-FoundryTwo (kill du studio, virage multi-business, nouvelle BIBLE v3.1)
- `2026-04-21_strategie-mid-s6-beta-testers.md` — décision stratégique sur les beta testers en mi-S6

**Critère d'éligibilité :** changement majeur de stratégie ou de vision documenté et daté. Doit avoir un impact structurel sur le repo, sur le business, ou sur la stratégie de distribution.

---

### 02 — `02-batches-hebdo/`

**Rôle :** archives des batches semaine basculés en fin d'année.

**Contenu actuel (19/05/2026) :** vide.

Les batches semaine 2026 restent dans `marketing/archives/batch-semaine/` tout au long de l'année (archives vivantes consultables). Ils basculent ici uniquement lors de la bascule annuelle.

**Bascule prévue :** lundi 04/01/2027 → tous les `batch-semaine-S*.md` archivés dans `marketing/archives/batch-semaine/` durant 2026.

---

### 03 — `03-personas-hebdo/`

**Rôle :** archives semaine R et F basculées en fin d'année.

**Structure :**
- `romain/` (sous-dossier dédié aux archives semaine Romain)
- `fabrice/` (sous-dossier dédié aux archives semaine Fabrice)

**Contenu actuel (19/05/2026) :** vide.

Les archives semaine 2026 restent dans `romain/archives/` et `fabrice/archives/` tout au long de l'année (archives vivantes consultables, baseline n-1 immédiate).

**Bascule prévue :** lundi 04/01/2027 → toutes les `romain/archives/semaine-*-2026/` et `fabrice/archives/semaine-*-2026/`.

---

### 04 — `04-tracking-hebdo/`

**Rôle :** dashboards hebdo + recap-sessions basculés en fin d'année.

**Structure :**
- `dashboard-hebdo/` (sous-dossier dédié aux snapshots dashboard hebdo)
- `recap-sessions/` (sous-dossier dédié aux recaps de sessions de travail)

**Contenu actuel (19/05/2026) :** vide.

Les dashboards hebdo 2026 restent dans `tracking/archives/dashboard-hebdo/` tout au long de l'année. Les recap-sessions restent dans `tracking/recap-sessions/`.

**Bascule prévue :** lundi 04/01/2027 → tous les `dashboard-S*.md` de 2026 + tous les `2026-*.md` de recap-sessions.

---

### 05 — `05-dossiers-deprecated/`

**Rôle :** anciens dossiers entiers remplacés en 2026, anciens contextes de canaux, templates obsolètes, archives pre-refonte des personas.

**Contenu actuel (19/05/2026) :**
- `f2-2026-05-06/` — ex-dossier `f2/` (compte studio FoundryTwo killed)
- `growth-marketing-2026-04-29/` — ex-dossier remplacé par `marketing/canaux/`
- `distribution-2026-04-29/` — ex-dossier remplacé par `strategie/PLAYBOOK-DISTRIBUTION.md`
- `pre-refonte-2026-05-06/romain/` — ancienne structure R pré-refonte
- `pre-refonte-2026-05-06/fabrice/` — ancienne structure F pré-refonte
- `2026-04-21_template-batch-double-couche.md` — ancien template batch (remplacé par `batch-template.md`)
- `canaux-anciens/` — anciens contextes plateformes (7 fichiers `.md` : facebook, instagram, linkedin, reddit, tiktok, twitter, launch-days)

**Critère d'éligibilité :** dossier ou fichier qui faisait partie de la structure du repo mais n'est plus utilisé. Daté au moment de son archivage. Pourra être consulté pour comprendre l'évolution historique du repo.

---

### 06 — `06-asset-brand-historique/`

**Rôle :** anciens logos, brand bibles, identités visuelles archivés en 2026.

**Contenu actuel (19/05/2026) :**
- Ex-contenu de `archives/asset-brand/` (FOUNDRYTWO-BRAND-BIBLE.md, FOUNDRYTWO-LOGO-GUIDELINES.md, ancien dossier `logo/`)

**Critère d'éligibilité :** assets visuels et identités de marque remplacés. À noter que les assets actuels actifs (par business) sont dans `asset-brand/{business}/` à la racine.

---

### 07 — `07-tech-legacy/`

**Rôle :** code legacy, audits historiques, XLSX deprecated, rapports cleanup.

**Contenu actuel (19/05/2026) :**
- `legacy-ouroboros-python/` — ancien code Python d'Ouroboros (avant migration backend Node)
- `2026-05-17_xlsx-deprecated/` — XLSX Growth Tracker abandonné (migration vers `tracking/metrics/` par dossiers)
- `cleanup/` — rapports cleanup historiques
- `2026-04-29_audit.md` — ex-`archives/AUDIT.md` (audit historique du repo)
- `ui-web-dashboard-2026-06-11/` — brouillon v1 du dashboard Next.js (jamais câblé, supplanté par `ui/jarvis`) — archivé le 11/06/2026

**Critère d'éligibilité :** code ou documents techniques qui ne sont plus utilisés mais peuvent servir de référence historique. Ouroboros peut s'y plonger pour comprendre l'évolution technique du repo.

---

## Procédure de bascule annuelle (synthèse)

Voir charte globale `archives/README.md` §2.6 pour le détail complet.

**Rappels rapides :**

1. **Avant la bascule** : produire les recaps annuels (`recap-2026.md`) dans les dossiers actifs sources. Ils restent en place comme baseline n-1 pour 2027.

2. **Date de bascule pour 2026** : lundi **04/01/2027** (premier jour de la S01-2027 selon norme ISO 8601).

3. **Cas particulier 2026** : 53 semaines ISO (2026 commence un jeudi). La dernière semaine 2026 = S53 qui se termine dimanche 03/01/2027.

4. **Script de bascule** : déplacements `git mv` qui pointent vers les catégories 02, 03, 04 ci-dessus. Script complet dans la charte globale §2.6.

5. **Après la bascule** : les fichiers actifs sources sont remis à templates vides avec header S01-2027. Les `recap-2026.md` restent en place dans les dossiers actifs.

---

*Fin de la carte 2026. Voir `archives/README.md` pour la charte globale et les patterns figés.*
