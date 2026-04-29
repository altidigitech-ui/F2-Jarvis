# Legacy Ouroboros Python (archivé 2026-04-29)

Ancienne implémentation Python du cycle Ouroboros, remplacée par la version
TypeScript dans backend/jarvis/src/lib/ouroboros-cycle.ts qui tourne dans le
worker BullMQ Railway (job récurrent toutes les 2h).

- consciousness.py : la boucle de conscience principale (lisait identity.md,
  scannait le repo, générait des proposals via Claude API Haiku)
- safety.py : guards et budget management

state.json reste actif et est géré par le code TS.

Conservé pour référence/restauration éventuelle.

ATTENTION : NE PAS toucher brain/ouroboros/state.json — il est encore utilisé
par le code TS (lu/écrit dans ouroboros-cycle.ts ligne 188 et 476).
