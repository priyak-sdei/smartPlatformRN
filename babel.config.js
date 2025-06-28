module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src', './shared', './pods'],
        alias: {
          '@src': './src',
          '@shared': './shared',
          '@theme': './src/theme',
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
  ],
};
