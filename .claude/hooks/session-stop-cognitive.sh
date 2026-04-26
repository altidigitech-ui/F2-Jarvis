#!/bin/bash
# Hook Stop : sauvegarde l'état cognitif final à la fin de la session.
# Copie le fichier .budget dans .usage-logs/ avec timestamp.
# Reset le budget pour la prochaine session.
#
# Enregistré dans .claude/settings.json sous Stop.
# Se déclenche automatiquement quand la session Claude Code se termine.

BUDGET_FILE="brain/context-cognitif/.budget"
LOG_DIR="brain/context-cognitif/.usage-logs"
TIMESTAMP=$(date +%Y-%m-%d-%Hh%M)

# Créer le dossier de logs s'il n'existe pas
mkdir -p "$LOG_DIR"

# Sauvegarder l'état final s'il existe
if [ -f "$BUDGET_FILE" ]; then
    TOKENS=$(sed -n '1p' "$BUDGET_FILE" 2>/dev/null || echo "0")
    FILES=$(sed -n '2p' "$BUDGET_FILE" 2>/dev/null || echo "0")

    # Ne logger que si du budget a été consommé
    if [ "$TOKENS" != "0" ] || [ "$FILES" != "0" ]; then
        echo "timestamp: $TIMESTAMP" > "$LOG_DIR/session-end-$TIMESTAMP.log"
        echo "event: session-stop" >> "$LOG_DIR/session-end-$TIMESTAMP.log"
        echo "tokens_used: $TOKENS" >> "$LOG_DIR/session-end-$TIMESTAMP.log"
        echo "files_loaded: $FILES" >> "$LOG_DIR/session-end-$TIMESTAMP.log"
    fi
fi

# Reset le budget pour la prochaine session
echo "0" > "$BUDGET_FILE"
echo "0" >> "$BUDGET_FILE"
