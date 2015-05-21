'use strict';
module.exports.src = function (project, dependentTasks, gulp) {
	if (!gulp) {
		gulp = require('gulp');
	}

	var taskName = project + '.src',

		del = require('del'),
		vinylPaths = require('vinyl-paths'),
		bower = require('gulp-bower'),

		root = './project/' + project,
		src = root + '/src',
		dev =  root + '/dev',
		build =  root + '/build',

		libTasks = require('../gulptask/library').library(project, root + '/src', dependentTasks); // gulp [project].library

	gulp.task(taskName, [
		libTasks
	], function () {
		return gulp.src([dev, build]).pipe(vinylPaths(del));
	});

	gulp.task(taskName + '.noclean', [
		libTasks
	]);

	return taskName;
};
