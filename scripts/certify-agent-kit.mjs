#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const tests=fs.readdirSync(path.join(root,'tests')).filter(x=>x.endsWith('.test.mjs')).map(x=>path.join(root,'tests',x));
execFileSync(process.execPath,['--test',...tests],{stdio:'inherit',cwd:root});
execFileSync(process.execPath,[path.join(root,'scripts/validate-orbi-agent-observation.mjs'),path.join(root,'examples/observation.success.json')],{stdio:'inherit',cwd:root});
console.log('ORBI Agent Engineering Kit certification PASS');
