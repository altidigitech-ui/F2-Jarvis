# Pattern — No browser automation in production SaaS

**Capturé le** : 2026-02-20
**Découvert dans** : Leak Detector (tentative d'intégration Higgsfield via Playwright)
**Auteur** : Fabrice
**Catégorie** : tech / ops

---

## Problème

Utiliser Playwright / Puppeteer / Selenium pour automatiser un service qui n'a pas d'API officielle est **structurellement fragile**. Ça casse au premier changement de DOM côté fournisseur, ça scale mal, ça pose des problèmes légaux (ToS).

## Contexte d'apparition

Tentative d'automatisation de Higgsfield (génération vidéo AI) via Playwright pour Leak Detector V0. 3 jours de dev, 2 semaines en prod → 5 incidents majeurs (DOM changed, captcha, rate limit, session expired, layout shift). Coût opérationnel > revenue généré.

Décision : **banned from F2 production stack**.

## Solution (le pattern)

### Règle

Aucune dépendance prod sur browser automation. Point.

### Alternatives acceptables par ordre de préférence

1. **API officielle du service** — même si plus chère, prévisible
2. **API alternative** — autre fournisseur qui offre la même capacité via API (ex: fal.ai remplace Higgsfield pour vidéo)
3. **Self-host** — tourner le modèle open-source localement si l'usage le justifie
4. **Skip la feature** — parfois la feature ne vaut pas le coût, à acter

### Exception tolérée (scripts ops internes)

Browser automation OK pour :
- Scripts one-shot internes (ex: scraper ponctuel pour audit marché)
- Tests E2E (Playwright pour tester NOS SaaS, pas pour scraper d'autres)
- Snapshots visuels internes

Ces usages restent **hors prod SaaS** et ne sont jamais dans le chemin critique d'un user payant.

## Pourquoi ça marche (la règle)

- **Fiabilité** : API a un SLA, browser automation n'en a aucun
- **Coûts ops** : chaque DOM change = incident, debug, hotfix → temps Fabrice/Romain brûlé
- **Scaling** : headless browsers consomment CPU/RAM, ça coûte cher à scale
- **Légal** : beaucoup de ToS interdisent l'automation, risque juridique réel
- **Expérience client** : une feature qui break 1 fois par mois = churn

## Quand NE PAS appliquer la règle (exceptions)

- POC pour valider un besoin user (max 2 semaines, puis migration API ou kill)
- Scripts internes ponctuels (pas dans prod SaaS)
- Tests E2E (test de nos propres SaaS)

## Anti-patterns liés

- **"Just wrap it in try/catch"** : illusion de robustesse, masque les incidents
- **"We'll add retries"** : retries sur DOM fragile = cascade failures
- **"It's only Playwright, not Selenium"** : même problème structurel

## Cas d'usage F2 remplacés

| Besoin | Ancien (Playwright) | Nouveau (API) |
|---|---|---|
| Génération vidéo | Higgsfield browser auto | fal.ai API |
| Scraping produits | Custom scraper | Apify API (quand justifié) |
| Export analytics | Browser login + scrape | API officielle du service |

## Références

- Décision : `studio/decisions/2026-02-20-no-browser-automation.md`
- VideoForge architecture : utilise fal.ai nativement
- Incident post-mortem : `studio/decisions/post-mortem-higgsfield-playwright.md` (à venir)
