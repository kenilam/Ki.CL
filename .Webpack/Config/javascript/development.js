import { path as appRoot } from 'app-root-path';

import { BabelLoader, EsLintLoader } from './production';

BabelLoader.use[0].options.plugins = ['react-hot-loader/babel'];

// EsLintLoader.options.fix = false;

const config = {
    module: {
        rules: [BabelLoader, EsLintLoader]
    }
};

export default config;
