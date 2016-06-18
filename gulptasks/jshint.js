'use strict';

import gulpCache from 'gulp-cached';
import gulpJshint from 'gulp-jshint';
import gulpNotify from 'gulp-notify';

import jsxhint from 'jshint-jsx';
import stylish from 'jshint-stylish';

class Jshint {
	constructor () {
		this.errors = [];
	}

	hint () {
		this.errors = [];

		return gulpJshint({
			undef: true,
			unused: true,
			fail: true,
			predef: config.jshint.predef
		});
	}

	jsxhint () {
		this.errors = [];

		return gulpJshint({
			linter: jsxhint.JSXHINT,
			lookup: true
		});
	}

	reporter () {
		return gulpJshint.reporter(stylish, { verbose: true });
	}

	notify () {
		return gulpNotify(file => {
			if (file.jshint.success) {
				return false;
			}

			this.errors.push(file.jshint.results);

			const errors = file.jshint.results.map(data => {
				if (data.error) {
					return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
				}
			}).join('\n');

			return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors + '\n';
		})
	}
}

export default new Jshint();

