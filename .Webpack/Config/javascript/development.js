import { BabelLoader, EsLintLoader } from './production';

BabelLoader.use[0].options.plugins = ['react-hot-loader/babel'];

// EsLintLoader.options.fix = false;

const rules = [BabelLoader, EsLintLoader];

export default {
    module: { rules }
};
