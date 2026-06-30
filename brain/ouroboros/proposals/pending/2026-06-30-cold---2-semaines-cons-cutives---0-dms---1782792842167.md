---
date: "2026-06-30"
timestamp: "2026-06-30T04:14:02.168Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** alerte-pattern
**Titre:** Cold — 2 semaines consécutives à 0 DMs (S15 + S16 J2) → diagnostic structurel requis

**Contexte:** Le PENDING "Cold S15 — zéro DM envoyé sur la semaine entière" ciblait un incident S15. Nouvelle donnée ce cycle : on est J2 de S16 et le cold est toujours à 0 pour F et R sur toutes les plateformes (TikTok, Instagram, Facebook, Twitter, LinkedIn). Les cold-logs sont vides depuis la création des fichiers. Aucune entrée sur 2 semaines consécutives = ce n'est plus un oubli ponctuel.

Pattern : **S15 (22-28/06) = 0 DMs. S16 J1+J2 (29-30/06) = 0 DMs.** Objectif théorique : 50 DMs/jour × 5 jours = 250/semaine. Déficit cumulé : ~500+ DMs non envoyés sur 2 semaines.

**Recommandation:** Avant de continuer à tracker le cold, diagnostiquer pourquoi il ne se fait pas : blocage de temps (batch non créé = pas de contenu = démotivation ?), blocage de plateforme (comptes limités ?), ou décision implicite de le déprioritiser ? La réponse change l'action. Si le blocage est le batch S16 manquant, résoudre le batch résout aussi le cold context. Si c'est un autre blocage, il faut le nommer explicitement.

**Risques si ignoré:** Le cold est le seul canal d'acquisition directe de beta testers. 0 DMs = 0 chances de conversion = pipeline betas à l'arrêt depuis 2 semaines. La résolution du batch seul ne suffit pas si un autre blocage empêche l'envoi.
