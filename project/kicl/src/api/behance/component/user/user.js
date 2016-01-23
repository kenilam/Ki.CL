(function user () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				function init (data) {
					reference.component.user.resolved = data.$resolved;

					scope.$broadcast('behance.user.throbber.hide');
					root.$broadcast('behance.user.data', data);
				}

				if (!reference.component.user) {
					reference.component.user = {};
				}

				if (!reference.component.user) {
					reference.component.user = {};
				}

				if (!reference.component.user.promise) {
					reference.component.user.promise = reference.api.user().$promise;
				}

				reference.component.user.promise.then(init);
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/user/user.html',
			controller : controller
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
