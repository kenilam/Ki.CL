'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';

import gulpCached from 'gulp-cached';
import gulpChanged from 'gulp-changed';
import gulpSourcemaps from 'gulp-sourcemaps';

import sass from './sass';

const config = {
	errLogToConsole: true
}

const taskName = 'app.compile.scss';
const lintTaskName = [taskName, 'lint'].join('.');

const src = [
	'./project/src/**/*.scss',
	'!./project/src/lib/**/*.scss'
]

const dest = './project/dev';

class Compile {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		return gulp.src(src)
			.pipe(gulpSourcemaps.init())
			.pipe(sass(config))
			.pipe(gulpSourcemaps.write())
			.pipe(gulp.dest(dest));
	}
}

export default new Compile();