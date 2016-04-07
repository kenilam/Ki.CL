'use strict'

module.exports.compile = function (project) {
	var taskName = project + '.compile',

		colors = require('colors'),

		gulp = require('gulp'),
		del = require('del'),
		vinylPaths = require('vinyl-paths'),
		
		filter = require('gulp-filter'),
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
			JS : './project/' + project + '/src/**/*.{js,map}',
			CSS : './project/' + project + '/src/**/*.css',
			SCSS : './project/' + project + '/src/**/*.{sass,scss}',
			font : './project/' + project + '/src/**/*.{eot,svg,ttf,woff,woff2,otf}',
			image : './project/' + project + '/src/**/*.{png,jpg,gif,ico,svg}'
		},

		destination = {
			HTML : './project/' + project + '/dev',
			JS : './project/' + project + '/dev',
			CSS : './project/' + project + '/dev',
			SCSS : './project/' + project + '/dev',
			font : './project/' + project + '/dev',
			image : './project/' + project + '/dev'
		},

		config = {
			SCSS : {
				includePaths: [
					appRoot + '/bower_components',
					appRoot + '/project/' + project + '/src/scss'
				],
				compass: true,
				sourceMap: true,
				outputStyle: 'expanded',
				errLogToConsole: true
			}
		},

		fn = {
			clean : function (extension) {
				var name = taskName + '.clean.' + extension;

				gulp.task(name, function () {
					return gulp.src(destination[extension])
						.pipe(vinylPaths(del));
				});

				return name;
			},

			basicComplie : function (extension, dependency) {
				var name = taskName + '.' + extension;

				gulp.task(name, dependency, function () {
					return gulp.src(file[extension])
						.pipe(gulp.dest(destination[extension]));
				});

				return name;
			},

			compile : {
				HTML : function (dependencies) {
					return fn.basicComplie('HTML', dependencies)
				},
				JS : function (dependencies) {
					dependencies.push(jshint);

					return fn.basicComplie('JS', dependencies)
				},
				CSS : function (dependencies) {
					return fn.basicComplie('CSS', dependencies)
				},
				SCSS : function (dependencies) {
					var name = taskName + '.SCSS';

					gulp.task(name, dependencies, function () {
						return gulp.src(file.SCSS)
							.pipe(sourcemaps.init())
								.pipe(plumber({
									errorHandler: error
								}))
								.pipe(sass(config.SCSS))
							.pipe(sourcemaps.write())
							.pipe(rename(function (file) {
								file.dirname = file.dirname.replace('scss', 'css').replace('sass', 'css');
							}))
							.pipe(gulp.dest(destination[extension]));
					});

					return name;
				},
				font : function (dependencies) {
					return fn.basicComplie('font', dependencies)
				},
				image : function (dependencies) {
					return fn.basicComplie('image', dependencies)
				}
			}
		},

		compileDependencies = [],
		cleanDependencies = [];

	for (var extension in destination) {
		var cleanTask = fn.clean(extension),
			compileTask = fn.compile[extension]([cleanTask]);

		cleanDependencies.push(cleanTask);
		compileDependencies.push(compileTask);
	}

	compileDependencies.push(template);

	gulp.task(taskName + '.clean', cleanDependencies);

	gulp.task(taskName, compileDependencies);

	return taskName;
}