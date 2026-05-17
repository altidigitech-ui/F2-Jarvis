# Twitter — Template de collecte Analytics

> **Usage :** outil de collecte hebdomadaire. Copier-coller le bloc "SQUELETTE SEMAINE" ci-dessous en haut de `storemd.md`, `romain.md` ou `fabrice.md` (un seul template commun aux 3 fichiers) à chaque samedi.
> **Source unique :** Twitter Analytics → exports CSV (3 fichiers : account overview, content, video overview).
> **Format date :** JJ/MM/AAAA strict, partout.

---

## MODE D'EMPLOI

1. **Quand :** chaque **samedi**, avant le batch de la semaine suivante.
2. **Où :** ouvrir Twitter Analytics du compte concerné (`StoreMd_off`, `delgado_ro72224`, `FabGangi`), section Analytics → exporter les 3 CSV pour la période 7 derniers jours :
   - `account_overview_analytics_[date].csv` → métriques globales jour par jour
   - `account_analytics_content_YYYY-MM-DD_YYYY-MM-DD.csv` → détail par post
   - `video_overview_analytics.csv` → métriques vidéo jour par jour + liste des vidéos uploaded
3. **Comment :**
   - Décompresser/ouvrir les 3 CSV et reporter les données dans le squelette ci-dessous.
   - **Dater le snapshot** au format `JJ/MM/AAAA`.
   - **Convention période Twitter :** telle qu'apparaît dans le nom de fichier CSV (typiquement lundi → dimanche).
   - Indiquer la plage de la semaine au format `du JJ/MM/AAAA au JJ/MM/AAAA`.
   - Coller le bloc rempli en haut du fichier du compte concerné, sous le titre principal.
4. **Règles :**
   - **Aucune invention.** Si un chiffre est absent ou illisible, écrire `—` (tiret cadratin), pas `0`.
   - **Libellés strictement identiques aux CSV Twitter** (anglais, casse exacte : "Impressions", "Likes", "Engagements", "Watch Time (ms)", "Completion Rate", etc.).
   - **Ne pas modifier les semaines précédentes.** Chaque snapshot est figé à sa date.
   - Standardiser les dates en `JJ/MM/AAAA` (l'export Twitter affiche `Mon, May 11, 2026`).
   - Pour la section "Videos uploaded this week" : ne reporter que les vidéos uploadées dans la plage de la semaine. Les vidéos uploadées les semaines précédentes ne sont pas re-reportées (elles sont déjà dans les snapshots précédents).

---

## SQUELETTE SEMAINE — À COPIER-COLLER

```markdown
## Semaine [N] — du JJ/MM/AAAA au JJ/MM/AAAA

*Snapshot pris le JJ/MM/AAAA.*

**Account Overview (jour par jour) :**

| Date | Impressions | Likes | Engagements | Bookmarks | Shares | New follows | Unfollows | Replies | Reposts | Profile visits | Create Post | Video views | Media views |
|------|-------------|-------|-------------|-----------|--------|-------------|-----------|---------|---------|----------------|-------------|-------------|-------------|
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |
| **Total** | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |

**Content (posts publiés cette semaine) :**

| Post id | Date | Post text (extrait) | Post Link | Impressions | Likes | Engagements | Bookmarks | Shares | New follows | Replies | Reposts | Profile visits | Detail Expands | URL Clicks | Hashtag Clicks | Permalink Clicks |
|---------|------|---------------------|-----------|-------------|-------|-------------|-----------|--------|-------------|---------|---------|----------------|----------------|------------|----------------|------------------|
| [ID] | JJ/MM/AAAA | [TEXTE] | [URL] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] | [V] |

**Video overview (jour par jour) :**

| Date | Views | Watch Time (ms) | Completion Rate | Average Watch Time (ms) | Estimated Revenue |
|------|-------|-----------------|-----------------|-------------------------|-------------------|
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| JJ/MM/AAAA | [V] | [V] | [V] | [V] | [V] |
| **Total** | [V] | [V] | [V moyenne] | [V moyenne] | [V] |

**Videos uploaded this week :**

| Uploaded on | Video ID | Video title | Views | Duration | Video Link |
|-------------|----------|-------------|-------|----------|------------|
| JJ/MM/AAAA | [ID] | [TITRE] | [V] | [DURÉE] | [URL] |

---
```

---

## CHECKLIST FINALE AVANT VALIDATION

- [ ] Numéro de semaine renseigné (`Semaine N`)
- [ ] Plage de dates correcte au format `JJ/MM/AAAA` (telle que figée dans l'export CSV)
- [ ] Snapshot daté au format `JJ/MM/AAAA`
- [ ] Tous les chiffres copiés depuis les CSV, aucun inventé
- [ ] Chiffres manquants remplacés par `—` (jamais `0` par défaut)
- [ ] Libellés strictement identiques aux CSV Twitter (anglais, casse exacte)
- [ ] Dates standardisées en `JJ/MM/AAAA` (pas `Mon, May 11, 2026`)
- [ ] Section "Videos uploaded this week" : uniquement vidéos uploadées dans la plage S
- [ ] Bloc collé en haut du fichier du compte concerné, sous le titre principal

---

*Template commun aux 3 comptes Twitter : StoreMD (`storemd.md`), R (`romain.md`), F (`fabrice.md`). Si Twitter change ses libellés ou ajoute des colonnes, ce template doit être mis à jour en conséquence avant la prochaine collecte.*
