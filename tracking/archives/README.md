# Archives Tracking — README local

> Agent local pour les archives vivantes du dossier tracking.
> **Charte globale :** voir `archives/README.md` (source de vérité, patterns figés)
> **Dernière mise à jour :** 19/05/2026

---

## 1. Rôle du dossier

Ce dossier contient les **archives vivantes** des snapshots tracking hebdo :

- **Consultable rapidement** depuis le dossier `tracking/` (comparaison entre dashboards semaine sur semaine, évolution KPIs)
- **Vivantes** : reste à proximité du dossier actif tant qu'on est dans l'année en cours
- **Scalable** : actuellement un seul sous-dossier `dashboard-hebdo/`, pourra accueillir d'autres types d'archives tracking futures (snapshots metrics, snapshots utm, etc.)
- **Bascule en fin d'année** : tous les dashboards archivés en 2026 seront déplacés le **04/01/2027** vers `archives/2026/04-tracking-hebdo/dashboard-hebdo/` via le script de bascule annuelle (cf charte globale §2.6)

**Note** : les `recap-sessions/` (événementiels, pas hebdo) ont leur propre dossier `tracking/recap-sessions/` à la racine de `tracking/`, avec son propre README local.

---

## 2. Sous-dossier `dashboard-hebdo/`

Contient les fichiers `dashboard-SXX.md` archivés au fil de l'année.

**Format de nommage figé** : `dashboard-SNN.md`
- Padding zéro à partir de S09
- Exemple : `dashboard-S09.md`

**Note** : la numérotation `NN` est celle du projet F2-Jarvis (pas la numérotation ISO calendaire). La S09 du projet = semaine du 11 au 17 mai 2026.

---

## 3. Fichier archivé chaque semaine

| Élément | Détail |
|---------|--------|
| **Source active** | `tracking/dashboard-hebdo.md` (à la racine de `tracking/`) |
| **Destination** | `tracking/archives/dashboard-hebdo/dashboard-SXX.md` |
| **Conditions** | Uniquement si `tracking/dashboard-hebdo.md` rempli pour la semaine |
| **Reset après archivage** | Template vide avec nouveau header semaine N+1 |

---

## 4. Process d'archivage hebdo

**Trigger :** fin de semaine (dimanche soir ou trigger manuel/Jarvis quand branché)

**Actions séquentielles :**

1. **Vérifier** si `tracking/dashboard-hebdo.md` est rempli pour la semaine S(X)
2. **Si rempli** :
   - Copy `tracking/dashboard-hebdo.md` → `tracking/archives/dashboard-hebdo/dashboard-SXX.md`
   - Reset `tracking/dashboard-hebdo.md` à template vide avec nouveau header semaine N+1
3. **Si vide** : skip (rien à archiver pour la semaine, le template reste tel quel)

---

## 5. Process bascule annuelle

**Destination :** `archives/2026/04-tracking-hebdo/dashboard-hebdo/`

**Avant la bascule** :
- Produire `tracking/recap-2026.md` (compile les dashboards hebdo de l'année — metrics consolidées, évolution KPIs, patterns observés)
- Le `recap-2026.md` **reste dans le dossier actif** comme baseline n-1 pour 2027
- Le recap est purement compilatoire (pas d'invention, juste synthèse des dashboards archivés)

**Bascule effective** : lundi 04/01/2027 (premier jour S01-2027 selon ISO 8601, voir charte globale §2.6 pour le cas particulier de 2026 = 53 semaines)

**Script** : voir charte globale §2.6 — `git mv tracking/archives/dashboard-hebdo/dashboard-S*.md archives/2026/04-tracking-hebdo/dashboard-hebdo/`

---

## 6. Index des dashboards archivés (au 19/05/2026)

**Aucun dashboard archivé pour le moment.**

Le dossier `tracking/archives/dashboard-hebdo/` est créé en Phase 1.2 du plan d'archivage. Premier snapshot prévu : `dashboard-S09.md` (à vérifier en Phase 3 du plan archivage — uniquement si `tracking/dashboard-hebdo.md` était rempli pour S9).

---

*Fin du README local Tracking. Voir `archives/README.md` pour la charte globale et `tracking/recap-sessions/README.md` pour les recap-sessions.*
