(function about () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				function init (data) {
					reference.component.user.resolved = data.$resolved;

					scope.about.paragraph = data.user.sections.About.split('\n\n');

					root.$broadcast('behance.user.about.data', scope.about);
				}

				scope.about = {};

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
			templateUrl : 'api/behance/component/user/about/about.html',
			controller : controller
		};
	}

	angular.module('behance.component.user.about', [])
		.directive('behanceUserAbout', [
			directive
		]);
}());
