# TEMPLATE REPRISE — LinkedIn (Chrome)

> Prompt source : `prompt-recherche.md` (même dossier)
> Données source : `recherche-log.md` (même dossier)

---

## PROCÉDURE DE REPRISE

### Étape 1 — Vérifier le Commercial Use Limit

Vérifier dans `recherche-log.md` l'estimé restant. Si proche de la limite → utiliser Google X-Ray en alternative.

### Étape 2 — Copier le prompt original

Copier l'intégralité du prompt depuis `prompt-recherche.md`.

### Étape 3 — Extraire les données du recherche-log

Ouvrir `recherche-log.md` et récupérer depuis le bloc de fin de la DERNIÈRE session :
- Resume from, Queries not yet explored, Search query used, Skip list

### Étape 4 — Modifier l'instruction finale du prompt

Remplacer la ligne de démarrage par :
"REPRENDS la recherche. Resume from : [URL]. Query en cours : [requête]. Queries restantes : [liste]. Skip list (déjà contactés) : [noms]. Go."

### Étape 5 — Coller dans Chrome et lancer
