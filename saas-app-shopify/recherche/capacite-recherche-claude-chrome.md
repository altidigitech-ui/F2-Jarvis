# AUDIT DATA — CAPACITÉS RECHERCHE CLAUDE IN CHROME

**Date :** 30 avril 2026
**Sources :** Retour audit Claude Chrome (session live) + recherches web croisées (reverse engineering, documentation Anthropic, GitHub issues, reviews, tests indépendants)

---

## 1. ARCHITECTURE TECHNIQUE

**Comment Claude Chrome "voit" une page — 2 modes :**

- **Mode 1 : Accessibility Tree** — Injecte un script qui parcourt le DOM et génère un arbre d'accessibilité (rôles, attributs, noms, hiérarchie des éléments). Output limité à 50 000 caractères par appel. C'est le mode le moins gourmand en tokens.
- **Mode 2 : Screenshots** — Quand l'accessibility tree ne suffit pas (contenu visuel, layouts complexes). Chaque screenshot = 100-500 Ko de base64. Les screenshots s'accumulent dans le contexte et sont renvoyés à l'API à chaque tour suivant. Jamais supprimés automatiquement.

**Outils internes confirmés (source : reverse engineering du code source, publié sur GitHub) :**

| Outil | Fonction |
|-------|----------|
| `read_page` | Arbre d'accessibilité, filtrable (interactive only / all), profondeur max 15 niveaux, output max 50 000 chars |
| `get_page_text` | Texte brut de la page, conçu pour pages texte-heavy |
| `find` | Recherche d'éléments en langage naturel |
| `navigate` | Navigation URL ou historique (back/forward). Vérifie le domaine via API Anthropic avant navigation |
| `computer` | Souris, clavier, screenshots |
| `form_input` | Remplissage formulaires |
| `javascript_tool` | Exécution JS dans le contexte de la page |
| `tabs_create` | Création onglets |
| `tabs_context` | Lecture contexte multi-onglets |
| `read_console_messages` | Lecture console navigateur (logs, erreurs) |
| `read_network` | Lecture requêtes réseau (inclut tokens OAuth, sessions — risque sécurité) |

**System prompt :** ~40 Ko. Chargé depuis un server config (`chrome_ext_system_prompt`). Inclut infos plateforme (Mac/Windows), contexte onglet actif (URLs, titres, IDs), skills spécifiques par domaine.

**Vérification domaines :** Avant chaque `navigate`, Claude Chrome interroge `api.anthropic.com/api/web/domain_info/browser_extension?domain=...` pour classifier le domaine. Les domaines catégorie 1 et 2 sont bloqués. Sites financiers, contenu adulte, contenu piraté = bloqués confirmés. Instagram/TikTok/Facebook = non confirmé bloqué (Claude Chrome dit pouvoir y accéder, mais pas testé en live lors de l'audit).

**Authentification :** OAuth PKCE (scopes : `user:profile user:inference`). Utilise la session navigateur de l'utilisateur pour les sites tiers.

**Extension :** Chrome Manifest V3, React, Anthropic JS SDK avec `dangerouslyAllowBrowser: true`.

---

## 2. CONTEXTE ET TOKENS — DONNÉES CHIFFRÉES

**Fenêtre de contexte :**
- Tous plans payants : 200K tokens
- Enterprise : jusqu'à 500K sur certains modèles

**Coût tokens par type de page (données croisées) :**

| Source | Tokens par page |
|--------|----------------|
| PinchTab (accessibility tree optimisé) | ~800 tokens |
| Claude Chrome accessibility tree | ~3 000-5 000 tokens (estimation) |
| Chrome DevTools MCP brut | ~10 000+ tokens |
| Screenshot base64 | variable, 100-500 Ko encodé |

**Budget disponible par session :**
- 200K total - ~40K system prompt = ~160K pour les données
- À 3 000-5 000 tokens/page de profil social = 32-53 profils théoriques
- En pratique (avec raisonnement, outputs intermédiaires, tool calls) = 15-25 profils réalistes

**Accumulation screenshots — donnée critique :**
- Bug documenté (GitHub issue #27869) : dans une session avec 18 screenshots (~1.7 Mo de base64), reprendre le lendemain et poser une question simple a consommé 17% du quota Max 5x en 5 appels API
- Le coût se compose : tour N est plus cher que tour N-1 car le contexte a grossi du screenshot précédent
- Les screenshots ne sont jamais purgés automatiquement du contexte

**Phénomène lost-in-the-middle :**
- Confirmé par Claude Chrome : les détails du début de session deviennent moins fiables à mesure que la conversation s'allonge
- Confirmé par test DataCamp : au 3ème formulaire sur 5, confusion de noms ("Emily Watson" → "Emily Wang") + temps d'exécution passé à 50 minutes
- Pas de cutoff dur, mais dégradation progressive de la précision de rappel

**Auto-monitoring :**
- Claude Chrome n'a PAS de jauge interne "tokens restants"
- Il ne peut pas dire "il me reste 14% de contexte"
- Il se fie à un "rough sense" basé sur le nombre de tool calls et la longueur de la session
- Il peut s'arrêter proactivement SI on lui donne une instruction explicite dans le prompt

---

## 3. CAPACITÉS NAVIGATION — PAR PLATEFORME

### Instagram (web)

| Capacité | Statut | Détail |
|----------|--------|--------|
| Naviguer profils | ✅ | Via session connectée R |
| Recherche hashtag | ✅ | Résultats dynamiques, Top + Recent |
| Lire bios | ✅ | Texte, followers, following, posts count |
| Lire lien en bio | ✅ | Peut suivre le lien vers site externe |
| Voir "Similar accounts" | ✅ | Sidebar sur profils, lisible dans le DOM |
| Scroller feed/hashtag | ✅ avec limites | 10-20 posts par scroll, max 3-5 scrolls recommandés |
| Voir Stories | ❌ | Pas fiable sur web |
| Voir Reels | ⚠️ | Auto-play peut ne pas rendre correctement |
| Profils privés | ⚠️ | Bio + follower count visibles, posts non |
| Rate limiting | ⚠️ | Navigation rapide de profils peut déclencher CAPTCHA |

### TikTok (web)

| Capacité | Statut | Détail |
|----------|--------|--------|
| Naviguer profils | ✅ | Via tiktok.com, session connectée |
| Recherche keyword | ✅ | Résultats disponibles, tab "Users" filtrable |
| Lire bios | ✅ | Bio, followers, likes count, liens |
| Lire lien en bio | ✅ | Si présent |
| Voir "Suggested" | ✅ | "Others also liked" accessible |
| Scroller feed | ✅ avec limites | Même contrainte tokens que Instagram |
| Métriques vidéo | ✅ | Views, likes, comments, shares lisibles |
| For You feed | ❌ inutile | Moins personnalisé sur web, pas adapté à la recherche ciblée |
| Analytics créateur | ❌ | Pas visibles côté public |
| Données incomplètes | ⚠️ | Certains profils ont des données tronquées vs app |
| Web vs App | ⚠️ | Expérience web intentionnellement dégradée par TikTok |

### Facebook (web)

| Capacité | Statut | Détail |
|----------|--------|--------|
| Naviguer Pages | ✅ | Publiques par défaut, bio/followers/about lisibles |
| Naviguer groupes | ✅ si membre | R doit être membre, groupes privés inaccessibles |
| Lire posts dans groupes | ✅ | Nom auteur + contenu du post visibles |
| Cliquer profil auteur depuis groupe | ✅ avec limites | Accès à ce qui est public sur le profil perso |
| Recherche Pages | ✅ | Filtrer par "Pages" dans résultats recherche |
| Recherche People | ⚠️ peu productif | Trop de profils privés |
| Marketplace | ⚠️ | Nécessite contexte localisation |
| DOM heavy | ⚠️ | DOM extrêmement lourd, rendering multi-pass, JS lent |
| Profils perso privés | ❌ quasi-total | Sauf si R est ami, presque rien visible |

---

## 4. CAPACITÉS GÉNÉRALES

| Capacité | Statut | Détail |
|----------|--------|--------|
| Utiliser la session connectée R | ✅ | Voit ce que R voit |
| Suivre un lien externe (bio → site) | ✅ | Si domaine autorisé |
| Vérifier "Powered by Shopify" sur site | ✅ | Via `get_page_text` sur le site |
| Produire tableau markdown | ✅ | Clair et structuré |
| Produire CSV code block | ✅ | Plus compact en tokens |
| Gérer multi-onglets | ✅ | Tab groups, voir et interagir avec tous |
| Se connecter / entrer mot de passe | ❌ jamais | Interdit par design |
| Résoudre CAPTCHA | ❌ | R doit le faire manuellement |
| Mémoire entre sessions | ❌ | Contexte réinitialisé à chaque nouvelle session |
| Exporter en fichier | ❌ | Produit du texte dans le chat, pas de fichier |
| Sauvegarder un prompt en shortcut | ✅ | Réutilisable en "/" |
| Planifier un shortcut récurrent | ✅ | Daily, weekly, monthly, annually |

---

## 5. PERFORMANCE ET VITESSE

| Donnée | Source |
|--------|--------|
| "Task completion is reliable but extremely slow" | Review AIoperator.com sept 2025 |
| 50 minutes pour remplir 3 formulaires | Test DataCamp |
| ~30-60 secondes par profil (navigate + read + vérifier) | Estimation basée sur les retours |
| 10 minutes pour chercher un appart sur Zillow | Test reverse engineering blog |
| Chaque action = screenshot ou read_page → appel API → action suivante | Architecture séquentielle confirmée |

---

## 6. QUOTAS ET COÛTS

| Donnée | Source |
|--------|--------|
| Les interactions navigateur consomment plus de quota que les chats réguliers | Doc Anthropic officielle |
| Usage partagé entre Claude.ai, Claude Chrome et Claude Code | Doc Anthropic officielle |
| Plan Pro : limité à Haiku 4.5 | Doc Anthropic (27 avril 2026) |
| Plan Max/Team/Enterprise : choix modèle (Haiku 4.5, Sonnet 4.6, Opus 4.7) | Doc Anthropic (27 avril 2026) |
| Session avec screenshots lourds = 17% du quota Max 5x en 5 appels | GitHub issue #27869 |

---

## 7. SÉCURITÉ ET RESTRICTIONS

| Donnée | Source |
|--------|--------|
| Taux d'attaque prompt injection sans protection : 23.6% | Research Anthropic nov 2025 |
| Taux avec protections : 11.2% (adaptive attacks) | Research Anthropic nov 2025 |
| Taux actuel (Opus 4.5) : ~1% | Doc Anthropic (Claude in Chrome safety, avril 2026) |
| Sites bloqués : services financiers, contenu adulte, contenu piraté | Doc Anthropic |
| Classification domaines via API avant navigation | Reverse engineering confirmé |
| JavaScript exécutable sur les pages visitées (avec permission par domaine) | Doc Anthropic |
| Pas de profil Chrome multiple supporté | GitHub issue #19740 |
| Extension réécrit les NM manifests à chaque lancement Desktop | Analyse thatprivacyguy avril 2026 |

---

## 8. ESTIMATIONS SESSION POUR NOTRE USE CASE

| Paramètre | Valeur | Confiance |
|-----------|--------|-----------|
| Profils qualifiés par session | 15 baseline, 20 max | Haute (convergence 2 sources) |
| Batch checkpoint | Tous les 5 profils | Haute (recommandation Claude Chrome) |
| Lignes CSV fiables par session | ~30 (5-8 colonnes) | Haute |
| Lignes CSV avec dégradation | ~50 | Moyenne |
| Scrolls max par page avant gaspillage tokens | 3-5 | Haute |
| Temps par session | 15-30 minutes | Moyenne |
| Sessions pour 1000 comptes/plateforme | ~50-65 | Moyenne (dépend du taux de qualification) |
