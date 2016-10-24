'use strict';

import browserSync from 'browser-sync';

import gulp from 'gulp';

const taskName = 'browser';

const watchSrc = [
	'./project/dev/**/*.{html,js}'
];

const config = {
	logPrefix : 'Ki.CL',
	port : 3021,
	server : {
		baseDir : './project/dev'
	},
	ui : {
		port : 3022,
		weinre : {
			port : 3023
		}
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