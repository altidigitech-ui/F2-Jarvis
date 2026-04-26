#!/bin/bash
# apply-fixes.sh : Script de patch surgical pour le repo F2-Jarvis
# 
# USAGE depuis racine du repo F2-Jarvis :
#   bash apply-fixes.sh
#
# Ce script applique uniquement les changements de PATHS et le typo cycle_z step.
# Pour le contenu complet, utiliser les WAVES-FIXED.md générées.

set -euo pipefail

ROOT="brain/context-cognitif"

echo "=== F2-Jarvis Cognitive Fixes ==="
echo "Working in: $(pwd)"

# Validation préliminaire
if [ ! -d "$ROOT" ]; then
    echo "ERROR: $ROOT not found. Run from repo root."
    exit 1
fi

echo ""
echo "[1/4] Renommage fichiers (lowercase + cohérence)..."
[ -f "$ROOT/noyau/INSTINC.md" ] && \
    git mv "$ROOT/noyau/INSTINC.md" "$ROOT/noyau/instinct.md" && \
    echo "  ✓ INSTINC.md → instinct.md"

[ -f "$ROOT/constantes/FIBO.md" ] && \
    git mv "$ROOT/constantes/FIBO.md" "$ROOT/constantes/fibo.md" && \
    echo "  ✓ FIBO.md → fibo.md"

[ -f "$ROOT/constantes/PI.md" ] && \
    git mv "$ROOT/constantes/PI.md" "$ROOT/constantes/pi.md" && \
    echo "  ✓ PI.md → pi.md"

[ -f "$ROOT/constantes/Nikolatesla.md" ] && \
    git mv "$ROOT/constantes/Nikolatesla.md" "$ROOT/constantes/nikolatesla.md" && \
    echo "  ✓ Nikolatesla.md → nikolatesla.md"

[ -f "$ROOT/constantes/1.md" ] && \
    git mv "$ROOT/constantes/1.md" "$ROOT/constantes/un.md" && \
    echo "  ✓ 1.md → un.md"

[ -f "$ROOT/equation/non-resolu.md" ] && \
    git mv "$ROOT/equation/non-resolu.md" "$ROOT/equation/non_resolu.md" && \
    echo "  ✓ non-resolu.md → non_resolu.md"

echo ""
echo "[2/4] Fix typo cycle_z step dans complexe.md..."
if [ -f "$ROOT/emergence/complexe.md" ]; then
    sed -i 's|^cycle_z step:|cycle_step:|' "$ROOT/emergence/complexe.md"
    echo "  ✓ complexe.md cycle_step corrigé"
fi

echo ""
echo "[3/4] Fix references croisées (casse + concepts inexistants)..."
for f in $(find "$ROOT" -name "*.md"); do
    sed -i \
        -e 's|\[FIBO\]|[fibo]|g' \
        -e 's|\[PI\]|[pi]|g' \
        -e 's|\[Nikolatesla\]|[nikolatesla]|g' \
        -e 's|\[Nikolatesla,|[nikolatesla,|g' \
        -e 's|, Nikolatesla\]|, nikolatesla]|g' \
        -e 's|\[FIBO,|[fibo,|g' \
        -e 's|, FIBO\]|, fibo]|g' \
        -e 's|, FIBO,|, fibo,|g' \
        -e 's|\[PI,|[pi,|g' \
        -e 's|, PI\]|, pi]|g' \
        -e 's|, PI,|, pi,|g' \
        -e 's|\[1\]|[un]|g' \
        -e 's|, 1\]|, un]|g' \
        -e 's|\[1,|[un,|g' \
        "$f"
done
echo "  ✓ Casse harmonisée"

echo ""
echo "[4/4] ATTENTION : Le script bash ne peut PAS appliquer toutes les corrections."
echo "    Pour le contenu complet (em-dashes, profiles, cycles, orphelins, sémantique),"
echo "    utilisez les fichiers WAVES-FIXED.md livrés."
echo ""
echo "=== Patch script terminé ==="
echo ""
echo "ÉTAPES SUIVANTES :"
echo "  1. Vérifier git status"
echo "  2. Pour appliquer les fixes complets : remplacer les 77 fichiers cognitifs"
echo "     par les versions extraites de WAVES-FIXED.md"
echo "  3. Mettre à jour le skill cognitive-loader avec :"
echo "     - file-index-FIXED.md → .claude/skills/cognitive-loader/references/file-index.md"
echo "     - profiles-FIXED.md → .claude/skills/cognitive-loader/references/profiles.md"
echo "  4. Patcher ARCH.md (3 lignes — voir FIXES-APPLIED.md)"
echo "  5. Commit final"
