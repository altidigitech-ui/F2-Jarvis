#!/usr/bin/env bash
# F2-JARVIS — MemPalace save hook
# Sauvegarde périodique de la session courante dans MemPalace

set -euo pipefail

# Skip si MemPalace pas installé
if ! command -v mempalace &> /dev/null; then
  exit 0
fi

# Skip si kill-switch
if [[ -f "ops/kill-switches/mempalace.flag" ]] || [[ -f "ops/kill-switches/global.flag" ]]; then
  exit 0
fi

# Sauvegarde (silencieux, non-bloquant)
mempalace save --session-current 2>/dev/null || true

exit 0
