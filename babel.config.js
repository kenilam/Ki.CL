module.exports = {
  'ignore': [
    'node_modules'
  ],
  'presets': [
    [
      '@babel/preset-env',
      {
        'corejs': 3,
        'debug': false,
        'useBuiltIns': 'usage'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  'plugins': [
    [
      'babel-plugin-root-import',
      {
        'paths': [
          {
            'rootPathSuffix': '.',
            'rootPathPrefix': '^'
          },
          {
            'rootPathSuffix': '.Webpack',
            'rootPathPrefix': '!'
          },
          {
            'rootPathSuffix': 'project',
            'rootPathPrefix': '~'
          },
        ]
      }
    ],
    [
      'module-resolver',
      {
        'root': ['/'],
        'alias': {
          '@/*': './project/*',
          '$/*': './*',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx', 'css', 'scss']
      }
    ],
    [
      'react-css-modules',
      {
        'webpackHotModuleReloading': true
      }
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true
      }
    ],

    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/transform-runtime",
    "@babel/plugin-transform-modules-commonjs",
    "react-hot-loader/babel",
  ]
}
