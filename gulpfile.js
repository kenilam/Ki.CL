'use strict';

var gulp = require('gulp'),

    gulpTasklisting = require('gulp-task-listing'),
    
    fs = require('fs'),

    dev = require('./gulptask/dev').dev,
    build = require('./gulptask/build').build,
    jshint = require('./gulptask/jshint').jshint,
    karma = require('./gulptask/karma').karma,

    fn = {
        init : function (project) {
            var config = require('./project/' + project + '/config').config();

            // ==== ==== ==== ==== ====
            // create {{project}}.src task
            require('./gulptask/src').src(project, []);
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ===‰
            // create {{project}}.dev task
            dev(project, [project + (
                !fs.existsSync('./project/' + project + '/dev') ?
                    '.src' : //Only clean and do bower if there is no dev directory
                    '.src.noclean')
            ]);
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ====
            // create {{project}}.build task
            build(project, [project + (
                !fs.existsSync('./project/' + project + '/dev') ?
                    '.src' : //Only clean and do bower if there is no build directory
                    '.src.noclean')
            ]);
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ====
            // create {{project}}.jshint task
            jshint(project);
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ====
            // create {{project}}.karma task
            karma(project, config.karma);
            // ==== ==== ==== ==== ====
            
            // ==== ==== ==== ==== ====
            gulp.task(project, [project + '.dev']);
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ====
            // create {{project}} reset task
            gulp.task(project + '.reset', [project + '.src']);
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ====
            // create initial task
            gulp.task(project + '.init', ['bower'], function () {
                return gulp.start(project + '.src');
            });
            // ==== ==== ==== ==== ====

            // ==== ==== ==== ==== ====
            // create global unit.test task
            gulp.task(project + '.test', [project + '.jshint'], function () {
                return gulp.start(project + '.karma');
            });
            // ==== ==== ==== ==== ====

            return project;
        }
    };

// ==== ==== ==== ==== ====
// create gulp tasks instant
require('./gulptask/bower').bower();
// ==== ==== ==== ==== ====

// ==== ==== ==== ==== ====
// initial project
fn.init('kicl');
// ==== ==== ==== ==== ====

// ==== ==== ==== ==== ====
// create gulp default task
gulp.task('help', gulpTasklisting.withFilters(function(task) {
    return task.indexOf('.') > -1;
}));
gulp.task('init', ['bower']);
gulp.task('default', ['init', 'kicl.dev']);
// ==== ==== ==== ==== ====