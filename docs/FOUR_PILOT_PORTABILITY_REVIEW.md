# K2-05 — Four-Pilot Portability Review

Status: COMPLETE / FOURTH PILOT CERTIFIED

Reviewed pilots:

1. ORBI Creative Studio
2. ORBI PVMetrics
3. O.R.B.I.A. / L.U.M.I.A.
4. ORBI News

## Goal

Decide which patterns have enough cross-project evidence to remain in the shared ORBI Agent Engineering Kit and which must remain target-specific.

The review follows one rule:

**Repeated usefulness does not automatically make a rule universal.**

A component is promoted only when its structure generalizes without importing product/domain authority.

## Cross-pilot comparison

| Pattern | Creative Studio | PVMetrics | L.U.M.I.A. | ORBI News | Decision |
|---|---:|---:|---:|---:|---|
| exact branch/HEAD before READY | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| deterministic verification loop | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| security/authority review | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| context loading classes | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| structured agent observation | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| safe retry + stop condition | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| explicit authority-impact fields | ✅ | ✅ | ✅ | ✅ | SHARED STRUCTURE / DOMAIN FIELDS |
| fresh AgentShield baseline | ✅ | ✅ | ✅ | ✅ | SHARED PROCESS |
| no inherited scanner exception | ✅ | ✅ | ✅ | ✅ | SHARED PROCESS |
| CI vs external/local evidence | ✅ | ✅ | ✅ | ✅ | SHARED CORE PRINCIPLE |
| repository adapter | pattern implicit | pattern implicit | pattern implicit | ✅ explicit | SHARED CONTRACT, ADAPT PER REPO |
| full ECC install | ❌ | ❌ | ❌ | ❌ | EXCLUDED |
| hooks/MCP/memory/autonomy | ❌ | ❌ | ❌ | ❌ | DEFERRED |

## Confirmed shared core

The existing v0.1 shared skills remain valid:

- `orbi-verification-loop`
- `orbi-security-review`
- `orbi-context-budget`
- `orbi-agent-harness`

K2-01–K2-03 add valid shared engineering tools:

- machine-readable bootstrap plan;
- repository adapter contract;
- read-only upstream pin drift auditor.

No additional News-specific skill is promoted into the shared core.

## Newly confirmed shared principle: external evidence

All four pilots required evidence that CI cannot prove.

Examples:

### Creative Studio

- real local runtime/model readiness;
- governed certification/cutover authority.

### PVMetrics

- real plant/pilot evidence;
- OT/commissioning acceptance.

### L.U.M.I.A.

- enrolled speaker state;
- anti-replay/liveness;
- microphone/camera/local STT/TTS runtime.

### ORBI News

- Vercel secrets;
- Firestore production access;
- real provider reachability;
- publication-channel credentials/readiness.

Therefore the shared rule is:

`CI PASS != EXTERNAL / LOCAL / OPERATIONAL READINESS`

The exact external evidence remains project-specific and belongs in the repository adapter.

## Publication patterns: not promoted as universal core

ORBI News proved two valuable domain patterns:

- factual-verification review;
- publication-authority review.

These should **not** become always-shared core skills because Creative Studio, PVMetrics and L.U.M.I.A. do not share the same editorial/publication authority model.

They remain reusable patterns for future publishing/research/content systems.

## Authority-field design

The shared observation contract should continue allowing target-specific authority fields rather than standardizing one universal list.

Examples:

- Creative Studio: runtime certification/router/cutover.
- PVMetrics: OT/plant commands/commissioning/real-data status.
- L.U.M.I.A.: identity/tool/write/local-hardware authority.
- News: activation/autonomy/publication/canonical claims/secrets.

Decision:

**standardize explicitness, not domain semantics.**

## AgentShield finding review

Across the four product pilots, scanner findings were repository-specific evidence.

Creative Studio, PVMetrics, L.U.M.I.A. and News independently observed the npm integrity SHA512 false-positive detector class.

ORBI Agent Kit itself produced 0 findings.

Decision:

- retain fresh baseline per repository;
- do not place `NPM_INTEGRITY_SHA512` on a global ignore list;
- keep report-only initial adoption;
- require finding-class review before remediation.

## Context-budget review

All pilots converged on the same loading model:

1. persistent invariants;
2. discoverable/on-demand skills;
3. config/schema references loaded when needed.

Decision:

This model remains shared core.

Do not optimize by deleting authority/safety invariants.

## Repository-adapter review

K2-02's adapter contract is validated by News as the first explicit fourth-pilot use.

The adapter should remain descriptive:

- canonical branch;
- exact verification commands;
- external/local evidence;
- authority domains;
- AgentShield scope/baseline;
- skill routing;
- deferred capabilities.

It is not an authorization engine.

## What remains project-specific

### Creative Studio
- Electron/provider/runtime certification and upstream-intake authority.

### PVMetrics
- operational-data provenance and BESS/OT/commissioning authority.

### L.U.M.I.A.
- speaker identity, anti-replay, camera/mic privacy and tool/write authority.

### ORBI News
- factual verification, activation profiles, editorial/publication gates and channel readiness.

## v0.2 conclusion

The fourth pilot does **not** justify adding more always-shared skills.

Instead, it strengthens the architecture:

```text
shared engineering invariants
    + target repository adapter
    + target-specific skills
    + deterministic evidence
    + report-only security baseline
    + final certification
```

This is preferred over a larger universal agent pack.

## Next recommended pilot

ORBI Edge Mesh.

Reason: it introduces a materially different local Android/LAN/model/runtime/node trust surface and can test whether the adapter/harness model remains valid under distributed edge constraints.

Do not begin Edge Mesh adoption by copying News or L.U.M.I.A. authority fields. Perform a fresh A0 inventory and fresh AgentShield baseline.

## Fourth-pilot final evidence

ORBI News certification merged as:

`632c050b2d595a88175f3c5bb09626b8c33acb0e`

Final certification HEAD gates:

- News ECC PR Gate `35733265433`: PASS
- deterministic tests: 528 / 528 PASS
- TypeScript: PASS
- production build: PASS
- AgentShield `35733265242`: PASS/report-only
- no new finding class beyond the News-classified npm integrity SHA512 baseline

This closes K2-04 and provides the evidence basis for K2-05.
