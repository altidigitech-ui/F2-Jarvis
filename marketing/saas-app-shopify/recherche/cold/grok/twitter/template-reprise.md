# TEMPLATE REPRISE — Twitter (Grok)

> Prompt source : `prompt-recherche.md` (même dossier)
> Données source : `recherche-log.md` (même dossier)

---

## PROCÉDURE DE REPRISE

### Étape 1 — Extraire les données du recherche-log

Ouvrir `recherche-log.md` et récupérer depuis le bloc de fin de la DERNIÈRE session :
- Resume from : [dernier terme de recherche]
- Skip list : [TOUS les handles de TOUTES les sessions]

### Étape 2 — Copier le prompt original

Copier l'intégralité du prompt depuis `prompt-recherche.md`.

### Étape 3 — Modifier le prompt

Ajouter en fin de prompt :
"Handles déjà trouvés (à exclure) : [skip list]. Reprends depuis : [terme de recherche]."

### Étape 4 — Coller dans Grok et lancer

### Étape 5 — Vérification post-session

Chaque handle retourné par Grok DOIT être vérifié manuellement sur x.com avant d'envoyer un cold DM.
