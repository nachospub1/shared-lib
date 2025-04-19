/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { compilerOptions } from './tsconfig.json'

const { compilerOptions } = require('./tsconfig.base.json')
/** @type {import('jest').Config} */
const baseConfig = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: String.raw`\.spec\.ts$`,
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,js}', '!**/*.d.ts'],
  coveragePathIgnorePatterns: ['node_modules', 'interfaces', 'index.ts', 'default.ts', 'main.ts', '.module.ts', '.mock.ts', '.spec.ts', '/packages/.*/constants/'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transformIgnorePatterns: ['!node_modules/'],
  modulePaths: compilerOptions.baseUrl ? [compilerOptions.baseUrl] : [], // <-- This will be set to 'baseUrl' value
}

module.exports=  baseConfig