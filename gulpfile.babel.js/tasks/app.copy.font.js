'use strict';

import gulp from 'gulp';

const taskName = 'app.copy.component.font';

const src = [
	'./project/src/**/*.{eot,svg,ttf,woff,woff2}'
];

const dest = './project/dev';

class Copy {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		return gulp.src(src).pipe(gulp.dest(dest));
	}
}

export default new Copy();