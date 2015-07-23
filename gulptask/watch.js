'use strict'

module.exports.watch = function (project, whenChange) {
	var taskName = project + '.watch',

		colors = require('colors'),

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		addSrc = require('gulp-add-src'),
		watch = require('gulp-watch'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),

		logger = require('logger').createLogger(),

		jshint = require(appRoot + '/gulptask/jshint').jshint(project),
		
		template = require(appRoot + '/gulptask/template').template(project),

		plumber = require('gulp-plumber'),

		error = require(appRoot + '/gulptask/error').error,

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
					appRoot + '/bower_components',
					appRoot + '/project/' + project + '/src/scss'
				],
				compass: true,
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
				logger.info();
				console.log(path.magenta, event.green);
			},
			add : function (path) { event.default(path, 'added'); },
			changed : function (path) { event.default(path, 'changed'); },
			unlink : function (path) {
				event.default(path, 'removed');
				
				gulp.src(path.replace('src', 'dev')).pipe(vinylPaths(del));
			},
			error : error
		},

		fn = {
			watcher : function (file, callback) {
				var watcher = watch(file, callback);

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
					return fn.watcher(file[extension] + '**/*.' + format)
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
						return fn.watcher(file.JS)
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
						var files = file;
						return fn.watcher(file.SCSS, function (file) {
							var path = file.path.split('/'),
								name = path[path.length - 1];

							return gulp.src(name.substr(0,1) === '_' ? files.SCSS : file.path)
								.pipe(plumber({
									errorHandler: error
								}))
								.pipe(sourcemaps.init())
									.pipe(sass(config.SCSS))
								.pipe(sourcemaps.write())
								.pipe(rename(function (file) {
									file.dirname = file.dirname.replace('scss', 'css');
								}))
								.pipe(gulp.dest(destination.SCSS))
								.pipe(whenChange.reload({ stream: true }));
						});
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