---
name: orbi-context-budget
description: Keep ORBI repository agent instructions small, layered and selectively loaded without removing required safety or authority guidance.
version: "0.1.0"
license: MIT
metadata:
  origin: ORBI
  authoritative: false
  runtime_dependency: false
---

# ORBI Context Budget

Classify instruction surfaces as:

- `always-instructions` — persistent repository invariants;
- `discoverable-skill` — task-triggered procedure;
- `config-reference` — structured state/config consulted when needed.

Only invariant guidance belongs in always-loaded instructions.

## Rules

- available skill != automatically loaded skill;
- move domain procedures into on-demand skills;
- keep canonical facts in Git/docs/config rather than agent memory;
- size flags are review triggers, not reasons to delete safety controls;
- measure revision-to-revision, not as a claim about exact model-token usage.
