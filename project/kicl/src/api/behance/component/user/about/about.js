(function () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				var callback = {
						data : function (data) {
							reference.component.user.resolved = data.$resolved;

							scope.about.paragraph = data.user.sections.About.split('\n\n');
						}
					}

				scope.about = {};

				if (!reference.component.user.promise) {
					reference.component.user.promise = reference.api.user().$promise;
				}

				reference.component.user.promise.then(callback.data);
			}
		]

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
