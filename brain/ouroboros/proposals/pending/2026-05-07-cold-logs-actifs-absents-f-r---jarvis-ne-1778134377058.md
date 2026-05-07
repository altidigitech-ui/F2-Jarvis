---
date: "2026-05-07"
timestamp: "2026-05-07T06:12:57.059Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Cold-logs actifs absents F+R — JARVIS ne peut pas logger un DM même si le cold démarre aujourd'hui
**Contexte:** `fabrice/cold/` et `romain/cold/` contiennent uniquement `archives/` — aucun fichier actif. Les fichiers `cold-log-twitter.md`, `cold-log-linkedin.md`, `cold-log-facebook.md` référencés dans les deux `context.md` **n'existent pas**. Si F ou R lance sa première session cold cet après-midi et demande à JARVIS de logger un DM, l'action cible un fichier inexistant. Distinct de la proposal pending "zéro infrastructure créée" (qui porte sur les templates/cibles) — ici c'est les fichiers de log eux-mêmes.
**Recommandation:** Créer les 6 fichiers de cold-log vides (3 F + 3 R) avec headers minimaux pour débloquer le tracking dès ce soir.
**Action:**
- Créer : `fabrice/cold/cold-log-twitter.md`, `fabrice/cold/cold-log-linkedin.md`, `fabrice/cold/cold-log-facebook.md`
- Créer : `romain/cold/cold-log-twitter.md`, `romain/cold/cold-log-linkedin.md`, `romain/cold/cold-log-facebook.md`
- Header minimal : `# COLD LOG [PLATEFORME] — [PERSONA] — S8\n\n| Date | Handle | Message | Réponse |`
**Risques si ignoré:** Même si F+R démarre le cold aujourd'hui, les données partent dans le vide. Compteurs JARVIS restent à 0 → boucle de feedback cassée, impossible de mesurer les taux de réponse par plateforme comme prévu Phase 1 du plan-30-jours.
