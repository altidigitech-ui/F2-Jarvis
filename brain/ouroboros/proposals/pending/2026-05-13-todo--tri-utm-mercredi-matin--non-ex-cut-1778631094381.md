---
date: "2026-05-13"
timestamp: "2026-05-13T00:11:34.381Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** TODO "Tri UTM mercredi matin" non exécuté — posts TikTok/Instagram/Facebook S9 à risque publication avec liens invalides
**Contexte:** `romain/tracking/progress-semaines.md` ligne du 12/05 23:45 : *"Tous les posts schedulés mar-dim sauf ceux avec liens UTM non valides (tri à faire mercredi). TODO créé : liens UTM bio <80 car. TikTok/Instagram/Facebook (double flag)"*. Aujourd'hui est mercredi 13/05. Aucune ligne ajoutée dans progress-semaines.md R ni F confirmant que ce tri a été réalisé. Les posts TikTok/Instagram/Facebook sont déjà schedulés depuis le batch. Des liens UTM >80 caractères peuvent être tronqués en bio sur TikTok/Instagram, cassant le tracking et potentiellement la redirection.
**Recommandation:** Vérifier et corriger les liens UTM en bio sur TikTok StoreMD, Instagram StoreMD, et Facebook F/R avant que les prochains posts du jour partent. Puis logger l'action dans progress-semaines.md R avec date et heure.
**Action:**
- Vérifier la longueur de chaque UTM bio sur TikTok/Instagram/Facebook (< 80 caractères)
- Si non conforme : raccourcir ou utiliser un lien de redirection
- Fichier: `romain/tracking/progress-semaines.md`
- Ajouter ligne : `| 13/05 | HH:MM | Tri UTM bio effectué — TikTok/Instagram/Facebook OK | Multi-plateforme | Ops | Liens vérifiés/corrigés |`
**Risques si ignoré:** Posts publiés avec liens bio brisés ou tracking UTM inutilisable pour toute la semaine S9. Impossible de mesurer les conversions issues des réseaux sociaux vidéo.
