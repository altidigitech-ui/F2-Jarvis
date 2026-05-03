---
date: "2026-05-03"
timestamp: "2026-05-03T02:15:17.917Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Vérifier V2 TikTok/Instagram — placeholders [X_APPS] et [X_DEAD] potentiellement publiés tels quels le 30/04
**Contexte:** `fabrice/publication/BATCH-VIDEO-SOCIAL-S7.md` ligne V2 porte la mention explicite `⚠️ Remplace [X_APPS] et [X_DEAD] par les chiffres réels de la vidéo avant de poster`. V2 ("the7letter — app bloat / scripts fantômes") a été publié le 30/04 à 12:34 dans un batch automatique JARVIS (7 posts en 2 minutes, sans intervention manuelle visible dans progress-semaine). Le cold-outreach-log confirme que @the7letter_ a été scanné le 28/04 avec score 64/100, mais les valeurs réelles d'apps/dead scripts ne sont pas dans le fichier batch. Si les crochets sont toujours dans la caption, le texte `[X_APPS] apps installed, [X_DEAD] still injecting scripts` est en ligne sur TikTok et Instagram depuis 72h.
**Recommandation:** Ouvrir manuellement le profil TikTok et Instagram StoreMD → vérifier la caption de V2. Si placeholders présents : corriger la caption (TikTok permet l'édition) ou supprimer + republier avec les données réelles du scan the7letter (score 64/100 — récupérer le nombre d'apps et de dead scripts depuis la vidéo).
**Action:**
- Vérification: ouvrir TikTok StoreMD + Instagram StoreMD → chercher le post du 30/04 "app bloat / scripts fantômes"
- Si placeholder détecté: éditer la caption ou supprimer/republier
- Fichier à mettre à jour si republication: `fabrice/publication/BATCH-VIDEO-SOCIAL-S7.md` + `fabrice/progress-semaine.md` (ajouter événement corrigé)
**Risques si ignoré:** Caption avec texte `[X_APPS]` visible sur les profils publics — décrédibilise le scanner aux yeux des prospects qui ont vu le post. Contenu broken depuis 3 jours.
