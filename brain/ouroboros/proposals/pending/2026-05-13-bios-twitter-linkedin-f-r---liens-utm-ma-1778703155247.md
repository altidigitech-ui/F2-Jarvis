---
date: "2026-05-13"
timestamp: "2026-05-13T20:12:35.247Z"
auteur: Ouroboros
priorité: moyenne
statut: pending
---

**Priorité:** moyenne
**Type:** maintenance
**Titre:** Bios Twitter/LinkedIn F+R — liens UTM manquants (bloque tracking trafic perso cette semaine)
**Contexte:** L'événement Romain 13/05 18:42 dans `romain/tracking/progress-semaines.md` liste ce qui a été fait vs ce qui reste : "Reste : bios Facebook Alti, Twitter R/F liens UTM, LinkedIn R/F liens UTM". Les posts perso Twitter et LinkedIn de F et R démarrent cette semaine avec des UTMs intégrés dans les textes — mais si les liens dans les bios n'ont pas d'UTM, tous les clics depuis les profils seront trackés comme trafic "direct" dans les analytics UTM. La source sera invisible. StoreMD TikTok bio a été mis à jour (✅), Instagram StoreMD bio mis à jour (✅), mais les 4 bios perso restent vides d'UTM.
**Recommandation:** Mettre à jour les 4 bios dès que possible, idéalement avant demain 14/05 (J4).
**Action:**
- Twitter @FabGangi → ajouter en bio/lien : `https://storemd.vercel.app/?utm_source=twitter&utm_medium=bio&utm_campaign=profile&utm_content=fabrice_bio`
- Twitter @delgado_ro72224 → ajouter : `https://storemd.vercel.app/?utm_source=twitter&utm_medium=bio&utm_campaign=profile&utm_content=romain_bio`
- LinkedIn Fabrice Gangitano → ajouter lien UTM dans la section "Website"
- LinkedIn Romain Delgado → idem
- Référence format UTMs : batch-semaine-S9.md ligne 18 (UTM pattern établi)
**Risques si ignoré:** Toute la semaine S9, les clics bio Twitter/LinkedIn F+R arrivent sans tag UTM → impossibilité de mesurer l'impact réel des posts perso sur l'acquisition StoreMD.
