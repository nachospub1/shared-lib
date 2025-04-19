const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const branch = process.env.GITHUB_REF_NAME || process.env.BRANCH || 'main'
let tag = process.env.TAG || 'latest'

if (branch === 'dev') tag = 'dev'
if (branch === 'qa') tag = 'test'

const packagesDir = path.resolve('packages') // Ajusta si tus paquetes están en otra carpeta

const dirs = fs.readdirSync(packagesDir)

dirs.forEach((dir) => {
  const pkgPath = path.join(packagesDir, dir, 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    if (!pkg.private) {
      console.log(`📦 Publicando ${pkg.name} con tag "${tag}"...`)
      execSync(`npm config set //npm.pkg.github.com/:_authToken=${process.env.NODE_AUTH_TOKEN}`, {
        cwd: pkgPath,
        stdio: 'inherit',
      })
      execSync(`npm publish --tag ${tag}`, {
        cwd: path.join(packagesDir, dir),
        stdio: 'inherit',
        env: { ...process.env, NODE_AUTH_TOKEN: process.env.NPM_TOKEN },
      })
    } else {
      console.log(`🔒 ${pkg.name} está marcado como privado. Saltando...`)
    }
  }
})
