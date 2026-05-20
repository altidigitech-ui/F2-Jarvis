# Recap Sessions — README local

> Agent local pour les recaps de sessions de travail.
> **Charte globale :** voir `archives/README.md` (source de vérité, patterns figés)
> **Dernière mise à jour :** 19/05/2026

---

## 1. Rôle du dossier

Ce dossier contient les **recaps par session de travail** :

- **Événementiel** : pas d'archivage hebdo, 1 fichier `.md` par session marathon ou décision majeure
- **Particularité** : ce dossier vit directement à la racine de `tracking/` (pas dans `tracking/archives/`) car c'est sa nature opérationnelle — les recaps sont consultables immédiatement
- **Visent à** garder la trace contextuelle des sessions importantes pour reprise future (par toi, Jarvis, ou autre IA)
- **Bascule en fin d'année** : tous les `2026-*.md` seront déplacés le **04/01/2027** vers `archives/2026/04-tracking-hebdo/recap-sessions/` via le script de bascule annuelle (cf charte globale §2.6)

---

## 2. Format de nommage

**Format figé :** `YYYY-MM-DD.md`

- Date du jour de la session, format ISO 8601
- Exemple : `2026-05-17.md`

**Si plusieurs sessions le même jour** : suffixe au cas par cas (ex: `2026-05-17_morning.md` et `2026-05-17_evening.md`). Pas figé par défaut — la majorité des sessions étant uniques sur une journée donnée.

---

## 3. Quand créer un recap session

Pas d'archivage hebdo automatique. **Création manuelle** (ou par Jarvis quand branché) dans les cas suivants :

- **Fin de session marathon** (plusieurs heures de travail dense sur un sujet)
- **Décision majeure** prise dans la session (pivot stratégique, virage produit, refonte structurelle)
- **Refonte structurelle** du repo
- **Lancement business** ou activation d'un canal majeur
- **Toute session** dont le contenu mérite d'être retrouvé plus tard pour contexte (reprise par autre IA, mémoire long terme)

Ce n'est pas un journal quotidien. C'est un **filet de sécurité contextuel** pour les sessions importantes.

---

## 4. Process bascule annuelle

**Destination :** `archives/2026/04-tracking-hebdo/recap-sessions/`

**Pas de recap annuel séparé** : les recap-sessions sont déjà des recaps eux-mêmes (chaque fichier = recap d'une session). Pas besoin de compilation supplémentaire en fin d'année — bascule directe.

**Bascule effective** : lundi 04/01/2027 (premier jour S01-2027 selon ISO 8601, voir charte globale §2.6 pour le cas particulier de 2026 = 53 semaines)

**Script** : voir charte globale §2.6 — `git mv tracking/recap-sessions/2026-*.md archives/2026/04-tracking-hebdo/recap-sessions/`

---

## 5. Index des recaps (au 19/05/2026)

| Fichier | Sujet de la session |
|---------|---------------------|
| `2026-05-17.md` | Audit + plan archivage repo F2-Jarvis (consolidation patterns figés, méthodologie scalable) |

---

*Fin du README local Recap Sessions. Voir `archives/README.md` pour la charte globale.*
