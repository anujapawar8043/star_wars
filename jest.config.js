module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    // transformIgnorePatterns: [
    //   '/node_modules/(?!axios)', // Adjust this pattern to include other ES modules if needed
    // ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    // setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  };