# HANDOFF — F2-Jarvis
**Date :** Dimanche 19 avril 2026 — 22h35 CEST  
**Prochaine session :** Lundi 20 avril 2026 avec Romain (revue semaine 5)

---

## État au 19 avril 22h+

F2-Jarvis a été entièrement refondé aujourd'hui en 6 phases (A → B → C → C3 → C4 → D).
Le repo est désormais l'OS unifié du studio FoundryTwo : infra AI + contenu opérationnel (fusion FoundryTwo + CDV).
7 commits sur main (6 phases + merge Phase D).

---

## Ce qui a été fait aujourd'hui

| Phase | Description | Résultat |
|-------|-------------|---------|
| A | Cleanup F2-Jarvis V1 | Repo nettoyé, stale refs supprimées |
| B | Import FoundryTwoV2 (234 .md) | Contenu opérationnel intégré |
| C | Refonte CLAUDE.md (268 l) + création BIBLE.md (52 l, 13 principes) | Sources de vérité refondées |
| C3 | Fix 3 références stales ops/ | Références corrigées |
| C4 | Fix 23 fichiers infra + bridage Ouroboros 14/14 | Infra stable, Ouroboros bridé |
| D | MemPalace mining (13 wings, 3529 drawers) + Graphify (71 nodes, 61 edges) | Mémoire indexée |

---

## Contexte StoreMD au 19/04

Source : `f2/progress-semaine.md` + `romain/cross-engagement-tracker.md`

- **Statut :** Live depuis mardi 14/04 (J+5)
- **URL :** storemd.vercel.app (DNS .com cassé)
- **MRR :** 0€ (phase distribution, free scans)
- **Incidents ouverts :**
  - Twitter R suspendu (compte Romain inactif depuis launch day)
  - DNS storemd.com cassé (Vercel pointe sur rien)
  - Pas de tracking UTM en place
  - Accès Inde bloqué (Vercel geo-restriction ?)
- **Distribution :** Reddit + Facebook + LinkedIn actifs. Twitter F (@FabGangi) et F2 (@foundrytwo) seuls actifs.

---

## Priorités lundi 20/04 avec Romain

1. **Revue semaine 5** — remplir `f2/progress-semaine.md` §3 (bilans), §4 (métriques), §5 (décisions) + miroir dans `romain/` et `fabrice/`
2. **Archivage semaine 5** → `archives/semaine-5-13-19-avril-2026/`
3. **Plan-hebdo semaine 6** (20-26 avril) — définir priorités distribution + SaaS #2
4. **Décisions incidents StoreMD** — DNS, Twitter R, UTM, Inde
5. **Re-miner MemPalace** après revue (pour capturer les mises à jour semaine 5)

---

## Commandes clés Claude Code

```
/morning          — brief du jour (SaaS, décisions en attente, posts à publier, 3 priorités)
/status           — état complet F2 (métriques, roadmap, décisions récentes)
/jarvis           — health check infra
/review-proposals — propositions Ouroboros (valider/rejeter)
/budget           — dépenses tokens par service
```

---

## Infra opérationnelle au 19/04

| Composant | État | Détail |
|-----------|------|--------|
| Skills | 16 | 3 always-on (graphify, handoff-writer, f2-brand-voice) + 13 on-demand |
| Agents | 7 | f2-architect, f2-dev, f2-designer, f2-marketer, f2-auditor, f2-librarian, f2-accountant |
| Commands | 9 | /morning, /status, /launch, /debrief, /graphify-all, /budget, /review-proposals, /jarvis, /handoff |
| Hooks | 6 | budget-check, mempalace-save, post-commit-graphify, pre-tool-use-graphify, precompact-save, session-stop-handoff |
| Ouroboros | Bridé 14/14 | Jamais run. Kill-switch opérationnel. Prêt pour premier dry-run. |
| MemPalace | 13 wings · 3529 drawers | Wings : f2-core, strategie, produits, f2-compte, romain, fabrice, growth-marketing, distribution, marketing, saas, la-toile, patterns, claude-config |
| Graphify | 71 nodes · 61 edges · 27 communautés | 23 fichiers code · ~735 497 mots indexés |
| Budget | 0€ / 30€ | Plan Max 5x actif (100$/mois Anthropic) |

---

## À faire plus tard (non-urgent)

- Intégrer code StoreMD dans `saas/storemd/code/` (Fabrice lui-même — pas Claude)
- Décider ZIP vs submodule pour `saas/*/code/`
- Premier cycle Ouroboros test `--dry-run` (après validation Fabrice)
- Nettoyer `AUDIT.md` (résidus du merge validés)
- Ajouter wing `tracking` à MemPalace (après revue semaine 5)
