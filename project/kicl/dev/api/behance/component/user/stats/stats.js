(function stats () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				function init (data) {
					scope.stats = data.user.stats;
					scope.stats.content = reference.component.user.content.stats;

					root.$broadcast('behance.user.stats.data', scope.stats);
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
			templateUrl : 'api/behance/component/user/stats/stats.html',
			controller : controller
		};
	}

	angular.module('behance.component.user.stats', [])
		.directive('behanceUserStats', [
			directive
		]);
}());
