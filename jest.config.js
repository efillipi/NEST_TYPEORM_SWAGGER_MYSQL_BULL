/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/controllers/**/*.ts',
    '<rootDir>/src/modules/**/services/**/*.ts',
  ],
  clearMocks: true,
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
};
