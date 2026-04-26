#!/bin/bash
# Hook PreCompact : sauvegarde l'état cognitif avant compaction du contexte.
# Copie le fichier .budget dans .usage-logs/ avec timestamp.
# Reset le budget pour la suite de la session (post-compaction).
#
# Enregistré dans .claude/settings.json sous PreCompact.
# Se déclenche automatiquement quand Claude Code compacte le contexte.

BUDGET_FILE="brain/context-cognitif/.budget"
LOG_DIR="brain/context-cognitif/.usage-logs"
TIMESTAMP=$(date +%Y-%m-%d-%Hh%M)

# Créer le dossier de logs s'il n'existe pas
mkdir -p "$LOG_DIR"

# Sauvegarder l'état actuel s'il existe
if [ -f "$BUDGET_FILE" ]; then
    TOKENS=$(sed -n '1p' "$BUDGET_FILE" 2>/dev/null || echo "0")
    FILES=$(sed -n '2p' "$BUDGET_FILE" 2>/dev/null || echo "0")

    # Ne logger que si du budget a été consommé
    if [ "$TOKENS" != "0" ] || [ "$FILES" != "0" ]; then
        echo "timestamp: $TIMESTAMP" > "$LOG_DIR/precompact-$TIMESTAMP.log"
        echo "event: precompact" >> "$LOG_DIR/precompact-$TIMESTAMP.log"
        echo "tokens_used: $TOKENS" >> "$LOG_DIR/precompact-$TIMESTAMP.log"
        echo "files_loaded: $FILES" >> "$LOG_DIR/precompact-$TIMESTAMP.log"
    fi
fi

# Reset le budget pour la session post-compaction
echo "0" > "$BUDGET_FILE"
echo "0" >> "$BUDGET_FILE"
