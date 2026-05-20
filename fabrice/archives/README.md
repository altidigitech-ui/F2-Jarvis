# Archives Fabrice — README local

> Agent local pour les archives vivantes de Fabrice.
> **Charte globale :** voir `archives/README.md` (source de vérité, patterns figés)
> **Dernière mise à jour :** 19/05/2026

---

## 1. Rôle du dossier

Ce dossier contient les **archives vivantes** des activités hebdo de Fabrice :

- **Consultable rapidement** depuis le dossier `fabrice/` (baseline n-1, n-2, etc. pour comparaison entre semaines)
- **Vivantes** : reste à proximité du dossier actif tant qu'on est dans l'année en cours
- **Bascule en fin d'année** : toutes les `semaine-*-2026/` seront déplacées le **04/01/2027** vers `archives/2026/03-personas-hebdo/fabrice/` via le script de bascule annuelle (cf charte globale §2.6)

---

## 2. Fichiers archivés chaque semaine

| Fichier archivé | Source active | Conditions | Reset après archivage |
|-----------------|---------------|------------|----------------------|
| `progress.md` | `fabrice/tracking/progress-semaines.md` | **Toujours** | Template vide, nouveau header semaine N+1 |
| `plan-hebdo.md` | `fabrice/planning/plan-hebdo.md` | Si rempli pour la semaine | Template vide |
| `cold-log-twitter.md` | `fabrice/cold/cold-log-twitter.md` | Si activité dans la semaine | **Pas de reset** — append continu sur la source |
| `cold-log-linkedin.md` | `fabrice/cold/cold-log-linkedin.md` | Si activité dans la semaine | Pas de reset (append continu) |
| `cold-log-facebook.md` | `fabrice/cold/cold-log-facebook.md` | Si activité dans la semaine | Pas de reset (append continu) |

**Note importante sur les cold logs** : on archive une **copie snapshot** de la semaine sans toucher au fichier source qui continue son append continu. Cela permet d'avoir une vision figée par semaine tout en gardant l'historique complet dans le fichier source.

---

## 3. Format de nommage

**Format figé :** `semaine-NN-DD-DD-mois-YYYY/`

- **Semaine ISO 8601** : lundi → dimanche
- **Padding zéro à partir de S09** (les semaines S1-S8 gardent leur format actuel sans renommage rétroactif)
- **Mois en français en toutes lettres**

**Exemple :** `semaine-09-11-17-mai-2026/`

**Note** : la numérotation `NN` est celle du projet F2-Jarvis (pas la numérotation ISO calendaire). La S09 du projet = semaine du 11 au 17 mai 2026 (qui correspond à la S20 ISO calendaire).

---

## 4. Process d'archivage hebdo

**Trigger :** fin de semaine (dimanche soir ou trigger manuel/Jarvis quand branché)

**Actions séquentielles :**

1. **Créer le dossier semaine** : `fabrice/archives/semaine-NN-DD-DD-mois-YYYY/`
2. **Archiver `progress.md`** : copie du contenu actuel de `fabrice/tracking/progress-semaines.md` → dossier semaine
3. **Si `plan-hebdo.md` rempli** : copie → dossier semaine
4. **Pour chaque cold-log avec activité** : copie snapshot → dossier semaine (sans toucher la source)
5. **Reset des templates** :
   - `fabrice/tracking/progress-semaines.md` → template vide avec nouveau header semaine N+1
   - `fabrice/planning/plan-hebdo.md` → template vide avec nouveau header semaine N+1
6. **Pas de reset sur cold-logs** : ils continuent leur append continu

---

## 5. Process bascule annuelle

**Destination :** `archives/2026/03-personas-hebdo/fabrice/`

**Avant la bascule** :
- Produire `fabrice/tracking/recap-2026.md` (compile les progress hebdo de l'année — events notables, analytics, décisions, learnings)
- Le `recap-2026.md` **reste dans le dossier actif** comme baseline n-1 pour 2027
- Le recap est purement compilatoire (pas d'invention)

**Bascule effective** : lundi 04/01/2027 (premier jour S01-2027 selon ISO 8601, voir charte globale §2.6 pour le cas particulier de 2026 = 53 semaines)

**Script** : voir charte globale §2.6 — `git mv fabrice/archives/semaine-*-2026/ archives/2026/03-personas-hebdo/fabrice/`

---

## 6. Index des semaines archivées (au 19/05/2026)

| Dossier | Période |
|---------|---------|
| `semaine-1-16-22-mars-2026/` | 16/03 → 22/03/2026 |
| `semaine-2-23-29-mars-2026/` | 23/03 → 29/03/2026 |
| `semaine-4-06-12-avril-2026/` | 06/04 → 12/04/2026 (S3 sautée — pas critique) |
| `semaine-5-13-19-avril-2026/` | 13/04 → 19/04/2026 |
| `semaine-6-20-26-avril-2026/` | 20/04 → 26/04/2026 |
| `semaine-7-8-27-avril-10-mai-2026/` | 27/04 → 10/05/2026 (S7 + S8 fusionnées — semaine transition) |
| **À venir : `semaine-09-11-17-mai-2026/`** | 11/05 → 17/05/2026 (S9, à archiver en Phase 3 du plan archivage) |

**Note pre-refonte** : le dossier `fabrice/archives/pre-refonte/` (ancienne structure pré-refonte du 06/05/2026) sera déplacé vers `archives/2026/05-dossiers-deprecated/pre-refonte-2026-05-06/fabrice/` lors de la Phase 2 du plan archivage. Il n'est pas listé dans l'index hebdo car ce n'est pas une archive de semaine.

---

*Fin du README local Fabrice. Voir `archives/README.md` pour la charte globale.*
