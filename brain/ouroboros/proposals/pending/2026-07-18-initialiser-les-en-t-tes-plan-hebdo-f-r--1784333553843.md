---
date: "2026-07-18"
timestamp: "2026-07-18T00:12:33.845Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Initialiser les en-têtes plan-hebdo F+R pour S19 (20-24/07)
**Contexte:** `fabrice/planning/plan-hebdo.md` et `romain/planning/plan-hebdo.md` contiennent toujours les placeholders `[DATE]` en ligne 1 (`Semaine du [DATE] au [DATE]`) et `[DATE SAMEDI]` à la ligne "Rempli au batch". Ces fichiers n'ont jamais été datés depuis leur création. Cela diffère des dispatch (posts) déjà couverts par les PENDINGs : ici c'est la structure de pilotage hebdomadaire (cold tracking, PH, recap) qui est orpheline de tout contexte temporel.
**Recommandation:** Renseigner les en-têtes de date pour S19 et la section 7 (Priorités) avec les 3 priorités connues, indépendamment du batch. Le contenu posts (section 1) peut rester ⏳ en attendant le batch S19.
**Action:**
- Fichier: `fabrice/planning/plan-hebdo.md`
  - Ligne 1: `# PLAN HEBDO F — Semaine du [DATE] au [DATE]` → `# PLAN HEBDO F — Semaine du 20/07/2026 au 24/07/2026`
  - Ligne 3: `**Rempli au batch :** [DATE SAMEDI]` → `**Rempli au batch :** 18/07/2026 (weekend S19 — contenu posts à dispatcher)`
  - Section 7: remplacer `[À remplir]` × 3 par :
    1. Dispatcher le batch S19 (contenu StoreMD + perso F)
    2. Cold outreach : 50 DMs/jour × 5 jours
    3. PH : 6 interactions/jour
- Fichier: `romain/planning/plan-hebdo.md`
  - Mêmes modifications (adapter "perso F" → "perso R" en section 7)
**Risques si ignoré:** Le plan-hebdo reste inutilisable comme outil de pilotage ; la section cold tracking et le recap fin de semaine n'ont pas de référence temporelle.
