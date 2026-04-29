"""
Ouroboros — Consciousness loop (bridled version for F2-JARVIS).

Runs nightly via cron or Claude Code background agent.
STRICT: read-only on repo, write-only on brain/ouroboros/{proposals,diary,state}.

Budget: ~0.30€ per cycle max, using Haiku for cost efficiency.

Usage:
    python brain/ouroboros/consciousness.py --dry-run
    python brain/ouroboros/consciousness.py

Kill-switch:
    touch ops/kill-switches/ouroboros.flag
"""
from __future__ import annotations

import datetime as dt
import json
import os
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
OUROBOROS_DIR = REPO_ROOT / "brain" / "ouroboros"
PROPOSALS_DIR = OUROBOROS_DIR / "proposals"
DIARY_DIR = OUROBOROS_DIR / "diary"
STATE_DIR = OUROBOROS_DIR / "state"
KILL_SWITCH = REPO_ROOT / "ops" / "kill-switches" / "ouroboros.flag"
GLOBAL_KILL = REPO_ROOT / "ops" / "kill-switches" / "global.flag"
BUDGET_FILE = STATE_DIR / "budget.json"
LAST_CYCLE_FILE = STATE_DIR / "last-cycle.json"


def check_kill_switches() -> None:
    """Exit immediately if any kill-switch is active."""
    if KILL_SWITCH.exists():
        print(f"[ouroboros] KILL-SWITCH active: {KILL_SWITCH}")
        sys.exit(0)
    if GLOBAL_KILL.exists():
        print(f"[ouroboros] GLOBAL KILL-SWITCH active: {GLOBAL_KILL}")
        sys.exit(0)


def check_budget() -> None:
    """Exit if monthly budget for ouroboros is exhausted."""
    if not BUDGET_FILE.exists():
        return
    try:
        data = json.loads(BUDGET_FILE.read_text())
        spent_eur = data.get("month_to_date_eur", 0)
        cap_eur = data.get("cap_eur", 10)
        if spent_eur >= cap_eur:
            print(f"[ouroboros] BUDGET EXHAUSTED: {spent_eur}€ / {cap_eur}€")
            KILL_SWITCH.touch()
            sys.exit(0)
    except (json.JSONDecodeError, KeyError):
        print("[ouroboros] budget file malformed, aborting out of caution")
        sys.exit(1)


def gather_signals() -> dict:
    """Read-only scan of F2-JARVIS state."""
    today = dt.date.today()
    yesterday = today - dt.timedelta(days=1)
    since = yesterday.isoformat()

    # Git log since yesterday
    try:
        git_log = subprocess.check_output(
            ["git", "log", f"--since={since}", "--oneline", "--all"],
            cwd=REPO_ROOT, text=True, timeout=10
        )
    except (subprocess.SubprocessError, FileNotFoundError):
        git_log = ""

    # Submodules git log
    try:
        sub_log = subprocess.check_output(
            ["git", "submodule", "foreach", f"git log --since={since} --oneline"],
            cwd=REPO_ROOT, text=True, timeout=30
        )
    except (subprocess.SubprocessError, FileNotFoundError):
        sub_log = ""

    # Active proposals count
    active_proposals = []
    if PROPOSALS_DIR.exists():
        active_proposals = [p.name for p in PROPOSALS_DIR.glob("*.md") if p.name != "_template.md"]

    # Recent decisions
    decisions_dir = REPO_ROOT / "studio" / "decisions"
    recent_decisions = []
    if decisions_dir.exists():
        recent_decisions = sorted([
            d.name for d in decisions_dir.glob("*.md")
            if d.name != "template.md"
        ])[-5:]

    # Drafted posts
    drafts_dir = REPO_ROOT / "marketing" / "posts" / "draft"
    drafts = []
    if drafts_dir.exists():
        drafts = [p.name for p in drafts_dir.glob("*.md")]

    return {
        "date": today.isoformat(),
        "git_log": git_log.strip(),
        "submodule_log": sub_log.strip(),
        "active_proposals": active_proposals,
        "recent_decisions": recent_decisions,
        "drafts": drafts,
    }


def call_llm(system: str, user: str, model: str = "claude-haiku-4-5") -> str:
    """
    Call Anthropic API or via Claude Code subprocess.
    
    For F2-JARVIS V1, we default to background Claude Code invocation
    (included in Max 5x plan — no incremental cost).
    
    If CLAUDE_CODE_BACKGROUND_ENABLED env var is set, use it.
    Otherwise fall back to direct API call (requires ANTHROPIC_API_KEY
    and counts against extra usage budget).
    """
    if os.environ.get("CLAUDE_CODE_BACKGROUND_ENABLED"):
        # Invoke Claude Code as subagent (inherits Max 5x plan)
        # Implementation depends on Claude Code CLI flags available
        # Placeholder — to be wired with actual Claude Code agent invocation
        return _call_via_claude_code(system, user, model)
    else:
        return _call_anthropic_api(system, user, model)


def _call_via_claude_code(system: str, user: str, model: str) -> str:
    """Invoke via Claude Code background agent. Max 5x plan covers cost."""
    # This is a placeholder. The actual wiring uses Claude Code's
    # --agent flag or programmatic invocation.
    # For V1, log and return stub.
    print(f"[ouroboros] (stub) would call Claude Code agent with model={model}")
    return ""


def _call_anthropic_api(system: str, user: str, model: str) -> str:
    """Direct Anthropic API call. Counts against extra usage."""
    try:
        import anthropic
    except ImportError:
        print("[ouroboros] anthropic SDK not installed — skipping LLM call")
        return ""
    
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[ouroboros] ANTHROPIC_API_KEY not set — skipping LLM call")
        return ""

    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model=model,
        max_tokens=2000,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return response.content[0].text


def write_diary(signals: dict, analysis: str) -> Path:
    """Write today's diary entry. Atomic: tmp + rename."""
    DIARY_DIR.mkdir(parents=True, exist_ok=True)
    today = dt.date.today().isoformat()
    diary_path = DIARY_DIR / f"{today}.md"

    content = f"""# Diary — {today}

## Observations

### Git activity
```
{signals.get('git_log') or '(no commits since yesterday)'}
```

### Submodules activity
```
{signals.get('submodule_log') or '(no submodule commits)'}
```

### Active proposals
{chr(10).join('- ' + p for p in signals['active_proposals']) if signals['active_proposals'] else '(none)'}

### Recent decisions
{chr(10).join('- ' + d for d in signals['recent_decisions']) if signals['recent_decisions'] else '(none)'}

### Drafts in marketing/posts/draft
{chr(10).join('- ' + d for d in signals['drafts']) if signals['drafts'] else '(none)'}

## Analysis

{analysis or '(LLM call skipped or returned empty)'}

## Generated at
{dt.datetime.now().isoformat()}
"""
    tmp = diary_path.with_suffix(".tmp")
    tmp.write_text(content)
    tmp.rename(diary_path)
    return diary_path


def update_last_cycle() -> None:
    """Record this cycle's run in state/."""
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    LAST_CYCLE_FILE.write_text(json.dumps({
        "timestamp": dt.datetime.now().isoformat(),
        "status": "ok",
    }, indent=2))


def main() -> int:
    dry_run = "--dry-run" in sys.argv

    print(f"[ouroboros] starting cycle at {dt.datetime.now().isoformat()}")

    # Hard safety checks
    check_kill_switches()
    check_budget()

    # Gather (read-only)
    signals = gather_signals()

    if dry_run:
        print(f"[ouroboros] DRY-RUN signals: {json.dumps(signals, indent=2)}")
        return 0

    # Analyze (optional LLM call — skipped if no backend configured)
    system_prompt = (REPO_ROOT / "brain" / "ouroboros" / "identity.md").read_text()
    user_prompt = (
        f"F2-JARVIS signals for {signals['date']}:\n\n"
        f"{json.dumps(signals, indent=2)}\n\n"
        "Per your constitution: detect inconsistencies, risks, or opportunities. "
        "Propose 0-3 items following the standard template. "
        "If nothing significant, say so plainly — do not invent proposals to look busy."
    )
    analysis = call_llm(system_prompt, user_prompt, model="claude-haiku-4-5")

    # Write diary
    diary = write_diary(signals, analysis)
    print(f"[ouroboros] diary written: {diary}")

    # Update state
    update_last_cycle()

    print(f"[ouroboros] cycle complete")
    return 0


if __name__ == "__main__":
    sys.exit(main())
