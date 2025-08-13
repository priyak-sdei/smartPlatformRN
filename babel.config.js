module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src', './shared', './pods'],
        alias: {
          '@src': './src',
          '@i18n': './src/i18n',
          '@shared': './shared',
          '@theme': './src/theme',
          '@types': './src/types',
          '@pods': './pods',
          '@screens': './src/screens',
          '@ui': './shared/ui',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@redux': './src/redux',
          '@constants': './src/constants',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: process.env.ENVFILE || '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
