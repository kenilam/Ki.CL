'use strict';

import gulp from 'gulp';

import bundle from './app.compile.bundle';
import php from './app.compile.php';
import scss from './app.compile.scss';

const taskName = 'app.compile';

class Compile {
	constructor () {
		gulp.task(taskName, Compile.task);

		this.taskName = taskName;
	}

	static task (callback) {
		return gulp.run(bundle.taskName, php.taskName, scss.taskName, callback);
	}
}

export default new Compile();