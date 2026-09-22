# ORBI Agent Engineering Kit v0.1.0 — Remote Certification Candidate

Status: **CANDIDATE — FINAL HEAD REVALIDATION REQUIRED**

Repository: `ingeniusvictor/orbi-agent-kit`  
Pull request: #1  
Initial complete-import HEAD: `6431c0605689a66ebd3aebf737b4faa78e9f0e6b`

## Purpose

Record the first GitHub-hosted evidence for ORBI Agent Engineering Kit v0.1.0 before promoting the manifest to remote-certified.

This document is deliberately a candidate record until the exact final certification HEAD passes both Kit CI and AgentShield.

## Initial remote CI evidence

ORBI Agent Kit CI run: `35682048867`

Observed on the complete imported kit:

- tests: **7 / 7 PASS**;
- failures: **0**;
- structured observation example: **VALID**;
- persistent instruction estimate: **~600 tokens**;
- all four discoverable shared skills if loaded: **~1198 tokens**;
- config/schema references if fully loaded: **~922 tokens**.

The loading model remains:

`always-instructions != discoverable-skills != config-reference`

Discoverable skills are not treated as permanently injected context.

## Initial AgentShield evidence

AgentShield run: `35682064759`

- score: **100 / 100**;
- grade: **A**;
- findings: **0**;
- unique finding classes: **0**;
- supply chain: **CLEAN**;
- evidence-pack verification: **PASSED**;
- evidence-pack digest: `sha256:b121c51055e8e034199631d654ecd5037d2eb3194c11342316897517834da137`;
- artifact ID: `10674363678`;
- artifact digest: `sha256:8d2361dd1ff6028bd2d379c7c7e307a1bda065b2d2ff43bcca227fd3fef3fef2`.

No accepted finding class is needed for the kit baseline.

## Supply-chain pins

- ECC 2.2.2: `91ba9b4cf6c47c8130829004f8bb64762a76ccbb`
- AgentShield 1.6.0: `b0891303bdcd6037376a94263d45cfd2ff3dfb98`
- actions/checkout 6.0.2: `de0fac2e4500dabe0009e67214ff5f5447ce83dd`
- actions/setup-node 6.0.0: `2028fbc5c25fe9cf00d9f06a71cc4710d4507903`
- actions/upload-artifact 7.0.1: `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a`

## Governance

The kit itself now follows the pattern it exports:

- root `AGENTS.md`;
- deterministic certification;
- SHA-pinned GitHub Actions;
- report-only AgentShield;
- fresh repository-specific security baseline;
- no inherited scanner exceptions;
- no automatic fixes;
- no runtime autonomy.

## Deliberately disabled

- full ECC installation;
- hooks;
- MCP;
- continuous learning;
- unified memory;
- autonomous loops;
- multi-agent roles;
- privileged runtime writes.

## Finalization rule

Promote to **REMOTE CERTIFIED** only after the final HEAD containing this record and the canonical `npm run certify` gate passes:

1. ORBI Agent Kit CI;
2. AgentShield report-only;
3. no new security finding class.

The final run IDs and final HEAD must then be recorded in this document and the kit manifest before merge.
