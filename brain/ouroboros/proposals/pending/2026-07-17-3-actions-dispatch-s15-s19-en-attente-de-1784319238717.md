---
date: "2026-07-17"
timestamp: "2026-07-17T20:13:58.718Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** 3 actions dispatch S15→S19 en attente de validation JARVIS — fenêtre ce weekend
**Contexte:**
La session JARVIS de ce soir (17:27) a produit "3 actions en parallèle, prêtes à valider" pour le dispatch S15 vers S19. Vérification repo à l'instant :
- `fabrice/publication/batch-semaine.md` → toujours dates 22-28/06 (S15)
- `romain/publication/batch-semaine.md` → toujours dates 22-28/06 (S15)
- StoreMD dispatch → toujours absent

Les 3 actions sont donc en attente dans la queue JARVIS, **non encore validées**. Le contenu (evergreen, vérifié) est prêt. Seul le clic de validation manque.

Fenêtre critique : S19 démarre lundi 20/07. Si les actions sont validées avant dimanche soir → la timeline JARVIS est active lundi matin. Si elles ne sont pas validées → 9e semaine consécutive sans contenu schedulé dans JARVIS.
**Recommandation:** Ouvrir JARVIS ce weekend → onglet Actions en attente → valider les 3 actions dispatch (F, R, StoreMD). Si StoreMD n'est pas dans la queue (absent du repo), créer manuellement le fichier `storemd/publication/batch-semaine.md` via JARVIS en parallèle.
**Action:**
- Aller dans JARVIS UI → Actions pendantes
- Valider les 3 actions de la session 17:27 (dispatch F + dispatch R + StoreMD)
- Vérifier ensuite que `parseTimeline` remonte des posts avec dates ≥ 20/07
**Risques si ignoré:** Lundi 20/07 = J1 S19 sans timeline JARVIS. Pattern de démarrage raté continue (S16, S17, S18 toutes perdues de la même façon).
