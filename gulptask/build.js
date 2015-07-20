'use strict'

module.exports.build = function (project) {
	var taskName = project + '.build',

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		rename = require('gulp-rename'),
		
		compile = require(appRoot + '/gulptask/compile').compile(project),
		
		bundlify = require(appRoot + '/gulptask/bundlify').bundlify(project),

		file = {
			JSON : './project/' + project + '/src/**/*.json',
			font : './project/' + project + '/src/**/*.{eot,svg,ttf,woff,woff2,otf}',
			image : './project/' + project + '/src/**/*.{png,jpg,gif,ico}'
		},

		destination = {
			JSON : './project/' + project + '/build',
			font : './project/' + project + '/build',
			image : './project/' + project + '/build'
		},

		fn = {
			copy : function (extension) {
				var name = taskName + '.copy.' + extension;

				gulp.task(taskName + '.copy.' + extension, [taskName + '.clean'], function () {
					return gulp.src(file[extension])
						.pipe(rename(function (file) {
							file.dirname = file.dirname.replace('css', '');
						}))
						.pipe(gulp.dest(destination[extension]));
				})

				return name;
			}
		},
		dependencies = [];

	for (var extension in destination) {
		dependencies.push(fn.copy(extension));
	}

	gulp.task(taskName + '.clean', function () {
		return gulp.src('./project/' + project + '/build').pipe(vinylPaths(del));
	});

	gulp.task(taskName + '.copy', dependencies);

	gulp.task(taskName, [taskName + '.copy', compile], function () {
		return gulp.start(bundlify);
	});

	return taskName;
}