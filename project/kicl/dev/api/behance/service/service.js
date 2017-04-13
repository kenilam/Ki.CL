(function service () {
	'use strict';

	var dependencies = [
		'behance.service.async',
		'behance.service.time',
		'behance.service.check',
		'behance.service.modify'
	];

	angular.module('behance.service', dependencies);
}());
