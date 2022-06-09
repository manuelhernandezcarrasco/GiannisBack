module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/__tests__/**/*'],
    coverageReporters: ['html', 'lcov', 'text', 'text-summary'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.ts'],
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1',
    },
    // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.unit.ts']
  };