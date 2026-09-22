# K3-03 — Five-Pilot Metadata Alignment

Status: CANDIDATE

## Purpose

Align canonical repository metadata with the already merged K3-01 and K3-02 evidence.

Before this change:

- `profiles/index.json` already contained `edge-mesh.json`;
- K3-01 had registered ORBI Edge Mesh as the fifth certified reference pilot;
- K3-02 had completed the five-pilot portability review;
- `README.md` still described only four pilots;
- `.orbi-kit-manifest.json` still listed ORBI Edge Mesh as the next recommended pilot.

## Rule preserved

This alignment does **not** rewrite release history.

`v0.2.0` remains the formally certified four-pilot baseline.

Edge Mesh is recorded as post-v0.2 five-pilot portability evidence leading toward the v0.3.0 certification candidate.

## Changes

- README now describes five materially different validated pilots.
- README explicitly distinguishes v0.2.0 certification from post-v0.2 K3 evidence.
- ORBI Edge Mesh is added to `sourcePilots`.
- manifest status records five-pilot post-v0.2 validation.
- `postV0_2Evidence` captures the exact Edge P8 evidence.
- development state advances from "Edge Mesh next pilot" to "five-pilot portability review complete".
- next step becomes v0.3.0 certification-candidate alignment.

## Shared-core decision

No universal shared skill is added.

The shared core remains:

1. `orbi-verification-loop`
2. `orbi-security-review`
3. `orbi-context-budget`
4. `orbi-agent-harness`

## Authority boundaries preserved

K3-03 does not enable or authorize:

- physical Android certification;
- trust-store mutation;
- pairing-secret lifecycle changes;
- LAN exposure changes;
- model transfer/delete;
- routing eligibility changes;
- distributed model execution;
- hooks;
- MCP;
- continuous learning;
- unified memory;
- autonomous loops;
- multi-agent runtime roles.

## Required exit gate

Before merge:

- final branch HEAD must pass ORBI Agent Kit CI;
- `npm run certify` must pass;
- AgentShield report-only must remain GREEN with no new finding class;
- no runtime/executable behavior changes may be present.
