(function project () {
	'use strict';

	angular
		.module('behance.component.project', [
			'behance.component.project.slideshow'
		])
		.service('behance.component.project.data', [
			'$rootScope',
			'$stateParams',
			'behanceReference',
			'behanceCheck',
			'behanceModify',
			'behance.component.project.slideshow',
			function projectData (root, stateParams, reference, check, modify, slideshow) {
				var scope;

				this.data = function (data) {
					scope.project = modify.project(check.project(data.project));

					root.$broadcast('behance.project.data', scope.project);

					slideshow.data(scope.project);
				};

				this.init = function (scopeRef) {
					scope = scopeRef;

					scope.resource = reference.resource.data.widget.project;

					if (!reference.component.project[stateParams.project]) {
						reference.component.project[stateParams.project] = {};
					}
					
					if (!reference.component.project[stateParams.project].promise) {
						reference.component.project[stateParams.project].promise = reference.api.project().$promise;
					}

					reference.component.project[stateParams.project].promise.then(this.data);
				};
			}
		])
		.service('behance.component.project.slideshow', [
			'$rootScope',
			function slieshow (root) {
				this.data = function (project) {
					root.$broadcast('behance.project.slideshow.data', {
						name : project.name,
						modules : project.slideshow
					});
				};

				this.show = function (module) {
					root.$broadcast('behance.project.slideshow.show', { module : module });
				};
			}
		])
		.controller('behance.component.project', [
			'behance.component.project.data',
			'behance.component.project.slideshow',
			'$rootScope', '$scope', '$element', '$timeout', '$state', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (projectData, slideshow, root, scope, element, timeout, state, stateParams, reference, check, modify) {
				scope.control = {};
				scope.control.showSlideshow = slideshow.show;

				projectData.init(scope);
			}
		])
		.directive('behanceProject', [
			function directive (async) {
				return {
					restrict: 'E',
					replace: true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'api/behance/component/project/project.html',
					controller : 'behance.component.project'
				};
			}
		]);
}());
