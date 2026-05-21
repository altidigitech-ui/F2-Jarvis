# TEMPLATE REPRISE — Instagram (Chrome)

> Comment construire le prompt de continuation pour reprendre une recherche Instagram.
> Prompt source : `prompt-recherche.md` (même dossier)
> Données source : `recherche-log.md` (même dossier)

---

## PROCÉDURE DE REPRISE

### Étape 1 — Copier le prompt original

Copier l'intégralité du prompt depuis `prompt-recherche.md`.

### Étape 2 — Extraire les données du recherche-log

Ouvrir `recherche-log.md` et récupérer depuis le bloc de fin de la DERNIÈRE session :
- Resume from : [URL ou action]
- Vectors not yet explored : [liste]
- Search vector used : [dernier vecteur utilisé]
- Skip list : [TOUS les handles de TOUTES les sessions, pas juste la dernière]

### Étape 3 — Modifier l'instruction finale du prompt

Remplacer la ligne :
"COMMENCE par le vecteur #1 : recherche le hashtag #shopifystore, onglet Top. Go."

Par :
"REPRENDS la recherche. Resume from : [URL]. Vecteur en cours : [vecteur]. Vecteurs restants : [liste]. Skip list (déjà contactés) : [handles]. Go."

### Étape 4 — Coller dans Chrome et lancer
