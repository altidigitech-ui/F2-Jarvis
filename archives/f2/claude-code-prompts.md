# PROMPTS CLAUDE CODE F2 — Mise à jour quotidienne du repo

**Dernière mise à jour :** 04 avril 2026

## Usage : copie-colle ces prompts dans Claude Code pour mettre à jour les fichiers F2 au fil de la journée et de la semaine. Exécuté par R (qui gère F2).

---

## 1. AJOUTER UN ÉVÉNEMENT NOTABLE F2 (quotidien, 30 sec)

Prompt :

"Dans f2/progress-semaine.md, ajoute cette ligne dans le tableau ÉVÉNEMENTS NOTABLES :
| [DATE] | [DESCRIPTION] | [PLATEFORME] | [ACTIVITÉ] | [ACTION] |"

Exemple :

"Dans f2/progress-semaine.md, ajoute cette ligne dans le tableau ÉVÉNEMENTS NOTABLES :
| 07/04 | Merchant Shopify a reply au thread F2 en demandant comment réduire ses chargebacks | Twitter | publication | Reply envoyé avec insight terrain (données terrain chargebacks $800/mois) |"

---

## 2. AJOUTER UN INSIGHT F2 (quotidien, 30 sec)

Prompt :

"Dans f2/progress-semaine.md, ajoute cet insight dans la section INSIGHTS ET PATTERNS :
- [DESCRIPTION]"

---

## 3. MARQUER UN POST F2 COMME PUBLIÉ (après chaque publication)

Prompt Twitter F2 :

"Dans f2/plan-hebdo.md, marque le post Twitter F2 de [JOUR] comme PUBLIÉ [HEURE]"

Prompt IH :

"Dans f2/plan-hebdo.md, marque le post IH de [JOUR] comme PUBLIÉ [HEURE]"

---

## 4. REMPLIR LES MÉTRIQUES F2 VENDREDI (revue, 5 min)

Prompt :

"Dans f2/progress-semaine.md, remplis les métriques de la section MÉTRIQUES VENDREDI avec ces données :
Twitter F2 : [X] impressions, [X] replies reçues, [X] replies organiques (hors cross-engagement R/F), [X]% engagement, [X] profile visits, [X] followers total
IH : [X] vues sur le post, [X] commentaires, [X] upvotes
Meilleur post F2 Twitter (lequel + pourquoi) : [DESCRIPTION]
Pire post F2 Twitter (lequel + pourquoi) : [DESCRIPTION]
Signups portfolio via F2 (UTM) : [X]
Synthèse F2 : [Bonne/Moyenne/Mauvaise] parce que [RAISON]
Temps batch F2 samedi : [X] min"

---

## 5. ARCHIVAGE F2 DIMANCHE (10 min)

Prompt :

"1. Copie f2/plan-hebdo.md vers archives/F2-plan-hebdo-semaine-[N].md
2. Copie f2/progress-semaine.md vers archives/F2-progress-semaine-[N].md
3. Réinitialise f2/plan-hebdo.md avec le template vide et les dates de la nouvelle semaine [DATE DÉBUT] au [DATE FIN]
4. Réinitialise f2/progress-semaine.md avec le template vide et les dates de la nouvelle semaine
NE MODIFIE AUCUN AUTRE FICHIER."

---

## NOTES

- Incrémente le numéro de semaine chaque dimanche (semaine-01, semaine-02...)
- Ne jamais modifier playbook-semaine.md, context.md, roadmap.md ni publication/ via ces prompts
- Les prompts 1-3 sont quotidiens (30 sec chacun). Le prompt 4 est vendredi soir. Le prompt 5 est dimanche.
- Les posts-valides F2 sont archivés manuellement avec le plan-hebdo (même fichier temporel)
