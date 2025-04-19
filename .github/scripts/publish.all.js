const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const rootDir = process.cwd()
const workspacePackages = JSON.parse(execSync('pnpm ls -r --json', { encoding: 'utf-8' }))

// Determinar tag por rama
const branch = process.env.GITHUB_REF_NAME || process.env.BRANCH || 'main'
let tag = 'latest'

if (branch === 'dev') tag = 'dev'
if (branch === 'qa') tag = 'test'

for (const pkg of workspacePackages) {
  const pkgPath = pkg.path
  const pkgJsonPath = path.join(pkgPath, 'package.json')

  if (!fs.existsSync(pkgJsonPath)) continue

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
  if (!pkgJson.private) {
    console.log(`📦 Publicando ${pkgJson.name} con tag "${tag}"...`)
    try {
      execSync(`npm publish --access=public --tag ${tag}`, {
        cwd: pkgPath,
        stdio: 'inherit',
      })
    } catch (e) {
      console.warn(`⚠️ Error publicando ${pkgJson.name}: ${e.message}`)
    }
  }
}
