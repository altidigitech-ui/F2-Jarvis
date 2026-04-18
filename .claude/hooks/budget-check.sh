#!/usr/bin/env bash
# F2-JARVIS — Budget check hook
# Avant toute commande bash potentiellement coûteuse, vérifier qu'on n'a pas
# dépassé le budget quotidien/mensuel défini dans ops/budget/limits.yaml

set -euo pipefail

BUDGET_FILE="ops/budget/history.csv"
LIMITS_FILE="ops/budget/limits.yaml"

# Si pas encore de tracking, laisser passer
if [[ ! -f "$BUDGET_FILE" ]] || [[ ! -f "$LIMITS_FILE" ]]; then
  exit 0
fi

# Check kill-switch global
if [[ -f "ops/kill-switches/global.flag" ]]; then
  echo "budget-check: ❌ Global kill-switch active. Remove ops/kill-switches/global.flag to continue."
  exit 1
fi

# TODO: parser limits.yaml et history.csv pour vraie vérification
# Pour V1 on laisse passer. La discipline est dans les prompts et le plan Max 5x.

exit 0
