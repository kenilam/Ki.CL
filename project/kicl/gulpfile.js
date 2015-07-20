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

		fn = {
			makeBrowser : function (env, middleware, whenBrowserSync) {
				function whenMakeBrowser () {
					return gulp.start(browser(project, env, middleware, whenBrowserSync));
				}
				return whenMakeBrowser;
			},
			whenBrowserSync : function (browserSync) {
				gulp.start(watch(project, browserSync));
			}
		};

	gulp.task(project + '.build.run', [build], fn.makeBrowser('build'));
	gulp.task(project, [dev], fn.makeBrowser('dev', [middleware.mock], fn.whenBrowserSync));

	return project;
}