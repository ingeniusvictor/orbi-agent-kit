import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const script = path.resolve('scripts/bootstrap-project.mjs');

test('bootstrap is dry-run by default', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-bootstrap-'));
  try {
    const out = execFileSync(process.execPath, [script, dir], { encoding: 'utf8' });
    assert.match(out, /DRY-RUN CREATE AGENTS\.md/);
    assert.equal(fs.existsSync(path.join(dir, 'AGENTS.md')), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('bootstrap apply creates files and does not overwrite existing files by default', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-bootstrap-'));
  try {
    execFileSync(process.execPath, [script, dir, '--apply'], { encoding: 'utf8' });
    const agents = path.join(dir, 'AGENTS.md');
    assert.equal(fs.existsSync(agents), true);
    fs.writeFileSync(agents, 'CUSTOM\n');
    const out = execFileSync(process.execPath, [script, dir, '--apply'], { encoding: 'utf8' });
    assert.match(out, /SKIP\(existing\) AGENTS\.md/);
    assert.equal(fs.readFileSync(agents, 'utf8'), 'CUSTOM\n');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('bootstrap --json emits a machine-readable dry-run plan without changing target files', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-bootstrap-'));
  try {
    const out = execFileSync(process.execPath, [script, dir, '--json'], { encoding: 'utf8' });
    const plan = JSON.parse(out);
    assert.equal(plan.schemaVersion, 'orbi.adoption.plan.v1');
    assert.equal(plan.mode, 'dry-run');
    assert.equal(plan.force, false);
    assert.equal(plan.summary.total, 8);
    assert.equal(plan.summary.create, 8);
    assert.equal(plan.summary.skip, 0);
    assert.equal(plan.summary.overwrite, 0);
    assert.equal(plan.summary.writes, 0);
    assert.equal(plan.entries.every((entry) => entry.action === 'CREATE'), true);
    assert.equal(fs.existsSync(path.join(dir, 'AGENTS.md')), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('bootstrap plan classifies existing governed files as SKIP and force as OVERWRITE without applying', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-bootstrap-'));
  try {
    const agents = path.join(dir, 'AGENTS.md');
    fs.writeFileSync(agents, 'CUSTOM\n');

    const normal = JSON.parse(execFileSync(process.execPath, [script, dir, '--json'], { encoding: 'utf8' }));
    const normalAgents = normal.entries.find((entry) => entry.destination === 'AGENTS.md');
    assert.equal(normalAgents.action, 'SKIP');
    assert.equal(normalAgents.willWrite, false);

    const forced = JSON.parse(execFileSync(process.execPath, [script, dir, '--json', '--force'], { encoding: 'utf8' }));
    const forcedAgents = forced.entries.find((entry) => entry.destination === 'AGENTS.md');
    assert.equal(forcedAgents.action, 'OVERWRITE');
    assert.equal(forcedAgents.willWrite, false);
    assert.equal(fs.readFileSync(agents, 'utf8'), 'CUSTOM\n');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('bootstrap --plan-file writes only the requested plan artifact during dry-run', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-bootstrap-'));
  const planDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-plan-'));
  const planPath = path.join(planDir, 'adoption-plan.json');
  try {
    const out = execFileSync(process.execPath, [script, dir, '--plan-file', planPath], { encoding: 'utf8' });
    assert.match(out, /PLAN /);
    assert.equal(fs.existsSync(planPath), true);
    const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
    assert.equal(plan.schemaVersion, 'orbi.adoption.plan.v1');
    assert.equal(plan.mode, 'dry-run');
    assert.equal(plan.summary.writes, 0);
    assert.equal(fs.existsSync(path.join(dir, 'AGENTS.md')), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(planDir, { recursive: true, force: true });
  }
});
