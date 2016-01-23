(function copyright () {
	'use strict';

	var controller = [
		'$scope',
		'$interpolate',
			function (scope, interpolate) {
				function init (event, data) {
					scope.copyright = data;
					scope.copyright.message = interpolate(scope.copyright.message)({
						year : (new Date()).getFullYear()
					});
				}
				
				scope.$on('copyright.data', init);
			}
		];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/copyright/copyright.html',
			controller : controller
		};
	}

	angular.module('component.copyright', [])
		.directive('copyright', [
			directive
		]);
}());
