# CHARTE D'ARCHIVAGE — Repo F2-Jarvis

> Source de vérité pour tout archivage dans le repo.
> Lu par Jarvis, par toute IA, ou par un humain qui s'interroge sur "où archiver quoi, comment, pourquoi".
> **Dernière mise à jour :** 19/05/2026

---

## 1. Philosophie

Le système d'archivage du repo F2-Jarvis fonctionne sur **deux niveaux** distincts qui ne se mélangent pas :

### Archives vivantes (consultées souvent — semaines récentes)

- Vivent **dans chaque dossier qui produit des fichiers hebdo** (`romain/archives/`, `fabrice/archives/`, `marketing/archives/`, `tracking/archives/`, `tracking/recap-sessions/`)
- Chacune a son propre **README "agent local"** qui explique précisément quoi archiver, dans quel format, à quelle fréquence
- Format unifié : `semaine-XX-DD-DD-mois-YYYY/`
- Accessibilité immédiate pour Jarvis et humains qui ont besoin de comparer aux semaines précédentes

### Archives générales (consultées rarement — historique)

- Vivent dans `archives/` à la racine du repo
- Organisées **par année** (`archives/2026/`, `archives/2027/`, etc.)
- Chaque année est subdivisée en **7 catégories numérotées**
- Reçoivent en fin d'année les archives vivantes basculées (bascule annuelle scriptable)
- Reçoivent au fil de l'eau les dossiers/fichiers deprecated, virages stratégiques, tech legacy

---

## 2. Patterns figés

### 2.1 Nommage

| Type | Format | Exemple |
|------|--------|---------|
| Semaine archivée | `semaine-NN-DD-DD-mois-YYYY/` (padding zéro à partir de S09) | `semaine-09-11-17-mai-2026/` |
| Batch archivé | `batch-semaine-SNN.md` (padding zéro à partir de S09) | `batch-semaine-S09.md` |
| Dashboard hebdo archivé | `dashboard-SNN.md` (padding zéro à partir de S09) | `dashboard-S09.md` |
| Recap session | `YYYY-MM-DD.md` | `2026-05-17.md` |
| Snapshot daté isolé | `YYYY-MM-DD_motif.md` (ou dossier) | `2026-04-29_grand-nettoyage/` |
| Dossier deprecated | `nom-original-YYYY-MM-DD/` | `f2-2026-05-06/` |
| Recap annuel | `recap-YYYY.md` (dans le dossier actif source) | `recap-2026.md` |

**Règle absolue** : padding zéro figé à partir de S09. Les semaines S1 à S8 gardent leur format actuel (pas de renommage rétroactif).

### 2.2 Set de fichiers archivés chaque semaine

| Source actif | Archivé dans | Reset après archivage |
|--------------|--------------|----------------------|
| `romain/tracking/progress-semaines.md` | `romain/archives/semaine-XX-DATES/progress.md` | Template vide, nouveau header semaine N+1 |
| `romain/planning/plan-hebdo.md` (si rempli) | `romain/archives/semaine-XX-DATES/plan-hebdo.md` | Template vide |
| `romain/cold/cold-log-twitter.md` (si activité) | `romain/archives/semaine-XX-DATES/cold-log-twitter.md` (snapshot copy) | **Pas de reset** — append continu sur la source |
| `romain/cold/cold-log-linkedin.md` (si activité) | `romain/archives/semaine-XX-DATES/cold-log-linkedin.md` (snapshot copy) | Pas de reset (append continu) |
| `romain/cold/cold-log-facebook.md` (si activité) | `romain/archives/semaine-XX-DATES/cold-log-facebook.md` (snapshot copy) | Pas de reset (append continu) |
| `fabrice/tracking/progress-semaines.md` | `fabrice/archives/semaine-XX-DATES/progress.md` | Template vide |
| `fabrice/planning/plan-hebdo.md` (si rempli) | `fabrice/archives/semaine-XX-DATES/plan-hebdo.md` | Template vide |
| `fabrice/cold/cold-log-twitter.md` (si activité) | `fabrice/archives/semaine-XX-DATES/cold-log-twitter.md` (snapshot copy) | Pas de reset (append continu) |
| `fabrice/cold/cold-log-linkedin.md` (si activité) | `fabrice/archives/semaine-XX-DATES/cold-log-linkedin.md` (snapshot copy) | Pas de reset (append continu) |
| `fabrice/cold/cold-log-facebook.md` (si activité) | `fabrice/archives/semaine-XX-DATES/cold-log-facebook.md` (snapshot copy) | Pas de reset (append continu) |
| `marketing/contenu/batch-semaine/batch-semaine-SXX.md` | `marketing/archives/batch-semaine/batch-semaine-SXX.md` | Pas de reset, le batch S(X+1) est un nouveau fichier |
| `tracking/dashboard-hebdo.md` (si rempli) | `tracking/archives/dashboard-hebdo/dashboard-SXX.md` | Template vide |

**Note importante** : pour les cold logs, on **archive un snapshot** (copie) chaque semaine dans le dossier semaine, **sans toucher au fichier source** qui continue son append continu. Cela permet d'avoir une vision figée par semaine tout en gardant l'historique complet dans le fichier source.

### 2.3 Non archivés hebdo

Statiques, append continu sans snapshot, événementiels, ou overwrite à chaque dispatch :

- `romain/planning/daily-checklist.md` — statique
- `romain/planning/playbook-semaine.md` — statique
- `romain/planning/plan-30-jours.md` — cycle 30j, à archiver à fin de cycle
- `romain/tracking/comptes-groupes.md` — référentiel statique
- `romain/tracking/karma-reddit.md` — append continu
- `romain/tracking/douleurs-observees.md` — append continu
- `romain/publication/batch-semaine.md` — overwrite à chaque dispatch hebdo, contenu de référence dans `marketing/contenu/batch-semaine/batch-semaine-SXX.md`
- `fabrice/publication/batch-semaine.md` — idem
- `saas-app-shopify/storemd/publication/batch-semaine.md` — idem
- `tracking/recap-sessions/YYYY-MM-DD.md` — événementiel (1 fichier par session, pas hebdo). Bascule annuelle directe en fin d'année.
- `tracking/decisions-log.md` — append continu
- `tracking/batch-log.md` — append continu automatique
- `tracking/metrics/**/*.md` — pattern append-by-week dans le même fichier

### 2.4 Logique de reset

Après chaque archivage hebdo :
- Le fichier actif source est remis à un **template vide standardisé**
- Le header est mis à jour avec la nouvelle date (semaine N+1)
- L'usage et le contexte du template sont conservés à l'identique

**Le template de chaque fichier actif est figé.** L'archivage = simple `git mv` ou `copy` + restauration du template. Pas de retraitement, pas de conversion, pas de réflexion sur "que faut-il garder".

### 2.5 Logique de recap annuel

**Avant la bascule annuelle**, pour chaque famille d'archives vivantes :
- Produire un fichier `recap-YYYY.md` qui compile la data archivée durant l'année (événements notables, analytics, décisions, learnings)
- Le `recap-YYYY.md` **reste dans le dossier actif** (PAS dans `archives/`) → sert de **baseline n-1** pour l'année suivante
- Le recap est **purement compilatoire** : pas d'invention, pas d'extrapolation. C'est de la data brute synthétisée.

Exemples :
- `romain/tracking/recap-2026.md` (compile les progress hebdo R)
- `fabrice/tracking/recap-2026.md`
- `marketing/contenu/batch-semaine/recap-2026.md` (compile les batches)
- `tracking/recap-2026.md` (compile les dashboards hebdo)

Pas de recap annuel pour les `recap-sessions/` (événementiels, basculés tels quels).

### 2.6 Process bascule annuelle

**Règle calendaire (norme ISO 8601 stricte)** :

- Les semaines suivent la norme **ISO 8601** : chaque semaine commence le **lundi** et se termine le **dimanche**
- Une année ISO peut compter **52 ou 53 semaines** :
  - 52 semaines par défaut
  - **53 semaines si l'année commence un jeudi, OU si elle est bissextile et commence un mercredi**
- L'année se termine **à la fin de sa dernière semaine ISO** (S52 ou S53), peu importe la date calendaire
- La bascule annuelle s'opère **après le dernier dimanche de la dernière semaine ISO** de l'année

**Cas particulier 2026** :
- 1er janvier 2026 = **jeudi** → **2026 a 53 semaines ISO**
- **S52-2026** : lundi 21/12/2026 → dimanche 27/12/2026
- **S53-2026** : lundi 28/12/2026 → dimanche 03/01/2027
- **S01-2027** : lundi 04/01/2027 → dimanche 10/01/2027
- **Bascule annuelle 2026** : à partir du **lundi 04/01/2027**

**Script de bascule** (à exécuter après la fin de la dernière semaine ISO de l'année N) :

```bash
# 1. PRODUIRE LES RECAPS ANNUELS (rester dans les dossiers actifs)
# Compilation manuelle par Claude/Jarvis avant bascule
# Les recap-YYYY.md restent en place dans les dossiers actifs comme baseline n-1

# 2. BASCULER LES ARCHIVES VIVANTES VERS archives/YEAR/
YEAR=2026

git mv romain/archives/semaine-*-${YEAR}/ archives/${YEAR}/03-personas-hebdo/romain/
git mv fabrice/archives/semaine-*-${YEAR}/ archives/${YEAR}/03-personas-hebdo/fabrice/
git mv marketing/archives/batch-semaine/batch-semaine-S*.md archives/${YEAR}/02-batches-hebdo/
git mv tracking/archives/dashboard-hebdo/dashboard-S*.md archives/${YEAR}/04-tracking-hebdo/dashboard-hebdo/
git mv tracking/recap-sessions/${YEAR}-*.md archives/${YEAR}/04-tracking-hebdo/recap-sessions/

# 3. RESET DES FICHIERS ACTIFS pour la nouvelle année (semaine 01)
# Les templates de progress, plan-hebdo, dashboard-hebdo sont remis à zéro avec header S01-{YEAR+1}
# Les recap-YYYY.md restent en place
```

**Pré-condition pour que le script fonctionne** : tous les fichiers de l'année doivent suivre le pattern de nommage (padding zéro à partir de S09).

---

## 3. Carte des 7 README du système

| README | Niveau | Rôle |
|--------|--------|------|
| `archives/README.md` (ce fichier) | Global | **Charte globale** — source de vérité, patterns figés |
| `archives/2026/README.md` | Année | **Carte de l'année 2026** — description des 7 catégories, contenu actuel |
| `romain/archives/README.md` | Local | Agent local R — quoi archiver côté Romain, format, fréquence |
| `fabrice/archives/README.md` | Local | Agent local F — quoi archiver côté Fabrice |
| `marketing/archives/README.md` | Local | Agent local marketing — couvre `batch-semaine/` |
| `tracking/archives/README.md` | Local | Agent local tracking — couvre `dashboard-hebdo/` |
| `tracking/recap-sessions/README.md` | Local | Agent local recap-sessions — événementiel |

**Total : 7 README.** Chaque agent local pointe vers cette charte globale, cette charte pointe vers chaque agent local.

---

## 4. Les 7 catégories par année

Chaque année (`archives/2026/`, `archives/2027/`, etc.) contient les mêmes 7 catégories numérotées :

| # | Catégorie | Reçoit |
|---|-----------|--------|
| 01 | `01-virages-strategiques/` | Pivots stratégie majeurs, grands nettoyages, décisions structurantes |
| 02 | `02-batches-hebdo/` | Batches semaine basculés en fin d'année |
| 03 | `03-personas-hebdo/` | Archives semaine R+F basculées en fin d'année (sous-dossiers `romain/` et `fabrice/`) |
| 04 | `04-tracking-hebdo/` | Dashboards hebdo + recap-sessions basculés en fin d'année (sous-dossiers `dashboard-hebdo/` et `recap-sessions/`) |
| 05 | `05-dossiers-deprecated/` | Anciens dossiers entiers remplacés + canaux anciens + templates anciens + pre-refonte personas |
| 06 | `06-asset-brand-historique/` | Anciens logos, brand bibles, identités visuelles |
| 07 | `07-tech-legacy/` | Code legacy + XLSX deprecated + rapports cleanup + audits historiques |

Le détail du contenu actuel de chaque catégorie pour l'année en cours est dans le README de l'année concernée (ex: `archives/2026/README.md`).

---

## 5. Évolution — Comment ajouter un nouveau type d'archive

Si un nouveau type de fichier hebdo apparaît dans le repo, suivre cette procédure :

1. **Identifier dans quel dossier le fichier actif vit** (`romain/`, `fabrice/`, `marketing/`, `tracking/`, ou nouveau dossier)
2. **Ajouter une ligne dans le tableau §2.2** (Set de fichiers archivés chaque semaine) avec source, destination, reset
3. **Mettre à jour le README local concerné** pour décrire le nouveau pattern
4. **Si nouveau dossier d'archives vivantes** :
   - Créer le dossier `{nouveau}/archives/`
   - Créer son `README.md` "agent local"
   - L'ajouter à la carte des 7 README ci-dessus (§3) — la carte peut accueillir plus de 7 entrées en cas d'expansion
   - Prévoir une destination dans `archives/{YEAR}/0X-categorie/` (création d'une nouvelle catégorie si nécessaire — la catégorie 08 par exemple)
5. **Documenter dans le script de bascule annuelle** §2.6 pour que la bascule récupère bien le nouveau type

---

## 6. Note à bene — Recap annuel 2026

Le process de recap annuel sera détaillé en décembre 2026 quand on aura :
- 8 mois de data réelle accumulée (mai-décembre)
- Un retour d'expérience sur les patterns qui marchent
- La possibilité d'écrire un prompt Claude Code générique qui compile chaque famille

À ce moment-là :
- Définir précisément le format des `recap-YYYY.md`
- Écrire le prompt Claude Code de bascule annuelle scriptable
- Tester le process sur 2026 avant de l'industrialiser pour 2027+

---

*Fin de la charte d'archivage. Source de vérité permanente.*
