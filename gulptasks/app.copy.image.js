'use strict';

import gulp from 'gulp';

const taskName = 'app.copy.component.image';

const src = [
	'./project/src/**/*.{jpg,jpeg,gif,png}'
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