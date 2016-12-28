'use strict';

import browser from './browser';

import gulp from 'gulp';

import changedInPlace from 'gulp-changed-in-place';
import gulpSourcemaps from 'gulp-sourcemaps';

import sass from './sass';

const taskName = 'app.compile.scss';

const src = [
	'./project/src/**/*.scss',
	'!./project/src/**/_*.scss'
];

const allSrc = [
	'./project/src/**/*.scss'
];

const dest = './project/dev';

class Compile {
	constructor () {
		gulp.task(taskName, this.task.bind(this));

		gulp.task(taskName.replace('scss', 'all.scss'), this.all.bind(this));

		this.taskName = taskName;
	}

	all () {
		return gulp.src(allSrc)
			.pipe(gulpSourcemaps.init())
			.pipe(sass())
			.pipe(gulpSourcemaps.write())
			.pipe(gulp.dest(dest))
			.pipe(browser.instance().stream());
	}

	task () {
		return gulp.src(src)
			.pipe(changedInPlace({ firstPass : true }))
			.pipe(gulpSourcemaps.init())
			.pipe(sass())
			.pipe(gulpSourcemaps.write())
			.pipe(gulp.dest(dest))
			.pipe(browser.instance().stream());
	}
}

export default new Compile();