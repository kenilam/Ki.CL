import {
  path as appRoot
} from 'app-root-path';

import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const tsconfig = `${appRoot}/.tsconfig.json`;
const tslint = `${appRoot}/.tslint.json`;

const Loaders = {
  test: /\.(tsx|ts)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      cacheIdentifier: true,
      plugins: ['react-hot-loader/babel']
    },
  }, {
    loader: 'ts-loader',
    options: {
      configFile: tsconfig,
      experimentalWatchApi: false,
      happyPackMode: false,
      transpileOnly: true
    },
  }, ],
};

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    tsconfig: tsconfig,
    tslint: tslint,
    tslintAutoFix: true
  })
];

const rules = [Loaders];

export {
  Loaders,
  plugins
};

export default {
  module: {
    rules
  },
  plugins
};
