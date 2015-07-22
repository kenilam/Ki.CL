'use strict'

module.exports.watch = function (project, whenChange) {
	var taskName = project + '.watch',

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		watch = require('gulp-watch'),
		changed = require('gulp-changed'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),

		logger = require('logger').createLogger(),

		jshint = require(appRoot + '/gulptask/jshint').jshint(project),
		
		template = require(appRoot + '/gulptask/template').template(project),

		error = require(appRoot + '/gulptask/error'),

		debug = require('gulp-debug'),

		file = {
			HTML : './project/' + project + '/src/index.html',
			JS : './project/' + project + '/src/**/*.js',
			CSS : './project/' + project + '/src/**/*.css',
			SCSS : './project/' + project + '/src/**/*.{sass,scss}',
			JSON : './project/' + project + '/src/**/*.json',
			font : './project/' + project + '/src/**/*.{eot,svg,ttf,woff,woff2,otf}',
			image : './project/' + project + '/src/**/*.{png,jpg,gif,ico}',
			template : [
				'./project/' + project + '/src/**/**/*.html',
				'!./project/' + project + '/src/index.html'
			]
		},

		destination = {
			HTML : './project/' + project + '/dev',
			JS : './project/' + project + '/dev',
			CSS : './project/' + project + '/dev',
			SCSS : './project/' + project + '/dev',
			JSON : './project/' + project + '/dev',
			font : './project/' + project + '/dev',
			image : './project/' + project + '/dev',
			template : './project/' + project + '/dev/automation'
		},

		config = {
			SCSS : {
				includePaths: [
					appRoot + '/bower_components'
				],
				sourceMap: true,
				outputStyle: 'compressed',
				errLogToConsole: true
			},
			template : {
				output: 'run.template.js',
				strip: appRoot + '/project/' + project + '/src/',
				minify: {},
				moduleName: project
			}
		},

		event = {
			default : function (path, event) {
				console.log('');
				console.log('==== ==== ====');
				logger.info();
				console.log(path, event);
				console.log('==== ==== ====');
				console.log('');
			},
			add : function (path) { event.default(path, 'added'); },
			changed : function (path) { event.default(path, 'changed'); },
			unlink : function (path) {
				event.default(path, 'removed');
				
				gulp.src(path.replace('src', 'dev')).pipe(vinylPaths(del));
			},
			error : error.error
		},

		fn = {
			watcher : function (file) {
				var watcher = watch(file);

				watcher
					.on('add', event.add)
					.on('change', event.changed)
					.on('unlink', event.unlink)
					.on('addDir', event.add)
					.on('unlinkDir', event.changed)
					.on('unlink', event.unlink);

				return watcher;
			},

			basicWatch : function (extension, format) {
				var name = project + '.changed.' + extension;

				gulp.task(name, function () {
					return fn.watcher(file[extension])
						.pipe(changed(destination[extension] + '**/*.' + format))
						.pipe(gulp.dest(destination[extension]))
						.pipe(whenChange.reload({ stream: true }));
				});

				return name;
			},

			watch : {
				HTML : function () {
					return fn.basicWatch('HTML', 'html');
				},

				JS : function () {
					var name = project + '.changed.JS';

					gulp.task(name, [jshint], function () {
						return watch(file.JS)
							.pipe(changed(destination.JS + '**/*.js'))
							.pipe(gulp.dest(destination.JS))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
				},

				CSS : function () {
					return fn.basicWatch('CSS', 'css');
				},

				SCSS : function () {
					var name = project + '.changed.SCSS';

					gulp.task(name, function () {
						return fn.watcher(file.SCSS)
							.pipe(changed(destination.SCSS))
							.pipe(sourcemaps.init())
								.pipe(sass(config.SCSS).on('error', error.error))
							.pipe(sourcemaps.write())
							.pipe(rename(function (file) {
								file.dirname = file.dirname.replace('scss', 'css');
							}))
							.pipe(gulp.dest(destination.SCSS))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
				},

				JSON : function () {
					return fn.basicWatch('JSON', 'json');
				},

				font : function () {
					return fn.basicWatch('font', '{eot,svg,ttf,woff,woff2,otf}');
				},

				image : function () {
					return fn.basicWatch('image', '{png,jpg,gif,ico}');
				},

				template : function () {
					var name = project + '.changed.template';

					gulp.task(name, function () {
						return fn.watcher(file.template, function () {
							return gulp.start(template);
						})
						.pipe(whenChange.reload({ stream: true }));
					});

					return name;
				}
			}
		},

		watchDependencies = [];

	for (var extension in destination) {
		var watchTask = fn.watch[extension]();

		watchDependencies.push(watchTask);
	}

	gulp.task(taskName, watchDependencies);

	return taskName;
}