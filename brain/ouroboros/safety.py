"""
Ouroboros — Safety checks (bridled mode).

Centralized safety primitives. Any write operation by Ouroboros MUST pass through here.
"""
from __future__ import annotations

from pathlib import Path
import os
import sys

REPO_ROOT = Path(__file__).parent.parent.parent
OUROBOROS_DIR = REPO_ROOT / "brain" / "ouroboros"

# Whitelist: ONLY these subdirectories of OUROBOROS_DIR are writable
ALLOWED_WRITE_PATHS = [
    OUROBOROS_DIR / "proposals",
    OUROBOROS_DIR / "diary",
    OUROBOROS_DIR / "state",
]

# Absolute deny: these patterns are never writable
DENIED_WRITE_PATTERNS = [
    # SaaS & infrastructure
    "saas/",        # never touch SaaS submodules
    ".claude/",     # config is Fabrice's
    ".git/",        # never touch git internals
    # Root-level docs
    "BIBLE.md",
    "CLAUDE.md",
    "README.md",
    "ARCH.md",
    "ANTI-IA.md",
    "VISUELS.md",
    "AUDIT.md",
    # Operational content (FoundryTwo) — humans only
    "strategie/",
    "produits/",
    "marketing/",
    "growth-marketing/",
    "distribution/",
    "f2/",
    "romain/",
    "fabrice/",
    "la-toile/",
    "asset-brand/",
    "tracking/",
    "archives/",
]


class SafetyViolation(Exception):
    """Raised when Ouroboros attempts an unauthorized action."""


def check_write_allowed(target_path: Path) -> None:
    """
    Verify target_path is within ALLOWED_WRITE_PATHS.
    Raises SafetyViolation if not.
    """
    try:
        target_abs = target_path.resolve()
    except (OSError, RuntimeError):
        raise SafetyViolation(f"cannot resolve path: {target_path}")

    # Check denied patterns first
    target_str = str(target_abs)
    for denied in DENIED_WRITE_PATTERNS:
        if denied in target_str:
            raise SafetyViolation(
                f"write denied: path matches DENIED pattern '{denied}': {target_path}"
            )

    # Check allowed whitelist
    for allowed in ALLOWED_WRITE_PATHS:
        try:
            target_abs.relative_to(allowed.resolve())
            return  # OK, inside an allowed directory
        except ValueError:
            continue

    raise SafetyViolation(
        f"write denied: path is not inside any ALLOWED_WRITE_PATH: {target_path}"
    )


def check_git_operations_denied(command: list[str]) -> None:
    """
    Block any git command that could modify state.
    Read-only git is allowed (log, status, diff, show).
    """
    if not command or command[0] != "git":
        return

    denied_git = {
        "add", "commit", "push", "pull", "fetch", "merge", "rebase",
        "reset", "checkout", "branch", "tag", "stash", "cherry-pick",
        "revert", "clean", "rm", "mv", "submodule",
    }
    if len(command) >= 2 and command[1] in denied_git:
        raise SafetyViolation(
            f"git command denied for Ouroboros: {' '.join(command)}"
        )


def check_api_write_denied(url: str, method: str = "GET") -> None:
    """Block any HTTP call that is not a GET."""
    if method.upper() != "GET":
        raise SafetyViolation(
            f"API write denied for Ouroboros: {method} {url}"
        )


def check_shell_safe(command: str) -> None:
    """
    Block dangerous shell commands entirely.
    Ouroboros shouldn't need shell in normal operation.
    """
    dangerous = [
        "rm ", "rm\t", "mkfs", "dd ", "> /", ":(){", "curl ", "wget ",
        "sudo", "chmod ", "chown ", "systemctl", "kill ",
    ]
    for pattern in dangerous:
        if pattern in command:
            raise SafetyViolation(
                f"shell command denied for Ouroboros: contains '{pattern}'"
            )


def safe_write(target: Path, content: str) -> None:
    """Write content to target, after safety check. Atomic write (tmp + rename)."""
    check_write_allowed(target)
    target.parent.mkdir(parents=True, exist_ok=True)
    tmp = target.with_suffix(target.suffix + ".tmp")
    tmp.write_text(content)
    tmp.rename(target)


if __name__ == "__main__":
    # Self-test
    print("Ouroboros safety self-test")
    tests = [
        (OUROBOROS_DIR / "proposals" / "test.md", True),
        (OUROBOROS_DIR / "diary" / "2026-04-17.md", True),
        (OUROBOROS_DIR / "state" / "last_run.json", True),
        (REPO_ROOT / "saas" / "storemd" / "hack.py", False),
        (REPO_ROOT / "BIBLE.md", False),
        (REPO_ROOT / "CLAUDE.md", False),
        (REPO_ROOT / ".claude" / "settings.json", False),
        (REPO_ROOT / "strategie" / "CONTEXT.md", False),
        (REPO_ROOT / "produits" / "STATUS.md", False),
        (REPO_ROOT / "f2" / "context.md", False),
        (REPO_ROOT / "romain" / "plan-30-jours.md", False),
        (REPO_ROOT / "fabrice" / "plan-30-jours.md", False),
        (REPO_ROOT / "tracking" / "decisions-log.md", False),
        (REPO_ROOT / "marketing" / "context.md", False),
    ]
    for path, should_pass in tests:
        try:
            check_write_allowed(path)
            result = "ALLOWED"
        except SafetyViolation:
            result = "DENIED"
        ok = ("ALLOWED" == result) == should_pass
        status = "✅" if ok else "❌"
        print(f"{status} {path} -> {result} (expected: {'ALLOWED' if should_pass else 'DENIED'})")
