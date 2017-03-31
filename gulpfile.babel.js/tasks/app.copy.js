'use strict';

import gulp from 'gulp';

import data from './app.copy.data';
import font from './app.copy.font';
import image from './app.copy.image';

const taskName = 'app.copy';

class Copy {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task (callback) {
		return gulp.run([data.taskName, font.taskName, image.taskName], callback);
	}
}

export default new Copy();