'use strict';

import gulp from 'gulp';

import appSources from './inject.app';
import bowerSources from './inject.bower';
import prioritySources from './inject.priority';
import pluginSources from './inject.plugin';

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
			.pipe(prioritySources())
			.pipe(bowerSources())
			.pipe(pluginSources())
			.pipe(gulp.dest(dest));
	}
}

export default new Inject();