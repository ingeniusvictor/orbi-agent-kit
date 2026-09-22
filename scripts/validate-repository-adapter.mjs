#!/usr/bin/env node
import fs from 'node:fs';

const file = process.argv[2];
const fail = (message) => {
  process.stderr.write(`INVALID: ${message}\n`);
  process.exitCode = 1;
};
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
const stringArray = (value, field, { min = 0 } = {}) => {
  if (!Array.isArray(value)) {
    fail(`${field} must be an array`);
    return false;
  }
  if (value.length < min) fail(`${field} requires at least ${min} item(s)`);
  if (value.some((item) => !nonEmpty(item))) fail(`${field} entries must be non-empty strings`);
  return true;
};
const rejectUnknown = (value, allowed, field) => {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) fail(`unknown ${field} field: ${key}`);
  }
};

if (!file) {
  fail('usage: node scripts/validate-repository-adapter.mjs <adapter.json>');
} else {
  let value;
  try {
    value = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`cannot parse JSON: ${error.message}`);
  }

  if (value && process.exitCode !== 1) {
    if (typeof value !== 'object' || Array.isArray(value)) {
      fail('top-level value must be an object');
    } else {
      rejectUnknown(value, new Set([
        'schemaVersion','project','verification','authorityDomains',
        'agentShield','skillRouting','deferredCapabilities'
      ]), 'top-level');

      if (value.schemaVersion !== 'orbi.repository.adapter.v1') {
        fail('schemaVersion must be orbi.repository.adapter.v1');
      }

      const project = value.project;
      if (!project || typeof project !== 'object' || Array.isArray(project)) {
        fail('project must be an object');
      } else {
        rejectUnknown(project, new Set(['id','repository','canonicalBranch']), 'project');
        for (const key of ['id','repository','canonicalBranch']) {
          if (!nonEmpty(project[key])) fail(`project.${key} must be a non-empty string`);
        }
      }

      const verification = value.verification;
      if (!verification || typeof verification !== 'object' || Array.isArray(verification)) {
        fail('verification must be an object');
      } else {
        rejectUnknown(verification, new Set(['install','focused','integrated','localOnly','externalEvidence']), 'verification');
        stringArray(verification.install, 'verification.install');
        stringArray(verification.focused, 'verification.focused');
        stringArray(verification.integrated, 'verification.integrated', { min: 1 });
        stringArray(verification.localOnly, 'verification.localOnly');
        stringArray(verification.externalEvidence, 'verification.externalEvidence');
      }

      if (!Array.isArray(value.authorityDomains) || value.authorityDomains.length === 0) {
        fail('authorityDomains requires at least one domain');
      } else {
        const seen = new Set();
        for (const domain of value.authorityDomains) {
          if (!domain || typeof domain !== 'object' || Array.isArray(domain)) {
            fail('authorityDomains entries must be objects');
            continue;
          }
          rejectUnknown(domain, new Set([
            'id','description','agentMayAuthorize','humanApprovalRequired','localEvidenceRequired'
          ]), 'authorityDomains');
          if (!nonEmpty(domain.id)) fail('authorityDomains.id must be non-empty');
          if (seen.has(domain.id)) fail(`duplicate authority domain: ${domain.id}`);
          seen.add(domain.id);
          if (!nonEmpty(domain.description)) fail('authorityDomains.description must be non-empty');
          if (domain.agentMayAuthorize !== false) fail(`authority domain ${domain.id || '<unknown>'} must set agentMayAuthorize=false`);
          if (typeof domain.humanApprovalRequired !== 'boolean') fail(`authority domain ${domain.id || '<unknown>'} humanApprovalRequired must be boolean`);
          if (typeof domain.localEvidenceRequired !== 'boolean') fail(`authority domain ${domain.id || '<unknown>'} localEvidenceRequired must be boolean`);
        }
      }

      const shield = value.agentShield;
      if (!shield || typeof shield !== 'object' || Array.isArray(shield)) {
        fail('agentShield must be an object');
      } else {
        rejectUnknown(shield, new Set(['branches','paths','inheritAcceptedFindings','acceptedFindingClasses']), 'agentShield');
        stringArray(shield.branches, 'agentShield.branches', { min: 1 });
        stringArray(shield.paths, 'agentShield.paths', { min: 1 });
        if (shield.inheritAcceptedFindings !== false) fail('agentShield.inheritAcceptedFindings must be false');
        stringArray(shield.acceptedFindingClasses, 'agentShield.acceptedFindingClasses');
      }

      if (!Array.isArray(value.skillRouting)) {
        fail('skillRouting must be an array');
      } else {
        for (const route of value.skillRouting) {
          if (!route || typeof route !== 'object' || Array.isArray(route)) {
            fail('skillRouting entries must be objects');
            continue;
          }
          rejectUnknown(route, new Set(['skill','triggers']), 'skillRouting');
          if (!nonEmpty(route.skill)) fail('skillRouting.skill must be non-empty');
          stringArray(route.triggers, `skillRouting.${route.skill || '<unknown>'}.triggers`, { min: 1 });
        }
      }

      const allowedDeferred = new Set([
        'hooks','mcp','continuous-learning','unified-memory','autonomous-loops','multi-agent-roles'
      ]);
      if (!Array.isArray(value.deferredCapabilities)) {
        fail('deferredCapabilities must be an array');
      } else {
        const seen = new Set();
        for (const capability of value.deferredCapabilities) {
          if (!allowedDeferred.has(capability)) fail(`unknown deferred capability: ${capability}`);
          if (seen.has(capability)) fail(`duplicate deferred capability: ${capability}`);
          seen.add(capability);
        }
      }
    }

    if (process.exitCode !== 1) {
      process.stdout.write('VALID orbi.repository.adapter.v1\n');
    }
  }
}
