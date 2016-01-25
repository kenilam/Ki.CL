(function breadcrumb () {
	'use strict';

	var controller = [
			'$rootScope',
			'$scope',
			'$element',
			'$timeout',
			'$state',
			'$stateParams',
			'transition',
			'sitemap',
			'mediaquery',
			function (root, scope, element, timeout, state, stateParams, transition, sitemap, mediaquery) {
				var index = 0;

				function sitemapUpdate () {
					index = 0;

					scope.breadcrumb.list = [];

					timeout.cancel(scope.breadcrumb.timer.sitemapUpdate);
					scope.breadcrumb.timer.sitemapUpdate = timeout(setBreadcrumb, 0);

					scope.$on('behance.projects.data', setBreadcrumb);
				}

				function filterBreadcrumb (list) {
					return (list.name !== 'home');
				}

				function setBreadcrumb (currentSitemap) {
					if (!currentSitemap) {
						currentSitemap = sitemap.current();
					}

					scope.breadcrumb.list[index] = currentSitemap;

					if (currentSitemap.parent) {
						index = index + 1;

						setBreadcrumb(currentSitemap.parent);


					}

					// scope.breadcrumb.list = scope.breadcrumb.list.filter(filterBreadcrumb);
				}

				function init (event, data) {
					scope.resource = data;
				}

				function destroy () {
					timeout.cancel(scope.breadcrumb.timer.broadcast);
				}

				scope.breadcrumb = {};
				scope.breadcrumb.timer = {};
				scope.breadcrumb.list = [];

				scope.$on('sitemap.current.updated', sitemapUpdate);
				scope.$on('breadcrumb.data', init);
			}
		];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/breadcrumb/breadcrumb.html',
			controller : controller
		};
	}

	angular.module('component.breadcrumb', [])
		.directive('breadcrumb', [
			directive
		]);
}());
