# Graph Report - /workspaces/F2-Jarvis  (2026-04-18)

## Corpus Check
- 23 files · ~22,416 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 71 nodes · 61 edges · 24 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `SafetyViolation` - 7 edges
2. `main()` - 7 edges
3. `call_llm()` - 5 edges
4. `check_write_allowed()` - 4 edges
5. `check_git_operations_denied()` - 3 edges
6. `check_api_write_denied()` - 3 edges
7. `check_shell_safe()` - 3 edges
8. `safe_write()` - 3 edges
9. `check_kill_switches()` - 3 edges
10. `check_budget()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `call_llm()`  [EXTRACTED]
  /workspaces/F2-Jarvis/brain/ouroboros/consciousness.py → /workspaces/F2-Jarvis/brain/ouroboros/consciousness.py  _Bridges community 2 → community 1_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (14): Exception, check_api_write_denied(), check_git_operations_denied(), check_shell_safe(), check_write_allowed(), Ouroboros — Safety checks (bridled mode).  Centralized safety primitives. Any wr, Write content to target, after safety check. Atomic write (tmp + rename)., Raised when Ouroboros attempts an unauthorized action. (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.22
Nodes (12): check_budget(), check_kill_switches(), gather_signals(), main(), Ouroboros — Consciousness loop (bridled version for F2-JARVIS).  Runs nightly vi, Write today's diary entry. Atomic: tmp + rename., Record this cycle's run in state/., Exit immediately if any kill-switch is active. (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (6): _call_anthropic_api(), call_llm(), _call_via_claude_code(), Call Anthropic API or via Claude Code subprocess.          For F2-JARVIS V1, we, Invoke via Claude Code background agent. Max 5x plan covers cost., Direct Anthropic API call. Counts against extra usage.

### Community 3 - "Community 3"
Cohesion: 0.4
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 0.5
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **16 isolated node(s):** `Ouroboros — Safety checks (bridled mode).  Centralized safety primitives. Any wr`, `Raised when Ouroboros attempts an unauthorized action.`, `Verify target_path is within ALLOWED_WRITE_PATHS.     Raises SafetyViolation if`, `Block any git command that could modify state.     Read-only git is allowed (log`, `Block any HTTP call that is not a GET.` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 7`** (2 nodes): `zones.ts`, `findRegionById()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `GraphPage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (2 nodes): `MorningPage()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `App.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `store.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `DropZone.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `Region.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `Brain.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `SidePanel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `next.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `call_llm()` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `Ouroboros — Safety checks (bridled mode).  Centralized safety primitives. Any wr`, `Raised when Ouroboros attempts an unauthorized action.`, `Verify target_path is within ALLOWED_WRITE_PATHS.     Raises SafetyViolation if` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._