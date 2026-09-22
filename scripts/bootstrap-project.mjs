#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const kitRoot = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);

let targetArg = null;
let apply = false;
let force = false;
let json = false;
let planFile = null;

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--apply') {
    apply = true;
  } else if (arg === '--force') {
    force = true;
  } else if (arg === '--json') {
    json = true;
  } else if (arg === '--plan-file') {
    const next = args[i + 1];
    if (!next || next.startsWith('--')) {
      console.error('--plan-file requires a path');
      process.exit(1);
    }
    planFile = next;
    i += 1;
  } else if (arg.startsWith('--')) {
    console.error(`unknown option: ${arg}`);
    process.exit(1);
  } else if (!targetArg) {
    targetArg = arg;
  } else {
    console.error(`unexpected positional argument: ${arg}`);
    process.exit(1);
  }
}

if (!targetArg) {
  console.error('usage: node scripts/bootstrap-project.mjs <target-repo> [--apply] [--force] [--json] [--plan-file <path>]');
  process.exit(1);
}

const target = path.resolve(targetArg);
if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
  console.error(`target directory not found: ${target}`);
  process.exit(1);
}

const mappings = [
  ['templates/AGENTS.template.md', 'AGENTS.md'],
  ['templates/ecc-profile.template.json', '.orbi/ecc-profile.json'],
  ['templates/agentshield-report.yml', '.github/workflows/orbi-ecc-agentshield-report.yml'],
  ['core/contracts/orbi-agent-observation-v1.schema.json', '.orbi/orbi-agent-observation-v1.schema.json'],
  ['core/skills/orbi-verification-loop/SKILL.md', '.agents/skills/orbi-verification-loop/SKILL.md'],
  ['core/skills/orbi-security-review/SKILL.md', '.agents/skills/orbi-security-review/SKILL.md'],
  ['core/skills/orbi-context-budget/SKILL.md', '.agents/skills/orbi-context-budget/SKILL.md'],
  ['core/skills/orbi-agent-harness/SKILL.md', '.agents/skills/orbi-agent-harness/SKILL.md']
];

const entries = mappings.map(([source, destination]) => {
  const destinationPath = path.join(target, destination);
  const exists = fs.existsSync(destinationPath);
  const action = exists ? (force ? 'OVERWRITE' : 'SKIP') : 'CREATE';
  return {
    source,
    destination,
    exists,
    action,
    willWrite: apply && action !== 'SKIP'
  };
});

const counts = entries.reduce((acc, entry) => {
  acc[entry.action] += 1;
  if (entry.willWrite) acc.writes += 1;
  return acc;
}, { CREATE: 0, SKIP: 0, OVERWRITE: 0, writes: 0 });

const plan = {
  schemaVersion: 'orbi.adoption.plan.v1',
  mode: apply ? 'apply' : 'dry-run',
  force,
  target,
  entries,
  summary: {
    total: entries.length,
    create: counts.CREATE,
    skip: counts.SKIP,
    overwrite: counts.OVERWRITE,
    writes: counts.writes
  }
};

if (planFile) {
  const resolvedPlanFile = path.resolve(planFile);
  fs.mkdirSync(path.dirname(resolvedPlanFile), { recursive: true });
  fs.writeFileSync(resolvedPlanFile, JSON.stringify(plan, null, 2) + '\n');
}

if (apply) {
  for (const entry of entries) {
    if (!entry.willWrite) continue;
    const src = path.join(kitRoot, entry.source);
    const dst = path.join(target, entry.destination);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

if (json) {
  process.stdout.write(JSON.stringify(plan, null, 2) + '\n');
} else {
  for (const entry of entries) {
    const prefix = apply ? 'APPLY' : 'DRY-RUN';
    const action = entry.action === 'SKIP' ? 'SKIP(existing)' : entry.action;
    console.log(`${prefix} ${action} ${entry.destination}`);
  }

  if (planFile) {
    console.log(`PLAN ${path.resolve(planFile)}`);
  }

  if (!apply) {
    console.log('\nDry run only. Re-run with --apply after review.');
  }

  if (counts.SKIP) {
    console.log(`${counts.SKIP} governed/existing file(s) were not overwritten.`);
  }
}
