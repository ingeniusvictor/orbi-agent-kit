#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const candidates = [
  ['always-instructions','templates/AGENTS.template.md'],
  ['discoverable-skill','core/skills/orbi-verification-loop/SKILL.md'],
  ['discoverable-skill','core/skills/orbi-security-review/SKILL.md'],
  ['discoverable-skill','core/skills/orbi-context-budget/SKILL.md'],
  ['discoverable-skill','core/skills/orbi-agent-harness/SKILL.md'],
  ['config-reference','templates/ecc-profile.template.json'],
  ['config-reference','core/contracts/orbi-agent-observation-v1.schema.json']
];
const estimate = (s) => Math.ceil(Math.max(s.length/4, s.trim().split(/\s+/).length*1.3));
let persistent=0, discoverable=0, config=0;
for (const [kind,p] of candidates) {
  const text=fs.readFileSync(path.join(root,p),'utf8');
  const lines=text.split(/\r?\n/).length;
  const tokens=estimate(text);
  if (kind==='always-instructions') persistent+=tokens;
  if (kind==='discoverable-skill') discoverable+=tokens;
  if (kind==='config-reference') config+=tokens;
  console.log(`${kind}\t${lines} lines\t~${tokens} tokens\t${p}`);
}
console.log(`persistent_estimate\t~${persistent}`);
console.log(`discoverable_if_all_loaded\t~${discoverable}`);
console.log(`config_if_all_loaded\t~${config}`);
