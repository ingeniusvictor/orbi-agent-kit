# K2-01 — Machine-readable Bootstrap Plan

Status: CANDIDATE

## Goal

Extend the ORBI Agent Engineering Kit bootstrap so adoption can be reviewed by humans **and** consumed by deterministic tooling before any target-repository mutation occurs.

## Commands

Human dry-run remains unchanged:

```bash
node scripts/bootstrap-project.mjs ../target-repo
```

Machine-readable plan to stdout:

```bash
node scripts/bootstrap-project.mjs ../target-repo --json
```

Write a plan artifact without applying adoption:

```bash
node scripts/bootstrap-project.mjs ../target-repo --plan-file ./adoption-plan.json
```

Preview force semantics without writing target files:

```bash
node scripts/bootstrap-project.mjs ../target-repo --json --force
```

Apply remains explicit:

```bash
node scripts/bootstrap-project.mjs ../target-repo --apply
```

## Plan contract

Schema:

`core/contracts/orbi-adoption-plan-v1.schema.json`

Schema version:

`orbi.adoption.plan.v1`

Every mapping is classified as exactly one of:

- `CREATE`
- `SKIP`
- `OVERWRITE`

and separately records `willWrite`.

This distinction is deliberate:

`OVERWRITE candidate != file overwritten`

A dry-run with `--force` can show that a file *would* be overwritten while still keeping `willWrite: false`.

## Safety invariants

- dry-run remains the default;
- `--json` does not mutate target files;
- `--plan-file` may create only the explicitly requested plan artifact;
- existing governed files remain `SKIP` by default;
- `--force` alone does not mutate target files;
- target writes require explicit `--apply`;
- no network or external-service writes are introduced.

## Tests

K2-01 adds deterministic coverage for:

1. original dry-run behavior;
2. original apply/no-overwrite behavior;
3. JSON dry-run with eight CREATE candidates;
4. SKIP vs OVERWRITE classification;
5. explicit plan-file artifact generation without target mutation.

## Next phase

K2-02 will add a repository adapter contract so the plan can be generated from a target-specific canonical branch, verification commands, authority domains, AgentShield paths and skill triggers rather than relying only on the generic kit defaults.
