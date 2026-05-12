#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

function main() {
  const skipEnv = process.env.HUSKY === '0' || process.env.HUSKY_SKIP_INSTALL === 'true';
  if (skipEnv) {
    console.log('Husky install skipped via env HUSKY or HUSKY_SKIP_INSTALL');
    return;
  }

  // check for .git in repository root
  const gitDir = path.resolve(__dirname, '..', '.git');
  if (!existsSync(gitDir)) {
    console.log('.git not found — skipping husky install (CI / packed build environment)');
    return;
  }

  try {
    console.log('Running husky install...');
    execSync('npx husky install', { stdio: 'inherit' });
    console.log('Husky installed.');
  } catch (err) {
    console.warn('Husky install failed (non-fatal):', err && err.message ? err.message : err);
  }
}

main();
