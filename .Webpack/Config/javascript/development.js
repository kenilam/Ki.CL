import { path as appRoot } from 'app-root-path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import webpack from 'webpack';
import { context } from '../entry';

const tsconfig = `${appRoot}/tsconfig.json`;
const tslint = `${appRoot}/tslint.json`;

const Loaders = {
  test: /\.(tsx|ts)$/,
  enforce: 'pre',
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
        happyPackMode: false,
        transpileOnly: true,
      },
    },
  ],
};

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    async: true,
    typescript: {
      configFile: tsconfig
    }
  }),
];

const rules = [Loaders];

export { Loaders, plugins };

export default {
  module: {
    rules,
  },
  plugins,
};
