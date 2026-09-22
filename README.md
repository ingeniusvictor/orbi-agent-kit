# ORBI Agent Engineering Kit

Version: **0.1.0**  
Status: **bootstrap / selective-adoption core**

ORBI Agent Engineering Kit is a small ORBI-owned engineering layer extracted from three independently certified ECC pilots:

- ORBI Creative Studio
- ORBI PVMetrics
- O.R.B.I.A. / L.U.M.I.A.

It is intentionally **not** a full ECC distribution and does not make ECC a product runtime dependency.

## Design rule

```text
ECC reference
    -> ORBI adaptation
    -> repository evidence
    -> selective skill/tooling
    -> deterministic validation
    -> security review
    -> canonical merge
```

Not:

```text
copy every agent + skill -> trust upstream by default
```

## Core components

- generic repository verification skill
- security/authority review skill
- context-budget skill
- agent-harness skill
- structured observation schema + deterministic validator
- report-only AgentShield workflow template
- repository `AGENTS.md` template
- adoption manifest template
- safe bootstrap script for future ORBI repositories
- certified pilot profiles kept as evidence/reference

## Deliberately disabled by default

- hooks
- MCP
- continuous learning
- unified memory
- autonomous loops
- multi-agent roles
- privileged runtime writes
- product runtime dependency on agent skills

## Quick start

Validate the kit itself:

```bash
npm test
```

Preview adoption into another repository:

```bash
node scripts/bootstrap-project.mjs ../target-repo
```

Apply only after reviewing the dry run:

```bash
node scripts/bootstrap-project.mjs ../target-repo --apply
```

The bootstrap refuses to overwrite existing governed files by default. Use `--force` only in a separately reviewed change.


### Machine-readable adoption plan

Preview the same bootstrap as JSON:

```bash
node scripts/bootstrap-project.mjs ../target-repo --json
```

Or persist only the plan artifact for review:

```bash
node scripts/bootstrap-project.mjs ../target-repo --plan-file ./adoption-plan.json
```

Neither command mutates the target repository unless `--apply` is also explicitly supplied.

## Important

The shared core provides **engineering patterns**, not domain authority. Each target repository must define its own:

- canonical branch and verification gate;
- trust boundaries;
- secret/credential model;
- local vs CI evidence;
- runtime/operational authority;
- accepted AgentShield findings;
- domain-specific skills.

## Source pilots

| Pilot | Main lesson |
|---|---|
| Creative Studio | governed software/runtime certification, upstream intake and Electron/provider boundaries |
| PVMetrics | operational-data provenance, evidence, commissioning/OT authority separation |
| L.U.M.I.A. | voice identity, speaker verification, anti-replay, local runtime and tool/write authority |

## Upstream pins

See `docs/UPSTREAM_PINS.md`.

Current reference baseline:

- ECC 2.2.2 — `91ba9b4cf6c47c8130829004f8bb64762a76ccbb`
- AgentShield 1.6.0 — `b0891303bdcd6037376a94263d45cfd2ff3dfb98`

## License

MIT