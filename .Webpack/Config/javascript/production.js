import { path as appRoot } from 'app-root-path';

import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// import formatter from 'eslint-friendly-formatter';

const BabelLoader = {
  test: /\.(jsx|js)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheIdentifier: true,
      },
    },
  ],
};

const TsLoader = {
  test: /\.(tsx|ts)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        configFile: `${appRoot}/.tsconfig.json`,
        transpileOnly: true
      },
    },
  ],
}

const EsLintLoader = {
  test: /\.(jsx|js)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: true,
    quite: true,
    fix: true,
  },
};

const TsLintLoader = {
  test: /\.(tsx|ts)$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'tslint-loader',
  options: {
    configFile: `${appRoot}/.tsconfig.json`,
    cache: true,
    quite: true,
    fix: true,
  },
};

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    tslint: true,
    tsconfig: `${appRoot}/.tsconfig.json`,
  })
];

const rules = [BabelLoader, EsLintLoader, TsLoader, TsLintLoader,];

export { BabelLoader, EsLintLoader, TsLoader, TsLintLoader, plugins };
export default {
  module: { rules },
  plugins,
};
