'use strict'

module.exports.watch = function (project, whenChange) {
	var taskName = project + '.watch',

		colors = require('colors'),

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),
		logger = require('logger').createLogger(),

		watch = require('gulp-watch'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),

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

			watch : {
				HTML : function () {
					var name = project + '.changed.HTML';

					gulp.task(name, function () {
						return fn.watcher(file.HTML)
							.pipe(gulp.dest(destination.HTML))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
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
					var name = project + '.changed.CSS';

					gulp.task(name, function () {
						return fn.watcher(file.CSS)
							.pipe(gulp.dest(destination.CSS))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
				},

				SCSS : function () {
					var name = project + '.changed.SCSS';

					gulp.task(name, function () {
						var files = file;
						return fn.watcher(file.SCSS, function (file) {
							var path = file.path.replace('/project/' + project + '/src', '').replace(appRoot, ''),
								pathArray = path.split('/'),
								nameArray = pathArray.pop().split('.'),
								extname = nameArray.pop(),
								basename = nameArray.join('.'),
								dirname = pathArray.join('/');

							return gulp.src(basename.substr(0, 1) === '_' ? files.SCSS : file.path.replace(appRoot, '.'))
								.pipe(plumber({
									errorHandler: error
								}))
								.pipe(sourcemaps.init())
									.pipe(sass(config.SCSS))
								.pipe(sourcemaps.write())
								.pipe(rename(function (file) {
									if (basename.substr(0, 1) !== '_') {
										file.dirname = dirname;
										file.basename = basename;
										file.extname = '.' + extname;
									}

									file.dirname = file.dirname.replace('scss', 'css');
									file.basename = file.basename.replace('scss', 'css');
									file.extname = file.extname.replace('scss', 'css');
								}))
								.pipe(gulp.dest(destination.SCSS))
								.pipe(whenChange.reload({ stream: true }));
						});
					});

					return name;
				},

				JSON : function () {
					var name = project + '.changed.JSON';

					gulp.task(name, [jshint], function () {
						return fn.watcher(file.JSON)
							.pipe(gulp.dest(destination.JSON))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
				},

				font : function () {
					var name = project + '.changed.font';

					gulp.task(name, [jshint], function () {
						return fn.watcher(file.font)
							.pipe(gulp.dest(destination.font))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
				},

				image : function () {
					var name = project + '.changed.image';

					gulp.task(name, [jshint], function () {
						return fn.watcher(file.image)
							.pipe(gulp.dest(destination.image))
							.pipe(whenChange.reload({ stream: true }));
					});

					return name;
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