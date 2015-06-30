(function () {
	'use strict';

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalHeader/globalHeader.html'
		};
	}

	angular.module('component.globalHeader', [])
		.directive('globalHeader', [
			directive
		]);
}());
