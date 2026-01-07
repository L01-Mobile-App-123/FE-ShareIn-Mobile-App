module.exports = {
  preset: 'react-native',

  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],

  transformIgnorePatterns: [
    // Bỏ qua các node_modules trừ những module cần transform
    'node_modules/(?!(react-native|@react-native|expo|@expo|@unimodules|@react-navigation)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@expo/vector-icons/(.*)$': '<rootDir>/__mocks__/@expo/vector-icons/$1.tsx',
  },
};