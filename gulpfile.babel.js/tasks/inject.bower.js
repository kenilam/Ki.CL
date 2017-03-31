'use strict';

import gulp from 'gulp';
import gulpInject from 'gulp-inject';

const cwd = 'project/dev';

const src = [
	`./${cwd}/lib/bower/**/*.{js,css}`
];

const injectName = 'bower';

class Inject {
	static tag () {
		return gulpInject(
			gulp.src(src, { read : false }),
			{ name : injectName, ignorePath : cwd }
		);
	}
}

export default Inject;