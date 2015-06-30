(function () {
	'use strict';

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalFooter/globalFooter.html'
		};
	}

	angular.module('component.globalFooter', [])
		.directive('globalFooter', [
			directive
		]);
}());
