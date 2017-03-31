'use strict';

import gulp from 'gulp';

import debug from 'gulp-debug';

import App from './inject.app';
import AppGlobal from './inject.app.global';
import AppPriority from './inject.app.priority';
import Bower from './inject.bower';
import Browser from './browser';
import Priority from './inject.priority';

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
			.pipe(App.tag())
			.pipe(AppGlobal.tag())
			.pipe(AppPriority.tag())
			.pipe(Bower.tag())
			.pipe(Priority.tag())
			.pipe(gulp.dest(dest))
			.on('end', Browser.instance().reload);
	}
}

export default new Inject();