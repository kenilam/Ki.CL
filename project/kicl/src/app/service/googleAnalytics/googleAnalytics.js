(function googleAnalytics () {
	'use strict';

	angular.module('service.googleAnalytics', [])
		.service('googleAnalytics', [
			'$rootScope',
			'$location',
			'$window',
			function analytics (root, loc, win) {
				function sendPage (page) {
					if (!win.ga) {
						return;
					}

					win.ga('send', 'pageview', { page : loc.path() });
				}

				win.ga = window.ga || function(){
					(ga.q = ga.q || []).push(arguments);
				};

				win.ga.l = +new Date();

				win.ga('create', 'UA-41733388-1', 'auto');

				root.$on('$stateChangeSuccess', sendPage);
			}
		]);
}());
