import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const script=path.resolve('scripts/bootstrap-project.mjs');

test('bootstrap is dry-run by default',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'orbi-bootstrap-'));
  try {
    const out=execFileSync(process.execPath,[script,dir],{encoding:'utf8'});
    assert.match(out,/DRY-RUN CREATE AGENTS\.md/);
    assert.equal(fs.existsSync(path.join(dir,'AGENTS.md')),false);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});

test('bootstrap apply creates files and does not overwrite existing files by default',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'orbi-bootstrap-'));
  try {
    execFileSync(process.execPath,[script,dir,'--apply'],{encoding:'utf8'});
    const agents=path.join(dir,'AGENTS.md');
    assert.equal(fs.existsSync(agents),true);
    fs.writeFileSync(agents,'CUSTOM\n');
    const out=execFileSync(process.execPath,[script,dir,'--apply'],{encoding:'utf8'});
    assert.match(out,/SKIP\(existing\) AGENTS\.md/);
    assert.equal(fs.readFileSync(agents,'utf8'),'CUSTOM\n');
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
