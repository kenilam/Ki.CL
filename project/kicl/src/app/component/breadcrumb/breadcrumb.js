(function breadcrumb () {
	'use strict';

	var controller = [
			'$scope',
			function (scope) {
				var callback = {
						stateChange : function (event, sitemap) {
							scope.breadcrumb.list = [];
							
							setBreadcrumb(sitemap);
						}
					},
					index = 0;

				function setBreadcrumb (sitemap) {
					scope.breadcrumb.list[index] = sitemap;

					if (sitemap.parent && !sitemap.root) {
						index = index + 1;

						setBreadcrumb(sitemap.parent);
					}

					if (sitemap.root) {
						index = 0;

						scope.breadcrumb.list.reverse();
					}
				}

				scope.breadcrumb = {};
				scope.breadcrumb.list = [];

				scope.$on('sitemap.current.updated', callback.stateChange);
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
