// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { path: rootPath } = require('app-root-path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  cacheDirectory: '.jest-cache',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    // 'json',
    // 'text',
    'lcov',
    // 'clover'
  ],

  // A set of global variables that need to be available in all test environments
  globals: {
    PATH: 'http://localhost:4444',
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001], // ignore the warning with the given code.
      },
      tsConfig: {
        jsx: 'react',
        esModuleInterop: true,
      },
    },
  },

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', './'],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/../project/',
    }),
    '\\.(css|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '\\/Style': '<rootDir>/mock.style.js',
  },

  notify: true,
  notifyMode: 'always',

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest', // will use node_modules/ts-jest/jest-preset.js

  // Use this configuration option to add custom reporters to Jest
  reporters: ['jest-progress-bar-reporter', 'jest-junit'],

  // roots
  roots: [rootPath, `${rootPath}/.Jest`],

  setupFilesAfterEnv: [
    'jest-canvas-mock',
    '<rootDir>/setup.js',
    '<rootDir>/setup.enzyme.js',
  ],

  testEnvironment: 'jest-environment-jsdom-fourteen',

  // An array of regexp pattern strings that are matched all test paths
  testMatch: ['**/*.test.ts?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?(x)$': '<rootDir>/transform.js',
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Whether to use watchman for file crawling
  watchman: true,
};
