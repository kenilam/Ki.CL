'use strict';
module.exports.dev = function (project, dependentTasks, gulp) {
	var env = 'dev',

		src = 'src',

		fs = require('fs'),

		taskName = project + '.' + env,

		run = require('../gulptask/run').run().app,

		log = require('logger').createLogger(),

		url = require("url"),

		del = require('del'),
		vinylPaths = require('vinyl-paths'),
		changed = require('gulp-changed'),
		debug = require('gulp-debug'),
		less = require('gulp-less'),
		recess = require('gulp-recess'),
		rename = require('gulp-rename'),
		util = require('gulp-util'),
		watch = require('gulp-watch'),
		browserSync = require('browser-sync').create(),
		reload = browserSync.reload,

		fn = {
			browserSync: function (req, res, next) {
				var uri = url.parse(req.url, true),
					rootPath = './project/' + project + '/mock',
					filePath = rootPath + uri.pathname;

				if (!uri.pathname.match(/\.json$/)) {
					return next();
				}

				fs.readFile(filePath, {encoding: 'utf-8', flag: 'rs'}, function(error, data) {
					if (error) return res.end(error.toString().replace(rootPath, ''));

					if (uri.query.callback) {
						console.log(uri);
						return res.end('/**/' + uri.query.callback + '(' + data + ')');
					}

					res.end(data);
				});
			},
			copySrc: function () {
				return gulp.src(copy.file)
					.pipe(changed(copy.destination))
					.pipe(rename(function (path) {
						path.dirname = path.dirname.replace('less', 'css');
					}))
					.pipe(gulp.dest(copy.destination))
					.pipe(reload({ stream:true }));
			},
			compileLess: function () {
				return gulp.src(compile.LESS.file)
					.pipe(changed(copy.destination))
					.pipe(recess(compile.LESS.config).on('error', fn.error))
					.pipe(less({sourcemap: true}).on('error', fn.error))
					.pipe(rename(function (path) {
						path.dirname = path.dirname.replace('less', 'css');
					}))
					.pipe(gulp.dest(copy.destination))
					.pipe(reload({ stream:true }));
			},
			error: function (error) {
				console.log('');
				console.log('==== ==== ====');
				console.log(error.plugin, error.name);
				console.log('Issue occured while streaming file:', error.fileName);
				console.log('Line number:', error.lineNumber);
				console.log('Column Number:', error.columnNumber);
				console.log('Reason: ', error.message);
				console.log('==== ==== ====');
				console.log('');

				this.emit('end');
			}
		},

		browser = {
			sync : {
				port: 8081,
				server: {
					baseDir: './project/' + project + '/' + env,
					middleware: [fn.browserSync]
				}
			}
		},

		copy = {
			file: [
				'./project/' + project + '/' + src + '/**/*.{js,eot,svg,ttf,woff,woff2,otf,html,png,jpg,gif,ico,json}',
				'!./project/' + project + '/' + src + '/{partial,view,api}/**/*.html'
			],
			destination: './project/' + project + '/' + env,
			source: './project/' + project + '/' + src
		},

		compile = {
			LESS: {
				config: {
					root: './project/' + project + '/' + src + '/less',
					strictPropertyOrder: false,
					noOverqualifying: false,
					zeroUnits: false,
					noUniversalSelectors: false,
					noIDs: false,
					prefixWhitespace: false
				},
				file: [
					'./project/' + project + '/' + src + '/**/*.{less,css}',
					'!./project/' + project + '/' + src + '/**/_*.{less,css}',
					'!./project/' + project + '/' + src + '/**/lesshat.less'
				]
			}
		},

		watching = {
			file: [
				'./project/' + project + '/' + src + '/**/*',
				'./project/' + project + '/mock/**/*.json',
				'!./project/' + project + '/' + src + '/lib/',
				'!./project/' + project + '/' + src + '/lib/**/*',
				'!./project/' + project + '/' + src + '/less/lib/',
				'!./project/' + project + '/' + src + '/less/lib/**/*'
			]
		},

		template = require('../gulptask/template').template(project, env, env, taskName + '.clean', gulp, true);

	if (!gulp) {
		gulp = require('gulp');
	}

	gulp.task(taskName + '.clean', dependentTasks, function () { // gulp [project].dev.clean
		return gulp.src(copy.destination).pipe(vinylPaths(del));
	});

	gulp.task(taskName + '.copy.src', [taskName + '.clean', template.normal], function () { // gulp [project].dev.copy.src
		return fn.copySrc();
	});

	gulp.task(taskName + '.compile.LESS', [taskName + '.clean'], function () { // gulp [project].dev.compile.LESS
		return fn.compileLess();
	});

	gulp.task(taskName + '.changed.src', function () { // gulp [project].dev.changed.src
		return fn.copySrc();
	});

	gulp.task(taskName + '.changed.LESS', function () { // gulp [project].dev.changed.LESS
		return fn.compileLess();
	});

	gulp.task(taskName + '.watch', function () {
		return watch(watching.file, function (event) {
			var isLESS = event.path.substr(event.path.length - 5, event.path.length) === '.less',
				isJS = event.path.substr(event.path.length - 3, event.path.length) === '.js',
				isHTML = event.path.substr(event.path.length - 5, event.path.length) === '.html',
				task = [];

			console.log('');
			log.info();
			console.log('file: ' + event.path + ' was ' + event.type);
			console.log('');

			if (isLESS) {
				task.push(taskName + '.changed.LESS');
			}

			if (isJS) {
				task.push(project + '.jshint');
			}

			if (!isLESS) {
				task.push(taskName + '.changed.src');
			}

			if (isHTML) {
				task.push(template.changed);
			}

			for (var i = 0, l = task.length; i < l; i ++) {
				gulp.start(task[i]);
			}
		});
	});

	gulp.task(taskName + '.browser.sync', function () {
		browserSync.init(browser.sync);

		return gulp.watch(
			['*.html', 'styles/**/*.css', 'scripts/**/*.js'],
			{
				cwd: './project/' + project + '/' + env
			},
			reload
		);
	});

	//run(project, env, [taskName + '.watch', taskName + '.browser.sync']);   // gulp [project].dev.run.app

	gulp.task(taskName + '.compile', [              // gulp [project].dev.compile
		taskName + '.copy.src',                     // gulp [project].dev.copy.src
		taskName + '.compile.LESS'                  // gulp [project].dev.compile.less
	]);

	gulp.task(taskName + '.default', [              // gulp [project].dev.default
		taskName + '.compile',                		// gulp [project].dev.compile
		template.normal                             // gulp [project].dev.template
	],
	function () {
		gulp.start(taskName + '.browser.sync');     // gulp [project].browser.sync
		return gulp.start(taskName + '.watch');     // gulp [project].watch
	});

	gulp.task(taskName, [                           // gulp [project].dev
		taskName + '.default',                      // gulp [project].dev.default
	]);

	return taskName + '.default';                   // return this for gulp default tasking
}
