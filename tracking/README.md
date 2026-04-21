# tracking/ — Tracking hebdo & décisions Jarvis

**Rôle :** données opérationnelles Jarvis — dashboard hebdo, decisions-log, UTM, growth tracker.

---

## Contenu

- `dashboard-hebdo.md` — métriques hebdo consolidées (publications, cold, engagement, conversions)
- `decisions-log.md` — log des décisions prises via pattern Propose/Validate/Execute
- `utm/` — tracking UTM par produit / campagne
- `FoundryTwo-Growth-Tracker.xlsx` — tracking global

---

## Lecture / écriture

- Alimenté automatiquement par le backend Jarvis (via GitHub API, pattern Propose → Validate → Execute)
- Lu par `f2-accountant`, `f2-auditor`, et l'app web Jarvis
- **NE PAS MODIFIER MANUELLEMENT** les fichiers auto-alimentés

---

## Références

- Backend qui écrit : `backend/jarvis/src/lib/action-executor.ts`
- App web qui affiche : `ui/jarvis/components/PersonaLayout.tsx`

---

**Dernière mise à jour : 21 avril 2026**
