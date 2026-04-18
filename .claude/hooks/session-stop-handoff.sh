#!/usr/bin/env bash
# F2-JARVIS — Stop hook
# À la fin de chaque session Claude Code, déclenche le skill handoff-writer
# pour régénérer HANDOFF.md

set -euo pipefail

echo "handoff: session ending, requesting HANDOFF.md update via handoff-writer skill"

# Flag pour que la prochaine session sache qu'il faut lire le HANDOFF
touch .claude/.handoff-pending

exit 0
