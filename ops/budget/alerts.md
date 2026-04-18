# Budget Alerts

## Seuils

- **Quotidien** : 2€ → alert Telegram (informatif)
- **Hebdomadaire** : 10€ → alert Telegram (à surveiller)
- **Mensuel 80%** : 24€ → alert + kill-switch ouroboros
- **Mensuel 100%** : 30€ → alert + kill-switch global

## Canaux d'alerte

- **Telegram** : bot F2 → chat Fabrice
- Config dans `.claude/settings.local.json` :
  ```json
  {
    "tokens": {
      "TELEGRAM_BOT_TOKEN": "...",
      "TELEGRAM_CHAT_ID": "..."
    }
  }
  ```

## Format des alerts

```
🚨 F2-JARVIS Budget Alert

Niveau : <daily/weekly/monthly>
Seuil : <eur>
Dépensé actuellement : <eur>
Service principal : <service>

Action auto prise : <kill-switch / nothing>

Voir détails : /budget
```

## Responses attendues Fabrice

### Alert quotidienne
- Ignorer si dans les clous (< seuil mensuel projeté)
- Sinon : `/budget --today` pour détail

### Alert hebdomadaire
- Check le service qui coûte → si Ouroboros, check proposals générées valent la dépense
- Si dérive : considérer désactiver temporairement un service

### Alert mensuelle 80%
- Kill-switch ouroboros déjà activé automatiquement
- Décider si on continue les autres services ou on throttle

### Alert mensuelle 100%
- Kill-switch global activé
- Tout s'arrête jusqu'à décision manuelle de Fabrice
- Retirer les flags manuellement pour reprendre

## Historique alerts

Logger dans `ops/budget/alerts-history.log` (une ligne par alert avec timestamp).
