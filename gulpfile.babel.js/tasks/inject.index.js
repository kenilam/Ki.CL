'use strict';

import gulp from 'gulp';

import appSources from './inject.app';
import appGlobalSources from './inject.app.global';
import appPrioritySources from './inject.app.priority';
import bowerSources from './inject.bower';
import prioritySources from './inject.priority';

const taskName = 'inject.index';
const src = [
	'./project/src/index.html'
];

const dest = './project/dev';

class Inject {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		return gulp.src(src)
			.pipe(appSources())
			.pipe(appGlobalSources())
			.pipe(appPrioritySources())
			.pipe(bowerSources())
			.pipe(prioritySources())
			.pipe(gulp.dest(dest));
	}
}

export default new Inject();