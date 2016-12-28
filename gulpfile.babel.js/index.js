'use strict';

import path from 'path';

import sequence from 'run-sequence';

import g from 'gulp';

import gulpHelper from 'gulp-help';

import app from './tasks/app';
import bower from './tasks/bower';
import browser from './tasks/browser';
import inject from './tasks/inject';
import lib from './tasks/lib';
import watch from './tasks/watch';

class Gulpfile {
	constructor () {
		global.appRoot = path.resolve(`${__dirname}/../`);

		process.stdout.setMaxListeners(Infinity);
		
		this.init();
	}

	init () {
		const gulp = gulpHelper(g);

		gulp.Gulp.prototype.run = sequence;

		gulp.task('init', callback => {
			return gulp.run(bower.taskName, lib.taskName, callback);
		});

		gulp.task('dev', callback => {
			process.env.mode = 'dev';
			return gulp.run(app.taskName, inject.taskName, callback);
		});

		gulp.task('default', callback => {
			return gulp.run(
				'init',
				'app.compile.bundle.cleanup',
				'dev',
				(new browser()).taskName,
				watch.taskName,
				callback
			);
		});
	}
}

export default new Gulpfile();