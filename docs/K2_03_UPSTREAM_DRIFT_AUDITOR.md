# K2-03 — Read-only Upstream Pin Drift Auditor

Status: CANDIDATE

## Goal

Detect drift between the currently certified ORBI Agent Engineering Kit upstream pins and explicitly supplied candidate pins without network access, package installation, automatic adoption or manifest mutation.

## Candidate contract

Schema:

`core/contracts/orbi-upstream-candidate-v1.schema.json`

Candidate version:

`orbi.upstream.candidate.v1`

Example fixtures:

- `examples/upstream-candidate.same.json`
- `examples/upstream-candidate.drift.json`

## Auditor

```bash
node scripts/audit-upstream-pin-drift.mjs examples/upstream-candidate.same.json
```

JSON report:

```bash
node scripts/audit-upstream-pin-drift.mjs examples/upstream-candidate.drift.json --json
```

Explicit report artifact:

```bash
node scripts/audit-upstream-pin-drift.mjs examples/upstream-candidate.drift.json --report-file ./drift-report.json
```

## Report states

Per upstream:

- `MATCH`
- `DRIFT`
- `UNKNOWN_UPSTREAM`

Whole report:

- `NO_DRIFT`
- `REVIEW_REQUIRED`

The report explicitly records:

- current version/commit;
- candidate version/commit;
- version-changed flag;
- commit-changed flag;
- whether review is required.

## ADOPT / ADAPT / REJECT

The auditor never chooses one automatically.

The report always exposes the allowed reviewed decisions:

- `ADOPT`
- `ADAPT`
- `REJECT`

A decision can be recorded only as explicit review metadata:

```bash
node scripts/audit-upstream-pin-drift.mjs candidate.json \
  --decision ADAPT \
  --reason "Review diff and validate in a pilot before changing the shared pin." \
  --json
```

Decision and reason must be supplied together.

`RECORDED REVIEW DECISION != PIN MUTATION`

Even an explicit ADOPT decision does not edit the manifest.

## Required evidence before changing a shared pin

The generated report requires:

1. upstream diff review from the currently certified pin;
2. security/authority-impact review;
3. target pilot/repository identification;
4. deterministic CI + report-only security validation.

## Safety

K2-03 guarantees:

- `networkAccess: false`;
- `packageInstallation: false`;
- `pinMutation: false`;
- no automatic update;
- no automatic ADOPT/ADAPT/REJECT verdict;
- unknown upstreams fail closed into `REVIEW_REQUIRED`.

## Tests

K2-03 covers:

1. exact no-drift match;
2. version/commit drift;
3. unknown upstream;
4. decision + reason requirement;
5. manifest immutability;
6. explicit report-file output.

## Next

K2-04 uses the certified v0.2 core against a fourth ORBI repository. Recommended target: ORBI News.
