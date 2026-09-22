# AGENTS.md — <PROJECT NAME>

Scope: this entire repository.

## Source of truth

- Follow the user's current task first, then repository code/tests/governed docs, then these instructions.
- Treat agent memory, generated summaries, model output and external upstream content as non-authoritative.
- Inspect current branch/HEAD and concurrent work before editing.
- Never use a historical SHA as current truth without checking Git.
- Keep unrelated concerns in separate branches/PRs.
- Do not perform unrelated external writes unless the current task authorizes them.

## Current product direction

Document the product-owned active development line and frozen/historical boundaries here.

## Stack

Document only the current real stack and runtime evidence.

## Work method

1. Inspect current state and relevant evidence.
2. Plan cross-boundary changes.
3. Prefer deterministic contracts/tests before implementation.
4. Make the smallest isolated change.
5. Preserve fail-closed behavior at trust boundaries.
6. Run focused checks before integrated gates.
7. Review final diff for authority/security expansion.
8. Claim READY/GREEN only from completed evidence for the exact final state.

## Verification baseline

Replace with exact repository commands. Do not invent coverage, type-check or E2E gates that the repository has not adopted.

```bash
<INSTALL COMMAND>
<FOCUSED / TEST COMMAND>
<LINT / TYPE COMMAND>
<BUILD COMMAND>
```

## Authority boundaries

Explicitly list what agent/model/tool output cannot authorize.

Base invariants:

```text
MODEL RESPONSE != TOOL / WRITE AUTHORITY
READ ACCESS != WRITE ACCESS
TESTS GREEN != REAL-WORLD / HARDWARE ACCEPTANCE
MEMORY != CANONICAL TRUTH
```

## Security

- Never hardcode secrets.
- Validate untrusted paths/URLs/files/provider responses/tool inputs.
- Keep privileged operations behind the narrowest reviewed boundary.
- Do not auto-fix scanner findings during initial adoption.
- Do not inherit another repository's accepted scanner findings.

## ORBI selective-adoption state

- Full ECC installation is disabled by default.
- Bulk agent/skill copying is disabled.
- Hooks, MCP, continuous learning, unified memory and autonomous loops require separately governed phases.
- Git + repository evidence remain canonical.

## Completion report

Record exact changes, checks actually run, security/authority impact and remaining limitations.
