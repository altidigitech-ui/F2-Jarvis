#!/usr/bin/env bash
# F2-JARVIS — PreToolUse hook
# Injecte le contexte du knowledge graph Graphify avant chaque Glob/Grep
# → Claude voit la structure avant de grep en aveugle

set -euo pipefail

GRAPH_REPORT="graphify-out/GRAPH_REPORT.md"
STALE_MARKER="graphify-out/.stale"

# Vérifier si le graph existe
if [[ ! -f "$GRAPH_REPORT" ]]; then
  echo "graphify: No knowledge graph yet. Run 'graphify analyze .' to build one."
  exit 0
fi

# Vérifier si l'index est stale
if [[ -f "$STALE_MARKER" ]]; then
  echo "graphify: ⚠️  Index is stale. Run 'graphify analyze --update' to refresh."
fi

# Signaler que le graph existe
echo "graphify: Knowledge graph exists. Read $GRAPH_REPORT for god nodes and community structure before searching raw files."

exit 0
