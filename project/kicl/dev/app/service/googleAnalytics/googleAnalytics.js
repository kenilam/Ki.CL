(function googleAnalytics () {
	'use strict';

	angular.module('service.googleAnalytics', [])
		.service('googleAnalytics', [
			'$rootScope',
			'$location',
			'$window',
			function analytics (root, loc, win) {
				function sendPage () {
					if (!win.ga) {
						return;
					}

					win.ga('send', 'pageview', { page : loc.path() });
				}

				root.$on('$stateChangeSuccess', sendPage);
			}
		]);
}());
