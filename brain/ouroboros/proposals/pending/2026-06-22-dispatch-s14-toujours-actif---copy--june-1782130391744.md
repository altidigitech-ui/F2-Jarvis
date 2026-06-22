---
date: "2026-06-22"
timestamp: "2026-06-22T12:13:11.744Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Dispatch S14 toujours actif — copy "June 22 free" encore présente, J1 S15
**Contexte:** `marketing/saas-app-shopify/storemd/publication/batch-semaine.md` porte encore le header S14, référence `batch-semaine-S14.md` (archivé ce matin à 13:36), et contient dès la ligne 30 : `"Pro's free through June 22, no card."` — l'offre s'est terminée le 21/06 à minuit. Si un post de ce dispatch est schedulé pour aujourd'hui (TikTok 14h00, Instagram 18h00, Facebook 18h30), il sort avec de la copy expirée le jour même de la fin d'offre.
**Recommandation:** Vider ou marquer hors service le dispatch S14 immédiatement. Le remplacer par le dispatch S15 dès que le batch central S15 est créé. En attendant, vérifier si des posts TikTok/IG/FB de ce soir sont schedulés depuis ce fichier — si oui, les annuler.
**Action:**
- Fichier: `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
- Modifier: ligne 1 — remplacer `# BATCH PUBLICATION — Comptes StoreMD — S14` par `# BATCH PUBLICATION — Comptes StoreMD — S15 (À CRÉER)`
- Modifier: ligne 4 — remplacer la référence `batch-semaine-S14.md` par `batch-semaine-S15.md (pending)`
- Supprimer ou commenter tout le contenu S14 (lignes 14 à fin) pour qu'aucune copy "June 22" ne soit accidentellement utilisée.
**Risques si ignoré:** Posts StoreMD de ce soir (18h00/18h30) publiés avec "Pro's free through June 22" — copy mensongère dès demain matin. Perte de confiance si capturée par un follower.
