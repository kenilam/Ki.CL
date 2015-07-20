'use strict'

module.exports.bower = function () {
	var taskName = 'bower',

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),
		
		bower = require('gulp-bower');

	gulp.task(taskName + '.clean', function () {
		return gulp.src('./bower_components').pipe(vinylPaths(del));
	});

	gulp.task(taskName + '.get', [taskName + '.clean'], function () {
		return bower();
	});

	gulp.task(taskName, [taskName + '.get']);

	return taskName;
}