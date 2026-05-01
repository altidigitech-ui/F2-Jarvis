---
date: "2026-05-01"
timestamp: "2026-05-01T08:16:41.691Z"
auteur: Ouroboros
priorité: haute
statut: pending
---

**Priorité:** haute
**Type:** code-fix
**Titre:** Fix: détection plateforme binaire dans action-executor.ts — Instagram/TikTok/Facebook labellisés "Twitter"
**Contexte:** Dans `applySideEffects` → case `mark_published` (ligne 427), la détection de plateforme est strictement binaire : `title.toLowerCase().includes("linkedin") ? "LinkedIn" : "Twitter"`. Tout titre qui ne contient pas "linkedin" atterrit en "Twitter" — y compris Instagram, TikTok, Facebook.

Preuves dans `fabrice/progress-semaine.md` (30/04 12:33-12:34) :
- "Instagram — V1 StoreMD (Mer 29/04)" → plateforme **Twitter** ❌
- "TikTok — V1 StoreMD (Mer 29/04)" → plateforme **Twitter** ❌  
- "Instagram — V2 StoreMD (Jeu 30/04)" → plateforme **Twitter** ❌  
- "TikTok — V2 StoreMD (Jeu 30/04)" → plateforme **Twitter** ❌  
- "LinkedIn B — Why I'm doing..." → plateforme **LinkedIn** ✅ (logique correcte)

Impact immédiat : aujourd'hui V3 TikTok + Instagram + Facebook sera publié — et générera 3 nouvelles entrées mislabeled "Twitter" dans progress-semaine, corrompant un peu plus les analytics de la semaine.
**Recommandation:** Remplacer la détection binaire ligne 427 par une chaîne ternaire à 5 niveaux.
**Action:**
- Fichier: `backend/jarvis/src/lib/action-executor.ts`
- Modifier ligne 427 :
```typescript
// AVANT
const platform = title.toLowerCase().includes("linkedin") ? "LinkedIn" : "Twitter";

// APRÈS
const titleLower = title.toLowerCase();
const platform = titleLower.includes("linkedin") ? "LinkedIn"
  : titleLower.includes("instagram") ? "Instagram"
  : titleLower.includes("tiktok") ? "TikTok"
  : titleLower.includes("facebook") ? "Facebook"
  : "Twitter";
```
**Impact:** Zéro changement fonctionnel sur les posts Twitter/LinkedIn existants. Les prochaines publications Instagram/TikTok/Facebook seront correctement labellisées. Les entrées 30/04 déjà corrompues restent à corriger manuellement (couvert par le pending "Fix fabrice/progress-semaine.md").
**Risques si ignoré:** Chaque V3, V4 et future série TikTok/Instagram/Facebook ajoutera des entrées "Twitter" dans progress-semaine, rendant impossible toute analyse cross-canal (qui fonctionne le mieux — Twitter ou TikTok ?). Les analytics de plateforme deviennent structurellement faux.
