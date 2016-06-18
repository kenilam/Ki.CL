'use strict';

import domain from 'domain';

import gulp from 'gulp';
import gutil from 'gulp-util';

import browserify from 'browserify';

import debug from 'gulp-debug';
import errorHandler from './errorHandler';

const domainEvent = domain.create();

const config = {
    cache: {},
	debug: true,
    fullPaths: false,
	hasExports: true,
    packageCache: {},
    paths: ['./project/src'],
	transform: [
		['babelify', { presets: ['es2015', 'react'] }]
	]
}

class Browserify {
	constructor () {
		return this.compile.bind(this);
	}

	compile (entry) {
		return browserify(entry, config)
			.bundle()
            .pipe(errorHandler.plumber());
	}
}

export default new Browserify();

