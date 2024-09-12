module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@componets': './src/components',
          '@pages': './src/page',
          '@util': './src/util',
          '@store': './src/store',
        },
      },
    ],
  ],
};
