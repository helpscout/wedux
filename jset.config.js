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
})
