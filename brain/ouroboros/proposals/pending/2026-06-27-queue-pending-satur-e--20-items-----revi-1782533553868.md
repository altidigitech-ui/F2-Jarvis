---
date: "2026-06-27"
timestamp: "2026-06-27T04:12:33.869Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** système
**Titre:** Queue PENDING saturée (20 items) — /review-proposals urgente avant S16
**Contexte:** La queue atteint 20 PENDING actifs dont : 4 méta-proposals pour fermer d'autres proposals (items qui s'auto-référencent), au moins 2 fenêtres d'action expirées (J4 25/06, J5 26/06), 1 faux positif confirmé aujourd'hui (PENDING #14), et des contradictions internes (ex: "Dispatch non exécuté" vs "Fermer Dispatch non exécuté" coexistent). À ce volume, les urgences réelles (S16 sans batch, cold à 0) sont noyées dans le bruit. Le système a été conçu pour 3-5 proposals max en attente.
**Recommandation:** Session `/review-proposals` dédiée avant lundi 29/06 pour purger d'un coup : archiver les expirés, rejeter les faux positifs, valider ou rejeter les structurels. Cible : redescendre à 5-8 PENDING actifs maximum pour S16.
**Risques si ignoré:** Les proposals pertinentes pour S16 (batch manquant, cold zéro, plan-30-jours expiré) continuent à être masquées par les items obsolètes. L'accumulation rend le système inutilisable comme tableau de bord.
