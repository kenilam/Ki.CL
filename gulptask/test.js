'use strict'

module.exports.test = function (project) {
	var taskName = project + '.test',

		gulp = require('gulp'),

		karma = require('gulp-karma'),

		debug = require('gulp-debug'),

		config = require(appRoot + '/project/' + project + '/config.json').karma;

    for (var i = 0, l = config.files.length; i < l; i ++) {
        config.files[i] = appRoot + '/project/' + project + '/' + config.files[i];
    }

	config.files.push(appRoot + '/project/' + project + '/spec/app/app.js');
	config.files.push(appRoot + '/project/' + project + '/spec/app/**/*.js');

	gulp.task(taskName, function () {
		return gulp.src(config.files)
			.pipe(karma({
				configFile : 'karma.config.js',
				action : 'watch'
			}))
			.on('error', function(err) {
				// Make sure failed tests cause gulp to exit non-zero
				console.log(err);
				this.emit('end'); //instead of erroring the stream, end it
			});
	});

	return taskName;
}