import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const validator = path.resolve('scripts/validate-repository-adapter.mjs');

const base = {
  schemaVersion: 'orbi.repository.adapter.v1',
  project: {
    id: 'demo',
    repository: 'ingeniusvictor/demo',
    canonicalBranch: 'main',
  },
  verification: {
    install: ['npm ci'],
    focused: ['npm test'],
    integrated: ['npm run certify'],
    localOnly: [],
    externalEvidence: [],
  },
  authorityDomains: [
    {
      id: 'external-write',
      description: 'External mutation authority.',
      agentMayAuthorize: false,
      humanApprovalRequired: true,
      localEvidenceRequired: false,
    },
  ],
  agentShield: {
    branches: ['main'],
    paths: ['.agents/**'],
    inheritAcceptedFindings: false,
    acceptedFindingClasses: [],
  },
  skillRouting: [
    {
      skill: 'orbi-verification-loop',
      triggers: ['READY', 'merge'],
    },
  ],
  deferredCapabilities: [
    'hooks',
    'mcp',
    'continuous-learning',
    'unified-memory',
    'autonomous-loops',
    'multi-agent-roles',
  ],
};

const withAdapter = (value, fn) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-adapter-'));
  const file = path.join(dir, 'adapter.json');
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
  try {
    return fn(file);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

test('accepts a valid repository adapter', () => {
  withAdapter(base, (file) => {
    const out = execFileSync(process.execPath, [validator, file], { encoding: 'utf8' });
    assert.match(out, /VALID orbi\.repository\.adapter\.v1/);
  });
});

test('rejects unknown top-level fields', () => {
  withAdapter({ ...base, automaticAuthority: true }, (file) => {
    const result = spawnSync(process.execPath, [validator, file], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /unknown top-level field/);
  });
});

test('adapter cannot grant authority to an agent', () => {
  const value = structuredClone(base);
  value.authorityDomains[0].agentMayAuthorize = true;
  withAdapter(value, (file) => {
    const result = spawnSync(process.execPath, [validator, file], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /must set agentMayAuthorize=false/);
  });
});

test('adapter cannot inherit accepted AgentShield findings', () => {
  const value = structuredClone(base);
  value.agentShield.inheritAcceptedFindings = true;
  withAdapter(value, (file) => {
    const result = spawnSync(process.execPath, [validator, file], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /inheritAcceptedFindings must be false/);
  });
});

test('requires at least one integrated verification command', () => {
  const value = structuredClone(base);
  value.verification.integrated = [];
  withAdapter(value, (file) => {
    const result = spawnSync(process.execPath, [validator, file], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /verification\.integrated requires at least 1 item/);
  });
});

test('requires non-empty triggers for every routed skill', () => {
  const value = structuredClone(base);
  value.skillRouting[0].triggers = [];
  withAdapter(value, (file) => {
    const result = spawnSync(process.execPath, [validator, file], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /requires at least 1 item/);
  });
});
