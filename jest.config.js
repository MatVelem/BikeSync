module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|@react-navigation)',
    ],
  };