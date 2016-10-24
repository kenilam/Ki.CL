'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import debug from 'gulp-debug';

import transform from './inject.transform';

const src = [
	'./lib/priority/**/*.{js,css}'
];

class Inject {
	constructor () {
		return this.inject.bind(this);
	}

	inject () {
		return gulpInject(
			gulp.src(src, { read: false, cwd : './project/dev/' }),
			{ name: 'priority', transform: transform }
		);
	}
}

export default new Inject();