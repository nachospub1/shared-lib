// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    // eslint-disable-next-line unicorn/prefer-module
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    'love',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:unicorn/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'unicorn/no-null': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'no-magic-numbers': ['error', { ignore: [0, 1] }],
    '@typescript-eslint/consistent-type-definitions': ['off'],
    '@typescript-eslint/no-redeclare': [
      'warn',
      {
        ignoreDeclarationMerge: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        'newlines-between': 'always',
      },
    ],
    'no-console': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
}
