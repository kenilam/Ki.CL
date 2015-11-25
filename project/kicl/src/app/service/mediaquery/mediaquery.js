(function async () {
	'use strict';

	var query = {
			mobile : '(max-width: 38.125rem)',
			largemobile : '(max-width: 56.875rem)',
			tablet : '(max-width: 75.625rem)',
			desktop : '(max-width: 94.375rem)',
			largedesktop : '(min-width: 95rem)',
			largestdesktop : '(min-width: 95.625rem)'
		},
		orientation = {
			portrait : '(orientation: portrait)',
			landscape : '(orientation: landscape)'
		},

		matching = {},

		service = [
			function mediaquery () {
				function matcher () {
					_.forEach(query, eachQuery);
					_.forEach(orientation, eachOrientation);

					return matching;
				}

				return matcher;
			}
		];

	function eachQuery (query, name) {
		matching[name] = matchMedia(query).matches;
	}

	function eachOrientation (orientation, name) {
		matching[name] = matchMedia(orientation).matches;
	}

	angular.module('service.mediaquery', [])
		.service('mediaquery', service);
}());
