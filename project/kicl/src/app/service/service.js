(function service () {
	'use strict';

	angular.module('service', [
		'service.async',
		'service.checkmobilebrowser',
		'service.mediaquery',
		'service.statechange',
		'service.transition',
		'service.tween'
	]);
}());
