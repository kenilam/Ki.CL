(function experience () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$window', '$element', 'behanceReference', 'behanceModify', 'mediaquery',
			function controller (root, scope, win, element, reference, modify, mediaquery) {
				function resource (data) {
					scope.resource = data.widget.experience.content;
				}

				function init (data) {
					reference.component.experience.resolved = data.$resolved;

					scope.experience = _.map(data.work_experience, modify.experience);

					root.$broadcast('behance.experience.data', scope.experience);
				}

				if (!reference.component.experience) {
					reference.component.experience = {};
				}
				
				if (!reference.component.experience.promise) {
					reference.component.experience.promise = reference.api.experience().$promise;
				}
				
				reference.resource.loader.success(resource);
				reference.component.experience.promise.then(init);
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/experience/experience.html',
			controller : controller
		};
	}

	angular.module('behance.component.experience', [])
		.directive('behanceExperience', [
			'async',
			directive
		]);
}());
