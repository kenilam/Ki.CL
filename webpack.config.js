'use strict';

import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const config = {
	devtool : 'source-map',
	watch : false,
	plugins : [
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
	],
	module : {
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

export default config;