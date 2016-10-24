'use strict';

import sass from 'gulp-sass';

import errorHandler from './errorHandler';

import config from '../../config';

class Compile {
	constructor () {
		return this.compile.bind(this);
	}

	compile () {
		return sass.sync(config.sass).on('error', errorHandler.notify());
	}
}

export default new Compile();
export { config as config };