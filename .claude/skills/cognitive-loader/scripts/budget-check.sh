#!/bin/bash
# budget-check.sh : Vérifier le budget cognitif courant
#
# Lit brain/context-cognitif/.budget (2 lignes : tokens, fichiers)
# Affiche l'état + alerte si seuil dépassé.
#
# Limites :
#   - Profil normal : 5000 tokens, 5 fichiers
#   - Profil deep   : 8000 tokens, 8 fichiers
#
# Usage :
#   bash budget-check.sh           # mode normal
#   bash budget-check.sh deep      # mode deep

set -euo pipefail

BUDGET_FILE="brain/context-cognitif/.budget"
MODE="${1:-normal}"

# Limites selon mode
if [ "$MODE" = "deep" ]; then
    MAX_TOKENS=8000
    MAX_FILES=8
else
    MAX_TOKENS=5000
    MAX_FILES=5
fi

# Si .budget n'existe pas, l'initialiser
if [ ! -f "$BUDGET_FILE" ]; then
    printf "0\n0\n" > "$BUDGET_FILE"
    echo "🧠 Budget initialisé : 0/$MAX_TOKENS tokens, 0/$MAX_FILES fichiers"
    exit 0
fi

# Lire les 2 valeurs
TOKENS=$(sed -n '1p' "$BUDGET_FILE" | tr -d '[:space:]')
FILES=$(sed -n '2p' "$BUDGET_FILE" | tr -d '[:space:]')

# Validation : si valeurs vides ou non numériques, reset
if ! [[ "$TOKENS" =~ ^[0-9]+$ ]] || ! [[ "$FILES" =~ ^[0-9]+$ ]]; then
    echo "⚠ .budget corrompu, réinitialisation"
    printf "0\n0\n" > "$BUDGET_FILE"
    TOKENS=0
    FILES=0
fi

# Calculer pourcentage
PCT_TOKENS=$((TOKENS * 100 / MAX_TOKENS))
PCT_FILES=$((FILES * 100 / MAX_FILES))

# Status
if [ "$TOKENS" -ge "$MAX_TOKENS" ] || [ "$FILES" -ge "$MAX_FILES" ]; then
    STATUS="🔴 DÉPASSÉ"
elif [ "$PCT_TOKENS" -ge 80 ] || [ "$PCT_FILES" -ge 80 ]; then
    STATUS="🟡 PROCHE LIMITE"
else
    STATUS="🟢 OK"
fi

echo "🧠 BUDGET COGNITIF ($MODE)"
echo "  Tokens  : $TOKENS / $MAX_TOKENS ($PCT_TOKENS%)"
echo "  Fichiers: $FILES / $MAX_FILES ($PCT_FILES%)"
echo "  Status  : $STATUS"

# Exit code : 0 si OK, 1 si dépassé (pour scripts qui veulent fail-fast)
if [ "$STATUS" = "🔴 DÉPASSÉ" ]; then
    exit 1
fi
exit 0
