'use strict';

import gulp from 'gulp';

import Copy from './lib.copy';
import Cleanup from './lib.cleanup';

const taskName = 'lib.plugin';

const src = ['./plugin/**/*'];

class Plugin {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;

		this.copy = new Copy('plugin', gulp.src(src));
		this.cleanup = new Cleanup('plugin');

		gulp.task(this.taskName, callback => {
			gulp.run(this.cleanup.taskName, this.copy.taskName, callback);
		});
	}
}

export default new Plugin();