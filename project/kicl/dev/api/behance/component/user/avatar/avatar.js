(function avatar () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				function init (data) {
					scope.avatar.image = data.user.images[reference.resource.data.widget.user.content.avatar.images.size];

					root.$broadcast('behance.user.avatar.data', scope.avatar);
				}

				scope.avatar = {};

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
			templateUrl : 'api/behance/component/user/avatar/avatar.html',
			controller : controller
		};
	}

	angular.module('behance.component.user.avatar', [])
		.directive('behanceUserAvatar', [
			directive
		]);
}());
