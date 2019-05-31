import { Args } from '!/Utilities'
import config from '^/ki-cl.config'
import open from 'opn'
import remotedev from 'remotedev-server'
import webpack from 'webpack'
import { srcRoot as assetPath } from './asset'
import { srcRoot as contentPath } from './content'
import { publicPath } from './output'

const {
  host,
  port
} = config.localhost

const stats = {
  all: false,
  cached: true,
  cachedAssets: true,
  chunks: true,
  colors: true,
  depth: true,
  entrypoints: true,
  env: true,
  errors: true,
  errorDetails: true,
  hash: true,
  performance: true,
  providedExports: true,
  publicPath: true,
  reasons: true,
  timings: true,
  version: true,
  warnings: true,
}

const optimization = {
  namedModules: true,
  noEmitOnErrors: true,
  occurrenceOrder: true,
}

const contentBase = [assetPath, contentPath].map(path => `${path}/`)

const devServer = {
  hot: true,
  inline: true,
  open: !Args.noBrowser,
  openPage: '',
  overlay: {
    warnings: true,
    errors: true,
  },
  progress: true,
  publicPath: `${host}:${port}${publicPath}`,
  watchContentBase: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
  },
  
  contentBase,
  port,
  stats,
}

remotedev({
  name: 'channel',
  realtime: true,
  port: 5000
})

function browser () {
  open(`${host}:${port}`)
}

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.EvalSourceMapDevToolPlugin(),
]

export {
  browser,
  devServer
}

export default {
  cache: true,
  devServer,
  devtool: false,
  optimization,
  // output,
  plugins,
}
