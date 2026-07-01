# CHANTIER F2-JARVIS — DOCUMENT 1 : CONTEXTE

> Document de référence. Décrit l'état réel actuel (vérifié dans le code) et la cible, pour chaque chantier.
> Source de vérité de départ pour Claude Code et Jarvis. Toute erreur se corrige ici avant d'agir.
> Langue : français (interne). Contenu public : anglais.

---

## À QUOI SERT CE DOCUMENT

Il pose, en clair, **où on en est aujourd'hui** et **où on veut aller**, pour les 11 chantiers.
Tout ce qui est écrit ici a été vérifié en lisant les fichiers du repo, pas supposé.

## LE PROJET EN UNE PHRASE

StoreMD est le produit prioritaire : une app qui scanne la santé d'une boutique Shopify (43 features, 5 modules, 60 secondes).
On va chercher les clients un par un (cold mail puis cold DM), et Jarvis automatise tout ce qui peut l'être,
avec validation par nous à chaque étape sensible.

---

## CHANTIER 1 — BATCH MENSUEL

**Aujourd'hui.** Le batch (les posts de la période) se fait chaque semaine, numéroté S{N}. Jarvis le génère sur demande
(via les outils `generate_batch` et `dispatch_batch`, qui tournent en arrière-plan dans le worker), te le propose, tu valides,
puis il le découpe en 3 fichiers de publication (R, F, StoreMD) par extraction du batch central. Tout le système est marqué
"semaine" partout. Il n'y a aucun déclenchement automatique : c'est toi qui demandes la génération.

**Cible.** Passage au mensuel. Un cron qui se déclenche une fois par mois prépare le batch automatiquement.
Tu le valides, et tu peux demander des modifications avant validation. Le découpage en 3 fichiers reste, adapté au mensuel.

---

## CHANTIER 2 — COLD MAIL AMÉLIORÉ

**Aujourd'hui.** La chaîne fonctionne bien : Apify (actor `clearpath/shopify-store-leads`) trouve des boutiques →
qualification → vérification de l'email (SMTP) → scan de la boutique avec StoreMD → rédaction du mail (IA) →
envoi au jour 0 → relances aux jours 3, 7 et 15. Limites actuelles : la recherche de boutiques se lance une fois par jour
sans tenir compte de l'heure, et on ne récupère que l'email (pas le site ni les réseaux).

**Cible.** Deux passages par jour de 10 boutiques chacun (20/jour), aux bonnes heures pour les US, le UK et l'Australie.
À chaque boutique trouvée, on enregistre l'email, le site et les réseaux sociaux. Puis le mail part (J0) et la séquence
continue (J3, J7, J15), le tout enregistré.

**Point technique clé.** L'actor Apify renvoie déjà une liste de contacts par boutique. Le code ne lit que l'email
et ignore les réseaux, qui sont à priori déjà disponibles. Il suffit de les récupérer et de les enregistrer.

---

## CHANTIER 3 ET 4 — COLD DM RÉSEAUX AUTOMATIQUE

**Aujourd'hui.** Le cold DM fonctionne à l'ancienne : un quota fixe de messages par jour, sans lien avec le mail.
Les fichiers de log existent déjà (Twitter, LinkedIn, Facebook côté R et F ; TikTok, Instagram côté StoreMD).
Mais rien ne déclenche le DM après la séquence mail, et rien ne prépare les DM dans l'interface.

**Cible.** Le cold DM démarre à J23 (8 jours après le dernier mail, J15). Un cron crée un fichier qui contient,
pour chaque boutique, un message DM personnalisé et prêt à envoyer sur chacun de ses réseaux. Ces DM sont visibles
dans l'interface Jarvis pour les deux personas (R et F). Une fois envoyés, vous validez par bouton ou commande,
et Jarvis enregistre le résultat dans le repo et l'interface.

**Volume cible.** 20 boutiques/jour. Un DM par réseau de chaque boutique (donc plus de 20 messages au total).

**Parcours type (cold DM).**
Jarvis (recherche + mails automatisés, loggés) → Interface Jarvis (les DM prêts s'affichent pour les 2 personas)
→ Nous (on envoie les DM quand on peut) → Nous (validation des DM envoyés via bouton/commande)
→ Jarvis (log des résultats dans le repo et l'interface).

---

## CHANTIER 5 — MÉTRIQUES MENSUELLES

**Aujourd'hui.** Les chiffres sont récupérés chaque semaine, en uploadant des fichiers à la main vers `raw/analytics/`.
Les dossiers de rangement existent (admin StoreMD, foundry-two, par réseau). Mais rien ne reçoit automatiquement
les chiffres de la page admin StoreMD (seul un webhook Resend, pour les rebonds de mails, existe). Pas d'alerte "batch à venir".

**Cible.** Récupération mensuelle : chiffres admin StoreMD (par webhook, à confirmer — voir Q1), foundry-two (Vercel),
et réseaux. Une alerte 2 jours avant le batch s'affiche dans l'interface pour dire de fournir les chiffres.
Tout peut être fourni directement via Jarvis.

**Parcours type (batch mensuel).**
Jarvis (cron 1/mois) → Interface (alerte 2 jours avant pour donner les métriques) → Nous (envoi des métriques)
→ Jarvis (demande la validation du batch pour le dispatch) → Nous (validation ou demande de modification avec explication)
→ Nous (schedule des posts au maximum, validation de chaque post schedulé dans l'interface).

---

## CHANTIER 6 — LOGS UNIFIÉS

**Aujourd'hui.** Ce qu'on note (DM, décision, post publié) est enregistré dans des fichiers du repo, mais souvent
avec la date seulement, pas l'heure. La boucle validation → log est déjà câblée (un bouton de validation déclenche
l'écriture dans le bon fichier).

**Cible.** Tout ce qu'on fait et valide avec Jarvis est enregistré, rien ne se perd, tout est rangé et ordonné,
et horodaté avec la date et l'heure (voir chantier 10).

---

## CHANTIER 7 — SUPPRESSION DE CLAUDE CHROME

**Aujourd'hui.** Le système de recherche Claude Chrome est éparpillé : un sous-dossier de recherche dédié,
un bout de code dans le backend (la route qui liste les prompts), un bouton dans l'interface, et des mentions
dans une quinzaine de fichiers de contexte.

**Cible.** Suppression totale dans les fichiers du repo. On garde Grok (le détective) et le module produit
"Browser Automation" de StoreMD (c'est une feature de l'app, rien à voir avec la recherche Chrome).
On ne touche pas à la mémoire de Jarvis (ses archives de conversations : `brain/`, `archives/`).

---

## CHANTIER 8 — INTERFACE JARVIS

**Aujourd'hui.** Le système de validation par bouton fonctionne bien. Mais le tableau de bord (planning du jour,
compteurs) est calé sur le rythme hebdo et sur l'ancien modèle de cold DM (quotas fixes par plateforme).
Il n'y a pas de vraies "commandes" : juste des phrases que Jarvis reconnaît.

**Cible.** Une barre de commandes dans le chat (pour demander facilement : générer, valider, voir les DM prêts,
fournir les métriques, voir l'état) ET des boutons dans le tableau de bord. Les compteurs et le planning du jour
sont adaptés au nouveau fonctionnement. On nettoie ce qui ne sert plus.

---

## CHANTIER 9 — MAILS PERSONNALISÉS ET OFFRES

**Aujourd'hui.** Pour l'email, pas de vrais templates : le premier mail est rédigé par l'IA à partir du score de scan,
et les relances utilisent un seul texte générique recopié. Aucune offre n'apparaît dans les mails.
Les frameworks de message existants ne concernent que les DM réseaux.

**Cible (décidée).** PAS de templates figés : un mail générique finit à la corbeille. Les 4 mails (J0, J3, J7, J15)
sont GÉNÉRÉS et personnalisés par boutique via le SDK (on étend le mécanisme du J0 actuel), à partir des findings du
scan. Chaque mail porte l'offre et un code promo. Même logique pour les cold DM (étape 3) : personnalisé, pas IA.

**Offre (décidée, Q2 résolue).** Pricing réel = Free / Starter $29 / Pro $79 / Agency $199 (facturé via Stripe ;
Shopify Billing désactivé). Mécanique : coupon Stripe percent_off / duration:once (1er mois), un code UNIQUE par
boutique (traçable, anti-fuite), usage unique, expiration dure. Séquence : J0 = -20% (relances J3/J7 = même code,
deadline J7), trou volontaire J8-J14, J15 = -50% (nouveau code, expire J22). Le cold DM J23 (-50%) relève de l'étape 3.
Création des codes : Option B — StoreMD crée le coupon via une route interne, Jarvis le demande et le stocke ; le secret
Stripe ne quitte jamais StoreMD.

---

## CHANTIER 10 — HORODATAGE PARTOUT

**Aujourd'hui.** La fonction qui met date + heure existe (`cestNow()`), mais elle n'est presque pas utilisée.
La plupart des logs n'ont que la date (`cestDate()`).

**Cible.** Date ET heure partout, dans tous les logs et fichiers du chantier.

---

## CHANTIER 11 — RESTRUCTURATION DU REPO

**Aujourd'hui.** La doc principale (CLAUDE.md, ARCH.md, BIBLE.md, README.md) décrit une réalité hebdomadaire
et l'ancien modèle. ARCH.md est périmé (généré le 26 avril, référence des batchs S7).

**Cible.** Créer les nouveaux fichiers nécessaires, ranger le tout, mettre à jour la doc, régénérer l'arbre complet,
pour que tout soit clair pour nous et pour Jarvis. (Détail dans le Document 3 — Architecture.)

---

## DÉCISIONS VERROUILLÉES

- Scan : 20 boutiques/jour, en 2 passages de 10, bonnes heures US/UK/AU.
- Volume mails : pas de plafond quotidien (plafond 20/jour abandonné). Rythme porté par le sourcing (2×10/jour) et les relances dues.
- Séquence mail : J0 / J3 / J7 / J15 (inchangée).
- Contenu mails : générés et personnalisés par boutique (pas de templates figés).
- Offre : coupon Stripe percent_off/once (1er mois), code unique/boutique, usage unique, expiration dure. J0 = -20% (code réutilisé J3/J7, deadline J7), J15 = -50% (nouveau code, 7 j). Codes créés par StoreMD (Option B), stockés côté Jarvis dans cold_targets.offers (jsonb).
- Cold DM : démarre à J23 (8 jours après J15). 20 boutiques/jour, un DM par réseau de chaque boutique.
- Réseaux : récupérés depuis Apify, enregistrés avec le mail et le site.
- Batch et métriques : mensuels.
- Logs : horodatés date + heure.
- Claude Chrome : supprimé du repo uniquement. Mémoire de Jarvis intouchable. Grok conservé.
- Interface : barre de commandes + boutons.
- BIBLE : modifiable (notamment §1 batch et §4 volume cold) après validation R + F.

## QUESTIONS ENCORE OUVERTES

- **Q1** — Webhook des métriques admin StoreMD : à confirmer avec Fabrice (existe-t-il ? où pousse-t-il ?).
  Ne bloque que le chantier 5.
- **Q2** — RÉSOLUE : offre verrouillée (coupon Stripe percent_off/once, J0 -20% / J15 -50%, codes uniques via StoreMD Option B). Voir chantier 9 + Décisions verrouillées.

## UN POINT À GARDER EN TÊTE

Le sourcing fait entrer ~20 nouvelles boutiques par jour dans la séquence (2×10). Les relances (J3/J7/J15) s'ajoutent
par-dessus les nouveaux envois, sans plafond quotidien. Comme il faut 23 jours pour qu'une boutique atteigne le cold DM,
le pipeline se remplit progressivement : au démarrage peu de boutiques arrivent à J23, puis le rythme monte jusqu'à
~20 DM/jour en régime établi. Ce n'est pas un bug.
