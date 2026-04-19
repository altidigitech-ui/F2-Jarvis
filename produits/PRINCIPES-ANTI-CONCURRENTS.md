# PRINCIPES ANTI-CONCURRENTS — Ce que nos concurrents font mal et qu'on ne fera JAMAIS

Dernière mise à jour : 04/04/2026
Source : 530+ reviews 1-3★ scrapées (Chargeflow, TrueProfit, Avada SEO, PageFly, AgencyAnalytics, Descript, Whatagraph, Lifetimely/AMP, Octane AI, Plug In Speed, Opus Clip, vidIQ, Privy, Shogun, Databox, DashThis, Riverside.fm)

Ces principes s'appliquent à TOUS les 6 SaaS FoundryTwo. Ils sont non-négociables.

---

## 1. Jamais de modification sans consentement explicite

**Ce que les concurrents font :** Avada modifie le code du theme sans permission. PageFly injecte du code global même sur les pages non utilisées. Chargeflow auto-submit les disputes sans preuves complètes.

**Notre règle :** CHAQUE action qui modifie le store/les données/les campagnes du client nécessite un preview + une approbation explicite. Pas de "on fait ça pour vous en arrière-plan." Le client voit, comprend, et approuve.

**Implémentation :** Modal de confirmation avec diff visuel avant/après. Bouton "Approuver" / "Annuler." Log de toutes les modifications dans un historique accessible.

---

## 2. Zéro résidu à la désinstallation

**Ce que les concurrents font :** Avada laisse des snippets liquid, des sitemaps orphelins, et du JS mort. PageFly laisse du code qui "brique" le site. Les deux forcent le merchant à chercher manuellement les résidus.

**Notre règle :** Si le merchant désinstalle notre app, TOUT notre code est retiré proprement. Aucun résidu. Le store revient à son état pré-installation.

**Implémentation :** Script de cleanup automatique au uninstall. Vérification post-cleanup. Email de confirmation "Votre store a été nettoyé. Aucun résidu de [NomApp]."

---

## 3. Pricing transparent, sans piège

**Ce que les concurrents font :** Chargeflow facture $100 de "vérification" sans prévenir, double-charge $2805, 8% de frais d'annulation. TrueProfit augmente de 400% avec 1 semaine de préavis. Avada facture un plan annuel quand le merchant a sélectionné mensuel.

**Notre règle :** Prix affichés = prix payés. Pas de frais cachés. Pas de frais de vérification. Pas de frais d'annulation. Annulation en 1 clic, instantanée. Si le merchant approche de la limite de son plan → alerte AVANT la facture, pas après.

**Implémentation :** Page pricing claire. Bannière in-app "Vous êtes à X/Y de votre limite. Prochain plan : Z$/mois." Le merchant upgrade QUAND IL VEUT, pas quand on le force.

---

## 4. Données fiables dès le jour 1

**Ce que les concurrents font :** TrueProfit affiche des données fausses (ad spend incorrect, returns mal comptés, LTV incluant les non-acheteurs). AgencyAnalytics admet que "les chiffres ne matchent pas entre plateformes."

**Notre règle :** Au setup, on vérifie nos données vs les sources natives (Shopify, Stripe, Meta, Google). Si écart > 2% → on alerte et on explique le delta. Le merchant fait confiance aux chiffres dès le premier jour.

**Implémentation :** Data Integrity Check au setup. Réconciliation automatique quotidienne. Badge "Données vérifiées" visible dans le dashboard.

---

## 5. L'agent est PROACTIF, pas passif

**Ce que les concurrents font :** AgencyAnalytics montre des dashboards que le client doit interpréter. Chargeflow ne rappelle pas au merchant de soumettre des preuves. TrueProfit ne communique pas les bugs.

**Notre règle :** L'agent AGIT sans qu'on le lui demande. Il alerte, recommande, et propose des actions en 1 clic. Le merchant ne doit JAMAIS checker manuellement si tout va bien — l'agent le fait pour lui.

**Implémentation :** Notifications push (PWA), emails, alertes in-app. Chaque alerte = problème + diagnostic + action recommandée + bouton 1-clic.

---

## 6. Les optimisations appartiennent au merchant

**Ce que les concurrents font :** Avada REVERT toutes les optimisations quand le merchant désinstalle. "Work you do will be reverted upon cancelling — this is a scam."

**Notre règle :** Les optimisations sont pushées DANS la plateforme du merchant (Shopify, Meta, Google). Si le merchant nous quitte, il garde TOUT ce qu'on a fait. Zéro verrouillage.

**Implémentation :** Toute modification = API push vers la plateforme native. Pas de couche intermédiaire qui disparaît à la désinstallation.

---

## 7. Support technique direct

**Ce que les concurrents font :** Avada assigne des agents non-techniques qui "ne savent pas comment l'app fonctionne." PageFly a des agents qui "insultent" les merchants. Chargeflow harcèle les merchants pour qu'ils retirent leurs reviews négatives.

**Notre règle :** Le support répond en <2h. La personne qui répond COMPREND le produit. Pas de layer intermédiaire inutile. Jamais de harcèlement pour les reviews.

**Implémentation :** Support technique direct (pas de tier 1 non-technique). Templates de réponses techniques pré-validées. Escalade automatique si le ticket n'est pas résolu en 24h.

---

## 8. Les créations du client lui appartiennent toujours

**Ce que les concurrents font :** Descript suspend l'accès à TOUS les projets après un échec de paiement. HoneyBook rend l'export de données impossible en masse.

**Notre règle :** Les données et créations du client sont TOUJOURS accessibles, même après expiration du plan. Échec de paiement → 7 jours de grâce. Export complet en 1 clic à tout moment. Les données n'appartiennent pas à notre app — elles appartiennent au client.

**Implémentation :** Export CSV/PDF/ZIP en 1 clic. Mode lecture seule après expiration (pas de blocage total). Notification "Votre plan expire dans 3 jours. Vos données resteront accessibles en lecture."

---

## 9. Stabilité > Features

**Ce que les concurrents font :** Descript ship des features buggées ("treat customers like beta testers"). PageFly casse les sites avec ses mises à jour ("every update makes it worse"). Avada introduit des bugs qui détruisent les stores.

**Notre règle :** On ne ship JAMAIS une feature instable. La stabilité est un avantage compétitif. "It just works" = le standard. Chaque release passe par un QA rigoureux. Les régressions sont détectées et fixées avant que le client ne les remarque.

**Implémentation :** Tests automatisés sur chaque déploiement. Monitoring Sentry avec alertes < 5min. Rollback automatique si le taux d'erreur dépasse 1%. Le client ne doit JAMAIS subir un bug en production.

---

## 10. Annulation instantanée, zéro facturation fantôme

**Ce que les concurrents font :** Privy continue de facturer 6 mois, voire 6 ANS après désinstallation. "Cancelling on Shopify doesn't cancel the subscription." Shogun facture tant que les pages existent. Chargeflow facture après suppression de l'app.

**Notre règle :** Désinstallation = arrêt IMMÉDIAT de toute facturation. Pas de "contactez-nous pour annuler." Pas de frais cachés post-désinstallation. Pas de période de grâce qui facture. Le merchant désinstalle → c'est fini, point.

**Implémentation :** Webhook Shopify `app/uninstalled` → arrêt immédiat de la subscription Stripe. Email de confirmation "Votre abonnement [NomApp] est annulé. Dernier paiement : [date]. Aucun futur prélèvement." StoreMD Ghost Billing Detector aide les merchants à détecter ce problème chez les AUTRES apps.

---

## APPLICATION PAR SAAS

| Principe | StoreMD (incl. Listings) | ProfitPilot (incl. Anti-Fraude) | AdAudit | ClientPulse | CreatorSuite | LeadQuiz |
|----------|------------------------|-------------------------------|--------|------------|-------------|---------|
| 1. Pas de modif sans consentement | App Risk Monitor, Safe Mode, preview bulk | Merchant approuve avant soumission | — | — | — | — |
| 2. Zéro résidu | Cleanup auto | Cleanup auto | Cleanup auto | Cleanup auto | Cleanup auto | Cleanup auto |
| 3. Pricing transparent | ✅ | Zéro frais cachés, pas de % commission, alerte avant upgrade, garantie 12 mois | Plan solo 49$ | ✅ | Free tier généreux, crédits reportés | Pricing stable garanti |
| 4. Données fiables | Bot Traffic Filter | Data Integrity Check, Multi-Fulfillment Sync | Attribution Cleaner, Integration Health Monitor | — | — | — |
| 5. Agent proactif | Alertes régressives, Weekly Report, New Product Watch | Proactive Bug Alert, Proactive Evidence Reminder | Weekly Audit Report, Integration Health Monitor | Signaux de churn | Performance Coach | Auto-Optimize |
| 6. Optimisations au merchant | Zero Lock-in, push API Shopify | — | — | Export 1-clic | — | — |
| 7. Support technique | ✅ | Support < 2h, live chat trial | ✅ | Onboarding 5 min | Support humain, pas AI bot | ✅ |
| 8. Créations client toujours accessibles | — | Export CSV 1-clic | Export rapports 1-clic | Export complet 1-clic | Projets accessibles même après expiration | Export quiz + données 1-clic |
| 9. Stabilité > Features | QA apps tierces, Safe Mode | Réconciliation quotidienne | Monitoring intégrations | — | Export fiable 100%, Clip Context Guard, Cloud Processing | — |
| 10. Annulation instantanée | Ghost Billing Detector | ✅ | ✅ | ✅ | ✅ | ✅ |
