# ORBI Agent Engineering Kit v0.1.0 — Remote Certification

Status: **REMOTE CERTIFIED — EFFECTIVE ONLY AFTER FINAL PR HEAD GATES ARE GREEN**

Repository: `ingeniusvictor/orbi-agent-kit`  
Pull request: #1  
Certification evidence HEAD: `1012f9d65ba4c151c20c734c9b5ad10881e009e2`

## Purpose

Certify ORBI Agent Engineering Kit v0.1.0 as the shared selective agent-engineering layer extracted from the independently governed Creative Studio, PVMetrics and L.U.M.I.A. pilots.

The kit distributes engineering patterns. It does not grant product/domain authority.

## Remote Kit CI evidence

ORBI Agent Kit CI run: `35682188158`

Canonical command:

```bash
npm run certify
```

Observed:

- tests: **7 / 7 PASS**;
- failures: **0**;
- structured observation example: **VALID**;
- context budget auditor: PASS;
- persistent instruction estimate: **~600 tokens**;
- all four discoverable shared skills if loaded: **~1198 tokens**;
- config/schema references if fully loaded: **~922 tokens**;
- final certification message: **PASS**.

Loading semantics remain:

`always-instructions != discoverable-skills != config-reference`

Discoverable skills are not permanent context merely because they exist.

## Remote AgentShield evidence

AgentShield run: `35682188134`

- score: **100 / 100**;
- grade: **A**;
- findings: **0**;
- unique finding classes: **0**;
- supply chain: **CLEAN**;
- evidence-pack verification: **PASSED**;
- evidence-pack digest: `sha256:aa92d36e89199e76f62311fef7c10671e33376bf63594f5d4b37063896356b28`;
- artifact ID: `10675074731`;
- artifact digest: `sha256:195e193935ac8b01b3101706c6926b0fcc00b170d0b493e47288cd98e4d04ad6`.

The kit requires **no accepted AgentShield finding class** at v0.1.0.

## Supply-chain pins

- ECC 2.2.2: `91ba9b4cf6c47c8130829004f8bb64762a76ccbb`
- AgentShield 1.6.0: `b0891303bdcd6037376a94263d45cfd2ff3dfb98`
- actions/checkout 6.0.2: `de0fac2e4500dabe0009e67214ff5f5447ce83dd`
- actions/setup-node 6.0.0: `2028fbc5c25fe9cf00d9f06a71cc4710d4507903`
- actions/upload-artifact 7.0.1: `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a`

## Governance

The kit itself follows the pattern it exports:

- root `AGENTS.md`;
- deterministic `npm run certify`;
- SHA-pinned GitHub Actions;
- report-only AgentShield;
- fresh repository-specific baseline;
- no inherited scanner exceptions;
- no automatic fixes;
- dry-run bootstrap by default;
- no runtime autonomy.

## Shared core

Certified shared components:

- `orbi-verification-loop`;
- `orbi-security-review`;
- `orbi-context-budget`;
- `orbi-agent-harness`;
- `orbi.agent.observation.v1`;
- deterministic observation validator;
- safe bootstrap;
- AgentShield report-only template;
- repository AGENTS template;
- evidence/reference profiles.

## Authority model

The shared core preserves:

```text
MODEL RESPONSE != TOOL / WRITE AUTHORITY
READ ACCESS != WRITE ACCESS
TOOL SUCCESS != PERMISSION FOR NEXT TOOL
TESTS GREEN != REAL-WORLD / HARDWARE ACCEPTANCE
SCANNER GREEN != PRODUCT SAFETY CERTIFICATION
MEMORY != CANONICAL TRUTH
```

Target repositories must extend—not weaken—these invariants.

## Deliberately disabled

- full ECC installation;
- hooks;
- MCP;
- continuous learning;
- unified memory;
- autonomous loops;
- multi-agent roles;
- privileged runtime writes.

## Final-HEAD rule

This certification becomes effective only if the PR head containing this exact certification metadata passes:

1. ORBI Agent Kit CI;
2. AgentShield report-only;
3. no new security finding class.

The final PR head and its final run IDs are recorded in the PR conversation before merge, so certification metadata itself does not create an infinite self-referential commit loop.

## Rollback

The kit is standalone and does not modify any source pilot automatically.

Target adoption remains dry-run by default and refuses to overwrite governed files unless explicitly forced.
