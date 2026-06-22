---
date: "2026-06-22"
timestamp: "2026-06-22T06:14:28.132Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** maintenance
**Titre:** Asymétrie "Scans proactifs" — objectif affiché pour Fabrice, absent pour Romain
**Contexte:** `timeline_today(fabrice)` renvoie "Scans proactifs: 0/6 aujourd'hui" comme objectif du jour. `timeline_today(romain)` ne contient pas cet objectif. Pourtant `counters_today` renvoie `pipelineScans: 0` pour les DEUX personas — le compteur backend est partagé, mais l'objectif n'est affiché que pour F dans JARVIS. Non documenté nulle part, non couvert par les 33 PENDING.
**Recommandation:** Décider explicitement si "Scans proactifs" est un objectif F-only (Fabrice pilote le pipeline) ou partagé F+R. Si F-only → documenter dans la config des objectifs. Si partagé → ajouter l'objectif à la timeline R dans `buildObjectives()`.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts` (ou source de `buildObjectives()`)
- Vérifier: condition sur persona pour le bloc "Scans proactifs / pipelineScans"
- Modifier: soit ajouter la condition `persona === 'fabrice'` commentée, soit ajouter l'objectif pour Romain
**Risques si ignoré:** Si R est censé faire des scans pipeline, son activité n'est pas suivie dans JARVIS. Si F-only est intentionnel, l'absence de documentation crée une confusion lors de la prochaine modification des objectifs.
