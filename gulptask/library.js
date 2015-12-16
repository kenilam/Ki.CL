'use strict'

module.exports.library = function (project, dependencies) {
	var taskName = project + '.library',

		gulp = require('gulp'),

		del = require('del'),
		vinylPaths = require('vinyl-paths'),

		addSrc = require('gulp-add-src'),
		// For some reasons filter return all files after bowerSrc,
		// Temporary removing the functionalities from fn.get and use gulp.src instead
		//bowerSrc = require('gulp-bower-src'),
		//filter = require('gulp-filter'),
		rename = require('gulp-rename'),
		
		debug = require('gulp-debug'),

		file = {
			plugin : {
				JS : ['./plugin/**/*.js'],
				SCSS : ['./plugin/**/*.scss'],
				CSS : ['./plugin/**/*.css'],
				font : ['./plugin/**/*.{eot,svg,ttf,woff,woff2,otf}']
			},
			JS : [
				'!bower_components/**/index.js',
				'!bower_components/**/*.min.js',
				'!bower_components/**/*-min.js',
				'!bower_components/**/dist/*.min.js',
				'!bower_components/**/dist/*-min.js',
				'!bower_components/compass-breakpoint/**/*.{js}',
				'!bower_components/**/{test,min,bin,lang,lib,support,locale,benchmarks,scripts,feature-detects,templates}/**/*.js',
				'!bower_components/{angular-ui-router,jquery,moment,Respond}/src/**/*.js',
				'!bower_components/**/{grunt,Gruntfile,GruntFile,gulpfile,test,export,umd,eyeglass-exports,ngAnimateMock,ngMock,ngMockE2E}.js',
				'bower_components/**/*.js',
				'bower_components/**/dist/*.js',
				'bower_components/**/src/**/*.js'
			],
			CSS : [
				'bower_components/**/*.css',
				'!bower_components/**/*.min.css',
				'!bower_components/**/{support,src,test}/**/*.css'
			],
			SCSS : [
				'bower_components/**/*.{scss, sass}',
				'!bower_components/**/*.min.{scss, sass}',
				'!{font-awesome,normalize-scss}/**/*'
			],
			font : [
				'bower_components/**/fonts/*.{eot,svg,ttf,woff,woff2,otf}'
			]
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
					var stream = 
						gulp.src(file[extension])
							.pipe(addSrc(file.plugin[extension]))
							.pipe(rename(function (file) {
								var path = file.dirname.split('/'),
									lastPath = path[path.length - 1];

								file.dirname = '';
							}))
							.pipe(gulp.dest(destination[extension]));

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