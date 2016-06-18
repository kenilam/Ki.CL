'use strict';

import gulp from 'gulp';

import gulpFilter from 'gulp-filter';

import mainBowerFiles from 'gulp-main-bower-files';

import Copy from './lib.copy';
import Cleanup from './lib.cleanup';

import config from '../config';

const taskName = 'lib.bower';

const src = './bower.json';

const bowerSrc = gulp.src(src)
	.pipe(mainBowerFiles(config.bower))
	.pipe(gulpFilter(config.filter.bower));

class Bower {
	constructor () {
		this.taskName = taskName;

		this.copy = new Copy('bower', bowerSrc);
		this.cleanup = new Cleanup('bower');

		gulp.task(this.taskName, callback => {
			gulp.run(this.cleanup.taskName, this.copy.taskName, callback);
		});
	}
}

export default new Bower();