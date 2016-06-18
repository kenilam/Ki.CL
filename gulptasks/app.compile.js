'use strict';

import gulp from 'gulp';

import bundle from './app.compile.bundle';
import scss from './app.compile.scss';

const taskName = 'app.compile';

class Compile {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task (callback) {
		return gulp.run(scss.taskName, bundle.taskName, callback);
	}
}

export default new Compile();