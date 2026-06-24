---
date: "2026-06-24"
timestamp: "2026-06-24T06:14:21.422Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Workaround JARVIS loop bug — générer le batch S15 en 2 segments sans fix déploiement
**Contexte:** Le bug chat.ts bloque la génération batch depuis 6 tentatives (23/06 18h39→19h45). Le fix nécessite un déploiement Railway (délai inconnu). Demain J4 = dernière fenêtre réaliste pour S15. La règle conflictuelle (`OUTPUT§"batch complet"` vs `PATTERNS§create_file`) se déclenche uniquement sur la demande globale d'un batch complet d'une traite. Le `batch-template.md` est présent et prêt à `marketing/contenu/batch-semaine/batch-template.md` (31KB). Le contenu S15 a été généré en conversation le 23/06 à 19h45 mais jamais commité.
**Recommandation:** Contourner le bug en deux instructions JARVIS séparées, sans déclencher l'exception "batch complet" :
1. `"Génère UNIQUEMENT les jours Lun 22/06 → Mer 24/06 du batch S15 en markdown brut. N'utilise PAS create_file. Output pur seulement."`
2. `"Génère UNIQUEMENT les jours Jeu 25/06 → Dim 28/06 du batch S15 en markdown brut. N'utilise PAS create_file. Output pur seulement."`
Fusionner les deux outputs puis passer un unique `create_file` sur `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`.
**Action:**
- Fichier cible (à créer/écraser) : `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
- Aucun déploiement requis — workaround conversationnel pur
- Applicable dès maintenant, avant fix chat.ts
**Risques si ignoré:** S15 entièrement perdue (J1→J5 = 0 post StoreMD), soit 5e semaine consécutive sans contenu. La copy "June 22" expirée reste la face publique StoreMD indéfiniment.
