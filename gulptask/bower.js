'use strict';
module.exports.bower = function (gulp) {
	var taskName = 'bower',

		bower = require('gulp-bower'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),
		bowerSrc = require('gulp-bower-src');

	if (!gulp) {
		gulp = require('gulp');
	}

	gulp.task('bower.clean', function () {
		return function () {
			try {
				return bowerSrc().pipe(vinylPaths(del));
			} catch (e) {
				return true;
			}
		}
	});

	gulp.task(taskName + '.get', ['bower.clean'], function () {
		return bower();
	});

	gulp.task(taskName, ['bower.clean', 'bower.get']);

	return taskName;
};
