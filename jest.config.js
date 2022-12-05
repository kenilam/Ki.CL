module.exports = {
  collectCoverageFrom: ['App/**/*.{ts, tsx}'],
  coverageReporters: [
    'json',
    'json-summary',
    'lcov',
    'cobertura',
    'text',
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  moduleDirectories: ['./node_modules', './App'],
  moduleFileExtensions: ['js', 'json', 'tsx', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/App/$1',
    '^.+\\.(css|scss)$': 'babel-jest',
    'import.meta.url': '<rootDir>/.Jest/import.meta.url.js',
  },
  preset: 'ts-jest',
  rootDir: __dirname,
  setupFilesAfterEnv: ['mock-local-storage'],
  snapshotResolver: '<rootDir>/.Jest/snapshotResolver.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['<rootDir>/App/(build|node_modules)/'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/App/**/*.test.ts?(x)', '<rootDir>/App/**/test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.Jest/transform.binary.js',
  },
};
