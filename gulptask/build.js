'use strict'

module.exports.build = function (project) {
	var taskName = project + '.build',

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		rename = require('gulp-rename'),

		modify = require('gulp-modify'),
		
		compile = require(appRoot + '/gulptask/compile').compile(project),
		
		bundlify = require(appRoot + '/gulptask/bundlify').bundlify(project, [taskName + '.clean', compile]),

		file = {
			JSON : './project/' + project + '/mock/**/*.json',
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

				if (extension === 'JSON') {
					return fn.compileJSON();
				}

				gulp.task(taskName + '.copy.' + extension, [taskName + '.clean'], function () {
					return gulp.src(file[extension])
						.pipe(rename(function (file) {
							file.dirname = file.dirname.replace('css', '');

							if (file.dirname.indexOf('fonts') > -1) {
								file.dirname = 'fonts';
							}
						}))
						.pipe(gulp.dest(destination[extension]));
				})

				return name;
			},
			compileJSON : function () {
				var name = taskName + '.copy.JSON';

				gulp.task(taskName + '.copy.JSON', [taskName + '.clean'], function () {
					var api = require(appRoot + '/project/' + project + '/secret.json').api;

					return gulp.src(file.JSON)
						.pipe(modify({
							fileModifier : function (file, content) {
								var name, value;

								for (name in api) {
									for (value in api[name]) {
										var regex = new RegExp('{{' + value + '}}', 'g');
										content = content.replace(regex, api[name][value]).replace(/.json/g, '');
									}
								}

								return content;
							}
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
	
	dependencies.push(bundlify);

	gulp.task(taskName, dependencies);

	return taskName;
}