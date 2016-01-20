(function project () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$element', '$timeout', '$state', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, element, timeout, state, stateParams, reference, check, modify) {
				var loader = {},
					control = {
						troggle : {
							slideshow : function (event, action, module) {
								root.$broadcast('behance.project.slideshow.' + action, { module : module });
							}
						},
						get : {
							project : function () {
								var then = function (data) {
									loader.resolved = data.$resolved;

									callback.data(data);
								};

								if (!stateParams.project) {
									return;
								}

								loader = reference.component.project[stateParams.project] = {};
								
								if (!loader.promise) {
									loader.promise = reference.api.project().$promise;
								}

								loader.promise.then(then);
							},
							height : function () {
								return element.outerHeight();
							}
						},
						close : function () {
							state.go('projects');
						},
						broadcast : {
							data : function () {
								root.$broadcast('behance.project.data', scope.project);
								
								root.$broadcast('behance.project.slideshow.data', {
									name : scope.project.name,
									modules : scope.project.slideshow
								});
							},
							height : function () {
								root.$broadcast('behance.project.height', control.get.height);
							}
						}
					},
					callback = {
						data : function (data) {
							scope.resource = reference.resource.data.widget.project;

							scope.project = modify.project(check.project(data.project));

							timeout.cancel(scope.timer.data);
							scope.timer.data = timeout(control.broadcast.data, 0);

							timeout.cancel(scope.timer.hieght);
							scope.timer.hieght = timeout(control.broadcast.height, 0);
						}
					};

				control.get.project();

				scope.timer = {};

				scope.control = {};
				scope.control.troggle = control.troggle;
				scope.control.close = control.close;
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
