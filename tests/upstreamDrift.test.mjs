import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const auditor = path.resolve('scripts/audit-upstream-pin-drift.mjs');
const manifestPath = path.resolve('.orbi-kit-manifest.json');
const sameFixture = path.resolve('examples/upstream-candidate.same.json');
const driftFixture = path.resolve('examples/upstream-candidate.drift.json');

test('reports NO_DRIFT when candidate pins match the certified manifest', () => {
  const report = JSON.parse(execFileSync(process.execPath, [auditor, sameFixture, '--json'], { encoding: 'utf8' }));
  assert.equal(report.schemaVersion, 'orbi.upstream.drift.report.v1');
  assert.equal(report.status, 'NO_DRIFT');
  assert.equal(report.networkAccess, false);
  assert.equal(report.packageInstallation, false);
  assert.equal(report.pinMutation, false);
  assert.equal(report.items.every((item) => item.status === 'MATCH'), true);
  assert.equal(report.review.automaticDecision, false);
  assert.equal(report.review.decision, null);
});

test('reports REVIEW_REQUIRED and exact drift evidence without choosing a decision', () => {
  const report = JSON.parse(execFileSync(process.execPath, [auditor, driftFixture, '--json'], { encoding: 'utf8' }));
  assert.equal(report.status, 'REVIEW_REQUIRED');
  const ecc = report.items.find((item) => item.id === 'ecc');
  const shield = report.items.find((item) => item.id === 'agentShield');
  assert.equal(ecc.status, 'DRIFT');
  assert.equal(ecc.evidence.versionChanged, true);
  assert.equal(ecc.evidence.commitChanged, true);
  assert.equal(shield.status, 'MATCH');
  assert.equal(report.review.decision, null);
});

test('unknown upstreams are fail-closed as review-required', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-upstream-'));
  const file = path.join(dir, 'candidate.json');
  try {
    fs.writeFileSync(file, JSON.stringify({
      schemaVersion: 'orbi.upstream.candidate.v1',
      candidates: [
        { id: 'newScanner', version: '1.0.0', commit: 'abcdef1234567' },
      ],
    }));
    const report = JSON.parse(execFileSync(process.execPath, [auditor, file, '--json'], { encoding: 'utf8' }));
    assert.equal(report.status, 'REVIEW_REQUIRED');
    assert.equal(report.items[0].status, 'UNKNOWN_UPSTREAM');
    assert.equal(report.items[0].requiresReview, true);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('review decisions require an explicit reason and remain report metadata only', () => {
  const missingReason = spawnSync(process.execPath, [auditor, driftFixture, '--decision', 'ADAPT', '--json'], { encoding: 'utf8' });
  assert.notEqual(missingReason.status, 0);
  assert.match(missingReason.stderr, /must be provided together/);

  const before = fs.readFileSync(manifestPath, 'utf8');
  const report = JSON.parse(execFileSync(process.execPath, [
    auditor,
    driftFixture,
    '--decision', 'ADAPT',
    '--reason', 'Review upstream diff and pilot before changing the shared pin.',
    '--json',
  ], { encoding: 'utf8' }));
  const after = fs.readFileSync(manifestPath, 'utf8');

  assert.equal(report.review.decision, 'ADAPT');
  assert.match(report.review.reason, /pilot/);
  assert.equal(report.pinMutation, false);
  assert.equal(after, before);
});

test('report-file writes only the explicit report artifact and does not mutate certified pins', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orbi-upstream-report-'));
  const reportPath = path.join(dir, 'drift-report.json');
  try {
    const before = fs.readFileSync(manifestPath, 'utf8');
    execFileSync(process.execPath, [auditor, driftFixture, '--report-file', reportPath], { encoding: 'utf8' });
    assert.equal(fs.existsSync(reportPath), true);
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    assert.equal(report.status, 'REVIEW_REQUIRED');
    assert.equal(report.pinMutation, false);
    assert.equal(fs.readFileSync(manifestPath, 'utf8'), before);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
