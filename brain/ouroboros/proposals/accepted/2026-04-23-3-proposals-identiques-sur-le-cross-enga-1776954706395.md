---
date: "2026-04-23"
auteur: Ouroboros
priorité: faible
statut: pending
---

**Priorité:** faible
**Titre:** 3 proposals identiques sur le cross-engagement en queue — signal de déduplication nécessaire
**Contexte:** La queue `brain/ouroboros/proposals/pending/` contient 3 proposals du 23/04 ciblant toutes le même sujet (cross-engagement jeudi non fait) avec des angles légèrement différents mais une recommandation identique. Fichiers : `2026-04-23-fen-tre-cross-engagement-13h-couche-a----1776950076831.md`, `2026-04-23-cross-engagement-jeu-23-04-non-fait---po-1776950185959.md`, `2026-04-23-cross-engagement-jeudi-23-04-non-ex-cut--1776950107946.md`. Probablement générées lors de 3 cycles Ouroboros distincts dans la même journée, chacune ayant détecté le même signal sans voir que les autres étaient déjà en queue.
**Recommandation:** Pour Fabrice : archiver 2 des 3 proposals et garder la plus complète (la troisième, qui liste les replies B3/B4/B5 spécifiques). Pour Ouroboros : introduire une règle de détection de doublon — avant d'écrire une proposal, vérifier si un fichier pending du même jour traite déjà le même sujet (search sur titre/mots-clés dans `proposals/pending/`).
**Risques si ignoré:** La queue proposals devient bruitée. Fabrice doit lire 3 proposals pour comprendre qu'il s'agit d'une seule action. La crédibilité d'Ouroboros comme filtre signal/bruit diminue si il génère lui-même du bruit.
