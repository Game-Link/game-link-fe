module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@componets': './src/components',
          '@pages': './src/page',
        },
      },
    ],
  ],
};
