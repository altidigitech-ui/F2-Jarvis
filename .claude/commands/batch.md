---
name: batch
description: Produit le batch hebdo en suivant batch-template.md (manuel complet) plus le dernier batch validé comme exemple concret. Production en 7 blocs avec validation R entre chaque, puis dispatch et archivage.
---

# /batch

Produit le batch de contenu de la semaine. Cette commande **orchestre** — elle ne recopie pas le mode d'emploi. La source de vérité des règles, c'est `marketing/contenu/batch-semaine/batch-template.md`.

## Sources à lire en premier

1. **Manuel complet** : `marketing/contenu/batch-semaine/batch-template.md` — RED LINES (§0), style (§0.1), horaires fixés (§1), données à collecter (§2), format d'un post (§3), règles de rédaction (§4), dispatch (§5), archivage (§6), nombre de posts (§7), production par blocs (§10), convention FENCE (§11), checklist validation (§8).
2. **Exemple concret validé** : le dernier `batch-semaine-S[N].md` actif dans `marketing/contenu/batch-semaine/` (aujourd'hui `batch-semaine-S11.md`). Reproduire son niveau de mise en forme et de qualité.

## Numéro de semaine cible — S[N]

Règle documentée (charte `archives/README.md` §2.1 + §2.6, complétée par `fabrice/archives/README.md`) :
- Numéro = semaine du **projet F2-Jarvis** (PAS la semaine ISO calendaire)
- ISO 8601 : lundi → dimanche
- Padding zéro à partir de S09
- Ancre : **S09 = semaine du 11-17 mai 2026** → S10 = 18-24 mai, S11 = 25-31 mai, S12 = 01-07 juin...

Calculer N pour la semaine cible à partir de cette ancre. Fichier produit : `marketing/contenu/batch-semaine/batch-semaine-S[N].md`.

## Process

1. **Timestamp** : `TZ='Europe/Paris' date '+%A %d %B %Y — %H:%M:%S %Z'`
2. **Lire les sources** : `batch-template.md` (manuel) + le dernier `batch-semaine-S[N].md` (exemple validé). Calculer le S[N] cible.
3. **Phase préliminaire** (template §10.3) — proposer à R et faire valider AVANT toute rédaction :
   - mapping vidéo source pour les 7 jours
   - angle stratégique de la semaine
   - sets hashtags par jour (depuis `marketing/saas-app-shopify/hashtags.md`)
   - si série waiting active : date_resubmission de référence pour le calcul Day N
4. **Collecter les données** (template §2 : métriques semaine écoulée, observations terrain, contexte produit, assets disponibles, ressentis R/F) → présenter à R pour validation AVANT de rédiger un seul post.
5. **Produire en 7 blocs** (template §10.2), un jour par bloc :
   - Bloc 1 (lundi) = Write intégral de `batch-semaine-S[N].md` (section lundi + 6 placeholders)
   - Blocs 2-7 = str_replace du placeholder du jour
   - Pour chaque bloc : rédiger → auditer ANTI-IA (§4.4) + RED LINES (§0) → présenter le récap à R → valider → sortir un prompt Claude Code chirurgical (convention FENCE §11) → R lance → bloc suivant
6. **Dispatch** (template §5) une fois le batch central validé par R — copier les posts par compte vers :
   - `romain/publication/batch-semaine.md`
   - `fabrice/publication/batch-semaine.md`
   - `marketing/saas-app-shopify/storemd/publication/batch-semaine.md`
7. **Archivage** (template §6, à terme automatisé via `/archivage`) — en fin de semaine, copier le batch central dans `marketing/archives/batch-semaine/batch-semaine-S[N].md`.

## Garde-fous (non-négociables)

- **Validation R obligatoire** entre chaque bloc. Aucun post produit, dispatché ou archivé sans `go` explicite.
- **Zéro donnée inventée** (BIBLE §3, RED LINES §0) — chaque chiffre retraçable à une source (research publique, MUTATIONS.md, `tracking/metrics/`, admin dashboard).
- **ANTI-IA** (§4.4) — audit de chaque texte avant livraison.
- **UTM** — jamais de mémoire, toujours copié depuis `tracking/utm/StoreMD/UTM_TRACKING_LINKS.md`.
- **Contenu public en anglais.** Traduction FR jointe pour validation R.
- **Voix par compte** via `brand-voice` : R → `marketing/romain` · F → `marketing/fabrice` · comptes produit StoreMD + IH FoundryTwo → `marketing/storemd`.
