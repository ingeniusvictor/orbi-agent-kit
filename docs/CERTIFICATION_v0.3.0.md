# ORBI Agent Engineering Kit v0.3.0 — Release Certification Candidate

Status: **CANDIDATE — EFFECTIVE ONLY AFTER FINAL PR HEAD GATES ARE GREEN**

Repository: `ingeniusvictor/orbi-agent-kit`

Canonical baseline before K3-04:

`e12e27f4eb30482c2699720c65bc8a908cc2edb5`

## Purpose

Promote the completed five-pilot portability cycle into ORBI Agent Engineering Kit v0.3.0.

This release is a governance and portability consolidation release.

It does **not** introduce a larger universal agent pack, runtime autonomy, new product authority, or a full ECC dependency.

## Roadmap completed

### K3-01 — Fifth certified reference pilot

ORBI Edge Mesh was added as the fifth certified Agent Kit reference profile.

Certified Edge evidence:

- repository: `ingeniusvictor/orbi-edge-mesh`;
- certification phase: `EDGE-ECC-P8`;
- final certification HEAD: `b433197414988f1d153c471e9d4353baf8e507e7`;
- certified merge: `7c8f564bf76bf9799914505f6c69568f46358abc`;
- Phase 0: `35758116180` — PASS;
- integrated Edge ECC gate: `35758116302` — PASS;
- Python: **90 / 90 PASS**;
- Android unit tests: PASS;
- optimized release APK: PASS;
- native arm64 verification: PASS;
- AgentShield: `35758116161` — **100/A, 0 findings, CLEAN**.

### K3-02 — Five-pilot portability review

Compared:

1. ORBI Creative Studio
2. ORBI PVMetrics
3. O.R.B.I.A. / L.U.M.I.A.
4. ORBI News
5. ORBI Edge Mesh

Conclusion:

**do not expand the universal core merely because another pilot exists.**

The same four shared skills remain sufficient:

- `orbi-verification-loop`;
- `orbi-security-review`;
- `orbi-context-budget`;
- `orbi-agent-harness`.

### K3-03 — Canonical metadata alignment

Aligned the README and manifest with the already certified fifth-pilot evidence while preserving release history:

- v0.2.0 remains the four-pilot certified baseline;
- Edge Mesh is recorded as post-v0.2 evidence;
- no retrospective rewriting of v0.2.0;
- no runtime behavior changes.

K3-03 final evidence:

- final HEAD: `cf0aeda5ea703fc5e3a93e04b41337034e4bc82a`;
- Kit CI: `35761589892` — SUCCESS;
- tests: **21 / 21 PASS**;
- certification: PASS;
- upstream drift: NO_DRIFT;
- AgentShield: `35761589928` — **100/A, 0 findings, CLEAN**;
- evidence pack: `sha256:177f1c55c237106eef348ffa77661a4a369a124e3631c1956a24536c8db7f429`.

## Shared principles promoted in v0.3.0

### 1. Evidence separation

```text
CI PASS != EXTERNAL / LOCAL / OPERATIONAL / PHYSICAL CERTIFICATION
```

Every target repository must state what each gate proves and what it does not prove.

### 2. Identity, trust and capability separation

For systems that need these concepts:

```text
IDENTITY != TRUST
DISCOVERED != ADMITTED
CAPABILITY ADVERTISED != CAPABILITY VERIFIED
MODEL PRESENT != MODEL LOADED
MODEL LOADED != INFERENCE VERIFIED
```

The pattern is reusable; the exact authority remains target-owned.

### 3. Protected context optimization

Context-budget optimization may move detailed procedures into conditional skills, but must not erase persistent safety, security or authority invariants.

### 4. Target-owned authority

The shared Kit remains an engineering layer rather than an authorization engine.

Target repositories continue to own:

- operational approval;
- physical readiness;
- credential/secrets authority;
- trust admission;
- runtime cutover;
- publication;
- commissioning;
- model placement/transfer;
- routing eligibility;
- distributed-execution claims.

## Still disabled in v0.3.0

- full ECC installation;
- hooks;
- MCP;
- continuous learning;
- unified memory;
- autonomous loops;
- multi-agent runtime roles;
- automatic security fixes;
- automatic upstream pin updates;
- privileged runtime writes.

## Upstream baseline

Unchanged:

- ECC 2.2.2 — `91ba9b4cf6c47c8130829004f8bb64762a76ccbb`;
- AgentShield 1.6.0 — `b0891303bdcd6037376a94263d45cfd2ff3dfb98`.

No upstream update is being smuggled into the release certification.

## Final-head rule

v0.3.0 becomes effective only when the final PR HEAD containing this certification candidate passes:

1. `npm run certify`;
2. all 21 deterministic tests;
3. observation validator;
4. repository adapter validator;
5. upstream no-drift audit;
6. context-budget gate;
7. AgentShield report-only;
8. zero new unreviewed security finding classes.

The final PR evidence is recorded in the PR conversation before merge to avoid an infinite metadata-only certification loop.
