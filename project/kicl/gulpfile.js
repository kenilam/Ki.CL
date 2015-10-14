'use strict'

module.exports.kicl = function (dependencies) {
	var project = 'kicl',

		gulp = require('gulp'),
		
		path = require('path'),
		
		middleware = require(appRoot + '/gulptask/middleware').middleware(project),

		watch = require(appRoot + '/gulptask/watch').watch,

		browser = require(appRoot + '/gulptask/browser').browser,
		
		init = require(appRoot + '/gulptask/init').init(project),
		test = require(appRoot + '/gulptask/test').test(project),
		dev = require(appRoot + '/gulptask/dev').dev(project),
		build = require(appRoot + '/gulptask/build').build(project),
		ftp = require(appRoot + '/gulptask/ftp').ftp(project),

		fn = {
			browser : function (env, middleware, whenBrowserSync) {
				function whenMakeBrowser () {
					return gulp.start(browser(project, env, middleware, whenBrowserSync));
				}
				return whenMakeBrowser;
			},
			watch : function (browserSync) {
				return gulp.start(watch(project, browserSync));
			},
			deploy : function () {
				return gulp.start(ftp);
			},
			test : function () {
				return gulp.start(test);
			}
		};

	gulp.task(dev + '.run', [dev], fn.browser('dev', [middleware.mock], fn.watch));
	
	gulp.task(build + '.run', [build], fn.browser('build'));

	gulp.task(project + '.deploy', [build], fn.deploy);

	gulp.task(dev + '.test', fn.test);

	gulp.task(project, [dev + '.run']);

	return project;
}