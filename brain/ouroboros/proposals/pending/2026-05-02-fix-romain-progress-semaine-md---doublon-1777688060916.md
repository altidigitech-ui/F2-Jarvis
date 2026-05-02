---
date: "2026-05-02"
timestamp: "2026-05-02T02:14:20.916Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Fix romain/progress-semaine.md — doublon "94% ghost billing" + template ghost "Jour — Sujet" Mar 28/04
**Contexte:** Les lignes 39-41 de `romain/progress-semaine.md` contiennent trois entrées à 17:52 le 28/04 au lieu d'une :
- Ligne 39 : `"Mar 28/04 — 94% ghost billing — Shopify/Stripe don"` ← entrée correcte
- Ligne 40 : `"Mar 28/04 — 94% ghost billing — Shopify/Stripe don"` ← doublon exact
- Ligne 41 : `"Jour — Sujet"` ← placeholder template jamais remplacé, logué comme post publié

L'entrée "Jour — Sujet" est particulièrement problématique : elle suggère qu'un tweet avec ce contenu aurait potentiellement été émis (ou que le log de publication a injecté une ligne template vierge). Dans tous les cas, le log est pollué.
**Recommandation:** Supprimer les lignes 40 et 41 de `romain/progress-semaine.md` (garder la ligne 39, supprimer le doublon + le ghost).
**Action:**
- Fichier: `romain/progress-semaine.md`
- Supprimer ligne 40 : `| 28/04/2026 | Twitter post publié — "Mar 28/04 — 94% ghost billing — Shopify/Stripe don" | Twitter | Post publié 17:52 | Monitorer impressions + replies |`
- Supprimer ligne 41 : `| 28/04/2026 | Twitter post publié — "Jour — Sujet" | Twitter | Post publié 17:52 | Monitorer impressions + replies |`
**Risques si ignoré:** Log de Romain surestimé de 2 événements, template ghost "Jour — Sujet" visible comme post publié dans le tracker. Si c'est un bug du logging système, risque de reproduction sur les prochains batches.
