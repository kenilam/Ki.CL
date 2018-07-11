import { BabelLoader, EsLintLoader } from './production';

BabelLoader.use[0].options.plugins = ['react-hot-loader/babel'];

const config = {
    module: {
        rules: [BabelLoader, EsLintLoader]
    }
};

export default config;
