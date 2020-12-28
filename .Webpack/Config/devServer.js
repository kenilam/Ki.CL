import { Args, Env, IsProd } from '!/Utilities';
import open from 'open';
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

const contentBase = [assetPath].map((path) => `${path}/`);

const devServer = {
  clientLogLevel: 'error',
  https: false,
  hot: true,
  inline: true,
  open: !Args.noBrowser,
  openPage: '',
  overlay: {
    warnings: false,
    errors: true,
  },
  historyApiFallback: true,

  progress: true,
  publicPath: `${HOST}:${PORT}${publicPath}`,
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/
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
  new webpack.EvalSourceMapDevToolPlugin({ append: false }),
];

if (Args.verbose && !IsProd) {
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
  plugins,
};
