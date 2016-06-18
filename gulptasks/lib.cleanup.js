'use strict';

import path from 'path';

import gulp from 'gulp';

import del from 'del';
import vinylPaths from 'vinyl-paths';

const taskName = 'lib.{type}.cleanup';

const src = ['project/src/lib/{type}', 'project/dev/lib/{type}'];

class Cleanup {
	constructor (type) {
		this.taskName = taskName.replace('{type}', type);
		this.type = type;
		this.src = src.map(srcPath => {
			return srcPath.replace('{type}', type);
		});

		gulp.task(this.taskName, this.task.bind(this));
	}

	task () {
		return gulp.src(this.src, {read: false}).pipe(vinylPaths(del));
	}
}

export default Cleanup;