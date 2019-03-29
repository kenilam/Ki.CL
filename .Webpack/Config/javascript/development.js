import {
  path as appRoot
} from 'app-root-path';

import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

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
      configFile: `${appRoot}/.tsconfig.json`,
      transpileOnly: true,
    },
  }, ],
};

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: `${appRoot}/.tsconfig.json`,
    tslint: `${appRoot}/.tslint.json`,
    tslintAutoFix: true,
  })
];

const rules = [Loaders];

export {
  Loaders,
  optimization,
  plugins
};

export default {
  module: {
    rules
  },
  plugins,
};
