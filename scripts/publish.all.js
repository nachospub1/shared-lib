const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const branch = process.env.GITHUB_REF_NAME || process.env.BRANCH || 'main'
let tag = process.env.TAG || 'latest'

if (branch === 'dev') tag = 'dev'
if (branch === 'qa') tag = 'test'

const packagesDir = path.resolve('packages')
const dirs = fs.readdirSync(packagesDir)

// Ruta del .npmrc raíz generado por el workflow
const rootNpmrc = path.resolve('.npmrc')

dirs.forEach((dir) => {
  const pkgPath = path.join(packagesDir, dir, 'package.json')
  const subprojectPath = path.join(packagesDir, dir)

  if (!fs.existsSync(pkgPath)) return

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    console.log(`🔒 ${pkg.name} está marcado como privado. Saltando...`)
    return
  }

  console.log(`📦 Publicando ${pkg.name} con tag "${tag}"...`)

  // Copiar .npmrc al subproyecto (si no existe o forzar)
  if (!fs.existsSync(rootNpmrc)) {
    console.error('❌ No se encontró el .npmrc en la raíz')
    process.exit(1)
  }

  const subNpmrc = path.join(subprojectPath, '.npmrc')
  fs.copyFileSync(rootNpmrc, subNpmrc)

  console.log('🧾 .npmrc aplicado al paquete:', fs.readFileSync(subNpmrc, 'utf-8'))

  try {
    execSync(`pnpm publish --tag ${tag} --no-git-checks`, {
      cwd: subprojectPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_AUTH_TOKEN: process.env.NPM_TOKEN,
      },
    })
  } catch (err) {
    console.error(`❌ Falló la publicación de ${pkg.name}`)
    console.error(err.message)
  }
})
