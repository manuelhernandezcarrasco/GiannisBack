import config from './jest.config';

export default {
  ...config,
  testMatch: ['<rootDir>/src/**/__tests__/**/*.ispec.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.integration.ts']
}