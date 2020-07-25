import { Args, Env } from '!/Utilities';
import open from 'opn';
import webpack from 'webpack';
import { srcRoot as assetPath } from './asset';
import { publicPath } from './output';

const { HOST, PORT } = Env;

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
};

const optimization = {
  namedModules: true,
  noEmitOnErrors: true,
  occurrenceOrder: true,
};

const contentBase = [assetPath].map((path) => `${path}/`);

const devServer = {
  https: true,
  hot: true,
  inline: true,
  open: !Args.noBrowser,
  openPage: '',
  overlay: {
    warnings: true,
    errors: true,
  },
  progress: true,
  publicPath: `${HOST}:${PORT}${publicPath}`,
  watchContentBase: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
  },

  contentBase,
  port: PORT,
  stats,
};

function browser() {
  open(`${HOST}:${PORT}`);
}

const plugins = [
  new webpack.HotModuleReplacementPlugin({ multiStep: true }),
  new webpack.EvalSourceMapDevToolPlugin(),
];

if (Args.verbose && process.env.NODE_ENV === 'development') {
  console.log('');
  console.log('Dev Server launching with below from .env');
  console.log(Env);
  console.log('');
}

export { browser, devServer };

export default {
  cache: true,
  devServer,
  devtool: false,
  optimization,
  // output,
  plugins,
};
