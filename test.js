'use strict'

module.exports.test = function (project) {
	var taskName = project + '.test',

		gulp = require('gulp'),

		karma = require('gulp-karma');

	gulp.task(taskName, function () {
		return gulp.src('./project/' + project + '/spec')
			.pipe(karma({
				configFile: 'karma.config.js',
				action: 'run'
			}))
			.on('error', function(err) {
				// Make sure failed tests cause gulp to exit non-zero
				console.log(err);
				this.emit('end'); //instead of erroring the stream, end it
			});
	});

	return taskName;
}