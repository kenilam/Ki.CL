'use strict';

import sass from 'gulp-sass';

import errorHandler from './errorHandler';

const settings = {
	includePaths: [
		'./project/src',
		'./project/src/lib/bower',
		'./project/src/lib/plugin',
	],
	outputStyle: 'compressed',
	sourceMap: true,
	compressed: true,
	errLogToConsole: true,
	precision: 2
};

class Compile {
	constructor () {
		return this.compile.bind(this);
	}

	compile () {
		return sass.sync(settings).on('error', errorHandler.notify());
	}
}

export default new Compile();