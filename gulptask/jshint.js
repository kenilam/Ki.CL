'use strict';

module.exports.jshint = function (project) {
    var taskName = project + '.jshint',
        
        gulp = require('gulp'),
        
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),

        file = {
            jshint : [
                './project/' + project + '/src/**/*.js',
                '!./project/' + project + '/src/lib/**/*.js'
            ]
        };

    gulp.task(taskName, function() {
        return gulp.src(file.jshint)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    });

    return taskName;
}