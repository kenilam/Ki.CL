'use strict';

import path from 'path';

import gulp from 'gulp';

import del from 'del';
import vinylPaths from 'vinyl-paths';

const taskName = 'app.cleanup';

let src = [
	'./**/*.{html,css,js,eot,svg,ttf,woff,woff2,jpg,jpeg,gif,png}',
	'!./lib/**/*',
];

class Cleanup {
	constructor () {
		gulp.task(taskName, this.task.bind(this));

		this.taskName = taskName;
	}

	task () {
		return gulp.src(src, {read: false, cwd : './project/dev/' }).pipe(vinylPaths(del));
	}
}

export default new Cleanup();