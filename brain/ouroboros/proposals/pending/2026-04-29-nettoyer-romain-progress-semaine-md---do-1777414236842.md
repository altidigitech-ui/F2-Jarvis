---
date: "2026-04-29"
timestamp: "2026-04-28T22:10:36.843Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Nettoyer romain/progress-semaine.md — doublon + ligne artefact du 28/04 à 17:52
**Contexte:** Le progress-semaine R contient 3 lignes suspectes toutes datées 28/04/2026 à 17:52 :
1. `"Mar 28/04 — 94% ghost billing — Shopify/Stripe don"` — Post publié 17:52
2. `"Mar 28/04 — 94% ghost billing — Shopify/Stripe don"` — **doublon exact** à 17:52
3. `"Jour — Sujet"` — Post publié 17:52 — artefact de template non nettoyé
Ces lignes polluent le log et faussent un éventuel comptage de posts publiés.
**Recommandation:** Supprimer les lignes 2 (doublon) et 3 (artefact `"Jour — Sujet"`) dans `romain/progress-semaine.md`.
**Action:**
- Fichier: `romain/progress-semaine.md`
- Supprimer : la 2ème occurrence de `| 28/04/2026 | Twitter post publié — "Mar 28/04 — 94% ghost billing — Shopify/Stripe don" | Twitter | Post publié 17:52 | ...`
- Supprimer : `| 28/04/2026 | Twitter post publié — "Jour — Sujet" | Twitter | Post publié 17:52 | ...`
**Risques si ignoré:** Comptages de posts faussés. Un artefact `"Jour — Sujet"` visible dans le log crée de la confusion lors des bilans S7.
