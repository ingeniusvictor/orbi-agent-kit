---
name: orbi-security-review
description: Review secrets, permissions, untrusted inputs, provider/tool/network boundaries and authority expansion in an ORBI repository.
version: "0.1.0"
license: MIT
metadata:
  origin: ORBI
  authoritative: false
  runtime_dependency: false
---

# ORBI Security & Authority Review

Use for changes involving credentials, providers, tools, files, URLs, network access, external writes, identity, local runtimes, OT, camera/microphone, or dependency/workflow trust.

## Review order

1. secrets and credential lifecycle;
2. input/path/URL/file validation;
3. least-privilege action space;
4. read vs write separation;
5. external/network trust;
6. local subprocess/runtime boundaries;
7. identity/privacy/biometric or OT/data authority when relevant;
8. rollback and evidence.

## Invariants

```text
MODEL RESPONSE != TOOL / WRITE AUTHORITY
READ ACCESS != WRITE ACCESS
TOOL SUCCESS != PERMISSION FOR NEXT TOOL
SCANNER FINDING != AUTOMATIC FIX AUTHORITY
```

AgentShield should begin report-only with an independent baseline per repository.
