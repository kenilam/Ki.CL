'use strict';

import gulp from 'gulp';

import cleanup from './app.cleanup';
import copy from './app.copy';
import compile from './app.compile';

const taskName = 'app';

class App {
	constructor () {
		gulp.task(taskName, [cleanup.taskName], this.task);

		this.taskName = taskName;
	}

	task (callback) {
		return gulp.run(copy.taskName, compile.taskName, callback);
	}
}

export default new App();