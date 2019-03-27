import { BabelLoader, EsLintLoader, TsLoader, TsLintLoader, plugins } from './production';

BabelLoader.use[0].options.plugins = ['react-hot-loader/babel'];

// EsLintLoader.options.fix = false;

const rules = [BabelLoader, EsLintLoader, TsLoader, TsLintLoader];

export default {
  module: { rules },
  plugins,
};
