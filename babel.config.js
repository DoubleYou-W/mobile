module.exports = function (api) {
  api.cache(true);

  const plugins = [
    'react-native-reanimated/plugin'
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,

    ignore: [
      // Avoid trying to transpile config files
      '**/tailwind.config.js',
      '**/postcss.config.js',
      '**/metro.config.js',
    ],
  };
};