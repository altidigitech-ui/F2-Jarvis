# PROMPTS CLAUDE CODE F — Mise à jour quotidienne du repo

## Usage : copie-colle ces prompts dans Claude Code pour mettre à jour le repo au fil de la journée et de la semaine.

---

## 1. AJOUTER UN ÉVÉNEMENT NOTABLE (quotidien, 30 sec)

Prompt :

"Dans fabrice/progress-semaine.md, ajoute cette ligne dans le tableau ÉVÉNEMENTS NOTABLES :
| [DATE] | [DESCRIPTION] | [PLATEFORME] | [ACTIVITÉ] | [ACTION] |"

Exemple :

"Dans fabrice/progress-semaine.md, ajoute cette ligne dans le tableau ÉVÉNEMENTS NOTABLES :
| 07/04 | Merchant Shopify a reply au cold outreach technique — veut savoir quelles apps supprimer | Twitter | cold | Follow-up envoyé |"

---

## 2. AJOUTER UN INSIGHT (quotidien, 30 sec)

Prompt :

"Dans fabrice/progress-semaine.md, ajoute cet insight dans la section INSIGHTS ET PATTERNS :
- [DESCRIPTION]"

---

## 3. MARQUER UN POST COMME PUBLIÉ (après chaque publication)

Prompt Twitter :

"Dans fabrice/plan-hebdo.md, marque le post de [JOUR] comme ✅ Publié [HEURE]"

Prompt LinkedIn :

"Dans fabrice/plan-hebdo.md, marque le post LinkedIn de [JOUR] comme ✅ Publié [HEURE]"

---

## 4. LOGGER UN COLD OUTREACH (après chaque envoi)

Prompt :

"Dans fabrice/cold/cold-outreach-log.md, ajoute cette ligne dans le LOG :
| [#] | [DATE] | [PLATEFORME] | [VERTICAL] | [CIBLE] | [INSIGHT TECHNIQUE] | ✅ | | | [NOTES] |"

Exemple :

"Dans fabrice/cold/cold-outreach-log.md, ajoute cette ligne dans le LOG :
| 1 | 07/04 | Twitter | e-com | @shopify_merchant | 14 apps = +2-3s de JS, bottleneck identifié | ✅ | | | Premier cold post-pivot |"

---

## 5. REMPLIR LES MÉTRIQUES VENDREDI (revue, 5 min)

Prompt :

"Dans fabrice/progress-semaine.md, remplis les métriques de la section MÉTRIQUES VENDREDI avec ces données :
Cold outreach : [X] réalisés, [X]% réponse, [X] clicks UTM
Par vertical : E-com [X], Creator [X]
Twitter : [X] impressions, [X] replies, [X]% engagement, [X] profile visits, [X] followers
LinkedIn : [X] impressions, [X] commentaires, [X] profile visits, [X] connexions
Engagement : [X] interactions total (Twitter + LinkedIn)
Synthèse : [Bonne/Moyenne/Mauvaise] parce que [RAISON]
Temps batch : Twitter [X]min, LinkedIn [X]min, Total [X]min"

---

## 6. ARCHIVAGE DIMANCHE (10 min)

Prompt :

"1. Copie fabrice/plan-hebdo.md vers archives/F-plan-hebdo-semaine-[N].md
2. Copie fabrice/progress-semaine.md vers archives/F-progress-semaine-[N].md
3. Copie fabrice/cross-engagement-tracker.md vers archives/F-cross-engagement-semaine-[N].md
4. Copie fabrice/cold/cold-outreach-log.md vers archives/F-cold-outreach-semaine-[N].md
5. Réinitialise fabrice/plan-hebdo.md avec le template vide et les dates de la nouvelle semaine
6. Réinitialise fabrice/progress-semaine.md avec le template vide
7. Réinitialise fabrice/cross-engagement-tracker.md avec le template vide
8. Réinitialise fabrice/cold/cold-outreach-log.md avec le template vide
NE MODIFIE AUCUN AUTRE FICHIER."

---

## NOTES

- Incrémente le numéro de semaine chaque dimanche
- Ne jamais modifier playbook-semaine.md, context.md, roadmap.md ni system-prompt.md via ces prompts
- Les prompts 1-4 sont quotidiens (30 sec). Le prompt 5 est vendredi soir. Le prompt 6 est dimanche.
