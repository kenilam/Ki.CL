(function breadcrumb () {
	'use strict';

	var controller = [
			'$rootScope',
			'$scope',
			'$element',
			'$timeout',
			'$state',
			'$stateParams',
			'sitemap',
			function (root, scope, element, timeout, state, stateParams, sitemap) {
				var index = 0,
					callback = {
						sitemapUpdate : function () {
							index = 0;

							scope.breadcrumb.list = [];

							timeout.cancel(scope.breadcrumb.timer.sitemapUpdate);
							scope.breadcrumb.timer.sitemapUpdate = timeout(setBreadcrumb, 0);


							scope.$on('behance.projects.data', setBreadcrumb);
						},
						ready : function (data) {
							function eachData (value, name) {
								scope.breadcrumb[name] = value;
							}

							function whenData () {
								_.each(data, eachData);
							}

							return whenData;
						},
						data : function (event, data) {
							function eachData (value, name) {
								scope.breadcrumb[name] = value;
							}

							_.each(data, eachData);
						}
					},
					control = {
						get : {
							height : function () {
								return element.outerHeight();
							}
						}
					},
					broadcast = {
						height : function () {
							function whenBroadcast () {
								root.$broadcast('breadcrumb.height', control.get.height());
							}

							scope.breadcrumb.timer.broadcast = timeout(whenBroadcast, 0);
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

					broadcast.height();
				}

				function init () {
					scope.$on('sitemap.current.updated', callback.sitemapUpdate);
				}

				scope.breadcrumb = {};
				scope.breadcrumb.timer = {};
				scope.breadcrumb.list = [];

				scope.$on('sitemap.current.updated', callback.sitemapUpdate);
				scope.$on('breadcrumb.data', callback.data);

				scope.$watch(control.get.height, broadcast.height);
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
