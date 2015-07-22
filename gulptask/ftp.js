'use strict'

module.exports.ftp = function (project) {
	var taskName = project + '.ftp',

		gulp = require('gulp'),
		gutil = require('gulp-util'),
		ftp = require('gulp-sftp'),

		secret = require(appRoot + '/project/' + project + '/secret.json'),

		logger = require('logger').createLogger(),

		debug = require('gulp-debug'),

		fn = {
			ftp : function (setting) {
				config = setting;

				return ftp(config);
			},

			complete : function () {
				console.log('');
				console.log('==== ==== ====');
				logger.info();
				console.log("Server Name:", config.host);
				console.log("Remote Path:", config.remotePath)
				console.log('==== ==== ====');
				console.log('');

				return gutil.noop();
			}
		},

		config = {};

	gulp.task(taskName, function () {
		return gulp.src('./project/' + project + '/build/*')
			.pipe(fn.ftp(require(appRoot + '/project/' + project + '/secret.json').ftp))
			.pipe(fn.complete());
	});

	return taskName;
}