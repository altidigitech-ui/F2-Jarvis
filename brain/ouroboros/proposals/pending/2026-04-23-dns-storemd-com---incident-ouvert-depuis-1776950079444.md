---
date: "2026-04-23"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Titre:** DNS storemd.com — incident ouvert depuis J+9 sans résolution visible
**Contexte:** Le HANDOFF du 19/04 liste le DNS storemd.com comme incident ouvert ("DNS storemd.com cassé — Vercel pointe sur rien"). Aujourd'hui 23/04, soit 4 jours plus tard : aucune mention de résolution dans le repo (progress-semaine vide, pas d'événement notable). Tous les posts S6 publiés utilisent `https://storemd.vercel.app/` — ce qui est correct selon les règles du batch. Mais si le DNS résout en cours de semaine sans coordination, les posts déjà publiés pointent vers l'ancienne URL, les nouveaux vers le domaine, et les scans agrégés dans les analytics seront fragmentés entre deux origines.
**Recommandation:** Décider explicitement : (1) résoudre le DNS avant vendredi 24/04 et adopter une règle "passer à storemd.com dès S7 uniquement" pour ne pas mélanger les URLs en mid-semaine, ou (2) laisser le DNS pour S7 et ne rien changer à S6. Documenter la décision dans le progress-semaine ou HANDOFF. Éviter la résolution silencieuse en mid-semaine.
**Risques si ignoré:** Fragmentation des analytics UTM (quand ils seront en place). Cohérence des posts S6 compromise si storemd.com et storemd.vercel.app coexistent dans les publications de la même semaine.
