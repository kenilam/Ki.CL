'use strict'

module.exports.bundlify = function (project, dependencies) {
	var taskName = project + '.bundlify',

		gulp = require('gulp'),

		miniHTML = require('gulp-minify-html'),
		miniCSS = require('gulp-minify-css'),
		miniJSON = require('gulp-jsonminify'),

		concat = require('gulp-concat'),

		uglify = require('gulp-uglify'),

		usemin = require('gulp-usemin'),
		
		debug = require('gulp-debug'),

		file = {
			bundlify : './project/' + project + '/dev/**/*.html'
		},

		destination = {
			bundlify : './project/' + project + '/build'
		},

		config = {
			bundlify : {
				CSS: {
					keepSpecialComments: 0,
					benchmark: true,
					processImport: true
				},
				JS: {
					output: {
						'space_colon': false
					}
				},
				HTML: {
					empty: true,
					comments: true,
					conditionals: true,
					spare: true,
					quotes: true
				}
			}
		};

	gulp.task(taskName, dependencies, function () {
		return gulp.src(file.bundlify)
			.pipe(usemin(
				{
					css: [
						miniCSS(config.bundlify.CSS),
						'concat'
					],
					html: [
						miniHTML(config.bundlify.HTML),
						'concat'
					],
					js: [
						uglify(config.bundlify.JS),
						'concat'
					]
				}
			))
			.pipe(gulp.dest(destination.bundlify));
	});

	return taskName;
}