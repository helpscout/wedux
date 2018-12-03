const jestConfig = require('@helpscout/zero/jest')

const coverageList = [
  'src/**/*.{js,jsx,ts,tsx}',
  '!src/testHelpers.ts',
  '!src/__fixtures__/**/*',
]

module.exports = Object.assign({}, jestConfig, {
  collectCoverageFrom: []
    .concat(jestConfig.collectCoverageFrom)
    .concat(coverageList),
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  setupTestFrameworkScriptFile: '<rootDir>/scripts/setupTests.js',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
})
