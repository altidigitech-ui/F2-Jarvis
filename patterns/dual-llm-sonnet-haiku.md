# Pattern — Dual-LLM (Sonnet generates, Haiku quality-checks)

**Capturé le** : 2026-03-10
**Découvert dans** : pipelines de contenu F2 (posts LinkedIn, drafts marketing, descriptions produits)
**Auteur** : Fabrice
**Catégorie** : tech / AI pipelines

---

## Problème

Utiliser Opus ou Sonnet à tous les étages d'un pipeline de contenu coûte cher. Utiliser Haiku seul donne parfois des outputs insuffisants sur des tâches de génération créative.

## Contexte d'apparition

Sur le pipeline de drafts de posts Romain (auto-draft basé sur activité F2), coût moyen ~$0.08 par draft avec Sonnet seul. Après migration dual-LLM : ~$0.035 par draft pour qualité équivalente voire meilleure (grâce au QC systématique).

## Solution (le pattern)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Brief      │ →   │ Sonnet       │ →   │ Haiku        │
│   (input)    │     │ (generate)   │     │ (QC + revise)│
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                           ┌──────────────┐
                                           │ Output final │
                                           └──────────────┘
```

### Étape 1 — Sonnet génère

Prompt orienté génération : "Draft a LinkedIn post (FR) about X following Romain's voice."

```python
draft = claude_sonnet.complete(
    system=romain_voice_prompt,
    prompt=f"Draft a post about: {topic}",
    max_tokens=1000
)
```

### Étape 2 — Haiku quality-check

Prompt orienté audit avec critères explicites :

```python
qc_prompt = f"""
Review this LinkedIn FR draft against Romain's voice rules.
Flag any:
- Fake stats
- Banned phrases (hot take, voici 5 hacks, la vérité que...)
- Wrong length (must be 500-1500 chars)
- More than 2 emojis
- More than 3 hashtags
- Altistone mention (forbidden)

Draft:
{draft}

Output JSON:
{{"pass": bool, "issues": [...], "suggested_revision": "..."}}
"""
qc_result = claude_haiku.complete(prompt=qc_prompt, max_tokens=500)
```

### Étape 3 — Decision

```python
if qc_result["pass"]:
    return draft
else:
    if qc_result["suggested_revision"]:
        return qc_result["suggested_revision"]
    else:
        return None  # flag for human review
```

## Pourquoi ça marche

- **Cost split** : Sonnet pour tâche complexe (génération nuancée), Haiku pour tâche simple (pattern matching sur règles)
- **Second pair of eyes** : le QC détecte des dérives que la génération solo ne voit pas
- **Règles explicites** : le prompt QC est un checklist — Haiku excelle sur ce pattern
- **Économie** : Haiku ~5x moins cher que Sonnet pour une tâche où il est tout aussi bon

## Quand l'utiliser

- Pipelines de contenu à volume (drafts marketing, descriptions produits)
- Génération où les contraintes sont explicites (voix, longueur, anti-patterns)
- Toute tâche où on génère plusieurs drafts par jour

## Quand NE PAS l'utiliser

- Génération one-shot sans volume (surcoût de pipeline pour rien)
- Tâches de raisonnement complexe (l'un ou l'autre, pas les deux)
- Code review (Haiku n'est pas assez fiable sur analyse sémantique de code)

## Anti-patterns liés

- **Triple LLM** (Sonnet → Sonnet → Sonnet) : on double les coûts sans gain
- **Haiku → Sonnet** : l'inverse. Haiku drafte mal, Sonnet doit tout refaire. Gaspillage.
- **Self-check** : demander à Sonnet de valider son propre output. Biais cognitif, il se juge bon.

## Métriques constatées F2

Sur pipeline drafts LinkedIn Romain (mars 2026, ~40 drafts) :

| Metric | Sonnet seul | Dual-LLM | Δ |
|---|---|---|---|
| Coût par draft | $0.08 | $0.035 | -56% |
| Taux d'acceptation Romain | 62% | 78% | +26% |
| Temps génération | 3.2s | 4.8s | +50% |

Le +50% temps est négligeable pour un pipeline async.

## Références

- Skill : `.claude/skills/marketing-fr/SKILL.md`
- Décision : `tracking/decisions-log.md` (entrée 2026-03-10-dual-llm-adoption)
- Similar pattern : "generator + discriminator" in ML literature
