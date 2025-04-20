/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */

const baseConfig = require('../../jest.config.base')

/** @type {import('jest').Config} */
const config = {
  ...baseConfig,
  displayName: 'redis',
  rootDir: __dirname,
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
