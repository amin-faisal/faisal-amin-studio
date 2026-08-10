#!/usr/bin/env node
/* Build and publish to the gh-pages branch.

   Not a GitHub Action because pushing .github/workflows/ needs the `workflow`
   OAuth scope, which this account's gh token doesn't carry. Run
   `gh auth refresh -s workflow`, move deploy/github-pages.yml into
   .github/workflows/, and this script becomes redundant. */

import { execSync } from 'node:child_process'
import { rmSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const REPO = 'https://github.com/amin-faisal/faisal-amin-studio.git'
const BASE_PATH = process.env.BASE_PATH ?? '/faisal-amin-studio'
const OUT = join(process.cwd(), 'out')

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })

console.log(`\n▸ Building with BASE_PATH="${BASE_PATH}"\n`)
rmSync(OUT, { recursive: true, force: true })
run('npm run build', { env: { ...process.env, BASE_PATH } })

if (!existsSync(join(OUT, 'index.html'))) {
  console.error('\n✗ out/index.html missing — build produced nothing to deploy.')
  process.exit(1)
}

// Pages runs Jekyll by default, which strips directories beginning with an
// underscore. That would delete Next's entire _next/ bundle.
writeFileSync(join(OUT, '.nojekyll'), '')

console.log('\n▸ Publishing to gh-pages\n')
const git = (cmd) => run(`git ${cmd}`, { cwd: OUT })

rmSync(join(OUT, '.git'), { recursive: true, force: true })
git('init -q')
git('checkout -q -b gh-pages')
git('add -A')
git('-c user.name="Faisal Amin" -c user.email="work.faisalamin@gmail.com" commit -q -m "Deploy static export"')
git(`push -q -f ${REPO} gh-pages`)

console.log('\n✓ Deployed → https://amin-faisal.github.io/faisal-amin-studio/\n')
