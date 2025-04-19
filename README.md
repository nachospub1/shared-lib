# smx-app-shared

> A shared, private library for Aramco App

## 📦 Installing and configuring

Follow this steps to mount this project locally:

```sh
# Install dependencies
pnpm install

# Build all sub projects
pnpm run build
```

## 🚀 Available scripts

The following scripts are available at the root's project `package.json`:

```json
{
  "scripts": {
    "build": "pnpm run build", // Build all sub projects
    "test": "pnpm run test", // Run unit tests on all sub projects
    "lint": "pnpm run lint", // Run ESLint on all sub projects
    "format": "pnpm run lint", // Run prettier formatter on all sub projects
    "typedoc": "pnpm run typedoc", // Generate typedoc documentation from all sub projects
    "create-project": "node create.subproject.js" // Generate a new base sub project with a given name
  }
}
```

Examples:

```sh
pnpm run build  # Build all
pnpm run test   # Run tests
```

## 📖 Documentation

Documentation generated with Typedoc is available at:

```
/docs/index.html
```

> This is a static file to be opened in a we browser.

## 🧑🏻‍💻 Local development

To clean your building cache, run this command to delete all tsconfig.tsbuildinfo files and dist folders.
⚠ Important: in local development, this command must be executed before build

```sh
find . \( -name "tsconfig.tsbuildinfo" -o -name "dist" \) -exec rm -rf {} +
find . \( -name "tsconfig.tsbuildinfo" -o -name "dist" -o -name "node_modules" \) -exec rm -rf {} +
```

To create a new empty sub project, run this command

```sh
pnpm run create-project [projectName]
```

## 📂 Sub projects

The following sub projects are included in this monorepo:

```sh
pnpm -r list --depth=1
```

> You can execute this command to get an update list of existing sub projects.
