(function project () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$element', '$timeout', '$state', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, element, timeout, state, stateParams, reference, check, modify) {
				function showSlideshow (module) {
					root.$broadcast('behance.project.slideshow.show', { module : module });
				}

				function broadcast () {
					root.$broadcast('behance.project.data', scope.project);

					root.$broadcast('behance.project.slideshow.data', {
						name : scope.project.name,
						modules : scope.project.slideshow
					});
				}

				function init (data) {
					scope.resource = reference.resource.data.widget.project;

					scope.project = modify.project(check.project(data.project));

					timeout.cancel(scope.timer.data);
					scope.timer.data = timeout(broadcast, 0);
				}

				scope.timer = {};

				scope.control = {};
				scope.control.showSlideshow = showSlideshow;

				if (!reference.component.project[stateParams.project]) {
					reference.component.project[stateParams.project] = {};
				}
				
				if (!reference.component.project[stateParams.project].promise) {
					reference.component.project[stateParams.project].promise = reference.api.project().$promise;
				}

				reference.component.project[stateParams.project].promise.then(init);
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/project/project.html',
			controller : controller
		};
	}

	angular.module('behance.component.project', [
		'behance.component.project.slideshow'
	])
		.directive('behanceProject', [
			directive
		]);
}());
