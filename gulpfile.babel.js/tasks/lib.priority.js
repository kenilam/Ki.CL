'use strict';

import gulp from 'gulp';

import gulpFilter from 'gulp-filter';

import mainBowerFiles from 'gulp-main-bower-files';

import Copy from './lib.copy';
import Cleanup from './lib.cleanup';

import config from '../../config';

const taskName = 'lib.priority';

const src = './bower.json';

class Priority {
	constructor () {
		this.taskName = taskName;

		this.bowerSrc = gulp.src(src)
			.pipe(mainBowerFiles(config.bower))
			.pipe(gulpFilter(config.filter.priority));

		this.copy = new Copy('priority', this.bowerSrc);
		this.cleanup = new Cleanup('priority');

		gulp.task(this.taskName, callback => {
			gulp.run(this.cleanup.taskName, this.copy.taskName, callback);
		});
	}
}

export default new Priority();