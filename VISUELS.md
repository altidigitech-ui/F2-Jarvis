# VISUELS — Algo visuel par type de post

Ce fichier est dans le repo. Jarvis et chaque projet Claude le lisent via le repo uploadé à jour. Il définit l'algo visuel FIXE. Claude l'applique automatiquement à chaque batch.

---

## 1. ALGO — TYPE DE POST → VISUEL

| Type de post | Visuel ? | Type | Outil | Ce que Claude sort avec le post |
|---|---|---|---|---|
| Feature produit (ce que le produit fait) | OUI | Vidéo courte | Remotion / Claude Design / Higgsfield / CapCut | Brief vidéo : concept, hook 3s, texte overlay, durée, format 9:16 |
| Pain point merchant (la douleur) | OUI | Image data / chiffre choc | ChatGPT | Prompt ChatGPT : le chiffre choc en gros, fond contrasté |
| Résultat scan (avant/après) | OUI | Screenshot | Capture d'écran | Instruction : quoi capturer (dashboard scan, score, problèmes détectés) |
| Quick fix / tip | NON | — | — | Rien — le texte seul percute |
| Retour d'expérience | NON | — | — | Rien — la story parle d'elle-même |
| Data drop / statistique | OUI | Infographie | ChatGPT | Prompt ChatGPT : infographie avec les données clés |
| Question communauté | NON | — | — | Rien — la question seule génère les replies |
| Carrousel éducatif (LinkedIn/Instagram) | OUI | Slides | ChatGPT | Prompt ChatGPT : chaque slide (titre + contenu) |
| Vidéo produit (TikTok source) | OUI | Vidéo 15-45s | Remotion / Claude Design / Higgsfield / CapCut | Brief vidéo : concept, hook 3s, texte overlay, durée, format 9:16 1080x1920 |
| Produit mode / lookbook (høkuno) | OUI | Photo / vidéo produit | Photo mockup / Vidéo | Brief : collection, produit, ambiance, format |

Ratio résultant : environ 50% des posts ont un visuel, 50% texte seul. Ce n'est pas un choix, c'est le résultat de l'algo.

---

## 2. STYLE PAR COMPTE

### R (comptes perso @delgado_ro72224, Romain Delgado)

- **Couleurs :** orange, rouge, noir. Chaud, urgent, "ton argent brûle".
- **Typo :** bold, gros chiffres, impact.
- **Style :** dashboard de données, graphiques simples, le chiffre qui frappe en plein écran.
- **Exemples :** "$800/month" en gros sur fond noir. Graphique "100K visitors → 600 real humans". Infographie "3 patterns from 530+ reviews".
- **Pas de :** illustrations mignonnes, icônes colorées, stock photos.

### F (comptes perso @FabGangi, Fabrice Gangitano)

- **Couleurs :** bleu foncé, gris, vert terminal. Froid, technique, "sous le capot".
- **Typo :** monospace pour le code, sans-serif pour le reste.
- **Style :** terminal, IDE, schémas d'architecture, flowcharts simplifiés, snippets de code.
- **Exemples :** screenshot VS Code avec le code pertinent surligné. Schéma "14 apps → 14 script tags → 3s extra". Flowchart "stateless → stateful".
- **Pas de :** graphiques business, chiffres en dollars, couleurs chaudes.

### StoreMD (comptes produit)

- **Couleurs :** blanc, gris clair, vert teal (#10b981) pour les métriques positives, rouge (#ef4444) pour les problèmes.
- **Typo :** clean sans-serif.
- **Style :** dashboard produit, résultats de scan, scores, métriques. Le produit parle de lui-même. Clinical, trustworthy.
- **Exemples :** score de scan "72/100" avec les problèmes listés. Dashboard "5 ghost billing detected". Comparaison avant/après scan.
- **Pas de :** style personnel (pas de "I", pas de "we"), couleurs chaudes, humour.

### høkuno (comptes produit — quand live)

- **Couleurs :** noir de base + couleurs vives par collection. Urban, high contrast.
- **Typo :** bold, streetwear, impactante.
- **Style :** streetwear POD, lifestyle, mindset, motivation. "Pas besoin d'une destination, juste une direction."
- **4 univers visuels par collection :**
  - **WANTED** — parodique manga, personnages vieillis/épuisés par 30 ans de publication, humour, esthétique "avis de recherche". 46 personnages FR+EN.
  - **MYTHOLOGIE** — silhouettes divines en toge grecque, couleur signature par personnage, auréole lumineuse, épique et mystique. 10 personnages, design universel (sans texte).
  - **DIRECTION** — silhouettes encrées, citations motivationnelles en bold blanc, toujours aller de l'avant. Le cœur de l'identité Hokuno. 10 personnages FR+EN.
  - **Design Hokuno** — 13 t-shirts + 21 accessoires (casquettes, bobs, claquettes, shorts de bain, polos, coques) aux couleurs de la marque.
- **Pas de :** corporate, clinical, data-focused. C'est du streetwear pas du SaaS.

---

## 3. CE QUE CLAUDE SORT AU BATCH

Pour chaque post de la semaine, Claude applique l'algo et produit un bloc sous le post :

**Si visuel ChatGPT :**

    VISUEL — Prompt ChatGPT image :
    "[Prompt complet à copier-coller dans ChatGPT]"
    Format : [1200x675 Twitter | 1080x1080 LinkedIn | 1080x1350 Instagram]
    Style : [R data / F technique / StoreMD produit / høkuno streetwear]

**Si screenshot :**

    VISUEL — Capture d'écran :
    Quoi capturer : [description précise]
    Annoter : [ce qu'il faut entourer/flècher si nécessaire]

**Si vidéo (TikTok source) :**

    VISUEL — Vidéo TikTok (15-45s) :
    Concept : [description]
    Hook (3 premières secondes) : [ce qui accroche]
    Texte overlay : [les phrases qui apparaissent]
    Durée : [15s / 30s / 45s]
    Format : 1080x1920 (9:16)
    Outil : [Remotion / Claude Design / Higgsfield / CapCut]
    Style : [R data / F technique / StoreMD produit / høkuno streetwear]

**Si carrousel :**

    VISUEL — Carrousel :
    Nombre de slides : [N]
    Slide 1 : [titre + contenu]
    Slide 2 : [titre + contenu]
    ...
    Format : [1080x1080 LinkedIn | 1080x1350 Instagram]
    Style : [R data / F technique / StoreMD produit]

**Si produit mode (høkuno) :**

    VISUEL — Produit høkuno :
    Collection : [WANTED / MYTHOLOGIE / DIRECTION / Design Hokuno]
    Produit : [description]
    Ambiance : [description]
    Format : [1080x1080 Instagram | 1080x1350 story | 1200x675 Twitter]

**Si texte seul : rien. Pas de section visuel.**

---

## 4. TEMPLATES PROMPTS CHATGPT PAR STYLE

**Template Style R (data/chiffre choc)** — à adapter par post :

    Create a bold data visualization image for a social media post.
    Background: solid black.
    Main element: the number "[CHIFFRE]" in large bold orange/red text, centered.
    Below: a short subtitle in white: "[CONTEXTE EN 1 LIGNE]"
    No illustrations, no icons, no decorations. Just the number and the context.
    Clean, minimal, high contrast. Format: 1200x675px.

**Template Style F (technique/schéma)** — à adapter par post :

    Create a clean technical diagram for a social media post.
    Background: dark blue (#1a1a2e).
    Content: a simple flowchart/schema showing [DESCRIPTION DU SCHÉMA].
    Use monospace font for technical terms. Arrows connecting the steps.
    Colors: blue (#0ea5e9) for nodes, gray (#6b7280) for arrows, white for text.
    No illustrations, no icons. Clean engineering diagram style. Format: 1200x675px.

**Template Style StoreMD (produit neutre / résultat scan)** — à adapter par post :

    Create a clean product screenshot image for a social media post.
    Background: white (#ffffff) with subtle light gray grid pattern.
    Main element: a simplified dashboard mockup showing "[MÉTRIQUE/RÉSULTAT]" as the focal point.
    Use clean sans-serif font. Accent color: teal/green (#10b981) for positive metrics, red (#ef4444) for problems detected.
    No faces, no personal branding, no "I" or "we". The product speaks.
    Minimal, clinical, trustworthy. Format: [1200x675 Twitter | 1080x1080 LinkedIn | 1080x1350 Instagram].

**Template Style høkuno (streetwear / lifestyle / motivation)** — à adapter par post :

    Create a streetwear brand lifestyle image for a social media post.
    Background: solid black (#000000).
    Main element: [DESCRIPTION PRODUIT OU COLLECTION].
    Style direction by collection:
    - WANTED: parodic manga style, aged/exhausted characters, humor, "wanted poster" aesthetic
    - MYTHOLOGIE: divine silhouettes in greek togas, character's signature color, luminous halo, epic and mystic
    - DIRECTION: ink silhouettes, motivational quote in bold white text, always moving forward
    - DESIGN HOKUNO: brand colors, clean streetwear mockup, minimal
    Brand tagline if relevant: "Pas besoin d'une destination, juste une direction."
    Bold, urban, high contrast. No corporate feel. Format: [1080x1080 Instagram | 1080x1350 story | 1200x675 Twitter].

---

## 5. PIPELINE RECYCLAGE VIDÉO

TikTok = source de contenu vidéo. Chaque vidéo est recyclée :

1. Créer le contenu natif TikTok (Remotion / Claude Design / Higgsfield / CapCut)
2. Exporter fichier master : 1080×1920, 9:16, MP4, aucun watermark, aucune incrustation autre plateforme
3. Re-exporter une version 1080×1350 (4:5) pour Instagram si Reel adaptation requise
4. Poster sur TikTok nativement (pas via scheduler, +20-50% distribution)
5. Recycler la vidéo sur TOUS les comptes du jour : Instagram + Facebook (vidéo + caption identiques TikTok), Twitter StoreMD + Twitter R/F perso (vidéo + texte adapté), LinkedIn R/F (vidéo + texte long-form). UNE vidéo TikTok par jour alimente tous les comptes du jour.
6. IH (compte FoundryTwo, mercredi) = pas de vidéo, texte long-form + screenshot optionnel

Ce pipeline s'applique à StoreMD (TT/IG/FB en 7/7, TW StoreMD lun-ven, IH mercredi) et høkuno (cadence à définir lors du lancement) avec des contenus différents par business.

---

## 6. RÈGLES

1. L'algo est FIXE. Claude ne choisit JAMAIS "ce post devrait avoir une image". Il regarde le type de post dans le tableau et applique.
2. Le prompt/instruction visuel est livré EN MÊME TEMPS que le texte du post. Pas après.
3. Si le type de post n'est pas dans le tableau, texte seul par défaut.
4. Les screenshots sont la responsabilité du fondateur (F ou R). Claude donne juste l'instruction de quoi capturer.
5. Les vidéos sont produites via Remotion, Claude Design, Higgsfield ou CapCut. Claude donne le brief.
6. VISUELS.md est lu par Jarvis et tous les agents via le repo. Pas besoin de l'uploader séparément.
7. Chaque business a son style visuel. Ne JAMAIS mélanger les styles entre business (pas de orange R sur un post StoreMD, pas de data dashboard sur un post høkuno).
8. Quand un nouveau business arrive : ajouter son style dans §2, son template dans §4, et c'est opérationnel.
