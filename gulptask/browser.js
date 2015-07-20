'use strict'

module.exports.browser = function (project, env, middleware, whenSync) {
	var taskName = project + '.' + env + '.browser',

		gulp = require('gulp'),
		browserSync = require('browser-sync').create(),

		fn = {
			browser : function () {
				browserSync.init(config.browser);

				if (whenSync) {
					whenSync(browserSync);
				}
			}
		},

		config = {
			browser : {
				port: 8081,
				server: {
					baseDir: './project/' + project + '/' + env,
					middleware: middleware
				}
			}
		};

	gulp.task(taskName, fn.browser);

	return taskName;
}