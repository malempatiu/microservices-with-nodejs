import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ['/node_modules'],
  verbose: true,
  moduleDirectories: ['node_modules', 'src']
};

export default config;
