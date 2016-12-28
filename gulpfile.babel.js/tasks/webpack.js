'use strict';

import webpack from 'webpack';
import stripAnsi from 'strip-ansi';

import browser from './browser';

import webpackConfig from '../../webpack.config';

const dest = '/project/dev/';

const entry = './project/src/app.js';
const output = 'app.bundle.js';

class Webpack {
	constructor () {}

	static done (stats) {
		if (
			Boolean(stats.hasErrors() || stats.hasWarnings()) &&
			browser.instance().sockets
		) {
			return browser.instance().sockets.emit('fullscreen:message', {
				title: "Webpack Error:",
				body:  stripAnsi(stats.toString()),
				timeout: 100000
			});
		}

		browser.instance().reload();
	}

	complete (callback) {
		return (error) => {
			if (error) {
				callback(error);
				return;
			}
			
			callback();
		}
	}

	compile (callback) {
		webpackConfig.entry = [entry];

		webpackConfig.output = {
			path : `${global.appRoot}${dest}`,
			filename : output
		};

		global.webpack = webpack(webpackConfig, this.complete(callback));
		global.webpack.plugin('done', Webpack.done);
	}
}

export default new Webpack();