(function () {
	'use strict';

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/user/user.html'
		};
	}

	angular.module('behance.component.user', [
		'behance.component.user.about',
		'behance.component.user.info',
		'behance.component.user.stats'
	])
		.directive('behanceUser', [
			directive
		]);
}());
