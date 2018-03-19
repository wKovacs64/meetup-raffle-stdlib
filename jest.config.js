module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/__mocks__/'],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  setupTestFrameworkScriptFile: '<rootDir>/__mocks__/mockAxios.js',
  testEnvironment: 'node',
};
