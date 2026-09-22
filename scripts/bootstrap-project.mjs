#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir=path.dirname(fileURLToPath(import.meta.url));
const kitRoot=path.resolve(scriptDir,'..');
const args=process.argv.slice(2);
const targetArg=args.find(x=>!x.startsWith('--'));
const apply=args.includes('--apply');
const force=args.includes('--force');
if (!targetArg) {
  console.error('usage: node scripts/bootstrap-project.mjs <target-repo> [--apply] [--force]');
  process.exit(1);
}
const target=path.resolve(targetArg);
if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
  console.error(`target directory not found: ${target}`); process.exit(1);
}
const mappings=[
  ['templates/AGENTS.template.md','AGENTS.md'],
  ['templates/ecc-profile.template.json','.orbi/ecc-profile.json'],
  ['templates/agentshield-report.yml','.github/workflows/orbi-ecc-agentshield-report.yml'],
  ['core/contracts/orbi-agent-observation-v1.schema.json','.orbi/orbi-agent-observation-v1.schema.json'],
  ['core/skills/orbi-verification-loop/SKILL.md','.agents/skills/orbi-verification-loop/SKILL.md'],
  ['core/skills/orbi-security-review/SKILL.md','.agents/skills/orbi-security-review/SKILL.md'],
  ['core/skills/orbi-context-budget/SKILL.md','.agents/skills/orbi-context-budget/SKILL.md'],
  ['core/skills/orbi-agent-harness/SKILL.md','.agents/skills/orbi-agent-harness/SKILL.md']
];
let blocked=0;
for (const [srcRel,dstRel] of mappings) {
  const src=path.join(kitRoot,srcRel), dst=path.join(target,dstRel), exists=fs.existsSync(dst);
  const action=exists && !force ? 'SKIP(existing)' : (exists ? 'OVERWRITE' : 'CREATE');
  console.log(`${apply?'APPLY':'DRY-RUN'} ${action} ${dstRel}`);
  if (exists && !force) { blocked++; continue; }
  if (apply) { fs.mkdirSync(path.dirname(dst),{recursive:true}); fs.copyFileSync(src,dst); }
}
if (!apply) console.log('\nDry run only. Re-run with --apply after review.');
if (blocked) console.log(`${blocked} governed/existing file(s) were not overwritten.`);
