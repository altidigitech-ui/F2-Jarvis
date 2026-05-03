---
date: "2026-05-03"
timestamp: "2026-05-03T08:18:03.210Z"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Type:** code-fix
**Titre:** Fix: timeline_today affiche les objectifs quotidiens les jours OFF (dimanche = 0/10 cold affiché)
**Contexte:** Dim 03/05 est explicitement marqué `— (OFF)` dans les deux plan-hebdo F et R. Pourtant `timeline_today` retourne aujourd'hui pour F : `"Cold outreach: 0/10 aujourd'hui"`, `"Engagement: 0/30 interactions aujourd'hui"`, `"Scans proactifs: 0/6 aujourd'hui"` — et pour R : `"Cold outreach: 0/10 aujourd'hui"`, `"Engagement: 0/30 interactions aujourd'hui"`. Ces objectifs créent un faux signal de retard un jour officiellement sans activité. Absent des 29 proposals pending.
**Recommandation:** Ajouter une détection "jour OFF" dans la logique qui génère les objectifs de `timeline_today` (probablement `backend/jarvis/src/routes/context.ts`). Si le plan-hebdo marque le jour courant comme `— (OFF)`, supprimer les lignes d'objectifs du tableau timeline retourné. Les posts publiés (s'il y en a) resteraient visibles.
**Action:**
- Fichier: `backend/jarvis/src/routes/context.ts` (ou le helper qui construit les objectifs timeline)
- Ajouter : avant d'injecter les lignes `"Cold outreach: 0/X"`, `"Engagement: 0/X"`, `"Scans: 0/X"` → vérifier si `plan-hebdo.md` du persona marque la date du jour comme OFF → si oui, skip les objectifs.
- Impact : dimanche et jours OFF affichent une timeline vide (ou sans objectifs), cohérente avec la stratégie plan-hebdo.
**Risques si ignoré:** UX mineure — Fabrice/Romain voient "0/10 cold" le dimanche, ce qui peut déclencher une fausse anxiété ou un message JARVIS de relance sur un jour de repos.
