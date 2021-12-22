module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testRegex: '.*(__tests__|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/__tests__/tsconfig.json'
    }
  },
  modulePaths: ['<rootDir>'],
  testTimeout: 10000,
  roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**/*.ts']
}
