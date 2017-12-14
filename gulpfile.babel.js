'use strict';

import browser from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import gulp from 'gulp';
import sequence from 'run-sequence';
import webpack from 'webpack';
import stream from 'webpack-stream';

import config from './webpack.config';

const bundler = webpack(config);

class Gulpfile {
	constructor () {
		gulp.task('build',
			() => gulp.src('src/App.jsx')
				.pipe(stream(config, webpack))
				.pipe(gulp.dest('project/dev'))
		);

		gulp.task('browser',
			() => {
				browser.init({
					server : {
						baseDir : [ config.output.publicPath ]
					},
					middleware : [
						webpackDevMiddleware(bundler, {
							publicPath : config.output.publicPath,
							stats : { colors: true }
						}),
						webpackHotMiddleware(bundler)
					]
				})
			}
		)

		gulp.task('default',
			() => sequence('browser')
		)
	}
}

export default new Gulpfile();