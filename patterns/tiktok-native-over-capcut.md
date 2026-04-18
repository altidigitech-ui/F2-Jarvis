# Pattern — TikTok native editor > CapCut / Pictory pour demos SaaS

**Capturé le** : 2026-03-25
**Découvert dans** : production des demos vidéo pour Leak Detector
**Auteur** : Romain
**Catégorie** : marketing / content

---

## Problème

Pour produire des demo videos courtes (30-90s) destinées à TikTok, LinkedIn, ou Twitter, on a testé plusieurs workflows complexes (CapCut desktop, Pictory AI, HeyGen, Premiere Pro light). Résultat : perte de temps, output "propre mais générique", zero différenciation.

## Contexte d'apparition

Pour le launch de Leak Detector, on a produit 3 versions d'une même demo :
- Version 1 : Pictory (AI voiceover + stock + sous-titres auto) — **3h de prod, 0 engagement**
- Version 2 : CapCut desktop (transitions, music, effects) — **4h de prod, engagement moyen**
- Version 3 : TikTok native editor (screen record + voice + stickers natifs) — **40min de prod, 3x plus d'engagement**

## Solution (le pattern)

### Règle

Pour les **short-form videos** (TikTok, Reels, Shorts, LinkedIn video ≤ 90s), utiliser directement l'éditeur natif de la plateforme principale cible.

### Workflow F2

1. **Screen record** brut (QuickTime Mac ou OBS) — 1-3 min max
2. **Import direct** dans TikTok / Instagram / LinkedIn native
3. **Couper au natif** dans l'app
4. **Voix** : voice-over directement dans l'app (pas de studio pro)
5. **Stickers / captions** : ceux de la plateforme
6. **Publier** depuis l'app

### Pourquoi cette étape 2 est critique

Les plateformes **boost algorithmiquement** le contenu créé dans leur éditeur natif vs uploadé depuis l'extérieur. TikTok détecte les watermarks CapCut et downranke.

## Pourquoi ça marche

- **Algo-friendly** : contenu natif boosté
- **Authentique** : look "native" vs "over-produced"
- **Rapide** : 10x moins de temps
- **Pas de watermark** CapCut ou autre qui sape la perception
- **Features plateforme** : trending sounds, stickers, effects que seule la plateforme a

## Quand l'utiliser

- Demo produit 30-90s pour short-form social
- Tutorial quick-win
- Teaser launch
- Behind-the-scenes F2 build-in-public

## Quand NE PAS l'utiliser

- Video long-form (> 2min) → CapCut ou Premiere OK
- Video marketing pro pour landing page → production soignée justifiée
- Webinar / podcast → outils pro (OBS + post-prod)
- Contenu à poster cross-platform (Twitter + LinkedIn + TikTok) → produire 1 fois proprement + adapter

## Anti-patterns liés

- **Over-production** pour un TikTok de 30s
- **AI voiceover** (Pictory style) pour F2 : antinomique avec authenticité build-in-public
- **Watermark CapCut** : coule l'algo TikTok
- **Sous-titres hardcodés** : TikTok génère mieux les siens maintenant

## Références

- Décision : `studio/decisions/2026-03-25-tiktok-native-preferred.md`
- Metrics : `marketing/analytics/leak-detector-launch-video-ab.csv`
