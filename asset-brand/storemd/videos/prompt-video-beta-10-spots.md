# PROMPT — store-md-beta-10-spots

> Vidéo manquante V1. Concept : le mur OAuth, le workaround DM, 10 spots beta.
> Données réelles : 51 merchants ont cliqué install, 0 ont complété le flow OAuth.
> 2 versions : Claude Design (React animé) + Remotion (programmatique).

---

## VERSION 1 — CLAUDE DESIGN

```
Crée une vidéo TikTok animée en React (format vertical 9:16, ratio 390x844px, auto-play + loop infinie).

CONTEXTE PRODUIT :
StoreMD est une app Shopify en beta. Elle n'est pas sur le Shopify App Store. Pour s'installer, un merchant doit passer par un flow OAuth en 12 étapes. Résultat : 51 merchants ont cliqué "Install" sur storemd.vercel.app, 0 ont complété le flow. Le workaround : le merchant DM son URL .myshopify.com, on envoie un lien d'installation direct (Partner Dashboard), il installe en 1 clic et le scan tourne en 60 secondes. 10 places beta disponibles. Scan complet gratuit.

STYLE VISUEL :
- Fond dominant : noir #0a0a0f
- Accent : cyan #06b6d4 (CTA, glow, highlights)
- Font titres : Outfit bold, blanc
- Font données : Plus Jakarta Sans ou Outfit
- Ambiance : urgence + exclusivité + transparence brutale

STRUCTURE SCÈNE PAR SCÈNE :

SCÈNE 1 (0-3s) — HOOK CHIFFRÉ
- Fond noir #0a0a0f
- Texte centré, font Outfit bold 42px, blanc :
  "51 merchants clicked Install."
- Beat 800ms
- Texte en dessous, font Outfit bold 56px, rouge #ef4444, scale-in :
  "0 completed."
- Micro-shake sur le "0"

SCÈNE 2 (3-8s) — LE MUR
- Transition wipe vers un écran simulé
- Titre haut : "Shopify OAuth Flow" font Outfit 18px, gris #9ca3af
- Liste verticale de 12 étapes numérotées, font Plus Jakarta Sans 14px, gris clair #d1d5db :
  1. Click Install
  2. Redirect to Shopify
  3. Login prompt
  4. Store selection
  5. Permission review
  6. Accept charges
  7. Confirm subscription
  8. Redirect back
  9. Token exchange
  10. Webhook setup
  11. App verification
  12. Dashboard load
- Les étapes apparaissent une par une (stagger 150ms chacune)
- Étape 1 surlignée vert #10b981 (complétée)
- Étapes 2-12 restent gris → puis passent rouge #ef4444 une par une (stagger 100ms)
- Texte en bas, font Outfit 16px, blanc : "This is where they stop."
- Barre de progression rouge qui se remplit à 8% (1/12)

SCÈNE 3 (8-14s) — LE WORKAROUND
- Cut net vers fond noir
- Texte centré font Outfit bold 36px, blanc :
  "So we built a workaround."
- Beat 600ms
- Transition vers un faux écran DM (dark theme)
- Bulle DM entrante (fond #1f2937, border #374151, rounded-xl) :
  "Hey, can you scan my store?"
  "mystorename.myshopify.com"
  — font Plus Jakarta Sans 14px, blanc
- Beat 400ms
- Bulle DM réponse (fond cyan #06b6d4, text noir) :
  "Scanning now. 60 seconds."
  — font Plus Jakarta Sans 14px bold
- Beat 400ms
- Bulle DM réponse 2 (fond cyan) :
  "Done. 14 issues found. 3 critical. Here's your report."
- Lien cliquable stylisé : "storemd.vercel.app/report/..." souligné cyan

SCÈNE 4 (14-18s) — 10 SPOTS
- Cut vers fond noir
- 10 cercles alignés en 2 rangées de 5, chacun avec un numéro (1-10)
- Cercles fond #1f2937, border cyan #06b6d4, font Outfit bold 24px blanc
- Texte au-dessus : "Beta spots" font Outfit 18px, gris #9ca3af
- Les cercles clignotent un par un (glow cyan pulse)
- Texte en dessous, font Outfit bold 28px, blanc :
  "Free. Full scan. No OAuth."

SCÈNE 5 (18-22s) — CTA
- Fond noir
- Texte centré font Outfit bold 40px, blanc :
  "DM your .myshopify.com URL"
- Sous-texte font Outfit 18px, gris #9ca3af :
  "Scan runs in 60 seconds. Full report. $0."
- Bouton CTA centré : fond cyan #06b6d4, text noir bold, rounded-full, padding 12px 32px :
  "Link in bio →"
- Glow cyan autour du bouton (box-shadow 0 0 30px rgba(6,182,212,0.4))
- Loop → retour scène 1
```

---

## VERSION 2 — REMOTION

```
REMOTION VIDEO SPEC — store-md-beta-10-spots

FORMAT : 1080x1920 (9:16 vertical TikTok)
DURÉE : 22 secondes
FPS : 30
EXPORT : MP4 H.264

PALETTE :
- bg: #0a0a0f (noir profond)
- text-primary: #ffffff
- text-secondary: #9ca3af
- accent: #06b6d4 (cyan)
- danger: #ef4444 (rouge)
- success: #10b981 (vert)
- card-bg: #1f2937
- card-border: #374151

FONTS : Outfit (bold pour les titres), Plus Jakarta Sans (body)

COMPOSITION SEQUENCE :

[0s - 3s] HookSequence
- Fond bg
- <Text> centré "51 merchants clicked Install." (Outfit bold 42px, text-primary)
- delay 800ms
- <Text> "0 completed." (Outfit bold 56px, danger, spring scale-in from 0.5 to 1)
- shake effect sur le "0" (translateX oscillation ±4px, 3 cycles, 200ms)

[3s - 8s] OAuthWallSequence
- wipe transition (clip-path de gauche à droite, 300ms)
- Titre "Shopify OAuth Flow" (Outfit 18px, text-secondary, top: 60px)
- 12 étapes listées verticalement (Plus Jakarta Sans 14px, text-secondary)
- Stagger entrance 150ms par étape (opacity 0→1, translateY 10→0)
- Étape 1 : couleur passe à success (#10b981)
- Étapes 2-12 : stagger 100ms, couleur passe à danger (#ef4444)
- Progress bar en bas : width animée de 100% à 8%, couleur danger
- <Text> "This is where they stop." (Outfit 16px, text-primary, fade-in 500ms)

[8s - 14s] WorkaroundSequence
- Cut net (pas de transition)
- <Text> "So we built a workaround." (Outfit bold 36px, text-primary, centré)
- delay 600ms
- Transition vers faux DM screen
- Bulle 1 (entrante) : bg card-bg, border card-border, rounded-xl
  "Hey, can you scan my store?" + "mystorename.myshopify.com"
  spring entrance from right (translateX 100→0)
- delay 400ms
- Bulle 2 (réponse) : bg accent, text #000000
  "Scanning now. 60 seconds."
  spring entrance from left
- delay 400ms
- Bulle 3 (réponse) : bg accent, text #000000
  "Done. 14 issues found. 3 critical. Here's your report."
  spring entrance from left

[14s - 18s] BetaSpotsSequence
- Cut net
- <Text> "Beta spots" (Outfit 18px, text-secondary, top: 120px)
- 10 cercles en 2 rangées de 5 (grid)
  - Chaque cercle : 64x64px, bg card-bg, border 2px accent, rounded-full
  - Numéro centré : Outfit bold 24px, text-primary
  - Stagger entrance 100ms (scale 0→1, spring)
  - Sequential glow pulse : box-shadow 0 0 20px accent avec opacity oscillation
- <Text> "Free. Full scan. No OAuth." (Outfit bold 28px, text-primary, centré, fade-in)

[18s - 22s] CTASequence
- <Text> "DM your .myshopify.com URL" (Outfit bold 40px, text-primary, centré)
  spring entrance (scale 0.8→1)
- delay 300ms
- <Text> "Scan runs in 60 seconds. Full report. $0." (Outfit 18px, text-secondary)
  fade-in 400ms
- delay 300ms
- Bouton CTA : bg accent, text #000000 bold, rounded-full, padding 12x32
  "Link in bio →"
  spring entrance (translateY 20→0)
  glow: box-shadow 0 0 30px rgba(6,182,212,0.4) pulse animation

AUDIO : aucun (music ajoutée en post-prod)
LOOP : oui (dernière frame → première frame, cut net)
```

---

## NOTES

- Les données "51 clicked / 0 completed" viennent du batch S7 (données réelles terrain)
- Le nombre "14 issues found. 3 critical." est un scénario illustratif (pas un store réel nommé) — conforme BIBLE §3
- Les 10 spots beta correspondent au pipeline-conversion StoreMD
- Le nom de fichier final : `store-md-beta-10-spots.mp4`
