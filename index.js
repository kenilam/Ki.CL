'use strict';

import webpack from 'webpack';
import config from './webpack.config';

class App {
    constructor () {
        App.run();
    }

    static run () {
        webpack(config, (err, stats) => {
            if (err) {
                throw new Error('webpack:build', err);
            }

            console.log('[webpack:build]', stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }));
        });
    }
}

export default new App();