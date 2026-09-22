# ORBI Agent Engineering Kit

Version: **0.2.0**  
Status: **v0.2.0 certified core + five-pilot post-v0.2 portability validated**

ORBI Agent Engineering Kit is a small ORBI-owned engineering layer validated across five materially different ORBI pilots:

- ORBI Creative Studio
- ORBI PVMetrics
- O.R.B.I.A. / L.U.M.I.A.
- ORBI News
- ORBI Edge Mesh

The formal v0.2.0 release remains the four-pilot certified baseline. K3-01/K3-02 extend the evidence base with ORBI Edge Mesh as a fifth certified portability pilot without changing the shared runtime surface or promoting Edge-specific authority into the universal core.

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
| ORBI News | factual verification, publication authority, production activation and channel autonomy boundaries |
| ORBI Edge Mesh | CI-vs-physical evidence separation, node identity/trust/capability boundaries, LAN/routing authority and protected context invariants |

## Five-pilot result

K3-01 registered ORBI Edge Mesh as the fifth certified reference profile. K3-02 completed the five-pilot portability review.

The shared core remains intentionally small:

- `orbi-verification-loop`
- `orbi-security-review`
- `orbi-context-budget`
- `orbi-agent-harness`

The fifth pilot strengthens reusable evidence-separation and protected-context principles, while keeping physical device, pairing, LAN, routing, model-transfer and distributed-execution authority project-owned.

See `docs/FIVE_PILOT_PORTABILITY_REVIEW.md`.

## Upstream pins

See `docs/UPSTREAM_PINS.md`.

Current reference baseline:

- ECC 2.2.2 — `91ba9b4cf6c47c8130829004f8bb64762a76ccbb`
- AgentShield 1.6.0 — `b0891303bdcd6037376a94263d45cfd2ff3dfb98`

## License

MIT
