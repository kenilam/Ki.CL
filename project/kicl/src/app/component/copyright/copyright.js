(function copyright () {
	'use strict';

	var controller = [
		'$scope',
		'$interpolate',
			function (scope, interpolate) {
				var callback = {
						data : function (event, data) {
							scope.copyright = data;
							scope.copyright.message = interpolate(scope.copyright.message)({
								year : (new Date()).getFullYear()
							});
						}
					};
				
				scope.$on('copyright.data', callback.data);
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