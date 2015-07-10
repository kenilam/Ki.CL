(function breadcrumb () {
	'use strict';

	var controller = [
			'$scope', 'sitemap',
			function (scope, sitemap) {
				var callback = {
					stateChange : function (event, toState, toParams) {
						
					}
				};

				scope.breadcrumb = {};

				scope.$on('$stateChangeSuccess', callback.stateChange);
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
