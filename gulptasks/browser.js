'use strict';

import browserSync from 'browser-sync';

import gulp from 'gulp';

const taskName = 'browser';

const watchSrc = [
	'./project/dev/**/*.{html,js}'
];

const config = {
	server: {
		baseDir: "./project/dev"
	}
};

global.browserSync = browserSync;

class Browser {
	constructor () {
		gulp.task(taskName, this.task);

		this.taskName = taskName;
	}

	task () {
		global.browserSync.init(config);

		gulp.watch(watchSrc).on('change', browserSync.reload);
	}
}

export default new Browser();