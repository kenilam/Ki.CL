(function service () {
	'use strict';

	var dependencies = [
		'service.async',
		'service.checkmobilebrowser',
		'service.fps',
		'service.googleAnalytics',
		'service.loadimage',
		'service.mediaquery',
		'service.scroll'
	];

	angular.module('service', dependencies);
}());
