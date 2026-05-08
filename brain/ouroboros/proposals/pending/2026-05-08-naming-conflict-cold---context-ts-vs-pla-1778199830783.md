---
date: "2026-05-08"
timestamp: "2026-05-08T00:23:50.784Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Naming conflict cold : context.ts vs plan-30-jours → compteurs cold à jamais 0 même si cold démarre
**Contexte:** context.ts (ligne `readRepo(\`${activePrefix}/cold/cold-outreach-log.md\`)`) attend un fichier unique `cold-outreach-log.md`. Or le plan-30-jours.md de F (section "COLD — SOURCES DE CIBLES") référence 3 fichiers distincts : `cold/cold-log-twitter.md`, `cold/cold-log-linkedin.md`, `cold/cold-log-facebook.md`. Les répertoires `fabrice/cold/` et `romain/cold/` ne contiennent que des `archives/` — aucun de ces fichiers n'existe. Si le cold démarre demain (J5) et que les logs sont créés selon le plan-30-jours (ex: `cold-log-twitter.md`), JARVIS ne les lira pas et le compteur cold restera à 0. Le dashboard sera aveugle même avec activité réelle.
**Recommandation:** Choisir une convention et aligner les deux fichiers. Option A (plus simple) : modifier plan-30-jours F+R pour référencer un seul fichier `cold/cold-outreach-log.md` multiplateforme (une ligne par DM, colonne "Plateforme"). Option B : modifier context.ts pour agréger plusieurs fichiers cold par plateforme. L'Option A est moins invasive.
**Action:**
- Fichier: `fabrice/planning/plan-30-jours.md` (et idem romain)
- Section "COLD — SOURCES DE CIBLES" colonne "Fichier log" : remplacer `cold/cold-log-twitter.md` / `cold/cold-log-linkedin.md` / `cold/cold-log-facebook.md` → `cold/cold-outreach-log.md` pour les 3 plateformes perso F
- Créer `fabrice/cold/cold-outreach-log.md` avec header + tableau `|Date|Plateforme|Handle|Message|Statut|`
**Risques si ignoré:** Cold J5+ réalisé mais compteurs JARVIS = 0 en permanence. Impossible de valider la routine cold via le dashboard. Même problème pour Romain.
