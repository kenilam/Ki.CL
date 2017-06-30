'use strict';

const browserSync = require('browser-sync');
const compression = require('compression');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const packageJSON = require('./package');

class App {
    constructor () {
        this.run = this.run.bind(this);
        this.server = this.server.bind(this);

        this.run();
        this.server();
    }

    server () {
        if (this.browser) {
            return;
        }

        this.browser = browserSync.create(packageJSON.description);

        this.browser.init({
            server : 'project/dev',
            port : '3021',
            logLevel : 'warn',
            logPrefix : packageJSON.description,

            middleware : [
                webpackDevMiddleware(this.bundler, {
                    publicPath: config.output.publicPath,
                    stats: { colors: true }
                }),

                webpackHotMiddleware(this.bundler),

                compression()
            ],

            files: ['project/dev/**/*.css', 'project/dev/**/*.html']
        });
    }

    run () {
        this.bundler = webpack(config);

        this.bundler.run((err, stats) => {
            if (err) {
                throw new Error(`[${packageJson.description}:build]`, err);
            }

            console.log(`[${packageJSON.description}:build]`, stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }));
        });
    }
}

module.exports = new App();