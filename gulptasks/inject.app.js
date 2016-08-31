'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import transform from './inject.transform';

const src = [
	'./**/*.{js,css}',
	'!./lib/**/*.{js,css}'
];

class Inject {
	constructor () {
		return this.inject.bind(this);
	}

	inject () {
		return gulpInject(
			gulp.src(src, { read : false, cwd : './project/dev/' }),
			{ name: 'app', transform: transform }
		);
	}
}

export default new Inject();