# JOURNAL DU CHANTIER — Cold / Batch / Interface Jarvis

> Suivi vivant du chantier. Mis à jour par Claude Code à la fin de CHAQUE prompt.
> Documents de référence : chantier/01-CONTEXTE-CHANTIER.md, chantier/02-PLAN-CHANTIER.md, chantier/03-ARCHITECTURE-CHANTIER.md
> Toute ligne du journal est horodatée date + heure (Europe/Paris).

## ÉTAT DES ÉTAPES
- [TERMINÉE] Étape 1 — Suppression de Claude Chrome (CAT A + B + C ✅ — sauf ARCH.md et interne-work/BLOC2-CLAUDE-CONFIG-PLAN.md reportés à l'étape 7)
- [À FAIRE]  Étape 2 — Cold mail (fenêtres horaires, capture email+site+réseaux, templates + offre)
- [À FAIRE]  Étape 3 — Cold DM automatique post-séquence (déclencheur J23, DM prêts, surface Jarvis, validation)
- [À FAIRE]  Étape 4 — Batch mensuel + métriques mensuelles
- [À FAIRE]  Étape 5 — Interface Jarvis (commandes + boutons + compteurs/planning)
- [À FAIRE]  Étape 6 — Logs unifiés + horodatage date+heure partout
- [À FAIRE]  Étape 7 — Restructuration du repo (nouveaux fichiers, archi, ARCH.md, CLAUDE.md, README.md)

## REPRISE — PROCHAINE SESSION
- Dernière session close : samedi 27 juin 2026 — 00:32 CEST. Étape 1 (suppression Claude Chrome) TERMINÉE et poussée sur main.
- Prochaine étape : Étape 2 — Cold mail.
- Premier pas étape 2 : AUDIT EN LECTURE SEULE de la chaîne cold (recherche/scan/séquence/capture réseaux). Aucune modif tant que l'audit n'est pas relu et validé.
- Règle : attendre le prompt d'audit (fourni par le projet Claude "war room") avant toute action Claude Code.
- Reste reporté à l'étape 7 : ARCH.md (régénération) + interne-work/BLOC2-CLAUDE-CONFIG-PLAN.md.

## QUESTIONS OUVERTES
- Q1 — Webhook métriques admin StoreMD : existe-t-il ? où pousse-t-il ? (à confirmer avec Fabrice — bloque l'Étape 4 seulement)
- Q2 — Offre exacte à mettre dans les mails et les DM (à définir à l'Étape 2/9)

## AUDIT ÉTAPE 1 — CLAUDE CHROME

> Audit en LECTURE SEULE réalisé le vendredi 26 juin 2026 — 22:30 CEST.
> Commande de recensement :
> `grep -rliI "chrome" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=brain --exclude-dir=archives`
> Total : 37 fichiers retournés (dont 1 fichier Grok, conservé, et 2 faux positifs "Chrome DevTools" / dossier mort signalés ci-dessous).
> Note : `brain/` et `archives/` contiennent aussi des mentions "chrome", volontairement exclues (mémoire intouchable).

### CAT A — Système Chrome actif à SUPPRIMER (fichier entier)  — ✅ TRAITÉ (vendredi 26 juin 2026 — 23:10 CEST, prompt 2A : 15 fichiers supprimés)

Sous-dossier `marketing/saas-app-shopify/recherche/cold/chrome/**` (tout le dossier, 4 plateformes × 3 fichiers) :

| Chemin | Occurrences "chrome" |
|--------|----------------------|
| marketing/saas-app-shopify/recherche/cold/chrome/facebook/prompt-recherche.md | 4 |
| marketing/saas-app-shopify/recherche/cold/chrome/facebook/recherche-log.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/facebook/template-reprise.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/instagram/prompt-recherche.md | 4 |
| marketing/saas-app-shopify/recherche/cold/chrome/instagram/recherche-log.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/instagram/template-reprise.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/linkedin/prompt-recherche.md | 4 |
| marketing/saas-app-shopify/recherche/cold/chrome/linkedin/recherche-log.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/linkedin/template-reprise.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/tiktok/prompt-recherche.md | 4 |
| marketing/saas-app-shopify/recherche/cold/chrome/tiktok/recherche-log.md | 2 |
| marketing/saas-app-shopify/recherche/cold/chrome/tiktok/template-reprise.md | 2 |

Autres fichiers de recherche entièrement dédiés à Claude Chrome :

| Chemin | Occurrences "chrome" | Note |
|--------|----------------------|------|
| marketing/saas-app-shopify/recherche/capacite-recherche-claude-chrome.md | 14 | Fichier dédié (nom + contenu = capacité de recherche Claude Chrome). |
| marketing/saas-app-shopify/recherche/engagement/ph/prompt-chrome.md | 1 | Prompt de karma farming PH via Chrome. |
| marketing/saas-app-shopify/recherche/strategie-recherche-social.md | 20 | CONFIRMÉ entièrement Chrome : en-tête « Outil principal : Claude in Chrome » (l.5), toute la stratégie repose dessus. |

### CAT B — Code à MODIFIER (retirer chrome, garder le fichier)  — ✅ TRAITÉ (vendredi 26 juin 2026 — 23:53 CEST, prompt 2B : tsc OK)

| Chemin | Ligne | Ce qu'il faut retirer exactement |
|--------|-------|----------------------------------|
| backend/jarvis/src/routes/prompts.ts | 16 | `const tools = ["grok", "chrome", "claude"];` → retirer `"chrome"` → `const tools = ["grok", "claude"];` (supprime la boucle qui liste `${persona}/${cat}/chrome`). |
| ui/jarvis/components/PromptsModal.tsx | 21 | Dans la map `TOOL_ICON` (l.19-23), retirer l'entrée `chrome: "🌐",`. Conserver `grok` et `claude`. |

### CAT C — Docs vivants à NETTOYER (retirer les mentions chrome, garder le fichier)  — ✅ TRAITÉ (samedi 27 juin 2026 — 00:12 CEST, prompt 2C : sourcing→Apify, liens morts retirés, négations ; les 4 fichiers planning R/F nettoyés en plus via les règles générales A/B/C ; ARCH.md + interne-work reportés à l'étape 7)

| Chemin | Occ. | Lignes concernées (extraits) |
|--------|------|------------------------------|
| ARCH.md | 4 | l.137 `│   │   ├── chrome` · l.147 `│   │   ├── chrome` · l.268 `│   │   ├── chrome` · l.278 `│   │   ├── chrome` (entrées d'arbre du dossier chrome). |
| marketing/README.md | 2 | l.102 `recherche/ … recherche de cibles (Chrome + Grok) + engagement` · l.170 `… la recherche de cibles (recherche/ — Chrome + Grok par plateforme …)`. |
| marketing/canaux/reddit/context.md | 1 | l.32 `Pas d'automatisation — Pas de Claude Chrome, pas de bot …` (mention en négation). |
| marketing/canaux/twitter/context.md | 1 | l.44 `Grok (pas Claude Chrome). Prompt de recherche : …/grok/twitter/prompt-recherche.md …` (mention en négation, pointe vers Grok). |
| marketing/canaux/facebook/context.md | 3 | l.46 `Claude Chrome. Prompt de recherche : …/cold/chrome/facebook/prompt-recherche.md …` · l.481 `| Prompt Chrome recherche | …/chrome/facebook/prompt-recherche.md |` · l.482 `| Recherche-log | …/chrome/facebook/recherche-log.md |`. |
| marketing/canaux/linkedin/context.md | 3 | l.45 `Claude Chrome. Prompt de recherche : …/cold/chrome/linkedin/prompt-recherche.md …` · l.390 `| Prompt Chrome recherche | …/chrome/linkedin/prompt-recherche.md |` · l.391 `| Recherche-log | …/chrome/linkedin/recherche-log.md |`. |
| marketing/canaux/instagram/context.md | 4 | l.30 `… trouver ces merchants via Claude Chrome et les contacter en cold DM.` · l.46 `Claude Chrome. Prompt de recherche : …/chrome/instagram/prompt-recherche.md …` · l.447 `| Prompt Chrome recherche | …/chrome/instagram/prompt-recherche.md |` · l.448 `| Recherche-log | …/chrome/instagram/recherche-log.md |`. |
| marketing/canaux/tiktok/context.md | 5 | l.50 `… trouver ces merchants via Claude Chrome … Recherche via …/cold/chrome/tiktok/.` · l.66 `Claude Chrome. Prompt de recherche : …/chrome/tiktok/prompt-recherche.md …` · l.68 `… Chrome navigue la version web mais les résultats sont moins riches …` · l.612 `| Prompt Chrome recherche | …/chrome/tiktok/prompt-recherche.md |` · l.613 `| Recherche-log | …/chrome/tiktok/recherche-log.md |`. |
| marketing/saas-app-shopify/context.md | 6 | l.24 `│   ├── capacite-recherche-claude-chrome.md` · l.27 `│   │   ├── chrome/ ← Via Claude Chrome (Instagram, TikTok, Facebook, LinkedIn)` · l.33 `│       └── ph/ ← prompt-chrome.md (karma farming)` · l.46 `recherche/ = partagé. Les prompts Chrome/Grok …` · l.87 `| Prompts recherche Chrome | recherche/cold/chrome/[plateforme]/prompt-recherche.md |` · l.89 `| Prompt PH Chrome | recherche/engagement/ph/prompt-chrome.md |`. |
| marketing/saas-app-shopify/storemd/context.md | 7 | l.170 `Instagram : … Trouver des merchants via Claude Chrome (recherche). …` · l.172 `TikTok : … Trouver des merchants via Claude Chrome. …` · l.327 `| Claude Chrome | Instagram | Merchants Shopify … |` · l.328 `| Claude Chrome | TikTok | … |` · l.329 `| Claude Chrome | Facebook | … |` · l.330 `| Claude Chrome | LinkedIn | … |` · l.377 `| Prompts recherche Chrome/Grok | ../recherche/cold/[outil]/[plateforme]/prompt-recherche.md |`. |
| strategie/verticals/ECOMMERCE.md | 6 | l.73 `… source pour la recherche de cibles cold via Claude Chrome. …` · l.77 `| TikTok | … | Claude Chrome | …/chrome/tiktok/prompt-recherche.md |` · l.78 `| Instagram | … | Claude Chrome | …/chrome/instagram/prompt-recherche.md |` · l.79 `| Facebook | … | Claude Chrome | …/chrome/facebook/prompt-recherche.md |` · l.80 `| LinkedIn | … | Claude Chrome | …/chrome/linkedin/prompt-recherche.md |` · l.211 `| Infiltration communautaire | Recherche ciblée (Chrome/Grok) + DM |`. |
| strategie/PLAYBOOK-DISTRIBUTION.md | 4 | l.56 `| 1 | TikTok | StoreMD | 10 (partagés R+F) | Chrome |` · l.57 `| 2 | Instagram | … | Chrome |` · l.58 `| 3 | Facebook | … | Chrome |` · l.59 `| 4 | LinkedIn | … | Chrome |`. |
| interne-work/BLOC2-CLAUDE-CONFIG-PLAN.md | 1 | l.48 `… toute la section "Engagement IH" : f2/engagement/chrome/IH-prompt-*.md …` (réf. à un dossier mort, dans un plan de config). |
| fabrice/context.md | 3 | l.91 `Instagram/TikTok : DM depuis les comptes StoreMD aux merchants trouvés par Claude Chrome` · l.138 `| Claude Chrome | Recherche read-only. Instagram, TikTok, Facebook, LinkedIn. … |` · l.140 `Règle : Grok = détective Twitter. Claude Chrome = détective autres plateformes. …`. |
| fabrice/VOIX.md | 1 | l.216 `Pas de Claude Chrome. Tout manuellement.` (mention en négation). |
| fabrice/planning/daily-checklist.md | 7 | l.14, l.29, l.35, l.48 `Ouvrir Chrome → lancer le prompt recherche [plateforme] (…/cold/chrome/…)` · l.71 `1 commentaire substantif (voir …/engagement/ph/prompt-chrome.md)` · l.87 `Préparer les cibles du lendemain (Grok, Chrome — recherche-logs)` · l.133 `Pour les recherches de cibles : Chrome pour Instagram/TikTok/Facebook/LinkedIn, Grok pour Twitter.`. |
| fabrice/planning/plan-30-jours.md | 8 | l.25, l.26 `… | Recherche Chrome → DM merchants Shopify |` · l.49 `Préparer les cibles du lendemain (Grok, Chrome)` · l.72 `Lancer les premières sessions de recherche Chrome/Grok …` · l.123, l.124, l.125, l.126 `| [plateforme] | Claude Chrome | …/chrome/[plateforme]/prompt-recherche.md | recherche-log.md |`. |
| romain/context.md | 3 | l.93 `Instagram/TikTok : DM depuis les comptes StoreMD aux merchants trouvés par Claude Chrome` · l.140 `| Claude Chrome | Recherche read-only. … |` · l.142 `Règle : Grok = détective Twitter. Claude Chrome = détective autres plateformes. …`. |
| romain/VOIX.md | 1 | l.228 `Pas de Claude Chrome (la plateforme ne le permet pas). Tout manuellement.` (mention en négation). |
| romain/planning/daily-checklist.md | 7 | l.14, l.29, l.35, l.41 `Ouvrir Chrome → lancer le prompt recherche [plateforme] (…/cold/chrome/…)` · l.71 `1 commentaire substantif (voir …/engagement/ph/prompt-chrome.md)` · l.87 `Préparer les cibles du lendemain (Grok, Chrome — recherche-logs)` · l.133 `Pour les recherches de cibles : Chrome pour Instagram/TikTok/Facebook/LinkedIn, Grok pour Twitter.`. |
| romain/planning/plan-30-jours.md | 8 | l.25, l.26 `… | Recherche Chrome → DM merchants Shopify |` · l.49 `Préparer les cibles du lendemain (Grok, Chrome)` · l.72 `Lancer les premières sessions de recherche Chrome/Grok …` · l.123, l.124, l.125, l.126 `| [plateforme] | Claude Chrome | …/chrome/[plateforme]/prompt-recherche.md | recherche-log.md |`. |

### FAUX POSITIFS — NE PAS NETTOYER (mention "chrome" sans rapport avec Claude Chrome)

| Chemin | Ligne | Raison de l'exclusion |
|--------|-------|------------------------|
| .claude/skills/saas-launch-checklist/SKILL.md | 57 | `Mobile testé (Chrome DevTools + vrai device)` = navigateur Chrome / DevTools, pas le système de recherche Claude Chrome. À conserver tel quel. |

### GROK À CONSERVER

CONFIRMÉ : aucun fichier sous `marketing/saas-app-shopify/recherche/cold/grok/**` n'apparaît dans les listes A / B / C ci-dessus.
Le seul fichier Grok retourné par le grep est `marketing/saas-app-shopify/recherche/cold/grok/twitter/prompt-recherche.md` (1 occurrence, l.135 : « Grok ne remplace PAS Claude Chrome … »). Il est conservé intact et n'est PAS classé en A/B/C.

### NOTE MÉMOIRE

`brain/` et `archives/` contiennent aussi des mentions "chrome", volontairement exclues (mémoire intouchable).

## JOURNAL D'AVANCEMENT
| Date + heure | Étape | Action réalisée | Auteur |
|--------------|-------|-----------------|--------|
| vendredi 26 juin 2026 — 22:30 CEST | Étape 1 | Rangement des 3 docs + création du journal + audit Chrome (lecture seule) | Claude Code |
| vendredi 26 juin 2026 — 23:10 CEST | Étape 1 | Suppression CAT A : 15 fichiers du système Claude Chrome | Claude Code |
| vendredi 26 juin 2026 — 23:53 CEST | Étape 1 | CAT B : retrait de "chrome" dans prompts.ts et PromptsModal.tsx (tsc OK) | Claude Code |
| samedi 27 juin 2026 — 00:12 CEST | Étape 1 | CAT C : nettoyage chrome dans les docs (sourcing→Apify, liens morts retirés, négations) — Étape 1 TERMINÉE (ARCH.md/interne-work reportés à l'étape 7) | Claude Code |
| samedi 27 juin 2026 — 00:32 CEST | Étape 1 | Clôture de session — étape 1 terminée, point de reprise posé pour l'étape 2 | Claude Code |
| lundi 30 juin 2026 — 20:12 CEST | Infra | Fix .claude/settings.json au nouveau schéma Claude Code (model string, hooks format, statusLine retirée) | Claude Code |
| mardi 30 juin 2026 — 20:30 CEST | Étape 2 | Audit cold mail (lecture seule) → chantier/AUDIT-ETAPE2-COLD-MAIL.md (5 sections : sourcing, capture données, séquence, crons, logs) | Claude Code |
