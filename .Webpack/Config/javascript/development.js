import { path as appRoot } from 'app-root-path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import webpack from 'webpack'
import { context } from '../entry'

const tsconfig = `${appRoot}/.tsconfig.json`
const tslint = `${appRoot}/.tslint.json`

const Loaders = {
  test: /\.(tsx|ts)$/,
  enforce: 'pre',
  exclude: [/node_modules\/\*\*/],
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
  },],
}

const plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin({
    async: true,
    formatter: 'codeframe',
    formatterOptions: {
      highlightCode: true,
      lineAbove: 3,
      lineBelow: 3,
      forceColor: true,
    },
    measureCompilationTime: true,
    tsconfig: tsconfig,
    tslint: tslint,
    tslintAutoFix: true,
    watch: context
  })
]

const rules = [Loaders]

export {
  Loaders,
  plugins
}

export default {
  module: {
    rules
  },
  plugins
}
