# Playbook — Launch SaaS F2

## Timeline standard (T-7 à T+30)

### T-14 : Préparation
- [ ] Landing page live et indexée
- [ ] Waitlist active (si applicable)
- [ ] Screenshots produit finalisés (réels, pas mockups)
- [ ] Demo video 30-60s (TikTok native editor ou OBS simple)
- [ ] Test stack complet end-to-end (signup → trial → paid)

### T-7 : Drafts content
- [ ] Post LinkedIn FR Romain (draft dans `marketing/posts/draft/`)
- [ ] Thread Twitter EN Fabrice (draft)
- [ ] Email à la waitlist (si waitlist)
- [ ] Mention dans newsletter F2 (si applicable)

### T-3 : Validation
- [ ] Fabrice valide draft Fabrice
- [ ] Romain valide draft Romain
- [ ] Vérification TOILE rule sur tous contenus (grep Altistone)
- [ ] Vérification anti-patterns (no fake stats, no revolutionary, etc.)
- [ ] Test UTM links

### T-1 : Final check
- [ ] Stripe en LIVE mode (pas test)
- [ ] Sentry en prod
- [ ] Webhooks vérifiés
- [ ] Status page publique
- [ ] Support email actif
- [ ] Screenshots à jour (un dernier check)

### T0 : Launch day

**Ordre de publication** :
1. **Matin** (9h CEST) : Post LinkedIn Romain (audience FR)
2. **Midi** (12h CEST / 6am ET) : Thread Twitter Fabrice (audience US+EU mix)
3. **Après-midi** (14h CEST) : Email waitlist
4. **Fin d'après-midi** : Post Indie Hackers
5. **Soir** (si applicable) : Product Hunt submit (seulement si stratégie claire)

**Pendant la journée** :
- Fabrice répond aux commentaires techniques dans les 2h
- Romain répond aux commentaires LinkedIn dans les 2h
- Support email < 4h pendant les 48h suivant launch

### T+1 à T+7 : Nurturing
- [ ] Daily check métriques (signups, churn, erreurs)
- [ ] Hotfix < 4h si bug critique
- [ ] Repost Twitter avec premier retour utilisateur (si bon)
- [ ] Newsletter F2 avec screenshot + 1 learning

### T+7 : Debrief
- [ ] Run `/debrief launch <saas>`
- [ ] Documenter learnings dans `studio/decisions/post-mortem-*.md`
- [ ] Mise à jour `studio/metrics/launches.md` avec chiffres J+7
- [ ] Post LinkedIn FR Romain : "Premier bilan 7 jours"

### T+30 : Bilan mois 1
- [ ] Mise à jour `studio/metrics/mrr.csv`
- [ ] Post LinkedIn FR + Twitter EN sur MRR réel
- [ ] Décision : continuer, pivoter, archiver

## Canaux par priorité

1. **LinkedIn FR (Romain)** — meilleur ROI sur audience FR founder/marketer
2. **Twitter EN (Fabrice)** — meilleur ROI sur audience dev international + Shopify ecosystem
3. **Email direct** (waitlist, newsletter) — highest conversion, tout le monde l'ouvre
4. **Indie Hackers** — traffic moyen mais audience qualifiée
5. **Product Hunt** — optionnel, ROI hit-or-miss
6. **Reddit / communautés niche** — dépend du SaaS et de la niche

## Ce qu'on ne fait PAS au launch

- Pas de "teaser" qui laisse croire que ça launch "soon" pendant 2 mois
- Pas d'annonce sur 10 canaux simultanément en copier-coller
- Pas de pitch aux influenceurs "contre rémunération"
- Pas de fake "community" sur Discord avant d'avoir 100+ vrais users
- Pas d'engagement bait ("retweet si d'accord")

## Metrics à tracker

### J+7
- Signups trial
- Trial-to-paid rate
- MRR
- Bug reports majeurs
- Support load (nb tickets, temps de réponse moyen)
- UTM breakdown (quelle source amène quoi)

### J+30
- Churn premier mois
- MRR total
- Rétention activation
- NPS ou feedback qualitatif (3-5 interviews utilisateurs si possible)

## Template post Romain (launch FR)

```
Nouveau SaaS F2 : [NOM].

[Une phrase qui dit ce que ça fait].

Pourquoi on le build.

[Problème observé en 2-4 lignes, concret]

Ce qu'on a shipped :
→ [feature 1]
→ [feature 2]
→ [feature 3]

Essai gratuit 14 jours : [lien avec UTM]

[1 ligne personnelle : "On y bosse depuis X semaines" ou similaire]
```

## Template thread Fabrice (launch EN)

```
1/ We just shipped [NAME].
[One-liner that says what it does]

2/ Why we built this.
[Observed problem, 2-3 tweets max]

3/ How it works under the hood.
[Technical angle: stack, architecture, API choices]

4/ Trade-offs we made.
[Trade-offs explicit, no hype]

5/ Early metrics.
[Real numbers if we have any, or "we'll share numbers at day 30"]

6/ Try it free for 14 days: [link]
Appreciate any feedback, especially the harsh kind.
```
