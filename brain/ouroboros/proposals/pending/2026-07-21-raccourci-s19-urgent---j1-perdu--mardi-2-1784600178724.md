---
date: "2026-07-21"
timestamp: "2026-07-21T02:16:18.724Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Raccourci S19 URGENT — J1 perdu, Mardi 21/07 encore récupérable AUJOURD'HUI, 3 fichiers confirmés
**Contexte:**
Ce cycle (21/07) j'ai confirmé les 3 fichiers dispatch — tous sur dates S15 (22-26/06) :
- `fabrice/publication/batch-semaine.md` ✓ (8KB, 223 lignes)
- `romain/publication/batch-semaine.md` ✓ (8KB, 229 lignes)
- `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` ✓ (dates S15 confirmées par PENDING 20/07)

Lundi 20/07 (J1) est définitivement perdu. La "fenêtre ce weekend" du PENDING 17/07 est fermée. Le PENDING "Raccourci prêt pour lundi" est stale.

Mardi 21/07 = AUJOURD'HUI = contenu encore postable aujourd'hui (créneaux habituels : 13h00 Twitter, 15h30 LinkedIn). Le contenu S15 est evergreen (produit pur, aucune mention offre expirée). Fenêtre restante : **4 jours** (Mar 21 → Ven 24/07). Après vendredi 24/07, S19 est close.

**Recommandation:**
Remplacer les dates S15 dans les 3 fichiers dispatch selon ce mapping partiel (J1 Lun 20/07 droppé) :

| S15 date | → S19 date |
|----------|------------|
| 22/06 | → **21/07** (Mar — AUJOURD'HUI) |
| 23/06 | → **22/07** (Mer) |
| 24/06 | → **23/07** (Jeu) |
| 25/06 | → **24/07** (Ven) |
| 26/06 | → **DROP** (J5 S15 Ven hors fenêtre) |

**Action:**
- Fichier: `fabrice/publication/batch-semaine.md`
  - Ligne 1 header : "S15" → "S19 (partiel Mar-Ven)"
  - Remplacer toutes occurrences : "22/06" → "21/07", "23/06" → "22/07", "24/06" → "23/07", "25/06" → "24/07"
  - Section Ven 26/06 (TW-F-S15-05 + LI-F-S15-02) : supprimer ou commenter (hors semaine)
- Fichier: `romain/publication/batch-semaine.md`
  - Même header + mêmes remplacements de dates
- Fichier: `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
  - Mêmes remplacements de dates (vérifier structure avant pour adapter les sections weekend Sam/Dim)

**Risques si ignoré:** Mardi 21/07 devient J2 perdu d'ici ce soir. La S19 entière (20-24/07) sera perdue vendredi. Aucun contenu publié depuis S15 (22-26/06) = 4 semaines de silence total.
