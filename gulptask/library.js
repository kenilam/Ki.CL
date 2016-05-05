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
				'bower_components/angular/angular.js',
				'bower_components/angular-animate/angular-animate.js',
				'bower_components/angular-aria/angular-aria.js',
				'bower_components/angular-resource/angular-resource.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/angular-sanitize/angular-sanitize.js',
				'bower_components/angular-ui-router/release/angular-ui-router.js',
				'bower_components/es6-shim/es6-sham.js',
				'bower_components/es6-shim/es6-shim.js',
				'bower_components/underscore/underscore.js',
				'bower_components/gsap/src/uncompressed/TweenMax.js',
				'bower_components/tweenjs/src/Tween.js',
				'bower_components/html5shiv/dist/{html5shiv,html5shiv-printshiv}.js',
				'bower_components/jquery/dist/jquery.js',
				'bower_components/modernizr/modernizr.js',
				'bower_components/moment/moment.js',
				'bower_components/swiper/dist/js/swiper.js',
				'bower_components/swiper/dist/js/maps/swiper.min.js.map',
				'bower_components/ShaderParticleEngine/build/ShaderParticles.js',
				'bower_components/threejs/build/three.js',
				'bower_components/underscore/underscore.js'
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
								file.dirname = '';
								
								if (file.basename === 'swiper.min.js') {
									file.basename = 'swiper.js';
								}

								if (file.extname === '.map') {
									file.dirname = 'maps';
								}
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