module.exports = function (api) {
  api.cache(true);

  return {
    exclude: [/\/core-js\//],
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          // Requires @babel/runtime-corejs3
          // https://babeljs.io/blog/2019/03/19/7.4.0#migration-from-core-js-2
          corejs: { version: 3, proposals: true },
        },
      ],

      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-modules-commonjs',
      'babel-plugin-transform-import-meta',
    ],
  };
};
