'use strict'

module.exports.init = function (project) {
	var taskName = project + '.init',

		gulp = require('gulp'),
		
		bower = require(appRoot + '/gulptask/bower').bower(),
		library = require(appRoot + '/gulptask/library').library(project, [bower]);

	gulp.task(taskName, [library]);

	return taskName;
}