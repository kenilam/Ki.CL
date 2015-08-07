(function breadcrumb () {
	'use strict';

	var controller = [
			'$scope',
			'$timeout',
			'$state',
			'$stateParams',
			'sitemap',
			function (scope, timeout, state, stateParams, sitemap) {
				var index = 0,
					callback = {
						sitemapUpdate : function () {
							index = 0;

							scope.breadcrumb.list = [];

							timeout.cancel(scope.breadcrumb.timer.sitemapUpdate);
							scope.breadcrumb.timer.sitemapUpdate = timeout(setBreadcrumb, 1000);
						},
						data : function (event, data) {
							function eachData (value, name) {
								scope.breadcrumb[name] = value;
							}

							_.each(data, eachData);
						}
					};

				function filterBreadcrumb (list) {
					return (list.name !== 'home');
				}

				function setBreadcrumb (currentSitemap) {
					if (!currentSitemap) {
						currentSitemap = sitemap.current();
					}

					scope.breadcrumb.list[index] = currentSitemap;

					if (currentSitemap.parent && !currentSitemap.root) {
						index = index + 1;

						setBreadcrumb(currentSitemap.parent);

						return;
					}

					scope.breadcrumb.list = scope.breadcrumb.list.reverse().filter(filterBreadcrumb);
				}

				function init () {
					scope.$on('sitemap.current.updated', callback.sitemapUpdate);
				}

				scope.breadcrumb = {};
				scope.breadcrumb.timer = {};
				scope.breadcrumb.list = [];

				scope.$on('sitemap.current.updated', callback.sitemapUpdate);
				scope.$on('breadcrumb.data', callback.data);
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
