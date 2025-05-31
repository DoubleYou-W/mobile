const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = ['.'];
config.resolver.unstable_flush = true;

module.exports = wrapWithReanimatedMetroConfig(withNativeWind(config, { input: './global.css', inlineRem: false }))