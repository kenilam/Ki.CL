'use strict';

import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import errorHandler from './errorHandler';

const config = {
	devtool: 'source-map',
	// watch: true,
	output: {},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel', // 'babel-loader' is also a valid name to reference
			query: {
				presets: ['react']
			}
		}]
	}
}

class Webpack {
	constructor () {
		return this.compile.bind(this);
	}

	compile (entry, output) {
		config.output.filename = output;

		return gulp.src(entry)
			.pipe(webpackStream(config, webpack))
			.on('error', errorHandler.notify())
            .pipe(errorHandler.plumber());
	}
}

export default new Webpack();