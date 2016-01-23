(function info () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				function init (data) {
					scope.info.first_name = data.user.first_name;
					scope.info.last_name = data.user.last_name;

					scope.info.city = data.user.city;
					scope.info.state = data.user.state;
					scope.info.country = data.user.country;

					root.$broadcast('behance.user.info.data', scope.info);
				}

				scope.info = {};

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
			templateUrl : 'api/behance/component/user/info/info.html',
			controller : controller
		};
	}

	angular.module('behance.component.user.info', [])
		.directive('behanceUserInfo', [
			directive
		]);
}());
