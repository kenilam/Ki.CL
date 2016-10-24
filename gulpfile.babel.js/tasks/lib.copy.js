'use strict';

import path from 'path';

import gulp from 'gulp';

import gulpRename from 'gulp-rename';
import gulpPlumber from 'gulp-plumber';
import gulpSourcemaps from 'gulp-sourcemaps';

import merge from 'merge-stream';

import debug from 'gulp-debug';

import sass from './sass';

const taskName = 'lib.{type}.copy';

const dest ='./project/{env}/lib/{type}'

class Copy {
	constructor (type, src) {
		this.taskName = taskName.replace('{type}', type);
		this.type = type;
		this.src = src;

		this.copySrc = this.copy('src');
		this.copyDev = this.copy('dev');

		gulp.task(this.taskName, callback => {
			return gulp.run(this.copySrc, this.copyDev, callback);
		});
	}

	isSCSS (file) {
		return path.extname(file.path) === '.scss';
	}

	devTask () {
		const srcRoot = dest.replace('{env}', 'src').replace('{type}', this.type);
		const destRoot = srcRoot.replace('src', 'dev');

		const scss = gulp.src(['**/*.scss', '!**/_*.scss'], { cwd: srcRoot })
			.pipe(gulpPlumber())
			.pipe(gulpSourcemaps.init())
			.pipe(sass())
			.pipe(gulpSourcemaps.write())
			.pipe(gulp.dest(destRoot));

		const others = gulp.src(['**/*.{css,js,eot,svg,ttf,woff,woff2}'], { cwd: srcRoot })
			.pipe(gulp.dest(destRoot));

		return merge(scss, others);
	}

	srcTask () {
		const destRoot = dest.replace('{env}', 'src').replace('{type}', this.type);

		return this.src
			.pipe(gulpRename(file => {
				if (file.basename === 'index' && !file.extname) {
					file.extname = '.js';
				}
			}))
			.pipe(gulp.dest(destRoot));
	}

	maskTask (env) {
		const name = [this.taskName, env].join('.');
		
		gulp.task(name, () => {
			if (env === 'dev') {
				return this.devTask();
			}

			return this.srcTask();
		})

		return name;
	}

	copy (env) {
		return this.maskTask(env);
	}
}

export default Copy;

