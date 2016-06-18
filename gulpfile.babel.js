import g from 'gulp';

import gulpHelper from 'gulp-help';

import app from './gulptasks/app';
import bower from './gulptasks/bower';
import browser from './gulptasks/browser';
import inject from './gulptasks/inject';
import lib from './gulptasks/lib';
import watch from './gulptasks/watch';

const gulp = gulpHelper(g);

global.appRoot = require('path').resolve(__dirname);

gulp.Gulp.prototype.run = require('run-sequence');

gulp.task('init', callback => {
	return gulp.run(bower.taskName, lib.taskName, callback);
});

gulp.task('dev', callback => {
	return gulp.run(app.taskName, inject.taskName, callback);
});

gulp.task('default', callback => {
	return gulp.run('init', 'dev', browser.taskName, watch.taskName, callback);
});