# PLAN D'IMPLÉMENTATION — Réorganisation archivage F2-Jarvis

> **Statut :** À VALIDER avant exécution
> **Auteur :** Session R + Claude du 18-19/05/2026
> **Version :** V1
> **Périmètre :** Réorganisation complète du système d'archivage (général + vivantes), figeage des patterns, préparation bascule annuelle scalable.

---

## 1. CONTEXTE & OBJECTIFS

### 1.1 Constat de départ

- `archives/` racine est un fourre-tout chaotique : 13 éléments à plat, conventions de nommage mixtes, fichiers isolés sans contexte, anciens dossiers entiers archivés sans date.
- Les archives "vivantes" (romain/archives/, fabrice/archives/, marketing/archives/) ont chacune leur logique propre — pas standardisée semaine sur semaine.
- Pas de process d'archivage annuel défini → risque de fragmentation incontrôlée à terme.
- Pas de doc unique qui explique comment archiver quoi → chaque session de cleanup ré-improvise.

### 1.2 Vision cible

- **Archives "vivantes"** dans chaque dossier actif (consultées souvent, semaines récentes)
- **Archives "générales"** dans `archives/` racine (consultées rarement, organisées par année et par type)
- **Bascule annuelle** scalable, scriptable, prenant 5 minutes
- **Charte unique** + README locaux ("agents locaux") pour que Jarvis / IA / humain sache toujours quoi archiver, où, comment

### 1.3 Hors périmètre

- Déplacement `saas/` vers `produits/` → chantier C3 séparé
- Déplacement `saas-app-shopify/` vers `marketing/` → chantier C3 séparé
- Création `boutique/` pour Hokuno → chantier C3 séparé
- Mise à jour CLAUDE.md / ENTRYPOINT.md / ARCH.md / README.md racine → après C3
- Audit/rebranchement Jarvis suite aux déplacements → chantier C4

---

## 2. ARCHITECTURE CIBLE

### 2.1 Archives générales racine

```
archives/
├── README.md                              ← CHARTE GLOBALE (source de vérité)
└── 2026/
    ├── README.md                          ← Carte des 7 catégories de 2026
    ├── 01-virages-strategiques/           ← Pivots stratégie majeurs
    ├── 02-batches-hebdo/                  ← Batches semaine basculés en fin d'année
    ├── 03-personas-hebdo/                 ← Archives semaine R+F basculées en fin d'année
    │   ├── romain/
    │   └── fabrice/
    ├── 04-tracking-hebdo/                 ← Dashboard + recap-sessions basculés en fin d'année
    │   ├── dashboard-hebdo/
    │   └── recap-sessions/
    ├── 05-dossiers-deprecated/            ← Anciens dossiers entiers + canaux anciens + templates anciens
    ├── 06-asset-brand-historique/         ← Anciens logos, brand bibles
    └── 07-tech-legacy/                    ← Code legacy + XLSX deprecated + audits/cleanup
```

### 2.2 Archives vivantes

```
romain/archives/
├── README.md                              ← AGENT LOCAL R
└── semaine-XX-DD-DD-mois-YYYY/

fabrice/archives/
├── README.md                              ← AGENT LOCAL F
└── semaine-XX-DD-DD-mois-YYYY/

marketing/archives/
├── README.md                              ← AGENT LOCAL marketing (couvre batch-semaine/)
└── batch-semaine/
    └── batch-semaine-SXX.md

tracking/archives/
├── README.md                              ← AGENT LOCAL tracking (couvre dashboard-hebdo/)
└── dashboard-hebdo/
    └── dashboard-SXX.md

tracking/recap-sessions/
├── README.md                              ← AGENT LOCAL recap-sessions
└── YYYY-MM-DD.md
```

**Total : 7 README** (1 charte globale + 1 carte 2026 + 5 agents locaux à la racine de chaque dossier archives).

---

## 3. PATTERNS FIGÉS

### 3.1 Nommage

| Type | Format | Exemple |
|------|--------|---------|
| Semaine archivée | `semaine-NN-DD-DD-mois-YYYY/` (padding zéro NN à partir de S09) | `semaine-09-11-17-mai-2026/` |
| Batch archivé | `batch-semaine-SNN.md` (padding zéro à partir de S09) | `batch-semaine-S09.md` |
| Dashboard hebdo archivé | `dashboard-SNN.md` (padding zéro à partir de S09) | `dashboard-S09.md` |
| Recap session | `YYYY-MM-DD.md` | `2026-05-17.md` |
| Snapshot daté isolé | `YYYY-MM-DD_motif.md` (ou dossier) | `2026-04-29_grand-nettoyage/` |
| Dossier deprecated | `nom-original-YYYY-MM-DD/` | `f2-2026-05-06/` |
| Recap annuel | `recap-YYYY.md` | `recap-2026.md` |

**Règle :** padding zéro figé à partir de S09. Pas de renommage rétroactif des S1-S8 existantes.

### 3.2 Set de fichiers archivés par dossier

| Dossier source actif | Fichier archivé chaque semaine | Reset après archivage |
|----------------------|-------------------------------|----------------------|
| `romain/tracking/progress-semaines.md` | `progress.md` → `romain/archives/semaine-XX-DATES/` | Template vide, nouveau header semaine N+1 |
| `romain/planning/plan-hebdo.md` (si rempli) | `plan-hebdo.md` → `romain/archives/semaine-XX-DATES/` | Template vide |
| `fabrice/tracking/progress-semaines.md` | `progress.md` → `fabrice/archives/semaine-XX-DATES/` | Template vide |
| `fabrice/planning/plan-hebdo.md` (si rempli) | `plan-hebdo.md` → `fabrice/archives/semaine-XX-DATES/` | Template vide |
| `romain/cold/cold-log-twitter.md` (si activité) | `cold-log-twitter.md` → `romain/archives/semaine-XX-DATES/` (snapshot copy) | Pas de reset, append continu sur la source |
| `romain/cold/cold-log-linkedin.md` (si activité) | `cold-log-linkedin.md` → `romain/archives/semaine-XX-DATES/` (snapshot copy) | Pas de reset, append continu sur la source |
| `romain/cold/cold-log-facebook.md` (si activité) | `cold-log-facebook.md` → `romain/archives/semaine-XX-DATES/` (snapshot copy) | Pas de reset, append continu sur la source |
| `fabrice/cold/cold-log-twitter.md` (si activité) | `cold-log-twitter.md` → `fabrice/archives/semaine-XX-DATES/` (snapshot copy) | Pas de reset, append continu sur la source |
| `fabrice/cold/cold-log-linkedin.md` (si activité) | `cold-log-linkedin.md` → `fabrice/archives/semaine-XX-DATES/` (snapshot copy) | Pas de reset, append continu sur la source |
| `fabrice/cold/cold-log-facebook.md` (si activité) | `cold-log-facebook.md` → `fabrice/archives/semaine-XX-DATES/` (snapshot copy) | Pas de reset, append continu sur la source |
| `marketing/contenu/batch-semaine/batch-semaine-SXX.md` | `batch-semaine-SXX.md` → `marketing/archives/batch-semaine/` | Pas de reset, le batch S(X+1) est un nouveau fichier |
| `tracking/dashboard-hebdo.md` (si rempli) | `dashboard-SXX.md` → `tracking/archives/dashboard-hebdo/` | Template vide |

**Note** : pour les cold logs, on **archive un snapshot** (copie) chaque semaine dans le dossier semaine, **sans toucher au fichier source** qui continue son append continu. Cela permet d'avoir une vision figée par semaine tout en gardant l'historique complet dans le fichier source.

**Non archivés hebdo** (statiques, append continu sans snapshot, événementiel, ou overwrite à chaque dispatch) :
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

### 3.3 Logique de reset

Après chaque archivage :
- Le fichier actif est remis à un **template vide standardisé**
- Le header est mis à jour avec la nouvelle date (semaine N+1)
- L'usage et le contexte sont conservés à l'identique

**Le template de chaque fichier actif est figé.** L'archivage = simple `git mv` + restauration template. Pas de retraitement.

### 3.4 Logique de recap annuel

**Avant la bascule annuelle (1er lundi de l'année N+1)** :
- Pour chaque famille d'archives vivantes, produire un fichier `recap-YYYY.md` qui compile la data archivée durant l'année (events notables, analytics, décisions, learnings)
- Le `recap-YYYY.md` **reste dans le dossier actif** (PAS dans archives/) → sert de baseline n-1 pour l'année suivante
- Exemples :
  - `romain/tracking/recap-2026.md` (compile les 52 progress hebdo)
  - `fabrice/tracking/recap-2026.md`
  - `marketing/contenu/batch-semaine/recap-2026.md`
  - `tracking/recap-2026.md`
- **Le recap est purement compilatoire.** Pas d'analyse extrapolative, pas d'invention. C'est de la data brute synthétisée.

### 3.5 Process bascule annuelle

**Règle calendaire (figée) — norme ISO 8601 stricte** :

- Les semaines suivent la **norme ISO 8601** : chaque semaine commence le **lundi** et se termine le **dimanche**
- Une année ISO peut compter **52 ou 53 semaines** selon le calendrier :
  - 52 semaines par défaut
  - 53 semaines si l'année commence un **jeudi**, OU si elle est **bissextile et commence un mercredi**
- L'année se termine **à la fin de sa dernière semaine ISO** (S52 ou S53), peu importe la date calendaire
- La bascule annuelle s'opère **après le dernier dimanche de la dernière semaine ISO** de l'année

**Cas particulier 2026** :
- 1er janvier 2026 = **jeudi** → **2026 a 53 semaines ISO**
- **S01-2026** : lundi 29/12/2025 → dimanche 04/01/2026
- **S52-2026** : lundi 21/12/2026 → dimanche 27/12/2026
- **S53-2026** : lundi 28/12/2026 → dimanche 03/01/2027
- **S01-2027** : lundi 04/01/2027 → dimanche 10/01/2027
- **Bascule annuelle 2026** : à partir du **lundi 04/01/2027** (premier jour de S01-2027)

**Process** (à exécuter au début de l'année N+1, après la fin de la dernière semaine ISO de l'année N) :

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

**Pas urgent maintenant.** À reprendre fin décembre 2026.

---

## 4. CONTENU DES 7 README

### 4.1 `archives/README.md` — CHARTE GLOBALE

**Sections** :
1. **Vue d'ensemble** : philosophie 2 niveaux (vivantes / générales)
2. **Pattern de nommage** (cf §3.1)
3. **Set de fichiers archivés** par dossier (cf §3.2)
4. **Logique de reset** (cf §3.3)
5. **Logique de recap annuel** (cf §3.4)
6. **Process bascule annuelle** (cf §3.5)
7. **Carte des READMEs** : pointeurs vers les 5 agents locaux + carte 2026
8. **Liste des catégories `archives/{YEAR}/`** : description rôle de chaque 0X-categorie/
9. **Comment ajouter un nouveau type d'archive** (procédure d'évolution)

### 4.2 `archives/2026/README.md` — Carte 2026

**Sections** :
1. **Vue d'ensemble année 2026** : ce qui a été archivé, par catégorie
2. **Détail des 7 catégories** :
   - `01-virages-strategiques/` : contenu actuel + critères d'éligibilité
   - `02-batches-hebdo/` : prévu pour bascule fin année
   - `03-personas-hebdo/` : prévu pour bascule fin année (sous-dossiers romain/, fabrice/)
   - `04-tracking-hebdo/` : prévu pour bascule fin année (sous-dossiers dashboard-hebdo/, recap-sessions/)
   - `05-dossiers-deprecated/` : dossiers entiers remplacés + canaux anciens + templates anciens
   - `06-asset-brand-historique/` : anciens logos, brand bibles
   - `07-tech-legacy/` : code legacy + XLSX deprecated + audits/cleanup
3. **Index des contenus actuels** (auto-listage des fichiers/dossiers présents)

### 4.3 `romain/archives/README.md` — AGENT LOCAL R

**Sections** :
1. **Rôle** : archives vivantes des activités hebdo R
2. **Fichiers archivés chaque semaine** (cf §3.2)
3. **Format de nommage** : `semaine-NN-DD-DD-mois-YYYY/`
4. **Process d'archivage hebdo** (dimanche soir ou trigger manuel/Jarvis)
5. **Process bascule annuelle** : destination = `archives/{YEAR}/03-personas-hebdo/romain/`
6. **Index des semaines archivées** (auto-liste)

### 4.4 `fabrice/archives/README.md` — AGENT LOCAL F

Idem côté F.

### 4.5 `marketing/archives/README.md` — AGENT LOCAL marketing

**Sections** :
1. **Rôle** : archives des batches hebdo marketing (couvre `batch-semaine/`)
2. **Sous-dossier** : `batch-semaine/` contient les batches archivés
3. **Fichier archivé chaque semaine** : `batch-semaine-SXX.md` (depuis `marketing/contenu/batch-semaine/`)
4. **Format de nommage** : `batch-semaine-SNN.md`
5. **Process d'archivage** : `git mv` à chaque nouveau lundi (batch S(X+1) commencé)
6. **Process bascule annuelle** : destination = `archives/{YEAR}/02-batches-hebdo/`
7. **Index des batches archivés**

### 4.6 `tracking/archives/README.md` — AGENT LOCAL tracking

**Sections** :
1. **Rôle** : archives hebdo tracking (couvre `dashboard-hebdo/`)
2. **Sous-dossier** : `dashboard-hebdo/` contient les snapshots dashboard
3. **Fichier archivé** : `dashboard-SXX.md` (depuis `tracking/dashboard-hebdo.md`)
4. **Format de nommage** : `dashboard-SNN.md`
5. **Process d'archivage** : snapshot fin de semaine si rempli
6. **Process bascule annuelle** : destination = `archives/{YEAR}/04-tracking-hebdo/dashboard-hebdo/`
7. **Index des dashboards archivés**

### 4.7 `tracking/recap-sessions/README.md` — AGENT LOCAL recap-sessions

**Sections** :
1. **Rôle** : recap par session de travail (pas hebdo, événementiel)
2. **Format de nommage** : `YYYY-MM-DD.md`
3. **Quand créer un recap** : fin de session marathon ou décision majeure
4. **Process bascule annuelle** : destination = `archives/{YEAR}/04-tracking-hebdo/recap-sessions/`
5. **Index des recaps**

---

## 5. PHASES D'EXÉCUTION

### Phase 1 — Foundation (créer les 7 README + structure de base)

**Durée estimée** : 2-3 prompts Claude Code

#### 1.1 Créer la charte globale + carte 2026

- Création `archives/README.md`
- Création `archives/2026/README.md`
- Création arborescence `archives/2026/0X-categorie/` (7 dossiers vides avec `.gitkeep` si nécessaire)

#### 1.2 Créer les 5 README agents locaux

- `romain/archives/README.md`
- `fabrice/archives/README.md`
- `marketing/archives/README.md` (à la racine de marketing/archives/)
- `tracking/archives/README.md` (dossier `tracking/archives/` à créer aussi)
- `tracking/recap-sessions/README.md`

---

### Phase 2 — Réorganiser `archives/` racine

**Durée estimée** : 3 prompts Claude Code (1 par bloc)

#### 2.1 Déplacements dossiers entiers (anciens)

| Source | Destination |
|--------|-------------|
| `archives/2026-04-29_grand-nettoyage/` | `archives/2026/01-virages-strategiques/2026-04-29_grand-nettoyage/` |
| `archives/2026-05-17_xlsx-deprecated/` | `archives/2026/07-tech-legacy/2026-05-17_xlsx-deprecated/` |
| `archives/f2/` | `archives/2026/05-dossiers-deprecated/f2-2026-05-06/` |
| `archives/growth-marketing/` | `archives/2026/05-dossiers-deprecated/growth-marketing-2026-04-29/` |
| `archives/distribution/` | `archives/2026/05-dossiers-deprecated/distribution-2026-04-29/` |
| `archives/asset-brand/` | `archives/2026/06-asset-brand-historique/` |
| `archives/legacy-ouroboros-python/` | `archives/2026/07-tech-legacy/legacy-ouroboros-python/` |
| `archives/cleanup/` | `archives/2026/07-tech-legacy/cleanup/` |

#### 2.2 Déplacements fichiers isolés (.md à plat)

| Source | Destination |
|--------|-------------|
| `archives/STRATEGIE-MID-S6-BETA-TESTERS.md` | `archives/2026/01-virages-strategiques/2026-04-21_strategie-mid-s6-beta-testers.md` |
| `archives/TEMPLATE-BATCH-DOUBLE-COUCHE-AVEC-RULES.md` | `archives/2026/05-dossiers-deprecated/2026-04-21_template-batch-double-couche.md` |
| `archives/AUDIT.md` | `archives/2026/07-tech-legacy/2026-04-29_audit.md` |
| `archives/facebook.md` | `archives/2026/05-dossiers-deprecated/canaux-anciens/facebook.md` |
| `archives/instagram.md` | idem |
| `archives/linkedin.md` | idem |
| `archives/reddit.md` | idem |
| `archives/tiktok.md` | idem |
| `archives/twitter.md` | idem |
| `archives/launch-days.md` | `archives/2026/05-dossiers-deprecated/canaux-anciens/launch-days.md` |

#### 2.3 Déplacements pre-refonte R+F

| Source | Destination |
|--------|-------------|
| `romain/archives/pre-refonte/` | `archives/2026/05-dossiers-deprecated/pre-refonte-2026-05-06/romain/` |
| `fabrice/archives/pre-refonte/` | `archives/2026/05-dossiers-deprecated/pre-refonte-2026-05-06/fabrice/` |

#### 2.4 Corrections headers "Statut : ACTIF" → "ARCHIVÉ"

Sur les 7 fichiers canaux dans `archives/2026/05-dossiers-deprecated/canaux-anciens/` :
- `facebook.md`, `instagram.md`, `linkedin.md`, `reddit.md`, `tiktok.md`, `twitter.md`, `launch-days.md`

Remplacer `Statut : ACTIF` par `Statut : ARCHIVÉ — Remplacé par marketing/canaux/[plateforme]/ depuis 29/04/2026`

---

### Phase 3 — Archivage S9

**Durée estimée** : 1 prompt Claude Code

Vérifs préalables à faire dans le prompt :
- Si `romain/planning/plan-hebdo.md` rempli pour S9 → snapshot
- Si `fabrice/planning/plan-hebdo.md` rempli pour S9 → snapshot
- Si `tracking/dashboard-hebdo.md` rempli pour S9 → snapshot
- Si cold-logs R (`romain/cold/cold-log-*.md`) ont eu activité en S9 → snapshot (audit S9 : cold-logs vides → skip)
- Si cold-logs F (`fabrice/cold/cold-log-*.md`) ont eu activité en S9 → snapshot (audit S9 : cold-logs vides → skip)

Actions :
1. Créer `romain/archives/semaine-09-11-17-mai-2026/`
2. Copier `romain/tracking/progress-semaines.md` (rempli S9) → `romain/archives/semaine-09-11-17-mai-2026/progress.md`
3. Si plan-hebdo R rempli → copier vers même dossier
4. Si cold-logs R ont eu activité → snapshot copie vers même dossier (sans reset source)
5. Reset `romain/tracking/progress-semaines.md` à template vide, header "Semaine du 18/05/2026 au 24/05/2026" (S10)
6. Idem côté F (étapes 1-5 répliquées)
7. Si dashboard rempli → snapshot vers `tracking/archives/dashboard-hebdo/dashboard-S09.md` + reset

---

### Phase 4 — Vérification + clôture

**Durée estimée** : 1 prompt Claude Code

Vérifs :
- Arborescence `archives/2026/` complète et conforme
- 7 README en place
- S9 archivée
- Templates resetés pour S10
- Aucun fichier "Statut ACTIF" dans archives/2026/05-dossiers-deprecated/canaux-anciens/
- Aucun dossier vide non-attendu
- Cohérence finale

Output : récap des changements + liste complète des fichiers/dossiers touchés.

---

## 6. RÉCAPITULATIF VOLUMÉTRIQUE

| Phase | Création | Déplacements | Modifications | Prompts CC |
|-------|----------|--------------|---------------|-----------|
| 1 | 7 README + 12 dossiers vides (7 catégories `archives/2026/0X/` + 4 sous-dossiers personas/tracking + 1 dossier `tracking/archives/`) | 0 | 0 | 2-3 |
| 2 | 1 sous-dossier `canaux-anciens/` | ~20 `git mv` | 7 headers `str_replace` | 3 |
| 3 | 2-7 fichiers (selon plans-hebdo + dashboard + cold-logs remplis — S9 : juste progress R+F) | 0 (copies) | 2 resets templates (progress R+F) | 1 |
| 4 | 0 | 0 | 0 | 1 (vérif) |

**Total estimé** : 7-8 prompts Claude Code séquentiels.

---

## 7. NOTE A BENE — Recap annuel (à reprendre fin 2026)

Le process de recap annuel (§3.4) sera détaillé en décembre 2026 quand on aura :
- 8 mois de data réelle accumulée (mai-décembre)
- Un retour d'expérience sur les patterns qui marchent
- La possibilité d'écrire un prompt Claude Code générique qui compile chaque famille

À ce moment-là :
- Définir précisément le format des `recap-YYYY.md`
- Écrire le prompt Claude Code de bascule annuelle scriptable
- Tester le process sur 2026 avant de l'industrialiser pour 2027+

---

## 8. POINTS DE VALIDATION AVANT EXÉCUTION

Tu dois valider :

1. ✅ Architecture cible (§2) — 7 README, structure `archives/2026/` avec 7 catégories
2. ✅ Patterns figés (§3) — nommage, set de fichiers, reset, recap annuel, bascule
3. ✅ Contenu des 7 README (§4) — sections principales
4. ✅ Phases d'exécution (§5) — 4 phases, 7-8 prompts CC
5. ✅ Volumétrie (§6)
6. ✅ Note à bene pour fin 2026 (§7)

Si tout OK → on attaque par **Phase 1.1** (charte globale + carte 2026) au prochain go.

---

*Fin du plan d'implémentation V1.*
