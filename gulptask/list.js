'use strict'

module.exports.list = function () {
	var taskName = 'list',
		
		gulp = require('gulp'),
		
		tasklisting = require('gulp-task-listing');

	gulp.task(taskName, tasklisting.withFilters(function(task) {
	    return task.indexOf('.') > -1;
	}));

	return taskName;
}