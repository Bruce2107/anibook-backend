const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  clearMocks: false,

  collectCoverage: true,

  coverageDirectory: './coverage',

  coveragePathIgnorePatterns: ['/node_modules/'],

  coverageThreshold: {
    global: {
      branchesb: 90,
      functions: 90,
      lines: 90,
    },
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  preset: 'ts-jest',

  testEnvironment: 'node',
};
