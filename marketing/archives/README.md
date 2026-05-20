# Archives Marketing — README local

> Agent local pour les archives vivantes du dossier marketing.
> **Charte globale :** voir `archives/README.md` (source de vérité, patterns figés)
> **Dernière mise à jour :** 19/05/2026

---

## 1. Rôle du dossier

Ce dossier contient les **archives vivantes** des productions marketing hebdo :

- **Consultable rapidement** depuis le dossier `marketing/` (comparaison entre batches semaine, baseline n-1)
- **Vivantes** : reste à proximité du dossier actif tant qu'on est dans l'année en cours
- **Scalable** : actuellement un seul sous-dossier `batch-semaine/`, pourra accueillir d'autres types d'archives marketing futures
- **Bascule en fin d'année** : tous les batches archivés en 2026 seront déplacés le **04/01/2027** vers `archives/2026/02-batches-hebdo/` via le script de bascule annuelle (cf charte globale §2.6)

---

## 2. Sous-dossier `batch-semaine/`

Contient les fichiers `batch-semaine-SXX.md` archivés au fil de l'année.

**Format de nommage figé** : `batch-semaine-SNN.md`
- Padding zéro à partir de S09
- Exemple : `batch-semaine-S09.md`

**Note** : la numérotation `NN` est celle du projet F2-Jarvis (pas la numérotation ISO calendaire). La S09 du projet = semaine du 11 au 17 mai 2026.

---

## 3. Fichier archivé chaque semaine

| Élément | Détail |
|---------|--------|
| **Source active** | `marketing/contenu/batch-semaine/batch-semaine-SXX.md` |
| **Destination** | `marketing/archives/batch-semaine/batch-semaine-SXX.md` |
| **Conditions** | Toujours archivé (le batch produit chaque semaine est la trace de référence) |
| **Reset après archivage** | Pas de reset — le batch S(X+1) est un **nouveau fichier** créé dans `marketing/contenu/batch-semaine/` |

---

## 4. Process d'archivage hebdo

**Trigger :** à chaque nouveau lundi (quand le batch S(X+1) commence)

**Actions séquentielles :**

1. `git mv marketing/contenu/batch-semaine/batch-semaine-SXX.md marketing/archives/batch-semaine/`
2. Création du nouveau fichier `marketing/contenu/batch-semaine/batch-semaine-S(X+1).md` (vide ou pré-rempli selon dispatch)
3. Pas de template à reset (chaque batch est un nouveau fichier indépendant)

**Workflow type (exemple S9 → S10) :**

```
Lundi S9 (11/05/2026) :
  marketing/contenu/batch-semaine/
    ├── batch-semaine-S9.md          ← actif, rempli pendant la semaine
    └── batch-template.md             ← template figé, jamais touché

Lundi S10 (18/05/2026) :
  Action 1 : git mv batch-semaine-S9.md → marketing/archives/batch-semaine/
  Action 2 : créer batch-semaine-S10.md (nouveau fichier rempli pendant S10)
  
  Résultat :
  marketing/contenu/batch-semaine/
    ├── batch-semaine-S10.md         ← actif S10
    └── batch-template.md             ← intact
  marketing/archives/batch-semaine/
    └── batch-semaine-S9.md          ← archivé
```

---

## 5. Process bascule annuelle

**Destination :** `archives/2026/02-batches-hebdo/`

**Avant la bascule** :
- Produire `marketing/contenu/batch-semaine/recap-2026.md` (compile les batches de l'année — volumes, angles qui ont converti, vidéos performantes, learnings, patterns récurrents)
- Le `recap-2026.md` **reste dans le dossier actif** comme baseline n-1 pour 2027
- Le recap est purement compilatoire (pas d'invention, juste synthèse des batches archivés)

**Bascule effective** : lundi 04/01/2027 (premier jour S01-2027 selon ISO 8601, voir charte globale §2.6 pour le cas particulier de 2026 = 53 semaines)

**Script** : voir charte globale §2.6 — `git mv marketing/archives/batch-semaine/batch-semaine-S*.md archives/2026/02-batches-hebdo/`

---

## 6. Index des batches archivés (au 19/05/2026)

| Batch archivé | Période |
|---------------|---------|
| `batch-semaine-S6.md` | 20/04 → 26/04/2026 |
| `batch-semaine-S7.md` | 27/04 → 03/05/2026 |
| `batch-semaine-S9.md` | 11/05 → 17/05/2026 (S8 non archivée — semaine de transition fusionnée S7-8 côté personas) |

**Note** : `batch-semaine-S10.md` (semaine courante) est actuellement dans `marketing/contenu/batch-semaine/` et basculera ici le lundi 25/05/2026 quand S11 commencera.

---

*Fin du README local Marketing. Voir `archives/README.md` pour la charte globale.*
