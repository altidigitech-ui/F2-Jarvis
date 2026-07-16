---
date: "2026-07-16"
timestamp: "2026-07-16T02:13:44.251Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** systemic
**Titre:** Circuit décisionnel en panne : 64 PENDINGs + 0 décision depuis 78 jours (29/04)
**Contexte:** Dernières décisions Ouroboros enregistrées dans le système : **29 avril 2026** (3 ACCEPTED + 3 REJECTED). Depuis, aucune proposition n'a reçu de réponse — ni accept, ni reject, ni commentaire. La queue est passée de 20 items le 27/06 (quand l'alerte "/review-proposals urgente" a été émise) à **64 items aujourd'hui** (+44 en 18 jours = 2.4 nouveaux/jour). Le problème n'est plus la quantité des proposals : c'est que le mécanisme de décision lui-même est inactif. Les proposals s'accumulent mais aucune ne se traduit en action. La queue contient des proposals contradictoires entre elles (ex: "CLORE Escalade" + "Escalade originale" toujours actives en parallèle), des proposals datées de S16/S17 périmées, et des proposals urgentes de S18 non traitées.
**Recommandation:** Une session `/review-proposals` **avant le démarrage de S19 (lundi 20/07)** est la condition nécessaire pour débloquer l'opérationnel. Tri suggéré en 3 passes :
1. **Archiver** : toutes les proposals avec fenêtre expirée (S16, S17, S18 clôtures passées) — ~25 items identifiables
2. **Décider** : les 5 proposals actives avec Action précise (Raccourci S19, Correction dispatch, parseTimeline fix, StoreMD dispatch, UTM stale) — 30 min max
3. **Reporter** : le reste (améliorations long terme) à S20+
**Action:**
- Session `/review-proposals` ce week-end (Sam 18 ou Dim 19/07) avant S19
- Focus prioritaire : "Raccourci S19 propre" + "Correction état réel dispatch" + "parseTimeline dead code"
- Critère d'archivage automatique proposable : toute proposal dont la "fenêtre" mentionnée dans le titre est antérieure à S18 (14/07)
**Risques si ignoré:** S19 démarre Lundi avec 64 proposals en queue, sans décision sur le Raccourci S19, et le pattern de semaines perdues continue pour la 9ème fois.
