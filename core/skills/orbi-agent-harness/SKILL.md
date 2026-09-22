---
name: orbi-agent-harness
description: Design narrow ORBI agent action spaces, structured observations, evidence, recovery and stop conditions with explicit authority separation.
version: "0.1.0"
license: MIT
metadata:
  origin: ORBI
  authoritative: false
  runtime_dependency: false
---

# ORBI Agent Harness

Control five surfaces:

1. action-space quality;
2. observation quality;
3. recovery quality;
4. context-budget quality;
5. authority separation.

## Action-space tiers

- read-only — preferred default;
- reversible repository mutation — require diff + rollback;
- external write — require explicit task authorization and returned evidence;
- privileged/governed mutation — require a dedicated narrow tool and explicit policy/approval.

## Observation contract

Use `core/contracts/orbi-agent-observation-v1.schema.json`.

A valid observation reports status, summary, next actions, artifacts, evidence and explicit authority impact. Error observations require root-cause hint, safe retry and stop condition.

Unknown fields should fail closed in the deterministic validator.

## Recovery

A retry must change evidence, hypothesis, input, scope or implementation. Stop when evidence is unavailable, the same root cause repeats without new evidence, state is ambiguous, or the next action crosses an unauthorized boundary.
