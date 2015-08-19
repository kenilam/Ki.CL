'use strict'

module.exports.library = function (project, dependencies) {
	var taskName = project + '.library',

		gulp = require('gulp'),

		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		addSrc = require('gulp-add-src'),
		bowerSrc = require('gulp-bower-src'),
		filter = require('gulp-filter'),
		rename = require('gulp-rename'),
		
		debug = require('gulp-debug'),

		file = {
			plugin : {
				JS : ['./plugin/**/*.js'],
				SCSS : ['./plugin/**/*.scss'],
				CSS : ['./plugin/**/*.css'],
				font : ['./plugin/**/*.{eot,svg,ttf,woff,woff2,otf}']
			},
			JS : filter([
				'**/*.js',
				'**/dist/*.js',,
				'**/src/uncompressed/**/*.js',
				'!**/index.js',
				'!**/*.min.js',
				'!**/*-min.js',
				'!**/dist/*.min.js',
				'!**/dist/*-min.js',
				'!**/{test,min,bin,lang,lib,support,src,locale,benchmarks,scripts,feature-detects,templates}/**/*.js',
				'!**/{grunt,Gruntfile,GruntFile,gulpfile,test,export,umd}.js'
			], {restore: true, passthrough: false}),
			CSS : filter([
				'**/*.css',
				'!**/*.min.css',
				'!**/{support,src,test}/**/*.css'
			], {restore: true, passthrough: false}),
			SCSS : filter([
				'**/*.{scss, sass}',
				'!**/*.min.{scss, sass}',
				'!{font-awesome,normalize-scss}/**/*'
			], {restore: true, passthrough: false}),
			font : filter([
				'**/fonts/*.{eot,svg,ttf,woff,woff2,otf}'
			], {restore: true, passthrough: false})
		},

		destination = {
			JS : './project/' + project + '/src/lib',
			CSS : './project/' + project + '/src/css/lib',
			font : './project/' + project + '/src/css/fonts'
		},

		fn = {
			clean : function (extension) {
				var name = taskName + '.clean.' + extension;

				gulp.task(name, function () {
					return gulp.src(destination[extension]).pipe(vinylPaths(del));
				});

				return name;
			},
			get : function (extension, dependency) {
				var name = taskName + '.get.' + extension;

				gulp.task(name, dependency, function () {
					var stream = bowerSrc()
						.pipe(file[extension])
						.pipe(addSrc(file.plugin[extension]))
						.pipe(rename(function (file) {
							var path = file.dirname.split('/'),
								lastPath = path[path.length - 1];

							file.dirname = '';
						}))
						.pipe(gulp.dest(destination[extension]));

					file[extension].restore.pipe(gulp.dest(destination[extension]));

					return stream;
				});

				return name;
			}
		},

		getDependencies = [],
		cleanDependencies = [];

	dependencies = dependencies || [];

	for (var extension in destination) {
		var cleanTask = fn.clean(extension),
			getTask = fn.get(extension, [cleanTask]);

		cleanDependencies.push(cleanTask);
		getDependencies.push(getTask);
	}

	gulp.task(taskName + '.clean', cleanDependencies);

	gulp.task(taskName + '.get', getDependencies);

	gulp.task(taskName, dependencies, function () {
		return gulp.start(taskName + '.get');
	});

	return taskName;
}