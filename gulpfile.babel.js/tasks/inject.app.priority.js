'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import transform from './inject.transform';

const src = [
	'./lib/app/priority/**/*'
];

class Inject {
	constructor () {
		return this.inject.bind(this);
	}

	inject () {
		return gulpInject(
			gulp.src(src, { read: false, cwd : './project/dev/' }),
			{ name: 'app.priority', transform: transform }
		);
	}
}

export default new Inject();