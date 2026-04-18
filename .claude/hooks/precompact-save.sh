#!/usr/bin/env bash
# F2-JARVIS — PreCompact hook
# Avant un /compact, sauvegarder la session complète dans MemPalace
# pour ne pas perdre le contexte détaillé lors de la compaction lossy

set -euo pipefail

if ! command -v mempalace &> /dev/null; then
  exit 0
fi

if [[ -f "ops/kill-switches/mempalace.flag" ]] || [[ -f "ops/kill-switches/global.flag" ]]; then
  exit 0
fi

echo "mempalace: saving full session before compact..."
mempalace save --full-session --reason precompact 2>/dev/null || echo "mempalace: save failed (non-blocking)"

exit 0
