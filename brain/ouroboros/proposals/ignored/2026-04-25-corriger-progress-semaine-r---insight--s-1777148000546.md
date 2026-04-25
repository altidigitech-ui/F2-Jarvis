---
date: "2026-04-25"
timestamp: "2026-04-25T20:13:20.547Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Corriger progress-semaine R — insight "StoreMD URL-only validé" contredit la décision Fabrice du 25/04
**Contexte:** La section Insights de `romain/progress-semaine.md` (archivage demain 26/04) contient :
> *"StoreMD URL-only validé, CTA 'drop your URL, free scan 60s' opérationnel dès S7"*

Or Fabrice a explicitement corrigé ce point le 25/04 lors du rejet de la proposal précédente : **"StoreMD URL-only scan opérationnel" il n'est pas opérationnel justement"**. Le mur OAuth Shopify bloque toujours. Si archivé tel quel, cet insight incorrect alimentera le contexte du batch S8 en tant que vérité établie.
**Recommandation:** Corriger l'insight avant archivage dimanche.
**Action:**
- Fichier: `romain/progress-semaine.md`
- Modifier la dernière ligne de la section "INSIGHTS ET PATTERNS" :
  - AVANT : *"Cold S6 = 0/50 mais infrastructure complète opérationnelle : StoreMD URL-only validé, templates R-01/R-02/R-03 créés, CTA 'drop your URL, free scan 60s' prêt. S7 est la vraie semaine de départ cold R."*
  - APRÈS : *"Cold S6 = 0/50 mais templates R-01/R-02/R-03 créés. **Important :** StoreMD URL-only non validé — la page redirige vers auth Shopify OAuth, scan sans install non fonctionnel. CTA 'drop your URL' suspendu jusqu'à correction technique. S7 : cold possible uniquement sur les stores où F/R scannent manuellement en amont."*
**Risques si ignoré:** Le batch S7 et S8 seront construits sur la prémisse que le scan proactif fonctionne en self-serve, alors qu'il ne fonctionne pas. Risque de cold outreach avec un CTA qui ne convertit pas.
