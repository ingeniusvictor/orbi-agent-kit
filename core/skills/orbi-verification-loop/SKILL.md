---
name: orbi-verification-loop
description: Verify repository readiness before READY/GREEN/merge/handoff claims using exact project evidence and explicit real-world authority boundaries.
version: "0.1.0"
license: MIT
metadata:
  origin: ORBI
  authoritative: false
  runtime_dependency: false
---

# ORBI Verification Loop

Use before claiming a repository change is complete, READY, GREEN, certified or mergeable.

## Rules

1. Record exact branch/HEAD/base and changed files.
2. Classify the changed surfaces and trust boundaries.
3. Run the narrowest deterministic focused check first.
4. Run the repository's **real** integrated gate; never invent missing checks.
5. Separate CI evidence from hardware/site/runtime evidence.
6. Review final diff for permission, authority, secret, privacy or provenance expansion.
7. If HEAD moved after validation, rerun the required gate.

## Base invariants

```text
TESTS GREEN != REAL-WORLD / HARDWARE ACCEPTANCE
BUILD GREEN != OPERATIONAL AUTHORITY
MODEL RESPONSE != ACCEPTANCE EVIDENCE
```

Target repositories must extend these rules.

## Readiness states

- READY — all required evidence for the stated software scope is complete.
- PARTIALLY VERIFIED — software evidence is complete but required external/local evidence is pending.
- NOT READY — required checks fail, evidence is contradictory, or the final state was not verified.

Never use READY to imply an authority level that was not explicitly governed.
