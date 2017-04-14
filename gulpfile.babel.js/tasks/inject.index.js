'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import Browser from './browser';

const taskName = 'inject.index';

import config from '^/config';

const app = 'App';
const asset = 'Asset';
const lib = 'Lib';
const priority = 'Priority';

const srcRoot = 'project/src';
const dest = 'project/dev';
const src = 'index.html';

const libSrc = `./${dest}/${lib}/**/*.{js,css}`;
const appLibSrc = `./${dest}/${lib}/${app}/**/*.{js,css}`;
const priorityLibSrc = `./${dest}/${lib}//${app}/${priority}/**/*.{js,css}`;
const assetSrc = `./${dest}/${asset}/**/*.{js,css}`;
const allSrc = `./${dest}/**/*.{js,css}`;

const files = config.inject.index.src.map(path => `./${config.inject.index.fileRoot}/${path}`);

class Inject {
	constructor () {
		gulp.task(taskName, Inject.task);

		this.taskName = taskName;
	}

	static devLib () {
		return new Promise(resolve => {
			gulp.src(files)
				.pipe(gulp.dest(`./${dest}/${lib}`))
				.on('end', resolve);
		});
	}

	static copySrc () {
		return new Promise(resolve => {
			gulp.src(`./${srcRoot}/${src}`)
				.pipe(gulp.dest(`./${dest}`))
				.on('end', resolve);
		});
	}

	static injectFiles () {
		const libSrc = `./${dest}/${lib}/**/*.{js,css}`;

		return new Promise(resolve => {
			gulp.src(`./${dest}/${src}`)
				.pipe(gulpInject(
					gulp.src([libSrc, `!${appLibSrc}`], { read : false }),
					{ name : lib, relative : true }
				))
				.pipe(gulpInject(
					gulp.src(assetSrc, { read : false }),
					{ name : asset, relative : true }
				))
				.pipe(gulpInject(
					gulp.src(appLibSrc, { read : false }),
					{ name : `${app}${lib}`, relative : true }
				))
				.pipe(gulpInject(
					gulp.src(priorityLibSrc, { read : false }),
					{ name : `${priority}${lib}`, relative : true }
				))
				.pipe(gulpInject(
					gulp.src([allSrc, `!${libSrc}`, `!${assetSrc}`], { read : false }),
					{ name : app, relative : true }
				))
				.pipe(gulp.dest(dest))
				.on('end', () => {
					Browser.instance().reload();
					resolve();
				});
		});
	}

	static task (callback) {
		Promise.all([
			Inject.copySrc(),
			Inject.devLib()
		]).then(() => {
			Inject.injectFiles().then(callback)
		});
	}
}

export default new Inject();