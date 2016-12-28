'use strict'

import gulp from 'gulp';

import browser from './browser';

import gulpData from 'gulp-data';
import changedInPlace from 'gulp-changed-in-place';

import phplint from 'gulp-phplint';

import debug from 'gulp-debug';

const taskName = 'app.compile.php';

const config = {
    lint : 'fail'
};

const src = [
    './project/src/**/*.php'
];

const dest = './project/dev';

class Php {
    constructor () {
        gulp.task(taskName, Php.task);
        gulp.task(taskName.replace('php', 'all.php'), Php.all);

        this.taskName = taskName;
    }

    static lint (file, callback) {
        gulp.src(file.path.replace(global.appFoot, '.'))
            .pipe(phplint())
            .pipe(phplint.reporter(config.lint));

        callback(null, file);
    }

    static getSecret () {
        return require('../../secret')[process.env.mode || 'dev'];
    }

    static replaceSecret () {
        let secret = Php.getSecret();

        let results = ['<?', 'class'];

        Object.keys(secret).forEach(className => {
            let classValue = secret[className];

            results.push(`${className}Class`, '{');

            Object.keys(classValue).forEach(varName => {
                results.push('public');
                results.push(`$${varName}`);
                results.push('=');
                results.push(`"${classValue[varName]}";`);
            });

            results.push('function');
            results.push('getValue($name)');
            results.push('{');
            results.push('return');
            results.push('$this->$name;');
            results.push('}');

            results.push('};');
            results.push(`$${className}`);
            results.push('=');
            results.push('new');
            results.push(`${className}Class;`);

            Object.keys(classValue).forEach(varName => {
                results.push(`$${varName}Name`);
                results.push('=');
                results.push(`"${varName}";`);
                results.push(`define("SECRET_${className.toUpperCase()}_${varName.toUpperCase()}"`);
                results.push(',');
                results.push(`$${className}`);
                results.push('->');
                results.push(`{$${varName}Name});`);
            });

            results.push('?>');
        });

        return results.join(' ');
    }

    static interpolate (file, callback) {
        let secret = Php.getSecret();
        let contents = file.contents.toString().replace(/{secret}/g, Php.replaceSecret());

        Object.keys(secret.api).forEach(name => {
            contents = contents.replace(new RegExp(`{${name}}`, 'g'), secret.api[name]);
        });

        file.contents = new Buffer(contents);

        callback(null, file);
    }

    static all () {
        return gulp.src(src)
            .pipe(gulpData(Php.interpolate))
            .pipe(gulpData(Php.lint))
            .pipe(gulp.dest(dest))
            .pipe(browser.instance().stream());
    }

    static task () {
        return gulp.src(src)
            .pipe(changedInPlace({ firstPass : true }))
            .pipe(gulpData(Php.interpolate))
            .pipe(gulpData(Php.lint))
            .pipe(gulp.dest(dest))
            .pipe(browser.instance().stream());
    }
}

export default new Php();

