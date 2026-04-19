# VISUELS — Algo visuel par type de post

Ce fichier est dans le repo. Chaque projet Claude le lit via le repo uploadé à jour. Il définit l'algo visuel FIXE. Claude l'applique automatiquement à chaque batch.

---

## 1. ALGO — TYPE DE POST → VISUEL

| Type de post | Visuel ? | Type | Outil | Ce que Claude sort avec le post |
|---|---|---|---|---|
| Behind the build | OUI | Screenshot | Capture d'écran | Instruction : quoi capturer (écran code, terminal, dashboard, UI) |
| Pourquoi technique | OUI | Image explicative | ChatGPT | Prompt ChatGPT : schéma simplifié du "pourquoi" |
| Quick fix | NON | — | — | Rien — le texte seul percute |
| Builder story | OUI | Screenshot | Capture d'écran | Instruction : quoi capturer (le truc qu'on a buildé, le résultat, le bug) |
| Hot take / Provocateur | OUI | Image data | ChatGPT | Prompt ChatGPT : le chiffre choc en gros, fond contrasté |
| Data thread / Data drop | OUI | Infographie | ChatGPT | Prompt ChatGPT : infographie avec les données clés |
| Question communauté | NON | — | — | Rien — la question seule génère les replies |
| Metrics / Build in public | OUI | Screenshot | Capture d'écran | Instruction : quoi capturer (dashboard, Stripe, analytics, metrics réelles) |
| Storytelling / Retour d'expérience | NON | — | — | Rien — la story parle d'elle-même |
| Deep dive LinkedIn | OUI | Vidéo courte | Remotion | Brief Remotion : concept, texte animé, durée, style |
| Carousel LinkedIn | OUI | Slides | ChatGPT | Prompt ChatGPT : chaque slide (titre + contenu) |
| Transition / Pivot update | NON | — | — | Rien — authenticité > production |

Ratio résultant : environ 50% des posts ont un visuel, 50% texte seul. Ce n'est pas un choix, c'est le résultat de l'algo.

---

## 2. STYLE PAR COMPTE

### R (@delgado_ro72224)

- **Couleurs :** orange, rouge, noir. Chaud, urgent, "ton argent brûle".
- **Typo :** bold, gros chiffres, impact.
- **Style :** dashboard de données, graphiques simples, le chiffre qui frappe en plein écran.
- **Exemples :** "$800/month" en gros sur fond noir. Graphique "100K visitors → 600 real humans". Infographie "3 patterns from 530+ reviews".
- **Pas de :** illustrations mignonnes, icônes colorées, stock photos.

### F (@FabGangi)

- **Couleurs :** bleu foncé, gris, vert terminal. Froid, technique, "sous le capot".
- **Typo :** monospace pour le code, sans-serif pour le reste.
- **Style :** terminal, IDE, schémas d'architecture, flowcharts simplifiés, snippets de code.
- **Exemples :** screenshot VS Code avec le code pertinent surligné. Schéma "14 apps → 14 script tags → 3s extra". Flowchart "stateless → stateful".
- **Pas de :** graphiques business, chiffres en dollars, couleurs chaudes.

### F2 (@foundrytwo)

- **Couleurs :** palette brand bible F2 (voir asset-brand/FOUNDRYTWO-BRAND-BIBLE.md).
- **Typo :** brand F2, clean, pro.
- **Style :** rapport de studio, chiffres portfolio, timeline build in public, infographies data terrain.
- **Exemples :** dashboard "Week 1: $0 MRR, 530+ data points, 6 SaaS defined". Timeline "LD → StoreMD → 6 agents". Infographie "3 patterns from 530+ reviews" avec branding F2.
- **Pas de :** style personnel (c'est le studio, pas une personne).

---

## 3. CE QUE CLAUDE SORT AU BATCH

Pour chaque post de la semaine, Claude applique l'algo et produit un bloc sous le post :

Si visuel ChatGPT, le bloc est formaté :

    VISUEL — Prompt ChatGPT image :
    "[Prompt complet à copier-coller dans ChatGPT]"
    Format : [1200x675 Twitter | 1080x1080 LinkedIn | 1080x1350 carousel]
    Style : [R data / F technique / F2 studio]

Si screenshot, le bloc est formaté :

    VISUEL — Capture d'écran :
    Quoi capturer : [description précise]
    Annoter : [ce qu'il faut entourer/flècher si nécessaire]

Si vidéo Remotion, le bloc est formaté :

    VISUEL — Vidéo Remotion (15-30s) :
    Concept : [description]
    Texte animé : [les phrases qui apparaissent]
    Durée : [15s / 20s / 30s]
    Style : [R data / F technique / F2 studio]

Si texte seul : rien. Pas de section visuel.

---

## 4. TEMPLATES PROMPTS CHATGPT PAR STYLE

**Template Style R (data/chiffre choc)** — à adapter par post :

    Create a bold data visualization image for a Twitter post.
    Background: solid black.
    Main element: the number "[CHIFFRE]" in large bold orange/red text, centered.
    Below: a short subtitle in white: "[CONTEXTE EN 1 LIGNE]"
    No illustrations, no icons, no decorations. Just the number and the context.
    Clean, minimal, high contrast. Format: 1200x675px.

**Template Style F (technique/schéma)** — à adapter par post :

    Create a clean technical diagram for a Twitter post.
    Background: dark blue (#1a1a2e).
    Content: a simple flowchart/schema showing [DESCRIPTION DU SCHÉMA].
    Use monospace font for technical terms. Arrows connecting the steps.
    Colors: blue (#0ea5e9) for nodes, gray (#6b7280) for arrows, white for text.
    No illustrations, no icons. Clean engineering diagram style. Format: 1200x675px.

**Template Style F2 (studio/portfolio)** — à adapter par post :

    Create a clean studio dashboard image for a Twitter post.
    Background: [COULEUR BRAND F2].
    Content: a metrics dashboard showing [DONNÉES].
    Clean, professional, data-focused. Small logo watermark bottom-right.
    Format: 1200x675px.

---

## 5. RÈGLES

1. L'algo est FIXE. Claude ne choisit JAMAIS "ce post devrait avoir une image". Il regarde le type de post dans le tableau et applique.
2. Le prompt/instruction visuel est livré EN MÊME TEMPS que le texte du post. Pas après.
3. Si le type de post n'est pas dans le tableau, texte seul par défaut.
4. Les screenshots sont la responsabilité du fondateur (F ou R). Claude donne juste l'instruction de quoi capturer.
5. Les vidéos Remotion sont produites via le projet Claude Remotion. Claude (dans les projets F/R/F2) donne le brief.
6. VISUELS.md est lu par Claude via le repo uploadé à jour dans chaque projet. Pas besoin de l'uploader séparément.
