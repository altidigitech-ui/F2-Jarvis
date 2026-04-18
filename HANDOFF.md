# F2-JARVIS — HANDOFF

> État de session courante. Ce fichier est régénéré automatiquement par le skill `handoff-writer` avant chaque `/clear` ou `/compact`.

---

## Date

17 avril 2026 — Session initiale (création du squelette)

## Contexte actuel

Création du repo F2-JARVIS V1. Structure complète générée. Claude Code non encore lancé dessus.

## Ce qui est fait

- [x] Arborescence complète créée
- [x] `CLAUDE.md` — brief maître
- [x] `BIBLE.md` — principes non-négociables
- [x] `README.md` — documentation d'entrée
- [x] `HANDOFF.md` — template initial (ce fichier)
- [x] `.gitignore` + `.gitmodules`
- [x] Skills squelettes (SKILL.md par skill)
- [x] Agents squelettes (agent.md par agent)
- [x] Commands squelettes (command.md par command)
- [x] Hooks squelettes (sh files)
- [x] Ouroboros : identity.md, bible.md, consciousness.py, safety.py
- [x] MemPalace : structure wings, knowledge_graph schema
- [x] Studio : vision.md, roadmap.md, toile-rule.md, pricing-playbook.md, team/*, decisions/template.md
- [x] Marketing : brand voice, playbooks squelettes
- [x] Patterns : template + patterns clés migrés
- [x] Ops : budget limits, model tier rules, kill-switches
- [x] UI web : Next.js 14 squelette
- [x] UI brain-3d : React Three Fiber squelette

## Ce qui reste à faire (next session Claude Code)

### Immédiat
- [ ] `git init` + premier commit du squelette
- [ ] Créer le repo GitHub privé
- [ ] Push initial
- [ ] Ajouter les SaaS en submodules au fur et à mesure
- [ ] Installer Graphify + première indexation
- [ ] Installer MemPalace + init

### Phase 2 (semaine 1)
- [ ] Remplir les skills F2 custom avec du vrai contenu (brand-voice, shopify-gql, supabase-rls, etc.)
- [ ] Ingérer les CONTEXT.md existants (StoreMD, Leak Detector, F2 Ops Hub) dans les wings MemPalace
- [ ] Ingérer les conversations Claude.ai exportées dans raw/transcripts/

### Phase 3 (semaine 2)
- [ ] Build UI web complète (connectée au repo)
- [ ] Build UI brain-3d (connectée au repo)
- [ ] Tester Ouroboros en background Claude Code (une première nuit)

### Phase 4 (semaine 3+)
- [ ] `/review-proposals` → valider les premières sorties Ouroboros
- [ ] Ajuster le prompt Ouroboros selon la qualité des propositions
- [ ] Onboarder Romain (accès lecture, skills marketing-fr)

## État des SaaS F2

- **Leak Detector** : live depuis fin février 2026, en transformation vers StoreMD
- **StoreMD** : transformation active (V2 prête, 4 phases Claude Code à exécuter)
- **VideoForge** : archi v2 prête, architecture-v3 à produire
- **PayloadDiff** : en pipeline
- **ContentForge** : concept
- **F2 Ops Hub** : docs prêts, build à lancer

## Décisions en attente

(à remplir dans `studio/decisions/` au fur et à mesure)

## Notes pour la prochaine session

- F2-JARVIS doit être son propre `CLAUDE.md` — Claude Code doit le lire en premier
- Vérifier que Graphify s'installe proprement avant d'indexer
- Tester la commande `/morning` avec un corpus vide pour valider le prompt
- Ne PAS activer Ouroboros avant d'avoir vérifié les kill-switches

---

*Mise à jour : à chaque fin de session par `handoff-writer`.*
