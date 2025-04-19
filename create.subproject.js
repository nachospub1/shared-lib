const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Debes proporcionar un nombre para el subproyecto.");
  process.exit(1);
}

const rootDir = process.cwd();
const templateDir = path.join(rootDir, "template");
const newProjectDir = path.join(rootDir, "packages", projectName);

if (fs.existsSync(newProjectDir)) {
  console.error(`❌ Sub project '${projectName}' already exists.`);
  process.exit(1);
}

fs.mkdirSync(newProjectDir, { recursive: true });

// fs.readdirSync(templateDir).forEach((file) => {
//   const srcPath = path.join(templateDir, file);
//   const destPath = path.join(newProjectDir, file);
//   fs.copyFileSync(srcPath, destPath);
// });

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath); // Copia subdirectorios recursivamente
    } else {
      fs.copyFileSync(srcPath, destPath); // Copia archivos
    }
  });
}

// Llamar la función para copiar la plantilla correctamente
copyRecursive(templateDir, newProjectDir);


console.log(`✅ Sub project '${projectName}' successfully created.`);

execSync("npm init -y", { cwd: newProjectDir, stdio: "inherit" });

// Ruta del package.json recién creado
const packageJsonPath = path.join(newProjectDir, "package.json");

// Leer el package.json generado por npm init -y
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Definir valores base
const packageJsonBase = {
  name: `@app-aramco/${projectName}`,
  version: "0.0.1",
  description: "",
  main: "dist/index.js",
  module: "dist/index.js",
  types: "dist/index.d.ts",
  files: [
      "dist",
      "package.json",
      "README.md"
  ],
  "exports": {
    ".": {
        "import": "./dist/index.js",
        "require": "./dist/index.js",
        "types": "./dist/index.d.ts"
    }
},
"scripts": {
    "build": "tsc --outDir dist",
    "lint": "eslint src --ext .ts",
    "test": "jest"
},
  dependencies: packageJson.dependencies || {},
  devDependencies: packageJson.devDependencies || {},
  license: "ISC",
  author: "",
};

// Sobrescribir el package.json con los valores base
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonBase, null, 2));

console.log("✅ package.json personalizado correctamente.");


console.log("✅ npm init completed.");
