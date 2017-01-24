'use strict';

import gulp from 'gulp';
import gulpBower from 'gulp-bower';

const taskName = 'bower';

class Bower {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		return gulpBower()
	}
}

export default new Bower();