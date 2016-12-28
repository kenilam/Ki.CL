'use strict';

import browserSync from 'browser-sync';

import gulp from 'gulp';

const taskName = 'browser';

const config = {
	logPrefix : 'Ki.CL',
	port : 3021,
	server : {
		baseDir : './project/dev'
	},
	socket: {
		namespace: '/sockets'
	},
	plugins: ['bs-fullscreen-message'],
	ui : {
		port : 3022,
		weinre : {
			port : 3023
		}
	}
};

class Browser {
	constructor () {
		gulp.task(taskName, Browser.task);

		this.taskName = taskName;
	}

	static instance () {
		return browserSync;
	}

	static task () {
		Browser.instance().init(config);
	}
}

export default Browser;