'use strict';
module.exports.jshint = function (project, gulp) {
    var taskName = project + '.jshint',
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    if (!gulp) {
        gulp = require('gulp');
    }

    gulp.task(taskName, function() {
        return gulp.src('./project/' + project + '/src/{api,app}/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    });

    return taskName;
}