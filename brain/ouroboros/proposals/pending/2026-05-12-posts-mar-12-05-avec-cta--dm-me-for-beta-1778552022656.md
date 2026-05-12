---
date: "2026-05-12"
timestamp: "2026-05-12T02:13:42.657Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** alerte opérationnelle
**Titre:** Posts mar 12/05 avec CTA "DM me for beta" actifs — monitoring DMs manuel obligatoire (counters cassés)
**Contexte:** Le batch-semaine-S9.md (lignes 241–370) confirme que les posts du **mardi 12/05** contiennent des CTAs directs vers les DMs :
- Twitter F 13h00 : *"10 beta spots left. DM if you want in."*
- Twitter R 14h00 : *"DM me your .myshopify.com URL. I'll send you the install link"*
- TikTok StoreMD 14h00 : *"DM 'BETA' → get the install link"*
- Twitter StoreMD 15h00 : *"DM your .myshopify.com URL"*

Ces posts vont live aujourd'hui (13h-15h). Or, le compteur `repliesIn` est bloqué à 0 depuis le début de S9 (bug context.ts, 3 proposals pending). **JARVIS ne peut pas détecter automatiquement qu'un DM est arrivé.** Si un merchant DM après avoir vu le post et attend une réponse dans l'heure, il ne recevra rien — conversion annulée.
**Recommandation:** F et R vérifient manuellement leurs DMs Twitter entre **14h et 21h** aujourd'hui. Même procédure TikTok StoreMD. Répondre dans les 2h maximum après réception. Ajouter chaque réponse dans `fabrice/cold/cold-log-twitter.md` et `romain/cold/cold-log-twitter.md` (section "DMs inbound").
**Risques si ignoré:** Taux de conversion beta = 0 malgré des posts avec intention d'achat confirmée. J2 de Phase 2 avec 0 beta testeurs alors que la mécanique est en place.
