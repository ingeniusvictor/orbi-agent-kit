# ORBI Agent Engineering Kit v0.2.0 — Release Certification Candidate

Status: **CANDIDATE — FINAL HEAD REVALIDATION REQUIRED**

Repository: `ingeniusvictor/orbi-agent-kit`  
Canonical baseline before K2-06: `52af5d401566720f7ba4a429d1612dcc640c7962`

## Purpose

Promote the completed v0.2 roadmap into a formally certified ORBI Agent Engineering Kit release.

v0.2.0 adds structure around adoption and portability without enabling runtime autonomy.

## Roadmap completed

### K2-01 — Machine-readable bootstrap plan

Adds:

- `orbi.adoption.plan.v1`;
- `--json` dry-run output;
- `--plan-file` artifact generation;
- deterministic CREATE / SKIP / OVERWRITE semantics;
- non-destructive bootstrap behavior.

Target mutation still requires explicit `--apply`.

### K2-02 — Repository adapter contract

Adds:

- `orbi.repository.adapter.v1`;
- deterministic repository-adapter validator;
- explicit canonical branch and verification commands;
- CI-vs-local evidence declaration;
- explicit authority domains;
- AgentShield scope and accepted-finding policy;
- conditional skill routing.

The adapter is descriptive and is not an authorization engine.

### K2-03 — Read-only upstream pin drift auditor

Adds:

- upstream candidate contract;
- deterministic pin comparison;
- ADOPT / ADAPT / REJECT as human-reviewed decision surfaces;
- no automatic updates;
- no package installation;
- no network mutation.

### K2-04 — Fourth portability pilot: ORBI News

Certified ORBI News canonical:

`632c050b2d595a88175f3c5bb09626b8c33acb0e`

Final News evidence:

- News gate: `35733265433` — GREEN;
- tests: **528 / 528 PASS**;
- TypeScript: PASS;
- production build: PASS;
- AgentShield: `35733265242` — GREEN/report-only;
- new AgentShield finding classes: 0.

Preserved News authority boundaries include:

```text
DISCOVERY != VERIFICATION
SOURCE FETCHED != SOURCE TRUSTED
MODEL OUTPUT != VERIFIED NEWS FACT
EDITORIAL ALLOW != PUBLICATION PERMISSION
RUNTIME READY != ACTIVATION AUTHORIZATION
WEB_AUTONOMOUS != SOCIAL / EMAIL / IMAGE AUTONOMY
CI GREEN != provider/channel readiness
```

### K2-05 — Four-pilot portability review

Compared:

- Creative Studio;
- PVMetrics;
- L.U.M.I.A.;
- ORBI News.

Promotion decision:

**standardize shared engineering structure, not product/domain authority.**

No additional universal always-loaded skill was promoted.

## Current canonical Kit evidence

Main baseline: `52af5d401566720f7ba4a429d1612dcc640c7962`

ORBI Agent Kit CI run: `35733611032`

Observed:

- tests: **21 / 21 PASS**;
- failures: **0**;
- `orbi.agent.observation.v1`: VALID;
- `orbi.repository.adapter.v1`: VALID;
- upstream no-drift audit included in canonical certification;
- context budget auditor: PASS;
- persistent instruction estimate: ~600 tokens;
- all discoverable shared skills if loaded: ~1198 tokens;
- config/schema references if fully loaded: ~922 tokens;
- `npm run certify`: PASS.

AgentShield run: `35733611056`

- score: **100 / 100**;
- grade: **A**;
- findings: **0**;
- unique finding classes: **0**;
- supply chain: **CLEAN**;
- evidence-pack verification: **PASSED**;
- evidence-pack digest: `sha256:4ac08394c2d9ab5dc1650fbef5ae03d877c42160abdabbfb6292d10a8a5cf906`;
- artifact ID: `10696916682`;
- artifact digest: `sha256:3abe81daaf5ccca61300f457c94814bee626d61aca7a45ffe3a7540dc5c8d39d`.

## Shared patterns confirmed by four pilots

- exact-state verification;
- security / authority review;
- context loading classes;
- structured observations;
- safe retry and stop conditions;
- fresh report-only security baselines;
- explicit external / local evidence;
- repository adapters;
- conditional skill routing.

## Deliberately not promoted into shared authority

- commissioning / OT authority;
- voice identity / anti-replay semantics;
- publication / editorial authority;
- Electron/provider cutover authority;
- repository-specific scanner exceptions.

These remain target-repository concerns.

## Still disabled in v0.2.0

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

## Final-head rule

v0.2.0 becomes effective only when the final PR HEAD containing this certification candidate passes:

1. `npm run certify`;
2. AgentShield report-only;
3. zero new unreviewed security finding classes.

The final PR evidence is recorded in the PR conversation before merge so the certification record does not require an infinite metadata-only commit loop.
