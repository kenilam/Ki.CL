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
			function (root, scope, element, timeout, state, stateParams, transition, sitemap) {
				var index = 0;

				function sitemapUpdate () {
					index = 0;

					scope.breadcrumb.list = [];

					timeout.cancel(scope.breadcrumb.timer.sitemapUpdate);
					scope.breadcrumb.timer.sitemapUpdate = timeout(setBreadcrumb, 0);

					scope.$on('behance.projects.data', setBreadcrumb);
				}

				function ready (data) {
					function eachData (value, name) {
						scope.breadcrumb[name] = value;
					}

					function whenData () {
						_.each(data, eachData);
					}

					return whenData;
				}

				function breadcrumbData (event, data) {
					scope.resource = data;
				}

				function height () {
					var value = element.outerHeight() - parseInt(element.css('padding-top'));

					if (value && value > 0) {
						return value;
					}

					return 0;
				}
				
				function broadcastHeight () {
					root.$broadcast('breadcrumb.height', height());
				}

				function destroy () {
					timeout.cancel(scope.breadcrumb.timer.broadcast);
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

						return;
					}

					// scope.breadcrumb.list = scope.breadcrumb.list.filter(filterBreadcrumb);
				}

				function init () {
					scope.$on('sitemap.current.updated', sitemapUpdate);
				}

				element.bind(transition.end.which(element), broadcastHeight);

				scope.breadcrumb = {};
				scope.breadcrumb.timer = {};
				scope.breadcrumb.list = [];

				scope.$watch(height, broadcastHeight, true);

				scope.$on('sitemap.current.updated', sitemapUpdate);
				scope.$on('breadcrumb.data', breadcrumbData);
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
