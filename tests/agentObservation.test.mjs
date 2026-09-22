import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const validator=path.resolve('scripts/validate-orbi-agent-observation.mjs');
const base={
  schemaVersion:'orbi.agent.observation.v1',
  status:'success',
  summary:'Verified repository evidence.',
  nextActions:['Record evidence.'],
  artifacts:['report.md'],
  evidence:[{kind:'ci',reference:'run:1',verification:'verified'}],
  authorityImpact:{externalWrite:false,privilegedMutation:false},
  humanApprovalRequired:false,
  localEvidenceRequired:false
};
const withFile=(v,fn)=>{const d=fs.mkdtempSync(path.join(os.tmpdir(),'orbi-kit-'));const f=path.join(d,'x.json');fs.writeFileSync(f,JSON.stringify(v));try{return fn(f)}finally{fs.rmSync(d,{recursive:true,force:true})}};

test('accepts valid structured observation',()=>withFile(base,f=>assert.match(execFileSync(process.execPath,[validator,f],{encoding:'utf8'}),/VALID/)));
test('rejects unknown top-level fields',()=>withFile({...base,autoAuthorize:true},f=>{const r=spawnSync(process.execPath,[validator,f],{encoding:'utf8'});assert.notEqual(r.status,0);assert.match(r.stderr,/unknown top-level field/)}));
test('requires explicit boolean authority impact',()=>withFile({...base,authorityImpact:{externalWrite:'no'}},f=>{const r=spawnSync(process.execPath,[validator,f],{encoding:'utf8'});assert.notEqual(r.status,0);assert.match(r.stderr,/must be boolean/)}));
test('requires recovery on error',()=>withFile({...base,status:'error'},f=>{const r=spawnSync(process.execPath,[validator,f],{encoding:'utf8'});assert.notEqual(r.status,0);assert.match(r.stderr,/require recovery/)}));
test('accepts safe error recovery',()=>withFile({...base,status:'error',recovery:{rootCauseHint:'Evidence missing.',safeRetry:'Retry with a new evidence source.',stopCondition:'Stop before unauthorized mutation.'}},f=>assert.match(execFileSync(process.execPath,[validator,f],{encoding:'utf8'}),/VALID/)));
