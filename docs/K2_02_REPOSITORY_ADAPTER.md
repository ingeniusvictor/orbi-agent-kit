# K2-02 — Repository Adapter Contract

Status: CANDIDATE

## Goal

Define a small, validated target-repository adapter so ORBI Agent Engineering Kit can describe project-specific evidence and authority without hardcoding one product's rules into the shared core.

Schema:

`core/contracts/orbi-repository-adapter-v1.schema.json`

Validator:

```bash
node scripts/validate-repository-adapter.mjs <adapter.json>
```

Template:

`templates/repository-adapter.template.json`

Example:

`examples/repository-adapter.example.json`

## Contract

The adapter declares:

- project identity and canonical branch;
- exact install/focused/integrated verification commands;
- local-only and external evidence;
- authority domains;
- AgentShield branch/path scope;
- repository-specific accepted finding classes;
- conditional project-skill routing;
- deferred advanced capabilities.

## Fail-closed authority model

Every authority domain requires:

- an explicit ID and description;
- `agentMayAuthorize: false`;
- explicit `humanApprovalRequired`;
- explicit `localEvidenceRequired`.

The adapter is descriptive. It cannot grant authority to the model/agent.

`ADAPTER DECLARES AUTHORITY BOUNDARY != ADAPTER GRANTS AUTHORITY`

## Security baseline rule

Every adapter requires:

```json
"inheritAcceptedFindings": false
```

Accepted AgentShield findings can be listed only after target-repository evidence establishes them.

A false-positive class from Creative Studio, PVMetrics, L.U.M.I.A. or the kit itself is never inherited merely because another ORBI repository accepted it.

## Verification model

The adapter separates:

- `install` commands;
- `focused` deterministic checks;
- `integrated` repository gates;
- `localOnly` checks that CI cannot prove;
- `externalEvidence` requiring information outside the repository.

At least one integrated verification command is mandatory.

## Skill routing

Skills are declared with explicit triggers.

This supports context-budget discipline:

`available skill != always-loaded skill`

The adapter does not invoke the skills itself.

## Deferred capabilities

The current contract can explicitly list:

- hooks;
- MCP;
- continuous learning;
- unified memory;
- autonomous loops;
- multi-agent roles.

Listing a capability as deferred does not install or enable it.

## Tests

K2-02 validates:

1. a correct adapter;
2. unknown-field rejection;
3. no agent-granted authority;
4. no inherited scanner exceptions;
5. at least one integrated gate;
6. non-empty skill-routing triggers.

## Next

K2-03 will add a read-only upstream pin drift auditor.

K2-04 can then use the adapter contract during the fourth portability pilot, with ORBI News as the recommended target.
