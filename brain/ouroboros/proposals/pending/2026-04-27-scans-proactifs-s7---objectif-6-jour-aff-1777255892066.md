---
date: "2026-04-27"
timestamp: "2026-04-27T02:11:32.067Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Scans proactifs S7 — objectif 6/jour affiché sans fichier de tracking
**Contexte:** La timeline Fabrice affiche "Scans proactifs: 0/6 aujourd'hui" — c'est un objectif journalier clé de la Couche B "No Install". Or le répertoire `fabrice/tracking/` ne contient aucun fichier de log des scans proactifs (seulement `comptes-groupes.md`, `douleurs-observees.md`, `karma-reddit.md`). Les scans proactifs (URL scanées sans OAuth) sont la SUBSTANCE qui alimente les posts Couche B (chiffres, citations, screenshots). 6/jour × 5 jours = 30 scans/semaine à documenter pour crédibiliser les posts B1-B4.
**Recommandation:** Créer un fichier `fabrice/tracking/scans-proactifs-S7.md` avec un tableau simple : Date | Store URL | Résultats clés (ghost billing €, app bloat, checkout issues) | Utilisé dans post (oui/non). Permet de tracer les 30 scans, d'alimenter les posts Couche B et de construire les données du "canon S7 : 90 stores / $15,600 cumul".
**Action:**
- Fichier à créer : `fabrice/tracking/scans-proactifs-S7.md`
- Structure minimale : tableau Date | URL | Ghost billing | App bloat | Checkout | Post Couche B (ID)
**Risques si ignoré:** Les 6 scans/jour ne sont tracés nulle part. Impossible de vérifier la progression vers les 30 scans hebdo. Les chiffres des posts Couche B ("6 stores scanned this week") n'ont pas de source vérifiable dans le repo.
