---
date: "2026-05-16"
timestamp: "2026-05-16T02:13:22.429Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Analytics S9 vides (F+R) — 3 jours de posts publiés sans aucune métrique collectée
**Contexte:** Les sections `## ANALYTICS` de `fabrice/tracking/progress-semaines.md` et `romain/tracking/progress-semaines.md` sont toutes deux **entièrement vides** (tables vierges). Pourtant, 28 posts sont schedulés et publient depuis le 13/05 sur Twitter, TikTok, Facebook, LinkedIn, Instagram. Aujourd'hui samedi 16/05, 3 jours complets de données platform sont disponibles (13, 14, 15/05). Sans ces chiffres, le bilan S9 sera analytics-aveugle et S10 sera planifié sans baseline.
**Recommandation:** Remplir les tables ANALYTICS dans les deux fichiers avec au minimum les métriques des 3 premiers jours de publication (impressions, engagement rate, replies, new follows) depuis les dashboards Twitter Analytics, TikTok Studio, Meta Business Suite.
**Action:**
- Fichier 1: `fabrice/tracking/progress-semaines.md` → section `## ANALYTICS`, remplir les lignes 13/05, 14/05, 15/05 par plateforme
- Fichier 2: `romain/tracking/progress-semaines.md` → idem
**Risques si ignoré:** Bilan S9 incomplet. Aucune donnée pour calibrer S10 (quel format fonctionne ? quel horaire ? quelle plateforme?). Pattern aveugle qui se répète semaine après semaine.
