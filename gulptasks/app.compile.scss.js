'use strict';
import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';

import gulpChanged from 'gulp-changed';
import gulpSourcemaps from 'gulp-sourcemaps';

import sass from './sass';

const taskName = 'app.compile.scss';
const lintTaskName = [taskName, 'lint'].join('.');

const src = [
	'./project/src/**/*.scss',
	'!./project/src/**/_*.scss'
]

const importSrc = [
	'./project/src/**/*.scss'
]

const dest = './project/dev';

class Compile {
	constructor () {
		gulp.task(taskName, this.task.bind(this));

		gulp.task(taskName.replace('scss', 'all.scss'), this.all.bind(this));

		this.taskName = taskName;
	}

	all () {
		return gulp.src(importSrc)
			.pipe(gulpSourcemaps.init())
			.pipe(sass())
			.pipe(gulpSourcemaps.write())
			.pipe(gulp.dest(dest))
			.pipe(global.browserSync.stream());
	}

	task () {
		return gulp.src(src)
			.pipe(gulpSourcemaps.init())
			.pipe(sass())
			.pipe(gulpSourcemaps.write())
			.pipe(gulpChanged(dest))
			.pipe(gulp.dest(dest))
			.pipe(global.browserSync.stream());
	}
}

export default new Compile();