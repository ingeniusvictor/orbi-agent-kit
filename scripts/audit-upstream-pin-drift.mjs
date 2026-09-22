#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

let candidateFile = null;
let json = false;
let reportFile = null;
let decision = null;
let reason = null;

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--json') {
    json = true;
  } else if (arg === '--report-file') {
    const next = args[i + 1];
    if (!next || next.startsWith('--')) {
      console.error('--report-file requires a path');
      process.exit(1);
    }
    reportFile = next;
    i += 1;
  } else if (arg === '--decision') {
    const next = args[i + 1];
    if (!next || next.startsWith('--')) {
      console.error('--decision requires ADOPT, ADAPT, or REJECT');
      process.exit(1);
    }
    decision = next;
    i += 1;
  } else if (arg === '--reason') {
    const next = args[i + 1];
    if (!next || next.startsWith('--')) {
      console.error('--reason requires text');
      process.exit(1);
    }
    reason = next;
    i += 1;
  } else if (arg.startsWith('--')) {
    console.error(`unknown option: ${arg}`);
    process.exit(1);
  } else if (!candidateFile) {
    candidateFile = arg;
  } else {
    console.error(`unexpected positional argument: ${arg}`);
    process.exit(1);
  }
}

if (!candidateFile) {
  console.error('usage: node scripts/audit-upstream-pin-drift.mjs <candidate.json> [--json] [--report-file <path>] [--decision ADOPT|ADAPT|REJECT --reason <text>]');
  process.exit(1);
}

const allowedDecisions = new Set(['ADOPT', 'ADAPT', 'REJECT']);
if (decision && !allowedDecisions.has(decision)) {
  console.error('--decision must be ADOPT, ADAPT, or REJECT');
  process.exit(1);
}
if ((decision && !reason) || (!decision && reason)) {
  console.error('--decision and --reason must be provided together');
  process.exit(1);
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const manifest = readJson(path.join(root, '.orbi-kit-manifest.json'));
const candidate = readJson(path.resolve(candidateFile));

if (candidate.schemaVersion !== 'orbi.upstream.candidate.v1' || !Array.isArray(candidate.candidates) || candidate.candidates.length === 0) {
  console.error('invalid candidate: expected orbi.upstream.candidate.v1 with at least one candidate');
  process.exit(1);
}

const seen = new Set();
const items = candidate.candidates.map((entry) => {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error('candidate entries must be objects');
  }
  if (typeof entry.id !== 'string' || !entry.id.trim()) throw new Error('candidate.id must be non-empty');
  if (seen.has(entry.id)) throw new Error(`duplicate candidate id: ${entry.id}`);
  seen.add(entry.id);
  if (typeof entry.version !== 'string' || !entry.version.trim()) throw new Error(`candidate ${entry.id} version must be non-empty`);
  if (typeof entry.commit !== 'string' || entry.commit.trim().length < 7) throw new Error(`candidate ${entry.id} commit must be at least 7 characters`);

  const current = manifest.upstreamPins?.[entry.id] ?? null;
  if (!current) {
    return {
      id: entry.id,
      status: 'UNKNOWN_UPSTREAM',
      current: null,
      candidate: { version: entry.version, commit: entry.commit },
      evidence: {
        versionChanged: null,
        commitChanged: null
      },
      requiresReview: true
    };
  }

  const versionChanged = current.version !== entry.version;
  const commitChanged = current.commit !== entry.commit;
  const changed = versionChanged || commitChanged;

  return {
    id: entry.id,
    status: changed ? 'DRIFT' : 'MATCH',
    current: { version: current.version, commit: current.commit },
    candidate: { version: entry.version, commit: entry.commit },
    evidence: {
      versionChanged,
      commitChanged
    },
    requiresReview: changed
  };
});

const requiresReview = items.some((item) => item.requiresReview);
const report = {
  schemaVersion: 'orbi.upstream.drift.report.v1',
  status: requiresReview ? 'REVIEW_REQUIRED' : 'NO_DRIFT',
  networkAccess: false,
  packageInstallation: false,
  pinMutation: false,
  items,
  review: {
    automaticDecision: false,
    allowedDecisions: ['ADOPT', 'ADAPT', 'REJECT'],
    decision,
    reason,
    requiredEvidence: [
      'review upstream diff from currently certified pin',
      'review security and authority impact',
      'identify target pilot/repository for validation',
      'run deterministic CI and report-only security scan before changing a shared pin'
    ]
  }
};

if (reportFile) {
  const resolved = path.resolve(reportFile);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, JSON.stringify(report, null, 2) + '\n');
}

if (json) {
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
} else {
  console.log(`ORBI upstream drift: ${report.status}`);
  for (const item of items) {
    console.log(`${item.id}: ${item.status}`);
    if (item.current) {
      console.log(`  current   ${item.current.version} @ ${item.current.commit}`);
    }
    console.log(`  candidate ${item.candidate.version} @ ${item.candidate.commit}`);
  }
  console.log('Automatic decision: disabled');
  console.log('Allowed reviewed decisions: ADOPT / ADAPT / REJECT');
  if (decision) console.log(`Recorded review decision: ${decision} — ${reason}`);
  if (reportFile) console.log(`REPORT ${path.resolve(reportFile)}`);
}
