/** @type {import('ts-jest').JestConfigWithTsJest} */


module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    "<rootDir>/testConfig/testSetup.ts"
  ],
  testMatch: [
    "<rootDir>/e2e/**/__tests__/**/*.spec.ts"
  ],

  //reporters: ["<rootDir>/customReporter.js"]
};