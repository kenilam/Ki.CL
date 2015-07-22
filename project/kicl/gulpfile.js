'use strict'

module.exports.kicl = function (dependencies) {
	var project = 'kicl',

		gulp = require('gulp'),
		
		path = require('path'),
		
		middleware = require(appRoot + '/gulptask/middleware').middleware(project),

		watch = require(appRoot + '/gulptask/watch').watch,

		browser = require(appRoot + '/gulptask/browser').browser,
		
		init = require(appRoot + '/gulptask/init').init(project),
		dev = require(appRoot + '/gulptask/dev').dev(project),
		build = require(appRoot + '/gulptask/build').build(project),
		ftp = require(appRoot + '/gulptask/ftp').ftp(project),

		fn = {
			makeBrowser : function (env, middleware, whenBrowserSync) {
				function whenMakeBrowser () {
					return gulp.start(browser(project, env, middleware, whenBrowserSync));
				}
				return whenMakeBrowser;
			},
			watchDev : function (browserSync) {
				return gulp.start(watch(project, browserSync));
			},
			whenDeploy : function () {
				return gulp.start(ftp);
			}
		};

	gulp.task(dev + '.run', [dev], fn.makeBrowser('dev', [middleware.mock], fn.watchDev));
	
	gulp.task(build + '.run', [build], fn.makeBrowser('build'));

	gulp.task(project + '.deploy', [build], fn.whenDeploy);

	gulp.task(project, [dev + '.run']);

	return project;
}