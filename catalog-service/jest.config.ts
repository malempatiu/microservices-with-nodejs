import type {Config} from 'jest';

const config: Config = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },  
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ['/node_modules'],
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
