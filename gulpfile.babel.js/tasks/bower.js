'use strict';

import fs from 'fs';

import gulp from 'gulp';
import gulpBower from 'gulp-bower';

const taskName = 'bower';

class Bower {
	constructor () {
		if (!fs.existsSync('./bower_components')){
			fs.mkdirSync('./bower_components');
		}

		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		return gulpBower()
	}
}

export default new Bower();