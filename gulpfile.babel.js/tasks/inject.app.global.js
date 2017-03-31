'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

const cwd = '/project/dev/';

const src = [
	`.${cwd}lib/app/**/*.{js,css}`,
	`!.${cwd}lib/app/priority/**/*.{js,css}`
];

const injectName = 'appGlobal';

class Inject {
	static tag () {
		return gulpInject(
			gulp.src(src, { read : false }),
			{ name : injectName, ignorePath : cwd }
		);
	}
}

export default Inject;