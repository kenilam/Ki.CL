import { path as appRoot } from 'app-root-path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import webpack from 'webpack';
import { context } from '!/Config/entry';

import { IsProd, Args } from '!/Utilities';

const tsconfig = `${appRoot}/tsconfig.json`;

const Loaders = [
  {
    test: /\.(ts|tsx)?$/,
    exclude: [/node_modules\/\*\*/],
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        loader: 'ts-loader',
        options: {
          configFile: tsconfig,
          experimentalWatchApi: false,
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.(js|jsx)?$/,
    exclude: [/node_modules\/\*\*/],
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['react-hot-loader/babel'],
        },
      },
    ],
  },
];

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    async: true,
    eslint: {
      files: `${context}/**/*.{ts,tsx,js,jsx}`
    },
    typescript: {
      memoryLimit: 8092,
      configFile: tsconfig
    },
  })
]

const rules = Loaders;

export { Loaders, plugins };

export default {
  module: {
    rules,
  },
  plugins,
};
