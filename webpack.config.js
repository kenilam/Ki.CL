'use strict';

import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

class Config {
	constructor () {
		this.devtool = 'source-map';

		this.watch = false;
		
		this.output = {
			path : '/',
			filename : 'app.js'
		};

		this.plugins = [
			new BrowserSyncPlugin(
				// BrowserSync options
				{
					// browse to http://localhost:3000/ during development
					host: 'localhost',
					port: 3021
				},
				// plugin options
				{
					// prevent BrowserSync from reloading the page
					// and let Webpack Dev Server take care of this
					reload: false
				}
			)
		];
		
		this.module = {
			loaders: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel',
					query: {
						presets: ['react']
					}
				}
			]
		}
	}
}

export default new Config();