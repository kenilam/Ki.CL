'use strict'

module.exports.template = function (project) {
	var taskName = project + '.template',

		gulp = require('gulp'),

		fs = require('fs'),
		
		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		template = require('gulp-templatecache'),

		watch = require('gulp-watch'),

		changed = require('gulp-changed'),

		debug = require('gulp-debug'),

		file = {
			template : [
				'./project/' + project + '/src/**/**/*.html',
				'!./project/' + project + '/src/index.html'
			]
		},

		config = {
			template : {
				output: 'run.template.js',
				strip: appRoot + '/project/' + project + '/src/',
				minify: {},
				moduleName: project
			}
		},

		destination = {
			template : './project/' + project + '/dev/automation'
		},

		fn = {
			clean: function () {
				var des = [];

				if (fs.existsSync(appRoot + destination.template.substr(1))) {
					des.push(destination.template);
				}
				
				return gulp.src(des).pipe(vinylPaths(del));
			},
			template: function () {
				return gulp.src(file.template)
					.pipe(template(config.template))
					.pipe(gulp.dest(destination.template));
			}
		}

	gulp.task(taskName + '.clean', fn.clean);

	gulp.task(taskName, fn.template);

	return taskName;
}