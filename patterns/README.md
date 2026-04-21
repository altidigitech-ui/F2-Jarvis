# patterns/ — Patterns techniques décisionnels

**Rôle :** catalogue des décisions techniques prises par F, durcies en patterns réutilisables pour éviter de refaire les mêmes recherches ou erreurs.

---

## Patterns actifs

| Fichier | Sujet |
|---------|-------|
| `bitwarden-over-shared-passwords.md` | Gestion des secrets via Bitwarden CLI |
| `shopify-rest-is-dead.md` | Migrer vers GraphQL (REST Shopify déprécié 2024) |
| `dual-llm-sonnet-haiku.md` | Architecture bi-modèle (Sonnet critique, Haiku rapide) |
| `no-browser-automation-saas.md` | Pas d'automation navigateur dans les SaaS |
| `tiktok-native-over-capcut.md` | Éditeur natif TikTok > CapCut pour les vidéos démo |
| `audit-v1-then-correct-v2.md` | Stratégie audit/correction versionnée |

---

## Convention

Chaque pattern .md contient :
- **Contexte** — problème rencontré
- **Décision** — ce qu'on a choisi
- **Raison** — pourquoi
- **Alternatives rejetées** — et pourquoi
- **Conséquences** — ce que ça implique pour le futur

---

## Quand créer un nouveau pattern

- Décision technique qui a pris > 2h de recherche
- Erreur qu'on a déjà faite et qu'on ne veut plus refaire
- Convention qui doit être respectée dans tous les futurs SaaS

---

## Références

- Cette doc sert aux agents `.claude/agents/f2-architect.md` et `f2-dev.md`
- CLAUDE.md §5 mentionne ce dossier

---

**Dernière mise à jour : 21 avril 2026**
