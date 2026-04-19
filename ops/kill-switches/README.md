# Kill-switches

> Fichiers flag qui arrêtent immédiatement un service F2-JARVIS.
> Tous les services checkent la présence du flag correspondant avant toute action.

## Liste des kill-switches

### `ouroboros.flag`
Arrête toute activité Ouroboros (consciousness loop, proposals, diary).

### `graphify.flag`
Désactive les re-indexations automatiques Graphify (post-commit hook).

### `mempalace.flag`
Désactive les saves automatiques MemPalace.

### `global.flag`
**Kill-switch global** : arrête TOUS les services F2-JARVIS automatiques. Seul Claude Code interactif reste actif.

## Comment activer un kill-switch

```bash
# Arrêter Ouroboros
touch ops/kill-switches/ouroboros.flag

# Arrêter tout
touch ops/kill-switches/global.flag
```

## Comment désactiver

```bash
# Remove the flag
rm ops/kill-switches/ouroboros.flag
```

## Quand les utiliser

### Budget dérive
Auto-activés par `f2-accountant` si seuils dépassés.

### Debugging
Avant de lancer un test qui ne doit pas être perturbé par Ouroboros ou Graphify background.

### Incident prod
Arrêt immédiat si comportement inattendu détecté.

### Maintenance
Pendant une mise à jour du repo structurant (migration schema MemPalace par ex.).

## Vérification système

```bash
# Lister les kill-switches actifs
ls ops/kill-switches/*.flag 2>/dev/null || echo "Aucun kill-switch actif"
```

## Intégration

Tous les scripts F2-JARVIS commencent par :

```python
KILL_SWITCH = REPO_ROOT / "ops" / "kill-switches" / "<service>.flag"
GLOBAL_KILL = REPO_ROOT / "ops" / "kill-switches" / "global.flag"

if KILL_SWITCH.exists() or GLOBAL_KILL.exists():
    print(f"[<service>] kill-switch active, exiting")
    sys.exit(0)
```

## Ne PAS committer les flags

`ops/kill-switches/*.flag` est dans `.gitignore`. Les flags sont des signaux runtime locaux, pas partagés.

Ce README.md lui-même est versionné, mais pas les flags eux-mêmes.

## Checklist post-activation

Après avoir activé un kill-switch :
1. Vérifier que le service est bien arrêté (logs)
2. Investiguer la cause
3. Fixer le problème
4. Désactiver le kill-switch (rm)
5. Vérifier que le service reprend normalement
6. Documenter dans `tracking/decisions-log.md` si l'incident mérite un DDR
