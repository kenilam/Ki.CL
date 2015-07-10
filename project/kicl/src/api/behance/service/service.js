(function service () {
	'use strict';

	angular.module('behance.service', [
		'behance.service.async',
		'behance.service.time',
		'behance.service.check',
		'behance.service.modify'
	]);
}());
