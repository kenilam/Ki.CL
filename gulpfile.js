'use strict'

global.appRoot = require('path').resolve(__dirname);

var gulp = require('gulp'),

    list = require('./gulptask/list').list(),

    bower = require('./gulptask/bower').bower(),

	kicl = require('./project/kicl/gulpfile').kicl();

gulp.task('default', [kicl]);