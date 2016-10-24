'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import debug from 'gulp-debug';

import transform from './inject.transform';

const src = [
	'./lib/app/**/*',
	'!./lib/app/priority/**/*'
];

class Inject {
	constructor () {
		return this.inject.bind(this);
	}

	inject () {
		return gulpInject(
			gulp.src(src, { read: false, cwd : './project/dev/' }),
			{ name: 'app.global', transform: transform }
		);
	}
}

export default new Inject();