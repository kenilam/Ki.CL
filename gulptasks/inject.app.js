'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import transform from './inject.transform';

class Inject {
	constructor () {
		return this.inject.bind(this);
	}

	inject () {
		return gulpInject(
			gulp.src([
				'./project/dev/**/*.{js,css}',
				'!./project/dev/lib/**/*.{js,css}'
			], { read: false }),
			{ name: 'app', transform: transform }
		);
	}
}

export default new Inject();