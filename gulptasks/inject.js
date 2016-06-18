'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import injectIndex from './inject.index';

const taskName = 'inject';

class Inject {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task (callback) {
		return gulp.run(injectIndex.taskName, callback)
	}
}

export default new Inject();