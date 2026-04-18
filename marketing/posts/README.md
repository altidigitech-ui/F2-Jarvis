# marketing/posts/

## Structure

- **`draft/`** — posts en cours de rédaction, pas encore publiés
- **`published/YYYY-MM/`** — archive des posts publiés, organisés par mois
- **`ideas.md`** — feed d'idées de posts (à piocher dedans)

## Convention de nommage

`YYYY-MM-DD-<canal>-<auteur>-<slug>.md`

Exemples :
- `2026-04-25-linkedin-romain-storemd-launch.md`
- `2026-04-25-twitter-fabrice-storemd-technical-thread.md`

## Template d'un post draft

```markdown
---
canal: linkedin-fr | twitter-en | linkedin-en | email
auteur: fabrice | romain
type: launch | learning | observation | metric | post-mortem | contrarian
statut: draft | review | ready | published
cible_date: YYYY-MM-DD
utm_campaign: <slug_explicite>
---

# Titre interne (pas le titre du post)

## Contenu

<corps du post, formaté pour la plateforme>

## Assets associés

- Screenshot : path/to/file
- Lien : URL avec UTM complet

## Revue

- [ ] TOILE rule check (pas d'Altistone)
- [ ] Anti-patterns check (voir brand/anti-patterns.md)
- [ ] Brand voice check (fabrice ou romain)
- [ ] Longueur appropriée canal
- [ ] UTM correct
```

## Workflow

1. Idea ajoutée dans `ideas.md`
2. Draft créé dans `draft/` avec frontmatter
3. Revue par l'auteur (24h plus tard idéalement)
4. Validation Fabrice si post F2-facing (pas strictement perso)
5. Publication
6. Archive dans `published/YYYY-MM/` après 7 jours
7. Stats ajoutées dans `marketing/analytics/`
