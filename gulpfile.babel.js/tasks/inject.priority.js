'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

import debug from 'gulp-debug';

const cwd = 'project/dev';

const src = [
	`./${cwd}/lib/priority/**/*.{js,css}`
];

const injectName = 'priority';

class Inject {
	static tag () {
		return gulpInject(
			gulp.src(src, { read : false }),
			{ name : injectName, ignorePath : cwd }
		);
	}
}

export default Inject;