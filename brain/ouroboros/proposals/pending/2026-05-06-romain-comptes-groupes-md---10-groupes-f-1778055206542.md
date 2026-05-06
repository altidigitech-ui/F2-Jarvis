---
date: "2026-05-06"
timestamp: "2026-05-06T08:13:26.545Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** maintenance
**Titre:** Romain comptes-groupes.md — 10 groupes Facebook du 27/04 absents du tracker
**Contexte:** Le fichier `romain/tracking/comptes-groupes.md` (1KB) affiche uniquement le compte perso Facebook créé en J1 (06/04). Or `romain/tracking/progress.md` ligne du 27/04 documente explicitement : "Rejoint 10 groupes Facebook (setup présence)" avec la liste complète : Shopify Dropshipping, E-commerce dropshipping/e-business, Shopify for Beginners, DropShipping/Shopify-France, Entrepreneurs et freelances, Expertos en Shopify, GoHighLevel Agency Owners, Shopify Experts & Newbies, N8N Templates, MARCHAND DE BIENS PARTNERS. Ces 10 groupes rejoints en S7 J1 sont introuvables dans le tracker depuis 9 jours.
**Recommandation:** Ajouter les 10 lignes dans la section Facebook de `romain/tracking/comptes-groupes.md` en reprenant les données de progress.md.
**Action:**
- Fichier: romain/tracking/comptes-groupes.md
- Ajouter sous la ligne `| Compte perso | 06/04 | Actif | ... |` les 10 entrées suivantes :
  ```
  | Shopify Dropshipping | 27/04 | Rejoint | S7 J1 setup |
  | E-commerce dropshipping/e-business | 27/04 | Rejoint | S7 J1 setup |
  | Shopify for Beginners | 27/04 | Rejoint | S7 J1 setup |
  | DropShipping/Shopify-France | 27/04 | Rejoint | S7 J1 setup |
  | Entrepreneurs et freelances | 27/04 | Rejoint | S7 J1 setup |
  | Expertos en Shopify | 27/04 | Rejoint | S7 J1 setup |
  | GoHighLevel Agency Owners | 27/04 | Rejoint | S7 J1 setup |
  | Shopify Experts & Newbies | 27/04 | Rejoint | S7 J1 setup |
  | N8N Templates | 27/04 | Rejoint | S7 J1 setup |
  | MARCHAND DE BIENS PARTNERS | 27/04 | Rejoint | S7 J1 setup |
  ```
**Risques si ignoré:** Le tracker Facebook R reste muet à 1 groupe alors que 10 ont été rejoints. Si on veut auditer la présence Facebook R en S8 (Cold Facebook = canal prioritaire selon context.md), on part d'une base fausse. La fiche comptes-groupes devient inutilisable pour mesurer la progression.
