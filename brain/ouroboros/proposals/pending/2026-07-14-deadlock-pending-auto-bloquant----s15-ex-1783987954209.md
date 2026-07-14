---
date: "2026-07-14"
timestamp: "2026-07-14T00:12:34.211Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Deadlock PENDING auto-bloquant : "S15 expire 19/07" ↔ "S15 evergreen" — trancher avant d'agir sur le batch

**Contexte:** Deux proposals créées à 24h d'écart coexistent en PENDING et se contredisent directement :
- 2026-07-12 : *"S18 = dernière fenêtre pour le batch S15 — contenu 'offre de lancement' périme d'ici vendredi 19/07"*
- 2026-07-13 : *"Correction factuelle — Posts S15 evergreen : deadline '19/07' est un faux urgent, S19 reste valide"*

Ces deux proposals ne peuvent pas être vraies simultanément. La première crée une fausse urgence (agir avant vendredi ou perdre le contenu). La seconde l'annule et dit que S19 est tout aussi valide. Tant que les deux sont pendantes sans décision, n'importe quelle action sur le batch S18 est ambiguë : faut-il re-dispatcher S15 en urgence ou peut-on prendre le temps de créer un batch frais ?

**Recommandation:** Lors du prochain `/review-proposals`, traiter ces deux proposals EN PREMIER et dans l'ordre. Accepter la correction factuelle (contenu evergreen, pas de deadline réelle au 19/07) et rejeter explicitement la proposal "périme 19/07" avec le commentaire "faux urgent confirmé". Cela libère la décision batch sans pression calendaire artificielle.

**Action:**
- `brain/ouroboros/proposals/pending/2026-07-12-s18---derni-re-fen-tre-pour-le-batch-s15-1783836795906.md` → REJETER
- `brain/ouroboros/proposals/pending/2026-07-13-correction-factuelle---posts-s15-evergre-1783916147925.md` → ACCEPTER

**Risques si ignoré:** La contradiction bloque la prise de décision pour la 3ème semaine consécutive. Le deadlock est dans la queue elle-même, pas dans le repo.
