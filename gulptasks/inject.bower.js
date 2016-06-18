'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import debug from 'gulp-debug';

import transform from './inject.transform';

const src = [
	'./project/dev/lib/bower/**/*.{js,css}'
];

class Inject {
	constructor () {
		return this.inject.bind(this);
	}

	inject () {
		return gulpInject(
			gulp.src(src, { read: false }),
			{ name: 'lib', transform: transform }
		);
	}
}

export default new Inject();