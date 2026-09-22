# AGENTS.md — ORBI Agent Engineering Kit

Scope: this entire repository.

## Source of truth

- Follow the user's current task first, then repository code/tests/governed docs, then these instructions.
- Git, deterministic tests, certification records and pinned upstream references are canonical.
- Agent memory, generated summaries and upstream defaults are non-authoritative.
- `main` is the canonical release branch. Use isolated branches/PRs for changes.
- Never treat a historical pilot SHA or upstream version as current without verification.

## Purpose

This repository is the ORBI-owned selective agent-engineering layer extracted from certified Creative Studio, PVMetrics and L.U.M.I.A. pilots.

It is not a full ECC mirror and must not become a product runtime dependency by accident.

## Invariants

```text
MODEL RESPONSE != TOOL / WRITE AUTHORITY
READ ACCESS != WRITE ACCESS
TOOL SUCCESS != PERMISSION FOR NEXT TOOL
TESTS GREEN != REAL-WORLD / HARDWARE ACCEPTANCE
SCANNER GREEN != PRODUCT SAFETY CERTIFICATION
MEMORY != CANONICAL TRUTH
```

Target repositories must extend these invariants with their own domain authority rules.

## Change method

1. Inspect current branch/HEAD and upstream pins.
2. Keep shared-core changes domain-neutral.
3. Put product-specific rules in evidence/reference profiles, not shared authority defaults.
4. Add or update deterministic tests for executable tooling.
5. Run `npm test`, `npm run validate:example`, `npm run context:budget`, and `npm run certify`.
6. Review AgentShield findings as evidence, never as automatic-fix authority.
7. Claim certification only for the exact final HEAD.

## Upstream policy

- ECC and AgentShield are reference/upstream dependencies, not ORBI authority sources.
- Pin reviewed commits.
- Do not float governed adoption on upstream `main`.
- Do not auto-propagate a scanner exception between repositories.
- Review upstream changes before changing a shared pin.

## Runtime/autonomy policy

Disabled by default in the shared core:

- hooks;
- MCP;
- continuous learning;
- unified memory;
- autonomous loops;
- multi-agent roles;
- privileged runtime writes.

Each requires a separately governed experiment and target-repository review.

## Security

- Never hardcode secrets.
- GitHub Actions must use least privilege and immutable reviewed SHAs.
- Bootstrap must remain dry-run by default and must not overwrite governed files without explicit force.
- Structured-observation validation is not an authorization engine.
- Shared templates must not silently grant product-specific authority.

## Completion report

Record exact files changed, tests/gates actually run, security/authority impact, upstream-pin impact and rollback.
