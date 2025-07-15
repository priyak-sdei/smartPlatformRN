module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-redux|redux|@reduxjs|@expo|expo|@gorhom|@shopify|@rneui|@ui-kitten|@eva-design|@unimodules|@sentry|react-native-app-intro-slider)/)'
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@pods/(.*)$': '<rootDir>/pods/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@ui/(.*)$': '<rootDir>/shared/ui/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(ttf|otf)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: [
    './jest.setup.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};