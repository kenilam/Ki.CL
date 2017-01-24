'use strict';

import gulpJshint from 'gulp-jshint';
import gulpNotify from 'gulp-notify';

import jsxhint from 'jshint-jsx';
import stylish from 'jshint-stylish';

gulpNotify.logLevel = 1;

class Jshint {
	constructor () {
		this.errors = [];
	}

	hint () {
		return gulpJshint({
			lookup: true,
			undef: true,
			unused: true,
			fail: false
		});
	}

	jsxhint () {
		return gulpJshint({
			linter: jsxhint.JSXHINT,
			lookup: true
		});
	}

	reporter () {
		return gulpJshint.reporter(stylish, { verbose: true });
	}

	reset () {
		this.errors = [];
	}

	notify () {
		return gulpNotify(file => {
			if (file.jshint.success) {
				return false;
			}

			this.errors.push(file.jshint.results);

			const errors = file.jshint.results.map(data => {
				if (!data.error) {
					return;
				}

				return `(${data.error.line}:${data.error.character} ${data.error.reason})`;
			}).filter(error => error !== undefined).join('\n');

			return `${file.relative} (${file.jshint.results.length} errors)\n${errors}\n`;
		})
	}
}

export default new Jshint();

