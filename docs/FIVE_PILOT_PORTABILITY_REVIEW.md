# K3-02 — Five-Pilot Portability Review

Status: COMPLETE CANDIDATE / FIFTH PILOT CERTIFIED

Reviewed pilots:

1. ORBI Creative Studio
2. ORBI PVMetrics
3. O.R.B.I.A. / L.U.M.I.A.
4. ORBI News
5. ORBI Edge Mesh

## Goal

Use the fifth certified pilot to decide whether the Agent Kit shared core should expand.

The governing rule remains:

**standardize engineering structure, not product/domain authority.**

## Cross-pilot comparison

| Pattern | Creative Studio | PVMetrics | L.U.M.I.A. | ORBI News | Edge Mesh | Decision |
|---|---:|---:|---:|---:|---:|---|
| exact branch/HEAD before READY | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| deterministic verification loop | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| security/authority review | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| context loading classes | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| structured observation | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| safe retry + stop condition | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE |
| explicit authority-impact fields | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED STRUCTURE / DOMAIN FIELDS |
| fresh AgentShield baseline | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED PROCESS |
| CI vs external/local/physical evidence | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED CORE PRINCIPLE |
| repository adapter | implicit | implicit | implicit | ✅ explicit | ✅ explicit | SHARED CONTRACT / ADAPT VALUES |
| conditional project skills | ✅ | ✅ | ✅ | ✅ | ✅ | SHARED LOADING MODEL |
| identity != trust/capability | runtime/provider specific | asset/evidence specific | speaker/tool specific | source/publication specific | explicit node model | REUSABLE PATTERN, NOT UNIVERSAL DOMAIN |
| physical-device certification | limited | OT/plant | local hardware | no | explicit | TARGET-SPECIFIC |
| product/domain authority semantics | runtime/cutover | OT/commissioning | identity/tools | publication/activation | physical/trust/routing | NOT SHARED |
| scanner accepted findings | repo-specific | repo-specific | repo-specific | repo-specific | none | REPO-SPECIFIC |
| hooks/MCP/memory/autonomy | disabled | disabled | disabled | disabled | disabled | DEFERRED |

## Fifth-pilot result

Edge Mesh validates the existing architecture under a materially different environment:

- Android/Kotlin/C++ JNI;
- local model runtime;
- physical device evidence;
- LAN authentication and trust;
- thermal/power policy;
- node discovery/admission/routing;
- model-placement research.

The fifth pilot does **not** justify another universal always-loaded skill.

Instead it strengthens three shared principles.

### 1. CI must declare what it does not prove

The four-pilot rule:

`CI PASS != EXTERNAL / LOCAL / OPERATIONAL READINESS`

is strengthened for hardware systems:

`CI PASS != PHYSICAL DEVICE / RUNTIME CERTIFICATION`

The exact evidence remains target-owned in the repository adapter.

### 2. Evidence levels must not collapse

Edge Mesh makes the following distinctions explicit:

```text
IDENTITY != TRUST
DISCOVERED != ADMITTED
CAPABILITY ADVERTISED != CAPABILITY VERIFIED
MODEL PRESENT != MODEL LOADED
MODEL LOADED != INFERENCE VERIFIED
SIGNED REQUEST != ENCRYPTED TRANSPORT
PLACEMENT PLAN != MODEL TRANSFER
WHOLE-WORKLOAD ROUTING != DISTRIBUTED MODEL EXECUTION
```

These are reusable review patterns for node/device systems, but not universal authority fields for every ORBI repository.

### 3. Context optimization must protect invariants

Edge P7 demonstrated a fail-closed context-budget auditor that keeps detailed procedures conditional while checking that permanent physical/security boundaries remain in root instructions.

The shared principle is promoted:

**context-budget optimization may move procedures, but must not erase safety/authority invariants.**

No Edge-specific auditor is copied into the shared core.

## Confirmed shared core

The four shared skills remain sufficient:

- `orbi-verification-loop`
- `orbi-security-review`
- `orbi-context-budget`
- `orbi-agent-harness`

Shared tools remain:

- machine-readable bootstrap plan;
- repository adapter contract;
- read-only upstream pin drift auditor;
- structured observation schema + validator;
- deterministic certification;
- report-only security workflow template.

## Edge-specific patterns not promoted

The following remain project-owned:

- physical N-stage semantics;
- pairing secret lifecycle;
- trusted-LAN/public exposure;
- Android resource-policy semantics;
- node admission/routing authority;
- model placement/transfer;
- distributed-execution claims;
- exact Android/Gradle/native gates.

## AgentShield result

Edge Mesh produced a fresh independent baseline and final certification scan:

- score: 100 / 100;
- grade: A;
- findings: 0;
- unique finding classes: 0;
- supply chain: CLEAN.

Decision remains unchanged:

- fresh baseline per repository;
- report-only initial adoption;
- no global inherited exceptions;
- finding-class review before remediation.

## Five-pilot architecture

```text
shared engineering invariants
    + descriptive repository adapter
    + target-specific skills
    + structured target authority fields
    + deterministic software evidence
    + explicit external/local/physical evidence
    + fresh report-only security baseline
    + final certification
```

This remains preferable to copying a large upstream agent/skill pack.

## Fifth-pilot evidence

Edge Mesh certification merge:

`7c8f564bf76bf9799914505f6c69568f46358abc`

Final P8 HEAD:

`b433197414988f1d153c471e9d4353baf8e507e7`

Final gates:

- Phase 0 `35758116180`: PASS
- Edge ECC integrated gate `35758116302`: PASS
- Python: 90 / 90 PASS
- Android unit/build/native verification: PASS
- AgentShield `35758116161`: 100/A, 0 findings, supply chain CLEAN

## K3-02 conclusion

The fifth pilot validates the Agent Kit on software, OT, voice/local-hardware, publication, and Android edge-compute domains without requiring a larger universal core.

Promotion decision:

- **promote evidence-separation principles**;
- **promote protected-context principle**;
- **retain the same four shared core skills**;
- **retain target-owned authority semantics**.
