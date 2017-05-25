'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');

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

module.exports = new App();