# PLAN 30 JOURS — ROMAIN

J1 = Lundi 05/05/2026 | J30 = Mercredi 03/06/2026
Objectif : acquisition beta testers StoreMD. Focus vente produit.
Stratégie : cold DM quotidien + publication schedulée + Reddit warming si le temps le permet.

---

## PRIORITÉS (ordre strict)

1. **COLD** — trouver des merchants Shopify et les contacter. C'est la priorité absolue.
2. **PUBLICATION** — schedulé depuis le batch-semaine, pas de rédaction en semaine.
3. **RÉPONSE** — répondre aux commentaires et DMs reçus.
4. **PH** — 5 upvotes + 1 commentaire/jour.
5. **REDDIT WARMING** — si le temps le permet après le cold.

---

## ROUTINE QUOTIDIENNE (lundi à vendredi)

### Matin — Cold (2-3h)

| Ordre | Plateforme | Compte | Volume | Action |
|-------|-----------|--------|--------|--------|
| 1 | TikTok | StoreMD (avec F) | 10 DMs | Recherche Apify → DM merchants Shopify |
| 2 | Instagram | StoreMD (avec F) | 10 DMs | Recherche Apify → DM merchants Shopify |
| 3 | Facebook | R perso | 10 DMs | Groupes Shopify → DM merchants |
| 4 | LinkedIn | R perso | 10 connexions+DMs | Recherche booléenne → connexion → DM |
| 5 | Twitter | R perso | 10 DMs | Recherche Grok → DM merchants Shopify |

Total : 50 DMs/jour. Personnalisés (voir `saas-app-shopify/storemd/cold/[cold-templates.md](http://cold-templates.md)`).

### Midi — Réponses + PH (30 min)

- Répondre à tous les DMs reçus (merchants qui ont répondu au cold)
- Répondre aux commentaires sur les posts publiés
- PH : 5 upvotes + 1 commentaire sur des lancements pertinents

### Après-midi — Reddit warming (si le temps le permet, 30 min-1h)

- Commenter dans r/shopify, r/ecommerce (value, pas pitch)
- Après J22 du plan Reddit (si atteint) : mention produit possible en ratio 90/10
- Si pas le temps → skip. Le cold est plus important.

### Soir — Suivi (15 min)

- Mettre à jour les cold-logs
- Vérifier les DMs en attente
- Préparer les cibles du lendemain (Grok, Apify)

---

## SAMEDI — BATCH

Le samedi est le jour de production :
- Préparer le batch-semaine R (Twitter, LinkedIn, Reddit)
- Préparer le batch-semaine StoreMD avec F (Instagram, TikTok, Twitter StoreMD, Facebook, IH)
- Scheduler tous les posts pour la semaine
- Pas de cold le samedi (sauf rattrapage)

---

## DIMANCHE — OFF ou rattrapage

---

## PHASES

### Phase 1 — Lancement machine cold (J1-J7 : 05-11 mai)

- Installer la routine quotidienne
- Lancer les premières sessions de recherche Apify/Grok sur chaque plateforme
- Remplir les recherche-logs avec les premiers merchants trouvés
- Premiers 50 DMs/jour
- Mesurer les taux de réponse par plateforme
- Premier batch-semaine samedi J6

### Phase 2 — Optimisation (J8-J14 : 12-18 mai)

- Analyser les taux de réponse par plateforme
- Doubler sur les plateformes qui convertissent le mieux
- Réduire le temps sur les plateformes à faible ROI
- Affiner les templates cold en fonction des réponses reçues
- Reddit : continuer le warming si le temps le permet

### Phase 3 — Scale (J15-J21 : 19-25 mai)

- Cold machine rodée, routine fluide
- Augmenter le volume sur les meilleures plateformes si possible
- Premiers beta testers installés → collecter feedback
- Reddit : les 30 jours de restriction approchent (comptes créés autour du 06/04)

### Phase 4 — Distribution Reddit + Scale cold (J22-J30 : 26 mai - 03 juin)

- Reddit : si 30 jours atteints → premiers posts dans r/shopify, r/ecommerce
- Mention produit possible sur Reddit en ratio 90/10
- Cold continue sur toutes les plateformes
- Objectif : X beta testers installés (chiffre à définir avec R)

---

## PUBLICATION SCHEDULÉE (pas de rédaction en semaine)

| Plateforme | Compte | Fréquence | Jours |
|-----------|--------|-----------|-------|
| Twitter | R perso | 1/jour | lun-ven |
| Twitter | StoreMD | 1/jour | lun-ven |
| LinkedIn | R perso | 2/sem | mardi, jeudi |
| Facebook | StoreMD | 1/jour | lun-ven |
| TikTok | StoreMD | 1/jour | lun-ven (vidéo) |
| Instagram | StoreMD | 1/jour | lun-ven (vidéo/carrousel) |
| IH | StoreMD | 1/sem | mercredi |
| Reddit | R perso | À déterminer | quand débloqué |

Tout est batché le samedi et schedulé. En semaine on ne rédige pas, on publie ce qui est programmé.

---

## COLD — SOURCES DE CIBLES

| Plateforme | Outil de recherche | Fichier prompt | Fichier log |
|-----------|-------------------|----------------|-------------|
| Twitter | Grok | `saas-app-shopify/recherche/cold/grok/twitter/[prompt-recherche.md](http://prompt-recherche.md)` | `[recherche-log.md](http://recherche-log.md)` |

---

## MÉTRIQUES À SUIVRE

| Métrique | Objectif | Suivi |
|----------|---------|-------|
| DMs envoyés/jour | 50 (10 × 5 plateformes) | cold-logs |
| Taux de réponse par plateforme | À mesurer S1 | cold-logs |
| Beta testers installés | À définir | `saas/storemd/[metrics.md](http://metrics.md)` |
| Conversations ouvertes | À mesurer | cold-logs |

---

## DOCUMENTS DE RÉFÉRENCE

| Document | Chemin |
|----------|--------|
| Templates cold | `saas-app-shopify/storemd/cold/[cold-templates.md](http://cold-templates.md)` |
| Context cold | `saas-app-shopify/storemd/cold/[context.md](http://context.md)` |
| Context produit | `saas-app-shopify/storemd/[context.md](http://context.md)` |
| Voix R | `[VOIX.md](http://VOIX.md)` |
| Batch-semaine perso R | `publication/[batch-semaine.md](http://batch-semaine.md)` |
| Batch-semaine StoreMD | `saas-app-shopify/storemd/publication/[batch-semaine.md](http://batch-semaine.md)` |
| Cold-logs perso | `cold/[cold-log-twitter.md](http://cold-log-twitter.md)`, `[cold-log-linkedin.md](http://cold-log-linkedin.md)`, `[cold-log-facebook.md](http://cold-log-facebook.md)` |
| Cold-logs StoreMD | `saas-app-shopify/storemd/cold/[cold-log-instagram.md](http://cold-log-instagram.md)`, `[cold-log-tiktok.md](http://cold-log-tiktok.md)` |
