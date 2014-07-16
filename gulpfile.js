'use strict';

try {
    require('node-env-file')(__dirname + '/.env');
} catch (e) {
    console.error("Error while reading .env File: " + e);
    console.error("Setting default environment variables manually instead...");
    process.env.KIOSK_DEBUG_MODE = 'true';
    process.env.PROXY_DEBUG_MODE = 'true';
    process.env.DAEMON = 'false';
}

var gulp = require('gulp'),
    
    fs = require('fs'),

    dev = require('./gulptask/dev').dev,
    build = require('./gulptask/build').build,

    fn = {
        init: function (project) {
            require('./gulptask/src').src(project, []);

            //Only clean and do bower if there is no dev directory
            dev(project, [project + (!fs.existsSync('./project/' + project + '/dev') ? '.src' : '.src.noclean')]);

            //Only clean and do bower if there is no build directory
            build(project, [project + (!fs.existsSync('./project/' + project + '/dev') ? '.src' : '.src.noclean')]);
            
            gulp.task(project, [project + '.dev']);

            return project;
        }
    };

// ==== ==== ==== ==== ====
// create gulp tasks instant
require('./gulptask/bower').bower();

fn.init('kicl');

gulp.task('reset', ['kicl.src']);
gulp.task('kicl.reset', ['kicl.src']);

gulp.task('init', ['bower'], function () {
    return gulp.start('kicl.src');
});

gulp.task('dev', ['init'], function () {
    return gulp.start('kicl.dev');
});

gulp.task('build', ['init'], function () {
    return gulp.start('kicl.build');
});

gulp.task('default', ['init'], function () {
	return gulp.start('kicl.dev');
});
// ==== ==== ==== ==== ====