import { path as root } from 'app-root-path';

import CleanWebpackPlugin from 'clean-webpack-plugin';

import { Args } from '!/Utilities';

import { srcRoot as outputSrcRoot, tmpRoot } from './output';

const config = {
    plugins : [
        new CleanWebpackPlugin([
            tmpRoot,
            outputSrcRoot
        ], {
            allowExternal: false,
            beforeEmit: false,
            verbose: Args.verbose,

            root
        })
    ]
};

export default config;
