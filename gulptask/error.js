'use strict'

module.exports.error = function (error) {
	console.log('');
	console.log('==== ==== ====');
	console.log(error.plugin, error.name);
	console.log('Reason: ', error.message);
	console.log('==== ==== ====');
	console.log('');

	this.emit('end');
} 