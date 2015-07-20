'use strict'

module.exports.dev = function (project) {
	var taskName = project + '.dev',

		gulp = require('gulp'),
		
		compile = require(appRoot + '/gulptask/compile').compile(project);

	gulp.task(taskName, [compile]);

	return taskName;
}