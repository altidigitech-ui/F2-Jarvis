# /raw — Inbox Karpathy-style

> Folder où tu dump tout ce que tu consommes : articles, PDFs, screenshots, tweets, transcripts.
> Graphify ingère ensuite ce dossier pour compiler un knowledge base structuré.
> Pattern inspiré d'Andrej Karpathy.

## Structure

```
raw/
├── inbox/           # nouveau non-trié (tu dumps ici)
├── articles/        # articles web sauvegardés (.md ou .html via web-clipper)
├── papers/          # PDFs recherche
├── screenshots/     # screens (.png, .jpg)
├── tweets/          # threads X copiés (.md avec URL)
├── transcripts/     # notes vocales, meetings transcrits
└── processed/       # déjà ingéré par Graphify
```

## Workflow

### 1. Capture (fast)
Dump tout dans `inbox/` sans organiser. Priorité = vitesse de capture.

### 2. Trier (batch hebdo ou à la volée)
Déplacer de `inbox/` vers le sous-dossier pertinent.

Règle par type :
- Article web → `articles/` (via Obsidian Web Clipper ou copie markdown)
- PDF → `papers/`
- Screenshot → `screenshots/` (renommer avec date + sujet)
- Tweet / thread → `tweets/` (format `.md` avec URL originale en header)
- Audio → transcrire via Whisper local → `transcripts/`

### 3. Ingestion Graphify
```bash
graphify analyze raw/ --update
```

Graphify extrait concepts et les relie au reste du knowledge graph F2-JARVIS.

### 4. Archive
Après ingestion validée, déplacer vers `processed/<année>/<mois>/`.

## Conventions de nommage

Format : `YYYY-MM-DD_<slug>_<source>.md`

Exemples :
- `2026-04-17_karpathy-llm-wiki_x-thread.md`
- `2026-04-16_mempalace-analysis_medium.md`
- `2026-04-15_shopify-graphql-rate-limits_shopify-blog.md`

## Que mettre ? Que ne pas mettre ?

### Mettre

- Articles qui ont un impact réel sur ta pensée / ton travail
- Screenshots de bug / UI inspirante
- Threads Twitter longs et substantiels
- Papers ML / dev pertinents
- Transcripts meeting F2 (Romain sync, client feedback)
- Notes vocales de brainstorm

### Ne pas mettre

- Tout article que tu skimmes "au cas où" (noise)
- Screenshots de memes (zéro valeur KB)
- Newsletters entières (ingérer seulement les passages pertinents)
- PDFs que tu n'as pas lus (ghost content)

## Règle d'or

**Un fichier dans /raw doit avoir été consommé par toi ou Romain.**

Pas de "collection pour le plaisir". Graphify va l'ingérer et le lier à ton knowledge graph → garbage in, garbage out.

## Inspiration

Andrej Karpathy maintient un `/raw` folder où il drop papers, tweets, screenshots, notes. Son LLM Wiki les compile en articles Wikipedia-style maintenus automatiquement. Même philosophie ici, adaptée à F2.

Voir :
- `.claude/skills/graphify/SKILL.md`
- Post Karpathy LLM Wiki (3 avril 2026)
