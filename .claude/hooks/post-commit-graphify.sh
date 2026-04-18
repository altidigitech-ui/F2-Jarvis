#!/usr/bin/env bash
# F2-JARVIS — PostToolUse hook
# Après chaque git commit, réindexer Graphify en mode incrémental
# (seulement les fichiers modifiés depuis le dernier index)

set -euo pipefail

# Skip si .graphify pas encore initialisé
if [[ ! -d ".gitnexus" ]] && [[ ! -d "graphify-out" ]]; then
  exit 0
fi

# Check kill-switch global
if [[ -f "ops/kill-switches/graphify.flag" ]] || [[ -f "ops/kill-switches/global.flag" ]]; then
  echo "graphify: kill-switch active, skipping re-index"
  exit 0
fi

# Re-index incrémental seulement (ne pas toucher aux embeddings)
echo "graphify: re-indexing after commit (incremental)..."
if command -v graphify &> /dev/null; then
  graphify analyze --update --skip-embeddings 2>/dev/null || echo "graphify: update failed (non-blocking)"
fi

exit 0
