const { execSync } = require('child_process')

const pkgName = process.argv[2]
const version = process.argv[3]
const fromTag = process.argv[4]
const toTag = process.argv[5]

if (!pkgName || !version || !toTag) {
  console.error('❌ Error: node tag-move.js <package> <version> <fromTag?> <toTag>')
  process.exit(1)
}

execSync(`npm dist-tag add ${pkgName}@${version} ${toTag}`, { stdio: 'inherit' })

if (fromTag) {
  execSync(`npm dist-tag rm ${pkgName} ${fromTag}`, { stdio: 'inherit' })
}
