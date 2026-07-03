---
date: "2026-07-03"
timestamp: "2026-07-03T08:11:52.889Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** escalade
**Titre:** CORRECTION URGENTE — Fenêtre batch S17 = DEMAIN samedi 04/07, le PENDING dit dimanche 05/07 (erreur)
**Contexte:** Le PENDING "Batch S17 — fenêtre samedi 05/07" contient une erreur de date. Aujourd'hui = vendredi 03/07. Samedi = 04/07. Le 05/07 est un **dimanche**. Si Fabrice lit le PENDING demain matin en croyant avoir jusqu'à "samedi 05/07", il ratera la vraie fenêtre d'une journée entière. S17 démarre lundi 06/07. Le samedi canonique de création = **demain matin 04/07** (dans moins de 12h). C'est une donnée nouvelle (calendrier confirmé ce cycle) qui change fondamentalement l'urgence du PENDING existant.
**Recommandation:** Demain matin dès que possible (samedi 04/07) : lancer la création du batch S17 via JARVIS. Ne pas attendre le 05/07 — ce jour est un dimanche et S17 démarrerait sans batch.
**Risques si ignoré:** S17 rejoint S16 dans le silence. À ce stade la machine d'acquisition serait arrêtée depuis ~1 mois consécutif (S15 partiellement publiée → S16 vide → S17 vide). Momentum algorithmes et acquisition beta testers à zéro.
