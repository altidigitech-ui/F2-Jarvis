# CHANTIER F2-JARVIS — DOCUMENT 2 : PLAN DES ÉTAPES

> Le plan d'exécution du chantier, étape par étape, dans l'ordre des dépendances.
> Règle d'or à chaque étape : Claude Code audite (lecture seule) → on lit son audit → un prompt = une seule opération
> (ancres vérifiées avant/après) → tu valides → exécution → re-upload du repo avant l'étape suivante.
> Rien ne passe dans le plan tant que la décision correspondante n'est pas verrouillée.

---

## QUI FAIT QUOI

- **Toi (Romain)** : tu décides, tu valides, tu corriges. Rien ne s'exécute sans ton "go".
- **Moi (ce projet Claude)** : je lis, je vérifie, je conçois les plans, j'écris les prompts pour Claude Code, je tiens le suivi.
  Je ne touche pas au code en prod.
- **Claude Code (dans le repo)** : il audite et il modifie, sur mes prompts ciblés. Il remplit le fichier de suivi à chaque passage.
- **Jarvis** : c'est le système qu'on reconstruit, pas un ouvrier du chantier.

## FICHIER DE SUIVI

Un seul fichier dans le repo : `tracking/CHANTIER.md`. Créé par Claude Code au premier prompt.
Chaque prompt se termine par "mets à jour le journal du chantier (date + heure)". Il se remplit donc tout seul.

---

## ORDRE DES ÉTAPES (par dépendances, pas par numéro de chantier)

### ÉTAPE 0 — Cadrage (en cours, ici)
- Valider les 3 documents (contexte, plan, architecture).
- Trancher les questions ouvertes Q1 (webhook métriques) et Q2 (offre), au moment où leur étape arrive.
- Réécrire les règles BIBLE concernées (batch mensuel, volume cold) — après validation R + F.
- **Sortie :** les 3 documents validés + BIBLE à jour.

### ÉTAPE 1 — Suppression de Claude Chrome (chantier 7)
*On déblaie avant de construire.*
- **Audit Claude Code (lecture seule)** : recenser toute l'empreinte Chrome, classée en 4 catégories :
  fichiers entiers à supprimer / code à modifier / docs à nettoyer / mémoire à ne pas toucher.
- **Modifications** : supprimer le sous-dossier de recherche Chrome, retirer "chrome" de la route des prompts
  et du composant d'interface, nettoyer les mentions dans les fichiers de contexte vivants.
- **À ne pas toucher** : `brain/` (mémoire), `archives/`, et tout ce qui concerne Grok ou le module produit Browser Automation.
- **Sortie :** plus aucune trace de Claude Chrome dans les fichiers vivants du repo.

### ÉTAPE 2 — Cold mail (chantiers 2 et 9)
- **Audit Claude Code** : comprendre la chaîne actuelle (recherche, qualif, scan, rédaction, envoi, séquence) en détail.
- **Modifications** :
  1. Recherche : passer d'un passage quotidien à deux passages de 10 boutiques, dans des fenêtres horaires adaptées US/UK/AU.
  2. Capture : récupérer et enregistrer, pour chaque boutique, l'email + le site + les réseaux (depuis Apify).
  3. Templates : créer un template par étape de séquence (J0, J3, J7, J15), anti-IA, avec une offre.
- **Dépend de** : décision Q2 (offre) pour les templates.
- **Sortie :** 20 boutiques scannées/jour aux bonnes heures, données complètes enregistrées, mails avec vrais templates et offre.

### ÉTAPE 3 — Cold DM automatique après la séquence (chantiers 3 et 4)
- **Audit Claude Code** : comprendre comment les DM sont notés aujourd'hui et comment l'interface affiche les données.
- **Modifications** :
  1. Déclencheur : un cron qui, à J23, prend les boutiques arrivées au bout de la séquence mail et prépare leurs DM.
  2. Fichier de DM prêts : pour chaque boutique, un message personnalisé par réseau, prêt à copier-coller.
  3. Surface Jarvis : affichage de ces DM dans l'interface pour les 2 personas.
  4. Validation : bouton/commande pour marquer les DM envoyés → log automatique.
- **Dépend de** : étape 2 (la capture des réseaux), et décision sur le volume (verrouillée : 20 boutiques/jour, un DM par réseau).
- **Sortie :** cold DM event-driven, prêts dans l'interface, validables, loggés.

### ÉTAPE 4 — Batch mensuel + métriques mensuelles (chantiers 1 et 5)
- **Audit Claude Code** : comprendre le système batch (génération + découpage) et le système métriques (upload + critères).
- **Modifications** :
  1. Batch : passage hebdo → mensuel. Cron 1/mois qui prépare le batch. Validation + demande de modification + dispatch.
  2. Métriques : récupération mensuelle (admin StoreMD via webhook, foundry-two, réseaux). Alerte 2 jours avant le batch.
- **Dépend de** : décision Q1 (webhook métriques admin StoreMD). Si Q1 n'est pas résolu, on fait le reste et on branche le webhook après.
- **Sortie :** un batch mensuel automatique, des métriques mensuelles, une alerte avant chaque batch.

### ÉTAPE 5 — Interface Jarvis (chantier 8)
- **Audit Claude Code** : comprendre le tableau de bord actuel (compteurs, planning, boutons) côté front et back.
- **Modifications** :
  1. Barre de commandes dans le chat (générer, valider, voir les DM, fournir les métriques, voir l'état).
  2. Boutons dans le tableau de bord, adaptés au nouveau fonctionnement.
  3. Compteurs et planning du jour adaptés au modèle mensuel + cold DM event-driven. Nettoyage de ce qui ne sert plus.
- **Dépend de** : étapes 3 et 4 (l'interface doit refléter le nouveau cold DM et le batch mensuel).
- **Sortie :** une interface alignée sur le nouveau fonctionnement, avec commandes et boutons.

### ÉTAPE 6 — Logs unifiés + horodatage (chantiers 6 et 10)
- **Audit Claude Code** : recenser tous les endroits où on logge et tous les endroits qui n'ont que la date.
- **Modifications** :
  1. Date + heure partout (remplacer l'usage de la fonction date-seule par la fonction date+heure, ajuster les en-têtes de tableaux).
  2. Vérifier que tout ce qu'on valide est bien loggé, rangé, et rien d'oublié.
- **Dépend de** : étapes précédentes (les nouveaux logs des étapes 2 à 5 doivent déjà être horodatés à la création).
- **Sortie :** logs complets, ordonnés, horodatés date + heure partout.

### ÉTAPE 7 — Restructuration du repo (chantier 11)
- **Modifications** :
  1. Créer les nouveaux fichiers nécessaires (voir Document 3).
  2. Ranger selon la nouvelle architecture.
  3. Mettre à jour la doc (CLAUDE.md, BIBLE.md, README.md) et régénérer ARCH.md (arbre complet à jour).
- **Dépend de** : toutes les étapes précédentes (l'archi finale dépend de ce qui aura été construit).
- **Sortie :** repo propre, doc à jour, arbre complet régénéré.

---

## RÈGLES APPLIQUÉES À CHAQUE PROMPT CLAUDE CODE

- Un prompt = une seule opération claire (sauf audit lecture seule, qui peut tout recenser d'un coup).
- Chaque texte à remplacer doit être une copie exacte du fichier (ancre unique vérifiée), chaque nouveau texte vérifié comme absent.
- Section "Ne PAS faire" explicite dans chaque prompt.
- Section "Vérification post-exécution" dans chaque prompt.
- Commit unique et clair par prompt.
- Mise à jour du journal `tracking/CHANTIER.md` (date + heure) à la fin de chaque prompt.
- Re-upload du repo à jour avant le prompt suivant.

## RAPPEL DES GARDE-FOUS (non négociables)

- Zéro donnée inventée. Donnée manquante = on demande, on n'invente pas.
- Validation explicite avant toute création/modif/suppression de fichier opérationnel.
- Anti-IA sur tout contenu public (mails, DM, posts).
- Ciblage merchants Shopify uniquement (jamais de devs).
- Mémoire de Jarvis intouchable. Grok et Browser Automation conservés.
- Contenu public en anglais, docs internes en français.
