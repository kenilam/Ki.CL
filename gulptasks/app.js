'use strict';

import gulp from 'gulp';

import compile from './app.compile';

const taskName = 'app';

class App {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task (callback) {
		return gulp.run(compile.taskName, callback);
	}
}

export default new App();