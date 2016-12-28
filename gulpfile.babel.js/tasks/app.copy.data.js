'use strict';

import gulp from 'gulp';

import gulpJSONminify from 'gulp-jsonminify';

const taskName = 'app.copy.component.data';

const src = [
	'./project/src/**/*.json',
	'!./project/src/{lib}/**/*.json'
];

const dest = './project/dev';

class Copy {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		return gulp.src(src)
			.pipe(gulpJSONminify())
			.pipe(gulp.dest(dest));
	}
}

export default new Copy();