const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {withSentryConfig} = require('@sentry/react-native/metro');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'lottie'],
  },
};

module.exports = withSentryConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
);
