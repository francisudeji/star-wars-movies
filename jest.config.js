module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/']
}
